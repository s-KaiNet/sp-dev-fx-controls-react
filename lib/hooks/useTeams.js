import { __awaiter, __generator } from "tslib";
import { MSGraphClientFactory } from '@microsoft/sp-http';
import { PageContext } from "@microsoft/sp-page-context";
import React from "react";
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export var useTeams = function (serviceScope) {
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
    var getMyTeams = React.useCallback(function (filter) { return __awaiter(void 0, void 0, void 0, function () {
        var teamsResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    if (!_msgGraphClient.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, _msgGraphClient.current
                            .api("/me/joinedTeams")
                            .filter(filter ? "startswith(toupper(displayName),toupper('".concat(filter, "'))") : "")
                            .select("id,displayName")
                            .get()];
                case 2:
                    teamsResults = _a.sent();
                    return [2 /*return*/, teamsResults.value];
            }
        });
    }); }, [init]);
    var getTeamChannels = React.useCallback(function (teamId, filter) { return __awaiter(void 0, void 0, void 0, function () {
        var teamsChannelResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    if (!_msgGraphClient.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, _msgGraphClient.current
                            .api("/teams/".concat(teamId, "/channels"))
                            .filter(filter ? "startswith(toupper(displayName),toupper('".concat(filter, "'))") : "")
                            .get()];
                case 2:
                    teamsChannelResults = _a.sent();
                    return [2 /*return*/, teamsChannelResults.value];
            }
        });
    }); }, [init]);
    var getTeamMembers = React.useCallback(function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
        var usersResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    if (!_msgGraphClient.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, _msgGraphClient.current
                            .api("/teams/".concat(teamId, "/members"))
                            .get()];
                case 2:
                    usersResults = _a.sent();
                    return [2 /*return*/, usersResults.value];
            }
        });
    }); }, [init]);
    var getTeamOwners = React.useCallback(function (teamId) { return __awaiter(void 0, void 0, void 0, function () {
        var usersResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, init()];
                case 1:
                    _a.sent();
                    if (!_msgGraphClient.current)
                        return [2 /*return*/];
                    return [4 /*yield*/, _msgGraphClient.current
                            .api("/teams/".concat(teamId, "/members"))
                            .filter("microsoft.graph.aadUserConversationMember/roles/any(c:c eq 'owner')")
                            .get()];
                case 2:
                    usersResults = _a.sent();
                    return [2 /*return*/, usersResults === null || usersResults === void 0 ? void 0 : usersResults.value];
            }
        });
    }); }, [init]);
    return {
        init: init,
        getMyTeams: getMyTeams,
        getTeamChannels: getTeamChannels,
        getTeamMembers: getTeamMembers,
        getTeamOwners: getTeamOwners
    };
};
//# sourceMappingURL=useTeams.js.map