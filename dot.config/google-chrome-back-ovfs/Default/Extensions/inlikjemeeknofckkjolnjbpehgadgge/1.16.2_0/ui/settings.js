!function(e){function n(n){for(var t,o,i=n[0],a=n[1],u=0,c=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&c.push(r[o][0]),r[o]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t]);for(s&&s(n);c.length;)c.shift()()}var t={},r={9:0};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var n=[],t=r[e];if(0!==t)if(t)n.push(t[2]);else{var i=new Promise((function(n,o){t=r[e]=[n,o]}));n.push(t[2]=i);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(e){return o.p+""+({}[e]||e)+".js"}(e);var s=new Error;a=function(n){u.onerror=u.onload=null,clearTimeout(c);var t=r[e];if(0!==t){if(t){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",s.name="ChunkLoadError",s.type=o,s.request=i,t[1](s)}r[e]=void 0}};var c=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(n)},o.m=e,o.c=t,o.d=function(e,n,t){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(o.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)o.d(t,r,function(n){return e[n]}.bind(null,r));return t},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/",o.oe=function(e){throw console.error(e),e};var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);i.push=n,i=i.slice();for(var u=0;u<i.length;u++)n(i[u]);var s=a;o(o.s=42)}({17:function(e,n,t){var r={"./de/lang.js":[19,15],"./en-US/lang.js":[8,24],"./es/lang.js":[20,16],"./fr/lang.js":[21,17],"./it/lang.js":[22,18],"./ja/lang.js":[23,19],"./pl/lang.js":[24,20],"./pt/lang.js":[25,21],"./ru/lang.js":[28,0],"./sr/lang.js":[26,22],"./zh/lang.js":[27,23]};function o(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],o=n[0];return t.e(n[1]).then((function(){return t(o)}))}o.keys=function(){return Object.keys(r)},o.id=17,e.exports=o},2:function(e,n,t){"use strict";var r=function(e){const n={hasField:function(){return!1}};return["create","find","findOne","destroy","update"].forEach(t=>n[t]=function(n){return async function(){const t=[...arguments],r=t.pop();let o,i;try{o=["browser","chrome"],i=window["undefined"==typeof browser?o[1]:o[0]]}catch(e){console.error(e)}if("undefined"==typeof browser)i.runtime.sendMessage({type:"request",module:e,method:n,args:t},(function(e){r(...e)}));else{const o=await i.runtime.sendMessage({type:"request",module:e,method:n,args:t});r(...o)}}}(t)),n};const o=window.Backbone;if(!o)throw new Error("ADD Backbone");let i;try{const e=chrome.extension.getBackgroundPage();window.service=e,i=e}catch(e){i={store:new Proxy({},{get:(e,n)=>r(n)}),gEvents:o,CFG:{CLIENT:{TYPE:11}},Supports:{tabForXFrame:!0}}}n.a=i},42:function(e,n,t){"use strict";t.r(n);var r=t(2);window.DBG=1,window.USER={id:"0"},window.ROUTE_ROOT=chrome.runtime.getURL("settings.html"),window.PUSH_STATE=!1,window.LOCALE="en-US",window.URL_ROOT=r.a.CFG.URL.ROOT,window.URL_API=r.a.CFG.URL.API,r.a.store.UserStore.findOne({id:r.a.auth.getId()},(async function(e,n){window.USER=n||{id:0},window.LOCALE=(n?USER.locale:r.a.store.Prefs.get("locale"))||"en-US",await t(17)(`./${window.LOCALE}/lang.js`),(await Promise.all([t.e(3),t.e(0),t.e(1),t.e(2),t.e(13)]).then(t.bind(null,49))).default()}))}});
//# sourceMappingURL=settings.js.map