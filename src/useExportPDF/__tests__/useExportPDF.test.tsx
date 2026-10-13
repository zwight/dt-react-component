import { act, renderHook } from '@testing-library/react';
import { message } from 'antd';
import { toJpeg } from 'html-to-image';
import JsPDF from 'jspdf';

import useExportPDF, { withInlineSvgForeignObjectStyles } from '..';

const mockPDF = {
    internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
    addPage: jest.fn(),
    addImage: jest.fn(),
    save: jest.fn(),
};
jest.mock('jspdf', () => ({ __esModule: true, default: jest.fn(() => mockPDF) }));
jest.mock('html-to-image', () => ({ toJpeg: jest.fn() }));

describe('useExportPDF', () => {
    let dom: HTMLElement;
    beforeEach(() => {
        jest.clearAllMocks();
        dom = document.createElement('div');
        Object.defineProperties(dom, { scrollWidth: { value: 190 }, scrollHeight: { value: 600 } });
        (toJpeg as jest.Mock).mockResolvedValue('data:image/jpeg;base64,image');
        // 用可控图片和 canvas 验证分页，不依赖 jsdom 的图像解码能力。
        jest.spyOn(window, 'Image').mockImplementation(() => {
            const image = document.createElement('img');
            Object.defineProperties(image, {
                naturalWidth: { value: 190 },
                naturalHeight: { value: 600 },
                src: {
                    get: () => 'data:image/jpeg;base64,image',
                    set: () => Promise.resolve().then(() => image.onload?.(new Event('load'))),
                },
            });
            return image;
        });
        jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
            fillRect: jest.fn(),
            drawImage: jest.fn(),
        } as unknown as CanvasRenderingContext2D);
        jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('slice');
        jest.spyOn(message, 'success').mockImplementation(jest.fn());
        jest.spyOn(message, 'error').mockImplementation(jest.fn());
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });
    afterEach(() => {
        dom.remove();
        jest.restoreAllMocks();
    });

    it('should export all pages, report progress and remove temporary DOM', async () => {
        const { result } = renderHook(useExportPDF);
        const onSuccess = jest.fn();
        const onProgress = jest.fn();
        await act(async () => {
            await result.current.exportPDF({
                getExportDom: () => dom,
                filename: 'report',
                timeoutMs: 0,
                onSuccess,
                onProgress,
            });
        });
        expect(JsPDF).toHaveBeenCalledWith('p', 'mm', 'a4');
        expect(mockPDF.addImage).toHaveBeenCalledTimes(3);
        expect(mockPDF.addPage).toHaveBeenCalledTimes(2);
        expect(mockPDF.addImage.mock.calls.map((call) => call[5])).toEqual([277, 277, 46]);
        expect(mockPDF.save).toHaveBeenCalledWith('report.pdf');
        expect(onProgress).toHaveBeenLastCalledWith({ finished: 8, total: 8 });
        expect(onSuccess).toHaveBeenCalledTimes(1);
        expect(dom.isConnected).toBe(false);
        expect(result.current.loading).toBe(false);
    });

    it('should pass screenshot options and filter ignored nodes', async () => {
        document.body.appendChild(dom);
        const { result } = renderHook(useExportPDF);
        await act(async () => {
            await result.current.exportPDF({
                getExportDom: () => dom,
                timeoutMs: 0,
                pixelRatio: 3,
                quality: 0.8,
                backgroundColor: '#eee',
                orientation: 'l',
                pageFormat: 'a3',
            });
        });
        expect(toJpeg).toHaveBeenCalledWith(
            dom,
            expect.objectContaining({
                width: 190,
                height: 600,
                pixelRatio: 3,
                quality: 0.8,
                backgroundColor: '#eee',
            })
        );
        const filter = (toJpeg as jest.Mock).mock.calls[0][1].filter;
        const ignored = document.createElement('button');
        ignored.className = 'pdf-export-ignore';
        expect(filter(ignored)).toBe(false);
        expect(filter(document.createElement('span'))).toBe(true);
        expect(JsPDF).toHaveBeenCalledWith('l', 'mm', 'a3');
        expect(dom.isConnected).toBe(true);
    });

    it.each(['null', 'screenshot', 'margin', 'timeout', 'canvas'])(
        'should handle %s failure and reset loading',
        async (failure) => {
            if (failure === 'screenshot')
                (toJpeg as jest.Mock).mockRejectedValue(new Error('capture failed'));
            if (failure === 'canvas')
                jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
            const { result } = renderHook(useExportPDF);
            const onError = jest.fn();
            await act(async () => {
                await result.current.exportPDF({
                    getExportDom: () => (failure === 'null' ? null : dom),
                    timeoutMs: failure === 'timeout' ? -1 : 0,
                    pageMargin: failure === 'margin' ? 200 : 10,
                    onError,
                });
            });
            expect(onError).toHaveBeenCalledWith(expect.any(Error));
            expect(mockPDF.save).not.toHaveBeenCalled();
            expect(message.error).toHaveBeenCalledWith('导出失败');
            expect(result.current.loading).toBe(false);
            expect(dom.isConnected).toBe(false);
        }
    );

    it('should prevent concurrent exports and allow retry after failure', async () => {
        const { result } = renderHook(useExportPDF);
        let resolveDom: (value: null) => void = () => undefined;
        const getExportDom = jest.fn(
            () =>
                new Promise<null>((resolve) => {
                    resolveDom = resolve;
                })
        );
        let pending: Promise<void> = Promise.resolve();
        act(() => {
            pending = result.current.exportPDF({ getExportDom });
        });
        expect(result.current.loading).toBe(true);
        await act(async () => {
            await result.current.exportPDF({ getExportDom });
        });
        expect(getExportDom).toHaveBeenCalledTimes(1);
        await act(async () => {
            resolveDom(null);
            await pending;
        });
        await act(async () => {
            await result.current.exportPDF({ getExportDom: () => dom, timeoutMs: 0 });
        });
        expect(mockPDF.save).toHaveBeenCalledWith('export.pdf');
    });

    it('should combine DOM progress and tolerate notification errors', async () => {
        const { result } = renderHook(useExportPDF);
        const onError = jest.fn();
        const onProgress = jest.fn();
        await act(async () => {
            await result.current.exportPDF({
                getExportDom: (helpers) => {
                    helpers?.onProgress?.({ finished: 2, total: 2 });
                    return dom;
                },
                timeoutMs: 0,
                onProgress,
                onSuccess: () => {
                    throw new Error('notification');
                },
                onError,
            });
        });
        expect(onProgress).toHaveBeenLastCalledWith({ finished: 9, total: 9 });
        expect(onError).not.toHaveBeenCalled();
        expect(mockPDF.save).toHaveBeenCalledTimes(1);
    });

    it.each([false, true])(
        'should restore foreignObject styles after task failure=%s',
        async (fails) => {
            dom.innerHTML =
                '<svg><foreignObject><div style="color: red">text</div><span>plain</span></foreignObject></svg>';
            const nodes = dom.querySelectorAll('foreignObject *');
            const original = Array.from(nodes).map((node) => node.getAttribute('style'));
            const task = withInlineSvgForeignObjectStyles(dom, async () => {
                expect(nodes[1].hasAttribute('style')).toBe(true);
                if (fails) throw new Error('task');
                return 'ok';
            });
            if (fails) await expect(task).rejects.toThrow('task');
            else await expect(task).resolves.toBe('ok');
            expect(Array.from(nodes).map((node) => node.getAttribute('style'))).toEqual(original);
        }
    );
});
