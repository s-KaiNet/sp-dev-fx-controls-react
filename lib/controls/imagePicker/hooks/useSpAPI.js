import { __awaiter, __generator } from "tslib";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { useGraphAPI } from './useGrapAPI';
export var useSpAPI = function (context) {
    var getDriveItemDownloadUrl = useGraphAPI(context).getDriveItemDownloadUrl;
    var getFileFromBlob = React.useCallback(function (blob, fileName) {
        var file = new File([blob], fileName, { type: blob.type });
        return file;
    }, []);
    var getADAcesstoken = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var token1, token, getSiteLists, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.aadTokenProviderFactory.getTokenProvider()];
                case 1:
                    token1 = _a.sent();
                    return [4 /*yield*/, token1.getToken('https://microsoft.sharepoint.com')];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, fetch('https://ysz3l-my.sharepoint.com/personal/jmendes_spteckint_onmicrosoft_com/_api/web/lists', {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 3:
                    getSiteLists = _a.sent();
                    return [4 /*yield*/, getSiteLists.json()];
                case 4:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    var downloadBingContent = function (absoluteFileUrl, fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var fileDownloadResult, blob, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, context.httpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1, {
                            method: "GET",
                            mode: "cors"
                        })];
                case 1:
                    fileDownloadResult = _a.sent();
                    if (!fileDownloadResult || !fileDownloadResult.ok) {
                        throw new Error("Something went wrong when downloading the file. Status='".concat(fileDownloadResult.status, "'"));
                    }
                    return [4 /*yield*/, fileDownloadResult.blob()];
                case 2:
                    blob = _a.sent();
                    return [2 /*return*/, getFileFromBlob(blob, fileName)];
                case 3:
                    err_1 = _a.sent();
                    console.error("[DownloadBingContent] Err='".concat(err_1.message, "'"));
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var downLoadSpOrOneDriveContent = function (driveId, itemId, fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var fileDownloadUrl, fileDownloadResult, blob, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getDriveItemDownloadUrl(driveId, itemId)];
                case 1:
                    fileDownloadUrl = _a.sent();
                    return [4 /*yield*/, context.httpClient.get(fileDownloadUrl, SPHttpClient.configurations.v1, {
                            method: "GET",
                            mode: "cors"
                        })];
                case 2:
                    fileDownloadResult = _a.sent();
                    if (!fileDownloadResult || !fileDownloadResult.ok) {
                        throw new Error("Something went wrong when downloading the file. Status='".concat(fileDownloadResult.status, "'"));
                    }
                    return [4 /*yield*/, fileDownloadResult.blob()];
                case 3:
                    blob = _a.sent();
                    return [2 /*return*/, getFileFromBlob(blob, fileName)];
                case 4:
                    err_2 = _a.sent();
                    console.error("[DownloadBingContent] Err='".concat(err_2.message, "'"));
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        getADAcesstoken: getADAcesstoken,
        downloadBingContent: downloadBingContent,
        downLoadSpOrOneDriveContent: downLoadSpOrOneDriveContent
    };
};
//# sourceMappingURL=useSpAPI.js.map