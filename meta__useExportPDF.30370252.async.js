"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[837],{42448:(function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(30758),a={"src-use-export-pdf-demo-basic":{component:e.memo(e.lazy(function(){return Promise.all([n.e(8848),n.e(5808),n.e(1585),n.e(4896),n.e(9495),n.e(3069),n.e(1073),n.e(5150),n.e(8998),n.e(5385),n.e(6217),n.e(9891),n.e(5619),n.e(3900),n.e(1344),n.e(779),n.e(9275),n.e(2294),n.e(1697),n.e(7205),n.e(411),n.e(1186),n.e(1127),n.e(8765),n.e(3501),n.e(6023),n.e(8918),n.e(8740),n.e(4401),n.e(1917)]).then(n.bind(n,35616))})),asset:{type:"BLOCK",id:"src-use-export-pdf-demo-basic",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(61826).A},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"4.24.16"},"dt-react-component":{type:"NPM",value:"5.1.0"}},entry:"index.tsx",title:"\u57FA\u7840\u5BFC\u51FA",description:"\u5BFC\u51FA\u5DF2\u6302\u8F7D\u7684\u9875\u9762\u533A\u57DF\uFF0C\u9ED8\u8BA4\u8FC7\u6EE4 .pdf-export-ignore \u8282\u70B9\u3002"},routeId:"components/useExportPDF/index",context:void 0,renderOpts:void 0},"src-use-export-pdf-demo-report":{component:e.memo(e.lazy(function(){return Promise.all([n.e(8848),n.e(5808),n.e(1585),n.e(4896),n.e(9495),n.e(3069),n.e(1073),n.e(5150),n.e(8998),n.e(5385),n.e(6217),n.e(9891),n.e(5619),n.e(3900),n.e(1344),n.e(779),n.e(9275),n.e(2294),n.e(1697),n.e(7205),n.e(411),n.e(1186),n.e(1127),n.e(8765),n.e(3501),n.e(6023),n.e(8918),n.e(8740),n.e(4401),n.e(1917)]).then(n.bind(n,74784))})),asset:{type:"BLOCK",id:"src-use-export-pdf-demo-report",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:n(43926).A},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"4.24.16"},"dt-react-component":{type:"NPM",value:"5.1.0"}},entry:"index.tsx",title:"\u72EC\u7ACB\u62A5\u544A\u4E0E\u5206\u9875",description:"\u751F\u6210\u72EC\u7ACB\u5BFC\u51FA DOM\uFF0C\u5C55\u793A\u591A\u9875\u62A5\u544A\u3001\u751F\u6210\u8FDB\u5EA6\u548C\u7ED3\u679C\u56DE\u8C03\u3002"},routeId:"components/useExportPDF/index",context:void 0,renderOpts:void 0}}}),84816:(function(o,t,n){n.r(t);const e=[{value:"\u5C06\u4E1A\u52A1\u65B9\u63D0\u4F9B\u7684\u6700\u7EC8\u7248\u5F0F DOM \u622A\u56FE\u4E3A JPEG\uFF0C\u6309 PDF \u53EF\u7528\u9875\u9762\u9AD8\u5EA6\u5207\u7247\u5E76\u4FDD\u5B58\u6587\u4EF6\u3002\u9002\u7528\u4E8E\u9875\u9762\u6982\u89C8\u3001\u957F\u62A5\u544A\u7B49\u5BFC\u51FA\u573A\u666F\u3002",paraId:0,tocIndex:0},{value:`import { useExportPDF } from 'dt-react-component';

const { loading, exportPDF } = useExportPDF();
await exportPDF(options);
`,paraId:1,tocIndex:4},{value:"\u53C2\u6570",paraId:2,tocIndex:5},{value:"\u8BF4\u660E",paraId:2,tocIndex:5},{value:"\u7C7B\u578B",paraId:2,tocIndex:5},{value:"loading",paraId:2,tocIndex:5},{value:"\u5F53\u524D\u662F\u5426\u6B63\u5728\u5BFC\u51FA",paraId:2,tocIndex:5},{value:"boolean",paraId:2,tocIndex:5},{value:"exportPDF",paraId:2,tocIndex:5},{value:"\u53D1\u8D77\u5BFC\u51FA\uFF0C\u8FDB\u884C\u4E2D\u7684\u91CD\u590D\u8C03\u7528\u76F4\u63A5\u8FD4\u56DE\uFF1B\u5931\u8D25\u901A\u8FC7 onError \u901A\u77E5\uFF0C\u4E0D\u5411\u5916\u629B\u51FA",paraId:2,tocIndex:5},{value:"(options: ExportPDFOptions) => Promise<void>",paraId:2,tocIndex:5},{value:"\u53C2\u6570",paraId:3,tocIndex:6},{value:"\u8BF4\u660E",paraId:3,tocIndex:6},{value:"\u7C7B\u578B",paraId:3,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:6},{value:"filename",paraId:3,tocIndex:6},{value:"\u6587\u4EF6\u540D\uFF0C\u4FDD\u5B58\u65F6\u81EA\u52A8\u8FFD\u52A0 .pdf\uFF0C\u8BF7\u52FF\u91CD\u590D\u4F20\u5165\u540E\u7F00",paraId:3,tocIndex:6},{value:"string",paraId:3,tocIndex:6},{value:"export",paraId:3,tocIndex:6},{value:"ignoreSelectors",paraId:3,tocIndex:6},{value:"\u622A\u56FE\u65F6\u6392\u9664\u5339\u914D\u9009\u62E9\u5668\u7684\u8282\u70B9\u53CA\u5176\u5185\u5BB9",paraId:3,tocIndex:6},{value:"string[]",paraId:3,tocIndex:6},{value:"['.pdf-export-ignore']",paraId:3,tocIndex:6},{value:"pixelRatio",paraId:3,tocIndex:6},{value:"\u622A\u56FE\u50CF\u7D20\u500D\u7387\uFF0C\u8D8A\u5927\u56FE\u7247\u8D8A\u6E05\u6670\uFF0C\u4E5F\u4F1A\u589E\u52A0\u5185\u5B58\u548C\u6587\u4EF6\u4F53\u79EF",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"2",paraId:3,tocIndex:6},{value:"quality",paraId:3,tocIndex:6},{value:"\u521D\u59CB JPEG \u622A\u56FE\u8D28\u91CF\uFF0C\u8303\u56F4 0 \uFF5E 1\uFF1B\u5206\u9875\u5207\u7247\u4F7F\u7528\u56FA\u5B9A\u8D28\u91CF 0.95",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"0.92",paraId:3,tocIndex:6},{value:"pageMargin",paraId:3,tocIndex:6},{value:"PDF \u56DB\u5468\u8FB9\u8DDD\uFF0C\u5355\u4F4D mm\uFF1B\u5FC5\u987B\u975E\u8D1F\u4E14\u4FDD\u7559\u6709\u6548\u5185\u5BB9\u533A\u57DF",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"10",paraId:3,tocIndex:6},{value:"pageFormat",paraId:3,tocIndex:6},{value:"\u9875\u9762\u5C3A\u5BF8",paraId:3,tocIndex:6},{value:"'a4' | 'a3'",paraId:3,tocIndex:6},{value:"a4",paraId:3,tocIndex:6},{value:"orientation",paraId:3,tocIndex:6},{value:"\u9875\u9762\u65B9\u5411\uFF0Cp \u4E3A\u7EB5\u5411\uFF0Cl \u4E3A\u6A2A\u5411",paraId:3,tocIndex:6},{value:"'p' | 'l'",paraId:3,tocIndex:6},{value:"p",paraId:3,tocIndex:6},{value:"backgroundColor",paraId:3,tocIndex:6},{value:"\u622A\u56FE\u53CA\u5207\u7247\u80CC\u666F\u8272",paraId:3,tocIndex:6},{value:"string",paraId:3,tocIndex:6},{value:"#fff",paraId:3,tocIndex:6},{value:"stableFrames",paraId:3,tocIndex:6},{value:"\u5E03\u5C40\u8FDE\u7EED\u7A33\u5B9A\u5E27\u6570",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"3",paraId:3,tocIndex:6},{value:"timeoutMs",paraId:3,tocIndex:6},{value:"\u5404\u8D44\u6E90\u7B49\u5F85\u9636\u6BB5\u7684\u8D85\u65F6\u4E0A\u9650\uFF0C\u5FC5\u987B\u4E3A\u975E\u8D1F\u6709\u9650\u6570\uFF1B\u4E0D\u662F\u6574\u4E2A\u5BFC\u51FA\u4EFB\u52A1\u7684\u8D85\u65F6",paraId:3,tocIndex:6},{value:"number",paraId:3,tocIndex:6},{value:"1000",paraId:3,tocIndex:6},{value:"getExportDom",paraId:3,tocIndex:6},{value:"\u751F\u6210\u6700\u7EC8\u5BFC\u51FA DOM\uFF0C\u53EF\u901A\u8FC7 helpers.onProgress \u4E0A\u62A5\u751F\u6210\u6B65\u9AA4\uFF1B\u8FD4\u56DE null \u89C6\u4E3A\u5931\u8D25",paraId:3,tocIndex:6},{value:"(helpers?: ExportPDFDomProgressHelpers) => HTMLElement | null | Promise<HTMLElement | null>",paraId:3,tocIndex:6},{value:"\u5FC5\u586B",paraId:3,tocIndex:6},{value:"onProgress",paraId:3,tocIndex:6},{value:"DOM \u751F\u6210\u4E0E PDF \u5BFC\u51FA\u5408\u8BA1\u8FDB\u5EA6\u56DE\u8C03",paraId:3,tocIndex:6},{value:"(progress: ExportPDFGenerateProgress) => void",paraId:3,tocIndex:6},{value:"-",paraId:3,tocIndex:6},{value:"onSuccess",paraId:3,tocIndex:6},{value:"\u6587\u4EF6\u4FDD\u5B58\u8C03\u7528\u5B8C\u6210\u540E\u7684\u56DE\u8C03",paraId:3,tocIndex:6},{value:"() => void",paraId:3,tocIndex:6},{value:"-",paraId:3,tocIndex:6},{value:"onError",paraId:3,tocIndex:6},{value:"DOM \u751F\u6210\u3001\u622A\u56FE\u3001\u89E3\u7801\u6216\u5206\u9875\u7B49\u9636\u6BB5\u5931\u8D25\u65F6\u7684\u56DE\u8C03",paraId:3,tocIndex:6},{value:"(error: unknown) => void",paraId:3,tocIndex:6},{value:"-",paraId:3,tocIndex:6},{value:"ExportPDFGenerateProgress",paraId:4,tocIndex:7},{value:" \u5305\u542B ",paraId:4,tocIndex:7},{value:"finished: number",paraId:4,tocIndex:7},{value:" \u548C ",paraId:4,tocIndex:7},{value:"total: number",paraId:4,tocIndex:7},{value:"\u3002",paraId:4,tocIndex:7},{value:"getExportDom",paraId:4,tocIndex:7},{value:" \u7684 helpers.onProgress \u4F7F\u7528\u76F8\u540C\u7ED3\u6784\uFF0C\u8C03\u7528\u65B9\u5E94\u4FDD\u8BC1\u6B65\u9AA4\u6570\u5408\u7406\u3002",paraId:4,tocIndex:7},{value:"\u603B\u6B65\u9AA4\u7531 DOM \u751F\u6210\u6B65\u9AA4\u3001\u4E09\u4E2A\u51C6\u5907\u6B65\u9AA4\uFF08\u8D44\u6E90\u7A33\u5B9A\u3001\u622A\u56FE\u3001\u56FE\u7247\u89E3\u7801\uFF09\u3001\u5206\u9875\u6B65\u9AA4\u53CA\u4E00\u4E2A\u4FDD\u5B58\u6B65\u9AA4\u7EC4\u6210\u3002\u56FE\u7247\u89E3\u7801\u540E\u624D\u80FD\u786E\u5B9A\u9875\u6570\uFF0C\u56E0\u6B64 total \u4F1A\u66F4\u65B0\uFF0C\u767E\u5206\u6BD4\u53EF\u80FD\u56DE\u9000\uFF1B\u8FDB\u5EA6\u8868\u793A\u4EFB\u52A1\u6B65\u9AA4\uFF0C\u4E0D\u662F\u4E0B\u8F7D\u5B57\u8282\u8FDB\u5EA6\u3002",paraId:5,tocIndex:7},{value:"\u4E1A\u52A1\u65B9\u8D1F\u8D23\u6700\u7EC8\u7248\u5F0F\uFF0C\u5305\u62EC\u5C55\u5F00\u6298\u53E0\u5185\u5BB9\u3001\u5904\u7406\u6EDA\u52A8\u533A\u548C\u56FE\u8868\u3002Hook \u4E0D\u4F1A\u81EA\u52A8\u514B\u9686\u6216\u6539\u9020\u4E1A\u52A1\u9875\u9762\u3002",paraId:6,tocIndex:8},{value:"\u672A\u6302\u8F7D DOM \u4F1A\u4E34\u65F6\u6302\u8F7D\u5230\u79BB\u5C4F\u5BB9\u5668\uFF0C\u5B8C\u6210\u6216\u5931\u8D25\u540E\u6E05\u7406\uFF1B\u5DF2\u6302\u8F7D DOM \u4FDD\u7559\u5728\u539F\u5904\u3002",paraId:6,tocIndex:8},{value:"\u5BFC\u51FA\u524D\u7B49\u5F85\u5B57\u4F53\u3001\u56FE\u7247\u3001\u6709\u9650\u52A8\u753B\u548C\u5E03\u5C40\u7A33\u5B9A\u3002\u8D44\u6E90\u7B49\u5F85\u8D85\u65F6\u540E\u7EE7\u7EED\u5C1D\u8BD5\u5BFC\u51FA\uFF1B\u4E0D\u4F1A\u53D6\u6D88\u8D44\u6E90\u52A0\u8F7D\uFF0C\u4E5F\u4E0D\u9650\u5236 DOM \u751F\u6210\u3001\u622A\u56FE\u7B49\u4EFB\u52A1\u65F6\u957F\u3002",paraId:6,tocIndex:8},{value:"\u5BFC\u51FA\u5185\u5BB9\u662F\u56FE\u7247\uFF0C\u6587\u5B57\u65E0\u6CD5\u9009\u4E2D\u6216\u641C\u7D22\u3002\u5206\u9875\u6309\u50CF\u7D20\u9AD8\u5EA6\u5207\u7247\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u907F\u5F00\u8868\u683C\u884C\u6216\u6BB5\u843D\u3002",paraId:6,tocIndex:8},{value:"\u8DE8\u57DF\u56FE\u7247\u3001\u5916\u90E8\u5B57\u4F53\u548C\u56FE\u8868\u9700\u786E\u4FDD\u80FD\u88AB html-to-image \u6B63\u786E\u8BFB\u53D6\u3002\u957F\u56FE\u548C\u9AD8 pixelRatio \u4F1A\u589E\u52A0\u6D4F\u89C8\u5668\u5185\u5B58\u5F00\u9500\u3002",paraId:6,tocIndex:8},{value:"SVG foreignObject \u5185\u8282\u70B9\u4F1A\u4E34\u65F6\u5185\u8054\u8BA1\u7B97\u6837\u5F0F\uFF0C\u4EFB\u52A1\u7ED3\u675F\u540E\u6062\u590D\u539F\u59CB style\u3002",paraId:6,tocIndex:8},{value:"\u9ED8\u8BA4\u901A\u8FC7 antd message \u63D0\u793A\u5BFC\u51FA\u6210\u529F\u6216\u5931\u8D25\uFF0C\u63D0\u793A\u6587\u6848\u8DDF\u968F ConfigProvider \u7684 locale\uFF08useExportPDF.success / useExportPDF.error\uFF09\u3002onProgress\u3001onSuccess\u3001onError \u81EA\u8EAB\u629B\u51FA\u7684\u5F02\u5E38\u4F1A\u8BB0\u5F55\u5230\u63A7\u5236\u53F0\u3002",paraId:6,tocIndex:8},{value:"\u6A21\u5757\u540C\u65F6\u63D0\u4F9B ",paraId:7,tocIndex:9},{value:"withInlineSvgForeignObjectStyles(container, task)",paraId:7,tocIndex:9},{value:"\uFF1A\u5728\u5F02\u6B65 task \u6267\u884C\u671F\u95F4\u5185\u8054 foreignObject \u540E\u4EE3\u6837\u5F0F\uFF0C\u5B8C\u6210\u6216\u5931\u8D25\u540E\u6062\u590D\u3002\u901A\u5E38\u4F7F\u7528 Hook \u5373\u53EF\uFF0C\u65E0\u9700\u5355\u72EC\u8C03\u7528\u3002",paraId:7,tocIndex:9}];n.d(t,["texts",0,e])}),61826:(function(o,t){t.A=`import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import { useExportPDF } from 'dt-react-component';

export default () => {
    const ref = useRef<HTMLDivElement>(null);
    const { loading, exportPDF } = useExportPDF();
    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Button
                loading={loading}
                onClick={() => exportPDF({ filename: '\u4E1A\u52A1\u6982\u89C8', getExportDom: () => ref.current })}
            >
                \u5BFC\u51FA PDF
            </Button>
            <div ref={ref} style={{ padding: 20, background: '#fff' }}>
                <h2>\u4E1A\u52A1\u6982\u89C8</h2>
                <p>\u4EFB\u52A1\u603B\u6570\uFF1A128</p>
                <p>\u5B8C\u6210\u7387\uFF1A95%</p>
                <Button className="pdf-export-ignore">\u6B64\u6309\u94AE\u4E0D\u51FA\u73B0\u5728 PDF \u4E2D</Button>
            </div>
        </Space>
    );
};
`}),43926:(function(o,t){t.A=`import React, { useState } from 'react';
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
            filename: '\u957F\u62A5\u544A',
            pageFormat: 'a4',
            orientation: 'p',
            pageMargin: 12,
            onProgress: setProgress,
            onSuccess: () => setStatus('\u62A5\u544A\u5DF2\u5BFC\u51FA'),
            onError: () => setStatus('\u62A5\u544A\u5BFC\u51FA\u5931\u8D25'),
            getExportDom: (helpers) => {
                // \u6784\u9020\u72EC\u7ACB\u5BFC\u51FA DOM\uFF0C\u907F\u514D\u8C03\u6574\u5F53\u524D\u9875\u9762\uFF1BHook \u4F1A\u4E34\u65F6\u6302\u8F7D\u5E76\u6E05\u7406\u5B83\u3002
                const report = document.createElement('div');
                report.style.cssText =
                    'width: 700px; padding: 24px; background: white; color: #333;';
                const heading = document.createElement('h1');
                heading.textContent = '\u4E1A\u52A1\u660E\u7EC6\u62A5\u544A';
                report.appendChild(heading);
                for (let index = 0; index < 30; index++) {
                    const row = document.createElement('p');
                    row.style.cssText = 'padding: 18px; border-bottom: 1px solid #ddd;';
                    row.textContent = \`\u7B2C \${index + 1} \u9879\uFF1A\u4E1A\u52A1\u6570\u636E\u53CA\u6267\u884C\u7ED3\u679C\u3002\`;
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
                \u5BFC\u51FA\u591A\u9875\u62A5\u544A
            </Button>
            <span>
                \u5DF2\u5B8C\u6210\u6B65\u9AA4\uFF1A{progress ? \`\${progress.finished} / \${progress.total}\` : '\u5C1A\u672A\u5F00\u59CB'}
            </span>
            <span>{status}</span>
        </Space>
    );
};
`})}]);
