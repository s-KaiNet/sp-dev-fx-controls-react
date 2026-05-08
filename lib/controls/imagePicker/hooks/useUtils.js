import { __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { IMG_SUPPORTED_EXTENSIONS } from "../constants/constants";
export var useUtils = function () {
    var getCacheKey = React.useCallback(function (key, uniqueId) {
        return "".concat(key).concat(uniqueId);
    }, []);
    var isValidUrl = React.useCallback(function (url) {
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
    var checkUrlParameter = function (name) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };
    var checkIfCursorIsInsideContainer = React.useCallback(function (event, containerRef) {
        var containerRect = containerRef === null || containerRef === void 0 ? void 0 : containerRef.getBoundingClientRect();
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        if (containerRect) {
            var isCursorInsideContainer = mouseX >= containerRect.left &&
                mouseX <= containerRect.right &&
                mouseY >= containerRect.top &&
                mouseY <= containerRect.bottom;
            if (isCursorInsideContainer) {
                // Do something when the cursor is inside the container
                return true;
            }
            else {
                return false;
                // Do something when the cursor is outside the container
            }
        }
        return false;
    }, []);
    var trimBeginDoubleSlash = function (value) {
        if (value.charAt(0) === "/" && value.charAt(1) === "/") {
            return value.substring(1, value.length);
        }
        return value;
    };
    var getSPSiteAbsoluteUrl = React.useCallback(function (absolutefileUrl) {
        var hostname = window.location.hostname;
        var rootSiteUrl = "https://".concat(hostname);
        if (absolutefileUrl.indexOf("".concat(rootSiteUrl, "/sites/")) > -1 ||
            absolutefileUrl.indexOf("".concat(rootSiteUrl, "/teams/")) > -1) {
            var fileServerRelativeUrl = absolutefileUrl.split(hostname)[1];
            // Split server relative URL by '/' to obtain web name
            var webName = fileServerRelativeUrl.split("/")[2];
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
        return encodeURIComponent(query.replace(/[%]/g, "%25"))
            .replace(/[']/g, "%27%27")
            .replace(/[&]/g, "%26")
            .replace(/[#]/g, "%23")
            .replace(/[?]/g, "%3F")
            .replace(/[/]/g, "%2F")
            .replace(/[+]/g, "%2B");
    }, []);
    var getImageBase64 = React.useCallback(function (pictureUrl, customWidth, customHeight) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var image = new Image();
                    image.crossOrigin = "anonymous";
                    image.addEventListener("load", function () {
                        var _a;
                        var tempCanvas = document.createElement("canvas");
                        tempCanvas.width = customWidth !== null && customWidth !== void 0 ? customWidth : image.width;
                        tempCanvas.height = customHeight !== null && customHeight !== void 0 ? customHeight : image.height;
                        (_a = tempCanvas === null || tempCanvas === void 0 ? void 0 : tempCanvas.getContext("2d")) === null || _a === void 0 ? void 0 : _a.drawImage(image, 0, 0, customWidth !== null && customWidth !== void 0 ? customWidth : image.width, customHeight !== null && customHeight !== void 0 ? customHeight : image.height);
                        var base64Str;
                        try {
                            base64Str = tempCanvas.toDataURL("image/png", 1);
                        }
                        catch (err) {
                            if (DEBUG) {
                                console.error("[ImageService.getBase64Image]: Err='".concat(err.message, "'"));
                            }
                            return "";
                        }
                        resolve(base64Str);
                    });
                    image.src = pictureUrl;
                })];
        });
    }); }, []);
    var getBase64ImageFromDOMImg = React.useCallback(function (imgElementId) {
        try {
            var imgElement = document.getElementById(imgElementId);
            var canvas = document.createElement("canvas");
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            var ctx = canvas.getContext("2d");
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(imgElement, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL;
        }
        catch (err) {
            if (DEBUG) {
                console.error("[getBase64ImageFromDOMImg]: Err='".concat(err.message, "'"));
            }
            return undefined;
        }
    }, []);
    var getFileFromBlob = React.useCallback(function (blob, fileName) {
        var result = null; // eslint-disable-line @typescript-eslint/no-explicit-any
        // IE 11 foesn't support File API, create a workaround to return Blob with fileName assigned.
        try {
            result = new File([blob], fileName);
        }
        catch (_a) {
            result = blob;
            result.fileName = fileName;
        }
        return result;
    }, []);
    var formatBytes = React.useCallback(function (bytes, decimals) {
        if (bytes === 0) {
            return "0 Bytes";
        }
        var k = 1024;
        var dm = decimals <= 0 ? 0 : decimals || 2;
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return (parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
            " " +
            ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]);
    }, []);
    var getFileNameFromUrl = React.useCallback(function (itemUrl) {
        var urlTokens = itemUrl.split("?");
        var url = urlTokens[0];
        var tokens = url.split("/");
        var fileNameWithExtension = tokens[tokens.length - 1];
        return fileNameWithExtension;
    }, []);
    var getFileExtension = React.useCallback(function (fileName) {
        // Split the URL on the dots
        var splitFileName = fileName.toLowerCase().split(".");
        // Take the last value
        var extensionValue = splitFileName.pop();
        // Check if there are query string params in place
        if (extensionValue.indexOf("?") !== -1) {
            // Split the string on the question mark and return the first part
            var querySplit = extensionValue.split("?");
            extensionValue = querySplit[0];
        }
        return ".".concat(extensionValue);
    }, []);
    var isImage = React.useCallback(function (fileName) {
        var acceptableExtensions = IMG_SUPPORTED_EXTENSIONS.split(",");
        // const IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg"
        var thisExtension = getFileExtension(fileName);
        return acceptableExtensions.indexOf(thisExtension) > -1;
    }, []);
    var getEncodedChar = React.useCallback(function (c) {
        var o = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "\\": "&#92;",
        };
        return o[c];
    }, []);
    var getFileNameWithoutExtension = React.useCallback(function (itemUrl) {
        var fileNameWithExtension = getFileNameFromUrl(itemUrl);
        var fileName = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf("."));
        return fileName;
    }, [getFileNameFromUrl]);
    var resizeImageTo = function (imageUrl, targetWidth) {
        var image = window.document.createElement("img");
        image.src = imageUrl;
        var originalWidth = image.width;
        var originalHeight = image.height;
        // Calculate the new height while maintaining the aspect ratio
        var targetHeight = (originalHeight / originalWidth) * targetWidth;
        // Create a canvas to draw the resized image
        var canvas = window.document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        // Draw the image on the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
        // Create a new image element with the resized image
        return canvas.toDataURL();
    };
    var getScrollPosition = React.useCallback(function (dataListContainerRef) {
        var scrollTop = dataListContainerRef.scrollTop, scrollHeight = dataListContainerRef.scrollHeight, clientHeight = dataListContainerRef.clientHeight;
        var percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
        return percentNow;
    }, []);
    return {
        getCacheKey: getCacheKey,
        isValidUrl: isValidUrl,
        checkUrlParameter: checkUrlParameter,
        checkIfCursorIsInsideContainer: checkIfCursorIsInsideContainer,
        getSPSiteAbsoluteUrl: getSPSiteAbsoluteUrl,
        getFileServerRelativeUrlFromAbsoluteUrl: getFileServerRelativeUrlFromAbsoluteUrl,
        trimBeginDoubleSlash: trimBeginDoubleSlash,
        encodeRestUrl: encodeRestUrl,
        getImageBase64: getImageBase64,
        getBase64ImageFromDOMImg: getBase64ImageFromDOMImg,
        getFileFromBlob: getFileFromBlob,
        formatBytes: formatBytes,
        getFileNameFromUrl: getFileNameFromUrl,
        isImage: isImage,
        getFileExtension: getFileExtension,
        getEncodedChar: getEncodedChar,
        getFileNameWithoutExtension: getFileNameWithoutExtension,
        resizeImageTo: resizeImageTo,
        getScrollPosition: getScrollPosition,
    };
}; // ... }
//# sourceMappingURL=useUtils.js.map