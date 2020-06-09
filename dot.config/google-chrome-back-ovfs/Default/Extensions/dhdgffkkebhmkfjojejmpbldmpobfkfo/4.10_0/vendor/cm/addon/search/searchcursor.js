(function(m){"object"==typeof exports&&"object"==typeof module?m(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],m):m(CodeMirror)})(function(m){function p(b,a){var c=b.flags;for(var d=c=null!=c?c:(b.ignoreCase?"i":"")+(b.global?"g":"")+(b.multiline?"m":""),e=0;e<a.length;e++)-1==d.indexOf(a.charAt(e))&&(d+=a.charAt(e));return c==d?b:new RegExp(b.source,d)}function v(b,a,c){a=p(a,"g");var d=c.line,e=c.ch;for(c=b.lastLine();d<=c;d++,e=0)if(a.lastIndex=
e,e=b.getLine(d),e=a.exec(e))return{from:h(d,e.index),to:h(d,e.index+e[0].length),match:e}}function x(b,a,c){if(!/\\s|\\n|\n|\\W|\\D|\[\^/.test(a.source))return v(b,a,c);a=p(a,"gm");for(var d,e=1,f=c.line,n=b.lastLine();f<=n;){for(var g=0;g<e&&!(f>n);g++){var k=b.getLine(f++);d=null==d?k:d+"\n"+k}e*=2;a.lastIndex=c.ch;if(g=a.exec(d))return a=d.slice(0,g.index).split("\n"),b=g[0].split("\n"),c=c.line+a.length-1,a=a[a.length-1].length,{from:h(c,a),to:h(c+b.length-1,1==b.length?a+b[0].length:b[b.length-
1].length),match:g}}}function w(b,a){for(var c=0,d;;){a.lastIndex=c;c=a.exec(b);if(!c)return d;d=c;c=d.index+(d[0].length||1);if(c==b.length)return d}}function y(b,a,c){a=p(a,"g");var d=c.line,e=c.ch;for(c=b.firstLine();d>=c;d--,e=-1){var f=b.getLine(d);-1<e&&(f=f.slice(0,e));if(e=w(f,a))return{from:h(d,e.index),to:h(d,e.index+e[0].length),match:e}}}function z(b,a,c){a=p(a,"gm");for(var d,e=1,f=c.line,n=b.firstLine();f>=n;){for(var g=0;g<e;g++){var k=b.getLine(f--);d=null==d?k.slice(0,c.ch):k+"\n"+
d}e*=2;if(g=w(d,a))return a=d.slice(0,g.index).split("\n"),b=g[0].split("\n"),f+=a.length,a=a[a.length-1].length,{from:h(f,a),to:h(f+b.length-1,1==b.length?a+b[0].length:b[b.length-1].length),match:g}}}function q(b,a,c,d){if(b.length==a.length)return c;var e=0;for(a=c+Math.max(0,b.length-a.length);;){if(e==a)return e;var f=e+a>>1,h=d(b.slice(0,f)).length;if(h==c)return f;h>c?a=f:e=f+1}}function A(b,a,c,d){if(!a.length)return null;d=d?r:t;a=d(a).split(/\r|\n\r?/);var e=c.line;c=c.ch;var f=b.lastLine()+
1-a.length;a:for(;e<=f;e++,c=0){var n=b.getLine(e).slice(c),g=d(n);if(1==a.length){var k=g.indexOf(a[0]);if(-1==k)continue a;q(n,g,k,d);return{from:h(e,q(n,g,k,d)+c),to:h(e,q(n,g,k+a[0].length,d)+c)}}k=g.length-a[0].length;if(g.slice(k)!=a[0])continue a;for(var l=1;l<a.length-1;l++)if(d(b.getLine(e+l))!=a[l])continue a;l=b.getLine(e+a.length-1);var m=d(l),p=a[a.length-1];if(m.slice(0,p.length)!=p)continue a;return{from:h(e,q(n,g,k,d)+c),to:h(e+a.length-1,q(l,m,p.length,d))}}}function B(b,a,c,d){if(!a.length)return null;
d=d?r:t;a=d(a).split(/\r|\n\r?/);var e=c.line,f=c.ch,n=b.firstLine()-1+a.length;a:for(;e>=n;e--,f=-1){var g=b.getLine(e);-1<f&&(g=g.slice(0,f));f=d(g);if(1==a.length){c=f.lastIndexOf(a[0]);if(-1==c)continue a;return{from:h(e,q(g,f,c,d)),to:h(e,q(g,f,c+a[0].length,d))}}var k=a[a.length-1];if(f.slice(0,k.length)!=k)continue a;var l=1;for(c=e-a.length+1;l<a.length-1;l++)if(d(b.getLine(c+l))!=a[l])continue a;c=b.getLine(e+1-a.length);l=d(c);if(l.slice(l.length-a[0].length)!=a[0])continue a;return{from:h(e+
1-a.length,q(c,l,c.length-a[0].length,d)),to:h(e,q(g,f,k.length,d))}}}function u(b,a,c,d){this.atOccurrence=!1;this.doc=b;c=c?b.clipPos(c):h(0,0);this.pos={from:c,to:c};if("object"==typeof d)var e=d.caseFold;else e=d,d=null;"string"==typeof a?(null==e&&(e=!1),this.matches=function(c,d){return(c?B:A)(b,a,d,e)}):(a=p(a,"gm"),this.matches=d&&!1===d.multiline?function(c,d){return(c?y:v)(b,a,d)}:function(c,d){return(c?z:x)(b,a,d)})}var h=m.Pos;if(String.prototype.normalize){var r=function(b){return b.normalize("NFD").toLowerCase()};
var t=function(b){return b.normalize("NFD")}}else r=function(b){return b.toLowerCase()},t=function(b){return b};u.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(b){for(var a=this.matches(b,this.doc.clipPos(b?this.pos.from:this.pos.to));a&&0==m.cmpPos(a.from,a.to);)b?a.from.ch?a.from=h(a.from.line,a.from.ch-1):a=a.from.line==this.doc.firstLine()?null:this.matches(b,this.doc.clipPos(h(a.from.line-1))):a.to.ch<this.doc.getLine(a.to.line).length?
a.to=h(a.to.line,a.to.ch+1):a=a.to.line==this.doc.lastLine()?null:this.matches(b,h(a.to.line+1,0));if(a)return this.pos=a,this.atOccurrence=!0,this.pos.match||!0;b=h(b?this.doc.firstLine():this.doc.lastLine()+1,0);this.pos={from:b,to:b};return this.atOccurrence=!1},from:function(){if(this.atOccurrence)return this.pos.from},to:function(){if(this.atOccurrence)return this.pos.to},replace:function(b,a){this.atOccurrence&&(b=m.splitLines(b),this.doc.replaceRange(b,this.pos.from,this.pos.to,a),this.pos.to=
h(this.pos.from.line+b.length-1,b[b.length-1].length+(1==b.length?this.pos.from.ch:0)))}};m.defineExtension("getSearchCursor",function(b,a,c){return new u(this.doc,b,a,c)});m.defineDocExtension("getSearchCursor",function(b,a,c){return new u(this,b,a,c)});m.defineExtension("selectMatches",function(b,a){var c=[];for(b=this.getSearchCursor(b,this.getCursor("from"),a);b.findNext()&&!(0<m.cmpPos(b.to(),this.getCursor("to")));)c.push({anchor:b.from(),head:b.to()});c.length&&this.setSelections(c,0)})});
