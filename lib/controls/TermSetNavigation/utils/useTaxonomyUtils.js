import { __awaiter, __generator } from "tslib";
import * as React from 'react';
import { useGraphTaxonomyAPI } from '../hooks/useGraphTaxonomyAPI';
export var useTaxonomyUtils = function (context) {
    var getTermChildren = useGraphTaxonomyAPI(context).getTermChildren;
    var createChildren = React.useCallback(function (siteId, termSetId, term, level, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var navLinkGroups, navLink, termChildren, _i, termChildren_1, termChild;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    navLinkGroups = [];
                    navLink = {};
                    return [4 /*yield*/, getTermChildren(siteId, termSetId, term.id, refreshCache)];
                case 1:
                    termChildren = _b.sent();
                    _i = 0, termChildren_1 = termChildren;
                    _b.label = 2;
                case 2:
                    if (!(_i < termChildren_1.length)) return [3 /*break*/, 5];
                    termChild = termChildren_1[_i];
                    _a = {
                        isExpanded: true,
                        name: termChild.labels[0].name,
                        key: termChild.id,
                        url: ""
                    };
                    return [4 /*yield*/, createChildren(siteId, termSetId, termChild, level + 1, refreshCache)];
                case 3:
                    navLink = (_a.links = _b.sent(),
                        _a.data = termChild,
                        _a);
                    navLinkGroups.push(navLink);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, navLinkGroups];
            }
        });
    }); }, [getTermChildren]);
    var createItems = React.useCallback(function (siteId, termSetId, terms, level, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var navLinks, _i, terms_1, term, navLink;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    navLinks = ([]);
                    _i = 0, terms_1 = terms;
                    _b.label = 1;
                case 1:
                    if (!(_i < terms_1.length)) return [3 /*break*/, 4];
                    term = terms_1[_i];
                    _a = {
                        name: term.labels[0].name,
                        key: term.id,
                        url: ""
                    };
                    return [4 /*yield*/, createChildren(siteId, termSetId, term, level + 1, refreshCache)];
                case 2:
                    navLink = (_a.links = _b.sent(),
                        _a.isExpanded = true,
                        _a.data = term,
                        _a);
                    navLinks.push(navLink);
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, navLinks];
            }
        });
    }); }, [getTermChildren, createChildren]);
    return { createItems: createItems, createChildren: createChildren };
};
//# sourceMappingURL=useTaxonomyUtils.js.map