import { __awaiter, __extends, __generator, __spreadArray } from "tslib";
import * as React from 'react';
import styles from './FolderExplorer.module.scss';
import * as strings from 'ControlStrings';
import { Icon } from "@fluentui/react/lib/Icon";
import { FolderExplorerService } from '../../../services/FolderExplorerService';
import { NewFolder } from "../NewFolder";
import { Breadcrumb } from "@fluentui/react/lib/Breadcrumb";
import * as telemetry from '../../../common/telemetry';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
var FolderExplorer = /** @class */ (function (_super) {
    __extends(FolderExplorer, _super);
    function FolderExplorer(props) {
        var _this = _super.call(this, props) || this;
        _this._allLibraries = [];
        _this._allFolders = [];
        _this._allFiles = [];
        /**
       * Get HTML elements for rendering breadcrumb
       */
        _this._getBreadcrumbDOM = function () {
            var breadCrumbDOM = null;
            var breadCrumbItems = _this._getCurrentBreadcrumbItems();
            var overflowIndex = breadCrumbItems.length > 1 ? 1 : 0;
            breadCrumbDOM = React.createElement(Breadcrumb, { items: breadCrumbItems, className: styles.breadcrumbPath, maxDisplayedItems: 3, overflowIndex: overflowIndex });
            return breadCrumbDOM;
        };
        /**
       * Get breadcrumb items
       * @returns an array of IBreadcrumbItem objects
       */
        _this._getCurrentBreadcrumbItems = function () {
            var items = [];
            if (_this.props.initialBreadcrumbItems) {
                items = __spreadArray([], _this.props.initialBreadcrumbItems, true);
            }
            var rootItem = { text: _this.props.rootFolder.Name, key: 'Root-Item', onClick: _this._getFolders.bind(_this, _this.props.rootFolder) };
            items.push(rootItem);
            if (_this.state.selectedFolder && _this.state.selectedFolder.ServerRelativeUrl !== _this.props.rootFolder.ServerRelativeUrl) {
                var folderPathSplit = _this.state.selectedFolder.ServerRelativeUrl.replace(_this.props.rootFolder.ServerRelativeUrl, '').split('/');
                var folderPath_1 = _this.props.rootFolder.ServerRelativeUrl;
                folderPathSplit.forEach(function (folderName, index) {
                    if (folderName !== '') {
                        folderPath_1 += '/' + folderName;
                        var itemText = folderName;
                        // check if library and if so use the Title of the library that was retrieved in case it's not the same as the url part
                        var lib = _this._allLibraries.filter(function (l) { return l.ServerRelativeUrl === folderPath_1; });
                        if (lib.length === 1) {
                            itemText = lib[0].Name;
                        }
                        var folderItem = { text: itemText, key: "Folder-".concat(index.toString()), onClick: _this._getFolders.bind(_this, { Name: folderName, ServerRelativeUrl: folderPath_1 }) };
                        items.push(folderItem);
                    }
                });
            }
            items[items.length - 1].isCurrentItem = true;
            return items;
        };
        /**
       * Filter list of folders based on user input
       * @param filterText - The text to use when filtering the collection
       */
        _this._onChangeFilterText = function (filterText) {
            _this.setState({
                folders: filterText ? _this._allFolders.filter(function (f) { return f.Name.toLowerCase().indexOf(filterText.toLowerCase()) > -1; }) : _this._allFolders
            });
        };
        /**
      * Load sub folders and files within a given folder
      * @param folder - Name of the folder
      */
        _this._getFolders = function (folder) { return __awaiter(_this, void 0, void 0, function () {
            var siteAbsoluteUrl, _a, orderBy, orderAscending, _b, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.setState({ foldersLoading: true });
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, , 10]);
                        siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
                        if (!(siteAbsoluteUrl.lastIndexOf(folder.ServerRelativeUrl, siteAbsoluteUrl.length - folder.ServerRelativeUrl.length) !== -1)) return [3 /*break*/, 5];
                        if (!(this._allLibraries.length > 0)) return [3 /*break*/, 2];
                        this._allFolders = __spreadArray([], this._allLibraries, true);
                        return [3 /*break*/, 4];
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this._spService.GetDocumentLibraries(siteAbsoluteUrl)];
                    case 3:
                        _a._allLibraries = _d.sent();
                        this._allFolders = __spreadArray([], this._allLibraries, true);
                        _d.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        orderBy = this.props.orderby !== undefined ? this.props.orderby : 'Name';
                        orderAscending = this.props.orderAscending !== undefined ? this.props.orderAscending : true;
                        _b = this;
                        return [4 /*yield*/, this._spService.GetFolders(siteAbsoluteUrl, folder.ServerRelativeUrl, orderBy, orderAscending)];
                    case 6:
                        _b._allFolders = _d.sent();
                        if (!this.props.showFiles) return [3 /*break*/, 8];
                        _c = this;
                        return [4 /*yield*/, this._spService.GetFiles(siteAbsoluteUrl, folder.ServerRelativeUrl, orderBy, orderAscending)];
                    case 7:
                        _c._allFiles = _d.sent();
                        _d.label = 8;
                    case 8:
                        this.setState({ folders: this._allFolders, files: this._allFiles, selectedFolder: folder, foldersLoading: false });
                        // callback to parent component
                        this.props.onSelect(folder);
                        return [3 /*break*/, 10];
                    case 9:
                        error_1 = _d.sent();
                        this.setState({ selectedFolder: null, foldersLoading: false });
                        console.error(error_1);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        /**
        * Add new subfolder to current folder
        */
        _this._addSubFolder = function (newFolder) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (newFolder) {
                    // add folder if a folder with the same name does not exist yet
                    if (!this._allFolders.some(function (f) { return f.Name === newFolder.Name; })) {
                        // update both list of folders
                        this._allFolders.push(newFolder);
                        this.setState({
                            folders: this._allFolders
                        });
                    }
                }
                return [2 /*return*/];
            });
        }); };
        telemetry.track('FolderExplorer');
        _this._spService = new FolderExplorerService(_this.props.context.serviceScope);
        _this.state = {
            foldersLoading: false,
            folders: [],
            files: [],
            selectedFolder: null,
        };
        return _this;
    }
    FolderExplorer.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var targetFolder, siteAbsoluteUrl, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        targetFolder = this.props.defaultFolder ? this.props.defaultFolder : this.props.rootFolder;
                        siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
                        if (!(siteAbsoluteUrl.lastIndexOf(targetFolder.ServerRelativeUrl, siteAbsoluteUrl.length - targetFolder.ServerRelativeUrl.length) === -1)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this._spService.GetDocumentLibraries(siteAbsoluteUrl)];
                    case 1:
                        _a._allLibraries = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this._getFolders(targetFolder)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FolderExplorer.prototype.render = function () {
        var _this = this;
        var siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
        return (React.createElement("div", null,
            !this.props.hiddenBreadcrumb &&
                this._getBreadcrumbDOM(),
            React.createElement("div", { style: { opacity: this.state.foldersLoading ? 0.8 : 1, } },
                !this.props.hiddenFilterBox && this._allFolders.length > 0 &&
                    React.createElement("div", null,
                        React.createElement(SearchBox, { className: styles.filterBox, placeholder: strings.FolderFilterBoxPlaceholder, onSearch: this._onChangeFilterText, onChange: function (e, value) { return _this._onChangeFilterText(value); } })),
                this.state.folders.length === 0 &&
                    React.createElement("div", { className: styles.status },
                        React.createElement("span", { role: "status" }, this.state.foldersLoading ? strings.FolderExplorerLoading : strings.FolderExplorerNoItems)),
                this.state.folders.length > 0 &&
                    React.createElement("div", null, this.state.folders.map(function (folder) {
                        return (React.createElement("div", { className: styles.libraryItem, key: folder.ServerRelativeUrl, onClick: function () { _this._getFolders(folder).then(function () { }).catch(function () { }); } },
                            React.createElement(Icon, { iconName: "FabricFolder", className: styles.icon }),
                            folder.Name));
                    })),
                this.props.canCreateFolders && (this.state.selectedFolder && this.state.selectedFolder.ServerRelativeUrl !== this.props.context.pageContext.web.serverRelativeUrl) &&
                    React.createElement(NewFolder, { context: this.props.context, siteAbsoluteUrl: siteAbsoluteUrl, selectedFolder: this.state.selectedFolder, addSubFolder: this._addSubFolder }),
                this.state.files.length > 0 &&
                    React.createElement("div", null, this.state.files.map(function (file) {
                        return (React.createElement("div", { className: styles.libraryItem, key: file.ServerRelativeUrl, onClick: function () { return _this.props.onFileClick ? _this.props.onFileClick(file) : null; } },
                            React.createElement(Icon, { iconName: "FileASPX", className: styles.icon }),
                            file.Name));
                    })))));
    };
    return FolderExplorer;
}(React.Component));
export { FolderExplorer };
//# sourceMappingURL=FolderExplorer.js.map