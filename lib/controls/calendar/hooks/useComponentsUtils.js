import { __assign, __rest } from "tslib";
import * as React from 'react';
import { EBreakPoints } from '../constants';
import { tokens } from '@fluentui/react-components';
export var useComponentUtils = function () {
    var getCacheKey = React.useCallback(function (key, uniqueId) {
        return "".concat(key).concat(uniqueId);
    }, []);
    var validateUrl = React.useCallback(function (url) {
        if (!url) {
            return false;
        }
        try {
            var urlValid = new URL(url);
            return !!urlValid;
        }
        catch (_a) {
            return false;
        }
    }, []);
    var trimBeginDoubleSlash = function (value) {
        if (value.charAt(0) === '/' && value.charAt(1) === '/') {
            return value.substring(1, value.length);
        }
        return value;
    };
    var isValidGUID = React.useCallback(function (str) {
        var regex = new RegExp(/^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/);
        if (!str) {
            return false;
        }
        if (regex.test(str) === true) {
            return true;
        }
        else {
            return false;
        }
    }, []);
    var getPageNameFromUrl = React.useCallback(function (url) {
        if (!url) {
            return '';
        }
        var urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }, []);
    var getSPSiteAbsoluteUrl = React.useCallback(function (absolutefileUrl) {
        var hostname = window.location.hostname;
        var rootSiteUrl = "https://".concat(hostname);
        if (absolutefileUrl.indexOf("".concat(rootSiteUrl, "/sites/")) > -1 ||
            absolutefileUrl.indexOf("".concat(rootSiteUrl, "/teams/")) > -1) {
            var fileServerRelativeUrl = absolutefileUrl.split(hostname)[1];
            // Split server relative URL by '/' to obtain web name
            var webName = fileServerRelativeUrl.split('/')[2];
            var webAbsoluteUrl = "https://".concat(hostname, "/sites/").concat(webName);
            if (absolutefileUrl.indexOf("".concat(rootSiteUrl, "/teams/")) > -1) {
                webAbsoluteUrl = "https://".concat(hostname, "/teams/").concat(webName);
            }
            return webAbsoluteUrl;
        }
        return rootSiteUrl;
    }, []);
    var getFileServerRelativeUrlFromAbsoluteUrl = React.useCallback(function (absoluteFileUrl) {
        var fileServerRelativeUrl = absoluteFileUrl.split(window.location.hostname)[1];
        fileServerRelativeUrl = trimBeginDoubleSlash(fileServerRelativeUrl);
        return fileServerRelativeUrl;
    }, []);
    var encodeRestUrl = React.useCallback(function (query) {
        return encodeURIComponent(query.replace(/[%]/g, '%25'))
            .replace(/[']/g, '%27%27')
            .replace(/[&]/g, '%26')
            .replace(/[#]/g, '%23')
            .replace(/[?]/g, '%3F')
            .replace(/[/]/g, '%2F')
            .replace(/[+]/g, '%2B');
    }, []);
    var checkValueBreakPoint = React.useCallback(function (value) {
        if (value === null || value === undefined) {
            return false;
        }
        return (Object.prototype.hasOwnProperty.call(value, 'extraSmall') ||
            Object.prototype.hasOwnProperty.call(value, 'small') ||
            Object.prototype.hasOwnProperty.call(value, 'medium') ||
            Object.prototype.hasOwnProperty.call(value, 'large') ||
            Object.prototype.hasOwnProperty.call(value, 'extraLarge'));
    }, []);
    var getProperty = React.useCallback(function (obj, key) {
        return obj[key.toString().toLowerCase()];
    }, []);
    var getCurrentDevice = React.useCallback(function (containerWidth) {
        if (containerWidth >= EBreakPoints.XXXLarge)
            return 'XXXLarge';
        if (containerWidth >= EBreakPoints.ExtraExtraLarge)
            return 'ExtraExtraLarge';
        if (containerWidth >= EBreakPoints.ExtraLarge)
            return 'ExtraLarge';
        if (containerWidth >= Number(EBreakPoints.Large))
            return 'Large';
        if (containerWidth >= Number(EBreakPoints.Medium))
            return 'Medium';
        if (containerWidth >= Number(EBreakPoints.Small))
            return 'Small';
        return 'ExtraSmall';
    }, []);
    var getSpacingBreakPoint = React.useCallback(function (value, containerWidth) {
        var device = getCurrentDevice(containerWidth);
        var breakPoints = {
            ExtraSmall: 'xs',
            Small: 's',
            Medium: 'm',
            Large: 'l',
            ExtraLarge: 'xl',
            ExtraExtraLarge: 'xxl',
        };
        var newValue = value;
        if (checkValueBreakPoint(value)) {
            newValue =
                getProperty(value, (device !== null && device !== void 0 ? device : 'Medium')) || breakPoints[device];
        }
        return newValue;
    }, [getCurrentDevice, checkValueBreakPoint, getProperty]);
    // "none" | "xxs" | "xs" | "sNudge" | "s" | "mNudge" | "m" | "l" | "xl" | "xxl" | "xxxl"
    var getSpacing = React.useCallback(function (value, containerWidth, type) {
        if (!value)
            return 'none';
        // Check if value is in pixel format like '20px' or percentage format like '20%'
        if (typeof value === 'string' &&
            (/^\d+px$/.test(value) || /^\d+%$/.test(value))) {
            return value; // Return the same value for all sides
        }
        var newType = type;
        var spacingTokens = {
            padding: 'spacingHorizontal',
            vertical: 'spacingVertical',
            horizontal: 'spacingHorizontal',
        };
        var newValue = getSpacingBreakPoint(value, containerWidth);
        switch (newValue) {
            case 'none':
                return tokens["".concat(spacingTokens[newType], "None")];
            case 'xxs':
                return tokens["".concat(spacingTokens[newType], "XXS")];
            case 'xs':
                return tokens["".concat(spacingTokens[newType], "XS")];
            case 'sNudge':
                return tokens["".concat(spacingTokens[newType], "SNudge")];
            case 's':
                return tokens["".concat(spacingTokens[newType], "S")];
            case 'mNudge':
                return tokens["".concat(spacingTokens[newType], "MNudge")];
            case 'm':
                return tokens["".concat(spacingTokens[newType], "M")];
            case 'l':
                return tokens["".concat(spacingTokens[newType], "L")];
            case 'xl':
                return tokens["".concat(spacingTokens[newType], "XL")];
            case 'xxl':
                return tokens["".concat(spacingTokens[newType], "XXL")];
            case 'xxxl':
                return tokens["".concat(spacingTokens[newType], "XXXL")];
            default:
                return tokens["".concat(spacingTokens[newType], "M")];
        }
    }, [getSpacingBreakPoint]);
    var getBaseStyles = React.useCallback(function (baseProps, containerWidth, _containerHeight) {
        var verticalSpacing = baseProps.verticalSpacing, horizontalSpacing = baseProps.horizontalSpacing, paddingLeft = baseProps.paddingLeft, paddingRight = baseProps.paddingRight, paddingBottom = baseProps.paddingBottom, background = baseProps.background, width = baseProps.width, maxWidth = baseProps.maxWidth, height = baseProps.height, maxHeight = baseProps.maxHeight, marginLeft = baseProps.marginLeft, marginRight = baseProps.marginRight, marginTop = baseProps.marginTop, marginBottom = baseProps.marginBottom, paddingTop = baseProps.paddingTop, padding = baseProps.padding, margin = baseProps.margin, styles = baseProps.styles;
        var wpaddingTop = getSpacing(paddingTop, containerWidth, 'padding');
        var wpaddingLeft = getSpacing(paddingLeft, containerWidth, 'padding');
        var wpaddingRight = getSpacing(paddingRight, containerWidth, 'padding');
        var wpaddingBottom = getSpacing(paddingBottom, containerWidth, 'padding');
        var wpadding = getSpacing(padding, containerWidth, 'padding');
        var wmarginLeft = getSpacing(marginLeft, containerWidth, 'padding');
        var wmarginRight = getSpacing(marginRight, containerWidth, 'padding');
        var wmarginTop = getSpacing(marginTop, containerWidth, 'padding');
        var wmarginBottom = getSpacing(marginBottom, containerWidth, 'padding');
        var wmargin = getSpacing(margin, containerWidth, 'padding');
        if (wpadding) {
            wpaddingTop = wpaddingTop === 'none' ? wpadding : wpaddingTop;
            wpaddingLeft = wpaddingLeft === 'none' ? wpadding : wpaddingLeft;
            wpaddingRight = wpaddingRight === 'none' ? wpadding : wpaddingRight;
            wpaddingBottom = wpaddingBottom === 'none' ? wpadding : wpaddingBottom;
        }
        if (wmargin) {
            wmarginLeft = wmarginLeft === 'none' ? wmargin : wmarginLeft;
            wmarginRight = wmarginRight === 'none' ? wmargin : wmarginRight;
            wmarginTop = wmarginTop === 'none' ? wmargin : wmarginTop;
            wmarginBottom = wmarginBottom === 'none' ? wmargin : wmarginBottom;
        }
        var wgapRow = getSpacing(verticalSpacing, containerWidth, 'vertical');
        var wgapCol = getSpacing(horizontalSpacing, containerWidth, 'horizontal');
        var wgap = "".concat(wgapRow, " ").concat(wgapCol);
        // Strip shorthand padding/margin from styles to avoid React warnings
        // about mixing shorthand and individual properties
        var _a = (styles !== null && styles !== void 0 ? styles : {}), _sPadding = _a.padding, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sMargin = _a.margin, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sPt = _a.paddingTop, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sPl = _a.paddingLeft, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sPr = _a.paddingRight, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sPb = _a.paddingBottom, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sMt = _a.marginTop, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sMl = _a.marginLeft, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sMr = _a.marginRight, // eslint-disable-line @typescript-eslint/no-unused-vars
        _sMb = _a.marginBottom, // eslint-disable-line @typescript-eslint/no-unused-vars
        safeStyles = __rest(_a, ["padding", "margin", "paddingTop", "paddingLeft", "paddingRight", "paddingBottom", "marginTop", "marginLeft", "marginRight", "marginBottom"]);
        return __assign(__assign({}, safeStyles), { gap: wgap, paddingTop: wpaddingTop, paddingLeft: wpaddingLeft, paddingRight: wpaddingRight, paddingBottom: wpaddingBottom, marginLeft: wmarginLeft, marginRight: wmarginRight, marginTop: wmarginTop, marginBottom: wmarginBottom, background: background, width: width !== null && width !== void 0 ? width : undefined, height: height !== null && height !== void 0 ? height : undefined, maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : undefined, maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : undefined, overflow: 'auto' });
    }, [getSpacing]);
    var getLayoutBreakPoint = React.useCallback(function (value, containerWidth) {
        var device = getCurrentDevice(containerWidth);
        var newValue = value;
        if (checkValueBreakPoint(value)) {
            newValue =
                getProperty(value, (device !== null && device !== void 0 ? device : 'Medium')) || '';
        }
        return newValue;
    }, [getCurrentDevice, checkValueBreakPoint, getProperty]);
    return {
        getCacheKey: getCacheKey,
        validateUrl: validateUrl,
        trimBeginDoubleSlash: trimBeginDoubleSlash,
        isValidGUID: isValidGUID,
        getPageNameFromUrl: getPageNameFromUrl,
        getSPSiteAbsoluteUrl: getSPSiteAbsoluteUrl,
        getFileServerRelativeUrlFromAbsoluteUrl: getFileServerRelativeUrlFromAbsoluteUrl,
        encodeRestUrl: encodeRestUrl,
        getSpacing: getSpacing,
        getCurrentDevice: getCurrentDevice,
        getBaseStyles: getBaseStyles,
        getLayoutBreakPoint: getLayoutBreakPoint,
    };
}; // ... }
//# sourceMappingURL=useComponentsUtils.js.map