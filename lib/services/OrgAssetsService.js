import { __awaiter, __extends, __generator, __spreadArray } from "tslib";
import { FileBrowserService } from "./FileBrowserService";
import { SPHttpClient } from "@microsoft/sp-http";
/**
 * OrgAssetsService class
 */
var OrgAssetsService = /** @class */ (function (_super) {
    __extends(OrgAssetsService, _super);
    /**
     * Constructor
     * @param context Component context
     * @param itemsToDownloadCount Items to download count
     */
    function OrgAssetsService(context, itemsToDownloadCount) {
        var _this = _super.call(this, context, itemsToDownloadCount) || this;
        // Site organization assets library server relative URL
        _this._orgAssetsLibraryServerRelativeSiteUrl = null;
        /**
         * Gets files from current sites library
         * @param _listUrl Unused parameter (not used in this implementation)
         * @param folderPath Folder path to get items from
         * @param acceptedFilesExtensions File extensions to filter the results
         * @param nextPageQueryStringParams Query string parameters to get the next page of results
         * @returns Items in the specified folder
         */
        _this.getListItems = function (_listUrl, folderPath, acceptedFilesExtensions, nextPageQueryStringParams) { return __awaiter(_this, void 0, void 0, function () {
            var filesQueryResult, libName, libFullUrl, queryStringParams, restApi, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesQueryResult = { items: [], nextHref: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (folderPath.charAt(0) !== '/') {
                            folderPath = "/".concat(folderPath);
                        }
                        libName = folderPath.replace("".concat(this.orgAssetsLibraryServerRelativeSiteUrl, "/"), '');
                        libName = libName.split('/')[0];
                        libFullUrl = this.buildAbsoluteUrl("".concat(this.orgAssetsLibraryServerRelativeSiteUrl, "/").concat(libName));
                        queryStringParams = "";
                        // Do not pass FolderServerRelativeUrl as query parameter
                        // Attach passed nextPageQueryStringParams values to REST URL
                        if (nextPageQueryStringParams) {
                            // Remove start ? from the query params
                            if (nextPageQueryStringParams.charAt(0) === "?") {
                                nextPageQueryStringParams = nextPageQueryStringParams.substring(1);
                            }
                            queryStringParams = nextPageQueryStringParams;
                        }
                        else {
                            queryStringParams = "RootFolder=".concat(folderPath);
                        }
                        restApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.List.GetListDataAsStream?listFullUrl='").concat(libFullUrl, "'&").concat(queryStringParams);
                        return [4 /*yield*/, this._getListDataAsStream(restApi, null, acceptedFilesExtensions)];
                    case 2:
                        filesQueryResult = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        filesQueryResult.items = null;
                        console.error(error_1 instanceof Error ? error_1.message : String(error_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, filesQueryResult];
                }
            });
        }); };
        /**
         * Gets document and media libraries from the site
         * @param includePageLibraries Unused parameter (not used in this implementation)
         * @returns Document and media libraries from the site
         */
        _this.getSiteMediaLibraries = function () {
            var args_1 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args_1[_i] = arguments[_i];
            }
            return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (includePageLibraries) {
                var restApi, orgAssetsResult, orgAssetsData, libs, error_2;
                var _this = this;
                if (includePageLibraries === void 0) { includePageLibraries = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            restApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.Publishing.SitePageService.FilePickerTabOptions");
                            return [4 /*yield*/, this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                        case 1:
                            orgAssetsResult = _a.sent();
                            if (!orgAssetsResult || !orgAssetsResult.ok) {
                                throw new Error("Something went wrong when executing request. Status='".concat(orgAssetsResult.status, "'"));
                            }
                            return [4 /*yield*/, orgAssetsResult.json()];
                        case 2:
                            orgAssetsData = _a.sent();
                            if (!orgAssetsData || !orgAssetsData.OrgAssets || !orgAssetsData.OrgAssets.OrgAssetsLibraries || !orgAssetsData.OrgAssets.OrgAssetsLibraries.Items || orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.length <= 0) {
                                return [2 /*return*/, null];
                            }
                            this.orgAssetsLibraryServerRelativeSiteUrl = orgAssetsData ? orgAssetsData.OrgAssets.Url.DecodedUrl : null;
                            libs = orgAssetsData && orgAssetsData.OrgAssets ? orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.map(function (libItem) { return _this._parseOrgAssetsLibraryItem(libItem); }) : [];
                            return [2 /*return*/, libs];
                        case 3:
                            error_2 = _a.sent();
                            console.error("[OrgAssetsService.getOrganisationAssetsLibraries]: Err='".concat(error_2 instanceof Error ? error_2.message : String(error_2), "'"));
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parses the organisation assets library item
         * @param libItem Library item to parse
         * @returns Organisation assets library
         */
        _this._parseOrgAssetsLibraryItem = function (libItem) {
            var orgAssetsLibrary = {
                absoluteUrl: _this.buildAbsoluteUrl(libItem.LibraryUrl.DecodedUrl),
                title: libItem.DisplayName,
                serverRelativeUrl: libItem.LibraryUrl.DecodedUrl,
                iconPath: libItem.ThumbnailUrl && libItem.ThumbnailUrl.DecodedUrl ? _this.buildAbsoluteUrl("".concat(_this.orgAssetsLibraryServerRelativeSiteUrl, "/").concat(libItem.ThumbnailUrl.DecodedUrl)) : null
            };
            return orgAssetsLibrary;
        };
        return _this;
    }
    Object.defineProperty(OrgAssetsService.prototype, "orgAssetsLibraryServerRelativeSiteUrl", {
        get: function () {
            return this._orgAssetsLibraryServerRelativeSiteUrl;
        },
        set: function (value) {
            var _a;
            if (value === "/") {
                this._orgAssetsLibraryServerRelativeSiteUrl = "";
            }
            else {
                this._orgAssetsLibraryServerRelativeSiteUrl = (_a = value === null || value === void 0 ? void 0 : value.replace(/\/$/, "")) !== null && _a !== void 0 ? _a : null;
            }
        },
        enumerable: false,
        configurable: true
    });
    return OrgAssetsService;
}(FileBrowserService));
export { OrgAssetsService };
//# sourceMappingURL=OrgAssetsService.js.map