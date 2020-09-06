'use strict';Registry.require(["helper","promise"],()=>{const k=Registry.get("helper"),g=Registry.get("promise"),h={items:{},remove:function(e){delete h.items[e]},create:function(e){let a={};const d={retimeout_on_get:!1,timeout:300,check_interval:120};let f;const b={init:function(){f||b.schedule()},schedule:function(){b.unschedule();f=window.setInterval(b.clean,1E3*d.check_interval)},unschedule:function(){f&&window.clearInterval(f);f=null},setOptions:function(c){for(const a in c)c.hasOwnProperty(a)&&
(d[a]=c[a],"check_interval"==a&&f&&b.schedule());return b},set:function(c,b){a[c]={value:b,ts:Date.now()}},setj:function(c,a){return b.set(c,a?JSON.stringify(a):a)},get:function(c,b){a[c]&&(d.retimeout_on_get&&(a[c].ts=Date.now()),b=a[c].value);return b},getj:function(){const a=b.get.apply(this,arguments);return a?JSON.parse(a):a},remove:function(c){delete a[c]},clean:function(){const c=Date.now()-1E3*d.timeout;k.each(a,(a,d)=>{a.ts<c&&window.setTimeout(()=>{b.remove(d)},1)})},removeAll:function(){a=
{}},finalize:function(){b.unschedule();a={}}};return h.items[e]=b}};Registry.register("tools","289e8b91",{cache:h,createQueue:e=>{const a=[],d=[],f=()=>{let b;if(d.length<e&&a.length&&(b=a.shift())){const a=b.fn();d.push(a);a.always(()=>{let b;-1<(b=d.indexOf(a))&&d.splice(b,1);f()});b.p.consume(a)}};return{add:function(b){const c=g();a.push({fn:b,p:c});f();return c.promise()}}},sleep:e=>{const a=g();window.setTimeout(()=>{a.resolve()},e);return a.promise()},readAsText:e=>{const a=g(),d=
new FileReader;d.onloadend=function(){a.resolve(this.result)};d.onerror=a.reject;d.onabort=a.reject;d.readAsText(e);return a.promise()}})});