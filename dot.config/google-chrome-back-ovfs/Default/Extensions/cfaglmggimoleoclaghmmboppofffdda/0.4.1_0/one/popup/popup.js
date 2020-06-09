
OneUi.use(["site", "addon"], function (site, addon) {

    site.initMenu();

    addon.getInstall(function () {
        return window.OneContainer;
    }, function (OneContainer) {
        OneContainer.use(["runner"], function (runner) {
            runner.runScope("wpzs");
        });

        OneContainer.use(["oneBridge"], function (oneBridge) {
            new Vue({
                el: "#addon-updater",
                data: {
                    updater: {}
                },
                created: function () {
                    this.loadUpdater();
                },
                ready: function () {
                    $(this.$el).addClass("vue-loaded");
                },
                methods: {
                    loadUpdater: function () {
                        var that = this;
                        oneBridge.getUpdater(function (updater) {
                            that.updater = updater;
                        });
                    }
                }
            });
        });
    });

    addon.getInstall(function () {
        return window.OnePan;
    }, function (container) {
        container.use(["config", "option", "router"], function (config, option, router) {
            new Vue({
                mixins: [site.getMixin()],
                data: {
                    install: true,
                    app_id: config.getConfig("app_id"),
                    temp_path: config.getConfig("temp_path"),
                    option: option.getOption()
                },
                watch: {
                    option: function (value) {
                        option.setOption(value);
                    }
                },
                methods: {
                    syncAppId: function () {
                        config.setConfig("app_id", this.app_id);
                    },
                    syncTempPath: function () {
                        config.setConfig("temp_path", this.temp_path);
                    },
                    openTempPage: function () {
                        router.openTab("https://pan.baidu.com/disk/home#/all?vmode=list&path=" + encodeURIComponent(this.temp_path ? this.temp_path : "/onetmp"), true);
                    }
                }
            });
        });
    });

});