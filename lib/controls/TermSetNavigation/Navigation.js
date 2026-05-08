import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import * as strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { Nav, } from '@fluentui/react/lib/Nav';
import { Separator } from '@fluentui/react/lib/Separator';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { globalState } from './atoms/globalState';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { useGraphTaxonomyAPI } from './hooks/useGraphTaxonomyAPI';
import { useSessionStorage } from './hooks/useSessionStorage';
import { RenderLink } from './RenderLink';
import { RenderNoOptions } from './RenderNoOptions';
import { useNavigationStyles } from './useNavigationStyles';
import { useTaxonomyUtils } from './utils/useTaxonomyUtils';
import { useUtils } from './utils/useUtils';
export var Navigation = function (props) {
    var _a, _b;
    var context = props.context, termSetId = props.termSetId;
    var _c = useAtom(globalState), appGlobalState = _c[0], setAppGlobalState = _c[1];
    var _d = appGlobalState || {}, isLoadingNavitionTree = _d.isLoadingNavitionTree, refreshNavigationTree = _d.refreshNavigationTree, showContextMenu = _d.showContextMenu, onSelected = _d.onSelected;
    var navStyles = useNavigationStyles().navStyles;
    var pageContext = (context || {}).pageContext;
    var site = (pageContext || {}).site;
    var _e = useGraphTaxonomyAPI(context), getTermSetChildren = _e.getTermSetChildren, getTermSet = _e.getTermSet;
    var isLoadedTermSetsRef = React.useRef(false);
    var createItems = useTaxonomyUtils(context).createItems;
    var _f = React.useState([]), navLinksGroup = _f[0], setNavLinksGroup = _f[1];
    var selectedItem = appGlobalState.selectedItem;
    var navRef = React.useRef(null);
    var getCacheKey = useUtils().getCacheKey;
    var getSessionStorageItem = useSessionStorage()[0];
    var _g = React.useState(null), termSetInfo = _g[0], setTermSetInfo = _g[1];
    var _h = React.useState(null), error = _h[0], setError = _h[1];
    var loadNavLinks = React.useCallback(function (refresh) { return __awaiter(void 0, void 0, void 0, function () {
        var termSetChildren, navItems, navGroup;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!site)
                        return [2 /*return*/];
                    setError(null);
                    setAppGlobalState(function (state) { return (__assign(__assign({}, state), { isLoadingNavitionTree: true })); });
                    isLoadedTermSetsRef.current = true;
                    return [4 /*yield*/, getTermSetChildren(site === null || site === void 0 ? void 0 : site.id.toString(), termSetId, refresh)];
                case 1:
                    termSetChildren = _a.sent();
                    return [4 /*yield*/, createItems(site === null || site === void 0 ? void 0 : site.id.toString(), termSetId, termSetChildren, 0, refresh)];
                case 2:
                    navItems = _a.sent();
                    navGroup = { groupData: { termSet: termSetId }, links: navItems };
                    setNavLinksGroup(function (state) { return __spreadArray(__spreadArray([], state, true), [navGroup], false); });
                    setAppGlobalState(function (state) { return (__assign(__assign({}, state), { selectedItem: selectedItem !== null && selectedItem !== void 0 ? selectedItem : navItems[0], isLoadingNavitionTree: false, refreshNavigationTree: false })); });
                    return [2 /*return*/];
            }
        });
    }); }, [
        selectedItem,
        site,
        getSessionStorageItem,
        getCacheKey,
        getTermSetChildren,
        createItems,
        setAppGlobalState,
        termSetId,
    ]);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var termSetInfo_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, 5, 6]);
                        if (!!isLoadedTermSetsRef.current) return [3 /*break*/, 3];
                        return [4 /*yield*/, getTermSet(site === null || site === void 0 ? void 0 : site.id.toString(), termSetId)];
                    case 1:
                        termSetInfo_1 = _a.sent();
                        setTermSetInfo(termSetInfo_1);
                        return [4 /*yield*/, loadNavLinks(false)];
                    case 2:
                        _a.sent();
                        isLoadedTermSetsRef.current = true;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        setError(error_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setAppGlobalState(function (state) { return (__assign(__assign({}, state), { isLoadingNavitionTree: false })); });
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); })();
    }, []);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshNavigationTree) return [3 /*break*/, 2];
                        setNavLinksGroup([]);
                        return [4 /*yield*/, loadNavLinks(refreshNavigationTree)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); })();
    }, [refreshNavigationTree]);
    var onRenderLink = React.useCallback(function (link) {
        return React.createElement(RenderLink, { link: link, showContextMenu: showContextMenu });
    }, [showContextMenu]);
    var onLinkClick = React.useCallback(function (ev, item) {
        ev.preventDefault();
        setAppGlobalState(function (state) { return (__assign(__assign({}, state), { selectedItem: item })); });
        if (onSelected) {
            onSelected(item.data);
        }
    }, [selectedItem, setAppGlobalState]);
    var hasLinks = React.useMemo(function () {
        var _a, _b;
        return ((_b = (_a = navLinksGroup[0]) === null || _a === void 0 ? void 0 : _a.links) === null || _b === void 0 ? void 0 : _b.length) > 0;
    }, [navLinksGroup]);
    var hasError = React.useMemo(function () {
        return error !== null || termSetInfo === null;
    }, [error, termSetInfo]);
    if (isLoadingNavitionTree)
        return React.createElement(Spinner, { ariaLive: "assertive" });
    if (hasError)
        return (React.createElement(ErrorMessage, { showError: hasError, errorMessage: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : strings.TermSertNaviagtionErrorMessage }));
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { horizontalAlign: "stretch", tokens: { childrenGap: 0 } },
            React.createElement(Text, { variant: "large" }, (_b = termSetInfo === null || termSetInfo === void 0 ? void 0 : termSetInfo.localizedNames[0].name) !== null && _b !== void 0 ? _b : ""),
            React.createElement(Separator, null),
            hasLinks ? (React.createElement(Nav, { componentRef: navRef, ariaLabel: "navigation", styles: navStyles, groups: navLinksGroup, onRenderLink: onRenderLink, selectedKey: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.key, onLinkClick: onLinkClick })) : (React.createElement(RenderNoOptions, null)))));
};
//# sourceMappingURL=Navigation.js.map