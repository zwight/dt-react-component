import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import { useExportPDF } from 'dt-react-component';

export default () => {
    const ref = useRef<HTMLDivElement>(null);
    const { loading, exportPDF } = useExportPDF();
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Button
                loading={loading}
                onClick={() => exportPDF({ filename: '业务概览', getExportDom: () => ref.current })}
            >
                导出 PDF
            </Button>
            <div ref={ref} style={{ padding: 20, background: '#fff' }}>
                <h2>业务概览</h2>
                <p>任务总数：128</p>
                <p>完成率：95%</p>
                <Button className="pdf-export-ignore">此按钮不出现在 PDF 中</Button>
            </div>
        </Space>
    );
};
