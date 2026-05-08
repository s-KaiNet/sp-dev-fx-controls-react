import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
export var useGraphAPI = function (context) {
    var graphClient = React.useMemo(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, context.msGraphClientFactory.getClient("3")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [context]);
    var searchImages = React.useCallback(function (query_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([query_1], args_1, true), void 0, function (query, from) {
            var client, searchResults, hasMoreResults, total, fields, error_1;
            var _a, _b, _c, _d, _e, _f, _g;
            if (from === void 0) { from = 0; }
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!query || !graphClient)
                            return [2 /*return*/, undefined];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, graphClient];
                    case 2:
                        client = _h.sent();
                        return [4 /*yield*/, client.api("/search/query").post({
                                requests: [
                                    {
                                        entityTypes: ["driveItem"],
                                        query: {
                                            queryString: "".concat(query, " AND -driveitem:\"\""),
                                        },
                                        fields: [
                                            "editor",
                                            "driveId",
                                            "Title",
                                            "Path",
                                            "Filename",
                                            "FileExtension",
                                            "FileType",
                                            "Created",
                                            "Author",
                                            "LastModifiedTime",
                                            "EditorOwsUser",
                                            "ModifiedBy",
                                            "LinkingUrl",
                                            "SiteTitle",
                                            "ParentLink",
                                            "DocumentPreviewMetadata",
                                            "ListID",
                                            "ListItemID",
                                            "SPSiteURL",
                                            "SiteID",
                                            "WebId",
                                            "UniqueID",
                                            "SPWebUrl",
                                            "DefaultEncodingURL",
                                            "PictureThumbnailURL",
                                            "DriveItem",
                                            "UniqueId",
                                            "BannerImageUrlOWSURLH",
                                        ],
                                        from: from,
                                        size: 50,
                                    },
                                ],
                            })];
                    case 3:
                        searchResults = _h.sent();
                        hasMoreResults = (_b = (_a = searchResults.value[0]) === null || _a === void 0 ? void 0 : _a.hitsContainers[0]) === null || _b === void 0 ? void 0 : _b.moreResultsAvailable;
                        total = (_d = (_c = searchResults.value[0]) === null || _c === void 0 ? void 0 : _c.hitsContainers[0]) === null || _d === void 0 ? void 0 : _d.total;
                        fields = (_g = (_f = (_e = searchResults.value[0]) === null || _e === void 0 ? void 0 : _e.hitsContainers[0]) === null || _f === void 0 ? void 0 : _f.hits) === null || _g === void 0 ? void 0 : _g.map(function (hit) {
                            var _a, _b;
                            return __assign(__assign({}, (_a = hit.resource) === null || _a === void 0 ? void 0 : _a.listItem.fields), { id: (_b = hit.resource) === null || _b === void 0 ? void 0 : _b.listItem.id });
                        });
                        return [2 /*return*/, { fields: fields, hasMoreResults: hasMoreResults, total: total }];
                    case 4:
                        error_1 = _h.sent();
                        console.error("[searchImages] error:", error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, [graphClient]);
    var getDriveItemDownloadUrl = React.useCallback(function (driveId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var client, driveItem, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!graphClient || !driveId || !itemId)
                        return [2 /*return*/, undefined];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api("/drives/".concat(driveId, "/items/").concat(itemId, "?select=@microsoft.graph.downloadUrl"))
                            .get()];
                case 3:
                    driveItem = _a.sent();
                    return [2 /*return*/, driveItem["@microsoft.graph.downloadUrl"]];
                case 4:
                    error_2 = _a.sent();
                    console.error("[getDriveItemDownloadUrl] error:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    var getSiteAssetsLibrary = React.useCallback(function (site) { return __awaiter(void 0, void 0, void 0, function () {
        var client, query, searchResults, fields, error_3;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!site || !graphClient)
                        return [2 /*return*/, undefined];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2:
                    client = _d.sent();
                    query = "path:".concat(site, "/SiteAssets");
                    return [4 /*yield*/, client.api("/search/query").post({
                            requests: [
                                {
                                    entityTypes: ["drive"],
                                    query: {
                                        queryString: query,
                                    },
                                    fields: [
                                        "editor",
                                        "driveId",
                                        "Title",
                                        "Path",
                                        "Filename",
                                        "FileExtension",
                                        "id",
                                        "name",
                                        "path",
                                        "parentReference",
                                    ],
                                },
                            ],
                        })];
                case 3:
                    searchResults = _d.sent();
                    fields = (_c = (_b = (_a = searchResults.value[0]) === null || _a === void 0 ? void 0 : _a.hitsContainers[0]) === null || _b === void 0 ? void 0 : _b.hits) === null || _c === void 0 ? void 0 : _c.map(function (hit) { return (__assign({}, hit.resource)); });
                    return [2 /*return*/, fields[0]];
                case 4:
                    error_3 = _d.sent();
                    console.error("[getSiteAssetsLibrary] error:", error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    return {
        searchImages: searchImages,
        getDriveItemDownloadUrl: getDriveItemDownloadUrl,
        getSiteAssetsLibrary: getSiteAssetsLibrary,
    };
};
//# sourceMappingURL=useGrapAPI.js.map