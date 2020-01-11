// ==UserScript==
// @name         网盘链接检查
// @namespace    http://one.newday.me/
// @version      0.1.2
// @icon         http://pan.newday.me/pan/favicon.ico
// @author       哩呵
// @description  自动识别并标记百度云、蓝奏云和腾讯微云的链接状态。
// @match        *://**/*
// @connect      www.lanzous.com
// @connect      pan.baidu.com
// @connect      share.weiyun.com
// @connect      ypsuperkey.meek.com.cn
// @connect      newday.me
// @require      https://cdn.staticfile.org/jquery/1.12.4/jquery.min.js
// @require      https://cdn.staticfile.org/findAndReplaceDOMText/0.4.6/findAndReplaceDOMText.min.js
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    var injectConfig = {
        name: "ljjc",
        version: "0.1.2"
    };

    var container = (function () {
        var obj = {
            module_defines: {},
            module_objects: {}
        };

        obj.define = function (name, requires, callback) {
            name = obj.processName(name);
            obj.module_defines[name] = {
                requires: requires,
                callback: callback
            };
        };

        obj.require = function (name, cache) {
            if (typeof cache == "undefined") {
                cache = true;
            }

            name = obj.processName(name);
            if (cache && obj.module_objects.hasOwnProperty(name)) {
                return obj.module_objects[name];
            }
            else if (obj.module_defines.hasOwnProperty(name)) {
                var requires = obj.module_defines[name].requires;
                var callback = obj.module_defines[name].callback;

                var module = obj.use(requires, callback);
                cache && obj.register(name, module);
                return module;
            }
        };

        obj.use = function (requires, callback) {
            var module = {
                exports: {}
            };
            var params = obj.buildParams(requires, module);
            var result = callback.apply(this, params);
            if (typeof result != "undefined") {
                return result;
            }
            else {
                return module.exports;
            }
        };

        obj.register = function (name, module) {
            name = obj.processName(name);
            obj.module_objects[name] = module;
        };

        obj.buildParams = function (requires, module) {
            var params = [];
            requires.forEach(function (name) {
                params.push(obj.require(name));
            });
            params.push(obj.require);
            params.push(module.exports);
            params.push(module);
            return params;
        };

        obj.processName = function (name) {
            return name.toLowerCase();
        };

        return {
            define: obj.define,
            use: obj.use,
            register: obj.register,
            modules: obj.module_objects
        };
    })();

    container.define("gm", [], function () {
        var obj = {};

        obj.ready = function (callback) {
            if (typeof GM_getValue != "undefined") {
                callback && callback();
            }
            else {
                setTimeout(function () {
                    obj.ready(callback);
                }, 100);
            }
        };

        return obj;
    });

    container.define("runtime", [], function () {
        var obj = {
            url: location.href,
            referer: document.referrer,
        };

        obj.getUrl = function () {
            return obj.url;
        };

        obj.setUrl = function (url) {
            obj.url = url;
        };

        obj.getReferer = function () {
            return obj.referer;
        };

        obj.setReferer = function (referer) {
            obj.referer = referer;
        };

        obj.getUrlParam = function (name) {
            var param = obj.parseUrlParam(obj.getUrl());
            if (name) {
                return param.hasOwnProperty(name) ? param[name] : null;
            }
            else {
                return param;
            }
        };

        obj.parseUrlParam = function (url) {
            if (url.indexOf("?")) {
                url = url.split("?")[1];
            }
            var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
            var obj = {};
            while (reg.exec(url)) {
                obj[RegExp.$1] = RegExp.$2;
            }
            return obj;
        };

        return obj;
    });

    container.define("storage", [], function () {
        var obj = {};

        obj.getValue = function (name, defaultValue) {
            return GM_getValue(name, defaultValue);
        };

        obj.setValue = function (name, value) {
            GM_setValue(name, value);
        };

        obj.getValueList = function () {
            var nameList = GM_listValues();
            var valueList = {};
            nameList.forEach(function (name) {
                valueList[name] = obj.getValue(name);
            });
            return valueList;
        };

        return obj;
    });

    container.define("addon", ["storage"], function (storage, constant) {
        var obj = {
            name: constant.name + "_status"
        };

        obj.isEnable = function () {
            if (storage.getValue(obj.name) == "off") {
                return false;
            }
            else {
                return true;
            }
        };

        return obj;
    });

    container.define("config", ["storage", "constant"], function (storage, constant) {
        var obj = {
            name: "config_json"
        };

        obj.getConfig = function (name) {
            var configJson = storage.getValue(obj.name);
            var configObject = obj.parseJson(configJson);
            if (name) {
                name = obj.processName(name);
                return configObject.hasOwnProperty(name) ? configObject[name] : null;
            }
            else {
                return configObject;
            }
        };

        obj.setConfig = function (name, value) {
            var configObject = obj.getConfig();
            configObject[obj.processName(name)] = value;
            storage.setValue(obj.name, JSON.stringify(configObject));
        };

        obj.parseJson = function (jsonStr) {
            var jsonObject = {};
            try {
                if (jsonStr) {
                    jsonObject = JSON.parse(jsonStr);
                }
            }
            catch (e) { }
            return jsonObject;
        };

        obj.processName = function (name) {
            return constant.name + "_" + name;
        };

        return obj;
    });

    container.define("mode", [], function () {
        var obj = {
            constant: {
                addon: "addon",
                script: "script"
            }
        };

        obj.getMode = function () {
            if (GM_info.addon) {
                return obj.constant.addon;
            }
            else {
                return obj.constant.script;
            }
        };

        return obj;
    });

    container.define("user", ["storage"], function (storage) {
        var obj = {};

        obj.getUid = function () {
            var uid = storage.getValue("uid");
            if (!uid) {
                uid = obj.randString(32);
                storage.setValue("uid", uid);
            }
            return uid;
        };

        obj.randString = function (length) {
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
            var text = "";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        return obj;
    });

    container.define("browser", [], function () {
        var obj = {
            constant: {
                firefox: "firefox",
                edge: "edge",
                baidu: "baidu",
                liebao: "liebao",
                uc: "uc",
                qq: "qq",
                sogou: "sogou",
                opera: "opera",
                maxthon: "maxthon",
                ie2345: "2345",
                se360: "360",
                chrome: "chrome",
                safari: "safari",
                other: "other"
            }
        };

        obj.getBrowser = function () {
            return obj.matchBrowserType(navigator.userAgent);
        };

        obj.matchBrowserType = function (userAgent) {
            var browser = obj.constant.other;
            userAgent = userAgent.toLowerCase();
            if (userAgent.match(/firefox/) != null) {
                browser = obj.constant.firefox;
            } else if (userAgent.match(/edge/) != null) {
                browser = obj.constant.edge;
            } else if (userAgent.match(/bidubrowser/) != null) {
                browser = obj.constant.baidu;
            } else if (userAgent.match(/lbbrowser/) != null) {
                browser = obj.constant.liebao;
            } else if (userAgent.match(/ubrowser/) != null) {
                browser = obj.constant.uc;
            } else if (userAgent.match(/qqbrowse/) != null) {
                browser = obj.constant.qq;
            } else if (userAgent.match(/metasr/) != null) {
                browser = obj.constant.sogou;
            } else if (userAgent.match(/opr/) != null) {
                browser = obj.constant.opera;
            } else if (userAgent.match(/maxthon/) != null) {
                browser = obj.constant.maxthon;
            } else if (userAgent.match(/2345explorer/) != null) {
                browser = obj.constant.ie2345;
            } else if (userAgent.match(/chrome/) != null) {
                if (obj.existMime("type", "application/vnd.chromium.remoting-viewer")) {
                    browser = obj.constant.se360;
                } else {
                    browser = obj.constant.chrome;
                }
            } else if (userAgent.match(/safari/) != null) {
                browser = obj.constant.safari;
            }
            return browser;
        };

        obj.existMime = function (option, value) {
            if (typeof navigator != "undefined") {
                var mimeTypes = navigator.mimeTypes;
                for (var mt in mimeTypes) {
                    if (mimeTypes[mt][option] == value) {
                        return true;
                    }
                }
            }
            return false;
        };

        return obj;
    });

    container.define("env", ["mode", "user", "browser", "constant"], function (mode, user, browser, constant) {
        var obj = {};

        obj.isAddon = function () {
            if (mode.getMode() == mode.constant.addon) {
                return true;
            }
            else {
                return false;
            }
        };

        obj.isInject = function () {
            if (obj.isAddon() && GM_info.addon.name != constant.name) {
                return true;
            }
            else {
                return false;
            }
        };

        obj.getMode = function () {
            return mode.getMode();
        };

        obj.getAid = function () {
            if (GM_info.addon && GM_info.addon.id) {
                return GM_info.addon.id;
            }
            else if (GM_info.scriptHandler) {
                return GM_info.scriptHandler.toLowerCase();
            }
            else {
                return "unknown";
            }
        };

        obj.getUid = function () {
            return user.getUid();
        };

        obj.getVersion = function () {
            if (obj.isInject()) {
                return injectConfig.version;
            }
            else {
                return GM_info.script.version;
            }
        };

        obj.getBrowser = function () {
            return browser.getBrowser();
        };

        obj.getInfo = function () {
            return {
                mode: obj.getMode(),
                aid: obj.getAid(),
                uid: obj.getUid(),
                version: obj.getVersion(),
                browser: obj.getBrowser()
            };
        };

        return obj;
    });

    container.define("http", [], function () {
        var obj = {};

        obj.ajax = function (option) {
            var details = {
                method: option.type,
                url: option.url,
                responseType: option.dataType,
                onload: function (result) {
                    option.success && option.success(result.response);
                },
                onerror: function (result) {
                    option.error && option.error(result.error);
                }
            };

            // 提交数据
            if (option.data) {
                if (option.data instanceof FormData) {
                    details.data = option.data;
                }
                else {
                    var formData = new FormData();
                    for (var i in option.data) {
                        formData.append(i, option.data[i]);
                    }
                    details.data = formData;
                }
            }

            // 自定义头
            if (option.headers) {
                details.headers = option.headers;
            }

            // 超时
            if (option.timeout) {
                details.timeout = option.timeout;
            }

            GM_xmlhttpRequest(details);
        };

        return obj;
    });

    container.define("router", [], function () {
        var obj = {};

        obj.goUrl = function (url) {
            obj.runCode('location.href = "' + url + '";');
        };

        obj.openUrl = function (url) {
            obj.runCode('window.open("' + url + '");');
        };

        obj.openTab = function (url, active) {
            GM_openInTab(url, !active);
        };

        obj.runCode = function (script) {
            var node = document.createElementNS(document.lookupNamespaceURI(null) || "http://www.w3.org/1999/xhtml", "script");
            node.textContent = script;
            (document.head || document.body || document.documentElement || document).appendChild(node);
            node.parentNode.removeChild(node)
        };

        return obj;
    });

    container.define("logger", ["env", "constant"], function (env, constant) {
        var obj = {
            level: 3,
            constant: {
                debug: 0,
                info: 1,
                warn: 2,
                error: 3
            }
        };

        obj.debug = function (message) {
            obj.log(message, obj.constant.debug);
        };

        obj.info = function (message) {
            obj.log(message, obj.constant.info);
        };

        obj.warn = function (message) {
            obj.log(message, obj.constant.warn);
        };

        obj.error = function (message) {
            obj.log(message, obj.constant.error);
        };

        obj.log = function (message, level) {
            if (level < obj.level) {
                return false;
            }

            console.group("[" + constant.name + "]" + env.getMode());
            console.log(message);
            console.groupEnd();
        };

        obj.setLevel = function (level) {
            obj.level = level;
        };

        return obj;
    });

    container.define("meta", ["constant", "$"], function (constant, $) {
        var obj = {};

        obj.existMeta = function (name) {
            name = obj.processName(name);
            if ($("meta[name='" + name + "']").length) {
                return true;
            }
            else {
                return false;
            }
        };

        obj.appendMeta = function (name, content) {
            name = obj.processName(name);
            content || (content = "on");
            $('<meta name="' + name + '" content="on">').appendTo($("head"));
        };

        obj.processName = function (name) {
            return constant.name + "::" + name;
        };

        return obj;
    });

    container.define("unsafe_window", [], function () {
        if (typeof unsafeWindow == "undefined") {
            return window;
        }
        else {
            return unsafeWindow;
        }
    });

    /** custom start **/
    container.define("constant", ["mode", "browser"], function (mode, browser) {
        return {
            name: injectConfig.name,
            mode: mode.constant,
            browser: browser.constant,
            source: {
                baidu: "baidu",
                weiyun: "weiyun",
                lanzous: "lanzous"
            }
        };
    });

    container.define("resource", [], function () {
        var obj = {};

        obj.getErrorIcon = function () {
            return "data:image/png;base64,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";
        };

        obj.getSuccessIcon = function () {
            return "data:image/png;base64,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";
        };

        obj.getLockIcon = function () {
            return "data:image/png;base64,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";
        };

        obj.getOtherIcon = function () {
            return "data:image/png;base64,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";
        }

        obj.getStyleText = function () {
            return ".one-pan-tip { cursor: pointer;}" +
                ".one-pan-tip::before {background-position: center;background-size: 100% 100%;background-repeat: no-repeat;box-sizing: border-box;width: 1em;height: 1em;margin: 0 1px .15em 1px;vertical-align: middle;display: inline-block;}" +
                ".one-pan-tip-success::before {content: '';background-image: url(" + obj.getSuccessIcon() + ")}" +
                ".one-pan-tip-error {text-decoration: line-through;}" +
                ".one-pan-tip-error::before {content: '';background-image: url(" + obj.getErrorIcon() + ")}" +
                ".one-pan-tip-other::before {content: '';background-image: url(" + obj.getOtherIcon() + ")}" +
                ".one-pan-tip-lock::before{content: '';background-image: url(" + obj.getLockIcon() + ")}";
        };

        return obj;
    });

    container.define("api", ["http", "env", "constant"], function (http, env, constant) {
        var obj = {};

        obj.checkLinkBatch = function (uuidList, callback) {
            if (uuidList.length) {
                http.ajax({
                    type: "post",
                    url: "https://ypsuperkey.meek.com.cn/api/v1/item/check-data",
                    dataType: "json",
                    data: {
                        uuids: uuidList.join(","),
                        client_version: "2019.2"
                    },
                    success: function (response) {
                        if (!response || response.message) {
                            response = {};
                        }
                        callback && callback(response);
                    },
                    error: function (error) {
                        callback && callback({});
                    }
                });
            }
            else {
                callback && callback({});
            }
        };

        obj.checkLink = function (shareSource, shareId, callback) {
            if (shareSource == constant.source.baidu) {
                obj.checkLinkBaidu(shareId, callback);
            }
            else if (shareSource == constant.source.lanzous) {
                obj.checkLinkLanzous(shareId, callback);
            }
            else if (shareSource == constant.source.weiyun) {
                obj.checkLinkWeiyun(shareId, callback);
            }
        };

        obj.checkLinkBaidu = function (shareId, callback) {
            var url;
            if (shareId.indexOf("http") < 0) {
                url = "https://pan.baidu.com/s/1" + shareId;
            }
            else {
                url = shareId;
            }
            http.ajax({
                type: "get",
                url: url,
                success: function (response) {
                    var state = 1;
                    if (response.indexOf("输入提取码") > 0) {
                        state = 2;
                    }
                    else if (response.indexOf("可能的原因") > 0 || response.indexOf("分享的文件已经被取消了") > 0 || response.indexOf("分享内容可能因为涉及侵权") > 0) {
                        state = -1;
                    }
                    callback && callback({
                        state: state
                    });
                },
                error: function (error) {
                    callback && callback({
                        state: 0
                    });
                }
            });
        };

        obj.checkLinkLanzous = function (shareId, callback) {
            var url;
            if (shareId.indexOf("http") < 0) {
                url = "https://www.lanzous.com/" + shareId;
            }
            else {
                url = shareId;
            }
            http.ajax({
                type: "get",
                url: url,
                success: function (response) {
                    var state = 1;
                    if (response.indexOf("输入密码") > 0) {
                        state = 2;
                    }
                    else if (response.indexOf("来晚啦") > 0) {
                        state = -1;
                    }
                    callback && callback({
                        state: state
                    });
                },
                error: function (error) {
                    callback && callback({
                        state: 0
                    });
                }
            });
        };

        obj.checkLinkWeiyun = function (shareId, callback) {
            var url;
            if (shareId.indexOf("http") < 0) {
                url = "https://share.weiyun.com/" + shareId;
            }
            else {
                url = shareId;
            }
            http.ajax({
                type: "get",
                url: url,
                success: function (response) {
                    var state = 1;
                    if (response.indexOf("链接已删除") > 0) {
                        state = -1;
                    }
                    else if (response.indexOf('"share_key":null') > 0) {
                        state = 2;
                    }
                    callback && callback({
                        state: state
                    });
                },
                error: function (error) {
                    callback && callback({
                        state: 0
                    });
                }
            });
        };

        return obj;
    });

    container.define("core", ["resource", "$"], function (resource, $) {
        var obj = {};

        obj.appendStyle = function () {
            var styleText = resource.getStyleText();
            $("<style></style>").text(styleText).appendTo($("head"));
        };

        obj.ready = function (callback) {
            obj.appendStyle();
            callback && callback();
        };

        return obj;
    });

    container.define("app_check_url", ["runtime", "constant", "config", "api", "$"], function (runtime, constant, config, api, $) {
        var obj = {
            baidu_reg: /(?:https?:\/\/)?pan\.baidu\.com\/s\/([\w\-]{4,25})\b/gi,
            lanzous_reg: /(?:https?:\/\/)?www\.lanzous\.com\/([a-zA-Z0-9_\-]{5,22})\b/gi,
            weiyun_reg: /(?:https?:\/\/)?share\.weiyun\.com\/([a-zA-Z0-9_\-]{5,22})\b/gi
        };

        obj.run = function () {
            obj.isEnable() && obj.runMatch();
            return false;
        };

        obj.isEnable = function () {
            if (typeof findAndReplaceDOMText == "undefined") {
                return false;
            }

            if (config.getConfig("check_switch") == "off") {
                return false;
            }

            var nowUrl = runtime.getUrl();
            var ignoreUrl = config.getConfig("ignore_url");
            var rowList = ignoreUrl ? ignoreUrl.split("\n") : [];
            for (var i in rowList) {
                if (nowUrl.indexOf(rowList[i]) >= 0) {
                    return false;
                }
            }

            return true;
        };

        obj.runMatch = function () {
            var uuidList = [];

            findAndReplaceDOMText(document.body, {
                find: /([ ])(\/?s\/1[a-zA-Z0-9_\-]{5,22})/gi,
                replace: function (portion, match) {
                    if (match[2].indexOf("/") == 0) {
                        return " https://pan.baidu.com" + match[2];
                    }
                    else {
                        return " https://pan.baidu.com/" + match[2];
                    }
                }
            });

            findAndReplaceDOMText(document.body, {
                find: obj.baidu_reg,
                replace: function (portion, match) {
                    var shareId = match[1].slice(1);
                    var uuid = "BDY-" + shareId;
                    if (uuidList.indexOf(uuid) < 0) {
                        uuidList.push(uuid);
                    }

                    var node = obj.createOnePanNode(shareId, constant.source.baidu, uuid);
                    node.textContent = "https://pan.baidu.com/s/1" + shareId;
                    return node;
                }
            });

            findAndReplaceDOMText(document.body, {
                find: obj.lanzous_reg,
                replace: function (portion, match) {
                    var shareId = match[1];
                    var uuid = "LZY-" + shareId;
                    if (uuidList.indexOf(uuid) < 0) {
                        uuidList.push(uuid);
                    }

                    var node = obj.createOnePanNode(shareId, constant.source.lanzous, uuid);
                    node.textContent = "https://www.lanzous.com/" + shareId;
                    return node;
                }
            });

            findAndReplaceDOMText(document.body, {
                find: obj.weiyun_reg,
                replace: function (portion, match) {
                    var shareId = match[1];
                    var uuid = "WY-" + shareId;

                    var node = obj.createOnePanNode(shareId, constant.source.lanzous, uuid);
                    node.textContent = "https://www.lanzous.com/" + shareId;
                    return node;
                }
            });

            $("a").each(function (index, element) {
                var match, oneId, oneSource, oneUuid;
                var href = element.href;
                if (href && (match = /(?:https?:\/\/)?pan\.baidu\.com\/s\/([\w\-]{4,25})/gi.exec(href))) {
                    oneId = match[1].slice(1);
                    oneUuid = "BDY-" + oneId;
                    oneSource = constant.source.baidu;
                }
                else if (href && (match = /(?:https?:\/\/)?www\.lanzous\.com\/([a-zA-Z0-9_\-]{5,22})/gi.exec(href))) {
                    oneId = match[1];
                    oneUuid = "LZY-" + oneId;
                    oneSource = constant.source.lanzous;
                }
                else if (href && (match = /(?:https?:\/\/)?share\.weiyun\.com\/([a-zA-Z0-9_\-]{5,22})/gi.exec(href))) {
                    oneId = match[1];
                    oneUuid = "";
                    oneSource = constant.source.weiyun;
                }

                if (match && $(element).find(".one-pan-tip").length == 0) {
                    if (oneUuid && uuidList.indexOf(oneUuid) < 0) {
                        uuidList.push(oneUuid);
                    }

                    var node = obj.createOnePanNode(oneId, oneSource, oneUuid);
                    $(element).wrapInner(node);
                }
            });

            api.checkLinkBatch(uuidList, function (response) {
                $(".one-pan-tip").each(function () {
                    var $this = $(this);
                    var parentNode = this.parentNode;
                    if (parentNode.nodeName != "A") {
                        $this.wrap('<a href="' + this.textContent + '" target="_blank"></a>');
                    }

                    var uuid = $this.attr("one-uuid"), item;
                    if (uuid && response.hasOwnProperty(uuid) && (item = response[uuid])) {
                        if (item.access_code) {
                            $this.addClass("one-pan-tip-lock");
                            return;
                        }
                        else if (item.state == "VALID") {
                            $this.addClass("one-pan-tip-success");
                            return;
                        }
                        else if (item.state == "INVALID") {
                            $this.addClass("one-pan-tip-error");
                            return;
                        }
                        else {
                            $this.addClass("one-pan-tip-other");
                            return;
                        }
                    }

                    var shareSource = $this.attr("one-source");
                    var shareId = $this.attr("one-id");
                    api.checkLink(shareSource, shareId, function (response) {
                        if (response.state == 2) {
                            $this.addClass("one-pan-tip-lock");
                        }
                        else if (response.state == 1) {
                            $this.addClass("one-pan-tip-success");
                        }
                        else if (response.state == -1) {
                            $this.addClass("one-pan-tip-error");
                        }
                        else {
                            $this.addClass("one-pan-tip-other");
                        }
                    });
                });
            });
        };

        obj.createOnePanNode = function (oneId, oneSource, oneUuid) {
            var node = document.createElementNS(document.lookupNamespaceURI(null) || "http://www.w3.org/1999/xhtml", "span");
            node.setAttribute("class", "one-pan-tip");
            node.setAttribute("one-id", oneId);
            node.setAttribute("one-source", oneSource);
            node.setAttribute("one-uuid", oneUuid);
            return node;
        };

        return obj;
    });

    container.define("app_newday", ["config", "env", "meta", "vue", "$"], function (config, env, meta, vue, $) {
        var obj = {};

        obj.run = function () {
            if (meta.existMeta("option")) {
                obj.initOptionPage();
                return true;
            }
            else {
                return false;
            }
        };

        obj.initOptionPage = function () {
            new vue({
                el: "#container",
                data: {
                    info: env.getInfo(),
                    check_switch: config.getConfig("check_switch") == "off" ? false : true,
                    ignore_url: config.getConfig("ignore_url")
                },
                created: function () {
                    obj.initAddonReady();
                },
                watch: {
                    check_switch: function (value) {
                        config.setConfig("check_switch", value ? "on" : "off");
                    },
                    ignore_url: function (value) {
                        config.setConfig("ignore_url", value);
                    }
                }
            });
        };

        obj.initAddonReady = function () {
            $("body").addClass("nd-addon-ready");
        };

        return obj;
    });

    container.define("app", ["runtime", "addon", "logger", "meta", "$"], function (runtime, addon, logger, meta, $, require) {
        var obj = {};

        obj.run = function () {
            var metaName = "status";
            if (meta.existMeta(metaName)) {
                logger.warn("setup already");
            }
            else if (addon.isEnable()) {
                logger.info("setup success");

                // 添加meta
                meta.appendMeta(metaName);

                // 运行应用
                $(obj.runApp);
            }
            else {
                logger.warn("addon disabled");
            }
        };

        obj.getAppList = function () {
            return [
                {
                    name: "app_check_url",
                    matchs: [
                        "*"
                    ]
                },
                {
                    name: "app_newday",
                    matchs: [
                        "*"
                    ]
                }
            ];
        };

        obj.runApp = function () {
            var url = runtime.getUrl();
            logger.info(url);

            var appList = obj.getAppList();
            for (var i in appList) {
                var app = appList[i];
                logger.debug(app);

                var match = obj.matchApp(url, app);
                logger.debug("match " + (match ? "yes" : "no"));

                if (match == false) {
                    continue;
                }

                logger.info("run " + app.name);
                if (require(app.name).run() == true) {
                    break;
                }
            }
        };

        obj.matchApp = function (url, app) {
            var match = false;
            app.matchs.forEach(function (item) {
                if (url.indexOf(item) > 0 || item == "*") {
                    match = true;
                }
            });
            return match;
        };

        return obj;
    });

    // lib
    container.define("$", [], function () {
        return window.$;
    });
    container.define("vue", [], function () {
        return window.Vue;
    });

    container.use(["gm", "core", "app", "logger"], function (gm, core, app, logger) {
        gm.ready(function () {
            // 日志级别
            logger.setLevel(logger.constant.info);

            core.ready(app.run);
        });
    });
})();