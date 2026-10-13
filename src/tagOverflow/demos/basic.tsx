import React, { useState } from 'react';
import { Slider } from 'antd';
import { TagOverflow } from 'dt-react-component';

const items = ['数据开发', '数据集成', '数据质量', '数据服务', '数据治理', '智能分析'].map(
    (label) => ({ key: label, label })
);

export default () => {
    const [width, setWidth] = useState(300);
    const [overflow, setOverflow] = useState(false);
    return (
        <>
            <Slider min={150} max={450} value={width} onChange={setWidth} />
            <p>
                容器宽度：{width}px；{overflow ? '有隐藏标签' : '全部展示'}
            </p>
            <TagOverflow
                items={items}
                style={{ width, maxWidth: '100%' }}
                onOverflowChange={setOverflow}
            />
        </>
    );
};
