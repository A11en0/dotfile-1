(window.saladictEntry=window.saladictEntry||[]).push([[30],{118:function(e,t,r){"use strict";r.d(t,"a",(function(){return a})),r.d(t,"b",(function(){return c})),r.d(t,"d",(function(){return s})),r.d(t,"e",(function(){return l}));var n=r(0),o=r.n(n),i=r(44);const a=e=>{if(!e.src)return null;const t=e.width||e.height||"1.2em",r=e.height||t;return o.a.createElement("a",{className:"saladict-Speaker",href:e.src,target:"_blank",rel:"noopener noreferrer",style:{width:t,height:r}})};t.c=o.a.memo(a);const c=e=>{const{onPlayStart:t,...r}=e,a=Object(n.useCallback)(e=>{if(e.target&&"A"===e.target.tagName&&e.target.href&&e.target.classList&&e.target.classList.contains("saladict-Speaker")){e.preventDefault(),e.stopPropagation();const r=e.target;r.classList.add("isActive"),Object(i.b)([Object(i.d)(1e3),t(r.href)]).then(()=>{r.classList.remove("isActive")})}},[t]);return o.a.createElement("div",{onClick:a,...r})},s=e=>{if(!e)return"";const t=document.createElement("a");return t.target="_blank",t.href=e,t.className="saladict-Speaker",t},l=e=>e?`<a href="${e}" target="_blank" rel="noopener noreferrer" class="saladict-Speaker"></a>`:""},140:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(31),o=r(0);function i(e,t,r,i){const a=Object(n.f)(n.b);a.current.next=t,a.current.error=r,a.current.complete=i;const c=Object(o.useRef)();return c.current=Object(o.useMemo)(()=>(c.current&&c.current.unsubscribe(),e.subscribe({next:e=>a.current.next&&a.current.next(e),error:e=>{if(!a.current.error)throw e;a.current.error(e)},complete:()=>a.current.complete&&a.current.complete()})),[e]),Object(o.useEffect)(()=>()=>c.current.unsubscribe(),n.a),c.current}},174:function(e,t,r){"use strict";r.d(t,"a",(function(){return i}));var n=r(0),o=r(31);function i(e,t){const r=Object(o.f)(o.c),i=Object(o.f)(()=>e(r.current));return[Object(n.useRef)((...e)=>{r.current.next(t?t(e):e[0])}).current,i.current]}},31:function(e,t,r){"use strict";r.d(t,"d",(function(){return a})),r.d(t,"e",(function(){return c})),r.d(t,"c",(function(){return s})),r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return u})),r.d(t,"f",(function(){return d}));var n=r(0),o=r(73),i=r(153);function a(e){return e}function c(e){return Object(i.a)(0)(e)}function s(){return new o.a}function l(){return{}}const u=[];function d(e){const t=Object(n.useRef)(null);return null===t.current&&(t.current=e()),t}"undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?n.useLayoutEffect:n.useEffect},50:function(e,t,r){"use strict";r.d(t,"a",(function(){return i})),r.d(t,"b",(function(){return a}));r(503);var n=r(121),o=r.n(n);function i(e,t={}){return o()(e,{withCredentials:!1,...t,transformResponse:[e=>e],responseType:"document"}).then(({data:e})=>e)}function a(e,t={}){return o()(e,{withCredentials:!1,...t,transformResponse:[e=>e],responseType:"text"}).then(({data:e})=>e)}},503:function(e,t,r){e.exports=function(){"use strict";var e=Object.freeze||function(e){return e},t=e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),r=e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","audio","canvas","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","video","view","vkern"]),n=e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),o=e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),i=e(["#text"]),a=Object.freeze||function(e){return e},c=a(["accept","action","align","alt","autocomplete","background","bgcolor","border","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","coords","crossorigin","datetime","default","dir","disabled","download","enctype","face","for","headers","height","hidden","high","href","hreflang","id","integrity","ismap","label","lang","list","loop","low","max","maxlength","media","method","min","multiple","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","type","usemap","valign","value","width","xmlns"]),s=a(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),l=a(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),u=a(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),d=Object.hasOwnProperty,f=Object.setPrototypeOf,p=("undefined"!=typeof Reflect&&Reflect).apply;function m(e,t){f&&f(e,null);for(var r=t.length;r--;){var n=t[r];if("string"==typeof n){var o=n.toLowerCase();o!==n&&(Object.isFrozen(t)||(t[r]=o),n=o)}e[n]=!0}return e}function h(e){var t={},r=void 0;for(r in e)p(d,e,[r])&&(t[r]=e[r]);return t}p||(p=function(e,t,r){return e.apply(t,r)});var g=Object.seal||function(e){return e},y=g(/\{\{[\s\S]*|[\s\S]*\}\}/gm),b=g(/<%[\s\S]*|[\s\S]*%>/gm),v=g(/^data-[\-\w.\u00B7-\uFFFF]/),T=g(/^aria-[\-\w]+$/),A=g(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),x=g(/^(?:\w+script|data):/i),_=g(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205f\u3000]/g),O="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function S(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var w=("undefined"!=typeof Reflect&&Reflect).apply,E=Array.prototype.slice,L=Object.freeze,k=function(){return"undefined"==typeof window?null:window};w||(w=function(e,t,r){return e.apply(t,r)});var M=function(e,t){if("object"!==(void 0===e?"undefined":O(e))||"function"!=typeof e.createPolicy)return null;var r=null;t.currentScript&&t.currentScript.hasAttribute("data-tt-policy-suffix")&&(r=t.currentScript.getAttribute("data-tt-policy-suffix"));var n="dompurify"+(r?"#"+r:"");try{return e.createPolicy(n,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+n+" could not be created."),null}};return function e(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k(),d=function(t){return e(t)};if(d.version="1.0.11",d.removed=[],!a||!a.document||9!==a.document.nodeType)return d.isSupported=!1,d;var f=a.document,p=!1,g=!1,N=a.document,R=a.DocumentFragment,C=a.HTMLTemplateElement,D=a.Node,j=a.NodeFilter,z=a.NamedNodeMap,H=void 0===z?a.NamedNodeMap||a.MozNamedAttrMap:z,F=a.Text,q=a.Comment,I=a.DOMParser,P=a.TrustedTypes;if("function"==typeof C){var W=N.createElement("template");W.content&&W.content.ownerDocument&&(N=W.content.ownerDocument)}var U=M(P,f),B=U?U.createHTML(""):"",G=N,K=G.implementation,V=G.createNodeIterator,Y=G.getElementsByTagName,Z=G.createDocumentFragment,$=f.importNode,X={};d.isSupported=K&&void 0!==K.createHTMLDocument&&9!==N.documentMode;var J=y,Q=b,ee=v,te=T,re=x,ne=_,oe=A,ie=null,ae=m({},[].concat(S(t),S(r),S(n),S(o),S(i))),ce=null,se=m({},[].concat(S(c),S(s),S(l),S(u))),le=null,ue=null,de=!0,fe=!0,pe=!1,me=!1,he=!1,ge=!1,ye=!1,be=!1,ve=!1,Te=!1,Ae=!1,xe=!0,_e=!0,Oe=!1,Se={},we=m({},["audio","head","math","script","style","template","svg","video"]),Ee=m({},["audio","video","img","source","image"]),Le=null,ke=m({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]),Me=null,Ne=N.createElement("form"),Re=function(e){Me&&Me===e||(e&&"object"===(void 0===e?"undefined":O(e))||(e={}),ie="ALLOWED_TAGS"in e?m({},e.ALLOWED_TAGS):ae,ce="ALLOWED_ATTR"in e?m({},e.ALLOWED_ATTR):se,Le="ADD_URI_SAFE_ATTR"in e?m({},e.ADD_URI_SAFE_ATTR):ke,le="FORBID_TAGS"in e?m({},e.FORBID_TAGS):{},ue="FORBID_ATTR"in e?m({},e.FORBID_ATTR):{},Se="USE_PROFILES"in e&&e.USE_PROFILES,de=!1!==e.ALLOW_ARIA_ATTR,fe=!1!==e.ALLOW_DATA_ATTR,pe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,me=e.SAFE_FOR_JQUERY||!1,he=e.SAFE_FOR_TEMPLATES||!1,ge=e.WHOLE_DOCUMENT||!1,ve=e.RETURN_DOM||!1,Te=e.RETURN_DOM_FRAGMENT||!1,Ae=e.RETURN_DOM_IMPORT||!1,be=e.FORCE_BODY||!1,xe=!1!==e.SANITIZE_DOM,_e=!1!==e.KEEP_CONTENT,Oe=e.IN_PLACE||!1,oe=e.ALLOWED_URI_REGEXP||oe,he&&(fe=!1),Te&&(ve=!0),Se&&(ie=m({},[].concat(S(i))),ce=[],!0===Se.html&&(m(ie,t),m(ce,c)),!0===Se.svg&&(m(ie,r),m(ce,s),m(ce,u)),!0===Se.svgFilters&&(m(ie,n),m(ce,s),m(ce,u)),!0===Se.mathMl&&(m(ie,o),m(ce,l),m(ce,u))),e.ADD_TAGS&&(ie===ae&&(ie=h(ie)),m(ie,e.ADD_TAGS)),e.ADD_ATTR&&(ce===se&&(ce=h(ce)),m(ce,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&m(Le,e.ADD_URI_SAFE_ATTR),_e&&(ie["#text"]=!0),ge&&m(ie,["html","head","body"]),ie.table&&m(ie,["tbody"]),L&&L(e),Me=e)},Ce=function(e){d.removed.push({element:e});try{e.parentNode.removeChild(e)}catch(t){e.outerHTML=B}},De=function(e,t){try{d.removed.push({attribute:t.getAttributeNode(e),from:t})}catch(e){d.removed.push({attribute:null,from:t})}t.removeAttribute(e)},je=function(e){var t=void 0,r=void 0;if(be)e="<remove></remove>"+e;else{var n=e.match(/^[\s]+/);(r=n&&n[0])&&(e=e.slice(r.length))}if(p)try{t=(new I).parseFromString(e,"text/html")}catch(e){}if(g&&m(le,["title"]),!t||!t.documentElement){var o=(t=K.createHTMLDocument("")).body;o.parentNode.removeChild(o.parentNode.firstElementChild),o.outerHTML=U?U.createHTML(e):e}return r&&t.body.insertBefore(N.createTextNode(r),t.body.childNodes[0]||null),Y.call(t,ge?"html":"body")[0]};d.isSupported&&(function(){try{je('<svg><p><style><img src="</style><img src=x onerror=1//">').querySelector("svg img")&&(p=!0)}catch(e){}}(),function(){try{je("<x/><title>&lt;/title&gt;&lt;img&gt;").querySelector("title").innerHTML.match(/<\/title/)&&(g=!0)}catch(e){}}());var ze=function(e){return V.call(e.ownerDocument||e,e,j.SHOW_ELEMENT|j.SHOW_COMMENT|j.SHOW_TEXT,(function(){return j.FILTER_ACCEPT}),!1)},He=function(e){return!(e instanceof F||e instanceof q||"string"==typeof e.nodeName&&"string"==typeof e.textContent&&"function"==typeof e.removeChild&&e.attributes instanceof H&&"function"==typeof e.removeAttribute&&"function"==typeof e.setAttribute)},Fe=function(e){return"object"===(void 0===D?"undefined":O(D))?e instanceof D:e&&"object"===(void 0===e?"undefined":O(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},qe=function(e,t,r){X[e]&&X[e].forEach((function(e){e.call(d,t,r,Me)}))},Ie=function(e){var t=void 0;if(qe("beforeSanitizeElements",e,null),He(e))return Ce(e),!0;var r=e.nodeName.toLowerCase();if(qe("uponSanitizeElement",e,{tagName:r,allowedTags:ie}),!ie[r]||le[r]){if(_e&&!we[r]&&"function"==typeof e.insertAdjacentHTML)try{var n=e.innerHTML;e.insertAdjacentHTML("AfterEnd",U?U.createHTML(n):n)}catch(e){}return Ce(e),!0}return"noscript"===r&&e.innerHTML.match(/<\/noscript/i)||"noembed"===r&&e.innerHTML.match(/<\/noembed/i)?(Ce(e),!0):(!me||e.firstElementChild||e.content&&e.content.firstElementChild||!/</g.test(e.textContent)||(d.removed.push({element:e.cloneNode()}),e.innerHTML?e.innerHTML=e.innerHTML.replace(/</g,"&lt;"):e.innerHTML=e.textContent.replace(/</g,"&lt;")),he&&3===e.nodeType&&(t=(t=(t=e.textContent).replace(J," ")).replace(Q," "),e.textContent!==t&&(d.removed.push({element:e.cloneNode()}),e.textContent=t)),qe("afterSanitizeElements",e,null),!1)},Pe=function(e,t,r){if(xe&&("id"===t||"name"===t)&&(r in N||r in Ne))return!1;if(fe&&ee.test(t));else if(de&&te.test(t));else{if(!ce[t]||ue[t])return!1;if(Le[t]);else if(oe.test(r.replace(ne,"")));else if("src"!==t&&"xlink:href"!==t||"script"===e||0!==r.indexOf("data:")||!Ee[e])if(pe&&!re.test(r.replace(ne,"")));else if(r)return!1}return!0},We=function(e){var t=void 0,r=void 0,n=void 0,o=void 0,i=void 0;qe("beforeSanitizeAttributes",e,null);var a=e.attributes;if(a){var c={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce};for(i=a.length;i--;){var s=t=a[i],l=s.name,u=s.namespaceURI;if(r=t.value.trim(),n=l.toLowerCase(),c.attrName=n,c.attrValue=r,c.keepAttr=!0,qe("uponSanitizeAttribute",e,c),r=c.attrValue,"name"===n&&"IMG"===e.nodeName&&a.id)o=a.id,a=w(E,a,[]),De("id",e),De(l,e),a.indexOf(o)>i&&e.setAttribute("id",o.value);else{if("INPUT"===e.nodeName&&"type"===n&&"file"===r&&c.keepAttr&&(ce[n]||!ue[n]))continue;"id"===l&&e.setAttribute(l,""),De(l,e)}if(c.keepAttr){he&&(r=(r=r.replace(J," ")).replace(Q," "));var f=e.nodeName.toLowerCase();if(Pe(f,n,r))try{u?e.setAttributeNS(u,l,r):e.setAttribute(l,r),d.removed.pop()}catch(e){}}}qe("afterSanitizeAttributes",e,null)}},Ue=function e(t){var r=void 0,n=ze(t);for(qe("beforeSanitizeShadowDOM",t,null);r=n.nextNode();)qe("uponSanitizeShadowNode",r,null),Ie(r)||(r.content instanceof R&&e(r.content),We(r));qe("afterSanitizeShadowDOM",t,null)};return d.sanitize=function(e,t){var r=void 0,n=void 0,o=void 0,i=void 0,c=void 0;if(e||(e="\x3c!--\x3e"),"string"!=typeof e&&!Fe(e)){if("function"!=typeof e.toString)throw new TypeError("toString is not a function");if("string"!=typeof(e=e.toString()))throw new TypeError("dirty is not a string, aborting")}if(!d.isSupported){if("object"===O(a.toStaticHTML)||"function"==typeof a.toStaticHTML){if("string"==typeof e)return a.toStaticHTML(e);if(Fe(e))return a.toStaticHTML(e.outerHTML)}return e}if(ye||Re(t),d.removed=[],Oe);else if(e instanceof D)1===(n=(r=je("\x3c!--\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===n.nodeName||"HTML"===n.nodeName?r=n:r.appendChild(n);else{if(!ve&&!he&&!ge&&-1===e.indexOf("<"))return U?U.createHTML(e):e;if(!(r=je(e)))return ve?null:B}r&&be&&Ce(r.firstChild);for(var s=ze(Oe?e:r);o=s.nextNode();)3===o.nodeType&&o===i||Ie(o)||(o.content instanceof R&&Ue(o.content),We(o),i=o);if(i=null,Oe)return e;if(ve){if(Te)for(c=Z.call(r.ownerDocument);r.firstChild;)c.appendChild(r.firstChild);else c=r;return Ae&&(c=$.call(f,c,!0)),c}var l=ge?r.outerHTML:r.innerHTML;return he&&(l=(l=l.replace(J," ")).replace(Q," ")),U?U.createHTML(l):l},d.setConfig=function(e){Re(e),ye=!0},d.clearConfig=function(){Me=null,ye=!1},d.isValidAttribute=function(e,t,r){Me||Re({});var n=e.toLowerCase(),o=t.toLowerCase();return Pe(n,o,r)},d.addHook=function(e,t){"function"==typeof t&&(X[e]=X[e]||[],X[e].push(t))},d.removeHook=function(e){X[e]&&X[e].pop()},d.removeHooks=function(e){X[e]&&(X[e]=[])},d.removeAllHooks=function(){X={}},d}()}()},6:function(e,t,r){"use strict";r.d(t,"i",(function(){return a})),r.d(t,"h",(function(){return c})),r.d(t,"e",(function(){return s})),r.d(t,"b",(function(){return l})),r.d(t,"g",(function(){return u})),r.d(t,"d",(function(){return p})),r.d(t,"f",(function(){return m})),r.d(t,"j",(function(){return h})),r.d(t,"k",(function(){return g})),r.d(t,"a",(function(){return y})),r.d(t,"c",(function(){return b}));var n=r(503),o=r.n(n),i=(r(0),r(174),r(140),r(9),r(366),r(616),r(23));function a(){return Promise.reject(new Error("NO_RESULT"))}function c(){return Promise.reject(new Error("NETWORK_ERROR"))}async function s(e,t,{options:r,options_sel:n},o,a){("none"===r.keepLF||"pdf"===r.keepLF&&!a.isPDF||"webpage"===r.keepLF&&a.isPDF)&&(t=t.replace(/\n+/g," "));let c=a.sl;c||(Object(i.g)(t)?c="ja":Object(i.h)(t)&&(c="ko")),c||(c=await e.detect(t));let s="";return a.tl?s=a.tl:"default"===r.tl?n.tl.includes(o.langCode)&&(s=o.langCode):s=r.tl,s||(s=n.tl.find(e=>"default"!==e)||"en"),c===s&&(a.tl?a.sl||(c="auto"):s="default"===r.tl2?s!==o.langCode?o.langCode:"en"!==s?"en":n.tl.find(e=>"default"!==e&&e!==s)||"en":r.tl2),{sl:c,tl:s,text:t}}async function l(e){return null==e||/zh-TW|zh-HK/i.test(e)?(await r.e(109).then(r.bind(null,1285))).chsToChz:null}function u(e,...t){if(!e)return"";let r="",n=null;for(let e=t.length-1;e>=0;e--)"string"==typeof t[e]?r=t[e]:"function"==typeof t[e]&&(n=t[e]);const o=r?e.querySelector(r):e;if(!o)return"";const i=o.textContent||"";return n?n(i):i}const d={FORBID_TAGS:["style"],FORBID_ATTR:["style"]};function f(e,{mode:t="innerHTML",selector:r,transform:n,host:i,config:a=d}={}){const c=r?e.querySelector(r):e;if(!c)return"";if(i){const e=e=>{e.setAttribute("href",b(i,e,"href")),e.setAttribute("src",b(i,e,"src"))};"A"!==c.tagName&&"IMG"!==c.tagName||e(c),c.querySelectorAll("a").forEach(e),c.querySelectorAll("img").forEach(e)}const s=o.a.sanitize(c,{...a,RETURN_DOM_FRAGMENT:!0}),l=s.firstChild?s.firstChild[t]:"";return n?n(l):l}function p(e,t,r={}){return f(t,"string"==typeof r?{selector:r,host:e,mode:"innerHTML"}:{...r,host:e,mode:"innerHTML"})}function m(e,t,r={}){return f(t,"string"==typeof r?{selector:r,host:e,mode:"outerHTML"}:{...r,host:e,mode:"outerHTML"})}function h(e,t){const r=e.querySelector(t);r&&r.remove()}function g(e,t){e.querySelectorAll(t).forEach(e=>e.remove())}function y(e){e.setAttribute("target","_blank"),e.setAttribute("rel","nofollow noopener noreferrer")}function b(e,t,r){e.endsWith("/")&&(e=e.slice(0,-1));const n=e.startsWith("https")?"https:":"http:",o=t.getAttribute(r);return o?/^[a-zA-Z0-9]+:/.test(o)?o:o.startsWith("//")?n+o:/^.?\/+/.test(o)?e+"/"+o.replace(/^.?\/+/,""):e+"/"+o:""}},616:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));var n=r(3),o=r(7);function i(){}var a=r(34);function c(e,t,r){return function(n){return n.lift(new s(e,t,r))}}var s=function(){function e(e,t,r){this.nextOrObserver=e,this.error=t,this.complete=r}return e.prototype.call=function(e,t){return t.subscribe(new l(e,this.nextOrObserver,this.error,this.complete))},e}(),l=function(e){function t(t,r,n,o){var c=e.call(this,t)||this;return c._tapNext=i,c._tapError=i,c._tapComplete=i,c._tapError=n||i,c._tapComplete=o||i,Object(a.a)(r)?(c._context=c,c._tapNext=r):r&&(c._context=r,c._tapNext=r.next||i,c._tapError=r.error||i,c._tapComplete=r.complete||i),c}return n.__extends(t,e),t.prototype._next=function(e){try{this._tapNext.call(this._context,e)}catch(e){return void this.destination.error(e)}this.destination.next(e)},t.prototype._error=function(e){try{this._tapError.call(this._context,e)}catch(e){return void this.destination.error(e)}this.destination.error(e)},t.prototype._complete=function(){try{this._tapComplete.call(this._context)}catch(e){return void this.destination.error(e)}return this.destination.complete()},t}(o.a)},806:function(e,t,r){"use strict";r.r(t),r.d(t,"getSrcPage",(function(){return a})),r.d(t,"search",(function(){return c}));var n=r(50),o=r(118),i=r(6);const a=async(e,t)=>{switch(t.langCode){case"en":return"https://dictionary.cambridge.org/search/english/direct/?q="+e.trim().split(/\s+/).join("-");case"zh-CN":return"https://dictionary.cambridge.org/zhs/搜索/英语-汉语-简体/direct/?q="+e;case"zh-TW":return"https://dictionary.cambridge.org/zht/搜索/英語-漢語-繁體/direct/?q="+(await Object(i.b)())(e)}},c=(e,t,r,o)=>{const a="zh-CN"===t.langCode?"https://dictionary.cambridge.org/zhs/搜索/英语-汉语-简体/direct/?q=":"zh-TW"===t.langCode?"https://dictionary.cambridge.org/zht/搜索/英語-漢語-繁體/direct/?q=":"https://dictionary.cambridge.org/search/english/direct/?q=";return Object(n.a)(encodeURI(a)+e.toLocaleLowerCase().replace(/[^A-Za-z0-9]+/g,"-")).catch(i.h).then(s)};function s(e){const t=[],r={};return e.querySelectorAll(".entry-body__el").forEach(e=>{if(!Object(i.g)(e,".headword"))return;const n=e.querySelector(".pos-header");n&&(n.querySelectorAll(".dpron-i").forEach(e=>{const t=e.querySelector(".daud");if(!t)return;const n=t.querySelector('source[type="audio/mpeg"]');if(!n)return;const a=Object(i.c)("https://dictionary.cambridge.org",n,"src");a&&(t.replaceWith(Object(o.d)(a)),!r.uk&&e.classList.contains("uk")&&(r.uk=a),!r.us&&e.classList.contains("us")&&(r.us=a))}),Object(i.j)(n,".share")),e.querySelectorAll(".daccord_h").forEach(e=>{e.parentElement.classList.add("amp-accordion")}),e.querySelectorAll("a.had").forEach(i.a),t.push(Object(i.d)("https://dictionary.cambridge.org",e))}),t.length>0?{result:t,audio:r}:Object(i.i)()}}}]);