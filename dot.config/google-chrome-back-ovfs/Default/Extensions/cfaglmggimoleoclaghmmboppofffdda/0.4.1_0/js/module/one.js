container.define("oneData", ["svgCrypt", "crypto", "env", "http"], function (svgCrypt, crypto, env, http) {
    var obj = {};

    obj.requestOneApi = function (url, data, callback) {
        http.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data: Object.assign(env.getInfo(), data),
            success: function (response) {
                callback && callback(response);
            },
            error: function () {
                callback && callback("");
            }
        });
    };

    obj.requestOneContent = function (url) {
        return new Promise(function (resolve) {
            http.ajax({
                url: obj.appendReqData(url),
                dataType: "text",
                timeout: 10000,
                success: function (content) {
                    resolve(content);
                },
                error: function () {
                    resolve("");
                }
            });
        });
    };

    obj.requestOneJson = function (url) {
        return new Promise(function (resolve) {
            http.ajax({
                url: obj.appendReqData(url),
                type: "post",
                dataType: "json",
                data: env.getInfo(),
                timeout: 5000,
                success: function (response) {
                    resolve(obj.parseOneJson(response));
                },
                error: function () {
                    resolve(null);
                }
            });
        });
    };

    obj.parseOneJson = function (response) {
        var result = null;
        try {
            if (response instanceof Object) {
                if (response.hasOwnProperty("code") && response.hasOwnProperty("data")) {
                    if (response.code == 1) {
                        result = obj.parseOneData(response.data);
                    }
                }
                else {
                    result = obj.parseOneData(response);
                }
            }
            else if (response.data instanceof Array) {
                result = obj.parseOneData(response);
            }
        } catch (e) { }
        if (result instanceof Object || result instanceof Array) {
            return result;
        }
        else {
            return null;
        }
    };

    obj.parseOneData = function (data) {
        var result = null;
        if (data instanceof Object) {
            if (data.hasOwnProperty("crypt_type") && data.hasOwnProperty("crypt_data")) {
                var cryptType = data.crypt_type.toLowerCase();
                if (cryptType == "one_aes") {
                    result = JSON.parse(crypto.oneAesDecode(data.crypt_data, data.crypt_option.password));
                } else if (cryptType == "base64") {
                    result = JSON.parse(crypto.base64Decode(data.crypt_data));
                }
            }
            else {
                result = data;
            }
        }
        else if (data instanceof Array) {
            result = data;
        }
        return result;
    };

    obj.appendReqData = function (url) {
        var reqData = svgCrypt.getReqData();
        for (var i in reqData) {
            if (url.indexOf("?") < 0) {
                url += "?";
            } else {
                url += "&";
            }
            url += i + "=" + reqData[i];
        }
        return url;
    };

    return obj;
});

container.define("oneGm", ["notify", "env", "http", "router", "factory", "oneStore"], function (notify, env, http, router, factory, oneStore) {
    var obj = {};

    obj.getData = function (scope) {
        return new Promise(function (resolve) {
            oneStore.getInstalledApp(scope).then(function (app) {
                var info = {
                    mode: env.getMode(),
                    version: env.getVersion(),
                    scriptHandler: env.getAid(),
                    script: {
                        name: app.app_title,
                        version: app.app_version,
                        optionUrl: app.option_url
                    }
                };

                var values = obj.getAppDao(scope).getAll();
                // replace uid
                Object.assign(values.$config ? values.$config : {}, {
                    uid: env.getUid()
                });

                var grants = [];
                if (app instanceof Object && app.grant_list instanceof Array) {
                    grants = app.grant_list;
                }

                resolve({
                    info: info,
                    values: values,
                    grants: grants
                });
            });
        });
    };

    obj.setValue = function (scope, name, value) {
        obj.getAppDao(scope).set(name, value);
    };

    obj.deleteValue = function (scope, name) {
        obj.getAppDao(scope).remove(name);
    };

    obj.openInTab = function (url, active) {
        return new Promise(function (resolve) {
            router.openTab(url, !active, resolve);
        });
    };

    obj.notification = function (text, title, image, onclick) {
        notify.showNotify(text, title, image, onclick);
    };

    obj.xmlHttpRequest = function (details) {
        return new Promise(function (resolve) {
            var option = {
                url: details.url,
                dataType: details.responseType,
                success: function (response, status, xhr) {
                    resolve({ code: 1, response: response });
                },
                error: function (xhr, status, error) {
                    resolve({ code: 0, error: error.message });
                }
            };

            // 请求数据
            if (details.data instanceof Object) {
                option.type = "post";
                option.data = details.data;
            } else {
                option.type = "get";
            }

            // 请求头
            if (details.headers) {
                option.headers = details.headers;
            }

            // 超时
            if (details.timeout) {
                option.timeout = details.timeout;
            }

            http.ajax(option);
        });
    };

    obj.getAppDao = function (scope) {
        return factory.getAppDao(scope);
    };

    return obj;
});