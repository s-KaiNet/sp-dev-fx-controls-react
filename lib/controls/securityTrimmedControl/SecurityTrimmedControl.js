import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { PermissionLevel } from '.';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import * as telemetry from '../../common/telemetry';
import { Spinner } from '@fluentui/react/lib/Spinner';
var SecurityTrimmedControl = /** @class */ (function (_super) {
    __extends(SecurityTrimmedControl, _super);
    function SecurityTrimmedControl(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            allowRender: false,
            loading: true
        };
        telemetry.track('SecurityTrimmedControl', {});
        return _this;
    }
    /**
     * componentDidMount lifecycle method
     */
    SecurityTrimmedControl.prototype.componentDidMount = function () {
        this.checkPermissions();
    };
    /**
     * componentDidUpdate lifecycle method
     */
    SecurityTrimmedControl.prototype.componentDidUpdate = function (prevProps, prevState) {
        // Check permissions only if necessary
        if (prevProps.level !== this.props.level ||
            prevProps.permissions !== this.props.permissions ||
            prevProps.relativeLibOrListUrl !== this.props.relativeLibOrListUrl ||
            prevProps.remoteSiteUrl !== this.props.remoteSiteUrl ||
            prevProps.folderPath !== this.props.folderPath ||
            prevProps.itemId !== this.props.itemId) {
            this.checkPermissions();
        }
    };
    /**
     * Check if the user has the permissions to render the element
     */
    SecurityTrimmedControl.prototype.checkPermissions = function () {
        var _a = this.props, context = _a.context, level = _a.level;
        // Check if the permission level needs to be checked on the current site
        if (level === PermissionLevel.currentWeb || level === PermissionLevel.currentList) {
            // Get the permission scope
            var permissions = (level === PermissionLevel.currentWeb ? context.pageContext.web : context.pageContext.list).permissions;
            // Check the user its permissions
            if (permissions.hasAllPermissions.apply(permissions, this.props.permissions)) {
                this.setState({
                    allowRender: true,
                    loading: false
                });
            }
            else {
                this.setState({
                    allowRender: false,
                    loading: false
                });
            }
        }
        else if (level === PermissionLevel.remoteWeb) {
            // Check permissions on remote site
            this.checkRemoteSitePermissions()
                .then(function () {
                // no-op;
            }).catch(function () {
                // no-op;
            });
        }
        else if (level === PermissionLevel.remoteListOrLib) {
            // Check permissions on remote list/library
            this.checkRemoteListOrLibPermissions()
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        }
        else if (level === PermissionLevel.remoteListItem) {
            this.checkRemoteListItem()
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        }
        else if (level === PermissionLevel.remoteFolder) {
            this.checkRemoteFolder()
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        }
    };
    /**
     * Check the user its permissions on the remote site
     */
    SecurityTrimmedControl.prototype.checkRemoteSitePermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, remoteSiteUrl, permissions, _i, permissions_1, permission, apiUrl, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, remoteSiteUrl = _a.remoteSiteUrl, permissions = _a.permissions;
                        if (!(remoteSiteUrl && permissions)) return [3 /*break*/, 5];
                        _i = 0, permissions_1 = permissions;
                        _b.label = 1;
                    case 1:
                        if (!(_i < permissions_1.length)) return [3 /*break*/, 4];
                        permission = permissions_1[_i];
                        apiUrl = "".concat(remoteSiteUrl, "/_api/web/DoesUserHavePermissions(@v)?@v=").concat(JSON.stringify(permission.value));
                        return [4 /*yield*/, context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1).then(function (data) { return data.json(); })];
                    case 2:
                        result = _b.sent();
                        // Check if a result was retrieved
                        if (result) {
                            // Check if an error was retrieved
                            if (result.error) {
                                // Do not allow rendering when there was an error
                                this.setState({
                                    allowRender: false,
                                    loading: false
                                });
                                console.error("Error retrieved while checking user's remote site permissions.");
                                return [2 /*return*/];
                            }
                            // Check the result value
                            if (typeof result.value !== "undefined" && result.value === false) {
                                this.setState({
                                    allowRender: false,
                                    loading: false
                                });
                                return [2 /*return*/];
                            }
                        }
                        else {
                            this.setState({
                                allowRender: false,
                                loading: false
                            });
                            console.error("No result value was retrieved when checking the user's remote site permissions.");
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // Render the controls when the permissions were OK for the user
                        this.setState({
                            allowRender: true,
                            loading: false
                        });
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check the user its permissions on the remote list or library
     */
    SecurityTrimmedControl.prototype.checkRemoteListOrLibPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remoteSiteUrl, relativeLibOrListUrl, permissions, apiUrl, hasPermissions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, remoteSiteUrl = _a.remoteSiteUrl, relativeLibOrListUrl = _a.relativeLibOrListUrl, permissions = _a.permissions;
                        if (!(remoteSiteUrl && relativeLibOrListUrl && permissions)) return [3 /*break*/, 2];
                        apiUrl = "".concat(remoteSiteUrl, "/_api/web/GetList(@listUrl)/EffectiveBasePermissions?@listUrl='").concat(encodeURIComponent(relativeLibOrListUrl), "'");
                        return [4 /*yield*/, this.checkRemotePermissions(apiUrl)];
                    case 1:
                        hasPermissions = _b.sent();
                        this.setState({
                            allowRender: hasPermissions,
                            loading: false
                        });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check permissions on item level
     */
    SecurityTrimmedControl.prototype.checkRemoteListItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remoteSiteUrl, relativeLibOrListUrl, permissions, itemId, apiUrl, hasPermissions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, remoteSiteUrl = _a.remoteSiteUrl, relativeLibOrListUrl = _a.relativeLibOrListUrl, permissions = _a.permissions, itemId = _a.itemId;
                        if (!(remoteSiteUrl && relativeLibOrListUrl && permissions && itemId)) return [3 /*break*/, 2];
                        apiUrl = "".concat(remoteSiteUrl, "/_api/web/GetList(@listUrl)/Items(").concat(itemId, ")/EffectiveBasePermissions?@listUrl='").concat(encodeURIComponent(relativeLibOrListUrl), "'");
                        return [4 /*yield*/, this.checkRemotePermissions(apiUrl)];
                    case 1:
                        hasPermissions = _b.sent();
                        this.setState({
                            allowRender: hasPermissions,
                            loading: false
                        });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check permissions on folder
     */
    SecurityTrimmedControl.prototype.checkRemoteFolder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, remoteSiteUrl, relativeLibOrListUrl, permissions, folderPath, folderByServerRelativeUrl, apiUrl, hasPermissions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, remoteSiteUrl = _a.remoteSiteUrl, relativeLibOrListUrl = _a.relativeLibOrListUrl, permissions = _a.permissions, folderPath = _a.folderPath;
                        if (!(remoteSiteUrl && relativeLibOrListUrl && permissions && folderPath)) return [3 /*break*/, 2];
                        folderByServerRelativeUrl = "".concat(encodeURIComponent(relativeLibOrListUrl), "/").concat(encodeURIComponent(folderPath));
                        apiUrl = "".concat(remoteSiteUrl, "/_api/web/GetFolderByServerRelativeUrl(@folderByServerRelativeUrl)/ListItemAllFields/EffectiveBasePermissions?@folderByServerRelativeUrl='").concat(folderByServerRelativeUrl, "'");
                        return [4 /*yield*/, this.checkRemotePermissions(apiUrl)];
                    case 1:
                        hasPermissions = _b.sent();
                        this.setState({
                            allowRender: hasPermissions,
                            loading: false
                        });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check the permissions
     *
     * @param apiUrl
     */
    SecurityTrimmedControl.prototype.checkRemotePermissions = function (apiUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, permissions, data, result, permission, hasPermissions;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, permissions = _a.permissions;
                        return [4 /*yield*/, context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _b.sent();
                        if (!(data && data.ok)) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _b.sent();
                        // Check if an error was retrieved
                        if (result.error) {
                            // Do not allow rendering when there was an error
                            console.error("Error retrieved while checking permissions");
                            return [2 /*return*/, false];
                        }
                        // Check the result high and low value are returned
                        if (typeof result.High !== "undefined" && typeof result.Low !== "undefined") {
                            permission = new SPPermission(result);
                            hasPermissions = permission.hasAllPermissions.apply(permission, permissions);
                            return [2 /*return*/, hasPermissions];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        console.error("No result value was retrieved when checking the user's permissions.");
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default React render method
     */
    SecurityTrimmedControl.prototype.render = function () {
        var className = this.props.className;
        if (this.state.loading && this.props.showLoadingAnimation) {
            return React.createElement(Spinner, null);
        }
        if (this.state.allowRender) {
            return React.createElement("div", { className: className ? className : "" }, this.props.children);
        }
        else if (this.props.noPermissionsControl) {
            return this.props.noPermissionsControl;
        }
        return null;
    };
    return SecurityTrimmedControl;
}(React.Component));
export { SecurityTrimmedControl };
//# sourceMappingURL=SecurityTrimmedControl.js.map