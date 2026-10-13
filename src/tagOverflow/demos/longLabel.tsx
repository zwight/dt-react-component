import React from 'react';
import { Space } from 'antd';
import { TagOverflow } from 'dt-react-component';

export default () => (
    <Space direction="vertical" style={{ width: '100%' }}>
        <p>超长标签为“更多”预留空间：</p>
        <TagOverflow
            style={{ width: 280 }}
            items={[
                { key: 'long', label: '这是一个超长的业务分类标签，用于演示省略和溢出处理' },
                { key: 'other', label: '其他分类' },
                { key: 'archive', label: '归档分类' },
            ]}
        />
        <p>标签全部可容纳时不展示“更多”：</p>
        <TagOverflow
            items={[
                { key: 'one', label: '分类一' },
                { key: 'two', label: '分类二' },
            ]}
        />
    </Space>
);
