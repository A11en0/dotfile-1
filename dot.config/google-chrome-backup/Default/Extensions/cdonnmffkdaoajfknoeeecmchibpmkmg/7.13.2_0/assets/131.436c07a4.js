(window.saladictEntry=window.saladictEntry||[]).push([[131],{621:function(e,t,a){"use strict";a.r(t),a.d(t,"DictBing",(function(){return s}));var n=a(0),c=a.n(n),l=a(118);const s=({result:e})=>{switch(e.type){case"lex":return function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"dictBing-Title"},e.title),e.phsym&&c.a.createElement("ul",{className:"dictBing-Phsym"},e.phsym.map(e=>c.a.createElement("li",{className:"dictBing-PhsymItem",key:e.lang+e.pron},e.lang," ",c.a.createElement(l.c,{src:e.pron})))),e.cdef&&c.a.createElement("ul",{className:"dictBing-Cdef"},e.cdef.map(e=>c.a.createElement("li",{className:"dictBing-CdefItem",key:e.pos},c.a.createElement("span",{className:"dictBing-CdefItem_Pos"},e.pos),c.a.createElement("span",{className:"dictBing-CdefItem_Def"},e.def)))),e.infs&&c.a.createElement("ul",{className:"dictBing-Inf"},"词形：",e.infs.map(e=>c.a.createElement("li",{className:"dictBing-InfItem",key:e},e))),e.sentences&&c.a.createElement("ol",{className:"dictBing-SentenceList"},e.sentences.map(e=>c.a.createElement("li",{className:"dictBing-SentenceItem",key:e.en},e.en&&c.a.createElement("p",null,c.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.en}})," ",c.a.createElement(l.c,{src:e.mp3})),e.chs&&c.a.createElement("p",{dangerouslySetInnerHTML:{__html:e.chs}}),e.source&&c.a.createElement("footer",{className:"dictBing-SentenceSource"},e.source)))))}(e);case"machine":return function(e){return c.a.createElement("p",null,e.mt)}(e);case"related":return function(e){return c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",{className:"dictBing-Related_Title"},e.title),e.defs.map(e=>c.a.createElement(c.a.Fragment,{key:e.title},c.a.createElement("h2",{className:"dictBing-Related_Title"},e.title),c.a.createElement("ul",null,e.meanings.map(e=>c.a.createElement("li",{className:"dictBing-Related_Meaning",key:e.word},c.a.createElement("a",{className:"dictBing-Related_Meaning_Word",href:e.href},e.word),c.a.createElement("span",{className:"dictBing-Related_Meaning_Def"},e.def)))))))}(e);default:return null}};t.default=s}}]);