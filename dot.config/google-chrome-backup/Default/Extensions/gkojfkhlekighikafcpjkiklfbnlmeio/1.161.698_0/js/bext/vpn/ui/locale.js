// LICENSE_CODE ZON
;(function () {
    'use strict'; define(['exports', '/bext/vpn/ui/locale/en.js', '/util/storage.js', 'lang', '/bext/pub/util.js'], function (exports, _en, _storage, _lang, _util) {Object.defineProperty(exports, "__esModule", { value: true });var _en2 = _interopRequireDefault(_en);var _storage2 = _interopRequireDefault(_storage);var _lang2 = _interopRequireDefault(_lang);var _util2 = _interopRequireDefault(_util);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





        function require_err(locale, err) {
            _storage2.default.set('locale', 'en');
            _util2.default.perr('be_lang_err', { locale, err }, { err });
        }
        const E = get_message;
        E.locale = _storage2.default.get('locale');
        E.locales = _lang2.default.lang.slice();
        E.locale_curr = E.locale_en = _en2.default;

        if (!E.locales.includes(E.locale))
        {
            var navlang = (navigator.language || '').replace('-', '_');
            var choices = [navlang, navlang.substr(0, navlang.indexOf('_')), 'en'];
            for (var i = 0; i < choices.length; i++)
            {
                if (E.locales.includes(choices[i]))
                {
                    E.locale = choices[i];
                    break;
                }
            }
        }

        require(['/bext/vpn/ui/locale/' + E.locale + '.js'], locale_curr => {
            E.locale_curr = locale_curr;
            _storage2.default.set('locale', E.locale);
        }, err => {
            require_err(E.locale, err);
            E.locale = 'en';
        });

        E.is_rtl = () => /^(ar|he|fa|ur)$/.test(E.locale);

        function get_message(id, vals, locale) {
            var s,o = E.locale_curr[id] || _en2.default[id];
            if (locale)
            o = E.locale == locale && E.locale_curr[id] || _en2.default[id];
            if (!o)
            {
                if (false)
                {
                    _util2.default.perr('be_lang_missing', '' + E.locale + '|' + id.substr(0, 512),
                    { rate_limit: { count: 3 } });
                }
                s = id;
            } else

            s = o.message;
            if (!vals)
            return s;
            for (var i = 0; i < vals.length; i++)
            s = s.replace('$' + (i + 1), vals[i]);
            return s;
        }exports.default =

        E;});})();
//# sourceMappingURL=locale.js.map
