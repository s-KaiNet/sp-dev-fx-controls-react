import { __awaiter, __generator } from "tslib";
import { SPHttpClient } from '@microsoft/sp-http';
var getAllSitesInternal = function (ctx, queryText, trimDuplicates) { return __awaiter(void 0, void 0, void 0, function () {
    var startRow, rowLimit, totalRows, currentRows, values, searchRequest, requestUrl, searchResponse, sitesResponse, relevantResults, res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                startRow = 0;
                rowLimit = 500;
                totalRows = 0;
                currentRows = 0;
                values = [];
                searchRequest = {
                    QueryTemplate: queryText,
                    RowLimit: rowLimit,
                    TrimDuplicates: trimDuplicates,
                    SelectProperties: ['SiteId', 'SiteID', 'WebId', 'DepartmentId', 'Title', 'Path'],
                    StartRow: 0
                };
                requestUrl = "".concat(ctx.pageContext.web.absoluteUrl, "/_api/search/postquery");
                _b.label = 1;
            case 1:
                searchRequest.StartRow = startRow;
                return [4 /*yield*/, ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
                        body: JSON.stringify({ request: searchRequest }),
                        headers: {
                            'Accept': 'application/json;odata=nometadata',
                            'Content-Type': 'application/json;charset=utf-8',
                            'odata-version': '3.0'
                        }
                    })];
            case 2:
                searchResponse = _b.sent();
                return [4 /*yield*/, searchResponse.json()];
            case 3:
                sitesResponse = _b.sent();
                relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;
                values.push.apply(values, relevantResults.Table.Rows);
                totalRows = relevantResults.TotalRows;
                startRow += rowLimit;
                currentRows = (_a = relevantResults.Table.Rows) === null || _a === void 0 ? void 0 : _a.length;
                _b.label = 4;
            case 4:
                if (values.length < totalRows && currentRows !== 0) return [3 /*break*/, 1];
                _b.label = 5;
            case 5:
                res = [];
                res = values.map(function (element) {
                    var site = {};
                    element.Cells.forEach(function (cell) {
                        switch (cell.Key) {
                            case 'Title':
                                site.title = cell.Value;
                                break;
                            case 'Path':
                                site.url = cell.Value;
                                break;
                            case 'SiteId':
                            case 'SiteID':
                                site.id = cell.Value;
                                break;
                            case 'WebId':
                                site.webId = cell.Value;
                                break;
                            case 'DepartmentId':
                                if (cell.Value) {
                                    if (cell.Value.indexOf('{') === 0) {
                                        site.hubSiteId = cell.Value.slice(1, -1);
                                    }
                                    else {
                                        site.hubSiteId = cell.Value;
                                    }
                                }
                                break;
                        }
                    });
                    return site;
                });
                return [2 /*return*/, res];
        }
    });
}); };
export var getAllSites = function (ctx, includeWebs, currentSiteCollectionOnly, trimDuplicates, additionaQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var rootUrl, queryText;
    return __generator(this, function (_a) {
        rootUrl = ctx.pageContext.web.absoluteUrl;
        if (ctx.pageContext.web.serverRelativeUrl !== '/' && (!includeWebs || !currentSiteCollectionOnly)) {
            rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
        }
        queryText = "(contentclass:STS_Site".concat(includeWebs ? ' contentclass:STS_Web' : '', " Path:").concat(rootUrl, "*)");
        if (additionaQuery) {
            queryText += " AND (".concat(additionaQuery, ")");
        }
        return [2 /*return*/, getAllSitesInternal(ctx, queryText, trimDuplicates)];
    });
}); };
export var getHubSites = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var hubSites, requestUrl, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hubSites = [];
                requestUrl = "".concat(ctx.pageContext.site.absoluteUrl, "/_api/HubSites?$select=SiteId,ID,SiteUrl,Title");
                return [4 /*yield*/, ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                json.value.forEach(function (v) {
                    hubSites.push({
                        title: v.Title,
                        id: v.SiteId,
                        hubSiteId: v.ID,
                        url: v.SiteUrl
                    });
                });
                return [2 /*return*/, hubSites];
        }
    });
}); };
export var getSiteWebInfo = function (ctx, webUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var webInfo, siteInfo, webInfoResult, siteInfoResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.spHttpClient.get("".concat(webUrl, "/_api/web?$select=id,Title"), SPHttpClient.configurations.v1)];
            case 1:
                webInfo = _a.sent();
                if (!webInfo || !webInfo.ok) {
                    throw new Error("[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='".concat(webInfo.statusText, "'"));
                }
                return [4 /*yield*/, ctx.spHttpClient.get("".concat(webUrl, "/_api/site?$select=id"), SPHttpClient.configurations.v1)];
            case 2:
                siteInfo = _a.sent();
                if (!siteInfo || !siteInfo.ok) {
                    throw new Error("[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='".concat(webInfo.statusText, "'"));
                }
                return [4 /*yield*/, webInfo.json()];
            case 3:
                webInfoResult = _a.sent();
                return [4 /*yield*/, siteInfo.json()];
            case 4:
                siteInfoResult = _a.sent();
                return [2 /*return*/, {
                        title: webInfoResult.Title,
                        webId: webInfoResult.Id,
                        siteId: siteInfoResult.Id
                    }];
        }
    });
}); };
export var getAssociatedSites = function (ctx, trimDuplicates, hubSiteId) { return __awaiter(void 0, void 0, void 0, function () {
    var requestUrl, response, json, hubsiteData, queryText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!hubSiteId) return [3 /*break*/, 3];
                requestUrl = "".concat(ctx.pageContext.site.absoluteUrl, "/_api/web/HubsiteData");
                return [4 /*yield*/, ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                hubsiteData = JSON.parse(json.value);
                if (hubsiteData === null)
                    return [2 /*return*/, []];
                hubSiteId = hubsiteData.relatedHubSiteIds[0];
                _a.label = 3;
            case 3:
                queryText = "(contentclass:STS_Site DepartmentId:".concat(hubSiteId, ")");
                return [2 /*return*/, getAllSitesInternal(ctx, queryText, trimDuplicates)];
        }
    });
}); };
//# sourceMappingURL=SPSitesService.js.map