import React, { CSSProperties, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CloseOutlined } from '@dtinsight/react-icons';
import { Divider, Dropdown, DropdownProps, Menu, Space } from 'antd';
import classNames from 'classnames';
import { useMeasure } from 'dt-react-component';

import useLocale from '../locale/useLocale';
import { calculateLayout, TagOverflowLayout } from './layout';
import './index.scss';

export interface TagOverflowItem {
    key: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    selected?: boolean;
    closable?: boolean;
    node?: React.ReactNode;
    onClick?: () => void;
    onClose?: () => void;
}

export interface TagOverflowProps {
    items: TagOverflowItem[];
    className?: string;
    gap?: number;
    maxRows?: number;
    showDivider?: boolean;
    moreLabel?: React.ReactNode;
    style?: CSSProperties;
    renderMore?: (hiddenItems: TagOverflowItem[]) => React.ReactNode;
    moreDropdown?: (hiddenItems: TagOverflowItem[]) => DropdownProps;
    onOverflowChange?: (overflow: boolean) => void;
}

function getNodeText(node: React.ReactNode): string {
    if (node === null || node === undefined) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(getNodeText).join('');
    if (React.isValidElement(node)) return getNodeText(node.props?.children);
    return '';
}

function renderItemNode(item: TagOverflowItem) {
    if (item.node) return item.node;
    return (
        <span
            className={classNames(
                'tag-overflow-default-item',
                item.selected && 'tag-overflow-default-item__selected'
            )}
            onClick={item.onClick}
        >
            {item.icon && <span className="tag-overflow-default-item-icon">{item.icon}</span>}
            <span>{item.label}</span>
            {item.closable && (
                <span
                    className="tag-overflow-default-item-close"
                    onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        item.onClose?.();
                    }}
                >
                    <CloseOutlined />
                </span>
            )}
        </span>
    );
}

export default function TagOverflow({
    items,
    className,
    gap = 8,
    maxRows = 1,
    showDivider = false,
    moreLabel,
    style,
    renderMore,
    moreDropdown,
    onOverflowChange,
}: TagOverflowProps) {
    const locale = useLocale('TagOverflow');
    const resolvedMoreLabel = moreLabel === undefined ? locale.more : moreLabel;
    const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();
    const measureRef = useRef<HTMLDivElement>(null);
    const moreMeasureRef = useRef<HTMLSpanElement>(null);
    const dividerMeasureRef = useRef<HTMLSpanElement>(null);
    const onOverflowChangeRef = useRef(onOverflowChange);
    const [layout, setLayout] = useState<TagOverflowLayout>({
        visibleCount: items.length,
        itemMaxWidths: {},
    });
    const { visibleCount, itemMaxWidths } = layout;

    onOverflowChangeRef.current = onOverflowChange;

    const hiddenItems = useMemo(() => items.slice(visibleCount), [items, visibleCount]);
    const moreNode = useMemo(
        () =>
            renderMore ? (
                renderMore(hiddenItems)
            ) : (
                <span className="tag-overflow-default-item">{resolvedMoreLabel}</span>
            ),
        [hiddenItems, resolvedMoreLabel, renderMore]
    );

    useLayoutEffect(() => {
        const measureChildren = measureRef.current?.children;
        let nextLayout: TagOverflowLayout = { visibleCount: items.length, itemMaxWidths: {} };

        if (measureChildren?.length && containerWidth) {
            // 实际展示时单个 tag 最多占一行，测量宽度也按容器宽度封顶。
            const measuredItems = items.map((item, index) => ({
                key: item.key,
                width: Math.min(
                    measureChildren[index]?.getBoundingClientRect().width || 0,
                    containerWidth
                ),
            }));
            const moreWidth = Math.min(
                moreMeasureRef.current?.getBoundingClientRect().width || 0,
                containerWidth
            );
            const dividerWidth = dividerMeasureRef.current?.getBoundingClientRect().width || 0;

            nextLayout = calculateLayout({
                items: measuredItems,
                containerWidth,
                moreWidth,
                gap: gap + (showDivider ? dividerWidth : 0),
                maxRows,
            });
        }

        setLayout((previous) => {
            const widthKeys = Object.keys(nextLayout.itemMaxWidths);
            const isUnchanged =
                previous.visibleCount === nextLayout.visibleCount &&
                Object.keys(previous.itemMaxWidths).length === widthKeys.length &&
                widthKeys.every(
                    (key) => previous.itemMaxWidths[key] === nextLayout.itemMaxWidths[key]
                );
            return isUnchanged ? previous : nextLayout;
        });
        onOverflowChangeRef.current?.(nextLayout.visibleCount < items.length);
        // “更多”的内容可能随隐藏项变化，内容更新后需要重新测量。
    }, [containerWidth, gap, items, maxRows, showDivider, moreNode]);

    return (
        <div className={classNames('tag-overflow', className)} style={style} ref={containerRef}>
            <Space
                size={gap}
                wrap
                className="tag-overflow-list"
                split={
                    showDivider ? (
                        <Divider type="vertical" className="tag-overflow-divider" />
                    ) : null
                }
            >
                {items.slice(0, visibleCount).map((item) => (
                    <span
                        key={item.key}
                        className="tag-overflow-visible-item"
                        style={
                            itemMaxWidths[item.key] !== undefined
                                ? { maxWidth: itemMaxWidths[item.key] }
                                : undefined
                        }
                    >
                        {renderItemNode(item)}
                    </span>
                ))}
                {hiddenItems.length > 0 && (
                    <Dropdown
                        placement="bottomLeft"
                        trigger={['hover']}
                        overlayClassName="tag-overflow-dropdown"
                        overlay={
                            <Menu className="tag-overflow-menu">
                                {hiddenItems.map((item) => (
                                    <Menu.Item key={item.key}>
                                        {item.label || getNodeText(item.node) || item.key}
                                    </Menu.Item>
                                ))}
                            </Menu>
                        }
                        {...(moreDropdown?.(hiddenItems) || {})}
                    >
                        {moreNode}
                    </Dropdown>
                )}
            </Space>
            <div className="tag-overflow-measure" ref={measureRef}>
                {items.map((item) => (
                    <span key={item.key} className="tag-overflow-measure-item">
                        {renderItemNode(item)}
                    </span>
                ))}
                <span className="tag-overflow-more tag-overflow-measure-item" ref={moreMeasureRef}>
                    {moreNode}
                </span>
                <span ref={dividerMeasureRef} className="tag-overflow-divider-measure">
                    <Divider type="vertical" className="tag-overflow-divider" />
                </span>
            </div>
        </div>
    );
}
