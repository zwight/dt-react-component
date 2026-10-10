"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[7402],{88461:(function(u,d,e){e.r(d),e.d(d,{demos:function(){return y}});var s=e(57704),m=e.n(s),v=e(65788),I=e.n(v),c=e(30758),y={"contextmenu-demo-0":{component:c.memo(c.lazy(I()(m()().mark(function i(){var x,t,r,l,f,a;return m()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.t.bind(e,30758,19));case 2:return x=n.sent,t=x.default,n.next=6,Promise.all([e.e(8848),e.e(1585),e.e(1073),e.e(8998),e.e(6217),e.e(5619),e.e(7413),e.e(9275),e.e(954),e.e(4314),e.e(7858),e.e(6023),e.e(6858)]).then(e.bind(e,56858));case 6:return r=n.sent,l=r.Tree,n.next=10,Promise.all([e.e(8848),e.e(5808),e.e(1585),e.e(9495),e.e(444),e.e(3069),e.e(1073),e.e(5150),e.e(8998),e.e(5385),e.e(6217),e.e(2441),e.e(5619),e.e(3900),e.e(7413),e.e(779),e.e(9275),e.e(9752),e.e(4562),e.e(9389),e.e(7205),e.e(954),e.e(411),e.e(153),e.e(1186),e.e(1127),e.e(7820),e.e(6881),e.e(8765),e.e(1143),e.e(9259),e.e(6557),e.e(8740),e.e(4401),e.e(2071)]).then(e.bind(e,10589));case 10:return f=n.sent,a=f.ContextMenu,n.abrupt("return",{default:function(){return t.createElement("div",{style:{position:"relative"}},t.createElement(l,{defaultExpandAll:!0},t.createElement(l.TreeNode,{key:"0-0",title:t.createElement(a,{data:[{key:"create",text:"\u65B0\u5EFA\u4EFB\u52A1",cb:function(){}},{key:"createFolder",text:"\u65B0\u5EFA\u6587\u4EF6\u5939",cb:function(){}},{key:"edit",text:"\u7F16\u8F91",cb:function(){}},{key:"remove",text:"\u5220\u9664",confirm:!0,confirmProps:{title:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8D44\u6E90\u5417",okText:"\u786E\u5B9A",cancelText:"\u53D6\u6D88",onConfirm:function(){console.log("\u5220\u9664")}}}]},"folder"),className:"anchor-experiment-root"},t.createElement(l.TreeNode,{key:"0-0-0",title:t.createElement(a,{data:[{key:"edit",text:"\u7F16\u8F91",cb:function(){}},{key:"clone",text:"\u514B\u9686",cb:function(){}},{key:"remove",text:"\u5220\u9664",cb:function(){}}]},"file1"),className:"anchor-experiment-file"}),t.createElement(l.TreeNode,{key:"0-0-1",title:t.createElement(a,{data:[]},"file2"),className:"anchor-experiment-file"}))))}});case 13:case"end":return n.stop()}},i)})))),asset:{type:"BLOCK",id:"contextmenu-demo-0",refAtomIds:["contextMenu"],dependencies:{"index.jsx":{type:"FILE",value:`import React from 'react';
import { Tree } from 'antd';
import { ContextMenu } from 'dt-react-component';

export default () => {
    return (
        <div style={{ position: 'relative' }}>
            <Tree defaultExpandAll>
                <Tree.TreeNode
                    key="0-0"
                    title={
                        <ContextMenu
                            data={[
                                {
                                    key: 'create',
                                    text: '\u65B0\u5EFA\u4EFB\u52A1',
                                    cb: () => {},
                                },
                                {
                                    key: 'createFolder',
                                    text: '\u65B0\u5EFA\u6587\u4EF6\u5939',
                                    cb: () => {},
                                },
                                {
                                    key: 'edit',
                                    text: '\u7F16\u8F91',
                                    cb: () => {},
                                },
                                {
                                    key: 'remove',
                                    text: '\u5220\u9664',
                                    confirm: true,
                                    confirmProps: {
                                        title: '\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8D44\u6E90\u5417',
                                        okText: '\u786E\u5B9A',
                                        cancelText: '\u53D6\u6D88',
                                        onConfirm: () => {
                                            console.log('\u5220\u9664');
                                        },
                                    },
                                },
                            ]}
                        >
                            folder
                        </ContextMenu>
                    }
                    className="anchor-experiment-root"
                >
                    <Tree.TreeNode
                        key="0-0-0"
                        title={
                            <ContextMenu
                                data={[
                                    {
                                        key: 'edit',
                                        text: '\u7F16\u8F91',
                                        cb: () => {},
                                    },
                                    {
                                        key: 'clone',
                                        text: '\u514B\u9686',
                                        cb: () => {},
                                    },
                                    {
                                        key: 'remove',
                                        text: '\u5220\u9664',
                                        cb: () => {},
                                    },
                                ]}
                            >
                                file1
                            </ContextMenu>
                        }
                        className="anchor-experiment-file"
                    />
                    <Tree.TreeNode
                        key="0-0-1"
                        title={<ContextMenu data={[]}>file2</ContextMenu>}
                        className="anchor-experiment-file"
                    />
                </Tree.TreeNode>
            </Tree>
        </div>
    );
};`},react:{type:"NPM",value:"18.3.1"},antd:{type:"NPM",value:"4.24.16"},"dt-react-component":{type:"NPM",value:"5.1.0"}},entry:"index.jsx"},routeId:"components/contextMenu/index",context:void 0,renderOpts:void 0}}}),55553:(function(u,d,e){e.r(d);const s=[{value:"\u4EFB\u52A1\u680F\u53F3\u952E\u83DC\u5355\u64CD\u4F5C",paraId:0,tocIndex:1},{value:"\u53C2\u6570",paraId:1,tocIndex:2},{value:"\u8BF4\u660E",paraId:1,tocIndex:2},{value:"\u7C7B\u578B",paraId:1,tocIndex:2},{value:"\u9ED8\u8BA4\u503C",paraId:1,tocIndex:2},{value:"data",paraId:1,tocIndex:2},{value:"\u83DC\u5355\u9879\u914D\u7F6E",paraId:1,tocIndex:2},{value:"IMenuProps[]",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"wrapperClassName",paraId:1,tocIndex:2},{value:"\u5916\u5C42\u7EC4\u4EF6\u7684 class \u540D",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5176\u4F59\u5C5E\u6027\u53C2\u8003 ant-design \u7684 Dropdown \u7EC4\u4EF6",paraId:2}];e.d(d,["texts",0,s])})}]);
