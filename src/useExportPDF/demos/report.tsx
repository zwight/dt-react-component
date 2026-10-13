import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useExportPDF } from 'dt-react-component';
import { ExportPDFGenerateProgress } from 'dt-react-component/useExportPDF';

export default () => {
    const { loading, exportPDF } = useExportPDF();
    const [progress, setProgress] = useState<ExportPDFGenerateProgress>();
    const [status, setStatus] = useState('');
    const handleExport = () => {
        setStatus('');
        return exportPDF({
            filename: '长报告',
            pageFormat: 'a4',
            orientation: 'p',
            pageMargin: 12,
            onProgress: setProgress,
            onSuccess: () => setStatus('报告已导出'),
            onError: () => setStatus('报告导出失败'),
            getExportDom: (helpers) => {
                // 构造独立导出 DOM，避免调整当前页面；Hook 会临时挂载并清理它。
                const report = document.createElement('div');
                report.style.cssText =
                    'width: 700px; padding: 24px; background: white; color: #333;';
                const heading = document.createElement('h1');
                heading.textContent = '业务明细报告';
                report.appendChild(heading);
                for (let index = 0; index < 30; index++) {
                    const row = document.createElement('p');
                    row.style.cssText = 'padding: 18px; border-bottom: 1px solid #ddd;';
                    row.textContent = `第 ${index + 1} 项：业务数据及执行结果。`;
                    report.appendChild(row);
                    helpers?.onProgress?.({ finished: index + 1, total: 30 });
                }
                return report;
            },
        });
    };
    return (
        <Space direction="vertical">
            <Button loading={loading} onClick={handleExport}>
                导出多页报告
            </Button>
            <span>
                已完成步骤：{progress ? `${progress.finished} / ${progress.total}` : '尚未开始'}
            </span>
            <span>{status}</span>
        </Space>
    );
};
