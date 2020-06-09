OneUi.use(["site", "addon"], function (site, addon) {

    site.setMenu("one_pan_info");

    addon.getInstall(function () {
        return window.OneContainer;
    }, function (OneContainer) {
        OneContainer.use(["runner"], function (runner) {
            runner.runScope("wpzs");
        });

        OneContainer.use(["oneBridge"], function (oneBridge) {
            new Vue({
                mixins: [site.getMixin()],
                data: {
                    info: {},
                    updater: {},
                    manifest: {},
                    text_list: [],
                    image_list: []
                },
                created: function () {
                    this.loadInfo();
                    this.loadUpdater();
                    this.loadManifest();
                },
                methods: {
                    loadInfo: function () {
                        var that = this;
                        oneBridge.getInfo(function (info) {
                            that.info = info;
                        });
                    },
                    loadUpdater: function () {
                        var that = this;
                        oneBridge.getUpdater(function (updater) {
                            that.updater = updater;
                        });
                    },
                    loadManifest: function () {
                        var that = this;
                        oneBridge.getManifest(function (manifest) {
                            that.manifest = manifest;

                            that.loadAddonInfo();
                        });
                    },
                    loadAddonInfo: function () {
                        var that = this;
                        $.ajax({
                            url: that.manifest.apis.info,
                            dataType: "json",
                            success: function (response) {
                                if (response && response.code == 1) {
                                    that.text_list = response.data.text_list;
                                    that.image_list = response.data.image_list;
                                }
                            }
                        });
                    }
                }
            });
        });
    });

});