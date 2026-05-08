import { __awaiter, __generator } from "tslib";
import { SPHttpClient } from '@microsoft/sp-http';
import { findIndex } from "@microsoft/sp-lodash-subset";
import { sp } from '@pnp/sp';
import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { PrincipalType } from "../PeoplePicker";
/**
 * Service implementation to search people in SharePoint
 */
var SPPeopleSearchService = /** @class */ (function () {
    /**
     * Service constructor
     */
    function SPPeopleSearchService(context, substrateSearchEnabled) {
        this.context = context;
        this.substrateSearchEnabled = substrateSearchEnabled;
        this.cachedLocalUsers = {};
        this.cachedLocalUsers[context.absoluteUrl] = [];
        // Setup PnPjs
        sp.setup({ pageContext: {
                web: {
                    absoluteUrl: context.absoluteUrl
                }
            } });
    }
    /**
     * Generate the user photo link using SharePoint user photo endpoint.
     *
     * @param value
     */
    SPPeopleSearchService.prototype.generateUserPhotoLink = function (value) {
        return "".concat(this.context.absoluteUrl, "/_layouts/15/userphoto.aspx?accountname=").concat(encodeURIComponent(value), "&size=M");
    };
    /**
     * Generate sum of principal types
     *
     * PrincipalType controls the type of entities that are returned in the results.
     * Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
     * These values can be combined (example: 13 is security + SP groups + users)
     *
     * @param principalTypes
     */
    SPPeopleSearchService.prototype.getSumOfPrincipalTypes = function (principalTypes) {
        return !!principalTypes && principalTypes.length > 0 ? principalTypes.reduce(function (a, b) { return a + b; }, 0) : 1;
    };
    /**
     * Retrieve the specified group
     *
     * @param groupName
     * @param siteUrl
     */
    SPPeopleSearchService.prototype.getGroupId = function (groupName_1) {
        return __awaiter(this, arguments, void 0, function (groupName, siteUrl) {
            var groups;
            if (siteUrl === void 0) { siteUrl = null; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchTenant(siteUrl, groupName, 1, [PrincipalType.SharePointGroup], false, false, 0)];
                    case 1:
                        groups = _a.sent();
                        return [2 /*return*/, (groups && groups.length > 0) ? parseInt(groups[0].id) : undefined];
                }
            });
        });
    };
    /**
     * Search person by its email or login name
     */
    SPPeopleSearchService.prototype.searchPersonByEmailOrLogin = function (email_1, principalTypes_1) {
        return __awaiter(this, arguments, void 0, function (email, principalTypes, siteUrl, groupId, ensureUser, allowUnvalidated) {
            var userResults, _i, groupId_1, id, tmpResults, logins_1, filteredUserResults, userResults;
            if (siteUrl === void 0) { siteUrl = null; }
            if (groupId === void 0) { groupId = null; }
            if (ensureUser === void 0) { ensureUser = false; }
            if (allowUnvalidated === void 0) { allowUnvalidated = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(groupId)) return [3 /*break*/, 5];
                        userResults = [];
                        _i = 0, groupId_1 = groupId;
                        _a.label = 1;
                    case 1:
                        if (!(_i < groupId_1.length)) return [3 /*break*/, 4];
                        id = groupId_1[_i];
                        return [4 /*yield*/, this.searchTenant(siteUrl, email, 1, principalTypes, ensureUser, allowUnvalidated, id)];
                    case 2:
                        tmpResults = _a.sent();
                        userResults = userResults.concat(tmpResults);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        logins_1 = userResults.map(function (u) { return u.loginName; });
                        filteredUserResults = userResults.filter(function (_a, index) {
                            var loginName = _a.loginName;
                            return !logins_1.includes(loginName, index + 1);
                        });
                        return [2 /*return*/, (filteredUserResults && filteredUserResults.length > 0) ? filteredUserResults[0] : null];
                    case 5: return [4 /*yield*/, this.searchTenant(siteUrl, email, 1, principalTypes, ensureUser, allowUnvalidated, groupId)];
                    case 6:
                        userResults = _a.sent();
                        return [2 /*return*/, (userResults && userResults.length > 0) ? userResults[0] : null];
                }
            });
        });
    };
    /**
     * Search All Users from the SharePoint People database
     */
    SPPeopleSearchService.prototype.searchPeople = function (query_1, maximumSuggestions_1, principalTypes_1) {
        return __awaiter(this, arguments, void 0, function (query, maximumSuggestions, principalTypes, siteUrl, groupId, ensureUser, allowUnvalidated) {
            var userResults, _i, groupId_2, id, tmpResults, logins_2, filteredUserResults;
            if (siteUrl === void 0) { siteUrl = null; }
            if (groupId === void 0) { groupId = null; }
            if (ensureUser === void 0) { ensureUser = false; }
            if (allowUnvalidated === void 0) { allowUnvalidated = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!Array.isArray(groupId)) return [3 /*break*/, 5];
                        userResults = [];
                        _i = 0, groupId_2 = groupId;
                        _a.label = 1;
                    case 1:
                        if (!(_i < groupId_2.length)) return [3 /*break*/, 4];
                        id = groupId_2[_i];
                        return [4 /*yield*/, this.searchTenant(siteUrl, query, maximumSuggestions, principalTypes, ensureUser, allowUnvalidated, id)];
                    case 2:
                        tmpResults = _a.sent();
                        userResults = userResults.concat(tmpResults);
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        logins_2 = userResults.map(function (u) { return u.loginName; });
                        filteredUserResults = userResults.filter(function (_a, index) {
                            var loginName = _a.loginName;
                            return !logins_2.includes(loginName, index + 1);
                        });
                        return [2 /*return*/, filteredUserResults];
                    case 5: return [4 /*yield*/, this.searchTenant(siteUrl, query, maximumSuggestions, principalTypes, ensureUser, allowUnvalidated, groupId)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Tenant search
     */
    SPPeopleSearchService.prototype.searchTenant = function (siteUrl, query, maximumSuggestions, principalTypes, ensureUser, allowUnvalidated, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var userRequestUrl, searchBody, graphUserRequestUrl, graphClient, graphUserResponse, _users_2, batch, _i, _a, value, userResult, _b, _users_1, user, httpPostOptions, data, userDataResp, values, _c, values_1, value, id, userResults, _d;
            var _this = this;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 14, , 15]);
                        userRequestUrl = "".concat(siteUrl || this.context.absoluteUrl, "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser");
                        searchBody = {
                            queryParams: {
                                AllowEmailAddresses: true,
                                AllowMultipleEntities: false,
                                AllUrlZones: false,
                                MaximumEntitySuggestions: maximumSuggestions,
                                PrincipalSource: 15,
                                PrincipalType: this.getSumOfPrincipalTypes(principalTypes),
                                QueryString: query,
                                UseSubstrateSearch: (_e = this.substrateSearchEnabled) !== null && _e !== void 0 ? _e : false
                            }
                        };
                        // Search on the local site when "0"
                        if (siteUrl) {
                            searchBody.queryParams.SharePointGroupID = 0;
                        }
                        if (!(groupId && typeof (groupId) === 'number')) return [3 /*break*/, 1];
                        searchBody.queryParams.SharePointGroupID = groupId;
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(groupId && typeof (groupId) === 'string')) return [3 /*break*/, 6];
                        graphUserRequestUrl = "/groups/".concat(groupId, "/transitiveMembers?$count=true&$search=\"userPrincipalName:").concat(query, "\" OR \"displayName:").concat(query, "\" OR \"mail:").concat(query, "\"");
                        return [4 /*yield*/, this.context.msGraphClientFactory.getClient("3")];
                    case 2:
                        graphClient = _f.sent();
                        return [4 /*yield*/, graphClient.api(graphUserRequestUrl).header('ConsistencyLevel', 'eventual').get()];
                    case 3:
                        graphUserResponse = _f.sent();
                        if (!(graphUserResponse.value && graphUserResponse.value.length > 0)) return [3 /*break*/, 5];
                        _users_2 = [];
                        batch = Web(this.context.absoluteUrl).createBatch();
                        for (_i = 0, _a = graphUserResponse.value; _i < _a.length; _i++) {
                            value = _a[_i];
                            sp.web.inBatch(batch).ensureUser(value.userPrincipalName).then(function (u) { return _users_2.push(u.data); }).catch(function () {
                                // no-op
                            });
                        }
                        return [4 /*yield*/, batch.execute()];
                    case 4:
                        _f.sent();
                        userResult = [];
                        for (_b = 0, _users_1 = _users_2; _b < _users_1.length; _b++) {
                            user = _users_1[_b];
                            userResult.push({
                                id: ensureUser ? user.Id : user.LoginName,
                                loginName: user.LoginName,
                                imageUrl: this.generateUserPhotoLink(user.Email),
                                imageInitials: this.getFullNameInitials(user.Title),
                                text: user.Title, // name
                                secondaryText: user.Email, // email
                                tertiaryText: '', // status
                                optionalText: '' // anything
                            });
                        }
                        return [2 /*return*/, userResult];
                    case 5: 
                    //Nothing to return
                    return [2 /*return*/, []];
                    case 6:
                        httpPostOptions = {
                            headers: {
                                'accept': 'application/json',
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(searchBody)
                        };
                        return [4 /*yield*/, this.context.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions)];
                    case 7:
                        data = _f.sent();
                        if (!data.ok) return [3 /*break*/, 13];
                        return [4 /*yield*/, data.json()];
                    case 8:
                        userDataResp = _f.sent();
                        if (!(userDataResp && userDataResp.value && userDataResp.value.length > 0)) return [3 /*break*/, 13];
                        values = userDataResp.value;
                        if (typeof userDataResp.value === "string") {
                            values = JSON.parse(userDataResp.value);
                        }
                        // Filter out "UNVALIDATED_EMAIL_ADDRESS"
                        if (!allowUnvalidated) {
                            values = values.filter(function (v) { return !(v.EntityData && v.EntityData.PrincipalType && v.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"); }); // eslint-disable-line @typescript-eslint/no-explicit-any
                        }
                        if (!ensureUser) return [3 /*break*/, 12];
                        _c = 0, values_1 = values;
                        _f.label = 9;
                    case 9:
                        if (!(_c < values_1.length)) return [3 /*break*/, 12];
                        value = values_1[_c];
                        if (!(!value.EntityData || (value.EntityData && typeof value.EntityData.SPGroupID === "undefined" && value.EntityData.PrincipalType !== "UNVALIDATED_EMAIL_ADDRESS"))) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.ensureUser(value.Key, siteUrl || this.context.absoluteUrl)];
                    case 10:
                        id = _f.sent();
                        value.LoginName = value.Key;
                        value.Key = id;
                        _f.label = 11;
                    case 11:
                        _c++;
                        return [3 /*break*/, 9];
                    case 12:
                        // Filter out NULL keys
                        values = values.filter(function (v) { return v.Key !== null; }); // eslint-disable-line @typescript-eslint/no-explicit-any
                        userResults = values.map(function (element) {
                            var _a, _b;
                            var accountName = element.Description || "";
                            var email = ((_a = element.EntityData) === null || _a === void 0 ? void 0 : _a.Email) || element.Description;
                            var secondaryText = ((_b = element.EntityData) === null || _b === void 0 ? void 0 : _b.Email) || element.ProviderName;
                            switch (element.EntityType) {
                                case 'User':
                                    return {
                                        id: element.Key,
                                        loginName: element.LoginName ? element.LoginName : element.Key,
                                        imageUrl: _this.generateUserPhotoLink(accountName),
                                        imageInitials: _this.getFullNameInitials(element.DisplayText),
                                        text: element.DisplayText, // name
                                        secondaryText: email, // email
                                        tertiaryText: "", // status
                                        optionalText: "" // anything
                                    };
                                case 'SecGroup':
                                    return {
                                        id: element.Key,
                                        loginName: element.LoginName ? element.LoginName : element.Key,
                                        imageInitials: _this.getFullNameInitials(element.DisplayText),
                                        text: element.DisplayText,
                                        secondaryText: secondaryText,
                                    };
                                case 'FormsRole':
                                    return {
                                        id: element.Key,
                                        loginName: element.LoginName ? element.LoginName : element.Key,
                                        imageInitials: _this.getFullNameInitials(element.DisplayText),
                                        text: element.DisplayText,
                                        secondaryText: element.ProviderName
                                    };
                                default:
                                    return {
                                        id: element.EntityData.SPGroupID,
                                        loginName: element.EntityData.AccountName,
                                        imageInitials: _this.getFullNameInitials(element.DisplayText),
                                        text: element.DisplayText,
                                        secondaryText: element.EntityData.AccountName,
                                        userUnvalidated: element.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"
                                    };
                            }
                        });
                        return [2 /*return*/, userResults];
                    case 13: 
                    // Nothing to return
                    return [2 /*return*/, []];
                    case 14:
                        _d = _f.sent();
                        console.error("PeopleSearchService::searchTenant: error occured while fetching the users.");
                        return [2 /*return*/, []];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves the local user ID
     *
     * @param userId
     * @param siteUrl
     */
    SPPeopleSearchService.prototype.ensureUser = function (userId, siteUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var users, userIdx, restApi, data, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // const siteUrl = this.context.pageContext.web.absoluteUrl;
                        if (this.cachedLocalUsers && this.cachedLocalUsers[siteUrl]) {
                            users = this.cachedLocalUsers[siteUrl];
                            userIdx = findIndex(users, function (u) { return u.LoginName === userId; });
                            if (userIdx !== -1) {
                                return [2 /*return*/, users[userIdx].Id];
                            }
                        } //initialize the array if it doesnt exist with the siteUrl
                        else if (!this.cachedLocalUsers[siteUrl]) {
                            this.cachedLocalUsers[siteUrl] = [];
                        }
                        restApi = "".concat(siteUrl, "/_api/web/ensureuser");
                        return [4 /*yield*/, this.context.spHttpClient.post(restApi, SPHttpClient.configurations.v1, {
                                body: JSON.stringify({ 'logonName': userId })
                            })];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        user = _a.sent();
                        if (user && user.Id) {
                            this.cachedLocalUsers[siteUrl].push(user);
                            return [2 /*return*/, user.Id];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Generates Initials from a full name
     */
    SPPeopleSearchService.prototype.getFullNameInitials = function (fullName) {
        if (fullName === null) {
            return fullName;
        }
        var words = fullName.split(' ');
        if (words.length === 0) {
            return '';
        }
        else if (words.length === 1) {
            return words[0].charAt(0);
        }
        else {
            return (words[0].charAt(0) + words[1].charAt(0));
        }
    };
    return SPPeopleSearchService;
}());
export default SPPeopleSearchService;
//# sourceMappingURL=PeopleSearchService.js.map