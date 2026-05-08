/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { TERM_CHILDREN_KEY, TERMSETS_CHILDREN_KEY, TERMSETS_LIST_KEY, } from '../constants/constants';
import { useUtils } from '../utils/useUtils';
import { useSessionStorage } from './useSessionStorage';
export var useGraphTaxonomyAPI = function (context) {
    var _a = useSessionStorage(), getSessionStorageItem = _a[0], setSessionStorageItem = _a[1];
    var getCacheKey = useUtils().getCacheKey;
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
    var getTermSetChildren = React.useCallback(function (siteId, termSetId, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var cacheKey, cachedTermSet, response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!graphClient && !siteId && !termSetId)
                        return [2 /*return*/, undefined];
                    cacheKey = getCacheKey(TERMSETS_CHILDREN_KEY, termSetId);
                    cachedTermSet = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTermSet = getSessionStorageItem(cacheKey);
                        if (cachedTermSet) {
                            return [2 /*return*/, cachedTermSet];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId, "/Children")).select("id,createdDateTime,labels,lastModifiedDateTime,properties").get())];
                case 3:
                    response = _c.sent();
                    setSessionStorageItem(cacheKey, response === null || response === void 0 ? void 0 : response.value);
                    return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.value) !== null && _b !== void 0 ? _b : undefined];
                case 4:
                    error_1 = _c.sent();
                    console.log("[getTermSetTerms] error:", error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    var getTermChildren = React.useCallback(function (siteId, termSetId, termId, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var cacheKey, cachedTerm, response, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!graphClient && !siteId && !termSetId && termId)
                        return [2 /*return*/, undefined];
                    cacheKey = getCacheKey(TERM_CHILDREN_KEY, termId);
                    cachedTerm = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTerm = getSessionStorageItem(cacheKey);
                        if (cachedTerm) {
                            return [2 /*return*/, cachedTerm];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId, "/terms/").concat(termId, "/children")).select("id,createdDateTime,labels,lastModifiedDateTime,properties").get())];
                case 3:
                    response = _c.sent();
                    setSessionStorageItem(cacheKey, response === null || response === void 0 ? void 0 : response.value);
                    return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.value) !== null && _b !== void 0 ? _b : undefined];
                case 4:
                    error_2 = _c.sent();
                    console.log("[getTermChildren] error:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getCacheKey, getSessionStorageItem, setSessionStorageItem]);
    var getTermSets = React.useCallback(function (siteId, query, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var instanceId, cacheKey, cachedTermSets, response, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!graphClient && !siteId)
                        return [2 /*return*/, []];
                    instanceId = context.instanceId;
                    cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTermSets = [];
                        cachedTermSets = getSessionStorageItem(cacheKey);
                        if (cachedTermSets) {
                            return [2 /*return*/, cachedTermSets];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets")).filter(query !== null && query !== void 0 ? query : "").select("id,description,localizedNames,properties,createdDateTime").get())];
                case 3:
                    response = _b.sent();
                    setSessionStorageItem(cacheKey, response.value);
                    return [2 /*return*/, response ? response.value : []];
                case 4:
                    error_3 = _b.sent();
                    console.log("[getTermSets] error:", error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]);
    var getTermSet = React.useCallback(function (siteId, termSetId) { return __awaiter(void 0, void 0, void 0, function () {
        var instanceId, cachedTermSets, cacheKey, termset, response, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!graphClient && !siteId)
                        throw new Error("[getTermSet] error: Missing required parameters");
                    instanceId = context.instanceId;
                    cachedTermSets = [];
                    cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    cachedTermSets = getSessionStorageItem(cacheKey);
                    if (cachedTermSets) {
                        termset = cachedTermSets.find(function (termset) { return termset.id === termSetId; });
                        return [2 /*return*/, termset];
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId)).select("id,description,localizedNames,properties,createdDateTime").get())];
                case 3:
                    response = _b.sent();
                    return [2 /*return*/, response !== null && response !== void 0 ? response : undefined];
                case 4:
                    error_4 = _b.sent();
                    console.log("[getTermSet] error:", error_4);
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]);
    return {
        getTermSetChildren: getTermSetChildren,
        getTermChildren: getTermChildren,
        getTermSets: getTermSets,
        getTermSet: getTermSet,
    };
};
//# sourceMappingURL=useGraphTaxonomyAPI.js.map