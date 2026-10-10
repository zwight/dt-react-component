"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[1634],{74693:(function(P,c,e){e.r(c),e.d(c,{demos:function(){return R}});var v=e(55472),x=e.n(v),D=e(57704),r=e.n(D),O=e(65788),h=e.n(O),m=e(30758),R={"select-demo-0":{component:m.memo(m.lazy(h()(r()().mark(function p(){var l,n,s,d,o;return r()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.t.bind(e,30758,19));case 2:return l=t.sent,n=l.default,t.next=6,Promise.all([e.e(8848),e.e(5808),e.e(1585),e.e(1073),e.e(5619),e.e(779),e.e(8740),e.e(5187)]).then(e.bind(e,9553));case 6:return s=t.sent,d=s.default,o=Array.from({length:20},function(u,i){return{label:"\u9009\u9879 ".concat(i+1),value:i+1}}),t.abrupt("return",{default:function(){return n.createElement(d,{mode:"multiple",maxRows:3,style:{width:320},defaultValue:[1,2,3,4,5,6,7,8],options:o,placeholder:"\u8BF7\u9009\u62E9"})}});case 10:case"end":return t.stop()}},p)})))),asset:{type:"BLOCK",id:"select-demo-0",refAtomIds:["select"],dependencies:{"index.tsx":{type:"FILE",value:`import React from 'react';
import Select from './index';

const options = Array.from({ length: 20 }, (_, index) => ({
    label: \`\u9009\u9879 \${index + 1}\`,
    value: index + 1,
}));

export default () => (
    <Select
        mode="multiple"
        maxRows={3}
        style={{ width: 320 }}
        defaultValue={[1, 2, 3, 4, 5, 6, 7, 8]}
        options={options}
        placeholder="\u8BF7\u9009\u62E9"
    />
);`},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},routeId:"components/select/index",context:void 0,renderOpts:void 0},"select-demo-1":{component:m.memo(m.lazy(h()(r()().mark(function p(){var l,n,s,d,o;return r()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.resolve().then(e.t.bind(e,30758,19));case 2:return l=t.sent,n=l.default,s=l.useState,t.next=7,Promise.all([e.e(8848),e.e(5808),e.e(1585),e.e(1073),e.e(5619),e.e(779),e.e(8740),e.e(5187)]).then(e.bind(e,9553));case 7:return d=t.sent,o=d.default,t.abrupt("return",{default:function(){var i=s(""),a=x()(i,2),y=a[0],f=a[1];return n.createElement(n.Fragment,null,n.createElement("p",null,"\u6700\u8FD1\u4E00\u6B21\u641C\u7D22\uFF1A",y||"\u5C1A\u672A\u8F93\u5165"),n.createElement(o,{showSearch:!0,style:{width:320},placeholder:"\u8BD5\u8BD5\u8F93\u5165\u4E2D\u6587",options:[{label:"\u4E2D\u6587\u641C\u7D22",value:"chinese"},{label:"\u6570\u636E\u5206\u6790",value:"analysis"}],optionFilterProp:"label",onSearch:f}))}});case 10:case"end":return t.stop()}},p)})))),asset:{type:"BLOCK",id:"select-demo-1",refAtomIds:["select"],dependencies:{"index.tsx":{type:"FILE",value:`import React, { useState } from 'react';
import Select from './index';

export default () => {
    const [keyword, setKeyword] = useState('');
    return (
        <>
            <p>\u6700\u8FD1\u4E00\u6B21\u641C\u7D22\uFF1A{keyword || '\u5C1A\u672A\u8F93\u5165'}</p>
            <Select
                showSearch
                style={{ width: 320 }}
                placeholder="\u8BD5\u8BD5\u8F93\u5165\u4E2D\u6587"
                options={[
                    { label: '\u4E2D\u6587\u641C\u7D22', value: 'chinese' },
                    { label: '\u6570\u636E\u5206\u6790', value: 'analysis' },
                ]}
                optionFilterProp="label"
                onSearch={setKeyword}
            />
        </>
    );
};`},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},routeId:"components/select/index",context:void 0,renderOpts:void 0},"select-demo-2":{component:m.memo(m.lazy(h()(r()().mark(function p(){var l,n,s,d,o,I,t,u;return r()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(e.t.bind(e,30758,19));case 2:return l=a.sent,n=l.default,s=l.useState,a.next=7,Promise.all([e.e(8848),e.e(1585),e.e(1073),e.e(8998),e.e(6217),e.e(5619),e.e(7413),e.e(9275),e.e(954),e.e(4314),e.e(7858),e.e(6023),e.e(6858)]).then(e.bind(e,56858));case 7:return d=a.sent,o=d.Space,I=d.Switch,a.next=12,Promise.all([e.e(8848),e.e(5808),e.e(1585),e.e(1073),e.e(5619),e.e(779),e.e(8740),e.e(5187)]).then(e.bind(e,9553));case 12:return t=a.sent,u=t.default,a.abrupt("return",{default:function(){var f=s(!1),S=x()(f,2),E=S[0],g=S[1];return n.createElement(o,{direction:"vertical"},n.createElement(o,null,"\u52A0\u8F7D\u4E2D ",n.createElement(I,{checked:E,onChange:g})),n.createElement(u,{style:{width:320},loading:E,options:[],placeholder:"\u5C55\u5F00\u67E5\u770B\u52A0\u8F7D\u6216\u7A7A\u72B6\u6001"}),n.createElement(u,{style:{width:320},options:[],notFoundContent:"\u6682\u65E0\u5339\u914D\u7ED3\u679C",placeholder:"\u81EA\u5B9A\u4E49\u7A7A\u72B6\u6001"}))}});case 15:case"end":return a.stop()}},p)})))),asset:{type:"BLOCK",id:"select-demo-2",refAtomIds:["select"],dependencies:{"index.tsx":{type:"FILE",value:`import React, { useState } from 'react';
import { Space, Switch } from 'antd';
import Select from './index';

export default () => {
    const [loading, setLoading] = useState(false);
    return (
        <Space direction="vertical">
            <Space>
                \u52A0\u8F7D\u4E2D <Switch checked={loading} onChange={setLoading} />
            </Space>
            <Select
                style={{ width: 320 }}
                loading={loading}
                options={[]}
                placeholder="\u5C55\u5F00\u67E5\u770B\u52A0\u8F7D\u6216\u7A7A\u72B6\u6001"
            />
            <Select
                style={{ width: 320 }}
                options={[]}
                notFoundContent="\u6682\u65E0\u5339\u914D\u7ED3\u679C"
                placeholder="\u81EA\u5B9A\u4E49\u7A7A\u72B6\u6001"
            />
        </Space>
    );
};`},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"4.24.16"}},entry:"index.tsx"},routeId:"components/select/index",context:void 0,renderOpts:void 0}}}),61129:(function(P,c,e){e.r(c);const v=[{value:"\u57FA\u4E8E antd Select\uFF0C\u589E\u52A0\u591A\u9009\u533A\u57DF\u9650\u9AD8\u548C\u81EA\u52A8\u6EDA\u52A8\uFF0C\u5E76\u7EDF\u4E00\u52A0\u8F7D\u3001\u7A7A\u72B6\u6001\u5C55\u793A\u3002\u641C\u7D22\u65F6\u652F\u6301\u4E2D\u6587\u8F93\u5165\u6CD5\uFF1A\u5408\u6210\u8F93\u5165\u671F\u95F4\u4E0D\u8C03\u7528 ",paraId:0,tocIndex:0},{value:"onSearch",paraId:0,tocIndex:0},{value:"\uFF0C\u5408\u6210\u7ED3\u675F\u540E\u53D1\u9001\u5B8C\u6574\u5185\u5BB9\uFF0C\u5E76\u6291\u5236\u7D27\u968F\u5176\u540E\u7684\u540C\u503C\u641C\u7D22\u56DE\u8C03\u3002",paraId:0,tocIndex:0},{value:"maxRows",paraId:1,tocIndex:2},{value:" \u5927\u4E8E 0 \u65F6\u542F\u7528\u9650\u9AD8\uFF0C\u9009\u4E2D\u9009\u9879\u540E\u5728\u4E0B\u4E00\u5E27\u5E73\u6ED1\u6EDA\u52A8\u5230\u5E95\u90E8\u3002\u9002\u7528\u4E8E ",paraId:1,tocIndex:2},{value:"multiple",paraId:1,tocIndex:2},{value:" \u548C ",paraId:1,tocIndex:2},{value:"tags",paraId:1,tocIndex:2},{value:" \u6A21\u5F0F\uFF1B\u8BE5\u53C2\u6570\u63A7\u5236\u9009\u62E9\u5668\u533A\u57DF\uFF0C\u4E0D\u63A7\u5236\u4E0B\u62C9\u5217\u8868\u9AD8\u5EA6\u3002",paraId:1,tocIndex:2},{value:"\u8F93\u5165\u62FC\u97F3\u8FC7\u7A0B\u4E2D\u4E0D\u4F1A\u8C03\u7528 ",paraId:2,tocIndex:3},{value:"onSearch",paraId:2,tocIndex:3},{value:"\u3002\u9009\u5B57\u5B8C\u6210\u540E\u624D\u66F4\u65B0\u641C\u7D22\u5185\u5BB9\uFF0C\u9002\u5408\u5728 ",paraId:2,tocIndex:3},{value:"onSearch",paraId:2,tocIndex:3},{value:" \u4E2D\u89E6\u53D1\u8FDC\u7A0B\u67E5\u8BE2\uFF1B\u7EC4\u4EF6\u672C\u8EAB\u4E0D\u63D0\u4F9B\u9632\u6296\u6216\u8BF7\u6C42\u7BA1\u7406\u3002",paraId:2,tocIndex:3},{value:"\u65E0\u5339\u914D\u9009\u9879\u65F6\uFF0C",paraId:3,tocIndex:4},{value:"loading",paraId:3,tocIndex:4},{value:" \u4E3A ",paraId:3,tocIndex:4},{value:"true",paraId:3,tocIndex:4},{value:" \u5C55\u793A\u5C0F\u5C3A\u5BF8 Spin\uFF0C\u5426\u5219\u5C55\u793A\u7EC4\u4EF6\u5E93 Empty\u3002\u53EF\u4EE5\u901A\u8FC7 ",paraId:3,tocIndex:4},{value:"notFoundContent",paraId:3,tocIndex:4},{value:" \u81EA\u5B9A\u4E49\u5185\u5BB9\u3002",paraId:3,tocIndex:4},{value:"\u5176\u4F59\u5C5E\u6027\u6CBF\u7528 antd Select\u3002",paraId:4,tocIndex:6},{value:"\u53C2\u6570",paraId:5,tocIndex:6},{value:"\u8BF4\u660E",paraId:5,tocIndex:6},{value:"\u7C7B\u578B",paraId:5,tocIndex:6},{value:"\u9ED8\u8BA4\u503C",paraId:5,tocIndex:6},{value:"maxRows",paraId:5,tocIndex:6},{value:"\u9009\u62E9\u5668\u6700\u5927\u5C55\u793A\u884C\u6570\u3002\u5927\u4E8E 0 \u65F6\u542F\u7528\u9650\u9AD8\u548C\u9009\u4E2D\u540E\u81EA\u52A8\u6EDA\u52A8\uFF1B\u672A\u8BBE\u7F6E\u6216\u5C0F\u4E8E\u7B49\u4E8E 0 \u65F6\u4E0D\u542F\u7528",paraId:5,tocIndex:6},{value:"number",paraId:5,tocIndex:6},{value:"-",paraId:5,tocIndex:6}];e.d(c,["texts",0,v])})}]);
