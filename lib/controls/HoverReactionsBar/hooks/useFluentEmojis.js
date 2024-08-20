var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { find } from 'lodash';
import { groupBy } from '@microsoft/sp-lodash-subset';
import emojiList from '../data/fluentEmojis.json';
export var useFluentEmojis = function () {
    var base64FromSVGUrl = React.useCallback(function (url) { return __awaiter(void 0, void 0, void 0, function () {
        var svg, svg64, b64Start, image64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url).then(function (response) { return response.text(); })];
                case 1:
                    svg = _a.sent();
                    svg64 = btoa(svg);
                    b64Start = "data:image/svg+xml;base64,";
                    image64 = b64Start + svg64;
                    return [2 /*return*/, image64];
            }
        });
    }); }, []);
    var getEmojis = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newEmojiList, _a, _b, _i, emoji, emojiInfo, _c, styles, skintones, _d, _e, _f, _g, _h, _j;
        var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    newEmojiList = [];
                    _a = [];
                    for (_b in emojiList)
                        _a.push(_b);
                    _i = 0;
                    _v.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 24];
                    emoji = _a[_i];
                    if (!Object.prototype.hasOwnProperty.call(emojiList, emoji)) return [3 /*break*/, 23];
                    emojiInfo = emojiList[emoji];
                    _c = emojiInfo || {}, styles = _c.styles, skintones = _c.skintones;
                    if (!styles) return [3 /*break*/, 5];
                    _e = (_d = newEmojiList).push;
                    _f = [__assign({}, emojiInfo)];
                    _k = {};
                    _l = {};
                    return [4 /*yield*/, base64FromSVGUrl(styles.Color)];
                case 2:
                    _l.Color = _v.sent(),
                        _l["3D"] = styles["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(styles.Flat)];
                case 3:
                    _l.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(styles.HighContrast)];
                case 4:
                    _e.apply(_d, [__assign.apply(void 0, _f.concat([(_k.styles = (_l.HighContrast = _v.sent(),
                                _l), _k)]))]);
                    _v.label = 5;
                case 5:
                    if (!skintones) return [3 /*break*/, 23];
                    _h = (_g = newEmojiList).push;
                    _j = [__assign({}, emojiInfo)];
                    _m = {};
                    _o = {};
                    _p = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Dark.Color)];
                case 6:
                    _p.Color = _v.sent(),
                        _p["3D"] = skintones.Dark["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Dark.Flat)];
                case 7:
                    _p.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Dark.HighContrast)];
                case 8:
                    _o.Dark = (_p.HighContrast = _v.sent(),
                        _p);
                    _q = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Default.Color)];
                case 9:
                    _q.Color = _v.sent(),
                        _q["3D"] = skintones.Default["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Default.Flat)];
                case 10:
                    _q.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Default.HighContrast)];
                case 11:
                    _o.Default = (_q.HighContrast = _v.sent(),
                        _q);
                    _r = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Light.Color)];
                case 12:
                    _r.Color = _v.sent(),
                        _r["3D"] = skintones.Light["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Light.Flat)];
                case 13:
                    _r.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Light.HighContrast)];
                case 14:
                    _o.Light = (_r.HighContrast = _v.sent(),
                        _r);
                    _s = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Medium.Color)];
                case 15:
                    _s.Color = _v.sent(),
                        _s["3D"] = skintones.Medium["3D"],
                        _s.Flat = skintones.Medium.Flat;
                    return [4 /*yield*/, base64FromSVGUrl(skintones.Medium.HighContrast)];
                case 16:
                    _o.Medium = (_s.HighContrast = _v.sent(),
                        _s);
                    _t = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumDark.Color)];
                case 17:
                    _t.Color = _v.sent(),
                        _t["3D"] = skintones.MediumDark["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumDark.Flat)];
                case 18:
                    _t.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumDark.HighContrast)];
                case 19:
                    _o.MediumDark = (_t.HighContrast = _v.sent(),
                        _t);
                    _u = {};
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumLight.Color)];
                case 20:
                    _u.Color = _v.sent(),
                        _u["3D"] = skintones.MediumLight["3D"];
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumLight.Flat)];
                case 21:
                    _u.Flat = _v.sent();
                    return [4 /*yield*/, base64FromSVGUrl(skintones.MediumLight.HighContrast)];
                case 22:
                    _h.apply(_g, [__assign.apply(void 0, _j.concat([(_m.skintones = (_o.MediumLight = (_u.HighContrast = _v.sent(),
                                _u),
                                _o), _m)]))]);
                    _v.label = 23;
                case 23:
                    _i++;
                    return [3 /*break*/, 1];
                case 24: return [2 /*return*/, newEmojiList];
            }
        });
    }); }, []);
    var getFluentEmojis = React.useCallback(function () {
        var _a;
        return (_a = Object.values(emojiList)) !== null && _a !== void 0 ? _a : undefined;
    }, []);
    var getFluentEmojisByGroup = React.useCallback(function () {
        var fluentEmojisByGroup = groupBy(emojiList, "group");
        return fluentEmojisByGroup !== null && fluentEmojisByGroup !== void 0 ? fluentEmojisByGroup : undefined;
    }, []);
    var getFluentEmojiByglyph = React.useCallback(function (glyph) {
        var fluentEmoji = find(Object.values(emojiList), function (o) {
            return o.glyph === glyph;
        });
        return fluentEmoji !== null && fluentEmoji !== void 0 ? fluentEmoji : undefined;
    }, []);
    var getFluentEmojiByName = React.useCallback(function (name) {
        var _a;
        var fluentEmoji = (_a = find(Object.values(emojiList), function (o) {
            return o.cldr.toLowerCase() === name.toLowerCase();
        })) !== null && _a !== void 0 ? _a : {};
        return fluentEmoji !== null && fluentEmoji !== void 0 ? fluentEmoji : {};
    }, []);
    var getFluentEmoji = React.useCallback(function (glyph) {
        var mapDefaultEmoji = new Map();
        mapDefaultEmoji.set("like", "Thumbs up");
        mapDefaultEmoji.set("heart", "Red heart");
        mapDefaultEmoji.set("laugh", "Grinning face");
        mapDefaultEmoji.set("surprised", "Face with open mouth");
        var mapValue = mapDefaultEmoji.get(glyph);
        if (mapValue) {
            return getFluentEmojiByName(mapValue);
        }
        else {
            return getFluentEmojiByglyph(glyph);
        }
        return undefined;
    }, []);
    return {
        getEmojis: getEmojis,
        getFluentEmojis: getFluentEmojis,
        getFluentEmojisByGroup: getFluentEmojisByGroup,
        getFluentEmojiByglyph: getFluentEmojiByglyph,
        getFluentEmojiByName: getFluentEmojiByName,
        getFluentEmoji: getFluentEmoji,
    };
};
//# sourceMappingURL=useFluentEmojis.js.map