(window.saladictEntry=window.saladictEntry||[]).push([[94],{1292:function(e,t,a){"use strict";var n=a(0),r=a.n(n);t.a=e=>{const{title:t,className:a,children:n,...l}=e;return r.a.createElement("div",{className:"entryBox-Wrap"+(a?" "+a:""),...l},r.a.createElement("section",{className:"entryBox"},r.a.createElement("h1",{className:"entryBox-Title"},t),r.a.createElement("div",null,n)))}},624:function(e,t,a){"use strict";a.r(t),a.d(t,"DictCambridge",(function(){return c}));var n=a(0),r=a.n(n),l=a(1292);const c=({result:e})=>r.a.createElement("div",{className:"dictCNKI"},e.dict.length>0&&r.a.createElement(l.a,{title:"英汉汉英词典"},e.dict.map(({word:e,href:t},a)=>r.a.createElement("a",{key:a,className:"dictCNKI-DictLink",href:t,target:"_blank",rel:"nofollow noopener noreferrer"},e))),e.senbi.length>0&&r.a.createElement(l.a,{title:"双语例句",className:"dictCNKI-Sensbi"},e.senbi.map(({title:e,more:t,sens:a},n)=>r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("h2",{className:"dictCNKI-SensTitle"},e),a.map((e,t)=>r.a.createElement("p",{key:t,dangerouslySetInnerHTML:{__html:e}})),r.a.createElement("div",{className:"dictCNKI-SensMore"},r.a.createElement("a",{href:t,target:"_blank",rel:"nofollow noopener noreferrer"},"更多"))))),e.seneng.length>0&&r.a.createElement(l.a,{title:"英文例句",className:"dictCNKI-Senseng"},e.seneng.map(({title:e,more:t,sens:a},n)=>r.a.createElement(r.a.Fragment,{key:n},r.a.createElement("h2",{className:"dictCNKI-SensTitle"},e),a.map((e,t)=>r.a.createElement("p",{key:t,dangerouslySetInnerHTML:{__html:e}})),r.a.createElement("div",{className:"dictCNKI-SensMore"},r.a.createElement("a",{href:t,target:"_blank",rel:"nofollow noopener noreferrer"},"更多"))))));t.default=c}}]);