import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { TagOverflow } from 'dt-react-component';

export default () => {
    const [keys, setKeys] = useState([1, 2, 3]);
    const [nextKey, setNextKey] = useState(4);
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Button
                    onClick={() => {
                        setKeys([...keys, nextKey]);
                        setNextKey(nextKey + 1);
                    }}
                >
                    新增
                </Button>
                <Button onClick={() => setKeys([])}>清空</Button>
            </Space>
            <TagOverflow
                style={{ width: 300 }}
                items={keys.map((key) => ({
                    key: String(key),
                    label: `标签 ${key}`,
                    closable: true,
                    onClose: () => setKeys(keys.filter((value) => value !== key)),
                }))}
            />
        </Space>
    );
};
