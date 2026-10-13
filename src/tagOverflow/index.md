---
title: TagOverflow 标签溢出
group: 组件
toc: content
demo:
    cols: 2
---

# TagOverflow 标签溢出

根据容器和标签的实际宽度排列标签，超过最大行数的内容收起到“更多”菜单中。适用于标签筛选、分类导航等宽度有限的区域。

## 示例

<code src="./demos/basic.tsx" description="拖动滑块改变容器宽度，查看标签折叠及溢出状态。默认一行，悬停“更多”查看隐藏项。">基础使用</code>
<code src="./demos/multipleRows.tsx" description="通过 maxRows 设置最大行数，gap 控制间距，showDivider 展示分隔线。">多行与分隔线</code>
<code src="./demos/interactive.tsx" description="选中和关闭行为由调用方维护；点击关闭按钮不会触发标签的 onClick。">选中与关闭</code>
<code src="./demos/custom.tsx" description="使用 node 自定义标签，renderMore 自定义入口，moreDropdown 自定义触发方式和菜单。">自定义内容</code>
<code src="./demos/longLabel.tsx" description="超长标签截断，以及全部标签可容纳时的展示。">长标签与无溢出</code>
<code src="./demos/dynamic.tsx" description="动态新增、关闭和清空标签时自动重新计算布局。">动态增删</code>

## API

### TagOverflow

| 参数             | 说明                                                                      | 类型                                                | 默认值                         |
| ---------------- | ------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------ |
| items            | 标签列表，key 应唯一且稳定                                                | `TagOverflowItem[]`                                 | 必填                           |
| maxRows          | 最大展示行数，建议传入正整数                                              | `number`                                            | `1`                            |
| gap              | 标签间距，单位 px                                                         | `number`                                            | `8`                            |
| showDivider      | 是否展示标签间的竖向分隔线                                                | `boolean`                                           | `false`                        |
| moreLabel        | 默认“更多”入口内容                                                        | `ReactNode`                                         | 随 locale 显示 `更多` / `More` |
| renderMore       | 自定义“更多”入口，收到当前隐藏项；返回节点需支持 Dropdown 事件和 ref 传递 | `(hiddenItems: TagOverflowItem[]) => ReactNode`     | -                              |
| moreDropdown     | 自定义 Dropdown 属性，覆盖默认配置                                        | `(hiddenItems: TagOverflowItem[]) => DropdownProps` | -                              |
| className        | 容器类名                                                                  | `string`                                            | -                              |
| style            | 容器样式，可设置宽度                                                      | `CSSProperties`                                     | -                              |
| onOverflowChange | 布局重新计算时回调，参数表示是否存在隐藏项，可能重复收到相同值            | `(overflow: boolean) => void`                       | -                              |

### TagOverflowItem

| 参数     | 说明                                                       | 类型         | 默认值  |
| -------- | ---------------------------------------------------------- | ------------ | ------- |
| key      | 标签唯一标识                                               | `string`     | 必填    |
| label    | 默认标签内容；默认隐藏菜单优先展示该内容                   | `ReactNode`  | -       |
| icon     | 默认标签的前置图标                                         | `ReactNode`  | -       |
| selected | 默认标签是否选中，仅控制样式                               | `boolean`    | `false` |
| closable | 默认标签是否展示关闭按钮                                   | `boolean`    | `false` |
| node     | 自定义标签节点，提供后替代默认标签，交互需在节点内自行处理 | `ReactNode`  | -       |
| onClick  | 默认标签点击回调                                           | `() => void` | -       |
| onClose  | 默认标签关闭回调，不自动删除标签                           | `() => void` | -       |

## 使用说明

-   容器宽度变化、标签内容或布局参数变化时重新测量。尚未取得容器宽度时，先展示全部标签。
-   超长标签最多占一行；为“更多”预留空间时可能截断最后一个可见标签。空间足够时还会补入一个至少 100px 宽的标签。
-   即使容器很窄，也至少保留一个标签。应给容器足够的宽度，以容纳标签和“更多”入口。
-   默认隐藏菜单仅展示内容，不复用标签的 `onClick`、`onClose`。展示内容按 `label`、`node` 中可提取的文字、`key` 的顺序回退；需要可点击菜单时通过 `moreDropdown` 提供 `overlay`。
-   组件会额外渲染不可见节点测量宽度，`node` 和 `renderMore` 的内容应避免挂载副作用及重复 DOM id。
