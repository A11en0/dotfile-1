var container = (function () {
    var obj = {
        defines: {},
        modules: {}
    };

    obj.define = function (name, requires, callback) {
        name = obj.processName(name);
        obj.defines[name] = {
            requires: requires,
            callback: callback
        };
    };

    obj.require = function (name, cache) {
        if (typeof cache == "undefined") {
            cache = true;
        }

        name = obj.processName(name);
        if (cache && obj.modules.hasOwnProperty(name)) {
            return obj.modules[name];
        } else if (obj.defines.hasOwnProperty(name)) {
            var requires = obj.defines[name].requires;
            var callback = obj.defines[name].callback;

            var module = obj.use(requires, callback);
            cache && obj.register(name, module);
            return module;
        }
    };

    obj.use = function (requires, callback) {
        var module = {
            exports: undefined
        };
        var params = obj.buildParams(requires, module);
        var result = callback.apply(this, params);
        if (typeof result != "undefined") {
            return result;
        } else {
            return module.exports;
        }
    };

    obj.register = function (name, module) {
        name = obj.processName(name);
        obj.modules[name] = module;
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

    return obj;
})();

container.define("addon", [], function () {
    var addon;

    if (typeof browser == "undefined") {
        addon = chrome;
        addon.isChrome = 1;
    } else {
        addon = browser;
        addon.isChrome = 0;
    }

    if (addon.permissions) {
        addon.isBackground = 1;
    }
    else {
        addon.isBackground = 0;
    }

    return addon;
});

container.define("calendar", [], function () {
    var obj = {};

    obj.getTime = function () {
        return (new Date()).getTime();
    };

    obj.formatTime = function (format, timestamp) {
        format || (format = "Y-m-d H:i:s");
        timestamp || (timestamp = obj.getTime());
        var date = new Date(timestamp);
        var year = 1900 + date.getYear();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var second = "0" + date.getSeconds();
        var vars = {
            "Y": year,
            "m": month.substring(month.length - 2, month.length),
            "d": day.substring(day.length - 2, day.length),
            "H": hour.substring(hour.length - 2, hour.length),
            "i": minute.substring(minute.length - 2, minute.length),
            "s": second.substring(second.length - 2, second.length)
        };
        return obj.replaceVars(vars, format);
    };

    obj.replaceVars = function (vars, value) {
        Object.keys(vars).forEach(function (key) {
            value = value.replace(key, vars[key]);
        });
        return value;
    };

    return obj;
});

container.define("logger", [], function () {
    var obj = {
        level: 3,
        constant: {
            DEBUG: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            NONE: 4
        }
    };

    obj.debug = function (message) {
        obj.log(message, obj.constant.DEBUG);
    };

    obj.info = function (message) {
        obj.log(message, obj.constant.INFO);
    };

    obj.warn = function (message) {
        obj.log(message, obj.constant.WARN);
    };

    obj.error = function (message) {
        obj.log(message, obj.constant.ERROR);
    };

    obj.log = function (message, level) {
        if (level < obj.level) {
            return false;
        }

        console.log(message);
    };

    obj.setLevel = function (level) {
        obj.level = level;
    };

    return obj;
});

container.define("addonMessager", ["addon"], function (addon) {
    var obj = {
        _init: false,
        callbacks: {},
        listeners: {}
    };

    obj.onMessage = function (name, listener) {
        obj.init();

        obj.listeners[name] = listener;
    };

    obj.postMessage = function (name, data, callback) {
        obj.init();

        var messageId = obj.generateUuid();
        obj.callbacks[messageId] = callback;
        obj._postMessage(messageId, name, data);
    };

    obj.postTabMessage = function (tabId, name, data, callback) {
        var messageId = obj.generateUuid();
        obj.callbacks[messageId] = callback;
        obj._postTabMessage(tabId, messageId, name, data);
    };

    obj._postMessage = function (messageId, name, data) {
        addon.runtime.sendMessage({
            id: messageId,
            name: name,
            data: data
        });
    };

    obj._postTabMessage = function (tabId, messageId, name, data) {
        addon.tabs.sendMessage(tabId, {
            id: messageId,
            name: name,
            data: data
        });
    };

    obj.handleMessage = function (message, sender) {
        if (message instanceof Object) {
            if (obj.callbacks.hasOwnProperty(message.id)) {
                var callback = obj.callbacks[message.id];
                callback && callback(message.data);
                delete (obj.callbacks[message.id]);
            }
            else if (obj.listeners.hasOwnProperty(message.name)) {
                var listener = obj.listeners[message.name];
                listener && listener(message.data, sender, function (response) {
                    if (sender.tab) {
                        obj._postTabMessage(sender.tab.id, message.id, null, response);
                    }
                    else {
                        obj._postMessage(message.id, null, response);
                    }
                });
            }
        }
    };

    obj.generateUuid = function () {
        var time = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
            var value = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);
            return (char == "x" ? value : (value & 3 | 8)).toString(16);
        });
    };

    obj.init = function () {
        if (obj._init == false) {
            obj._init = true;
            addon.runtime.onMessage.addListener(obj.handleMessage);
        }
    };

    return obj;
});

container.define("manifest", ["addon"], function (addon) {
    var obj = {
        manifest: addon.runtime.getManifest()
    };

    obj.getItem = function (name) {
        return obj.manifest[name];
    };

    obj.getManifest = function () {
        return obj.manifest;
    };

    obj.getName = function () {
        return obj.getItem("name");
    };

    obj.getAppName = function () {
        return obj.getItem("app_name");
    };

    obj.getUrl = function (name) {
        var urls = obj.getItem("urls");
        (urls instanceof Object) || (urls = {});
        return urls[name];
    };

    obj.getApi = function (name) {
        var apis = obj.getItem("apis");
        (apis instanceof Object) || (apis = {});
        return apis[name];
    };

    obj.getLogo = function () {
        return addon.runtime.getURL("logo/logo_96.png");
    };

    obj.getOptionsPage = function () {
        return obj.getItem("options_page");
    };

    obj.initManifest = function () {
        return new Promise(function (resolve) {
            $.ajax({
                url: "/json/extend.json",
                dataType: "json",
                success: function (result) {
                    Object.assign(obj.manifest, result);
                    resolve();
                },
                error: function () {
                    resolve();
                }
            });
        });
    };

    return obj;
});

container.define("svgCrypt", ["Snap"], function (Snap) {
    var obj = {};

    obj.getReqData = function () {
        var reqTime = Math.round(new Date().getTime() / 1000);
        var reqPoint = obj.getStrPoint("timestamp:" + reqTime);
        return {
            req_time: reqTime,
            req_point: reqPoint
        };
    };

    obj.getStrPoint = function (str) {
        if (str.length < 2) {
            return "0:0";
        }

        var path = "";
        var current, last = str[0].charCodeAt();
        var sum = last;
        for (var i = 1; i < str.length; i++) {
            current = str[i].charCodeAt();
            if (i == 1) {
                path = path + "M";
            } else {
                path = path + " L";
            }
            path = path + current + " " + last;
            last = current;
            sum = sum + current;
        }
        path = path + " Z";
        var index = sum % str.length;
        var data = Snap.path.getPointAtLength(path, str[index].charCodeAt());
        return data.m.x + ":" + data.n.y;
    };

    return obj;
});

container.define("crypto", ["CryptoJS"], function (CryptoJS) {
    var obj = {};

    obj.md5 = function (str) {
        return CryptoJS.MD5(str).toString();
    };

    obj.base64Encode = function (str) {
        var wordArray = CryptoJS.enc.Utf8.parse(str);
        return CryptoJS.enc.Base64.stringify(wordArray);
    };

    obj.base64Decode = function (str) {
        var wordArray = CryptoJS.enc.Base64.parse(str);
        return CryptoJS.enc.Utf8.stringify(wordArray);
    };

    obj.oneAesEncode = function (text, password) {
        var hash = obj.md5(password);
        var key = CryptoJS.enc.Utf8.parse(hash.substring(2, 18));
        var iv = CryptoJS.enc.Utf8.parse(hash.substring(14, 30));

        var srcs = CryptoJS.enc.Utf8.parse(text);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encrypted.ciphertext.toString();
    };

    obj.oneAesDecode = function (text, password) {
        var hash = obj.md5(password);
        var key = CryptoJS.enc.Utf8.parse(hash.substring(2, 18));
        var iv = CryptoJS.enc.Utf8.parse(hash.substring(14, 30));

        var srcs = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(text));
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CFB,
            padding: CryptoJS.pad.ZeroPadding
        });
        return decrypt.toString(CryptoJS.enc.Utf8);
    };

    return obj;
});

container.define("http", ["crypto", "$"], function (crypto, $) {
    var obj = {};

    obj.ajax = function (option) {
        if (option.data instanceof Object && option.data._D_) {
            option.data = obj.decryptData(option.data);
        }
        $.ajax(option);
    };

    obj.decryptData = function (data) {
        var password = obj.getPassword();
        var json = JSON.stringify(data);
        if (json && password) {
            data = {
                _ONE_: crypto.oneAesEncode(json, password)
            };
        }
        return data;
    };

    obj.getPassword = function () {
        return manifest.getItem("http_aes_password");
    };

    return obj;
});