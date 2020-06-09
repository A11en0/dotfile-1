(function (d, g) {
    "function" === typeof define && (define.amd || define.cmd) ? define(function () {
        return g(d)
    }) : "object" === typeof exports ? module.exports = g(d) : d.Browser = g(d)
})("undefined" !== typeof self ? self : this, function (d) {
    var g = d || {},
        h = "undefined" != typeof d.navigator ? d.navigator : {},
        k = function (b, a) {
            var c = h.mimeTypes,
                e;
            for (e in c)
                if (c[e][b] == a) return !0;
            return !1
        };
    return function (b) {
        var a = b || h.userAgent || {};
        b = {
            Trident: -1 < a.indexOf("Trident") || -1 < a.indexOf("NET CLR"),
            Presto: -1 < a.indexOf("Presto"),
            WebKit: -1 < a.indexOf("AppleWebKit"),
            Gecko: -1 < a.indexOf("Gecko/"),
            Safari: -1 < a.indexOf("Safari"),
            Chrome: -1 < a.indexOf("Chrome") || -1 < a.indexOf("CriOS"),
            IE: -1 < a.indexOf("MSIE") || -1 < a.indexOf("Trident"),
            Edge: -1 < a.indexOf("Edge") || -1 < a.indexOf("Edg/"),
            Firefox: -1 < a.indexOf("Firefox") || -1 < a.indexOf("FxiOS"),
            "Firefox Focus": -1 < a.indexOf("Focus"),
            Chromium: -1 < a.indexOf("Chromium"),
            Opera: -1 < a.indexOf("Opera") || -1 < a.indexOf("OPR"),
            Vivaldi: -1 < a.indexOf("Vivaldi"),
            Yandex: -1 < a.indexOf("YaBrowser"),
            Arora: -1 < a.indexOf("Arora"),
            Lunascape: -1 < a.indexOf("Lunascape"),
            QupZilla: -1 < a.indexOf("QupZilla"),
            "Coc Coc": -1 < a.indexOf("coc_coc_browser"),
            Kindle: -1 < a.indexOf("Kindle") || -1 < a.indexOf("Silk/"),
            Iceweasel: -1 < a.indexOf("Iceweasel"),
            Konqueror: -1 < a.indexOf("Konqueror"),
            Iceape: -1 < a.indexOf("Iceape"),
            SeaMonkey: -1 < a.indexOf("SeaMonkey"),
            Epiphany: -1 < a.indexOf("Epiphany"),
            360: -1 < a.indexOf("QihooBrowser") || -1 < a.indexOf("QHBrowser"),
            "360EE": -1 < a.indexOf("360EE"),
            "360SE": -1 < a.indexOf("360SE"),
            UC: -1 < a.indexOf("UC") || -1 < a.indexOf(" UBrowser"),
            QQBrowser: -1 < a.indexOf("QQBrowser"),
            QQ: -1 < a.indexOf("QQ/"),
            Baidu: -1 < a.indexOf("Baidu") || -1 < a.indexOf("BIDUBrowser") || -1 < a.indexOf("baiduboxapp"),
            Maxthon: -1 < a.indexOf("Maxthon"),
            Sogou: -1 < a.indexOf("MetaSr") || -1 < a.indexOf("Sogou"),
            LBBROWSER: -1 < a.indexOf("LBBROWSER"),
            "2345Explorer": -1 < a.indexOf("2345Explorer") || -1 < a.indexOf("Mb2345Browser"),
            "115Browser": -1 < a.indexOf("115Browser"),
            TheWorld: -1 < a.indexOf("TheWorld"),
            XiaoMi: -1 < a.indexOf("MiuiBrowser"),
            Quark: -1 < a.indexOf("Quark"),
            Qiyu: -1 < a.indexOf("Qiyu"),
            Wechat: -1 < a.indexOf("MicroMessenger"),
            Taobao: -1 < a.indexOf("AliApp(TB"),
            Alipay: -1 < a.indexOf("AliApp(AP"),
            Weibo: -1 < a.indexOf("Weibo"),
            Douban: -1 < a.indexOf("com.douban.frodo"),
            Suning: -1 < a.indexOf("SNEBUY-APP"),
            iQiYi: -1 < a.indexOf("IqiyiApp"),
            DingTalk: -1 < a.indexOf("DingTalk"),
            Huawei: -1 < a.indexOf("HuaweiBrowser") || -1 < a.indexOf("HUAWEI"),
            Windows: -1 < a.indexOf("Windows"),
            Linux: -1 < a.indexOf("Linux") || -1 < a.indexOf("X11"),
            "Mac OS": -1 < a.indexOf("Macintosh"),
            Android: -1 < a.indexOf("Android") || -1 < a.indexOf("Adr"),
            Ubuntu: -1 < a.indexOf("Ubuntu"),
            FreeBSD: -1 < a.indexOf("FreeBSD"),
            Debian: -1 < a.indexOf("Debian"),
            "Windows Phone": -1 < a.indexOf("IEMobile") || -1 < a.indexOf("Windows Phone"),
            BlackBerry: -1 < a.indexOf("BlackBerry") || -1 < a.indexOf("RIM"),
            MeeGo: -1 < a.indexOf("MeeGo"),
            Symbian: -1 < a.indexOf("Symbian"),
            iOS: -1 < a.indexOf("like Mac OS X"),
            "Chrome OS": -1 < a.indexOf("CrOS"),
            WebOS: -1 < a.indexOf("hpwOS"),
            Mobile: -1 < a.indexOf("Mobi") || -1 < a.indexOf("iPh") || -1 < a.indexOf("480"),
            Tablet: -1 < a.indexOf("Tablet") || -1 < a.indexOf("Pad") || -1 < a.indexOf("Nexus 7")
        };
        var c = !1;
        if (g.chrome) {
            var e = a.replace(/^.*Chrome\/([\d]+).*$/, "$1");
            g.chrome.adblock2345 || g.chrome.common2345 ? b["2345Explorer"] = !0 : k("type", "application/360softmgrplugin") || k("type", "application/mozilla-npqihooquicklogin") ? c = !0 : 36 < e && g.showModalDialog ? c = !0 : 45 < e && (c = k("type", "application/vnd.chromium.remoting-viewer"), !c && 69 <= e && (c = k("type", "application/hwepass2001.installepass2001") || k("type", "application/asx")))
        }
        b.Mobile ? b.Mobile = !(-1 < a.indexOf("iPad")) : c && (k("type", "application/gameplugin") ? b["360SE"] = !0 : h && "undefined" !== typeof h.connection && "undefined" == typeof h.connection.saveData ? b["360SE"] = !0 : b["360EE"] = !0);
        if (b.IE || b.Edge) switch (window.screenTop - window.screenY) {
            case 71:
            case 99:
            case 102:
                b["360EE"] = !0;
                break;
            case 75:
            case 105:
            case 104:
                b["360SE"] = !0
        }
        b.Baidu && b.Opera ? b.Baidu = !1 : b.iOS && (b.Safari = !0);
        c = {
            engine: ["WebKit", "Trident", "Gecko", "Presto"],
            browser: "Safari;Chrome;Edge;IE;Firefox;Firefox Focus;Chromium;Opera;Vivaldi;Yandex;Arora;Lunascape;QupZilla;Coc Coc;Kindle;Iceweasel;Konqueror;Iceape;SeaMonkey;Epiphany;XiaoMi;Huawei;360;360SE;360EE;UC;QQBrowser;QQ;Baidu;Maxthon;Sogou;LBBROWSER;2345Explorer;115Browser;TheWorld;Quark;Qiyu;Wechat;Taobao;Alipay;Weibo;Douban;Suning;iQiYi;DingTalk".split(";"),
            os: "Windows;Linux;Mac OS;Android;Ubuntu;FreeBSD;Debian;iOS;Windows Phone;BlackBerry;MeeGo;Symbian;Chrome OS;WebOS".split(";"),
            device: ["Mobile", "Tablet"]
        };
        this.device = "PC";
        this.language = function () {
            var a = (h.browserLanguage || h.language).split("-");
            a[1] && (a[1] = a[1].toUpperCase());
            return a.join("_")
        }();
        for (var f in c)
            for (e = 0; e < c[f].length; e++) {
                var d = c[f][e];
                b[d] && (this[f] = d)
            }
        f = {
            Windows: function () {
                var b = a.replace(/^Mozilla\/\d.0 \(Windows NT ([\d.]+);.*$/, "$1");
                return {
                    10: "10",
                    "6.4": "10",
                    "6.3": "8.1",
                    "6.2": "8",
                    "6.1": "7",
                    "6.0": "Vista",
                    "5.2": "XP",
                    "5.1": "XP",
                    "5.0": "2000"
                } [b] || b
            },
            Android: function () {
                return a.replace(/^.*Android ([\d.]+);.*$/, "$1")
            },
            iOS: function () {
                return a.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, ".")
            },
            Debian: function () {
                return a.replace(/^.*Debian\/([\d.]+).*$/, "$1")
            },
            "Windows Phone": function () {
                return a.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2")
            },
            "Mac OS": function () {
                return a.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, ".")
            },
            WebOS: function () {
                return a.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1")
            }
        };
        this.osVersion = "";
        f[this.os] && (this.osVersion = f[this.os](), this.osVersion == a && (this.osVersion = ""));
        f = {
            Safari: function () {
                return a.replace(/^.*Version\/([\d.]+).*$/, "$1")
            },
            Chrome: function () {
                return a.replace(/^.*Chrome\/([\d.]+).*$/, "$1").replace(/^.*CriOS\/([\d.]+).*$/, "$1")
            },
            IE: function () {
                return a.replace(/^.*MSIE ([\d.]+).*$/, "$1").replace(/^.*rv:([\d.]+).*$/, "$1")
            },
            Edge: function () {
                return a.replace(/^.*Edge\/([\d.]+).*$/, "$1").replace(/^.*Edg\/([\d.]+).*$/, "$1")
            },
            Firefox: function () {
                return a.replace(/^.*Firefox\/([\d.]+).*$/, "$1").replace(/^.*FxiOS\/([\d.]+).*$/, "$1")
            },
            "Firefox Focus": function () {
                return a.replace(/^.*Focus\/([\d.]+).*$/, "$1")
            },
            Chromium: function () {
                return a.replace(/^.*Chromium\/([\d.]+).*$/, "$1")
            },
            Opera: function () {
                return a.replace(/^.*Opera\/([\d.]+).*$/, "$1").replace(/^.*OPR\/([\d.]+).*$/, "$1")
            },
            Vivaldi: function () {
                return a.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1")
            },
            Yandex: function () {
                return a.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1")
            },
            Arora: function () {
                return a.replace(/^.*Arora\/([\d.]+).*$/, "$1")
            },
            Lunascape: function () {
                return a.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, "$1")
            },
            QupZilla: function () {
                return a.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, "$1")
            },
            "Coc Coc": function () {
                return a.replace(/^.*coc_coc_browser\/([\d.]+).*$/, "$1")
            },
            Kindle: function () {
                return a.replace(/^.*Version\/([\d.]+).*$/, "$1")
            },
            Iceweasel: function () {
                return a.replace(/^.*Iceweasel\/([\d.]+).*$/, "$1")
            },
            Konqueror: function () {
                return a.replace(/^.*Konqueror\/([\d.]+).*$/, "$1")
            },
            Iceape: function () {
                return a.replace(/^.*Iceape\/([\d.]+).*$/, "$1")
            },
            SeaMonkey: function () {
                return a.replace(/^.*SeaMonkey\/([\d.]+).*$/, "$1")
            },
            Epiphany: function () {
                return a.replace(/^.*Epiphany\/([\d.]+).*$/, "$1")
            },
            360: function () {
                return a.replace(/^.*QihooBrowser\/([\d.]+).*$/, "$1")
            },
            "360SE": function () {
                return {
                    69: "11.1",
                    63: "10.0",
                    55: "9.1",
                    45: "8.1",
                    42: "8.0",
                    31: "7.0",
                    21: "6.3"
                } [a.replace(/^.*Chrome\/([\d]+).*$/, "$1")] || ""
            },
            "360EE": function () {
                return {
                    78: "12.0",
                    69: "11.0",
                    63: "9.5",
                    55: "9.0",
                    50: "8.7",
                    30: "7.5"
                } [a.replace(/^.*Chrome\/([\d]+).*$/, "$1")] || ""
            },
            Maxthon: function () {
                return a.replace(/^.*Maxthon\/([\d.]+).*$/, "$1")
            },
            QQBrowser: function () {
                return a.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1")
            },
            QQ: function () {
                return a.replace(/^.*QQ\/([\d.]+).*$/, "$1")
            },
            Baidu: function () {
                return a.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, "$1").replace(/^.*baiduboxapp\/([\d.]+).*$/, "$1")
            },
            UC: function () {
                return a.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1")
            },
            Sogou: function () {
                return a.replace(/^.*SE ([\d.X]+).*$/, "$1").replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1")
            },
            LBBROWSER: function () {
                return {
                    57: "6.5",
                    49: "6.0",
                    46: "5.9",
                    42: "5.3",
                    39: "5.2",
                    34: "5.0",
                    29: "4.5",
                    21: "4.0"
                } [navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, "$1")] || ""
            },
            "2345Explorer": function () {
                return {
                    69: "10.0",
                    55: "9.9"
                } [navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, "$1")] || a.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1").replace(/^.*Mb2345Browser\/([\d.]+).*$/, "$1")
            },
            "115Browser": function () {
                return a.replace(/^.*115Browser\/([\d.]+).*$/, "$1")
            },
            TheWorld: function () {
                return a.replace(/^.*TheWorld ([\d.]+).*$/, "$1")
            },
            XiaoMi: function () {
                return a.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1")
            },
            Quark: function () {
                return a.replace(/^.*Quark\/([\d.]+).*$/, "$1")
            },
            Qiyu: function () {
                return a.replace(/^.*Qiyu\/([\d.]+).*$/, "$1")
            },
            Wechat: function () {
                return a.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1")
            },
            Taobao: function () {
                return a.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1")
            },
            Alipay: function () {
                return a.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1")
            },
            Weibo: function () {
                return a.replace(/^.*weibo__([\d.]+).*$/, "$1")
            },
            Douban: function () {
                return a.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1")
            },
            Suning: function () {
                return a.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1")
            },
            iQiYi: function () {
                return a.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1")
            },
            DingTalk: function () {
                return a.replace(/^.*DingTalk\/([\d.]+).*$/, "$1")
            },
            Huawei: function () {
                return a.replace(/^.*Version\/([\d.]+).*$/, "$1").replace(/^.*HuaweiBrowser\/([\d.]+).*$/, "$1")
            }
        };
        this.version = "";
        f[this.browser] && (this.version = f[this.browser](), this.version == a && (this.version = ""));
        "Edge" == this.browser ? this.engine = "75" < this.version ? "Blink" : "EdgeHTML" : b.Chrome && "WebKit" == this.engine && 27 < parseInt(f.Chrome()) ? this.engine = "Blink" : "Opera" == this.browser && 12 < parseInt(this.version) ? this.engine = "Blink" : "Yandex" == this.browser && (this.engine = "Blink")
    }
});