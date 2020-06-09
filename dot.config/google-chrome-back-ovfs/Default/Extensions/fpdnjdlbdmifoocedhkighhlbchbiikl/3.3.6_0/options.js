function loadOptions() {
    document.title = i18n.getMessage("options"), setLinks("filter-must-follow-syntax", "http://www.adtchrome.com/extension/filtersyntax.html"), setLinks("rule-subscription-advice", "http://www.adtchrome.com/help/index.html#help2-6"), window.addEventListener("unload", unloadOptions, !1), $("#updateFilterLists").click(updateFilterLists), $("#startSubscriptionSelection").click(startSubscriptionSelection), $("#subscriptionSelector").change(updateSubscriptionSelection), $("#addSubscription").click(addSubscription), $("#whitelistForm").submit(addWhitelistDomain), $("#removeWhitelist").click(removeSelectedExcludedDomain), $("#customFilterForm").submit(addTypedFilter), $("#removeCustomFilter").click(removeSelectedFilters), $("#rawFiltersButton").click(toggleFiltersInRawFormat), $("#importRawFilters").click(importRawFiltersText), $("#startScriptSelection").click(startScriptSelection), $("#scriptSelector").change(updateScriptSelection), $("#addScript").click(addScript), $("#updateCsxript").click(updateCsxript), FilterNotifier.addListener(onFilterChange), initCheckbox("shouldShowIcon", !0), initCheckbox("shouldShowBlockElementMenu", !0), initCheckbox("tfl", !1), initCheckbox("hidePlaceholders", !0), initCheckbox("debug", !1), initCheckbox("notificationRules", !1), $("#reloadextension").click(function () {
        chrome.runtime.reload()
    }), loadRecommendations(), loadRecommendationScript(), reloadFilters()
}

function reloadFilters() {
    for (var e = document.getElementById("filterLists"); e.lastChild;) e.removeChild(e.lastChild);
    for (var t = 0; t < FilterStorage.subscriptions.length; t++) {
        var i = FilterStorage.subscriptions[t];
        i instanceof SpecialSubscription || addSubscriptionEntry(i)
    }
    for (var n = Cscript.cscripts.list, t = 0; t < n.length; t++) {
        var o = i18n_timeDateStrings(n[t].lastCheck),
            r = o[1] ? "last_updated_at" : "last_updated_at_today",
            s = i18n.getMessage(r, o);
        void 0 == n[t].enabled && (n[t].enabled = !0), addCscript(n[t].title, n[t].link, n[t].homepage, s, n[t].enabled)
    }
    $(document).on("click", ".rscript", function () {
        Cscript.remove($(this).next().next().attr("title"))
    }), $(document).on("click", ".cscriptEnabled", function () {
        Cscript.enable($(this).parent().next().attr("title"), $(this).is(":checked"))
    }), showUserFilters()
}

function unloadOptions() {
    FilterNotifier.removeListener(onFilterChange)
}

function initCheckbox(e, t) {
    var i = document.getElementById(e);
    "undefined" == typeof localStorage[e] && (localStorage[e] = t), i.checked = "true" == localStorage[e], i.addEventListener("click", function () {
        localStorage[e] = i.checked
    }, !1)
}

function initCheckbox2(e, t) {
    var i = document.getElementById(e);
    i.checked = "true" == localStorage[e] || void 0 != localStorage.am && "0" != localStorage.am, i.addEventListener("click", function () {
        localStorage[e] = i.checked
    }, !1)
}

function showUserFilters() {
    for (var e = [], t = [], i = 0; i < FilterStorage.subscriptions.length; i++) {
        var n = FilterStorage.subscriptions[i];
        if (n instanceof SpecialSubscription)
            for (var o = 0; o < n.filters.length; o++) {
                var r = n.filters[o];
                r instanceof WhitelistFilter && /^@@\|\|([^\/:]+)\^\$document$/.test(r.text) ? t.push(RegExp.$1) : e.push(r.text)
            }
    }
    populateList("userFiltersBox", e), populateList("excludedDomainsBox", t)
}

function loadRecommendations() {
    var e = new XMLHttpRequest;
    e.open("GET", "http://sub.adtchrome.com/filtersub.xml"), e.onload = function () {
        for (var t = 0, i = document.getElementById("subscriptionSelector"), n = e.responseXML.documentElement.getElementsByTagName("subscription"), o = 0; o < n.length; o++) {
            var r = n[o],
                s = new Option;
            s.text = r.getAttribute("title") + " (" + r.getAttribute("specialization") + ")", s._data = {
                title: r.getAttribute("title"),
                url: r.getAttribute("url"),
                homepage: r.getAttribute("homepage")
            }, i.appendChild(s)
        }
        var s = new Option;
        s.text = i18n.getMessage("filters_addSubscriptionOther_label") + "…", s._data = null, i.appendChild(s), i.selectedIndex = t, delayedSubscriptionSelection && startSubscriptionSelection.apply(null, delayedSubscriptionSelection)
    }, e.send(null)
}

function loadRecommendationScript() {
    var e = new XMLHttpRequest;
    e.open("GET", "http://sub.adtchrome.com/subscriptions.xml"), e.onload = function () {
        for (var t = 0, i = document.getElementById("scriptSelector"), n = e.responseXML.documentElement.getElementsByTagName("script"), o = 0; o < n.length; o++) {
            var r = n[o],
                s = new Option;
            s.text = r.getAttribute("title"), s._data = {
                title: r.getAttribute("title"),
                url: r.getAttribute("url")
            }, i.appendChild(s)
        }
        var s = new Option;
        s.text = i18n.getMessage("filters_addSubscriptionOther_label") + "…", s._data = null, i.appendChild(s), i.selectedIndex = t, delayedSubscriptionSelection && startSubscriptionSelection.apply(null, delayedSubscriptionSelection)
    }, e.send(null)
}

function startSubscriptionSelection(e, t) {
    var i = document.getElementById("subscriptionSelector");
    return 0 == i.length ? void(delayedSubscriptionSelection = [e, t]) : ($("#addSubscriptionContainer").show(), $("#addSubscriptionButton").hide(), $("#subscriptionSelector").focus(), "undefined" != typeof t && (i.selectedIndex = i.length - 1, document.getElementById("customSubscriptionTitle").value = e, document.getElementById("customSubscriptionLocation").value = t), updateSubscriptionSelection(), void document.getElementById("addSubscriptionContainer").scrollIntoView(!0))
}

function startScriptSelection() {
    $("#addScriptContainer").show(), $("#addScriptButton").hide(), $("#subscriptSelector").focus()
}

function updateSubscriptionSelection() {
    var e = document.getElementById("subscriptionSelector"),
        t = e.options[e.selectedIndex]._data;
    t ? $("#customSubscriptionContainer").hide() : ($("#customSubscriptionContainer").show(), $("#customSubscriptionTitle").focus())
}

function updateScriptSelection() {
    var e = document.getElementById("scriptSelector"),
        t = e.options[e.selectedIndex]._data;
    t ? $("#customScriptContainer").hide() : ($("#customScriptContainer").show(), $("#customScriptTitle").focus())
}

function addSubscription() {
    var e = document.getElementById("subscriptionSelector"),
        t = e.options[e.selectedIndex]._data;
    if (t) doAddSubscription(t.url, t.title, t.homepage);
    else {
        var i = document.getElementById("customSubscriptionLocation").value.replace(/^\s+/, "").replace(/\s+$/, "");
        if (!/^https?:/i.test(i)) return alert(i18n.getMessage("global_subscription_invalid_location")), void $("#customSubscriptionLocation").focus();
        var n = document.getElementById("customSubscriptionTitle").value.replace(/^\s+/, "").replace(/\s+$/, "");
        n || (n = i), doAddSubscription(i, n, null)
    }
    $("#addSubscriptionContainer").hide(), $("#customSubscriptionContainer").hide(), $("#addSubscriptionButton").show()
}

function updateCsxript() {
    Cscript.execute()
}

function addScript() {
    var e = document.getElementById("scriptSelector"),
        t = e.options[e.selectedIndex]._data;
    if (t) doAddScript(t.url, t.title);
    else {
        var i = document.getElementById("customScriptLocation").value.replace(/^\s+/, "").replace(/\s+$/, "");
        if (!/^https?:/i.test(i)) return alert(i18n.getMessage("global_subscription_invalid_location")), void $("#customScriptLocation").focus();
        var n = document.getElementById("customScriptTitle").value.replace(/^\s+/, "").replace(/\s+$/, "");
        n || (n = i), doAddScript(i, n)
    }
    $("#addScriptContainer").hide(), $("#customScriptContainer").hide(), $("#addScriptButton").show()
}

function doAddSubscription(e, t, i) {
    if (!(e in FilterStorage.knownSubscriptions)) {
        var n = Subscription.fromURL(e);
        n && (n.title = t, i && (n.homepage = i), FilterStorage.addSubscription(n), n instanceof DownloadableSubscription && !n.lastDownload && Synchronizer.execute(n))
    }
}

function doAddScript(e, t) {
    Cscript.add(t, e)
}

function findSubscriptionElement(e) {
    for (var t = document.getElementById("filterLists").childNodes, i = 0; i < t.length; i++)
        if (t[i]._subscription == e) return t[i];
    return null
}

function updateSubscriptionInfo(e) {
    var t = e._subscription,
        i = e.getElementsByClassName("subscriptionTitle")[0];
    i.textContent = t.title, i.setAttribute("title", t.url), t.homepage ? i.href = t.homepage : i.href = t.url;
    var n = e.getElementsByClassName("subscriptionEnabled")[0];
    n.checked = !t.disabled;
    var o = e.getElementsByClassName("subscriptionUpdate")[0];
    if (o.classList.remove("error"), Synchronizer.isExecuting(t.url)) o.textContent = i18n.getMessage("filters_subscription_lastDownload_inProgress");
    else if (t.downloadStatus && "synchronize_ok" != t.downloadStatus) {
        var r = {
            synchronize_invalid_url: "filters_subscription_lastDownload_invalidURL",
            synchronize_connection_error: "filters_subscription_lastDownload_connectionError",
            synchronize_invalid_data: "filters_subscription_lastDownload_invalidData",
            synchronize_checksum_mismatch: "filters_subscription_lastDownload_checksumMismatch"
        };
        t.downloadStatus in r ? o.textContent = i18n.getMessage(r[t.downloadStatus]) : o.textContent = t.downloadStatus, o.classList.add("error")
    } else if (t.lastDownload > 0) {
        var s = i18n_timeDateStrings(1e3 * t.lastDownload),
            a = s[1] ? "last_updated_at" : "last_updated_at_today";
        o.textContent = i18n.getMessage(a, s)
    }
}

function onFilterChange(e, t, i, n) {
    switch (console.log(e), e) {
        case "load":
            reloadFilters();
            break;
        case "subscription.title":
        case "subscription.disabled":
        case "subscription.homepage":
        case "subscription.lastDownload":
        case "subscription.downloadStatus":
            var o = findSubscriptionElement(t);
            o && updateSubscriptionInfo(o);
            break;
        case "subscription.added":
            if (t instanceof SpecialSubscription)
                for (var r = 0; r < t.filters.length; r++) onFilterChange("filter.added", t.filters[r]);
            else findSubscriptionElement(t) || addSubscriptionEntry(t);
            break;
        case "subscription.removed":
            if (t instanceof SpecialSubscription)
                for (var r = 0; r < t.filters.length; r++) onFilterChange("filter.removed", t.filters[r]);
            else {
                var o = findSubscriptionElement(t);
                o && o.parentNode.removeChild(o)
            }
            break;
        case "filter.added":
            t instanceof WhitelistFilter && /^@@\|\|([^\/:]+)\^\$document$/.test(t.text) ? appendToListBox("excludedDomainsBox", RegExp.$1) : appendToListBox("userFiltersBox", t.text);
            break;
        case "filter.removed":
            t instanceof WhitelistFilter && /^@@\|\|([^\/:]+)\^\$document$/.test(t.text) ? removeFromListBox("excludedDomainsBox", RegExp.$1) : removeFromListBox("userFiltersBox", t.text);
            break;
        case "cscript.added":
            addCscript(t, i, i, "正在下载...", !0);
            break;
        case "cscript.downloadStart":
            $('[title="' + t.link + '"]').next().html("正在下载...");
            break;
        case "cscript.downloadStatus":
            var s = i18n_timeDateStrings(t.lastCheck),
                a = s[1] ? "last_updated_at" : "last_updated_at_today",
                l = i18n.getMessage(a, s);
            $('[title="' + t.link + '"]').next().html(l);
            break;
        case "cscript.removed":
            $('[title="' + t + '"]').parent().remove()
    }
}

function populateList(e, t) {
    for (var i = document.getElementById(e); i.lastChild;) i.removeChild(i.lastChild);
    t.sort();
    for (var n = 0; n < t.length; n++) {
        var o = new Option;
        o.text = t[n], o.value = t[n], i.appendChild(o)
    }
}

function appendToListBox(e, t) {
    var i = new Option;
    i.text = t, i.value = t, document.getElementById(e).appendChild(i)
}

function removeFromListBox(e, t) {
    for (var i = document.getElementById(e), n = 0; n < i.length; n++) i.options[n].value == t && i.remove(n--)
}

function addWhitelistDomain(e) {
    e.preventDefault();
    var t = document.getElementById("newWhitelistDomain").value.replace(/\s/g, "");
    if (document.getElementById("newWhitelistDomain").value = "", t) {
        var i = "@@||" + t + "^$document";
        FilterStorage.addFilter(Filter.fromText(i))
    }
}

function addTypedFilter(e) {
    e.preventDefault();
    var t = Filter.normalize(document.getElementById("newFilter").value);
    document.getElementById("newFilter").value = "", t && FilterStorage.addFilter(Filter.fromText(t))
}

function removeSelectedExcludedDomain() {
    for (var e = document.getElementById("excludedDomainsBox"), t = [], i = 0; i < e.length; i++) e.options[i].selected && t.push(e.options[i].value);
    if (t.length)
        for (var i = 0; i < t.length; i++) FilterStorage.removeFilter(Filter.fromText("@@||" + t[i] + "^$document"))
}

function removeSelectedFilters() {
    for (var e = document.getElementById("userFiltersBox"), t = [], i = 0; i < e.length; i++) e.options[i].selected && t.push(e.options[i].value);
    if (t.length)
        for (var i = 0; i < t.length; i++) FilterStorage.removeFilter(Filter.fromText(t[i]))
}

function toggleFiltersInRawFormat(e) {
    if (e.preventDefault(), $("#rawFilters").toggle(), $("#rawFilters").is(":visible")) {
        for (var t = document.getElementById("userFiltersBox"), i = "", n = 0; n < t.length; n++) i += t.options[n].value + "\n";
        document.getElementById("rawFiltersText").value = i
    }
}

function importRawFiltersText() {
    $("#rawFilters").hide();
    for (var e = document.getElementById("rawFiltersText").value.split("\n"), t = {
            __proto__: null
        }, i = 0; i < e.length; i++) {
        var n = Filter.normalize(e[i]);
        n && (/^\[/.test(n) || (FilterStorage.addFilter(Filter.fromText(n)), t[n] = !0))
    }
    for (var o = [], i = 0; i < FilterStorage.subscriptions.length; i++) {
        var r = FilterStorage.subscriptions[i];
        if (r instanceof SpecialSubscription)
            for (var s = 0; s < r.filters.length; s++) {
                var a = r.filters[s];
                a instanceof WhitelistFilter && /^@@\|\|([^\/:]+)\^\$document$/.test(a.text) || a.text in t || o.push(a)
            }
    }
    for (var i = 0; i < o.length; i++) FilterStorage.removeFilter(o[i])
}

function updateFilterLists() {
    for (var e = 0; e < FilterStorage.subscriptions.length; e++) {
        var t = FilterStorage.subscriptions[e];
        t instanceof DownloadableSubscription && Synchronizer.execute(t, !0, !0)
    }
}

function addSubscriptionEntry(e) {
    var t = document.getElementById("subscriptionTemplate"),
        i = t.cloneNode(!0);
    i.removeAttribute("id"), i._subscription = e;
    var n = i.getElementsByClassName("subscriptionRemoveButton")[0];
    /^http:\/\/(sogou|sub)\.adtchrome\.com\/adt-chinalist-easylist(360)?\.txt$/.test(e.url) ? (n.className += " undisable", n.textContent = "") : (n.textContent = "×", n.setAttribute("title", n.textContent), n.addEventListener("click", function () {
        confirm(i18n.getMessage("global_remove_subscription_warning")) && FilterStorage.removeSubscription(e)
    }, !1));
    var o = i.getElementsByClassName("subscriptionEnabled")[0];
    o.addEventListener("click", function () {
        e.disabled != !o.checked && (e.disabled = !o.checked)
    }, !1), updateSubscriptionInfo(i), document.getElementById("filterLists").appendChild(i)
}

function addCscript(e, t, i, n, o) {
    var r = document.getElementById("scriptList"),
        s = document.createElement("div"),
        a = o ? 'checked="checked"' : "";
    if (t.indexOf("videoadjs.txt") > 0) var l = '&nbsp;&nbsp;&nbsp;&nbsp;';
    else var l = '<button class="subscriptionRemoveButton rscript">x</button> ';
    s.setAttribute("class", "subscription"), s.innerHTML = l + '<span class="subscriptionEnabledContainer"><input class="subscriptionEnabled cscriptEnabled" type="checkbox" ' + a + '> <span class="i18n_filters_subscription_enabled_label">启用</span></span>                          <a class="subscriptionTitle" title="' + t + '" href="' + i + '">' + e + '</a><span class="subscriptionUpdate">' + n + "</span>", r.appendChild(s)
}

function setLinks(e) {
    var t = document.getElementById(e);
    if (t)
        for (var i = t.getElementsByTagName("a"), n = 0; n < i.length; n++) "string" == typeof arguments[n + 1] ? (i[n].href = arguments[n + 1], i[n].setAttribute("target", "_blank")) : "function" == typeof arguments[n + 1] && (i[n].href = "javascript:void(0);", i[n].addEventListener("click", arguments[n + 1], !1))
}

function browserCheck() {
    var e = "chrome",
        t = function () {
            if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                var e = navigator.mimeTypes["application/x-shockwave-flash"].description.toLowerCase();
                if (e.indexOf("adobe") > -1) return !0
            }
            return !1
        };
    return e = t() ? "360se" : void 0 !== document.createElement("style").scoped && window.v8Locale ? "360ee" : window.navigator.userAgent.match(/(LBBROWSER)/i) ? "liebao" : window.navigator.userAgent.match(/(Chrome)/i) && window.navigator.userAgent.match(/(MetaSr)/i) ? "sogou" : window.navigator.userAgent.match(/(Chrome)/i) && window.navigator.userAgent.match(/(BIDUBrowser)/i) ? "baidu" : "chrome"
}
$(document).on("click.tab.data-api", '[data-toggle="tab"]', function (e) {
    if (!$(this).parent("li").hasClass("active")) {
        var t = $(this).parent().siblings(".active");
        t.removeClass("active"), $(this).parent().addClass("active"), $(t.children("a").attr("href")).hide(), $($(this).attr("href")).show(), window.location.hash = $(this).attr("href")
    }
}), $(document).ready(function () {
    $('[data-toggle="tab"][href="' + window.location.hash + '"]').click()
});
var backgroundPage = chrome.extension.getBackgroundPage(),
    require = backgroundPage.require;
with(require("filterClasses")) this.Filter = Filter, this.WhitelistFilter = WhitelistFilter;
with(require("subscriptionClasses")) this.Subscription = Subscription, this.SpecialSubscription = SpecialSubscription, this.DownloadableSubscription = DownloadableSubscription;
var FilterStorage = require("filterStorage").FilterStorage,
    FilterNotifier = require("filterNotifier").FilterNotifier,
    Synchronizer = require("synchronizer").Synchronizer,
    Utils = require("utils").Utils,
    Cscript = require("cscript").Cscript;
$(loadOptions);
var delayedSubscriptionSelection = null;