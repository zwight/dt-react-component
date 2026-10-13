import React from 'react';
import { TagOverflow } from 'dt-react-component';

const items = Array.from({ length: 12 }, (_, index) => ({
    key: String(index),
    label: `业务标签 ${index + 1}`,
}));

export default () => (
    <TagOverflow items={items} maxRows={2} gap={12} showDivider style={{ width: 300 }} />
);
