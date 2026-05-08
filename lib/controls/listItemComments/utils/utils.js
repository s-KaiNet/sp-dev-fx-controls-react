import { __awaiter, __generator } from "tslib";
import { SPComponentLoader } from '@microsoft/sp-loader';
var DEFAULT_PERSONA_IMG_HASH = '7ad602295f8386b7615b582d87bcc294';
var DEFAULT_IMAGE_PLACEHOLDER_HASH = '4a48f26592f4e1498d7a478a4c48609c';
var MD5_MODULE_ID = '8494e7d7-6b99-47b2-a741-59873e42f16f';
var PROFILE_IMAGE_URL = '/_layouts/15/userphoto.aspx?size=M&accountname=';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export var getScrollPosition = function (_dataListContainerRef) {
    var scrollTop = _dataListContainerRef.scrollTop, scrollHeight = _dataListContainerRef.scrollHeight, clientHeight = _dataListContainerRef.clientHeight;
    var percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return percentNow;
};
export var b64toBlob = function (b64Data, contentType, sliceSize) { return __awaiter(void 0, void 0, void 0, function () {
    var byteCharacters, byteArrays, offset, slice, byteNumbers, i, byteArray, blob;
    return __generator(this, function (_a) {
        contentType = contentType || 'image/png';
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
export var blobToBase64 = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function (_) {
            resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });
};
export var getImageBase64 = function (pictureUrl) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(pictureUrl);
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var image = new Image();
                image.addEventListener('load', function () {
                    var tempCanvas = document.createElement('canvas');
                    tempCanvas.width = image.width;
                    tempCanvas.height = image.height;
                    tempCanvas.getContext('2d').drawImage(image, 0, 0);
                    var base64Str;
                    try {
                        base64Str = tempCanvas.toDataURL('image/png');
                    }
                    catch (_a) {
                        return '';
                    }
                    base64Str = base64Str.replace(/^data:image\/png;base64,/, '');
                    resolve(base64Str);
                });
                image.src = pictureUrl;
            })];
    });
}); };
/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
export var loadSPComponentById = function (componentId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                SPComponentLoader.loadComponentById(componentId)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .then(function (component) {
                    resolve(component);
                })
                    .catch(function (error) {
                    // no-op;
                });
            })];
    });
}); };
/**
 * Get MD5Hash for the image url to verify whether user has default image or custom image
 * @param url
 */
export var getMd5HashForUrl = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var library, md5Hash, convertedHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadSPComponentById(MD5_MODULE_ID)];
            case 1:
                library = _a.sent();
                try {
                    md5Hash = library.Md5Hash;
                    if (md5Hash) {
                        convertedHash = md5Hash(url);
                        return [2 /*return*/, convertedHash];
                    }
                }
                catch (_b) {
                    return [2 /*return*/, url];
                }
                return [2 /*return*/];
        }
    });
}); };
/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
export var getUserPhoto = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var personaImgUrl, url, newHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                personaImgUrl = PROFILE_IMAGE_URL + userId;
                return [4 /*yield*/, getImageBase64(personaImgUrl)];
            case 1:
                url = _a.sent();
                return [4 /*yield*/, getMd5HashForUrl(url)];
            case 2:
                newHash = _a.sent();
                if (newHash !== DEFAULT_PERSONA_IMG_HASH &&
                    newHash !== DEFAULT_IMAGE_PLACEHOLDER_HASH) {
                    return [2 /*return*/, 'data:image/png;base64,' + url];
                }
                else {
                    return [2 /*return*/, 'undefined'];
                }
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=utils.js.map