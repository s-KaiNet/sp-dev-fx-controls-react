import { __awaiter, __generator } from "tslib";
import { MSGraphClientFactory } from "@microsoft/sp-http";
import { useCallback, useContext } from "react";
import { AppContext } from "../common";
export var useMsGraphAPI = function () {
    var serviceScope = useContext(AppContext).serviceScope;
    var _msGraphClient = undefined;
    serviceScope.whenFinished(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, serviceScope.consume(MSGraphClientFactory.serviceKey).getClient("3")];
                case 1:
                    _msGraphClient = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var getSuggestions = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _users, suggestedUsersResults, _sugestions, _i, _sugestions_1, sugestion, returnInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!_msGraphClient)
                        return [2 /*return*/];
                    _users = [];
                    return [4 /*yield*/, _msGraphClient
                            .api("me/people")
                            .header("ConsistencyLevel", "eventual")
                            .filter("personType/class eq 'Person' and personType/subclass eq 'OrganizationUser'")
                            .orderby("displayName")
                            .get()];
                case 1:
                    suggestedUsersResults = (_a.sent());
                    console.log("rs", suggestedUsersResults);
                    _sugestions = suggestedUsersResults.value;
                    for (_i = 0, _sugestions_1 = _sugestions; _i < _sugestions_1.length; _i++) {
                        sugestion = _sugestions_1[_i];
                        _users.push({
                            displayName: sugestion.displayName,
                            givenName: sugestion.givenName,
                            id: sugestion.id,
                            mail: sugestion.scoredEmailAddresses[0].address,
                        });
                    }
                    returnInfo = {
                        users: _users,
                        hasMore: false,
                        nextLink: undefined,
                    };
                    return [2 /*return*/, returnInfo];
            }
        });
    }); }, [_msGraphClient]);
    var getUsers = useCallback(function (search) { return __awaiter(void 0, void 0, void 0, function () {
        var _filter, usersResults, returnInfo;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!_msGraphClient || !search)
                        return [2 /*return*/];
                    _filter = "";
                    if (search.length) {
                        _filter = "mail ne null AND (startswith(mail,'".concat(search, "') OR startswith(displayName,'").concat(search, "'))");
                    }
                    return [4 /*yield*/, _msGraphClient
                            .api("/users")
                            .header("ConsistencyLevel", "eventual")
                            .filter(_filter)
                            .orderby("displayName")
                            .count(true)
                            .top(25)
                            .get()];
                case 1:
                    usersResults = _b.sent();
                    returnInfo = {
                        users: usersResults.value,
                        hasMore: usersResults["@odata.nextLink"] ? true : false,
                        nextLink: (_a = usersResults["@odata.nextLink"]) !== null && _a !== void 0 ? _a : undefined,
                    };
                    return [2 /*return*/, returnInfo];
            }
        });
    }); }, [_msGraphClient]);
    var getUsersNextPage = useCallback(function (nextLink) { return __awaiter(void 0, void 0, void 0, function () {
        var usersResults, returnInfo;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!_msGraphClient)
                        return [2 /*return*/];
                    return [4 /*yield*/, _msGraphClient.api("".concat(nextLink)).get()];
                case 1:
                    usersResults = _b.sent();
                    returnInfo = {
                        users: usersResults.value,
                        hasMore: usersResults["@odata.nextLink"] ? true : false,
                        nextLink: (_a = usersResults["@odata.nextLink"]) !== null && _a !== void 0 ? _a : undefined,
                    };
                    return [2 /*return*/, returnInfo];
            }
        });
    }); }, [_msGraphClient]);
    return { getUsers: getUsers, getUsersNextPage: getUsersNextPage, getSuggestions: getSuggestions };
};
//# sourceMappingURL=useMsGraphAPI.js.map