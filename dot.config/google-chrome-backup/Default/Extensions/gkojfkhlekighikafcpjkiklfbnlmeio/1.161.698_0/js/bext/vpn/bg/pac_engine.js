// LICENSE_CODE ZON
'use strict'; 
(function(){
var define;
var is_node = typeof module=='object' && module.exports && module.children;
if (!is_node)
    define = self.define;
else
    define = require('../../../util/require_node.js').define(module, '../');
define(['/util/browser.js'], function quine(zbrowser){

var E = {};

var g_pac_engine = {};
var g_log = [];

function log(){
    var args = Array.from(arguments).map(function(o){
        return JSON.stringify(o); });
    var text = new Date().toISOString()+' '+args.join(' ');
    if (typeof browser!='undefined' && browser.runtime)
        browser.runtime.sendMessage({id: 'pac_log', data: text});
    else if (typeof alert!='undefined')
        alert(text);
    g_log.push(text);
    if (g_log.length > 256) 
        g_log.splice(0, g_log.length/2);
}

function direct(){ return {str: 'DIRECT'}; }

function validate_proxy_str(str){
    if (str=='DIRECT')
        return direct();
    var n = str.split(' ');
    if (n.length<2)
        return direct();
    else if (!{PROXY: 1, SOCKS: 1, SOCKS5: 1, HTTPS: 1}[n[0]])
        return direct();
    return {str: str};
}

function hex_decode(h){
    var s = '';
    for (var i = 0; i < h.length; i+=2)
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16));
    return s;
}
var local_resp = {str: 'PROXY 127.0.0.1:0'};
var local_redir = {rules: {}, counter: 0};
var regex_set_url = /^http:\/\/(.*).local.hola\/?$/;
function local_hola_cb(url){
    var n, i;
    try {
        if (n = url.match(regex_set_url))
            n = JSON.parse(hex_decode(n[1]));
    } catch(e){ n = null; }
    if (!n || n.key!=g_pac_engine.key)
        return local_resp;
    if (n.cleanup)
    {
        for (i in local_redir.rules)
        {
            if (local_redir.rules[i].name==n.rule_name)
                delete local_redir.rules[i];
        }
        return local_resp;
    }
    var set = n.set;
    var proxy = n.proxy;
    var entry = local_redir.rules[set];
    if (!entry || entry.proxy!=proxy)
        entry = local_redir.rules[set] = {proxy: proxy};
    entry.ts = Date.now();
    entry.name = n.rule_name;
    local_redir.counter++;
    if (!(local_redir.counter%1000))
    {
        var cur_ts = Date.now();
        for (i in local_redir.rules)
        {
            var local = local_redir.rules[i];
            if (cur_ts-local.ts>g_pac_engine.rule_cleanup_ms)
                delete local_redir.rules[i];
        }
        local_redir.counter = 0;
    }
    return local_resp;
}

E.init = function(options){
    options = options||{};
    g_pac_engine = {
        key: options.key,
        inited: true,
        rule_cleanup_ms: options.rule_cleanup_ms||30000,
    };
    local_redir = {rules: {}, counter: 0};
};

E.firefox_init = function(browser){
    browser.runtime.onMessage.addListener(function(msg){
        switch (msg.id)
        {
        case 'init': E.init(msg.options); break;
        }
    });
    browser.runtime.sendMessage({id: 'init', from_pac_script: true});
};

var hosts_callbacks = {
    '127.255.255.255': function(url, host){
        return {str: 'PROXY '+host+':0'}; },
    'local.hola': local_hola_cb,
};

var regex_set = /^__hola__\.set\.(.*\.local\.hola)$/;
E.FindProxyForURL = function(url, host){
    var pac = g_pac_engine, ret, m;
    if (!pac.inited)
        return 'DIRECT';
    if (host[0]=='_') 
    {
        if (m = host.match(regex_set))
        {
            host = 'local.hola';
            url = 'http://'+m[1]+'/';
        }
        else if (host=='__hola__.pac_get_log.local.hola')
        {
            var log_str = 'pac_get_log ['+g_log.join('\n')+']';
            g_log = [];
            throw new Error(log_str);
        }
    }
    if (host!='local.hola')
    {
        var then = local_redir.rules[url];
        if (then)
        {
            ret = validate_proxy_str(then.proxy);
            then.ts = Date.now();
        }
    }
    if (!ret)
    {
        var handler = hosts_callbacks[host];
        if (handler)
            ret = handler(url, host);
        else
            ret = direct();
    }
    if (!ret.str || typeof ret.str!='string')
    {
        var str = 'url '+url+'; host '+host+'; str '+ret.str+';';
        try { str += ' json '+JSON.stringify(ret.str)+';'; }
        catch(e){ str += ' json_err '+e+';'; }
        throw new Error('INVALID_RET '+str);
    }
    return ret.str;
};

E.set_key = function(key){ g_pac_engine.key = key; };

E.t = {
    global_var: function(){ return g_pac_engine; },
    local_redir: function(){ return local_redir; },
};

E.gen_pac = function(options){
    return 'var pac_engine = ('+quine+')({\n'
        +'    isInNet: isInNet, isPlainHostName: isPlainHostName});\n'
        +'function FindProxyForURL(url, host){\n'
        +'    return pac_engine.FindProxyForURL(url, host);\n'
        +'}\n'
        +'pac_engine.init('+JSON.stringify(options)+');\n';
};

E.gen_firefox_pac = function(){
    return 'var pac_engine = ('+quine+')({});\n'
        +'function FindProxyForURL(url, host){\n'
        +'    return pac_engine.FindProxyForURL(url, host);\n'
        +'}\n'
        +'pac_engine.firefox_init(browser);\n';
};

return E; }); })();
