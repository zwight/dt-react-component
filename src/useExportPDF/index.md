---
title: useExportPDF PDF 导出
group: Hooks
toc: content
demo:
    cols: 2
---

# useExportPDF

将业务方提供的最终版式 DOM 截图为 JPEG，按 PDF 可用页面高度切片并保存文件。适用于页面概览、长报告等导出场景。

## 示例

<code src="./demos/basic.tsx" description="导出已挂载的页面区域，默认过滤 .pdf-export-ignore 节点。">基础导出</code>
<code src="./demos/report.tsx" description="生成独立导出 DOM，展示多页报告、生成进度和结果回调。">独立报告与分页</code>

## API

```ts
import { useExportPDF } from 'dt-react-component';

const { loading, exportPDF } = useExportPDF();
await exportPDF(options);
```

### 返回值

| 参数      | 说明                                                                  | 类型                                           |
| --------- | --------------------------------------------------------------------- | ---------------------------------------------- |
| loading   | 当前是否正在导出                                                      | `boolean`                                      |
| exportPDF | 发起导出，进行中的重复调用直接返回；失败通过 onError 通知，不向外抛出 | `(options: ExportPDFOptions) => Promise<void>` |

### ExportPDFOptions

| 参数            | 说明                                                                         | 类型                                                                                             | 默认值                   |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------ |
| filename        | 文件名，保存时自动追加 .pdf，请勿重复传入后缀                                | `string`                                                                                         | `export`                 |
| ignoreSelectors | 截图时排除匹配选择器的节点及其内容                                           | `string[]`                                                                                       | `['.pdf-export-ignore']` |
| pixelRatio      | 截图像素倍率，越大图片越清晰，也会增加内存和文件体积                         | `number`                                                                                         | `2`                      |
| quality         | 初始 JPEG 截图质量，范围 0 ～ 1；分页切片使用固定质量 0.95                   | `number`                                                                                         | `0.92`                   |
| pageMargin      | PDF 四周边距，单位 mm；必须非负且保留有效内容区域                            | `number`                                                                                         | `10`                     |
| pageFormat      | 页面尺寸                                                                     | `'a4' \| 'a3'`                                                                                   | `a4`                     |
| orientation     | 页面方向，p 为纵向，l 为横向                                                 | `'p' \| 'l'`                                                                                     | `p`                      |
| backgroundColor | 截图及切片背景色                                                             | `string`                                                                                         | `#fff`                   |
| stableFrames    | 布局连续稳定帧数                                                             | `number`                                                                                         | `3`                      |
| timeoutMs       | 各资源等待阶段的超时上限，必须为非负有限数；不是整个导出任务的超时           | `number`                                                                                         | `1000`                   |
| getExportDom    | 生成最终导出 DOM，可通过 helpers.onProgress 上报生成步骤；返回 null 视为失败 | `(helpers?: ExportPDFDomProgressHelpers) => HTMLElement \| null \| Promise<HTMLElement \| null>` | 必填                     |
| onProgress      | DOM 生成与 PDF 导出合计进度回调                                              | `(progress: ExportPDFGenerateProgress) => void`                                                  | -                        |
| onSuccess       | 文件保存调用完成后的回调                                                     | `() => void`                                                                                     | -                        |
| onError         | DOM 生成、截图、解码或分页等阶段失败时的回调                                 | `(error: unknown) => void`                                                                       | -                        |

### 进度

`ExportPDFGenerateProgress` 包含 `finished: number` 和 `total: number`。`getExportDom` 的 helpers.onProgress 使用相同结构，调用方应保证步骤数合理。

总步骤由 DOM 生成步骤、三个准备步骤（资源稳定、截图、图片解码）、分页步骤及一个保存步骤组成。图片解码后才能确定页数，因此 total 会更新，百分比可能回退；进度表示任务步骤，不是下载字节进度。

## 使用说明

-   业务方负责最终版式，包括展开折叠内容、处理滚动区和图表。Hook 不会自动克隆或改造业务页面。
-   未挂载 DOM 会临时挂载到离屏容器，完成或失败后清理；已挂载 DOM 保留在原处。
-   导出前等待字体、图片、有限动画和布局稳定。资源等待超时后继续尝试导出；不会取消资源加载，也不限制 DOM 生成、截图等任务时长。
-   导出内容是图片，文字无法选中或搜索。分页按像素高度切片，不会自动避开表格行或段落。
-   跨域图片、外部字体和图表需确保能被 html-to-image 正确读取。长图和高 pixelRatio 会增加浏览器内存开销。
-   SVG foreignObject 内节点会临时内联计算样式，任务结束后恢复原始 style。
-   默认通过 antd message 提示导出成功或失败，提示文案跟随 ConfigProvider 的 locale（useExportPDF.success / useExportPDF.error）。onProgress、onSuccess、onError 自身抛出的异常会记录到控制台。

### withInlineSvgForeignObjectStyles

模块同时提供 `withInlineSvgForeignObjectStyles(container, task)`：在异步 task 执行期间内联 foreignObject 后代样式，完成或失败后恢复。通常使用 Hook 即可，无需单独调用。
