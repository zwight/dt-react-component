interface LayoutRow {
    start: number;
    end: number;
    width: number;
}

interface LayoutOptions {
    items: Array<{ key: string; width: number }>;
    containerWidth: number;
    moreWidth: number;
    gap: number;
    maxRows: number;
}

export interface TagOverflowLayout {
    visibleCount: number;
    itemMaxWidths: Record<string, number>;
}

// 只约束额外补入的标签；最后一行的唯一标签允许缩得更窄。
const MIN_EXTRA_ITEM_WIDTH = 100;

function getRowWidthAfterAppend(width: number, rowWidth: number, gap: number) {
    return rowWidth === 0 ? width : rowWidth + gap + width;
}

/** 根据测量宽度计算可见项和截断宽度，不读取 DOM 或更新组件状态。 */
export function calculateLayout({
    items,
    containerWidth,
    moreWidth,
    gap,
    maxRows,
}: LayoutOptions): TagOverflowLayout {
    const evaluateVisibleCount = (count: number) => {
        let row = 1;
        let rowWidth = 0;
        let rowStartIndex = 0;
        const rows: LayoutRow[] = [];

        for (let i = 0; i < count; i++) {
            const width = items[i].width;
            const next = getRowWidthAfterAppend(width, rowWidth, gap);
            if (next <= containerWidth) {
                rowWidth = next;
            } else {
                rows.push({ start: rowStartIndex, end: i - 1, width: rowWidth });
                row += 1;
                if (row > maxRows) {
                    return { fits: false, rows };
                }
                rowStartIndex = i;
                rowWidth = width;
            }
        }
        if (count > 0) {
            rows.push({ start: rowStartIndex, end: count - 1, width: rowWidth });
        }

        if (count < items.length) {
            if (count === 0) {
                return { fits: moreWidth <= containerWidth, rows };
            }

            const lastRow = rows[rows.length - 1];
            const next = getRowWidthAfterAppend(moreWidth, lastRow.width, gap);
            if (next <= containerWidth) {
                return { fits: true, rows };
            }
            if (rows.length < maxRows) {
                return { fits: moreWidth <= containerWidth, rows };
            }
            if (lastRow.start !== lastRow.end) {
                return { fits: false, rows };
            }

            const reservedLastItemWidth = containerWidth - gap - moreWidth;

            // 单个超长 tag 可截断时，优先保留该 tag，再展示“更多”。
            return { fits: reservedLastItemWidth > 0 && moreWidth <= containerWidth, rows };
        }
        return { fits: true, rows };
    };

    // 全部展示时不需要“更多”，必须单独判断，避免破坏二分查找的单调性。
    if (evaluateVisibleCount(items.length).fits) {
        return { visibleCount: items.length, itemMaxWidths: {} };
    }

    let left = 0;
    let right = items.length - 1;
    let maxVisibleCount = 0;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (evaluateVisibleCount(mid).fits) {
            maxVisibleCount = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // 沿用至少展示一个标签的规则，即使容器非常窄。
    let nextVisibleCount = Math.max(items.length ? 1 : 0, maxVisibleCount);
    const itemMaxWidths: Record<string, number> = {};
    const { rows } = evaluateVisibleCount(nextVisibleCount);
    const lastRow = rows[rows.length - 1];
    const isLastAllowedRow = rows.length >= maxRows;
    if (
        lastRow &&
        isLastAllowedRow &&
        lastRow.start === lastRow.end &&
        nextVisibleCount < items.length
    ) {
        const next = getRowWidthAfterAppend(moreWidth, lastRow.width, gap);
        if (next > containerWidth) {
            const reservedLastItemWidth = containerWidth - gap - moreWidth;
            itemMaxWidths[items[lastRow.end].key] = Math.max(0, reservedLastItemWidth);
        }
    }

    if (nextVisibleCount < items.length && lastRow && isLastAllowedRow) {
        const showMoreAfterNextItem = nextVisibleCount + 1 < items.length;
        const reservedNextItemWidth =
            containerWidth - lastRow.width - gap - (showMoreAfterNextItem ? gap + moreWidth : 0);

        // 剩余空间足够时，多展示一个 tag；若它是最后一项，则不再预留“更多”。
        if (
            reservedNextItemWidth >= MIN_EXTRA_ITEM_WIDTH &&
            items[nextVisibleCount].width > reservedNextItemWidth
        ) {
            itemMaxWidths[items[nextVisibleCount].key] = reservedNextItemWidth;
            nextVisibleCount += 1;
        }
    }
    return { visibleCount: nextVisibleCount, itemMaxWidths };
}
