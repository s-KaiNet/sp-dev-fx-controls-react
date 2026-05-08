import { __awaiter, __generator } from "tslib";
import { ServiceKey } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
var FolderExplorerService = /** @class */ (function () {
    function FolderExplorerService(serviceScope) {
        var _this = this;
        /**
         * Get libraries within a given site
         * @param webAbsoluteUrl - the url of the target site
         */
        this.GetDocumentLibraries = function (webAbsoluteUrl) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getDocumentLibraries(webAbsoluteUrl)];
            });
        }); };
        /**
         * Get libraries within a given site
         * @param webAbsoluteUrl - the url of the target site
         */
        this._getDocumentLibraries = function (webAbsoluteUrl) { return __awaiter(_this, void 0, void 0, function () {
            var results, web, libraries, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        web = Web(webAbsoluteUrl);
                        return [4 /*yield*/, web.lists.filter('BaseTemplate eq 101 and Hidden eq false').expand('RootFolder').select('Title', 'RootFolder/ServerRelativeUrl').orderBy('Title').get()];
                    case 2:
                        libraries = _a.sent();
                        results = libraries.map(function (library) {
                            return { Name: library.Title, ServerRelativeUrl: library.RootFolder.ServerRelativeUrl };
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error loading folders', error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, results];
                }
            });
        }); };
        /**
       * Get folders within a given library or sub folder
       * @param webAbsoluteUrl - the url of the target site
       * @param folderRelativeUrl - the relative url of the folder
       */
        this.GetFolders = function (webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getFolders(webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending)];
            });
        }); };
        /**
       * Get files within a given library or sub folder
       * @param webAbsoluteUrl - the url of the target site
       * @param folderRelativeUrl - the relative url of the folder
       */
        this.GetFiles = function (webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._getFiles(webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending)];
            });
        }); };
        /**
         * Get folders within a given library or sub folder
         * @param webAbsoluteUrl - the url of the target site
         * @param folderRelativeUrl - the relative url of the folder
         */
        this._getFolders = function (webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending) { return __awaiter(_this, void 0, void 0, function () {
            var results, web, foldersResult, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        web = Web(webAbsoluteUrl);
                        return [4 /*yield*/, web.getFolderByServerRelativePath(folderRelativeUrl).folders.select('Name', 'ServerRelativeUrl').orderBy(orderby, orderAscending).get()];
                    case 2:
                        foldersResult = _a.sent();
                        results = foldersResult.filter(function (f) { return f.Name !== "Forms"; });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error loading folders', error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, results];
                }
            });
        }); };
        /**
         * Get files within a given library or sub folder
         * @param webAbsoluteUrl - the url of the target site
         * @param folderRelativeUrl - the relative url of the folder
         */
        this._getFiles = function (webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending) { return __awaiter(_this, void 0, void 0, function () {
            var results, web, filesResult, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        web = Web(webAbsoluteUrl);
                        folderRelativeUrl = folderRelativeUrl.replace(/'/ig, "''");
                        return [4 /*yield*/, web.getFolderByServerRelativePath(folderRelativeUrl).files.select('Name', 'ServerRelativeUrl', 'UniqueId', 'Length').orderBy(orderby, orderAscending).get()];
                    case 2:
                        filesResult = _a.sent();
                        results = filesResult;
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error('Error loading files', error_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, results];
                }
            });
        }); };
        /**
         * Create a new folder
         * @param webAbsoluteUrl - the url of the target site
         * @param folderRelativeUrl - the relative url of the base folder
         * @param name - the name of the folder to be created
         */
        this.AddFolder = function (webAbsoluteUrl, folderRelativeUrl, name) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._addFolder(webAbsoluteUrl, folderRelativeUrl, name)];
            });
        }); };
        /**
       * Create a new folder
       * @param webAbsoluteUrl - the url of the target site
       * @param folderRelativeUrl - the relative url of the base folder
       * @param name - the name of the folder to be created
       */
        this._addFolder = function (webAbsoluteUrl, folderRelativeUrl, name) { return __awaiter(_this, void 0, void 0, function () {
            var folder, web, folderAddResult, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folder = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        web = Web(webAbsoluteUrl);
                        folderRelativeUrl = folderRelativeUrl.replace(/'/ig, "''");
                        return [4 /*yield*/, web.getFolderByServerRelativePath(folderRelativeUrl).folders.addUsingPath(name)];
                    case 2:
                        folderAddResult = _a.sent();
                        if (folderAddResult && folderAddResult.data) {
                            folder = {
                                Name: folderAddResult.data.Name,
                                ServerRelativeUrl: folderAddResult.data.ServerRelativeUrl
                            };
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error('Error adding folder', error_4);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, folder];
                }
            });
        }); };
        serviceScope.whenFinished(function () {
            var pageContext = serviceScope.consume(PageContext.serviceKey);
            sp.setup({
                sp: {
                    baseUrl: pageContext.web.absoluteUrl
                }
            });
        });
    }
    FolderExplorerService.serviceKey = ServiceKey.create('SPFx:SPService', FolderExplorerService);
    return FolderExplorerService;
}());
export { FolderExplorerService };
//# sourceMappingURL=FolderExplorerService.js.map