(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"62xa":function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return E}));var n=a("Wbzz"),r=a("q1tI"),i=a.n(r),l=a("sjrs"),s=a("3Z9Z"),c=a("JI6e"),o=a("7vrA"),u=a("6xyR"),m=a("jDKy"),d=a("iR1w"),f=a("t4m3"),v=a("7oih"),p=a("EYWl"),b=a("7Qib");function E(e){var t=e.data.allRecipesJson.nodes,a=Object(f.a)(),r=a.searchTerm,E=a.onChange,h=t.filter((function(e){var t=new RegExp(r,"i");return""===r||t.test(e.name)||t.test(e.author)}));function y(e){var t=e.index,a=e.style,r=h[t];return i.a.createElement(n.Link,{key:r.id,to:Object(b.getRecipeSlug)(r)},i.a.createElement(l.a.Item,{style:a},i.a.createElement(s.a,null,i.a.createElement(c.a,{md:10},r.name," by ",r.author),i.a.createElement(c.a,{md:2},r.views," views"))))}return h.sort((function(e,t){return t.views-e.views})),i.a.createElement(v.a,null,i.a.createElement(p.a,{title:"Recipes",description:"Tracking "+t.length+" recipes"}),i.a.createElement(o.a,null,i.a.createElement(u.a,null,i.a.createElement(u.a.Header,null,i.a.createElement(u.a.Title,null,i.a.createElement("h1",null,"Recipes"))),i.a.createElement(u.a.Body,null,i.a.createElement(m.a,{type:"text",onChange:E,placeholder:"search by name or author"}),i.a.createElement(l.a,{variant:"flush"},i.a.createElement(d.a,{height:800,itemData:h,itemCount:h.length,itemSize:60},y))))))}},jDKy:function(e,t,a){"use strict";var n=a("k1TG"),r=a("8o2o"),i=a("TSYQ"),l=a.n(i),s=(a("K9S6"),a("q1tI")),c=a.n(s),o=(a("2W6z"),c.a.forwardRef((function(e,t){var a=e.as,i=void 0===a?"div":a,s=e.className,o=e.type,u=void 0===o?"valid":o,m=e.tooltip,d=void 0!==m&&m,f=Object(r.a)(e,["as","className","type","tooltip"]);return c.a.createElement(i,Object(n.a)({},f,{ref:t,className:l()(s,u+"-"+(d?"tooltip":"feedback"))}))})));o.displayName="Feedback";var u=o,m=c.a.createContext({controlId:void 0}),d=a("vUet"),f=c.a.forwardRef((function(e,t){var a,i,o=e.bsPrefix,u=e.bsCustomPrefix,f=e.type,v=e.size,p=e.htmlSize,b=e.id,E=e.className,h=e.isValid,y=void 0!==h&&h,g=e.isInvalid,j=void 0!==g&&g,w=e.plaintext,x=e.readOnly,O=e.custom,C=e.as,k=void 0===C?"input":C,z=Object(r.a)(e,["bsPrefix","bsCustomPrefix","type","size","htmlSize","id","className","isValid","isInvalid","plaintext","readOnly","custom","as"]),I=Object(s.useContext)(m).controlId,R=O?[u,"custom"]:[o,"form-control"],N=R[0],S=R[1];if(o=Object(d.a)(N,S),w)(i={})[o+"-plaintext"]=!0,a=i;else if("file"===f){var T;(T={})[o+"-file"]=!0,a=T}else if("range"===f){var J;(J={})[o+"-range"]=!0,a=J}else if("select"===k&&O){var P;(P={})[o+"-select"]=!0,P[o+"-select-"+v]=v,a=P}else{var q;(q={})[o]=!0,q[o+"-"+v]=v,a=q}return c.a.createElement(k,Object(n.a)({},z,{type:f,size:p,ref:t,readOnly:x,id:b||I,className:l()(E,a,y&&"is-valid",j&&"is-invalid")}))}));f.displayName="FormControl";t.a=Object.assign(f,{Feedback:u})},t4m3:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a("sEfC"),r=a.n(n),i=a("q1tI");function l(){var e=Object(i.useState)(""),t=e[0],a=e[1],n=r()(a,250);return{searchTerm:t,onChange:Object(i.useCallback)((function(e){return n(e.target.value)}),[n])}}}}]);
//# sourceMappingURL=component---src-pages-recipes-js-3f67e46a6223b85224f5.js.map