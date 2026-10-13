import React, { useState } from 'react';
import { TagOverflow } from 'dt-react-component';

export default () => {
    const [labels, setLabels] = useState(['全部', '我的任务', '待处理', '已完成']);
    const [selected, setSelected] = useState('全部');
    return (
        <TagOverflow
            style={{ width: 360 }}
            items={labels.map((label) => ({
                key: label,
                label,
                selected: label === selected,
                closable: label !== '全部',
                onClick: () => setSelected(label),
                onClose: () => {
                    setLabels(labels.filter((value) => value !== label));
                    if (selected === label) setSelected('全部');
                },
            }))}
        />
    );
};
