import { useRef, useState } from 'react';
import { message } from 'antd';
import { toJpeg } from 'html-to-image';
import JsPDF from 'jspdf';

import useLocale from '../locale/useLocale';

/**
 * 通用 PDF 导出 Hook。
 *
 * 设计边界：
 * 1. 业务方通过 getExportDom 生成“最终导出版式 DOM”；
 * 2. Hook 只负责等待资源稳定、DOM 截图、PDF 分页和文件保存；
 * 3. 页面结构、滚动容器、图表兼容等业务差异应放在各自 adapter 中处理。
 */
export interface ExportPDFGenerateProgress {
    finished: number;
    total: number;
}

export interface ExportPDFDomProgressHelpers {
    onProgress?: (progress: ExportPDFGenerateProgress) => void;
}

export type ExportPDFOptions = {
    filename?: string;
    ignoreSelectors?: string[];
    pixelRatio?: number;
    quality?: number;
    pageMargin?: number;
    pageFormat?: 'a4' | 'a3';
    orientation?: 'p' | 'l';
    backgroundColor?: string;
    stableFrames?: number;
    /** 每个资源等待阶段的超时上限；超时后继续尝试导出，不代表整个导出任务的上限 */
    timeoutMs?: number;
    /** 由业务方生成最终导出 DOM，通用 hook 不关心具体页面结构 */
    getExportDom: (
        helpers?: ExportPDFDomProgressHelpers
    ) => Promise<HTMLElement | null> | HTMLElement | null;
    onProgress?: (progress: ExportPDFGenerateProgress) => void;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
};

/** 等待下一帧；帧回调未执行时也能退出，并清理另一条等待路径。 */
function nextFrame(timeoutMs: number) {
    return new Promise<void>((resolve) => {
        const finish = () => {
            window.clearTimeout(timer);
            cancelAnimationFrame(frame);
            resolve();
        };
        const timer = window.setTimeout(finish, timeoutMs);
        const frame = requestAnimationFrame(finish);
    });
}

/** 超时只结束等待，不取消资源加载；任务提前结束时清理定时器。 */
async function waitUntilReadyOrTimeout(promise: Promise<unknown>, timeoutMs: number) {
    let timer: number | undefined;
    try {
        await Promise.race([
            promise,
            new Promise<void>((resolve) => {
                timer = window.setTimeout(resolve, timeoutMs);
            }),
        ]);
    } finally {
        window.clearTimeout(timer);
    }
}

/** 等待 Web Font 加载完成，减少导出时字体回退或文本抖动 */
async function waitForFontsReady(timeoutMs: number) {
    if ('fonts' in document) {
        await waitUntilReadyOrTimeout(document.fonts.ready, timeoutMs);
    }
}

/** 等待单张图片可用；失败也继续导出，避免单个图片阻塞整个 PDF */
function waitForImageReady(img: HTMLImageElement, timeoutMs: number) {
    return new Promise<void>((resolve) => {
        const finish = () => {
            window.clearTimeout(timer);
            img.removeEventListener('load', handleLoad);
            img.removeEventListener('error', finish);
            resolve();
        };
        const handleLoad = () => {
            if (typeof img.decode === 'function') {
                img.decode().then(finish, finish);
            } else {
                finish();
            }
        };
        const timer = window.setTimeout(finish, timeoutMs);

        // 不覆盖业务节点已有的 onload/onerror；超时也必须移除监听。
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', finish);
        if (img.complete) {
            handleLoad();
        }
    });
}

/** 等待导出 DOM 内所有 img 完成加载或 decode，减少截图空白 */
async function waitForImagesReady(container: HTMLElement, timeoutMs: number) {
    const images = Array.from(container.querySelectorAll('img'));
    await Promise.all(images.map((img) => waitForImageReady(img, timeoutMs)));
}

/** 等待 transition/animation 结束，并跳过无限动画，避免导出截到中间态 */
async function waitForAnimationReady(container: HTMLElement, timeoutMs: number) {
    if (typeof container.getAnimations !== 'function') return;

    const animations = container.getAnimations({ subtree: true }).filter((animation) => {
        if (animation.playState === 'finished') return false;

        const effect = animation.effect;
        if (typeof KeyframeEffect !== 'undefined' && effect instanceof KeyframeEffect) {
            const { iterations } = effect.getComputedTiming();
            return iterations !== Infinity;
        }

        return true;
    });

    if (!animations.length) return;
    await waitUntilReadyOrTimeout(
        Promise.allSettled(animations.map((animation) => animation.finished)),
        timeoutMs
    );
}

/** 连续多帧布局尺寸不变才认为稳定，解决动画结束但 layout 尚未提交的问题 */
async function waitForLayoutStable(
    container: HTMLElement,
    stableFrames: number,
    timeoutMs: number
) {
    const EPSILON = 0.5;
    let stableCount = 0;
    let prevWidth = 0;
    let prevHeight = 0;
    let prevScrollWidth = 0;
    let prevScrollHeight = 0;

    const start = performance.now();

    while (performance.now() - start < timeoutMs) {
        await nextFrame(Math.max(0, timeoutMs - (performance.now() - start)));

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const scrollWidth = container.scrollWidth;
        const scrollHeight = container.scrollHeight;
        const stable =
            Math.abs(width - prevWidth) < EPSILON &&
            Math.abs(height - prevHeight) < EPSILON &&
            scrollWidth === prevScrollWidth &&
            scrollHeight === prevScrollHeight;

        if (stable) {
            stableCount += 1;
            if (stableCount >= stableFrames) return;
        } else {
            stableCount = 0;
        }

        prevWidth = width;
        prevHeight = height;
        prevScrollWidth = scrollWidth;
        prevScrollHeight = scrollHeight;
    }
}

/** 导出前统一等待字体、图片、动画、布局稳定，并额外补两帧确保最终 paint */
async function waitForExportReady(container: HTMLElement, timeoutMs: number, stableFrames: number) {
    await waitForFontsReady(timeoutMs);
    await waitForImagesReady(container, timeoutMs);
    await waitForAnimationReady(container, timeoutMs);
    await waitForLayoutStable(container, stableFrames, timeoutMs);
    await nextFrame(timeoutMs);
    await nextFrame(timeoutMs);
}

/** 将未挂载的导出 DOM 临时挂到离屏区域，保证截图时可以正确参与布局计算 */
function mountForExport(container: HTMLElement, backgroundColor: string) {
    if (container.isConnected) {
        return () => undefined;
    }

    // html-to-image 需要真实挂载节点参与布局；离屏挂载避免影响当前页面视觉。
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-100000px';
    wrapper.style.top = '0';
    wrapper.style.backgroundColor = backgroundColor;
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '-1';

    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    return () => {
        wrapper.remove();
    };
}

/** 将 dataURL 转成 Image 节点，便于读取 naturalWidth/naturalHeight 做分页计算 */
function getImageDom(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = url;
    });
}

/** 将元素当前计算样式写入 inline style，解决 SVG foreignObject 序列化时外部 CSS 丢失的问题 */
function inlineComputedStyles(element: Element) {
    if (!(element instanceof HTMLElement || element instanceof SVGElement)) return;

    const computedStyle = window.getComputedStyle(element);

    for (let index = 0; index < computedStyle.length; index++) {
        const property = computedStyle.item(index);
        element.style.setProperty(
            property,
            computedStyle.getPropertyValue(property),
            computedStyle.getPropertyPriority(property)
        );
    }
}

/**
 * 临时内联 SVG foreignObject 内节点样式。
 *
 * X6/自定义 HTML 节点通常渲染在 foreignObject 中，导出库序列化 SVG 时不会稳定携带外部样式表；
 * 因此在截图任务执行前写入 computed style，任务完成后恢复原始 style。
 */
export async function withInlineSvgForeignObjectStyles<T>(
    container: HTMLElement,
    task: () => Promise<T>
) {
    const exportNodes = Array.from(container.querySelectorAll('foreignObject *'));
    const originalStyles = exportNodes.map((node) => node.getAttribute('style'));

    try {
        exportNodes.forEach(inlineComputedStyles);
        return await task();
    } finally {
        exportNodes.forEach((node, index) => {
            const originalStyle = originalStyles[index];

            if (originalStyle === null) {
                node.removeAttribute('style');
            } else {
                node.setAttribute('style', originalStyle);
            }
        });
    }
}

/** 使用 html-to-image 将最终导出 DOM 转成 JPEG 图片数据 */
function renderDomToImage(
    container: HTMLElement,
    {
        pixelRatio,
        quality,
        backgroundColor,
        ignoreSelectors,
    }: {
        pixelRatio: number;
        quality: number;
        backgroundColor: string;
        ignoreSelectors: string[];
    }
) {
    const rect = container.getBoundingClientRect();
    const width = Math.ceil(Math.max(rect.width, container.scrollWidth));
    const height = Math.ceil(Math.max(rect.height, container.scrollHeight));

    return withInlineSvgForeignObjectStyles<string>(container, () =>
        toJpeg(container, {
            width,
            height,
            pixelRatio,
            quality,
            cacheBust: true,
            backgroundColor,
            // 导出根节点可能来自居中、定位或 transform 布局，截图时统一归零，避免偏移被固化进图片。
            style: {
                width: `${width}px`,
                height: `${height}px`,
                margin: '0',
                position: 'relative',
                inset: 'auto',
                left: '0',
                top: '0',
                transform: 'none',
                transformOrigin: 'top left',
            },
            filter: (node: HTMLElement) =>
                !(
                    node instanceof HTMLElement &&
                    ignoreSelectors.some((selector) => node.matches(selector))
                ),
        })
    );
}

interface PDFPageLayout {
    usableWidth: number;
    ratio: number;
    pageSliceHeight: number;
    totalPages: number;
}

/** 页数和实际切片共用整数像素高度，避免分页边缘丢失像素。 */
function calculatePageLayout({
    imageWidth,
    imageHeight,
    pageWidth,
    pageHeight,
    pageMargin,
}: {
    imageWidth: number;
    imageHeight: number;
    pageWidth: number;
    pageHeight: number;
    pageMargin: number;
}): PDFPageLayout {
    const usableWidth = pageWidth - pageMargin * 2;
    const usableHeight = pageHeight - pageMargin * 2;
    if (
        ![imageWidth, imageHeight, usableWidth, usableHeight].every(
            (value) => Number.isFinite(value) && value > 0
        ) ||
        !Number.isFinite(pageMargin) ||
        pageMargin < 0
    ) {
        throw new Error('Invalid PDF image size or page margin');
    }

    const ratio = usableWidth / imageWidth;
    const pageSliceHeight = Math.floor(usableHeight / ratio);
    if (pageSliceHeight < 1) {
        throw new Error('PDF page is too small to fit one image row');
    }

    return {
        usableWidth,
        ratio,
        pageSliceHeight,
        totalPages: Math.ceil(imageHeight / pageSliceHeight),
    };
}

/** 将完整导出图片按 PDF 页面高度切片，逐页写入 jsPDF */
function addImageToPDFPages(
    pdf: JsPDF,
    img: HTMLImageElement,
    {
        pageMargin,
        layout,
        backgroundColor,
        onPageAdded,
    }: {
        pageMargin: number;
        layout: PDFPageLayout;
        backgroundColor: string;
        onPageAdded?: () => void;
    }
) {
    const { usableWidth, ratio, pageSliceHeight } = layout;

    let sourceY = 0;
    let pageIndex = 0;

    while (sourceY < img.naturalHeight) {
        if (pageIndex > 0) {
            pdf.addPage();
        }

        const sliceHeight = Math.min(pageSliceHeight, img.naturalHeight - sourceY);
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = sliceHeight;

        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Failed to create canvas context');
        }

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
            img,
            0,
            sourceY,
            img.naturalWidth,
            sliceHeight,
            0,
            0,
            img.naturalWidth,
            sliceHeight
        );

        const sliceImg = canvas.toDataURL('image/jpeg', 0.95);
        pdf.addImage(
            sliceImg,
            'JPEG',
            pageMargin,
            pageMargin,
            usableWidth,
            sliceHeight * ratio,
            undefined,
            'FAST'
        );

        sourceY += sliceHeight;
        pageIndex++;
        onPageAdded?.();
    }
}

// 准备阶段依次为资源稳定、DOM 截图、图片解码；分页步数在图片生成后确定。
const PDF_PREPARE_STEPS = 3;
const PDF_SAVE_STEPS = 1;

/** 业务通知异常不应把已完成的文件导出误报为失败。 */
function notifyExportCallback(callback: () => void) {
    try {
        callback();
    } catch (error) {
        console.error('PDF export callback failed', error);
    }
}

export default function useExportPDF() {
    const locale = useLocale('useExportPDF');
    const [loading, setLoading] = useState(false);
    const exportingRef = useRef(false);

    const exportPDF = async (options: ExportPDFOptions) => {
        // state 更新前的连续调用也需要拦截，避免多个任务互相覆盖 loading。
        if (exportingRef.current) return;
        const {
            filename = 'export',
            getExportDom,
            ignoreSelectors = ['.pdf-export-ignore'],
            pixelRatio = 2,
            quality = 0.92,
            pageMargin = 10,
            pageFormat = 'a4',
            orientation = 'p',
            backgroundColor = '#fff',
            stableFrames = 3,
            timeoutMs = 1000,
            onProgress,
            onSuccess,
            onError,
        } = options;

        exportingRef.current = true;
        setLoading(true);

        let unmountExportDom: Function = () => undefined;

        try {
            if (!Number.isFinite(timeoutMs) || timeoutMs < 0) {
                throw new Error('Invalid PDF resource timeout');
            }

            let domProgress = { finished: 0, total: 1 };
            let pdfFinishedSteps = 0;
            let pdfTotalSteps = PDF_PREPARE_STEPS + PDF_SAVE_STEPS;
            const reportProgress = () => {
                notifyExportCallback(() =>
                    onProgress?.({
                        finished: domProgress.finished + pdfFinishedSteps,
                        total: domProgress.total + pdfTotalSteps,
                    })
                );
            };
            const finishPdfStep = () => {
                pdfFinishedSteps += 1;
                reportProgress();
            };

            reportProgress();
            const exportDom = await getExportDom({
                onProgress: (progress) => {
                    domProgress = progress;
                    reportProgress();
                },
            });
            if (!exportDom) {
                throw new Error('Failed to generate export dom');
            }

            if (domProgress.finished < domProgress.total) {
                domProgress = { finished: domProgress.total, total: domProgress.total };
                reportProgress();
            }

            // 统一在业务 DOM 生成后再等待稳定，覆盖字体、图片、动画和布局提交。
            unmountExportDom = mountForExport(exportDom, backgroundColor);
            await waitForExportReady(exportDom, timeoutMs, stableFrames);
            finishPdfStep();

            const imageData = await renderDomToImage(exportDom, {
                pixelRatio,
                quality,
                backgroundColor,
                ignoreSelectors,
            });
            finishPdfStep();
            const img = await getImageDom(imageData);
            finishPdfStep();

            const pdf = new JsPDF(orientation, 'mm', pageFormat);
            const pageLayout = calculatePageLayout({
                imageWidth: img.naturalWidth,
                imageHeight: img.naturalHeight,
                pageWidth: pdf.internal.pageSize.getWidth(),
                pageHeight: pdf.internal.pageSize.getHeight(),
                pageMargin,
            });
            pdfTotalSteps = PDF_PREPARE_STEPS + pageLayout.totalPages + PDF_SAVE_STEPS;
            reportProgress();

            addImageToPDFPages(pdf, img, {
                pageMargin,
                layout: pageLayout,
                backgroundColor,
                onPageAdded: finishPdfStep,
            });

            pdf.save(`${filename}.pdf`);
            finishPdfStep();
            message.success(locale.success);
            notifyExportCallback(() => onSuccess?.());
        } catch (error) {
            console.error(error);
            message.error(locale.error);
            notifyExportCallback(() => onError?.(error));
        } finally {
            try {
                unmountExportDom();
            } finally {
                exportingRef.current = false;
                setLoading(false);
            }
        }
    };

    return {
        loading,
        exportPDF,
    };
}
