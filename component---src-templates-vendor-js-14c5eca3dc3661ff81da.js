(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"/9aa":function(e,t,n){var a=n("NykK"),r=n("ExA7");e.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==a(e)}},"7nnF":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return y}));var a=n("Wbzz"),r=n("q1tI"),o=n.n(r),i=n("sjrs"),c=n("3Z9Z"),l=n("JI6e"),u=n("6xyR"),s=n("jDKy"),f=n("iR1w"),v=n("7oih"),m=n("EYWl"),d=n("t4m3"),p=n("7Qib");function y(e){var t=e.data,n=t.vendorsJson,r=t.allFlavorsJson.nodes,y=Object(d.a)(),b=y.searchTerm,x=y.onChange,j=r.filter((function(e){var t=new RegExp(b,"i");return""===b||t.test(e.name)}));function h(e){var t=e.index,n=e.style,r=j[t];return o.a.createElement(a.Link,{to:Object(p.getFlavorSlug)(r)},o.a.createElement(i.a.Item,{style:n},o.a.createElement(c.a,null,o.a.createElement(l.a,{md:10},r.name),o.a.createElement(l.a,{md:2},r.recipe_count," recipes"))))}j.sort((function(e,t){return e.name.localeCompare(t.name)}));var E=n.name,O=n.flavors.count+" flavors";return o.a.createElement(v.a,null,o.a.createElement(m.a,{title:E,description:O}),o.a.createElement(u.a,null,o.a.createElement(u.a.Header,null,o.a.createElement(u.a.Title,null,o.a.createElement("h1",null,n.name))),o.a.createElement(u.a.Body,null,o.a.createElement(s.a,{type:"text",onChange:x,placeholder:"search by name"}),o.a.createElement(f.a,{height:800,itemData:j,itemCount:j.length,itemSize:60},h))))}},AP2z:function(e,t,n){var a=n("nmnc"),r=Object.prototype,o=r.hasOwnProperty,i=r.toString,c=a?a.toStringTag:void 0;e.exports=function(e){var t=o.call(e,c),n=e[c];try{e[c]=void 0;var a=!0}catch(l){}var r=i.call(e);return a&&(t?e[c]=n:delete e[c]),r}},ExA7:function(e,t){e.exports=function(e){return null!=e&&"object"==typeof e}},GoyQ:function(e,t){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},KfNM:function(e,t){var n=Object.prototype.toString;e.exports=function(e){return n.call(e)}},Kz5y:function(e,t,n){var a=n("WFqU"),r="object"==typeof self&&self&&self.Object===Object&&self,o=a||r||Function("return this")();e.exports=o},NykK:function(e,t,n){var a=n("nmnc"),r=n("AP2z"),o=n("KfNM"),i=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?r(e):o(e)}},QIyF:function(e,t,n){var a=n("Kz5y");e.exports=function(){return a.Date.now()}},WFqU:function(e,t,n){(function(t){var n="object"==typeof t&&t&&t.Object===Object&&t;e.exports=n}).call(this,n("yLpj"))},jDKy:function(e,t,n){"use strict";var a=n("k1TG"),r=n("8o2o"),o=n("TSYQ"),i=n.n(o),c=(n("K9S6"),n("q1tI")),l=n.n(c),u=(n("2W6z"),l.a.forwardRef((function(e,t){var n=e.as,o=void 0===n?"div":n,c=e.className,u=e.type,s=void 0===u?"valid":u,f=e.tooltip,v=void 0!==f&&f,m=Object(r.a)(e,["as","className","type","tooltip"]);return l.a.createElement(o,Object(a.a)({},m,{ref:t,className:i()(c,s+"-"+(v?"tooltip":"feedback"))}))})));u.displayName="Feedback";var s=u,f=l.a.createContext({controlId:void 0}),v=n("vUet"),m=l.a.forwardRef((function(e,t){var n,o,u=e.bsPrefix,s=e.bsCustomPrefix,m=e.type,d=e.size,p=e.htmlSize,y=e.id,b=e.className,x=e.isValid,j=void 0!==x&&x,h=e.isInvalid,E=void 0!==h&&h,O=e.plaintext,g=e.readOnly,N=e.custom,w=e.as,z=void 0===w?"input":w,T=Object(r.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),C=Object(c.useContext)(f).controlId,S=N?[s,"custom"]:[u,"form-control"],I=S[0],F=S[1];if(u=Object(v.a)(I,F),O)(o={})[u+"-plaintext"]=!0,n=o;else if("file"===m){var k;(k={})[u+"-file"]=!0,n=k}else if("range"===m){var K;(K={})[u+"-range"]=!0,n=K}else if("select"===z&&N){var P;(P={})[u+"-select"]=!0,P[u+"-select-"+d]=d,n=P}else{var Q;(Q={})[u]=!0,Q[u+"-"+d]=d,n=Q}return l.a.createElement(z,Object(a.a)({},T,{type:m,size:p,ref:t,readOnly:g,id:y||C,className:i()(b,n,j&&"is-valid",E&&"is-invalid")}))}));m.displayName="FormControl";t.a=Object.assign(m,{Feedback:s})},nmnc:function(e,t,n){var a=n("Kz5y").Symbol;e.exports=a},sEfC:function(e,t,n){var a=n("GoyQ"),r=n("QIyF"),o=n("tLB3"),i=Math.max,c=Math.min;e.exports=function(e,t,n){var l,u,s,f,v,m,d=0,p=!1,y=!1,b=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function x(t){var n=l,a=u;return l=u=void 0,d=t,f=e.apply(a,n)}function j(e){return d=e,v=setTimeout(E,t),p?x(e):f}function h(e){var n=e-m;return void 0===m||n>=t||n<0||y&&e-d>=s}function E(){var e=r();if(h(e))return O(e);v=setTimeout(E,function(e){var n=t-(e-m);return y?c(n,s-(e-d)):n}(e))}function O(e){return v=void 0,b&&l?x(e):(l=u=void 0,f)}function g(){var e=r(),n=h(e);if(l=arguments,u=this,m=e,n){if(void 0===v)return j(m);if(y)return clearTimeout(v),v=setTimeout(E,t),x(m)}return void 0===v&&(v=setTimeout(E,t)),f}return t=o(t)||0,a(n)&&(p=!!n.leading,s=(y="maxWait"in n)?i(o(n.maxWait)||0,t):s,b="trailing"in n?!!n.trailing:b),g.cancel=function(){void 0!==v&&clearTimeout(v),d=0,l=m=u=v=void 0},g.flush=function(){return void 0===v?f:O(r())},g}},t4m3:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("sEfC"),r=n.n(a),o=n("q1tI");function i(){var e=Object(o.useState)(""),t=e[0],n=e[1],a=r()(n,250);return{searchTerm:t,onChange:Object(o.useCallback)((function(e){return a(e.target.value)}),[a])}}},tLB3:function(e,t,n){var a=n("GoyQ"),r=n("/9aa"),o=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,c=/^0b[01]+$/i,l=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(r(e))return NaN;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=c.test(e);return n||l.test(e)?u(e.slice(2),n?2:8):i.test(e)?NaN:+e}}}]);
//# sourceMappingURL=component---src-templates-vendor-js-14c5eca3dc3661ff81da.js.map