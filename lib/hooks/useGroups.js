import { __awaiter, __generator } from "tslib";
import { MSGraphClientFactory } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import React from "react";
var escapeFilterValue = function (value) {
    return value.replace(/'/g, "''");
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export var useGroups = function (serviceScope) {
    var _pageContext = React.useRef();
    var _msgGraphClient = React.useRef();
    var init = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _pageContext.current = serviceScope.consume(PageContext.serviceKey);
                    _a = _msgGraphClient;
                    return [4 /*yield*/, serviceScope
                            .consume(MSGraphClientFactory.serviceKey)
                            .getClient("3")];
                case 1:
                    _a.current = _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [serviceScope]);
    var getGroups = React.useCallback(function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var api, groupResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    if (!_msgGraphClient.current)
                        return [2 /*return*/, []];
                    api = _msgGraphClient.current
                        .api("/groups")
                        .select("id,displayName,description,groupTypes,mailEnabled,mail,securityEnabled,visibility,resourceProvisioningOptions");
                    if (filter) {
                        api.filter("startswith(toupper(displayName),toupper('".concat(escapeFilterValue(filter), "'))"));
                    }
                    return [4 /*yield*/, api.get()];
                case 2:
                    groupResults = _a.sent();
                    return [2 /*return*/, groupResults.value];
            }
        });
    }); }, [init]);
    return {
        init: init,
        getGroups: getGroups,
    };
};
//# sourceMappingURL=useGroups.js.map