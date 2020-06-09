container.define("factory", ["addonDao", "cacheDao", "ScopeDao", "Resource"], function (addonDao, cacheDao, ScopeDao, Resource) {
    var obj = {
        daos: {},
        resources: {}
    };

    /** addon **/

    obj.getConfigDao = function () {
        return obj.getDao("config", function () {
            return ScopeDao(addonDao, "$config");
        });
    };

    obj.getStorageDao = function () {
        return obj.getDao("storage", function () {
            return ScopeDao(addonDao, "$storage");
        });
    };

    /** store **/

    obj.getStoreDao = function () {
        return obj.getDao("store", function () {
            return ScopeDao(addonDao, "$store");
        });
    };

    obj.getStoreAppsDao = function () {
        return obj.getDao("store:apps", function () {
            return ScopeDao(cacheDao, "apps");
        });
    };

    obj.getStoreSettingsDao = function () {
        return obj.getDao("store:settings", function () {
            return ScopeDao(obj.getStoreDao(), "settings");
        });
    };

    /** store app **/

    obj.getAppDao = function (name) {
        return obj.getDao("store:app:" + name, function () {
            return ScopeDao(obj.getStoreSettingsDao(), name);
        });
    };

    obj.getAppResource = function (name) {
        return obj.getResource("resource:" + name, function () {
            return Resource(obj.getResourceDao(name), "resource:" + name);
        });
    };

    /** dao **/

    obj.getCacheDao = function () {
        return obj.getDao("cache", function () {
            return ScopeDao(cacheDao, "cache");
        });
    };

    obj.getResourceDao = function (name) {
        return obj.getDao("resource:" + name, function () {
            return ScopeDao(cacheDao, "resource:" + name);
        });
    };

    obj.getDao = function (key, createFunc) {
        if (!obj.daos.hasOwnProperty(key)) {
            obj.daos[key] = createFunc();
        }
        return obj.daos[key];
    };

    /** resource **/

    obj.getCacheResource = function () {
        return obj.getResource("resource", function () {
            return Resource(obj.getCacheDao(), "resource");
        });
    };

    obj.getResource = function (key, createFunc) {
        if (!obj.resources.hasOwnProperty(key)) {
            obj.resources[key] = createFunc();
        }
        return obj.resources[key];
    };

    return obj;
});

container.define("bridge", ["addonMessager", "manifest", "env", "config", "storage", "runtime", "oneGm", "oneStore"], function (addonMessager, manifest, env, config, storage, runtime, oneGm, oneStore) {
    var obj = {};

    obj.onMessage = function (name, callback) {
        addonMessager.onMessage(name, callback);
    };

    obj.initOne = function () {
        obj.onMessage("one_get_info", function (data, sender, callback) {
            callback(env.getInfo());
        });
        obj.onMessage("one_get_config", function (data, sender, callback) {
            callback(config.getConfig(data.name));
        });
        obj.onMessage("one_set_config", function (data, sender, callback) {
            config.setConfig(data.name, data.value);
            callback();
        });
        obj.onMessage("one_get_value", function (data, sender, callback) {
            callback(storage.getValue(data.name));
        });
        obj.onMessage("one_set_value", function (data, sender, callback) {
            storage.setValue(data.name, data.value);
            callback();
        });
        obj.onMessage("one_get_updater", function (data, sender, callback) {
            callback(runtime.getUpdater());
        });
        obj.onMessage("one_get_updater", function (data, sender, callback) {
            callback(runtime.getUpdater());
        });
        obj.onMessage("one_get_manifest", function (data, sender, callback) {
            callback(manifest.getManifest());
        });
    };

    obj.initGm = function () {
        obj.onMessage("gm_get_data", function (data, sender, callback) {
            oneGm.getData(data.scope).then(callback);
        });
        obj.onMessage("gm_set_value", function (data, sender, callback) {
            oneGm.setValue(data.scope, data.name, data.value);
            callback();
        });
        obj.onMessage("gm_delete_value", function (data, sender, callback) {
            oneGm.deleteValue(data.scope, data.name);
            callback();
        });
        obj.onMessage("gm_open_in_tab", function (data, sender, callback) {
            oneGm.openInTab(data.url, data.active).then(callback);
        });
        obj.onMessage("gm_notification", function (data, sender, callback) {
            oneGm.notification(data.text, data.title, data.image, callback);
        });
        obj.onMessage("gm_xmlhttp_request", function (data, sender, callback) {
            oneGm.xmlHttpRequest(data).then(callback);
        });
    };

    obj.initStore = function () {
        obj.onMessage("store_run_installed_applist", function (data, sender, callback) {
            oneStore.runInstalledAppList(data.url, data.event, sender).then(callback);
        });
    };

    obj.initBridge = function () {
        return new Promise(function (resolve) {
            obj.initOne();
            obj.initGm();
            obj.initStore();
            resolve();
        });
    };

    return obj;
});

container.define("core", ["manifest", "addonDao"], function (manifest, addonDao) {
    var obj = {};

    obj.ready = function (callback) {
        var promiseList = [
            manifest.initManifest(),
            addonDao.initDao()
        ];
        Promise.all(promiseList).then(callback);
    };

    return obj;
});

container.define("app", ["bridge", "oneStore", "runtime"], function (bridge, oneStore, runtime) {
    var obj = {};

    obj.run = function () {
        oneStore.initStore().then(function () {
            bridge.initBridge();

            runtime.initRuntime();
        });
    };

    return obj;
});

// lib
container.define("$", [], function () {
    return window.$;
});
container.define("Snap", [], function () {
    if (typeof Snap != "undefined") {
        return Snap;
    } else {
        return window.Snap;
    }
});
container.define("CryptoJS", [], function () {
    return CryptoJS;
});

/** run **/
container.use(["core", "app"], function (core, app) {
    core.ready(app.run);
});