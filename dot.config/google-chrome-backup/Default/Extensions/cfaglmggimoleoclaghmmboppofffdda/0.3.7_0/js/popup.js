(function () {
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

    container.define("addon", [], function () {
        if (typeof browser == "undefined") {
            return chrome;
        }
        else {
            return browser;
        }
    });

    container.define("message_addon", ["addon"], function (addon) {
        var obj = {
            message_listeners: {}
        };

        obj.onMessage = function (name, listener) {
            obj.message_listeners[name] = listener;
        };

        obj.postMessage = function (name, data, callback) {
            var port = addon.runtime.connect({ name: name });
            callback && port.onMessage.addListener(callback);
            port.postMessage(data);
        };

        obj.handleMessage = function (port) {
            if (obj.message_listeners.hasOwnProperty(port.name)) {
                var connected = true;
                var listener = obj.message_listeners[port.name];
                var callback = function (response) {
                    connected && port.postMessage(response);
                };
                port.onMessage.addListener(function (data) {
                    listener && listener(data, callback);
                });
                port.onDisconnect.addListener(function () {
                    connected = false;
                });
            }
        };

        obj.init = function () {
            addon.runtime.onConnect.addListener(obj.handleMessage);
        };

        return obj.init(), {
            onMessage: obj.onMessage,
            postMessage: obj.postMessage
        };
    });

    container.define("core", [], function () {
        var obj = {};

        obj.ready = function (callback) {
            callback && callback();
        };

        return obj;
    });

    container.define("app", ["message_addon", "vue"], function (addon, vue) {
        var obj = {};

        obj.run = function () {
            new vue({
                el: "#sider-menu",
                data: {
                    menu_current: "",
                    menu_list: siteConfig.menu_list
                },
                created: function () {
                    layui.use(["element", "form"]);
                },
                methods: {
                    openTab: function (url) {
                        addon.postMessage("open_tab", {
                            url: url
                        });
                    }
                }
            });
        };

        return obj;
    });

    container.define("$", [], function () {
        return window.$;
    });
    container.define("vue", [], function () {
        return window.Vue;
    });

    container.use(["core", "app"], function (core, app) {
        core.ready(app.run);
    });

})();