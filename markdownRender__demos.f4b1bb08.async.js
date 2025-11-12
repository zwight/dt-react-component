"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[6426],{34170:function(h,n,e){e.r(n);var l=e(86516),u=e.n(l),s=e(79685),m=e(72490),t=e(63342);n.default=function(){var d=(0,s.useState)(""),r=u()(d,2),_=r[0],o=r[1];return(0,s.useEffect)(function(){fetch("https://cdn.jsdelivr.net/npm/dt-react-component@3.0.8/CHANGELOG.md",{method:"get"}).then(function(a){return a.text()}).then(o).catch(function(a){o(a.message)})},[]),(0,t.jsx)("div",{style:{maxHeight:200,overflow:"auto",marginBottom:16},children:(0,t.jsx)(m.Z,{value:_})})}},85198:function(h,n,e){e.r(n);var l=e(86516),u=e.n(l),s=e(79685),m=e(72490),t=e(63342),d=`
\u4EE5\u4E0B\u662F\u4E00\u6BB5 sql \u8BED\u6CD5

\`\`\`sql
 select count(*) from a;
-- name sqltest 
-- type sql 
-- create time 2022-11-09 16:13:45 
-- desc


-- create table employees(name string);
insert into employees values('1111');


select * from employees
\`\`\`
`;n.default=function(){var r=(0,s.useState)(""),_=u()(r,2),o=_[0],a=_[1];return(0,s.useEffect)(function(){a(d)},[]),(0,t.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,t.jsx)(m.Z,{dark:!0,value:o})})}},10804:function(h,n,e){e.r(n);var l=e(86516),u=e.n(l),s=e(79685),m=e(72490),t=e(63342),d=`
\u4EE5\u4E0B\u662F\u4E00\u6BB5 sql \u8BED\u6CD5

\`\`\`sql
 select count(*) from a;
-- name sqltest 
-- type sql 
-- create time 2022-11-09 16:13:45 
-- desc


-- create table employees(name string);
insert into employees values('1111');


select * from employees
\`\`\`
`;n.default=function(){var r=(0,s.useState)(""),_=u()(r,2),o=_[0],a=_[1];return(0,s.useEffect)(function(){a(d)},[]),(0,t.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,t.jsx)(m.Z,{value:o})})}},72490:function(h,n,e){e.d(n,{Z:function(){return P}});var l=e(79685),u=e(68591),s=e.n(u),m=e(37664),t=e.n(m),d=e(94306),r=e.n(d),_=e(37203),o=e.n(_),a=e(45206),E=r();E.registerLanguage("sql",o());function O(){return{type:"output",filter:function(f){return t().helper.replaceRecursiveRegExp(f.replace(/&gt;/g,">").replace(/&lt;/g,"<"),function(M,p,i,D){var v=(i.match(/class=\"([^ \"]+)/)||[])[1],g=i.slice(0,18)+"hljs "+i.slice(18);return v&&E.getLanguage(v)?g+E.highlight(p,{language:v}).value+D:g+E.highlightAuto(p).value+D},"<pre><code\\b[^>]*>","</code></pre>","g")}}}var y=e(63342);function P(c){var f=c.value,M=f===void 0?"":f,p=c.className,i=c.style,D=c.dark,v=(0,l.useMemo)(function(){var g=new(t()).Converter({extensions:[O],emoji:!0});return g.makeHtml(M)},[M]);return(0,y.jsx)("div",{className:s()("dtc-markdown-render-body",D?"dtc-vs-dark":"dtc-vs",p),style:i,dangerouslySetInnerHTML:{__html:v}})}}}]);
