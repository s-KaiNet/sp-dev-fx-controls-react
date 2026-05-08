/* eslint-disable @rushstack/security/no-unsafe-regexp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { __awaiter, __generator } from "tslib";
import * as React from 'react';
export var DOCICONURL_XLSX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xlsx.png";
export var DOCICONURL_DOCX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/docx.png";
export var DOCICONURL_PPTX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pptx.png";
export var DOCICONURL_MPPX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/mpp.png";
export var DOCICONURL_PHOTO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/photo.png";
export var DOCICONURL_PDF = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pdf.png";
export var DOCICONURL_TXT = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/txt.png";
export var DOCICONURL_EMAIL = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/email.png";
export var DOCICONURL_CSV = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/csv.png";
export var DOCICONURL_ONE = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/one.png";
export var DOCICONURL_VSDX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vsdx.png";
export var DOCICONURL_VSSX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vssx.png";
export var DOCICONURL_PUB = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pub.png";
export var DOCICONURL_ACCDB = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/accdb.png";
export var DOCICONURL_ZIP = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/zip.png";
export var DOCICONURL_GENERIC = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/genericfile.png";
export var DOCICONURL_CODE = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/code.png";
export var DOCICONURL_HTML = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/html.png";
export var DOCICONURL_XML = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xml.png";
export var DOCICONURL_SPO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/spo.png";
export var DOCICONURL_VIDEO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/video.png";
export var DOCICONURL_AUDIO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/audio.png";
export var DOCICONURL_FOLDER = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/folder.png";
export var useUtils = function () {
    var getFileExtension = React.useCallback(function (fileName) {
        if (!fileName)
            return "";
        var splitedName = fileName.split(".");
        var fileExtension = splitedName[splitedName.length - 1];
        return fileExtension;
    }, []);
    /**
     * GetFileImageUrl
     */
    var GetFileImageUrl = React.useCallback(function (file) {
        var _fileImageUrl = DOCICONURL_GENERIC;
        var i = file.lastIndexOf(".");
        var _fileTypes = i > -1 ? file.substring(i + 1, file.length) : "";
        var _fileExtension = _fileTypes.toLowerCase();
        if (!_fileExtension) {
            return _fileImageUrl;
        }
        switch (_fileExtension.toLowerCase()) {
            case "xlsx":
                _fileImageUrl = DOCICONURL_XLSX;
                break;
            case "xls":
                _fileImageUrl = DOCICONURL_XLSX;
                break;
            case "docx":
                _fileImageUrl = DOCICONURL_DOCX;
                break;
            case "doc":
                _fileImageUrl = DOCICONURL_DOCX;
                break;
            case "pptx":
                _fileImageUrl = DOCICONURL_PPTX;
                break;
            case "ppt":
                _fileImageUrl = DOCICONURL_PPTX;
                break;
            case "mppx":
                _fileImageUrl = DOCICONURL_MPPX;
                break;
            case "mpp":
                _fileImageUrl = DOCICONURL_MPPX;
                break;
            case "csv":
                _fileImageUrl = DOCICONURL_CSV;
                break;
            case "pdf":
                _fileImageUrl = DOCICONURL_PDF;
                break;
            case "txt":
                _fileImageUrl = DOCICONURL_TXT;
                break;
            case "jpg":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "msg":
                _fileImageUrl = DOCICONURL_EMAIL;
                break;
            case "jpeg":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "png":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "ico":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "gif":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "heic":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "tiff":
                _fileImageUrl = DOCICONURL_PHOTO;
                break;
            case "eml":
                _fileImageUrl = DOCICONURL_EMAIL;
                break;
            case "pub":
                _fileImageUrl = DOCICONURL_PUB;
                break;
            case "accdb":
                _fileImageUrl = DOCICONURL_ACCDB;
                break;
            case "zip":
                _fileImageUrl = DOCICONURL_ZIP;
                break;
            case "7z":
                _fileImageUrl = DOCICONURL_ZIP;
                break;
            case "tar":
                _fileImageUrl = DOCICONURL_ZIP;
                break;
            case "js":
                _fileImageUrl = DOCICONURL_CODE;
                break;
            case "json":
                _fileImageUrl = DOCICONURL_CODE;
                break;
            case "html":
                _fileImageUrl = DOCICONURL_HTML;
                break;
            case "xml":
                _fileImageUrl = DOCICONURL_XML;
                break;
            case "aspx":
                _fileImageUrl = DOCICONURL_SPO;
                break;
            case "mp4":
                _fileImageUrl = DOCICONURL_VIDEO;
                break;
            case "mov":
                _fileImageUrl = DOCICONURL_VIDEO;
                break;
            case "wmv":
                _fileImageUrl = DOCICONURL_VIDEO;
                break;
            case "ogg":
                _fileImageUrl = DOCICONURL_VIDEO;
                break;
            case "webm":
                _fileImageUrl = DOCICONURL_VIDEO;
                break;
            default:
                _fileImageUrl = DOCICONURL_GENERIC;
                break;
        }
        return _fileImageUrl;
    }, []);
    var getShortName = React.useCallback(function (name) {
        if (!name)
            return "";
        var splitedName = name.split(".");
        var displayCreatedFileName = splitedName[0].substring(0, 25);
        var displayCreatedFileNameExt = splitedName[splitedName.length - 1];
        var displayCreatedFile = "".concat(displayCreatedFileName, "...").concat(displayCreatedFileNameExt);
        return displayCreatedFile;
    }, []);
    var isOndrive = React.useCallback(function (name) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!name)
                return [2 /*return*/, false];
            return [2 /*return*/, name.indexOf("my.sharepoint.com") > -1];
        });
    }); }, []);
    var formatFileSize = React.useCallback(function (bytes, decimalPoint) {
        if (bytes === 0)
            return "0 Bytes";
        var k = 1000, dm = decimalPoint || 2, sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }, []);
    var getFolderIcon = React.useCallback(function () {
        return DOCICONURL_FOLDER;
    }, []);
    var trimBeginDoubleSlash = React.useCallback(function (value) {
        if (value.charAt(0) === "/" && value.charAt(1) === "/") {
            return value.substring(1, value.length);
        }
        return value;
    }, []);
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
    var centerElement = React.useCallback(function (container, elementToCenter) {
        var elementRect = elementToCenter.getBoundingClientRect();
        var containerRect = container.getBoundingClientRect();
        var elementWidth = elementRect.width;
        var elementHeight = elementRect.height;
        var windowWidth = containerRect.width;
        var windowHeight = containerRect.height;
        var elementLeft = (windowWidth - elementWidth) / 2;
        var elementTop = (windowHeight - elementHeight) / 2;
        return { left: elementLeft, top: elementTop };
    }, []);
    var hasValidMentionCharIndex = function (mentionCharIndex, text, isolateChar, textPrefix) {
        if (mentionCharIndex === -1) {
            return false;
        }
        if (!isolateChar) {
            return true;
        }
        var mentionPrefix = mentionCharIndex ? text[mentionCharIndex - 1] : textPrefix;
        return !mentionPrefix || !!mentionPrefix.match(/\s/);
    };
    var hasValidChars = function (text, allowedChars) {
        return allowedChars.test(text);
    };
    var getMentionCharIndex = function (text, mentionDenotationChars, isolateChar) {
        return mentionDenotationChars.reduce(function (prev, mentionChar) {
            var mentionCharIndex;
            if (isolateChar) {
                var regex = new RegExp("^".concat(mentionChar, "|\\s").concat(mentionChar), "g");
                var lastMatch = (text.match(regex) || []).pop();
                if (!lastMatch) {
                    return {
                        mentionChar: prev.mentionChar,
                        mentionCharIndex: prev.mentionCharIndex,
                    };
                }
                mentionCharIndex =
                    lastMatch !== mentionChar ? text.lastIndexOf(lastMatch) + lastMatch.length - mentionChar.length : 0;
            }
            else {
                mentionCharIndex = text.lastIndexOf(mentionChar);
            }
            if (mentionCharIndex > prev.mentionCharIndex) {
                return {
                    mentionChar: mentionChar,
                    mentionCharIndex: mentionCharIndex,
                };
            }
            return {
                mentionChar: prev.mentionChar,
                mentionCharIndex: prev.mentionCharIndex,
            };
        }, { mentionChar: null, mentionCharIndex: -1 });
    };
    var blobToBase64 = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;
            reader.onload = function (_) {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
    };
    var getScrollPosition = function (_dataListContainerRef) {
        var scrollTop = _dataListContainerRef.scrollTop, scrollHeight = _dataListContainerRef.scrollHeight, clientHeight = _dataListContainerRef.clientHeight;
        var percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
        return percentNow;
    };
    var b64toBlob = function (b64Data, contentType, sliceSize) { return __awaiter(void 0, void 0, void 0, function () {
        var byteCharacters, byteArrays, offset, slice, byteNumbers, i, byteArray, blob;
        return __generator(this, function (_a) {
            contentType = contentType || "image/png";
            sliceSize = sliceSize || 512;
            byteCharacters = atob(b64Data);
            byteArrays = [];
            for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                slice = byteCharacters.slice(offset, offset + sliceSize);
                byteNumbers = new Array(slice.length);
                for (i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            blob = new Blob(byteArrays, { type: contentType });
            return [2 /*return*/, blob];
        });
    }); };
    var getInitials = function (name) {
        if (!name)
            return "";
        var splitedName = name.split(" ");
        var initials = "";
        if (splitedName.length > 1) {
            initials = splitedName[0].charAt(0) + splitedName[1].charAt(0);
        }
        else {
            initials = splitedName[0].charAt(0);
        }
        return initials;
    };
    var getBase64Image = function (img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    var parseHtmlString = function (htmlString) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = htmlString;
        return tmp.textContent || tmp.innerText || "";
    };
    return {
        b64toBlob: b64toBlob,
        blobToBase64: blobToBase64,
        getMentionCharIndex: getMentionCharIndex,
        hasValidChars: hasValidChars,
        hasValidMentionCharIndex: hasValidMentionCharIndex,
        GetFileImageUrl: GetFileImageUrl,
        getShortName: getShortName,
        isOndrive: isOndrive,
        formatFileSize: formatFileSize,
        getFolderIcon: getFolderIcon,
        trimBeginDoubleSlash: trimBeginDoubleSlash,
        checkIfCursorIsInsideContainer: checkIfCursorIsInsideContainer,
        centerElement: centerElement,
        getScrollPosition: getScrollPosition,
        getInitials: getInitials,
        getBase64Image: getBase64Image,
        parseHtmlString: parseHtmlString,
        getFileExtension: getFileExtension
    };
};
//# sourceMappingURL=useUtils.js.map