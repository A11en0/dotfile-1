OneUi.use(["site", "addon", "user"], function (site, addon, user) {

    site.setMenu("one_pan_mine");

    user.initUser();

    addon.getInstall(function () {
        return window.OneContainer;
    }, function (OneContainer) {
        OneContainer.use(["runner"], function (runner) {
            runner.runScope("wpzs");
        });
    });

    addon.getInstall(function () {
        return window.OnePan;
    }, function (container) {
        container.use(["shareLog"], function (shareLog) {
            new Vue({
                mixins: [site.getMixin()],
                data: {
                    login: user.app.login,
                    share_mode: shareLog.getShareMode(),
                    share_list: []
                },
                created: function () {
                    this.showShareLogList("all");
                },
                methods: {
                    syncShareMode: function () {
                        shareLog.setShareMode(this.share_mode);
                        this.reloadShareLogList();
                    },
                    removeShareLog: function (shareId) {
                        shareLog.removeShareLog(shareId, this.reloadShareLogList);
                    },
                    reloadShareLogList: function () {
                        this.showShareLogList($(".share-nav-item .active").attr("data-source"));
                    },
                    showShareLogList: function (source) {
                        $(".share-nav-item .active").removeClass("active");
                        $(".share-" + source + " .nav-link").addClass("active");
                        this.loadShareLogList(source);
                    },
                    loadShareLogList: function (shareSource) {
                        var that = this;
                        shareLog.getShareLogList(shareSource, function (shareLogList) {
                            that.share_list = that.processShareLogList(shareLogList, shareSource);
                        });
                    },
                    processShareLogList: function (shareLogList, shareSource) {
                        var filterShareLogList = [];
                        for (var i in shareLogList) {
                            var item = shareLogList[i];
                            if (shareSource === "all" || shareSource === item.share_source) {
                                filterShareLogList.push({
                                    share_id: item.share_id,
                                    share_pwd: item.share_pwd,
                                    share_link: shareLog.buildShareLink(item.share_id, item.share_source, item.share_link),
                                    share_time: shareLog.buildShareTime(item.share_time),
                                    create_time: item.share_time
                                });
                            }
                        }
                        return filterShareLogList.sort(function (a, b) {
                            return b.create_time - a.create_time;
                        });
                    }
                }
            });
        });
    });

});