import React from 'react';
import { cleanup, fireEvent, render, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TagOverflow from '..';

let mockWidth = 150;
jest.mock(
    'dt-react-component',
    () => ({
        useMeasure: () => [jest.fn(), { width: mockWidth }],
    }),
    { virtual: true }
);

describe('TagOverflow', () => {
    const items = [
        { key: 'a', label: '标签 A' },
        { key: 'b', label: '标签 B' },
        { key: 'c', label: '标签 C' },
    ];

    beforeEach(() => {
        mockWidth = 150;
        // jsdom 没有实际布局，提供标签、“更多”和分隔线的测量宽度。
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
            this: HTMLElement
        ) {
            const width = this.classList.contains('tag-overflow-more')
                ? 40
                : this.classList.contains('tag-overflow-divider-measure')
                ? 12
                : 60;
            return {
                width,
                height: 24,
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                right: width,
                bottom: 24,
                toJSON: () => ({}),
            };
        });
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    });

    it('should collapse items and recalculate when width or maxRows changes', () => {
        const onOverflowChange = jest.fn();
        const { container, rerender } = render(
            <TagOverflow items={items} onOverflowChange={onOverflowChange} />
        );
        const list = container.querySelector('.tag-overflow-list') as HTMLElement;
        expect(within(list).getByText('标签 A')).toBeInTheDocument();
        expect(within(list).queryByText('标签 B')).not.toBeInTheDocument();
        expect(within(list).getByText('更多')).toBeInTheDocument();
        expect(onOverflowChange).toHaveBeenLastCalledWith(true);
        rerender(<TagOverflow items={items} maxRows={2} onOverflowChange={onOverflowChange} />);
        expect(list.querySelectorAll('.tag-overflow-visible-item')).toHaveLength(3);
        expect(within(list).queryByText('更多')).not.toBeInTheDocument();
        mockWidth = 300;
        rerender(<TagOverflow items={items} onOverflowChange={onOverflowChange} />);
        expect(list.querySelectorAll('.tag-overflow-visible-item')).toHaveLength(3);
        expect(onOverflowChange).toHaveBeenLastCalledWith(false);
    });

    it('should render selected items and stop close clicks from selecting', () => {
        const onClick = jest.fn();
        const onClose = jest.fn();
        const { container } = render(
            <TagOverflow
                items={[
                    {
                        key: 'a',
                        label: '标签',
                        icon: <i>icon</i>,
                        selected: true,
                        closable: true,
                        onClick,
                        onClose,
                    },
                ]}
                className="custom"
                style={{ width: 200 }}
            />
        );
        expect(container.firstChild).toHaveClass('custom');
        expect(container.firstChild).toHaveStyle({ width: '200px' });
        const item = container.querySelector('.tag-overflow-visible-item') as HTMLElement;
        expect(item.firstChild).toHaveClass('tag-overflow-default-item__selected');
        expect(within(item).getByText('icon')).toBeInTheDocument();
        fireEvent.click(within(item).getByText('标签'));
        expect(onClick).toHaveBeenCalledTimes(1);
        fireEvent.click(item.querySelector('.tag-overflow-default-item-close') as HTMLElement);
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should render custom nodes and divider', () => {
        mockWidth = 300;
        const { container } = render(
            <TagOverflow
                items={[{ key: 'a', label: 'ignored', node: <button>自定义</button> }, items[1]]}
                showDivider
                gap={16}
            />
        );
        const list = container.querySelector('.tag-overflow-list') as HTMLElement;
        expect(within(list).getByRole('button', { name: '自定义' })).toBeInTheDocument();
        expect(within(list).queryByText('ignored')).not.toBeInTheDocument();
        expect(list.querySelector('.tag-overflow-divider')).toBeInTheDocument();
    });

    it('should pass hidden items to custom more and dropdown', async () => {
        const renderMore = jest.fn((hidden) => <button>剩余 {hidden.length}</button>);
        const moreDropdown = jest.fn(() => ({ trigger: ['click'] as 'click'[] }));
        const { container, findByRole } = render(
            <TagOverflow items={items} renderMore={renderMore} moreDropdown={moreDropdown} />
        );
        expect(renderMore).toHaveBeenLastCalledWith(items.slice(1));
        expect(moreDropdown).toHaveBeenLastCalledWith(items.slice(1));
        fireEvent.click(
            within(container.querySelector('.tag-overflow-list') as HTMLElement).getByRole('button')
        );
        const menu = await findByRole('menu');
        expect(within(menu).getByText('标签 B')).toBeInTheDocument();
        expect(within(menu).getByText('标签 C')).toBeInTheDocument();
    });

    it('should show all items before measurement and recalculate when items change', () => {
        mockWidth = 0;
        const { container, rerender } = render(<TagOverflow items={items} />);
        expect(container.querySelectorAll('.tag-overflow-visible-item')).toHaveLength(3);
        mockWidth = 150;
        rerender(<TagOverflow items={items} />);
        expect(container.querySelectorAll('.tag-overflow-visible-item')).toHaveLength(1);
        rerender(<TagOverflow items={items.slice(0, 1)} />);
        expect(container.querySelector('.tag-overflow-list')).not.toHaveTextContent('更多');
    });

    it('should fall back to custom node text and key in the default menu', async () => {
        const { container, findByRole } = render(
            <TagOverflow
                items={[
                    items[0],
                    { key: 'node', node: <span>节点文字</span> },
                    { key: 'fallback' },
                ]}
                moreDropdown={() => ({ trigger: ['click'] })}
            />
        );
        fireEvent.click(
            within(container.querySelector('.tag-overflow-list') as HTMLElement).getByText('更多')
        );
        const menu = await findByRole('menu');
        expect(within(menu).getByText('节点文字')).toBeInTheDocument();
        expect(within(menu).getByText('fallback')).toBeInTheDocument();
    });

    it('should support custom moreLabel and empty items', () => {
        const { container, rerender } = render(<TagOverflow items={items} moreLabel="展开" />);
        expect(
            within(container.querySelector('.tag-overflow-list') as HTMLElement).getByText('展开')
        ).toBeInTheDocument();
        rerender(<TagOverflow items={[]} />);
        expect(container.querySelectorAll('.tag-overflow-visible-item')).toHaveLength(0);
    });
});
