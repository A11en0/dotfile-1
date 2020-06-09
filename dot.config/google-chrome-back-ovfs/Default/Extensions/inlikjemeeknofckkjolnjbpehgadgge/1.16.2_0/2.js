(window.webpackJsonp=window.webpackJsonp||[]).push([[2],[,function(e,t,n){"use strict";t.a={TYPE_ERR:0,TYPE_TEXT:1,TYPE_HTML:2,TYPE_JSON:3,TYPE_XML:4,TYPE_FEED:5,TYPE_FORM:6,TYPE_PDF_HTML:7,TYPE_DOC:8,TYPE_RULE:1,TYPE_RULE_GROUP:2,OP_AND:1,OP_OR:2,CONTENT_TYPE_TEXT:1,CONTENT_TYPE_CHANGED_TEXT:2,CONTENT_TYPE_OLD_TEXT:3,RULE_NOT_EMPTY:1,RULE_HAS_TEXT:2,RULE_HAS_TEXT_NOT:3,RULE_HAS_NUMBER_LT:4,RULE_HAS_NUMBER_GT:5,RULE_HAS_NUMBER_DECR_MIN:6,RULE_HAS_NUMBER_INCR_MIN:7,RULE_MATCH_REGEX:8,RULE_HAS_NUMBER_DECR_PERCENT_MIN:9,RULE_HAS_NUMBER_INCR_PERCENT_MIN:10,STATE_DEFAULT:0,STATE_NEW:10,STATE_INIT:20,STATE_UNAUTHORIZED:30,STATE_AUTHORIZED:35,STATE_READY:40,STATE_PAUSED:45,STATE_RESTRICTED:50,STATE_DISCARD:90,STATE_DEL:100,STATE_DONE:100,STATE_PLAN_PUBLIC:0,STATE_PLAN_PRIVATE:70,STATE_ATTR_VERIFY:10,STATE_ATTR_VERIFY_INIT:20,STATE_ATTR_VERIFY_WAIT:30,STATE_ATTR_VERIFY_DONE:40,ACTION_EMAIL:1,ACTION_SMS:2,ACTION_PUSH:3,ACTION_MACRO:4,ACTION_WEBHOOK:5,ACTION_SLACK:6,ACTION_DISCORD:7,ACTION_LOCAL_AUDIO:101,ACTION_LOCAL_POPUP:102,ACTION_LOCAL_OPEN_TAB:103,RUN_STATE_INIT:1,RUN_STATE_WAIT:2,RUN_STATE_WIP:3,LOCAL_STATE_SYNCED:0,LOCAL_STATE_POST:1,LOCAL_STATE_PUT:2,LOCAL_STATE_DEL:3,CLIENT_FF:10,CLIENT_CR:11,CLIENT_OP:12,CLIENT_FFWX:13,CLIENT_MSE:14,CLIENT_MAC:20,CLIENT_WEBFF:50,CLIENT_DEDI:51,IMPORT_SOURCE_SITEMAP:1,TIME_INFINITE:2592e3}},,,,function(e,t,n){"use strict";const s=window._;if(!s)throw new Error("ADD _");function i(e){s.extend(this,e,this.parse(e.path))}function a(e){this.routes=s.map(e.routes,(function(e){return new i(e)}),this)}function r(e){try{return decodeURIComponent(e)}catch(t){return e}}s.extend(i.prototype,{match:function(e){const t=this.keys,n=this.params={},s=this.regexp.exec(e);if(!s)return!1;for(let i=1,a=s.length;i<a;++i){const a=t[i-1],o="string"==typeof s[i]?r(s[i]):s[i];if(!a)throw new Error("Nameless param not supported, path:"+e);n[a.name]=o}return!0},parse:function(e){const t=[];return e=e.concat("").replace(/\/\(/g,"(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,(function(e,n,s,i,a,r,o){return t.push({name:i,optional:!!r}),n=n||"",(r?"":n)+"(?:"+(r?n:"")+(s||"")+(a||s&&"([^/.]+?)"||"([^/]+?)")+")"+(r||"")+(o?"(/*)?":"")})).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.*)"),{keys:t,regexp:new RegExp("^"+e+"$","i")}}}),s.extend(a.prototype,{find:function(e){return s.find(this.routes,(function(t){return t.match(e)}))}});var o=a,l=n(1),c=n(2);if(!window.qs)throw new Error("ADD qs");if(!window.jQuery)throw new Error("ADD jQuery");const u=window._;if(!u)throw new Error("ADD _");const d=window.async;if(!d)throw new Error("ADD async");const p={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"},h={version:"0.0.1",api:(f=g,function(){const e=[...arguments];if("function"!=typeof e[e.length-1])return new Promise((e,t)=>{f(...arguments,(function(n,s){n?t(n):e(s)}))});f(...arguments)}),batch:function(e,t){d.mapSeries(e,(function(e,t){g(e.url,e.method,e.body,(function(n,s){n&&console.error("Error handling request:",e),t(n,s)}))}),t)},init:function(e){e()}};var f;const _=new o({routes:[{list:!0,path:"/clients",store:c.a.store.ClientStore},{path:"/clients/:id",store:c.a.store.ClientStore},{list:!0,path:"/sieves",store:c.a.store.SieveStore},{path:"/sieves/:id",store:c.a.store.SieveStore},{list:!0,path:"/sieves/:sieve_id/actions",store:c.a.store.ActionStore},{path:"/sieves/:sieve_id/actions/:id",store:c.a.store.ActionStore},{list:!0,path:"/sieves/:sieve_id/data",store:c.a.store.SieveDataProxy},{path:"/sieves/:sieve_id/data/:id",store:c.a.store.SieveDataStore},{list:!0,path:"/sieves/:key/works/local",store:c.a.store.WorkStore},{list:!0,path:"/rules",store:c.a.store.RuleStore},{path:"/rules/:id",store:c.a.store.RuleStore},{list:!0,path:"/tags",store:c.a.store.TagStore},{list:!0,path:"/tags/:id",store:c.a.store.TagStore},{list:!0,path:"/users/attrs",store:c.a.store.AttrStore},{path:"/users/attrs/:id",store:c.a.store.AttrStore}]});function g(e,t,n,s){n=n||{},t=p[t]||t||"GET";delete n._state;const i=_.find(e);return i?function(e,t,n,s){const i=e.path,a=e.store,r=a.hasField("user_id"),o=window.USER?USER.id:c.a.auth.getId(),d=function(e,n){e?console.error("API:err",i,t,e):"GET"!=t&&c.a.service.syncStore(a),n&&(n=JSON.parse(JSON.stringify(n))),s(e,n)};switch(t){case"DELETE":a.update(e.params,{state:l.a.STATE_DEL,_state:l.a.LOCAL_STATE_DEL},d);break;case"GET":var p=e.params;if(r&&(p.$and={$or:[["user_id",o],["user_id",null]]}),e.list){const e=n._opt;p=u.extend(u.omit(n,"_opt"),p),a.find(p,e,d)}else a.findOne(p,d);break;case"PATCH":case"PUT":p=e.params;var h=n;a.update(p,h,d);break;case"POST":h=u.extend(n,e.params);a.create(h,d);break;default:d({msg:"API: Unknown method:"+t})}}(i,t,n,s):c.a.api(e,t,n,s)}t.a=h},function(e,t,n){"use strict";var s=n(2);t.a={user:1,email:1,phone:0,isSignedIn:function(){return null!=s.a.auth.getToken()},agents:{local:1,type:s.a.CFG.CLIENT.TYPE,version:s.a.CFG.VERSION},actions:{popup:!0},tabForDynamic:s.a.Supports.tabForDynamic,tabForXFrame:s.a.Supports.tabForXFrame}},function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var s=n(14);n.d(t,"b",(function(){return s.d})),n.d(t,"c",(function(){return s.f}));var i=n(35);n.d(t,"d",(function(){return i.a}));class a{constructor(e={},t){Object.assign(this,t),this.el=this.el||document.createElement(this.tag),this.el.setAttribute("viewclass",this._getCName()),this.state=new Proxy(e,{set:(e,t,n)=>(e[t]!==n&&(e[t]=n,!this._renderTimeout&&this._render()),!0),deleteProperty:(e,t)=>t in e&&(delete e[t],!this._renderTimeout&&this._render(),!0)}),this.views=new Proxy({},{set:(e,t,n)=>(e[t]!==n&&(e[t]=n,this._render()),!0)}),this.init(),this._render()}createTpl(){throw new Error("View should implement createTpl(state)")}init(){}_render(){this._renderTimeout&&clearTimeout(this._renderTimeout),this._renderTimeout=setTimeout(()=>{delete this._renderTimeout,Object(s.f)(this.createTpl(this.state),this.el),this.afterRender()},1)}afterRender(){}setState(e){for(const t in e)this.state[t]!==e[t]&&(this.state[t]=e[t])}_getCName(){return this.constructor.name}}a.prototype.tag="div"},,function(e,t,n){"use strict";var s=n(2),i=(n(39),n(13)),a=n(0),r=(n(10),n(12)),o=(n(33),n(18)),l=(n(16),n(3),n(1)),c=n(11),u=n(4),d=n(5);const p=r.a.Model,h=r.a.Collection,f=p.extend({urlRoot:"/users/attrs"});var g={UserAttr:f,UserAttrs:h.extend({model:f,url:"/users/attrs"})},m=n(15),T=n(6),E=n(7);let w,b,y,x,v=e=>e;const S=window.Backbone;if(!S)throw new Error("ADD Backbone");const O=window.moment;if(!O)throw new Error("ADD moment");const N=r.a.Model,C=r.a.Collection;var D=S.Model.extend({defaults:function(){return{type:"INTERVAL",params:new N({interval:10800})}},getFrequencyClass:function(){const{params:e,type:t}=this.attributes;e||(e=this.defaults());const n=e.attributes.interval;let s="";return n?s=n<60?"xfreq-xh":n<600?"xfreq-hi":"xfreq":"LIVE"==t&&(s="xfreq-hi"),s},getShortDisplayText:function(){const e=this.attributes,t=e.params&&e.params.attributes,n=t.interval;return"LIVE"==e.type?Object(a.a)("l_schedule_live"):"RANDOM"==e.type?this.formatInterval(t.min,!0)+"-"+this.formatInterval(t.max,!0):"CRON"==e.type?"cron":n?this.formatInterval(n):Object(a.a)("m_never")},formatInterval:function(e,t){let n,s;if(e<60)n="second",s=e;else if(e<3600)n="minute",s=e/60;else if(e<86400)n="hour",s=e/3600;else{if(!(e<2592e3))return Object(a.a)("m_never");n="day",s=e/86400}return s=Math.round(s),t?s+n[0]:i.a.translate("m_1_"+n).ifPlural(s,Object(a.a)("m_n_"+n)).fetch(s)},parse:function(e){return e.params=new S.Model({...e.params},{parse:!0}),e},toJSON:function(){const e=D.__super__.toJSON.call(this);return e.params=e.params.toJSON(),e}});const R=S.Model.extend({defaults:{type:"xpath"},toJSON:function(){const e=U.__super__.toJSON.call(this);return delete e.id,e}}),L=S.Collection.extend({model:R,initialize:function(e,t){this.frame=t.frame}});var U=S.Model.extend({parse:function(e){return e.excludes=new L(e.excludes,{parse:!0,frame:this}),e.includes=new L(e.includes,{parse:!0,frame:this}),e},toJSON:function(){const e=U.__super__.toJSON.call(this);return e.excludes=e.excludes.toJSON(),e.includes=e.includes.toJSON(),0===e.index&&(delete e.title,delete e.uri),e}});const M=S.Collection.extend({model:U});var k=S.Model.extend({defaults:{dynamic:!0,delay:0},addLocator:function(e,t,n){const s=this.get("frames");let i=s.findWhere({index:e.index});const a=new R(n);return i||(i=new U(e,{parse:!0}),s.add(i)),"EXCLUDE"==t?i.get("excludes").add(a):i.get("includes").add(a),a},createDefaultSelection:function(){this.addLocator({index:0},"INCLUDE",{type:"css",expr:"body"})},getLocator:function(e,t){const n=this.get("frames").findWhere({index:e});return n.get("excludes").get(t)||n.get("includes").get(t)},isEmpty:function(){const e=this.get("frames").at(0);return!e||0===e.get("includes").length},parse:function(e){return e.frames=new M(e.frames,{parse:!0}),e},removeLocator:function(e,t){const n=this.get("frames").findWhere({index:e}),s=n.get("excludes"),i=n.get("includes");let a;if(a=s.get(t))s.remove(a);else{if(!(a=i.get(t)))throw new Error("Frame does not contain selection with id: "+t);i.remove(a)}},toJSON:function(){const e=k.__super__.toJSON.call(this);return e.frames=e.frames.toJSON(),delete e.title,delete e.uri,e}});const F=S.Collection.extend({model:k}),j=N.extend({isEmpty:function(){return!this.get("uri")}}),H=j.extend(),V=j.extend(),Y=j.extend({defaults:{ignoreEmptyText:!0,dataAttr:"text"}}),J=j.extend({defaults:{ignoreEmptyText:!0,dataAttr:"text"}});var G=N.extend({__structure__:{includeStyle:!1,includeScript:!1,selections:[{title:"Distill",uri:"https://distill.io",frames:[{index:0,uri:"https://distill.io",excludes:[{type:"xpath",expr:""}],includes:[{}]}]}]},defaults:{ignoreEmptyText:!0,includeStyle:!1,dataAttr:"text"},createDefaultPage:function(){const e=new k({frames:[{index:0}],dynamic:!0},{parse:!0});e.createDefaultSelection(),this.set("selections",new F([e]))},getExcludes:function(){const e=this.get("selections").toJSON();return _.chain(e).pluck("frames").flatten().pluck("excludes").flatten().value()},getIncludes:function(){const e=this.get("selections").toJSON();return _.chain(e).pluck("frames").flatten().pluck("includes").flatten().value()},getPage:function(){const e=this.get("selections");return e&&e.at(0)},isEmpty:function(){return 0==this.getIncludes().length},parse:function(e){return e.selections=new F(e.selections,{parse:!0}),_.isString(e.regexp)&&(e.regexp={expr:e.regexp,flags:"gim"}),e},toJSON:function(){const e=G.__super__.toJSON.call(this);return e.selections=e.selections.toJSON(),e}}),q=N.extend({encodedFields:["config","schedule"],urlRoot:"/sieves",defaults:function(){return{schedule:new D}},getExcludes:function(){const e=this.get("config");return e&&e.getExcludes()||[]},getIncludes:function(){const e=this.get("config");return e&&e.getIncludes()||[]},getPage:function(){const e=this.get("config");return e&&e.getPage()},getTags:function(e){let t;const n=[],s=(this.get("tags")||"").split(",");return _.each(s,(function(s){(t=e&&e.get(s))&&n.push(t)})),n},isDynamic:function(){const e=this.get("config");if(e){const t=e.get("selections");if(t&&t.length>0){return!0===t.at(0).attributes.dynamic}}return!1},isEmpty:function(){const e=this.get("config");return!e||e.isEmpty()},isRead:function(){return O(this.get("ts_view"))>=O(this.get("ts_data"))},parse:function(e){if((e=q.__super__.parse.call(this,e)).config)if(e.content_type==l.a.TYPE_FEED)e.config=new H(e.config);else if(e.content_type==l.a.TYPE_HTML)e.config=new G(e.config,{parse:!0});else if(e.content_type==l.a.TYPE_PDF_HTML)e.config=new V(e.config,{parse:!0});else if(e.content_type==l.a.TYPE_XML)e.config=new Y(e.config,{parse:!0});else{if(e.content_type!=l.a.TYPE_DOC)throw new Error("Unknown content_type: "+e.content_type);e.config=new J(e.config,{parse:!0})}return e.schedule&&(e.schedule=new D(e.schedule,{parse:!0})),e},save:function(){const e=this.get("config").get("meta")||{};if(!this.id&&e.tplId){const t=this;this.once("sync",(function(){d.a.api("/tpls/sieves/usage","POST",{tpl_id:e.tplId,sieve_id:t.id,uri:t.get("uri")},(function(e,t){}))}))}q.__super__.save.apply(this,arguments)}});const X=r.a.PagedCollection.extend({model:q,paginator_ui:{currentPage:0,perPage:50},url:"/sieves"}),W=r.a.PagedCollection.extend({initialize:function(e,t){this.parent=t.parent},url:function(){return["/sieves",this.parent.id,"data"].join("/")}}),z=N.extend({encodedFields:["config"],urlRoot:"/rules",defaults:function(){return{config:{type:o.a.TYPE_RULE_GROUP,op:o.a.OP_AND,rules:[]}}},isEmpty:function(){const e=this.get("config");return!(e&&e.rules.length>0)}}),Q=N.extend({encodedFields:["err","data"]}),K=C.extend({model:Q,initialize:function(e,t){this.parent=t.parent,this.on("add",this.onAdd,this)},onAdd:function(e){e.parent=this.parent},url:function(){let e="works";const t=this.parent.get("client_id");return T.a.agents.local&&t!=m.a.Clients.webAppId&&(e="works/local"),["/sieves",this.parent.id,e].join("/")}});class Z extends E.a{constructor(e){super({name:e,available:!1,list:[],loading:!0,newValue:""}),this.fetch()}async fetch(){"0"!==(await d.a.api("/users/constraints")).plan_id[0]&&(this.state.available=!0);let e=await d.a.api("/users/attrs",{name:this.state.name,"state.in":[10,40]});this.state.loading=!1,this.state.list=e.data}createTpl({loading:e,available:t,list:n,name:s}){return e?Object(E.b)(w||(w=v`Loading`)):t?Object(E.b)(y||(y=v`
      <ul class='list-group'>
      ${0}
      </ul>
      <div class='input-group'>
        <input class='form-control' type='text' placeholder='Enter new ${0}' 
          @input=${0}
          .value=${0}
          >
        <span class='input-group-btn'>
          <button @click=${0} class='btn btn-primary'>Add</button>
        </span>
      </div>
      `),n.map(e=>e.value==USER.email?"":Object(E.b)(x||(x=v`<li class='list-group-item' id=${0}>
        <span>${0}</span>
        <div class='right'>
          <button class='btn btn-default btn-xs' @click=${0}>
            Delete
          </button>
        <div>
        </li>`),e.id,e.value,t=>this.onDel(e.id))),s,e=>this.state.newValue=e.target.value,this.state.newValue,e=>this.onAdd()):Object(E.b)(b||(b=v`It is currently only available for paid customers.`))}async onAdd(){let e=this.state.newValue.trim();e.length>0&&(await d.a.api("/users/attrs","POST",{name:this.state.name,value:e}),this.fetch()),this.state.newValue=""}async onDel(e){await d.a.api(`/users/attrs/${e}`,"DELETE"),this.fetch()}}var ee=c.a.SelectOptionsPlugin.extend({action_edit:function(){const e=new u.a.Base({el:new Z(this.param.name).el}),t=new u.a.Modal({title:"Manage List",parent:this.editor.getRoot(),view:e});t.show(),this.listenTo(t,"discard",()=>this.fetch())},fetch:function(){this.attrs.fetch({data:{name:this.param.name,"state.in":[10,40],_opt:{order:["ts"]}}})},getOptionLabel:function(e){return e.get(this.attrLabel)+(10==e.get("state")?" - unverified":"")},load:function(){this.attrs=new g.UserAttrs,this.listenTo(this.editor,"reset",_.bind(this.fetch,this)),this.listenTo(this.attrs,"sync",_.bind(this.loadData,this)),this.fetch(),$(this.separator).attr("label",Object(a.a)("l_loading"))},onSync:function(){const e=this;s.a.service.SyncMan._syncStore(s.a.store.AttrStore,(function(){e.fetch()}))},render:function(){if(ee.__super__.render.call(this),T.a.agents.local&&T.a.isSignedIn()){let e;$(this.select).after(" ",e=BUTTON({class:"btn xbtn-light",title:Object(a.a)("l_sync")},I({class:"fa fa-refresh"}))),e.onclick=this.onSync.bind(this)}},renderActions(){"email"==this.param.name&&this.select.appendChild(OPTION({value:"action:edit"},"Manage List"))},unload:function(){ee.__super__.unload.call(this),this.attrs.reset()}});const te=c.a.Plugin.extend({onSignIn:function(){window.location.href=s.a.service.serviceLoginUrl},render:function(){T.a.agents.local&&!T.a.isSignedIn()&&(this.a=A({href:"javascript:void 0"},B(Object(a.a)("a_signin"))),$(this.editor.field).hide().after(this.a),this.a.onclick=_.bind(this.onSignIn,this))}}),ne=c.a.Plugin.extend({play:function(){const e=this.editor.field,t=AUDIO(),n=e.value;function i(e){t.src=e,t.play()}$(e).after(t),0==n.indexOf("tone:")?s.a.store.KVStore.findOne(n,(function(e,t){i(t.value)})):i(n)},render:function(){const e=this.editor.field,t=A({href:"javascript:void 0"},Object(a.a)("a_play"));$(e).after(" ",t),t.onclick=_.bind(this.play,this)}}),se=[{type:l.a.ACTION_EMAIL,label:"l_action_email",icon:"fa-envelope-o",addByDefault:function(e){return e.user&&e.email},params:[{label:"l_email",must:!0,name:"email",type:"email",plugins:[ee,te]}]},{type:l.a.ACTION_PUSH,label:"l_action_push",icon:"fa-mobile",paid:1,single:!0,addByDefault:function(e){return!1},params:[],plugin:function(e){const t=new g.UserAttrs;t.fetch({data:{"name.in":["fcm_id","gcm_id","apns_id"],"state.in":[0,40],_opt:{order:["ts"],limit:1}},success:function(){0==t.length&&e.$el.append(P({class:"error",style:"padding:5px"},"App not installed. Install one to get push notifications."))}})}},{type:l.a.ACTION_SMS,label:"l_action_sms",icon:"fa-mobile",paid:1,addByDefault:function(e){return!1},params:[{label:"l_phone",must:!0,name:"phone",type:"phone",plugins:[ee,te]}]},{type:l.a.ACTION_DISCORD,label:"l_action_discord",icon:"fa-terminal",paid:1,addByDefault:function(e){return!1},params:[{label:"l_discord",must:!0,name:"discord",type:"url",plugins:[te]}]},{type:l.a.ACTION_SLACK,label:"l_action_slack",icon:"fa-slack",paid:1,addByDefault:function(e){return!1},params:[{label:"l_slack",must:!0,name:"slack",type:"url",plugins:[te]}]},{type:l.a.ACTION_WEBHOOK,label:"l_action_webhook",icon:"fa-terminal",paid:1,addByDefault:function(e){return!1},defaults:{data:{id:"{{sieve.id}}",name:"{{sieve.name}}",uri:"{{sieve.uri}}",text:"{{sieve_data.text}}"}},params:[{label:"l_url",must:!0,name:"url",type:"url",values:[{name:"sieve.id",help:"Monitor's UUID."}],plugins:[te]},{label:"l_data",fieldLabel:"l_field",must:!1,name:"data",type:"request_data",values:[{name:"sieve.id",help:"Monitor's UUID."},{name:"sieve_data.data",help:"Data fetched from source. HTML for pages and XML for feeds."},{name:"sieve_data.text",help:"Readable text extracted from source data."}]},{label:"l_headers",fieldLabel:"l_header",must:!1,name:"headers",type:"request_headers",values:[]}]},{type:l.a.ACTION_LOCAL_OPEN_TAB,label:"l_action_local_open_tab",icon:"fa-file-o",local:!0,single:!0,addByDefault:function(){return!1},params:[]},{type:l.a.ACTION_LOCAL_POPUP,label:"l_action_local_popup",icon:"fa-comment-o",local:!0,single:!0,addByDefault:function(e){return e.agents.local},params:[]},{type:l.a.ACTION_LOCAL_AUDIO,label:"l_action_local_audio",icon:"fa-volume-up",local:!0,single:!0,addByDefault:function(e){return e.agents.local},params:[{label:"l_tone",name:"tone",type:"enum",must:!0,list:function(){const e=[{label:"l_bell_strike",value:"/skin/media/bell_strike.ogg"},{label:"l_asian_koel",value:"/skin/media/asian_koel.ogg"},{label:"l_ding_dong",value:"/skin/media/ding_dong.ogg"},{label:"l_buzzer",value:"/skin/media/buzzer.ogg"}];return T.a.agents.local&&s.a.store.KVStore.findOne("tones",(function(t,n){if(n){const t=JSON.parse(n.value);_.each(t,(function(t){e.push(t)}))}})),e}(),plugins:[ne]}]}],ie=N.extend({encodedFields:["config"],parent:null,defaults:function(){const e=this.desc,t={type:e.type};return e.defaults&&(t.config=_.result(e,"defaults")),t},initialize:function(e,t){this.parent=t&&t.parent},urlRoot:function(){const e=this.parent;if(null==e)throw new Error("Parent sieve not set for action");return"/sieves/"+e.id+"/actions"}}),ae=ie.extend({desc:{type:l.a.ACTION_NONE,label:"l_action_none",single:!0,addByDefault:function(e){return!1},params:[]}});var re=C.extend({initialize:function(e,t){this.parent=t.parent,this.on("add",this.onAdd,this)},onAdd:function(e){e.parent=this.parent},parse:function(e){return e=re.__super__.parse.call(this,e),_.map(e,(function(e){return new(ie[e.type]||ae)(e,{parse:!0,parent:this.parent})}),this)},url:function(){return["/sieves",this.parent.id,"actions"].join("/")}});T.a.agents.local&&se.slice(0).forEach((function(e,t){e.local&&(se.splice(t,1),se.splice(0,0,e))})),_.each(se,(function(e){ie[e.type]=ie.extend({desc:e},{desc:e})}));t.a={LocatorDescList:[{type:"css",label:"l_css_selector",params:[{label:"l_css_selector",help:"h_css_selelctor",must:!0,name:"expr",type:"css"}]},{type:"js",label:"l_js",params:[{label:"l_js",help:"h_js",must:!0,name:"expr",type:"js"}]},{type:"xpath",label:"l_xpath",params:[{label:"l_xpath",help:"h_xpath",must:!0,name:"expr",type:"xpath"}]}],Frame:U,Frames:M,Page:k,Pages:F,Schedule:D,Sieve:q,SieveConfigFeed:H,SieveConfigHTML:G,Sieves:X,SieveDataPager:W,SieveRule:z,SieveActionDescList:se,SieveAction:ie,SieveActions:re,Works:K,ACTION_EMAIL:l.a.ACTION_EMAIL,ACTION_SMS:l.a.ACTION_SMS,ACTION_PUSH:l.a.ACTION_PUSH}},function(e,t,n){"use strict";var s=n(13),i=n(0);const a=window._;if(!a)throw new Error("ADD _");t.a=function(e){let t=a.toArray(arguments).slice(1);return t=a.map(t,(function(e){return a.isString(e)?Object(i.a)(e):e})),s.a.sprintf(...[Object(i.a)(e)].concat(t))}},,function(e,t,n){"use strict";var s=n(5),i=n(33);const a=window._;if(!a)throw new Error("ADD _");const r=window.Backbone;if(!r)throw new Error("ADD Backbone");function o(e,t,n){if(!s.a.api)return void s.a.on("init",(function(){o(e,t,n)}));const i=a.result(t,"url")||l();let r=n.data;null!=r||!t||"create"!==e&&"update"!==e&&"patch"!==e||(r=n.attrs||t.toJSON(n));const c=n.xhr=s.a.api(i,e,r,(function(e,t){e?n.error&&n.error(e):n.success&&n.success(t)}));return t.trigger("request",t,c,n),c}var l=function(){throw new Error('A "url" property or function must be specified')};const c=r.Model.prototype.fetch;r.Model.prototype.fetch=async function(e){return e||(e={}),new Promise((t,n)=>{c.call(this,{error:function(...t){e.error&&e.error(...t),n(t)},success:function(...n){e.success&&e.success(...n),t(n)}})})},r.Model.prototype.clone=function(){const e=this.toJSON(),t=new this.constructor(e,{parse:!0});return t.props=a.clone(this.props),t};const u=r.Model.extend({sync:o,encodedFields:[],parse:function(e){return a.each(this.encodedFields,(function(t){const n=e[t];if(a.isString(n)){let s=null;try{s=JSON.parse(n)}catch(e){console.error("Invalid model json attribute:",t,n,e)}e[t]=s}})),e},prop:function(e,t){if(this.props||(this.props={}),2!=arguments.length)return a.result(this.props,e);{const n=a.result(this.props,e);if(n===t)return;this.props[e]=t,this.trigger("prop:"+e,t,n),this.collection&&this.collection.trigger("prop:"+e,t,n,this)}},toJSON:function(){const e=r.Model.prototype.toJSON.call(this);return a.each(this.encodedFields,(function(t){const n=e[t];a.isEmpty(n)||(e[t]=JSON.stringify(n))})),e}});t.a={sync:o,syncBatch:function(e,t){const n=a.map(e.dels,(function(e){return{method:"DELETE",url:a.result(e,"url")||l()}})),i=a.map(e.posts,(function(e){return{method:"POST",url:a.result(e,"url")||l(),body:e.toJSON()}})),r=a.map(e.puts,(function(e){return{method:"PUT",url:a.result(e,"url")||l(),body:a.pick(...[e.toJSON()].concat(a.keys(e.changedAttributes())))}})),o=[].concat(n,i,r);return 0!=o.length&&(DBG&&console.log("syncBatch: requests:",o),s.a.batch(o,t))},Model:u,Collection:r.Collection.extend({model:u,parse:function(e){return e.data},sync:o}),PagedCollection:i.a.requestPager.extend({model:r.Model.extend(),paginator_core:{},paginator_ui:{currentPage:0,perPage:2},server_api:{_opt:function(){return{limit:this.perPage,offset:this.currentPage*this.perPage}}},parse:function(e){return this.offset=e.offset,this.totalPages=Math.ceil(e.count/this.perPage),this.totalRecords=e.total_count,e.data}})}},,,function(e,t,n){"use strict";var s=n(12),i=n(1);const a=s.a.Model.extend({urlRoot:"/clients",getIcon:function(){let e;const t=this.get("type");return this.iconClass?this.iconClass:(e=this.id==r.webAppId?"fa fa-cloud":this.id==App.clients.defaultId?"im-pc":t==i.a.CLIENT_FF?"im-firefox":t==i.a.CLIENT_CR?"im-chrome":t==i.a.CLIENT_OP?"im-opera":t==i.a.CLIENT_FFWX?"im-firefox":"im-globe",this.iconClass=e)},getInfo:function(){let e=this.get("info")||this.get("name");return this.id==App.clients.defaultId&&(e+=" (this device)"),e},isWeb:function(){return this.id===r.webAppId}});var r=s.a.Collection.extend({model:a,url:"/clients"},{webAppId:"ffffffff-ffff-ffff-ffff-ffffffffffff",anyLocalId:"eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"});t.a={Client:a,Clients:r}},,,function(e,t,n){"use strict";var s=n(1);const i=[{type:s.a.RULE_NOT_EMPTY,label:"l_not_empty",params:[]},{type:s.a.RULE_HAS_TEXT,label:"l_has",params:[{label:"l_text",must:!0,name:"input",type:"text"}]},{type:s.a.RULE_HAS_TEXT_NOT,label:"l_has_not",params:[{label:"l_text",must:!0,name:"input",type:"text"}]},{type:s.a.RULE_HAS_NUMBER_LT,label:"l_has_num_lt",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_HAS_NUMBER_GT,label:"l_has_num_gt",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_HAS_NUMBER_DECR_MIN,label:"l_has_num_decr_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_HAS_NUMBER_INCR_MIN,label:"l_has_num_incr_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_HAS_NUMBER_DECR_PERCENT_MIN,label:"l_has_num_decr_percent_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_HAS_NUMBER_INCR_PERCENT_MIN,label:"l_has_num_incr_percent_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:s.a.RULE_MATCH_REGEX,label:"l_match_regex",params:[{label:"l_regex",must:!0,name:"input",type:"regexp"}]}],a=[{type:s.a.CONTENT_TYPE_TEXT,label:"l_text"},{type:s.a.CONTENT_TYPE_CHANGED_TEXT,label:"l_added_text"},{type:s.a.CONTENT_TYPE_OLD_TEXT,label:"l_text_old"}];t.a={ContentList:a,DescList:i}},,,,,,,,,,,,,,,function(e,t,n){"use strict";var s=n(5);const i=window.Backbone;if(!i)throw new Error("ADD Backbone");const a=window._;if(!a)throw new Error("ADD _");const r=window.jQuery;if(!r)throw new Error("ADD jQuery");const o={version:"0.6.0"};o.requestPager=i.Collection.extend({sync:function(e,t,n){const i=this,r=n.data||{},o=a.result(t,"url");i.setDefaults();const l={};a.each(a.result(i,"server_api"),(function(e,t){a.isFunction(e)&&(e=e.call(i)),l[t]=e})),r._opt=a.extend(l._opt||{},r._opt),a.extend(l,r);const c=s.a.api(o,e,l,(function(e,t){e?n.error&&n.error(e):n.success&&n.success(t)}));return t&&t.trigger&&t.trigger("request",t,c,n),c},setDefaults:function(){const e=this;a.defaults(e.paginator_ui,{firstPage:0,currentPage:1,perPage:5,totalPages:10,pagesInRange:4}),a.each(e.paginator_ui,(function(t,n){a.isUndefined(e[n])&&(e[n]=e.paginator_ui[n])}))},requestNextPage:function(e){const t=this.info();if(!(t.currentPage+1>=t.totalPages)){if(void 0!==this.currentPage)return this.currentPage+=1,this.pager(e);{const e=new r.Deferred;return e.reject(),e.promise()}}e.error&&e.error("Cannot go past last page")},requestPreviousPage:function(e){if(!(this.currentPage<=0)){if(void 0!==this.currentPage)return this.currentPage-=1,this.pager(e);{const e=new r.Deferred;return e.reject(),e.promise()}}e.error&&e.error("Cannot go before first page")},goTo:function(e,t){if(void 0!==e)return this.currentPage=parseInt(e,10),this.pager(t);{const e=new r.Deferred;return e.reject(),e.promise()}},howManyPer:function(e){void 0!==e&&(this.currentPage=this.firstPage,this.perPage=e,this.pager())},info:function(){const e={totalRecords:this.totalRecords||0,currentPage:this.currentPage,firstPage:this.firstPage,totalPages:Math.ceil(this.totalRecords/this.perPage),lastPage:this.totalPages,perPage:this.perPage,previous:!1,next:!1};return this.currentPage>1&&(e.previous=this.currentPage-1),this.currentPage<e.totalPages&&(e.next=this.currentPage+1),e.hasNext=e.next,e.hasPrevious=e.next,e.pageSet=this.setPagination(e),this.information=e,e},setPagination:function(e){const t=[];let n=0,s=0;const i=2*this.pagesInRange,a=Math.ceil(e.totalRecords/e.perPage);if(a>1)if(a<=1+i)for(n=1,s=a;n<=s;n++)t.push(n);else if(e.currentPage<=this.pagesInRange+1)for(n=1,s=2+i;n<s;n++)t.push(n);else if(a-this.pagesInRange>e.currentPage&&e.currentPage>this.pagesInRange)for(n=e.currentPage-this.pagesInRange;n<=e.currentPage+this.pagesInRange;n++)t.push(n);else for(n=a-i;n<=a;n++)t.push(n);return t},pager:function(e){return this.fetch(e||{})},bootstrap:function(e){return a.extend(this,e),this.setDefaults(),this.info(),this}}),o.requestPager.prototype.nextPage=o.requestPager.prototype.requestNextPage,o.requestPager.prototype.prevPage=o.requestPager.prototype.requestPreviousPage,t.a=o},,,,,function(e,t,n){"use strict";var s=n(2),i=n(0),a=n(4),r=n(3);if(!window.domo)throw new Error("ADD domo");const o=window.jQuery;if(!o)throw new Error("ADD jQuery");const l=window._;if(!l)throw new Error("ADD _");const c=window.Backbone;if(!c)throw new Error("ADD Backbone");a.a.Base.extend({name:"LoginView",getCredentials:function(e){return{user:this.form.id.value,password:this.form.password.value}[e]},postInit:function(e={}){const t=this;this.model=new c.Model({name:USER.name||""}),window.addEventListener("message",e=>{"event"==e.data.type&&this.trigger("frame:"+e.data.data)}),this.on("frame:ready",()=>{console.log("frame:ready"),o(".xloading").remove(),o(".xdevice-manager").show(),this.postMessage({type:"request",data:{action:"login",name:t.getCredentials("user"),password:t.getCredentials("password")}})}),this.on("frame:done",()=>{this.saveToken()}),this.on("frame:cancel",()=>{o(".xlogin").show(),o(".xdevice-manager").remove()})},postMessage:function(e){this.iframe.contentWindow.postMessage(e,s.a.CFG.URL.ROOT)},events:{submit:"submit"},showErrMsg(e){switch(e.status){case 400:return Object(i.a)("e_auth_400");case 403:return Object(i.a)("e_auth_403");case 402:return Object(i.a)("e_auth_402");default:return Object(i.a)("e_auth_5xx")}},saveToken:function(){const e={name:this.form.id.value,password:this.form.password.value};l.isEmpty(e.name)||l.isEmpty(e.password)?r.a.error(Object(i.a)("e_auth_400")):(this.$(".xsubmit").button("loading"),s.a.auth.saveToken(e,e=>{this.$(".xsubmit").button("reset"),e?(console.error("checkLogin:err?",e),r.a.error(this.showErrMsg(e)),402==e.status&&this.renderLoading()):(r.a.reset(),this.options.onLogin())}))},submit:function(e){e.preventDefault(),this.saveToken()},getMargin:function(){return this.options.isPopup?"40px":"100px"},showHeader:function(){return this.options.isPopup?"hide":""},getStyle:function(){return this.options.isPopup?"display:block;":`box-shadow: 5px 5px 10px #999; margin: auto;\n        margin-top: ${this.options.isPopup?"0px":"100px"};\n        overflow:hidden; max-width: 600px;`},renderLoading:function(){o(".xlogin").hide(),this.$el.append(DIV({class:"xloading",style:"margin: 50% auto; font-size: 3em; text-align: center;"},I({class:"fa fa-spin fa-spinner"})," ",Object(i.a)("l_loading"))),this.renderDevice(),o(".xdevice-manager").hide()},renderDevice:function(){const e=this.options.isPopup?"100vh":"calc(90vh - 100px)";this.$el.append(DIV({class:"xdevice-manager",style:`${this.getStyle()}`},this.iframe=IFRAME({src:s.a.CFG.URL.ROOT+"/frame-devices",style:`\n          width: 100%;\n          height: ${e};\n          margin-top: ${e};\n          transition: margin-top 300ms ease\n          `,frameborder:"none"}))),setTimeout(()=>this.iframe.style.marginTop=0,300)},render:function(){return this.$el.empty().append(DIV({class:`xpopup-heading xheader xheader-ext ${this.showHeader()}`,style:"width: 300px; margin: auto"},H2({class:"text-center"},Object(i.a)("a_signin"))),this.form=FORM({class:"xlogin",style:"width: 300px; margin: auto"},DIV({class:"xdistill-icon-container",style:`\n          margin-top: ${this.getMargin()};`},IMG({src:"ui/img/distill_128.png",style:"\n          display:block;\n          margin: auto;\n          border: solid 1px #ccc;\n          width: 150px;\n          height: 150px;\n          padding: 15px;\n          border-radius: 50%;\n          background-color: #fff;\n          box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;\n          background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));\n          background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7); ",title:"Distill"})),DIV({style:"margin-top: 50px;"},A({class:"xurl btn btn-primary btn-block",style:"margin-left: 10px;",href:`${s.a.CFG.URL.ROOT}/service-login?redirect=app://ui/inbox.html#inbox`},Object(i.a)("a_login"))),DIV({style:"margin-top: 20px;"},A({class:"xurl btn btn-default btn-block",style:"margin-left: 10px;",href:`${s.a.CFG.URL.ROOT}/register`},Object(i.a)("a_register"))),DIV({class:"text-center",style:"margin-top: 25px"},A({class:"xurl",href:`${s.a.CFG.URL.ROOT}/account/forgot_password`},Object(i.a)("a_forgot_pass"))))),this.focus(),this}})},function(e,t,n){"use strict";var s=n(0),i=n(10),a=n(2),r=(n(5),n(3),n(4));n(38),n(11);const o=window.jQuery;if(!o)throw new Error("ADD jQuery");const l=window._;if(!l)throw new Error("ADD _");const c=window.Backbone;if(!c)throw new Error("ADD Backbone");var u=r.a.SimpleForm.extend({name:"SignInForm",fields:[{must:!0,name:"name",type:"text",label:"l_username"},{must:!0,name:"password",type:"password",label:"l_password"}],render:function(){return u.__super__.render.call(this),this.$el.append(DIV({class:"control-group"},this.msg=SMALL({class:"help"}))),this},showMsg:function(e,t){this.msg.textContent=e?Object(s.a)(e):"",o(this.msg)[t?"addClass":"removeClass"]("error")},submit:function(){return this.trigger("submit"),!1}}),d=r.a.SaveDiscardModal.extend({name:"SignInModal",action_discard:function(){this.remove()},action_save:function(){this.view.onSubmit()},initialize:function(e){this.model=new c.Model({name:USER.name||""}),l.defaults(e,{a_save:"a_signin",title:"l_account",width:600,view:new u({parent:e.parent,model:this.model})}),d.__super__.initialize.call(this,e),this.listenTo(this.view,"submit",this.saveToken)},renderFooter:function(){const e=d.__super__.renderFooter.call(this);return o(e).append(A({href:a.a.CFG.URL.ROOT+"/register?client="+a.a.CFG.CLIENT.NAME,target:"_blank"},Object(s.a)("a_register"))),e},saveToken:function(){const e=this,t=this.model.pick("name","password");l.isEmpty(t.name)||l.isEmpty(t.password)||(this.showProgress(!0),e.view.showMsg("l_loading"),a.a.auth.saveToken(t,(function(t){e.showProgress(!1),t?e.view.showMsg(t.response.code+" : "+(t.response.msg||t.msg||t.message||"e_signin_invalid"),!0):(e.view.showMsg("m_login_success"),setTimeout((function(){e.remove(),e.options.onSignIn&&e.options.onSignIn()}),100))})))}});const p=r.a.ActionProvider.extend({name:"SettingsGeneral",actions:{"settings signout":{fn:"action_signout"},"settings close":{fn:"closeLoginForm"}},events:{change:"event_change","click .xclose":"closeLoginForm"},closeLoginForm:function(){this.loginView.remove(),o(this.elLoginCt).remove(),this.updateUser()},action_signout:function(){a.a.auth.logout(),location.href=a.a.CFG.URL.ROOT+"/logout"},event_change:function(){this.saveValues()},load:function(e){this.setValues(),e()},render:function(){return this.$el.attr({id:"general",class:"hide"}).append(DIV({class:"panel panel-default"},HEADER({class:"panel-heading"},H3("General")),DIV({class:"panel-body"},DIV({class:"form-group"},H4(Object(s.a)("l_account")),A({class:"btn btn-primary",href:`${a.a.CFG.URL.ROOT}/service-login?redirect=app://ui/inbox.html#inbox`,"data-action":"settings signin"}),BUTTON({class:"btn btn-default",style:"margin-left: 20px;","data-action":"settings signout"},Object(s.a)("a_signout"))),DIV(Object(s.a)("m_ext_signin"))))),this.elSignIn=this.$('[data-action="settings signin"]'),this.elSyncInfo=this.$(".alert"),this},saveValues:function(){this.$el.find("input,select").each((function(){const e=this;"checkbox"==e.type?a.a.store.Prefs.set(e.name,e.checked):a.a.store.Prefs.set(e.name,e.value)}))},setValues:function(){this.$el.find("input,select").each((function(){const e=this;"checkbox"==e.type?e.checked=a.a.store.Prefs.get(e.name):e.value=a.a.store.Prefs.get(e.name)})),this.showCred()},showCred:function(){USER.name?this.elSignIn.text(Object(i.a)("l_signed_in_as",`${USER.name} (${USER.email})`)):this.elSignIn.text(Object(s.a)("a_signin"))},updateUser:function(){a.a.auth.getUser((e,t)=>{l.extend(USER,t),this.showCred()})}});t.a={SignInModal:d,View:p}}]]);
//# sourceMappingURL=2.js.map