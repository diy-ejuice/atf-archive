(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"/9aa":function(e,t,n){var a=n("NykK"),r=n("ExA7");e.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==a(e)}},"7nnF":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return x}));var a=n("Wbzz"),r=n("q1tI"),o=n.n(r),i=n("sjrs"),c=n("3Z9Z"),l=n("JI6e"),u=n("6xyR"),s=n("jDKy"),f=n("iR1w"),m=n("7oih"),v=n("EYWl"),d=n("t4m3"),p=n("nthU"),y=n("7Qib"),b={name:"name",recipes:"recipe count"};function x(e){var t=e.data,n=t.vendorsJson,x=t.allFlavorsJson.nodes,j=Object(d.a)(),h=j.searchTerm,E=j.onChange,O=Object(r.useState)(b.name),g=O[0],N=O[1],w=x.filter((function(e){var t=new RegExp(h,"i");return""===h||t.test(e.name)}));switch(g){case b.name:default:w.sort((function(e,t){return e.name.localeCompare(t.name)}));break;case b.recipes:w.sort((function(e,t){return t.recipe_count-e.recipe_count}))}function S(e){var t=e.index,n=e.style,r=w[t];return o.a.createElement(a.Link,{to:Object(y.getFlavorSlug)(r)},o.a.createElement(i.a.Item,{style:n},o.a.createElement(c.a,null,o.a.createElement(l.a,{md:10},r.name),o.a.createElement(l.a,{md:2},r.recipe_count," recipes"))))}var z=n.name,T=n.flavors.count+" flavors";return o.a.createElement(m.a,null,o.a.createElement(v.a,{title:z,description:T}),o.a.createElement(u.a,null,o.a.createElement(u.a.Header,null,o.a.createElement(u.a.Title,null,o.a.createElement("h1",null,n.name))),o.a.createElement(u.a.Body,null,o.a.createElement(p.a,{sortKey:g,sortKeys:b,setSortKey:N}),o.a.createElement(s.a,{type:"text",onChange:E,placeholder:"search by name"}),o.a.createElement(f.a,{height:800,itemData:w,itemCount:w.length,itemSize:60},S))))}},AP2z:function(e,t,n){var a=n("nmnc"),r=Object.prototype,o=r.hasOwnProperty,i=r.toString,c=a?a.toStringTag:void 0;e.exports=function(e){var t=o.call(e,c),n=e[c];try{e[c]=void 0;var a=!0}catch(l){}var r=i.call(e);return a&&(t?e[c]=n:delete e[c]),r}},ExA7:function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},GoyQ:function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},KfNM:function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},Kz5y:function(e,t,n){var a=n("WFqU"),r="object"==typeof self&&self&&self.Object===Object&&self,o=a||r||Function("return this")();e.exports=o},NykK:function(e,t,n){var a=n("nmnc"),r=n("AP2z"),o=n("KfNM"),i=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?r(e):o(e)}},QIyF:function(e,t,n){var a=n("Kz5y");e.exports=function(){return a.Date.now()}},WFqU:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n("yLpj"))},jDKy:function(e,t,n){"use strict";var a=n("k1TG"),r=n("8o2o"),o=n("TSYQ"),i=n.n(o),c=(n("K9S6"),n("q1tI")),l=n.n(c),u=(n("2W6z"),l.a.forwardRef((function(e,t){var n=e.as,o=void 0===n?"div":n,c=e.className,u=e.type,s=void 0===u?"valid":u,f=e.tooltip,m=void 0!==f&&f,v=Object(r.a)(e,["as","className","type","tooltip"]);return l.a.createElement(o,Object(a.a)({},v,{ref:t,className:i()(c,s+"-"+(m?"tooltip":"feedback"))}))})));u.displayName="Feedback";var s=u,f=l.a.createContext({controlId:void 0}),m=n("vUet"),v=l.a.forwardRef((function(e,t){var n,o,u=e.bsPrefix,s=e.bsCustomPrefix,v=e.type,d=e.size,p=e.htmlSize,y=e.id,b=e.className,x=e.isValid,j=void 0!==x&&x,h=e.isInvalid,E=void 0!==h&&h,O=e.plaintext,g=e.readOnly,N=e.custom,w=e.as,S=void 0===w?"input":w,z=Object(r.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),T=Object(c.useContext)(f).controlId,C=N?[s,"custom"]:[u,"form-control"],K=C[0],I=C[1];if(u=Object(m.a)(K,I),O)(o={})[u+"-plaintext"]=!0,n=o;else if("file"===v){var k;(k={})[u+"-file"]=!0,n=k}else if("range"===v){var F;(F={})[u+"-range"]=!0,n=F}else if("select"===S&&N){var P;(P={})[u+"-select"]=!0,P[u+"-select-"+d]=d,n=P}else{var Q;(Q={})[u]=!0,Q[u+"-"+d]=d,n=Q}return l.a.createElement(S,Object(a.a)({},z,{type:v,size:p,ref:t,readOnly:g,id:y||T,className:i()(b,n,j&&"is-valid",E&&"is-invalid")}))}));v.displayName="FormControl";t.a=Object.assign(v,{Feedback:s})},nmnc:function(e,t,n){var a=n("Kz5y").Symbol;e.exports=a},sEfC:function(e,t,n){var a=n("GoyQ"),r=n("QIyF"),o=n("tLB3"),i=Math.max,c=Math.min;e.exports=function(e,t,n){var l,u,s,f,m,v,d=0,p=!1,y=!1,b=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function x(t){var n=l,a=u;return l=u=void 0,d=t,f=e.apply(a,n)}function j(e){return d=e,m=setTimeout(E,t),p?x(e):f}function h(e){var n=e-v;return void 0===v||n>=t||n<0||y&&e-d>=s}function E(){var e=r();if(h(e))return O(e);m=setTimeout(E,function(e){var n=t-(e-v);return y?c(n,s-(e-d)):n}(e))}function O(e){return m=void 0,b&&l?x(e):(l=u=void 0,f)}function g(){var e=r(),n=h(e);if(l=arguments,u=this,v=e,n){if(void 0===m)return j(v);if(y)return clearTimeout(m),m=setTimeout(E,t),x(v)}return void 0===m&&(m=setTimeout(E,t)),f}return t=o(t)||0,a(n)&&(p=!!n.leading,s=(y="maxWait"in n)?i(o(n.maxWait)||0,t):s,b="trailing"in n?!!n.trailing:b),g.cancel=function(){void 0!==m&&clearTimeout(m),d=0,l=v=u=m=void 0},g.flush=function(){return void 0===m?f:O(r())},g}},t4m3:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("sEfC"),r=n.n(a),o=n("q1tI");function i(){var e=Object(o.useState)(""),t=e[0],n=e[1],a=r()(n,250);return{searchTerm:t,onChange:Object(o.useCallback)((function(e){return a(e.target.value)}),[a])}}},tLB3:function(e,t,n){var a=n("GoyQ"),r=n("/9aa"),o=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(r(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=c.test(e);return n||l.test(e)?u(e.slice(2),n?2:8):i.test(e)?NaN:+e}}}]);
//# sourceMappingURL=component---src-templates-vendor-js-99825039811a09d309f9.js.map