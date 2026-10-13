import { calculateLayout } from '../layout';

const items = (widths: number[]) => widths.map((width, index) => ({ key: String(index), width }));
const layout = (widths: number[], containerWidth: number, maxRows = 1) =>
    calculateLayout({ items: items(widths), containerWidth, maxRows, moreWidth: 40, gap: 8 });

describe('TagOverflow layout', () => {
    it('should handle empty items and exact fit without reserving more', () => {
        expect(layout([], 100)).toEqual({ visibleCount: 0, itemMaxWidths: {} });
        expect(layout([60, 60], 128)).toEqual({ visibleCount: 2, itemMaxWidths: {} });
    });

    it('should reserve room for more and respect maxRows', () => {
        expect(layout([60, 60, 60, 60], 150).visibleCount).toBe(1);
        expect(layout([60, 60, 60, 60, 60], 150, 2).visibleCount).toBe(3);
    });

    it('should truncate a single long item to preserve more', () => {
        expect(layout([200, 60], 200)).toEqual({ visibleCount: 1, itemMaxWidths: { '0': 152 } });
    });

    it('should retain one item even in a very narrow container', () => {
        expect(layout([30, 30], 30)).toEqual({ visibleCount: 1, itemMaxWidths: { '0': 0 } });
    });

    it('should fill remaining space with an extra truncated item', () => {
        expect(layout([60, 220, 60], 250)).toEqual({
            visibleCount: 2,
            itemMaxWidths: { '1': 134 },
        });
        expect(layout([60, 220], 250)).toEqual({ visibleCount: 2, itemMaxWidths: { '1': 182 } });
    });

    it('should not add an extra item when remaining space is below 100px', () => {
        expect(layout([60, 220, 60], 210)).toEqual({ visibleCount: 1, itemMaxWidths: {} });
    });
});
