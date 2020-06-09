var OneUi = (function () {
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

OneUi.define("menu", [], function () {
    var obj = {};

    obj.getMenuList = function () {
        return [
            {
                menu_id: "one_pan_info",
                menu_title: "概览",
                menu_full_title: "插件概览",
                menu_class: "fa fa-tachometer-alt",
                menu_link: "/one/pan/info.html",
                menu_target: "_self"
            },
            {
                menu_id: "one_pan_option",
                menu_title: "配置",
                menu_full_title: "插件配置",
                menu_class: "fa fa-cog",
                menu_link: "/one/pan/option.html",
                menu_target: "_self"
            },
            {
                menu_id: "one_pan_mine",
                menu_title: "分享",
                menu_full_title: "我的分享",
                menu_class: "fa fa-share-alt",
                menu_link: "/one/pan/mine.html",
                menu_target: "_self"
            },
            {
                menu_id: "one_link_option",
                menu_title: "检查",
                menu_full_title: "链接检查",
                menu_class: "fa fa-link",
                menu_link: "/one/link/option.html",
                menu_target: "_self"
            },
            {
                menu_id: "one_pan_doc",
                menu_title: "帮助",
                menu_full_title: "帮助文档",
                menu_class: "fa fa-question-circle",
                menu_link: "http://go.newday.me/s/pan-doc",
                menu_target: "_blank"
            },
            {
                menu_id: "one_pan_home",
                menu_title: "主页",
                menu_full_title: "插件主页",
                menu_class: "fa fa-home",
                menu_link: "http://go.newday.me/s/pan-home",
                menu_target: "_blank"
            }
        ];
    };

    return obj;
});

OneUi.define("oneApi", [], function () {
    var obj = {};

    obj.getUser = function () {
        return new Promise(function (resolve) {
            $.ajax({
                url: "https://api.newday.me/api/user/info",
                type: "post",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    resolve({
                        code: 0,
                        msg: "缃戠粶杩炴帴閿欒"
                    });
                }
            });
        });
    };

    obj.loginUser = function (userCode) {
        return new Promise(function (resolve) {
            $.ajax({
                url: "https://api.newday.me/api/user/auth",
                type: "post",
                dataType: "json",
                data: {
                    code: userCode
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    resolve({
                        code: 0,
                        msg: "缃戠粶杩炴帴閿欒"
                    });
                }
            });
        });
    };

    obj.modifyUser = function (userNick) {
        return new Promise(function (resolve) {
            $.ajax({
                url: "https://api.newday.me/api/user/modify",
                type: "post",
                dataType: "json",
                data: {
                    user_nick: userNick
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    resolve({
                        code: 0,
                        msg: "缃戠粶杩炴帴閿欒"
                    });
                }
            });
        });
    };

    obj.logoutUser = function () {
        return new Promise(function (resolve) {
            $.ajax({
                url: "https://api.newday.me/api/user/logout",
                type: "post",
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                success: function (response) {
                    resolve(response);
                },
                error: function () {
                    resolve({
                        code: 0,
                        msg: "缃戠粶杩炴帴閿欒"
                    });
                }
            });
        });
    };

    return obj;
});

OneUi.define("user", ["toast", "oneApi"], function (toast, oneApi) {
    var obj = {
        app: null
    };

    obj.initUser = function () {
        obj.app = new Vue({
            el: "#user-manage",
            data: {
                login: false,
                message: "欢迎，游客",
                user: {
                    user_phone: "",
                    user_nick: ""
                }
            },
            created: function () {
                this.initEvent();
                this.loadUser();
            },
            ready: function () {
                $(this.$el).addClass("vue-loaded");
            },
            methods: {
                initEvent: function () {
                    var that = this;
                    $("#user-login-btn").click(function () {
                        oneApi.loginUser($("#user-auth-code").val()).then(function (response) {
                            if (response instanceof Object && response.code === 1) {
                                $("#login-modal").modal("hide");
                                toast.success("登录成功");
                                setTimeout(function () {
                                    location.reload();
                                }, 2000);
                            }
                            else {
                                toast.error(response.msg);
                            }
                        });
                    });
                    $("#user-setting-btn").click(function () {
                        oneApi.modifyUser($("#setting-user-nick").val()).then(function (response) {
                            if (response instanceof Object && response.code === 1) {
                                $("#setting-modal").modal("hide");
                                toast.success("更新成功");
                                that.loadUser();
                            }
                            else {
                                toast.error(response.msg);
                            }
                        });
                    });
                },
                logoutUser: function () {
                    oneApi.logoutUser().then(function (response) {
                        if (response instanceof Object && response.code === 1) {
                            $("#login-modal").modal("hide");
                            toast.success("退出成功");
                            setTimeout(function () {
                                location.reload();
                            }, 2000);
                        }
                        else {
                            toast.error(response.msg);
                        }
                    });
                },
                loadUser: function () {
                    var that = this;
                    oneApi.getUser().then(function (response) {
                        if (response instanceof Object && response.code === 1) {
                            that.login = true;
                            that.user = response.data;

                            that.message = "欢迎，" + that.user.user_nick;

                            $("#setting-user-phone").val(that.user.user_phone);
                            $("#setting-user-nick").val(that.user.user_nick);
                        }
                        else {
                            that.login = false;
                            that.message = "欢迎，游客";
                        }
                    });
                }
            }
        });
    };

    return obj;
});

OneUi.define("site", ["menu"], function (menu) {
    var obj = {
        title: document.title
    };

    obj.getMenuList = function () {
        return menu.getMenuList();
    };

    obj.setMenu = function (menuId) {
        obj.getMenuList().forEach(function (menu) {
            if (menu.menu_id == menuId) {
                obj.setTitle(menu.menu_full_title);
            }
        });

        $("#" + menuId).addClass("active");
    };

    obj.initMenu = function () {
        new Vue({
            el: "#menu-list",
            data: {
                menu_list: obj.getMenuList()
            }
        });
    };

    obj.getMixin = function () {
        return {
            el: "#addon-manage",
            ready: function () {
                $(this.$el).addClass("vue-loaded");
            }
        };
    };

    obj.setTitle = function (title) {
        document.title = title + " - " + obj.title;
    };

    obj.prettyScrollbar = function () {
        if (location.href.indexOf("popup.html") < 0) {
            $element = $(".content-wrapper");
            $element.css("height", $element.css("min-height"));
            $element.overlayScrollbars({
                scrollbars: {
                    autoHide: "leave"
                },
                overflowBehavior: {
                    x: "hidden"
                }
            });
        }
    };

    obj.registerLightbox = function () {
        if ($.fn.ekkoLightbox) {
            $(document).on("click", '[data-toggle="lightbox"]', function (event) {
                event.preventDefault();
                $(this).ekkoLightbox();
            });
        }
    };

    return obj;
});

OneUi.define("toast", [], function () {
    var obj = {};

    obj.error = function (message) {
        toastr.error(message);
    };

    obj.success = function (message) {
        toastr.success(message);
    };

    return obj;
});

OneUi.define("addon", [], function () {
    var obj = {};

    obj.getInstall = function (getFunc, callback) {
        var result = getFunc();
        if (result) {
            callback(result);
        }
        else {
            setTimeout(function () {
                obj.getInstall(getFunc, callback);
            }, 200);
        }
    };

    obj.getInstallBatch = function (getFuncList, callback) {
        var promiseList = [];
        getFuncList.forEach(function (getFunc) {
            promiseList.push(new Promise(function (resolve) {
                obj.getInstall(getFunc, resolve);
            }));
        });
        Promise.all(promiseList).then(function (result) {
            callback.apply(callback, result);
        });
    };

    return obj;
});

OneUi.use(["site", "user"], function (site, user) {

    site.initMenu();

    user.initUser();

    site.prettyScrollbar();

    site.registerLightbox();

});