import { __awaiter, __generator } from "tslib";
import { SPHttpClient } from '@microsoft/sp-http';
var ListItemRepository = /** @class */ (function () {
    function ListItemRepository(SiteUrl, SPClient) {
        this.SiteUrl = SiteUrl;
        this.SPClient = SPClient;
    }
    /**
     *
     * @param filterText text value of the filter part of oData query 'Id eq 1'
     * @param listId
     * @param internalColumnName
     * @param keyInternalColumnName
     * @param webUrl
     * @param top
     * @param orderBy text value of the filter part of oData query 'Title desc, Created'
     */
    ListItemRepository.prototype.getListItemsByFilterClause = function (filterText, listId, internalColumnName, keyInternalColumnName, webUrl, top, orderBy) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this.SiteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/items?$select=").concat(keyInternalColumnName || 'Id', ",").concat(internalColumnName, "&$filter=").concat(filterText, "&$top=").concat(top);
                        if (orderBy) {
                            apiUrl += "&$orderBy=".concat(orderBy);
                        }
                        return [4 /*yield*/, this.SPClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results && results.value && results.value.length > 0) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, []];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ListItemRepository.prototype.getListId = function (listName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this.SiteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists/getByTitle(@listName)/Id?@listName='").concat(encodeURIComponent(listName), "'");
                        return [4 /*yield*/, this.SPClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ListItemRepository;
}());
export { ListItemRepository };
//# sourceMappingURL=ListItemRepository.js.map