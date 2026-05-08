import { __awaiter, __generator } from "tslib";
import { Guid } from '@microsoft/sp-core-library';
import { LambdaParser } from '@pnp/odata/parsers';
import { SharePointQueryableCollection, sp } from '@pnp/sp';
import '@pnp/sp/taxonomy';
var SPTaxonomyService = /** @class */ (function () {
    function SPTaxonomyService(context) {
        this.context = context;
    }
    SPTaxonomyService.prototype.getTerms = function (termSetId_1, parentTermId_1, skiptoken_1, hideDeprecatedTerms_1) {
        return __awaiter(this, arguments, void 0, function (termSetId, parentTermId, skiptoken, hideDeprecatedTerms, pageSize) {
            var parser, legacyChildrenUrlAndQuery, legacyChildrenQueryable, termsResult, _a;
            var _this = this;
            if (pageSize === void 0) { pageSize = 50; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        parser = new LambdaParser(function (r) { return __awaiter(_this, void 0, void 0, function () {
                            var json, newSkiptoken, urlParams;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, r.json()];
                                    case 1:
                                        json = _a.sent();
                                        newSkiptoken = '';
                                        if (json['@odata.nextLink']) {
                                            urlParams = new URLSearchParams(json['@odata.nextLink'].split('?')[1]);
                                            if (urlParams.has('$skiptoken')) {
                                                newSkiptoken = urlParams.get('$skiptoken');
                                            }
                                        }
                                        return [2 /*return*/, { value: json.value, skiptoken: newSkiptoken }];
                                }
                            });
                        }); });
                        legacyChildrenUrlAndQuery = '';
                        if (parentTermId && parentTermId !== Guid.empty) {
                            legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).terms.getById(parentTermId.toString()).concat('/getLegacyChildren').toUrl();
                        }
                        else {
                            legacyChildrenUrlAndQuery = sp.termStore.sets.getById(termSetId.toString()).concat('/getLegacyChildren').toUrl();
                        }
                        legacyChildrenQueryable = SharePointQueryableCollection(legacyChildrenUrlAndQuery).top(pageSize).usingParser(parser);
                        if (hideDeprecatedTerms) {
                            legacyChildrenQueryable = legacyChildrenQueryable.filter('isDeprecated eq false');
                        }
                        if (skiptoken && skiptoken !== '') {
                            legacyChildrenQueryable.query.set('$skiptoken', skiptoken);
                        }
                        return [4 /*yield*/, legacyChildrenQueryable()];
                    case 1:
                        termsResult = _b.sent();
                        return [2 /*return*/, termsResult];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, { value: [], skiptoken: '' }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermById = function (termSetId, termId) {
        return __awaiter(this, void 0, void 0, function () {
            var termInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (termId === Guid.empty) {
                            return [2 /*return*/, undefined];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sp.termStore.sets.getById(termSetId.toString()).terms.getById(termId.toString()).expand("parent")()];
                    case 2:
                        termInfo = _b.sent();
                        return [2 /*return*/, termInfo];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, undefined];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.searchTerm = function (termSetId_1, label_1, languageTag_1, parentTermId_1) {
        return __awaiter(this, arguments, void 0, function (termSetId, label, languageTag, parentTermId, allowSelectingChildren, stringMatchOption, pageSize) {
            var query, searchTermUrl, searchTermQuery, filteredTerms, hasParentId, set, collection, childrenIds_1, _a;
            if (allowSelectingChildren === void 0) { allowSelectingChildren = true; }
            if (stringMatchOption === void 0) { stringMatchOption = 'StartsWith'; }
            if (pageSize === void 0) { pageSize = 50; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        query = [
                            "label='".concat(label, "'"),
                            "setId='".concat(termSetId, "'"),
                            "languageTag='".concat(languageTag, "'"),
                            "stringMatchOption='".concat(stringMatchOption, "'")
                        ];
                        if (parentTermId !== Guid.empty) {
                            query.push("parentTermId='".concat(parentTermId, "'"));
                        }
                        searchTermUrl = sp.termStore.concat("/searchTerm(".concat(query.join(','), ")")).toUrl();
                        searchTermQuery = SharePointQueryableCollection(searchTermUrl).top(pageSize);
                        return [4 /*yield*/, searchTermQuery()];
                    case 1:
                        filteredTerms = _b.sent();
                        if (!(allowSelectingChildren === false)) return [3 /*break*/, 3];
                        hasParentId = parentTermId !== Guid.empty;
                        set = sp.termStore.sets.getById(termSetId.toString());
                        collection = hasParentId ? set.terms.getById(parentTermId.toString()).children : set.children;
                        return [4 /*yield*/, collection.select("id").get().then(function (children) { return children.map(function (c) { return c.id; }); })];
                    case 2:
                        childrenIds_1 = _b.sent();
                        filteredTerms = filteredTerms.filter(function (term) { return childrenIds_1.includes(term.id); });
                        _b.label = 3;
                    case 3: return [2 /*return*/, filteredTerms];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermSetInfo = function (termSetId) {
        return __awaiter(this, void 0, void 0, function () {
            var tsInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.termStore.sets.getById(termSetId.toString()).get()];
                    case 1:
                        tsInfo = _a.sent();
                        return [2 /*return*/, tsInfo];
                }
            });
        });
    };
    SPTaxonomyService.prototype.getTermStoreInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var termStoreInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.termStore()];
                    case 1:
                        termStoreInfo = _a.sent();
                        return [2 /*return*/, termStoreInfo];
                }
            });
        });
    };
    return SPTaxonomyService;
}());
export { SPTaxonomyService };
//# sourceMappingURL=SPTaxonomyService.js.map