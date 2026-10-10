"use strict";(self.webpackChunkdt_react_component=self.webpackChunkdt_react_component||[]).push([[8710],{65956:(function(O,t,e){e.r(t);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),n=e(86070);t.default=(function(){var m=(0,s.useState)(""),a=_()(m,2),l=a[0],o=a[1];return(0,s.useEffect)(function(){fetch("https://cdn.jsdelivr.net/npm/dt-react-component@3.0.8/CHANGELOG.md",{method:"get"}).then(function(u){return u.text()}).then(o).catch(function(u){o(u.message)})},[]),(0,n.jsx)("div",{style:{maxHeight:200,overflow:"auto",marginBottom:16},children:(0,n.jsx)(d.A,{value:l})})}),e.dn(t.default)}),23002:(function(O,t,e){e.r(t);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),n=e(86070),m=`
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
`;t.default=(function(){var a=(0,s.useState)(""),l=_()(a,2),o=l[0],u=l[1];return(0,s.useEffect)(function(){u(m)},[]),(0,n.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,n.jsx)(d.A,{dark:!0,value:o})})}),e.dn(t.default)}),32194:(function(O,t,e){e.r(t);var r=e(55472),_=e.n(r),s=e(30758),d=e(72051),n=e(86070),m=`
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
`;t.default=(function(){var a=(0,s.useState)(""),l=_()(a,2),o=l[0],u=l[1];return(0,s.useEffect)(function(){u(m)},[]),(0,n.jsx)("div",{style:{maxHeight:400,overflow:"auto",marginBottom:16},children:(0,n.jsx)(d.A,{value:o})})}),e.dn(t.default)}),72051:(function(O,t,e){e.d(t,{A:function(){return j}});var r=e(30758),_=e(97500),s=e.n(_),d=e(90614),n=e.n(d),m=e(78993),a=e.n(m),l=e(15340),o=e.n(l),u=e(9039),i=a();i.registerLanguage("sql",o());function P(){return{type:"output",filter:function(f){return n().helper.replaceRecursiveRegExp(f.replace(/&gt;/g,">").replace(/&lt;/g,"<"),function(g,D,v,h){var E=(v.match(/class=\"([^ \"]+)/)||[])[1],M=v.slice(0,18)+"hljs "+v.slice(18);return E&&i.getLanguage(E)?M+i.highlight(D,{language:E}).value+h:M+i.highlightAuto(D).value+h},"<pre><code\\b[^>]*>","</code></pre>","g")}}}var p=e(86070);function j(c){var f=c.value,g=f===void 0?"":f,D=c.className,v=c.style,h=c.dark,E=(0,r.useMemo)(function(){var M=new(n()).Converter({extensions:[P],emoji:!0});return M.makeHtml(g)},[g]);return(0,p.jsx)("div",{className:s()("dtc-markdown-render-body",h?"dtc-vs-dark":"dtc-vs",D),style:v,dangerouslySetInnerHTML:{__html:E}})}})}]);
