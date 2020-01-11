// LICENSE_CODE ZON ISC
'use strict'; 
(function(){
var define;
var is_node = typeof module=='object' && module.exports && module.children;
var is_rn = (typeof global=='object' && !!global.nativeRequire) ||
    (typeof navigator=='object' && navigator.product=='ReactNative');
var qs;

if (is_rn)
    define = require('./require_node.js').define(module, '../');
else if (!is_node)
    define = self.define;
else
{
    define = require('./require_node.js').define(module, '../');
    var _require = require;
    qs = _require('querystring');
}
define([], function(){
var assign = Object.assign;
var E = {};

E.add_proto = function(url){
    if (!url.match(/^([a-z0-9]+:)?\/\//i))
        url = 'http://'+url;
    return url;
};

E.rel_proto_to_abs = function(url){
    var proto = is_node ? 'http:' : location.protocol;
    return url.replace(/^\/\//, proto+'//');
};

E.get_top_level_domain = function(host){
    var n = host.match(/\.([^.]+)$/);
    return n ? n[1] : '';
};

E.get_host = function(url){
    var n = url.match(/^(https?:)?\/\/([^\/]+)\/.*$/);
    return n ? n[2] : '';
};

E.get_host_without_tld = function(host){
    return host.replace(/^([^.]+)\.[^.]{2,3}(\.[^.]{2,3})?$/, '$1');
};

var generic_2ld = {com: 1, biz: 1, net: 1, org: 1, xxx: 1, edu: 1, gov: 1,
    ac: 1, co: 1, or: 1, ne: 1, kr: 1, jp: 1, jpn: 1, cn: 1};

E.get_root_domain = function(domain){
    if (E.is_ip(domain))
        return domain;
    var s = domain.split('.'), root = s, len = s.length;
    if (len>2) 
    {
        var hd = 0;
        if (s[len-1]=='hola')
        {
            hd = 2; 
            if (s[len-2].match(/^\d+$/))
                hd = 3; 
        }
        if (generic_2ld[s[len-2-hd]])
            root = s.slice(-3-hd, len-hd); 
        else
            root = s.slice(-2-hd, len-hd); 
    }
    return root.join('.');
};

E.get_domain_email = function(email){
    var match = email.toLowerCase().match(/^[a-z0-9_\.\-\+]+@(.*)$/);
    return match && match[1];
};

E.get_root_domain_email = function(email){
    var domain = E.get_domain_email(email);
    return domain && E.get_root_domain(domain);
};

E.get_path = function(url){
    var n = url.match(/^https?:\/\/[^\/]+(\/.*$)/);
    return n ? n[1] : '';
};

E.get_proto = function(url){
    var n = url.match(/^([a-z0-9]+):\/\//);
    return n ? n[1] : '';
};

E.get_host_gently = function(url){
    var n = url.match(/^(?:(?:[a-z0-9]+?:)?\/\/)?([^\/]+)/);
    return n ? n[1] : '';
};

E.is_ip = function(host){
    var m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
    if (!m)
        return false;
    for (var i=1; i<=4; i++)
    {
        if (+m[i]>255)
            return false;
    }
    return true;
};

E.is_ip_mask = function(host){
    var m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
    if (!m)
        return false;
    if (E.ip2num(host)==0)
        return false;
    var final = false;
    var check_num_mask = function(num){
        var arr = (num >>> 0).toString(2).split(''), fin = false;
        for (var i=0; i<arr.length; i++)
        {
            if (fin && arr[i]=='1')
                return false;
            if (!fin && arr[i]=='0')
                fin = true;
        }
        return true;
    };
    for (var i=1; i<=4; i++)
    {
        if (+m[i]>255)
            return false;
        if (final && +m[i]>0)
            return false;
        if (!final && +m[i]<255)
        {
            if (!check_num_mask(+m[i]))
                return false;
            final = true;
        }
    }
    return !!final;
};

E.ip2num = function(ip){
    var num = 0;
    ip.split('.').forEach(function(octet){
        num <<= 8;
        num += +octet;
    });
    return num>>>0;
};

E.num2ip = function(num){
    return (num>>>24)+'.'+(num>>16 & 255)+'.'+(num>>8 & 255)+'.'+(num & 255);
};

E.is_ip_subnet = function(host){
    var m = /(.+?)\/(\d+)$/.exec(host);
    return m && E.is_ip(m[1]) && +m[2]<=32;
};

E.is_ip_netmask = function(host){
    var ips = host.split('/');
    if (ips.length!=2 || !E.is_ip(ips[0]) || !E.is_ip_mask(ips[1]))
        return false;
    return true;
};

E.is_ip_range = function(host){
    var ips = host.split('-');
    if (ips.length!=2 || !E.is_ip(ips[0]) || !E.is_ip(ips[1]))
        return false;
    return E.ip2num(ips[0])<E.ip2num(ips[1]);
};

E.is_ip_port = function(host){
    var m = /(.+?)(?::(\d{1,5}))?$/.exec(host);
    return m && E.is_ip(m[1]) && !(+m[2]>65535);
};

E.is_valid_url = function(url){
    return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9-]+(\/.*)?$/i.test(url); };

E.is_valid_domain = function(domain){
    return /^([a-z0-9]([a-z0-9-_]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain); };

E.is_hola_domain = function(domain){
    return domain.search(/^(.*\.)?(hola\.org|holacdn\.com|h-cdn\.com)$/)!=-1;
};

E.is_valid_email = function(email){
    var n = email.toLowerCase().match(/^[a-z0-9_\.\-\+]+@(.*)$/);
    return !!(n && E.is_valid_domain(n[1]));
};

E.is_alias_email = function(email){
    if (!E.is_valid_email(email))
        return false;
    var n = email.toLowerCase().match(/^([a-z0-9_\.\-\+]+)@.*$/);
    return !!(n && /.+\+.+/.test(n[1]));
};

E.get_main_email = function(email){
    if (!E.is_valid_email(email))
        return;
    if (E.is_alias_email(email))
        return email.replace(/\+.+@/, '@');
    return email;
};

E.is_ip_in_range = function(ips_range, ip){
    if (!E.is_ip_range(ips_range) || !E.is_ip(ip))
        return false;
    var ips = ips_range.split('-');
    var min_ip = E.ip2num(ips[0]), max_ip = E.ip2num(ips[1]);
    var num_ip = E.ip2num(ip);
    return num_ip>=min_ip && num_ip<=max_ip;
};

E.is_ip_local = function(ip){
    return E.is_ip_in_range('10.0.0.0-10.255.255.255', ip) ||
        E.is_ip_in_range('172.16.0.0-172.31.255.255', ip) ||
        E.is_ip_in_range('192.168.0.0-192.168.255.255', ip) ||
        E.is_ip_in_range('169.254.0.0-169.254.255.255', ip);
};

E.host_lookup = function(lookup, host){
    var pos;
    while (1)
    {
        if (host in lookup)
            return lookup[host];
        if ((pos = host.indexOf('.'))<0)
            return;
        host = host.slice(pos+1);
    }
};

E.uri_obj_href = function(uri){
    return (uri.protocol||'')+(uri.slashes ? '//' : '')
        +(uri.host ? (uri.auth ? uri.auth+'@' : '')+uri.host : '')
        +uri.path
        +(uri.hash||'');
};

var protocol_re = /^((?:about|http|https|file|ftp|ws|wss):)?(\/\/)?/i;
var host_section_re = /^(.*?)(?:[\/?#]|$)/;
var host_re = /^(?:(([^:@]*):?([^:@]*))?@)?([^:]*)(?::(\d*))?/;
var path_section_re = /^([^?#]*)(\?[^#]*)?(#.*)?$/;
var path_re_loose = /^(\/(?:.(?![^\/]*\.[^\/.]+$))*\/?)?([^\/]*?(?:\.([^.]+))?)$/;
var path_re_strict = /^(\/(?:.(?![^\/]*(?:\.[^\/.]+)?$))*\/?)?([^\/]*?(?:\.([^.]+))?)$/;

E.parse = function(url, strict){
    function re(expr, str){
        var m;
        try { m = expr.exec(str); } catch(e){ m = null; }
        if (!m)
            return m;
        for (var i=0; i<m.length; i++)
            m[i] = m[i]===undefined ? null : m[i];
        return m;
    }
    url = url||location.href;
    var m, uri = {orig: url}, remaining = url;
    if (!(m = re(protocol_re, remaining)))
        return {};
    uri.protocol = m[1];
    if (uri.protocol!==null)
        uri.protocol = uri.protocol.toLowerCase();
    uri.slashes = !!m[2];
    if (!uri.protocol && !uri.slashes)
    {
        uri.protocol = 'http:';
        uri.slashes = true;
    }
    remaining = remaining.slice(m[0].length);
    if (!(m = re(host_section_re, remaining)))
        return {};
    uri.authority = m[1];
    remaining = remaining.slice(m[1].length);
    if (!(m = re(host_re, uri.authority)))
        return {};
    uri.auth = m[1];
    uri.user = m[2];
    uri.password = m[3];
    uri.hostname = m[4];
    uri.port = m[5];
    if (uri.hostname!==null)
    {
        uri.hostname = uri.hostname.toLowerCase();
        uri.host = uri.hostname+(uri.port ? ':'+uri.port : '');
    }
    if (!(m = re(path_section_re, remaining)))
        return {};
    uri.relative = m[0];
    uri.pathname = m[1];
    uri.search = m[2];
    uri.query = uri.search ? uri.search.substring(1) : null;
    uri.hash = m[3];
    if (!(m = re(strict ? path_re_strict : path_re_loose, uri.pathname)))
        return {};
    uri.directory = m[1];
    uri.file = m[2];
    uri.ext = m[3];
    if (uri.file=='.'+uri.ext)
        uri.ext = null;
    if (!uri.pathname)
        uri.pathname = '/';
    uri.path = uri.pathname+(uri.search||'');
    uri.href = E.uri_obj_href(uri);
    return uri;
};

E.qs_parse = function(q, bin, safe){
    var obj = {};
    q = q.length ? q.split('&') : [];
    var len = q.length;
    var unescape_val = bin ? function(val){
        return qs.unescapeBuffer(val, true).toString('binary');
    } : safe ? function(val){
        try { return decodeURIComponent(val.replace(/\+/g, ' ')); }
        catch(e){ return val; }
    } : function(val){
        return decodeURIComponent(val.replace(/\+/g, ' '));
    };
    for (var i = 0; i<len; ++i)
    {
        var x = q[i];
        var idx = x.indexOf('=');
        var kstr = idx>=0 ? x.substr(0, idx) : x;
        var vstr = idx>=0 ? x.substr(idx + 1) : '';
        var k = unescape_val(kstr);
        var v = unescape_val(vstr);
        if (obj[k]===undefined)
            obj[k] = v;
        else if (Array.isArray(obj[k]))
            obj[k].push(v);
        else
            obj[k] = [obj[k], v];
    }
    return obj;
};

function token_regex(s, end){ return end ? '^'+s+'$' : s; }

E.http_glob_host = function(host, end){
    var port = '';
    var parts = host.split(':');
    host = parts[0];
    if (parts.length>1)
        port = ':'+parts[1].replace('*', '[0-9]+');
    var n = host.match(/^(|.*[^*])(\*+)$/);
    if (n)
    {
        host = E.http_glob_host(n[1])
        +(n[2].length==1 ? '[^./]+' : '[^/]'+(n[1] ? '*' : '+'));
        return token_regex(host+port, end);
    }
    host = host.replace(/\*\*\./, '**').replace(/\*\./, '*')
    .replace(/\./g, '\\.').replace(/\*\*/g, '(([^./]+\\.)+)?')
    .replace(/\*/g, '[^./]+\\.');
    return token_regex(host+port, end);
};

E.http_glob_path = function(path, end){
    if (path[0]=='*')
        return E.http_glob_path('/'+path, end);
    var n = path.match(/^(|.*[^*])(\*+)([^*^\/]*)$/);
    if (n)
    {
        path = E.http_glob_path(n[1])+(n[2].length==1 ? '[^/]+' : '.*')+
            E.http_glob_path(n[3]);
        return token_regex(path, end);
    }
    path = path.replace(/\*\*\//, '**').replace(/\*\//, '*')
    .replace(/\//g, '\\/').replace(/\./g, '\\.')
    .replace(/\*\*/g, '(([^/]+\\/)+)?').replace(/\*/g, '[^/]+\\/');
    return token_regex(path, end);
};

E.http_glob_url = function(url, end){
    var n = url.match(/^((.*):\/\/)?([^\/]+)(\/.*)?$/);
    if (!n)
        return null;
    var prot = n[1] ? n[2] : '*';
    var host = n[3];
    var path = n[4]||'**';
    if (prot=='*')
        prot = 'https?';
    host = E.http_glob_host(host);
    path = E.http_glob_path(path);
    return token_regex(prot+':\\/\\/'+host+path, end);
};

E.root_url_cmp = function(a, b){
    var a_s = a.match(/^[*.]*([^*]+)$/);
    var b_s = b.match(/^[*.]*([^*]+)$/);
    if (!a_s && !b_s)
        return false;
    var re, s;
    if (a_s && b_s && a_s[1].length>b_s[1].length || a_s && !b_s)
    {
        s = a_s[1];
        re = b;
    }
    else
    {
        s = b_s[1];
        re = a;
    }
    s = E.add_proto(s)+'/';
    if (!(re = E.http_glob_url(re, 1)))
        return false;
    try { re = new RegExp(re); }
    catch(e){ return false; }
    return re.test(s);
};

E.qs_strip = function(url){ return /^[^?#]*/.exec(url)[0]; };

E.qs_str = function(_qs){
    var q = [];
    for (var k in _qs)
    {
        (Array.isArray(_qs[k]) ? _qs[k] : [_qs[k]]).forEach(function(v){
            q.push(encodeURIComponent(k)+'='+encodeURIComponent(v)); });
    }
    return q.join('&');
};

E.qs_add = function(url, _qs){
    var u = E.parse(url), q = assign(u.query ? E.qs_parse(u.query) : {}, _qs);
    u.path = u.pathname+'?'+E.qs_str(q);
    return E.uri_obj_href(u);
};

E.qs_parse_url = function(url){
    return E.qs_parse(url.replace(/(^.*\?)|(^[^?]*$)/, ''));
};

E.segments = function(url){
    var parsed = E.parse(url||location.href);
    var dir = parsed.directory||'/';
    if (dir=='/')
        return [''];
    return dir.split('/');
};

E.safe_redir = function(url, default_hostname){
    if (!url)
        return;
    var u = E.parse(url, true);
    var hostname = u.hostname||default_hostname;
    if (!/^https?:$/.test(u.protocol) || !hostname)
        return;
    if (E.is_hola_domain(hostname))
        return 'https://'+hostname+encodeURI(u.path);
};

return E; }); }());