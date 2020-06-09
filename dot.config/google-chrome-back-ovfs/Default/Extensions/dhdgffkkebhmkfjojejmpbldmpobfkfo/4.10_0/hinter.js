'use strict';Registry.require(["promise","helper"],()=>{const c=rea.FEATURES,p=Registry.get("helper"),x=Registry.get("promise");let f;const a=c.RUNTIME.BROWSER_VERSION;let h=!0;f=c.RUNTIME.CHROME?64<=a?2018:59<=a?2017:47<=a?2015:5:c.RUNTIME.SAFARI?11<=a?2018:10<=a?2017:6<=a?2015:6<=a?5:3:c.RUNTIME.EDGE?16<=a?2017:2016:c.RUNTIME.FIREFOX?58<=a?2018:52<=a?2017:2016:5;const t={};c.RUNTIME.CHROME&&77>a?(h=!1,console.warn("hint: disable inline ESLint config due to web worker CSP issues","https://bugs.chromium.org/p/chromium/issues/detail?id=777076",
"https://bugs.chromium.org/p/chromium/issues/detail?id=159303")):c.RUNTIME.EDGE?(h=!1,console.warn("hint: disable inline ESLint config due to web worker CSP issues")):window.Worker||(h=!1,console.warn("hint: disable inline ESLint config because web workers are unavailable and this extension's CSP doesn't allow unsafe eval, which is required for ESLint's dynamic reconfigration"));const q={env:{es6:2015<=f,browser:!0},parserOptions:{ecmaVersion:f,sourceType:"script",ecmaFeatures:{globalReturn:!0}},
rules:{curly:[1,"multi-line"],"dot-location":0,"dot-notation":[1,{allowKeywords:!0}],"no-caller":1,"no-case-declarations":2,"no-div-regex":0,"no-empty-pattern":2,"no-eq-null":0,"no-eval":1,"no-extra-bind":1,"no-fallthrough":1,"no-implicit-globals":2,"no-implied-eval":1,"no-lone-blocks":1,"no-loop-func":1,"no-multi-spaces":1,"no-multi-str":1,"no-native-reassign":1,"no-octal-escape":2,"no-octal":2,"no-proto":1,"no-redeclare":2,"no-return-assign":1,"no-sequences":1,"no-undef":1,"no-useless-call":1,"no-useless-concat":1,
"no-with":1}},k={};p.each("uneval unsafeWindow TM_info GM_info GM GM_addStyle GM_deleteValue GM_listValues GM_getValue GM_download GM_log GM_registerMenuCommand GM_unregisterMenuCommand GM_openInTab GM_setValue GM_addValueChangeListener GM_removeValueChangeListener GM_xmlhttpRequest GM_getTab GM_setTab GM_saveTab GM_getTabs GM_setClipboard GM_notification GM_getResourceText GM_getResourceURL".split(" "),a=>{k[a]="writeable"});q.globals=k;let d;const e={};let l;Registry.register("hinter","289e8b91",
{hint:function(a,g,f){const m=x(),u=m.promise(),v=f||t;let b;g?(b=g,b.globals=p.assign(b.globals||{},k)):b=q;if(window.Worker&&!c.RUNTIME.SAFARI){const c=()=>{d=new Worker("worker/lint.js");d.onmessage=a=>{a=a.data;const n=a.id;var b;let c;n&&(b=e[n])&&(c=b.d)&&(delete e[n],(b=a.results)?(h||(b=b.map(a=>{let b;a.message&&(b=a.message.match(/Configuration for rule "([^"]+)"[\s\S]*evaluate a string as JavaScript[\s\S]*/))&&(a.message='Rule "'+b[1]+'": ESLint inline configuration is not supported by this browser.',
a.severity=1);return a})),c.resolve(b)):c.reject(a.error||"Unknown error"));r(n)};d.postMessage({method:"base_uri",value:rea.extension.getURL("/")});l=null};var r=a=>{d||c();if(a)l=null;else if(l)return;let b,w=Date.now();Object.keys(e).forEach(a=>{e[a].ts<=w&&(b=e[a],w=b.ts)});b&&(l=b.id,d.postMessage({method:b.method,id:b.id,config:b.c,options:b.o,text:b.t}))};u.abort=()=>{d&&(d.terminate(),d=null,r())};d||c();g=p.createUUID();e[g]={method:"lint",id:g,d:m,t:a,c:b,o:v,ts:Date.now()};r()}else Registry.vendor("vendor/eslint/eslint",
()=>{try{const c=new window.eslint.Linter;b.extends&&b.extends.includes("eslint:recommended")&&(b.rules=b.rules||[],c.getRules().forEach(function(a,c){let d,e,f,g;if(a&&(e=a.meta)&&void 0===b.rules[c]&&(d=e.docs)&&d.recommended){if(a=e.schema)if(a.forEach(a=>{g||"object"!=a.type||(f={},Object.keys(a.properties).forEach(b=>{void 0!==a.properties[b].default&&(f[b]=a.properties[b].default,g=!0)}))}),g){b.rules[c]=f;return}b.rules[c]=1}}));const d=c.verify(a,b,v);m.resolve(d||[])}catch(y){m.reject(y)}});
return u},globals:k,config:q,options:t,autoHintMaxLength:5E4})});
