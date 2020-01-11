(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1:function(e,t,n){"use strict";t.a={TYPE_ERR:0,TYPE_TEXT:1,TYPE_HTML:2,TYPE_JSON:3,TYPE_XML:4,TYPE_FEED:5,TYPE_FORM:6,TYPE_PDF_HTML:7,TYPE_DOC:8,TYPE_RULE:1,TYPE_RULE_GROUP:2,OP_AND:1,OP_OR:2,CONTENT_TYPE_TEXT:1,CONTENT_TYPE_CHANGED_TEXT:2,CONTENT_TYPE_OLD_TEXT:3,RULE_NOT_EMPTY:1,RULE_HAS_TEXT:2,RULE_HAS_TEXT_NOT:3,RULE_HAS_NUMBER_LT:4,RULE_HAS_NUMBER_GT:5,RULE_HAS_NUMBER_DECR_MIN:6,RULE_HAS_NUMBER_INCR_MIN:7,RULE_MATCH_REGEX:8,RULE_HAS_NUMBER_DECR_PERCENT_MIN:9,RULE_HAS_NUMBER_INCR_PERCENT_MIN:10,STATE_DEFAULT:0,STATE_NEW:10,STATE_INIT:20,STATE_UNAUTHORIZED:30,STATE_AUTHORIZED:35,STATE_READY:40,STATE_PAUSED:45,STATE_RESTRICTED:50,STATE_DISCARD:90,STATE_DEL:100,STATE_DONE:100,STATE_PLAN_PUBLIC:0,STATE_PLAN_PRIVATE:70,STATE_ATTR_VERIFY:10,STATE_ATTR_VERIFY_INIT:20,STATE_ATTR_VERIFY_WAIT:30,STATE_ATTR_VERIFY_DONE:40,ACTION_EMAIL:1,ACTION_SMS:2,ACTION_PUSH:3,ACTION_MACRO:4,ACTION_WEBHOOK:5,ACTION_SLACK:6,ACTION_DISCORD:7,ACTION_LOCAL_AUDIO:101,ACTION_LOCAL_POPUP:102,ACTION_LOCAL_OPEN_TAB:103,RUN_STATE_INIT:1,RUN_STATE_WAIT:2,RUN_STATE_WIP:3,LOCAL_STATE_SYNCED:0,LOCAL_STATE_POST:1,LOCAL_STATE_PUT:2,LOCAL_STATE_DEL:3,CLIENT_FF:10,CLIENT_CR:11,CLIENT_OP:12,CLIENT_FFWX:13,CLIENT_MAC:20,CLIENT_WEBFF:50,CLIENT_DEDI:51,IMPORT_SOURCE_SITEMAP:1,TIME_INFINITE:2592e3}},10:function(e,t,n){"use strict";var a=n(8),r=n.n(a),i=window._;if(!i)throw new Error("ADD _");function s(e){i.extend(this,e,this.parse(e.path))}function o(e){this.routes=i.map(e.routes,(function(e){return new s(e)}),this)}function l(e){try{return decodeURIComponent(e)}catch(t){return e}}i.extend(s.prototype,{match:function(e){var t=this.keys,n=this.params={},a=this.regexp.exec(e);if(!a)return!1;for(var r=1,i=a.length;r<i;++r){var s=t[r-1],o="string"==typeof a[r]?l(a[r]):a[r];if(!s)throw new Error("Nameless param not supported, path:"+e);n[s.name]=o}return!0},parse:function(e){var t=[];return e=e.concat("").replace(/\/\(/g,"(?:/").replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g,(function(e,n,a,r,i,s,o){return t.push({name:r,optional:!!s}),n=n||"",(s?"":n)+"(?:"+(s?n:"")+(a||"")+(i||a&&"([^/.]+?)"||"([^/]+?)")+")"+(s||"")+(o?"(/*)?":"")})).replace(/([\/.])/g,"\\$1").replace(/\*/g,"(.*)"),{keys:t,regexp:new RegExp("^"+e+"$","i")}}}),i.extend(o.prototype,{find:function(e){return i.find(this.routes,(function(t){return t.match(e)}))}});var c=o,u=n(1),p=n(2);if(!window.qs)throw new Error("ADD qs");if(!window.jQuery)throw new Error("ADD jQuery");var d=window._;if(!d)throw new Error("ADD _");var f=window.async;if(!f)throw new Error("ADD async");var h,_={create:"POST",update:"PUT",patch:"PATCH",delete:"DELETE",read:"GET"},g={version:"0.0.1",api:(h=v,function(){var e=arguments,t=Array.prototype.slice.call(arguments);if("function"!=typeof t[t.length-1])return new Promise((function(t,n){h.apply(void 0,r()(e).concat([function(e,a){e?n(e):t(a)}]))}));h.apply(void 0,arguments)}),batch:function(e,t){f.mapSeries(e,(function(e,t){v(e.url,e.method,e.body,(function(n,a){n&&console.error("Error handling request:",e),t(n,a)}))}),t)},init:function(e){e()}},m=new c({routes:[{list:!0,path:"/clients",store:p.a.store.ClientStore},{path:"/clients/:id",store:p.a.store.ClientStore},{list:!0,path:"/sieves",store:p.a.store.SieveStore},{path:"/sieves/:id",store:p.a.store.SieveStore},{list:!0,path:"/sieves/:sieve_id/actions",store:p.a.store.ActionStore},{path:"/sieves/:sieve_id/actions/:id",store:p.a.store.ActionStore},{list:!0,path:"/sieves/:sieve_id/data",store:p.a.store.SieveDataProxy},{path:"/sieves/:sieve_id/data/:id",store:p.a.store.SieveDataStore},{list:!0,path:"/sieves/:key/works/local",store:p.a.store.WorkStore},{list:!0,path:"/rules",store:p.a.store.RuleStore},{path:"/rules/:id",store:p.a.store.RuleStore},{list:!0,path:"/tags",store:p.a.store.TagStore},{list:!0,path:"/tags/:id",store:p.a.store.TagStore},{list:!0,path:"/users/attrs",store:p.a.store.AttrStore},{path:"/users/attrs/:id",store:p.a.store.AttrStore}]});function v(e,t,n,a){n=n||{},t=_[t]||t||"GET";delete n._state;var r=m.find(e);return r?function(e,t,n,a){var r=e.path,i=e.store,s=i.hasField("user_id"),o=window.USER?USER.id:p.a.auth.getId(),l=function(e,n){e?console.error("API:err",r,t,e):"GET"!=t&&p.a.service.syncStore(i),n&&(n=JSON.parse(JSON.stringify(n))),a(e,n)};switch(t){case"DELETE":i.update(e.params,{state:u.a.STATE_DEL,_state:u.a.LOCAL_STATE_DEL},l);break;case"GET":var c=e.params;if(s&&(c.$and={$or:[["user_id",o],["user_id",null]]}),e.list){var f=n._opt;c=d.extend(d.omit(n,"_opt"),c),i.find(c,f,l)}else i.findOne(c,l);break;case"PATCH":case"PUT":c=e.params;var h=n;i.update(c,h,l);break;case"POST":h=d.extend(n,e.params);i.create(h,l);break;default:l({msg:"API: Unknown method:"+t})}}(r,t,n,a):p.a.api(e,t,n,a)}t.a=g},12:function(e,t,n){"use strict";var a=n(6),r=n.n(a),i=n(50),s=n.n(i),o=n(2),l=(n(55),n(15)),c=n(0),u=(n(13),n(16)),p=(n(46),n(23)),d=(n(22),n(3),n(1)),f=n(14),h=n(4),g=n(10),m=u.a.Model,v=u.a.Collection,E=m.extend({urlRoot:"/users/attrs"}),T={UserAttr:E,UserAttrs:v.extend({model:E,url:"/users/attrs"})},w=n(25),y=n.n(w),b=n(9),x=window.Backbone;if(!x)throw new Error("ADD Backbone");if(!window.moment)throw new Error("ADD moment");var O=h.a.ActionProvider.extend({name:"AttrEditor",initialize:function(e){O.__super__.initialize.call(this,e),this.attrs=e.attrs,this.param=e.param,this.model=new x.Model,this.editor=f.a.create(this.param.type,{model:this.model,param:this.param,parent:this,el:this.$el.find("input,select").parent()[0]})},action_add:function(e){if(this.editor.isValid()){var t=this,n=this.param.name,a=this.model.get(n);if(!_.isEmpty(a))this.attrs.where({name:n,value:a}).length>0&&!0!==this.param.multi?alert(Object(c.a)("e_value_exists")):this.attrs.create({name:n,value:a},{wait:!0,error:function(){alert(Object(c.a)("e_err_add")+Object(c.a)(this.param.name))},success:function(n){n.get("state")==d.a.STATE_ATTR_VERIFY&&t.showVerificationPrompt(n),e&&e()}})}else alert(Object(c.a)("e_value_incorrect_check"))},render:function(){return this.editor.render(),this.$el.append(this.editor.el),this},showResendVerificationPrompt:function(e){var t=this.attrs.models.find((function(t){return t.id==e}));this.showVerificationPrompt(t)},showVerificationPrompt:function(e){var t=f.a.create("text",{param:{label:"l_verification_code",must:!0,name:"code"},parent:this.parent}),n=new h.a.PromptModal({a_discard:"a_later",a_save:"a_verify",title:"l_verification_req",msg:l.a.sprintf(Object(c.a)("m_verification_code"),e.get("name")),parent:this.parent.getRoot(),width:500,view:t});n.on("save",(function(){n.showProgress(),g.a.api("/users/verify/"+e.id+"/"+t.getValue(),"POST",null,(function(t,a){if(n.showProgress(!1),n.showAlert(!1),t){var r="object"==y()(a)?a.msg:a;n.showAlert("Verification Failed! "+r)}else e.set("state",d.a.STATE_ATTR_VERIFY_DONE),n.remove()}))})),n.show()}}),S=h.a.PromptModal.extend({name:"AttrEditorModal",initialize:function(e){_.extend(e,{msg:l.a.sprintf(Object(c.a)("a_action_object"),Object(c.a)("a_add"),Object(c.a)(e.param.label)),view:new O(_.extend({parent:this},e))}),S.__super__.initialize.call(this,e),this.on("save",this.onSave)},onSave:function(){var e=this;this.view.action_add((function(){e.remove()}))}}),D={AttrEditor:O,AttrEditorModal:S};function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}var R=window.Backbone;if(!R)throw new Error("ADD Backbone");var C=window.moment;if(!C)throw new Error("ADD moment");var L,M=u.a.Model,U=u.a.Collection,k=R.Model.extend({defaults:function(){return{type:"INTERVAL",params:new M({interval:10800})}},getFrequencyClass:function(){var e=this.attributes,t=e.params,n=e.type;t||(s()("params"),t=this.defaults());var a=t.attributes.interval,r="";return a?r=a<60?"xfreq-xh":a<600?"xfreq-hi":"xfreq":"LIVE"==n&&(r="xfreq-hi"),r},getShortDisplayText:function(){var e=this.attributes,t=e.params&&e.params.attributes,n=t.interval;return"LIVE"==e.type?Object(c.a)("l_schedule_live"):"RANDOM"==e.type?this.formatInterval(t.min,!0)+"-"+this.formatInterval(t.max,!0):"CRON"==e.type?"cron":n?this.formatInterval(n):Object(c.a)("m_never")},formatInterval:function(e,t){var n,a;if(e<60)n="second",a=e;else if(e<3600)n="minute",a=e/60;else if(e<86400)n="hour",a=e/3600;else{if(!(e<2592e3))return Object(c.a)("m_never");n="day",a=e/86400}return a=Math.round(a),t?a+n[0]:l.a.translate("m_1_"+n).ifPlural(a,Object(c.a)("m_n_"+n)).fetch(a)},parse:function(e){return e.params=new R.Model(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(n,!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.params),{parse:!0}),e},toJSON:function(){var e=k.__super__.toJSON.call(this);return e.params=e.params.toJSON(),e}}),j=R.Model.extend({defaults:{type:"xpath"},toJSON:function(){var e=H.__super__.toJSON.call(this);return delete e.id,e}}),F=R.Collection.extend({model:j,initialize:function(e,t){this.frame=t.frame}}),H=R.Model.extend({parse:function(e){return e.excludes=new F(e.excludes,{parse:!0,frame:this}),e.includes=new F(e.includes,{parse:!0,frame:this}),e},toJSON:function(){var e=H.__super__.toJSON.call(this);return e.excludes=e.excludes.toJSON(),e.includes=e.includes.toJSON(),0===e.index&&(delete e.title,delete e.uri),e}}),V=R.Collection.extend({model:H}),Y=R.Model.extend({defaults:{dynamic:!0,delay:0},addLocator:function(e,t,n){var a=this.get("frames"),r=a.findWhere({index:e.index}),i=new j(n);return r||(r=new H(e,{parse:!0}),a.add(r)),"EXCLUDE"==t?r.get("excludes").add(i):r.get("includes").add(i),i},createDefaultSelection:function(){this.addLocator({index:0},"INCLUDE",{type:"css",expr:"body"})},getLocator:function(e,t){var n=this.get("frames").findWhere({index:e});return n.get("excludes").get(t)||n.get("includes").get(t)},isEmpty:function(){var e=this.get("frames").at(0);return!e||0===e.get("includes").length},parse:function(e){return e.frames=new V(e.frames,{parse:!0}),e},removeLocator:function(e,t){var n,a=this.get("frames").findWhere({index:e}),r=a.get("excludes"),i=a.get("includes");if(n=r.get(t))r.remove(n);else{if(!(n=i.get(t)))throw new Error("Frame does not contain selection with id: "+t);i.remove(n)}},toJSON:function(){var e=Y.__super__.toJSON.call(this);return e.frames=e.frames.toJSON(),delete e.title,delete e.uri,e}}),J=R.Collection.extend({model:Y}),G=M.extend({isEmpty:function(){return!this.get("uri")}}),q=G.extend(),X=G.extend(),z=G.extend({defaults:{ignoreEmptyText:!0,dataAttr:"text"}}),W=G.extend({defaults:{ignoreEmptyText:!0,dataAttr:"text"}}),Q=M.extend({__structure__:{includeStyle:!1,includeScript:!1,selections:[{title:"Distill",uri:"https://distill.io",frames:[{index:0,uri:"https://distill.io",excludes:[{type:"xpath",expr:""}],includes:[{}]}]}]},defaults:{ignoreEmptyText:!0,includeStyle:!1,dataAttr:"text"},createDefaultPage:function(){var e=new Y({frames:[{index:0}],dynamic:!0},{parse:!0});e.createDefaultSelection(),this.set("selections",new J([e]))},getExcludes:function(){var e=this.get("selections").toJSON();return _.chain(e).pluck("frames").flatten().pluck("excludes").flatten().value()},getIncludes:function(){var e=this.get("selections").toJSON();return _.chain(e).pluck("frames").flatten().pluck("includes").flatten().value()},getPage:function(){var e=this.get("selections");return e&&e.at(0)},isEmpty:function(){return 0==this.getIncludes().length},parse:function(e){return e.selections=new J(e.selections,{parse:!0}),_.isString(e.regexp)&&(e.regexp={expr:e.regexp,flags:"gim"}),e},toJSON:function(){var e=Q.__super__.toJSON.call(this);return e.selections=e.selections.toJSON(),e}}),K=M.extend({encodedFields:["config","schedule"],urlRoot:"/sieves",clone:function(){return new K(this.toJSON(),{parse:!0})},defaults:function(){return{schedule:new k}},getExcludes:function(){var e=this.get("config");return e&&e.getExcludes()||[]},getIncludes:function(){var e=this.get("config");return e&&e.getIncludes()||[]},getPage:function(){var e=this.get("config");return e&&e.getPage()},getTags:function(e){var t,n=[],a=(this.get("tags")||"").split(",");return _.each(a,(function(a){(t=e&&e.get(a))&&n.push(t)})),n},isDynamic:function(){var e=this.get("config");if(e){var t=e.get("selections");if(t&&t.length>0)return!0===t.at(0).attributes.dynamic}return!1},isEmpty:function(){var e=this.get("config");return!e||e.isEmpty()},isRead:function(){return C(this.get("ts_view"))>=C(this.get("ts_data"))},parse:function(e){if((e=K.__super__.parse.call(this,e)).config)if(e.content_type==d.a.TYPE_FEED)e.config=new q(e.config);else if(e.content_type==d.a.TYPE_HTML)e.config=new Q(e.config,{parse:!0});else if(e.content_type==d.a.TYPE_PDF_HTML)e.config=new X(e.config,{parse:!0});else if(e.content_type==d.a.TYPE_XML)e.config=new z(e.config,{parse:!0});else{if(e.content_type!=d.a.TYPE_DOC)throw new Error("Unknown content_type: "+e.content_type);e.config=new W(e.config,{parse:!0})}return e.schedule&&(e.schedule=new k(e.schedule,{parse:!0})),e},save:function(){var e=this.get("config").get("meta")||{};if(!this.id&&e.tplId){var t=this;this.once("sync",(function(){g.a.api("/tpls/sieves/usage","POST",{tpl_id:e.tplId,sieve_id:t.id,uri:t.get("uri")},(function(e,t){}))}))}K.__super__.save.apply(this,arguments)}}),Z=u.a.PagedCollection.extend({model:K,paginator_ui:{currentPage:0,perPage:50},url:"/sieves"}),ee=u.a.PagedCollection.extend({initialize:function(e,t){this.parent=t.parent},url:function(){return["/sieves",this.parent.id,"data"].join("/")}}),te=M.extend({encodedFields:["config"],urlRoot:"/rules",defaults:function(){return{config:{type:p.a.TYPE_RULE_GROUP,op:p.a.OP_AND,rules:[]}}},isEmpty:function(){var e=this.get("config");return!(e&&e.rules.length>0)}}),ne=M.extend({encodedFields:["err","data"]}),ae=U.extend({model:ne,initialize:function(e,t){this.parent=t.parent,this.on("add",this.onAdd,this)},onAdd:function(e){e.parent=this.parent},url:function(){var e="works";this.parent.get("client_id"),App.clients.defaultId;return b.a.agents.local&&(e="works/local"),["/sieves",this.parent.id,e].join("/")}}),re=f.a.SelectOptionsPlugin.extend({action_add:function(){new D.AttrEditorModal({attrs:this.attrs,param:_.omit(this.param,"plugins"),parent:this.editor.getRoot(),width:400}).show()},fetch:function(){this.attrs.fetch({data:{name:this.param.name,"state.in":[10,40],_opt:{order:["ts"]}}})},getOptionLabel:function(e){return e.get(this.attrLabel)+(10==e.get("state")?" - unverified":"")},load:function(){this.attrs=new T.UserAttrs,this.listenTo(this.editor,"reset",_.bind(this.fetch,this)),this.listenTo(this.attrs,"sync",_.bind(this.loadData,this)),this.fetch(),$(this.separator).attr("label",Object(c.a)("l_loading"))},onSync:function(){var e=this;o.a.service.SyncMan._syncStore(o.a.store.AttrStore,(function(){e.fetch()}))},render:function(){var e;(re.__super__.render.call(this),b.a.agents.local&&b.a.isSignedIn())&&($(this.select).after(" ",e=BUTTON({class:"btn xbtn-light",title:Object(c.a)("l_sync")},I({class:"fa fa-refresh"}))),e.onclick=this.onSync.bind(this))},unload:function(){re.__super__.unload.call(this),this.attrs.reset()}}),ie=f.a.Plugin.extend({onSignIn:function(){window.location.href=o.a.service.serviceLoginUrl},render:function(){b.a.agents.local&&!b.a.isSignedIn()&&(this.a=A({href:"javascript:void 0"},B(Object(c.a)("a_signin"))),$(this.editor.field).hide().after(this.a),this.a.onclick=_.bind(this.onSignIn,this))}}),se=f.a.Plugin.extend({play:function(){var e=this.editor.field,t=AUDIO(),n=e.value;function a(e){t.src=e,t.play()}$(e).after(t),0==n.indexOf("tone:")?o.a.store.KVStore.findOne(n,(function(e,t){a(t.value)})):a(n)},render:function(){var e=this.editor.field,t=A({href:"javascript:void 0"},Object(c.a)("a_play"));$(e).after(" ",t),t.onclick=_.bind(this.play,this)}}),oe=[{type:d.a.ACTION_EMAIL,label:"l_action_email",icon:"fa-envelope-o",addByDefault:function(e){return e.user&&e.email},params:[{label:"l_email",must:!0,name:"email",type:"email",plugins:[re,ie]}]},{type:d.a.ACTION_PUSH,label:"l_action_push",icon:"fa-mobile",paid:1,single:!0,addByDefault:function(e){return!1},params:[],plugin:function(e){var t=new T.UserAttrs;t.fetch({data:{"name.in":["fcm_id","gcm_id","apns_id"],"state.in":[0,40],_opt:{order:["ts"],limit:1}},success:function(){0==t.length&&e.$el.append(P({class:"error",style:"padding:5px"},"App not installed. Install one to get push notifications."))}})}},{type:d.a.ACTION_SMS,label:"l_action_sms",icon:"fa-mobile",paid:1,addByDefault:function(e){return!1},params:[{label:"l_phone",must:!0,name:"phone",type:"phone",plugins:[re,ie]}]},{type:d.a.ACTION_DISCORD,label:"l_action_discord",icon:"fa-terminal",paid:1,addByDefault:function(e){return!1},params:[{label:"l_discord",must:!0,name:"discord",type:"url",plugins:[ie]}]},{type:d.a.ACTION_SLACK,label:"l_action_slack",icon:"fa-slack",paid:1,addByDefault:function(e){return!1},params:[{label:"l_slack",must:!0,name:"slack",type:"url",plugins:[ie]}]},{type:d.a.ACTION_WEBHOOK,label:"l_action_webhook",icon:"fa-terminal",paid:1,addByDefault:function(e){return!1},defaults:{data:{id:"{{sieve.id}}",name:"{{sieve.name}}",uri:"{{sieve.uri}}",text:"{{sieve_data.text}}"}},params:[{label:"l_url",must:!0,name:"url",type:"url",values:[{name:"sieve.id",help:"Monitor's UUID."}],plugins:[ie]},{label:"l_data",fieldLabel:"l_field",must:!1,name:"data",type:"request_data",values:[{name:"sieve.id",help:"Monitor's UUID."},{name:"sieve_data.data",help:"Data fetched from source. HTML for pages and XML for feeds."},{name:"sieve_data.text",help:"Readable text extracted from source data."}]},{label:"l_headers",fieldLabel:"l_header",must:!1,name:"headers",type:"request_headers",values:[]}]},{type:d.a.ACTION_LOCAL_OPEN_TAB,label:"l_action_local_open_tab",icon:"fa-file-o",local:!0,single:!0,addByDefault:function(){return!1},params:[]},{type:d.a.ACTION_LOCAL_POPUP,label:"l_action_local_popup",icon:"fa-comment-o",local:!0,single:!0,addByDefault:function(e){return e.agents.local},params:[]},{type:d.a.ACTION_LOCAL_AUDIO,label:"l_action_local_audio",icon:"fa-volume-up",local:!0,single:!0,addByDefault:function(e){return e.agents.local},params:[{label:"l_tone",name:"tone",type:"enum",must:!0,list:(L=[{label:"l_bell_strike",value:"/skin/media/bell_strike.ogg"},{label:"l_asian_koel",value:"/skin/media/asian_koel.ogg"},{label:"l_ding_dong",value:"/skin/media/ding_dong.ogg"},{label:"l_buzzer",value:"/skin/media/buzzer.ogg"}],b.a.agents.local&&o.a.store.KVStore.findOne("tones",(function(e,t){if(t){var n=JSON.parse(t.value);_.each(n,(function(e){L.push(e)}))}})),L),plugins:[se]}]}],le=M.extend({encodedFields:["config"],parent:null,defaults:function(){var e=this.desc,t={type:e.type};return e.defaults&&(t.config=_.result(e,"defaults")),t},initialize:function(e,t){this.parent=t&&t.parent},urlRoot:function(){var e=this.parent;if(null==e)throw new Error("Parent sieve not set for action");return"/sieves/"+e.id+"/actions"}}),ce=le.extend({desc:{type:d.a.ACTION_NONE,label:"l_action_none",single:!0,addByDefault:function(e){return!1},params:[]}}),ue=U.extend({initialize:function(e,t){this.parent=t.parent,this.on("add",this.onAdd,this)},onAdd:function(e){e.parent=this.parent},parse:function(e){return e=ue.__super__.parse.call(this,e),_.map(e,(function(e){return new(le[e.type]||ce)(e,{parse:!0,parent:this.parent})}),this)},url:function(){return["/sieves",this.parent.id,"actions"].join("/")}});b.a.agents.local&&oe.slice(0).forEach((function(e,t){e.local&&(oe.splice(t,1),oe.splice(0,0,e))})),_.each(oe,(function(e){le[e.type]=le.extend({desc:e},{desc:e})}));t.a={LocatorDescList:[{type:"css",label:"l_css_selector",params:[{label:"l_css_selector",help:"h_css_selelctor",must:!0,name:"expr",type:"css"}]},{type:"js",label:"l_js",params:[{label:"l_js",help:"h_js",must:!0,name:"expr",type:"js"}]},{type:"xpath",label:"l_xpath",params:[{label:"l_xpath",help:"h_xpath",must:!0,name:"expr",type:"xpath"}]}],Frame:H,Frames:V,Page:Y,Pages:J,Schedule:k,Sieve:K,SieveConfigFeed:q,SieveConfigHTML:Q,Sieves:Z,SieveDataPager:ee,SieveRule:te,SieveActionDescList:oe,SieveAction:le,SieveActions:ue,Works:ae,ACTION_EMAIL:d.a.ACTION_EMAIL,ACTION_SMS:d.a.ACTION_SMS,ACTION_PUSH:d.a.ACTION_PUSH}},13:function(e,t,n){"use strict";var a=n(8),r=n.n(a),i=n(15),s=n(0),o=window._;if(!o)throw new Error("ADD _");t.a=function(e){var t=o.toArray(arguments).slice(1);return t=o.map(t,(function(e){return o.isString(e)?Object(s.a)(e):e})),i.a.sprintf.apply(i.a,r()([Object(s.a)(e)].concat(t)))}},16:function(e,t,n){"use strict";var a=n(5),r=n.n(a),i=n(7),s=n.n(i),o=n(8),l=n.n(o),c=n(10),u=n(46),p=window._;if(!p)throw new Error("ADD _");var d=window.Backbone;if(!d)throw new Error("ADD Backbone");function f(e,t,n){if(c.a.api){var a=p.result(t,"url")||h(),r=n.data;null!=r||!t||"create"!==e&&"update"!==e&&"patch"!==e||(r=n.attrs||t.toJSON(n));var i=n.xhr=c.a.api(a,e,r,(function(e,t){e?n.error&&n.error(e):n.success&&n.success(t)}));return t.trigger("request",t,i,n),i}c.a.on("init",(function(){f(e,t,n)}))}var h=function(){throw new Error('A "url" property or function must be specified')},_=d.Model.prototype.fetch;d.Model.prototype.fetch=function(){var e=s()(r.a.mark((function e(t){var n=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t||(t={}),e.abrupt("return",new Promise((function(e,a){_.call(n,{error:function(){for(var e,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];t.error&&(e=t).error.apply(e,r),a(r)},success:function(){for(var n,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];t.success&&(n=t).success.apply(n,r),e(r)}})})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();var g=d.Model.extend({sync:f,encodedFields:[],clone:function(){var e=this.toJSON();return new this.constructor(e,{parse:!0})},parse:function(e){return p.each(this.encodedFields,(function(t){var n=e[t];if(p.isString(n)){var a=null;try{a=JSON.parse(n)}catch(e){console.error("Invalid model json attribute:",t,n,e)}e[t]=a}})),e},prop:function(e,t){if(this.props||(this.props={}),2!=arguments.length)return p.result(this.props,e);var n=p.result(this.props,e);n!==t&&(this.props[e]=t,this.trigger("prop:"+e,t,n),this.collection&&this.collection.trigger("prop:"+e,t,n,this))},toJSON:function(){var e=d.Model.prototype.toJSON.call(this);return p.each(this.encodedFields,(function(t){var n=e[t];p.isEmpty(n)||(e[t]=JSON.stringify(n))})),e}});t.a={sync:f,syncBatch:function(e,t){var n=p.map(e.dels,(function(e){return{method:"DELETE",url:p.result(e,"url")||h()}})),a=p.map(e.posts,(function(e){return{method:"POST",url:p.result(e,"url")||h(),body:e.toJSON()}})),r=p.map(e.puts,(function(e){return{method:"PUT",url:p.result(e,"url")||h(),body:p.pick.apply(p,l()([e.toJSON()].concat(p.keys(e.changedAttributes()))))}})),i=[].concat(n,a,r);return 0!=i.length&&(DBG&&console.log("syncBatch: requests:",i),c.a.batch(i,t))},Model:g,Collection:d.Collection.extend({model:g,parse:function(e){return e.data},sync:f}),PagedCollection:u.a.requestPager.extend({model:d.Model.extend(),paginator_core:{},paginator_ui:{currentPage:0,perPage:2},server_api:{_opt:function(){return{limit:this.perPage,offset:this.currentPage*this.perPage}}},parse:function(e){return this.offset=e.offset,this.totalPages=Math.ceil(e.count/this.perPage),this.totalRecords=e.total_count,e.data}})}},23:function(e,t,n){"use strict";var a=n(1),r=[{type:a.a.RULE_NOT_EMPTY,label:"l_not_empty",params:[]},{type:a.a.RULE_HAS_TEXT,label:"l_has",params:[{label:"l_text",must:!0,name:"input",type:"text"}]},{type:a.a.RULE_HAS_TEXT_NOT,label:"l_has_not",params:[{label:"l_text",must:!0,name:"input",type:"text"}]},{type:a.a.RULE_HAS_NUMBER_LT,label:"l_has_num_lt",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_HAS_NUMBER_GT,label:"l_has_num_gt",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_HAS_NUMBER_DECR_MIN,label:"l_has_num_decr_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_HAS_NUMBER_INCR_MIN,label:"l_has_num_incr_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_HAS_NUMBER_DECR_PERCENT_MIN,label:"l_has_num_decr_percent_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_HAS_NUMBER_INCR_PERCENT_MIN,label:"l_has_num_incr_percent_min",params:[{label:"l_num",must:!0,name:"input",type:"number"}]},{type:a.a.RULE_MATCH_REGEX,label:"l_match_regex",params:[{label:"l_regex",must:!0,name:"input",type:"regexp"}]}],i=[{type:a.a.CONTENT_TYPE_TEXT,label:"l_text"},{type:a.a.CONTENT_TYPE_CHANGED_TEXT,label:"l_added_text"},{type:a.a.CONTENT_TYPE_OLD_TEXT,label:"l_text_old"}];t.a={ContentList:i,DescList:r}},46:function(e,t,n){"use strict";var a=n(10),r=window.Backbone;if(!r)throw new Error("ADD Backbone");var i=window._;if(!i)throw new Error("ADD _");var s=window.jQuery;if(!s)throw new Error("ADD jQuery");var o={version:"0.6.0"};o.requestPager=r.Collection.extend({sync:function(e,t,n){var r=this,s=n.data||{},o=i.result(t,"url");r.setDefaults();var l={};i.each(i.result(r,"server_api"),(function(e,t){i.isFunction(e)&&(e=e.call(r)),l[t]=e})),s._opt=i.extend(l._opt||{},s._opt),i.extend(l,s);var c=a.a.api(o,e,l,(function(e,t){e?n.error&&n.error(e):n.success&&n.success(t)}));return t&&t.trigger&&t.trigger("request",t,c,n),c},setDefaults:function(){var e=this;i.defaults(e.paginator_ui,{firstPage:0,currentPage:1,perPage:5,totalPages:10,pagesInRange:4}),i.each(e.paginator_ui,(function(t,n){i.isUndefined(e[n])&&(e[n]=e.paginator_ui[n])}))},requestNextPage:function(e){var t=this.info();if(!(t.currentPage+1>=t.totalPages)){if(void 0!==this.currentPage)return this.currentPage+=1,this.pager(e);var n=new s.Deferred;return n.reject(),n.promise()}e.error&&e.error("Cannot go past last page")},requestPreviousPage:function(e){if(!(this.currentPage<=0)){if(void 0!==this.currentPage)return this.currentPage-=1,this.pager(e);var t=new s.Deferred;return t.reject(),t.promise()}e.error&&e.error("Cannot go before first page")},goTo:function(e,t){if(void 0!==e)return this.currentPage=parseInt(e,10),this.pager(t);var n=new s.Deferred;return n.reject(),n.promise()},howManyPer:function(e){void 0!==e&&(this.currentPage=this.firstPage,this.perPage=e,this.pager())},info:function(){var e={totalRecords:this.totalRecords||0,currentPage:this.currentPage,firstPage:this.firstPage,totalPages:Math.ceil(this.totalRecords/this.perPage),lastPage:this.totalPages,perPage:this.perPage,previous:!1,next:!1};return this.currentPage>1&&(e.previous=this.currentPage-1),this.currentPage<e.totalPages&&(e.next=this.currentPage+1),e.hasNext=e.next,e.hasPrevious=e.next,e.pageSet=this.setPagination(e),this.information=e,e},setPagination:function(e){var t=[],n=0,a=0,r=2*this.pagesInRange,i=Math.ceil(e.totalRecords/e.perPage);if(i>1)if(i<=1+r)for(n=1,a=i;n<=a;n++)t.push(n);else if(e.currentPage<=this.pagesInRange+1)for(n=1,a=2+r;n<a;n++)t.push(n);else if(i-this.pagesInRange>e.currentPage&&e.currentPage>this.pagesInRange)for(n=e.currentPage-this.pagesInRange;n<=e.currentPage+this.pagesInRange;n++)t.push(n);else for(n=i-r;n<=i;n++)t.push(n);return t},pager:function(e){return this.fetch(e||{})},bootstrap:function(e){return i.extend(this,e),this.setDefaults(),this.info(),this}}),o.requestPager.prototype.nextPage=o.requestPager.prototype.requestNextPage,o.requestPager.prototype.prevPage=o.requestPager.prototype.requestPreviousPage,t.a=o},54:function(e,t,n){"use strict";var a=n(2),r=n(0),i=n(4),s=n(3);if(!window.domo)throw new Error("ADD domo");var o=window.jQuery;if(!o)throw new Error("ADD jQuery");var l=window._;if(!l)throw new Error("ADD _");var c=window.Backbone;if(!c)throw new Error("ADD Backbone");i.a.Base.extend({name:"LoginView",getCredentials:function(e){return{user:this.form.id.value,password:this.form.password.value}[e]},postInit:function(){var e=this,t=(arguments.length>0&&void 0!==arguments[0]&&arguments[0],this);this.model=new c.Model({name:USER.name||""}),window.addEventListener("message",(function(t){"event"==t.data.type&&e.trigger("frame:"+t.data.data)})),this.on("frame:ready",(function(){console.log("frame:ready"),o(".xloading").remove(),o(".xdevice-manager").show(),e.postMessage({type:"request",data:{action:"login",name:t.getCredentials("user"),password:t.getCredentials("password")}})})),this.on("frame:done",(function(){e.saveToken()})),this.on("frame:cancel",(function(){o(".xlogin").show(),o(".xdevice-manager").remove()}))},postMessage:function(e){this.iframe.contentWindow.postMessage(e,a.a.CFG.URL.ROOT)},events:{submit:"submit"},showErrMsg:function(e){switch(e.status){case 400:return Object(r.a)("e_auth_400");case 403:return Object(r.a)("e_auth_403");case 402:return Object(r.a)("e_auth_402");default:return Object(r.a)("e_auth_5xx")}},saveToken:function(){var e=this,t={name:this.form.id.value,password:this.form.password.value};l.isEmpty(t.name)||l.isEmpty(t.password)?s.a.error(Object(r.a)("e_auth_400")):(this.$(".xsubmit").button("loading"),a.a.auth.saveToken(t,(function(t){e.$(".xsubmit").button("reset"),t?(console.error("checkLogin:err?",t),s.a.error(e.showErrMsg(t)),402==t.status&&e.renderLoading()):(s.a.reset(),e.options.onLogin())})))},submit:function(e){e.preventDefault(),this.saveToken()},getMargin:function(){return this.options.isPopup?"40px":"".concat("100px")},showHeader:function(){return this.options.isPopup?"hide":""},getStyle:function(){return this.options.isPopup?"display:block;":"box-shadow: 5px 5px 10px #999; margin: auto;\n        margin-top: ".concat(this.options.isPopup?"0px":"100px",";\n        overflow:hidden; max-width: 600px;")},renderLoading:function(){o(".xlogin").hide(),this.$el.append(DIV({class:"xloading",style:"margin: 50% auto; font-size: 3em; text-align: center;"},I({class:"fa fa-spin fa-spinner"})," ",Object(r.a)("l_loading"))),this.renderDevice(),o(".xdevice-manager").hide()},renderDevice:function(){var e=this,t=this.options.isPopup?"100vh":"calc(90vh - 100px)";this.$el.append(DIV({class:"xdevice-manager",style:"".concat(this.getStyle())},this.iframe=IFRAME({src:a.a.CFG.URL.ROOT+"/frame-devices",style:"\n          width: 100%;\n          height: ".concat(t,";\n          margin-top: ").concat(t,";\n          transition: margin-top 300ms ease\n          "),frameborder:"none"}))),setTimeout((function(){return e.iframe.style.marginTop=0}),300)},render:function(){return this.$el.empty().append(DIV({class:"xpopup-heading xheader xheader-ext ".concat(this.showHeader()),style:"width: 300px; margin: auto"},H2({class:"text-center"},Object(r.a)("a_signin"))),this.form=FORM({class:"xlogin",style:"width: 300px; margin: auto"},DIV({class:"xdistill-icon-container",style:"\n          margin-top: ".concat(this.getMargin(),";")},IMG({src:"ui/img/distill_128.png",style:"\n          display:block;\n          margin: auto;\n          border: solid 1px #ccc;\n          width: 150px;\n          height: 150px;\n          padding: 15px;\n          border-radius: 50%;\n          background-color: #fff;\n          box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;\n          background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));\n          background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7); ",title:"Distill"})),DIV({style:"margin-top: 50px;"},A({class:"xurl btn btn-primary btn-block",style:"margin-left: 10px;",href:"".concat(a.a.CFG.URL.ROOT,"/service-login?redirect=app://ui/inbox.html#inbox")},Object(r.a)("a_login"))),DIV({style:"margin-top: 20px;"},A({class:"xurl btn btn-default btn-block",style:"margin-left: 10px;",href:"".concat(a.a.CFG.URL.ROOT,"/register")},Object(r.a)("a_register"))),DIV({class:"text-center",style:"margin-top: 25px"},A({class:"xurl",href:"".concat(a.a.CFG.URL.ROOT,"/account/forgot_password")},Object(r.a)("a_forgot_pass"))))),this.focus(),this}})},55:function(e,t,n){"use strict";var a=n(0),r=n(13),i=n(2),s=(n(10),n(3),n(4)),o=(n(54),n(14),window.jQuery);if(!o)throw new Error("ADD jQuery");var l=window._;if(!l)throw new Error("ADD _");var c=window.Backbone;if(!c)throw new Error("ADD Backbone");var u=s.a.SimpleForm.extend({name:"SignInForm",fields:[{must:!0,name:"name",type:"text",label:"l_username"},{must:!0,name:"password",type:"password",label:"l_password"}],render:function(){return u.__super__.render.call(this),this.$el.append(DIV({class:"control-group"},this.msg=SMALL({class:"help"}))),this},showMsg:function(e,t){this.msg.textContent=e?Object(a.a)(e):"",o(this.msg)[t?"addClass":"removeClass"]("error")},submit:function(){return this.trigger("submit"),!1}}),p=s.a.SaveDiscardModal.extend({name:"SignInModal",action_discard:function(){this.remove()},action_save:function(){this.view.onSubmit()},initialize:function(e){this.model=new c.Model({name:USER.name||""}),l.defaults(e,{a_save:"a_signin",title:"l_account",width:600,view:new u({parent:e.parent,model:this.model})}),p.__super__.initialize.call(this,e),this.listenTo(this.view,"submit",this.saveToken)},renderFooter:function(){var e=p.__super__.renderFooter.call(this);return o(e).append(A({href:i.a.CFG.URL.ROOT+"/register?client="+i.a.CFG.CLIENT.NAME,target:"_blank"},Object(a.a)("a_register"))),e},saveToken:function(){var e=this,t=this.model.pick("name","password");l.isEmpty(t.name)||l.isEmpty(t.password)||(this.showProgress(!0),e.view.showMsg("l_loading"),i.a.auth.saveToken(t,(function(t){e.showProgress(!1),t?e.view.showMsg(t.response.code+" : "+(t.response.msg||t.msg||t.message||"e_signin_invalid"),!0):(e.view.showMsg("m_login_success"),setTimeout((function(){e.remove(),e.options.onSignIn&&e.options.onSignIn()}),100))})))}}),d=s.a.ActionProvider.extend({name:"SettingsGeneral",actions:{"settings signout":{fn:"action_signout"},"settings close":{fn:"closeLoginForm"}},events:{change:"event_change","click .xclose":"closeLoginForm"},closeLoginForm:function(){this.loginView.remove(),o(this.elLoginCt).remove(),this.updateUser()},action_signout:function(){i.a.auth.logout(),location.href=i.a.CFG.URL.ROOT+"/logout"},event_change:function(){this.saveValues()},load:function(e){this.setValues(),e()},render:function(){return this.$el.attr({id:"general",class:"hide"}).append(DIV({class:"panel panel-default"},HEADER({class:"panel-heading"},H3("General")),DIV({class:"panel-body"},DIV({class:"form-group"},H4(Object(a.a)("l_account")),A({class:"btn btn-primary",href:"".concat(i.a.CFG.URL.ROOT,"/service-login?redirect=app://ui/inbox.html#inbox"),"data-action":"settings signin"}),BUTTON({class:"btn btn-default",style:"margin-left: 20px;","data-action":"settings signout"},Object(a.a)("a_signout"))),DIV(Object(a.a)("m_ext_signin"))))),this.elSignIn=this.$('[data-action="settings signin"]'),this.elSyncInfo=this.$(".alert"),this},saveValues:function(){this.$el.find("input,select").each((function(){var e=this;"checkbox"==e.type?i.a.store.Prefs.set(e.name,e.checked):i.a.store.Prefs.set(e.name,e.value)}))},setValues:function(){this.$el.find("input,select").each((function(){var e=this;"checkbox"==e.type?e.checked=i.a.store.Prefs.get(e.name):e.value=i.a.store.Prefs.get(e.name)})),this.showCred()},showCred:function(){USER.name?this.elSignIn.text(Object(r.a)("l_signed_in_as","".concat(USER.name," (").concat(USER.email,")"))):this.elSignIn.text(Object(a.a)("a_signin"))},updateUser:function(){var e=this;i.a.auth.getUser((function(t,n){l.extend(USER,n),e.showCred()}))}});t.a={SignInModal:p,View:d}},9:function(e,t,n){"use strict";var a=n(2);t.a={user:1,email:1,phone:0,isSignedIn:function(){return null!=a.a.auth.getToken()},agents:{local:1,type:a.a.CFG.CLIENT.TYPE,version:a.a.CFG.VERSION},actions:{popup:!0},tabForDynamic:a.a.Supports.tabForDynamic,tabForXFrame:a.a.Supports.tabForXFrame}}}]);
//# sourceMappingURL=2.js.map