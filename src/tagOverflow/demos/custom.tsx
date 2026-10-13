import React from 'react';
import { Button, Menu, Tag } from 'antd';
import { TagOverflow } from 'dt-react-component';

const items = Array.from({ length: 8 }, (_, index) => ({
    key: String(index),
    label: `自定义标签 ${index + 1}`,
    node: <Tag color="blue">自定义标签 {index + 1}</Tag>,
}));

export default () => (
    <TagOverflow
        items={items}
        style={{ width: 300 }}
        renderMore={(hidden) => <Button size="small">更多（{hidden.length}）</Button>}
        moreDropdown={(hidden) => ({
            trigger: ['click'],
            overlay: <Menu items={hidden.map((item) => ({ key: item.key, label: item.label }))} />,
        })}
    />
);
