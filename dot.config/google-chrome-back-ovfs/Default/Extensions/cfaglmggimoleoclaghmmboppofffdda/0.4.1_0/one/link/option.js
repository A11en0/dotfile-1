OneUi.use(["site", "addon"], function (site, addon) {

    site.setMenu("one_link_option");

    addon.getInstall(function () {
        return window.OneContainer;
    }, function (OneContainer) {
        OneContainer.use(["runner"], function (runner) {
            runner.runScope("ljjc");
        });

        OneContainer.use(["oneBridge"], function (oneBridge) {

            addon.getInstall(function () {
                return window.OneLink;
            }, function (container) {
                container.use(["env", "config", "option"], function (env, config, option) {
                    new Vue({
                        mixins: [site.getMixin()],
                        data: {
                            install: true,
                            check_switch: 1,
                            info: env.getInfo(),
                            option: option.getOption(),
                            manifest: {},
                            pass_url: config.getConfig("pass_url"),
                            ignore_url: config.getConfig("ignore_url"),
                            check_interval: config.getConfig("check_interval"),
                            check_times: config.getConfig("check_times")
                        },
                        created: function () {
                            this.loadCheckStatus();
                            this.loadManifest();
                        },
                        watch: {
                            option: function (value) {
                                option.setOption(value);
                            }
                        },
                        methods: {
                            syncCheckSwitch: function () {
                                config.setConfig("check_switch", this.check_switch ? "on" : "off");
                            },
                            syncPassUrl: function () {
                                config.setConfig("pass_url", this.pass_url);
                            },
                            syncIgnoreUrl: function () {
                                config.setConfig("ignore_url", this.ignore_url);
                            },
                            syncCheckInterval: function () {
                                config.setConfig("check_interval", this.check_interval);
                            },
                            syncCheckTimes: function () {
                                config.setConfig("check_times", this.check_times);
                            },
                            loadManifest: function () {
                                var that = this;
                                oneBridge.getManifest(function (manifest) {
                                    that.manifest = manifest;
                                });
                            },
                            loadCheckStatus: function () {
                                this.check_switch = config.getConfig("check_switch") === "off" ? 0 : 1;
                            }
                        }
                    });
                });
            });

        });

    });

});