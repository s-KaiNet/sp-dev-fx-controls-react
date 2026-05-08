import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { findIndex } from '@microsoft/sp-lodash-subset';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { FileBrowser } from '../controls/FileBrowser/FileBrowser';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Link } from '@fluentui/react/lib/Link';
import styles from './OneDriveFilesTab.module.scss';
import * as strings from 'ControlStrings';
var OneDriveFilesTab = /** @class */ (function (_super) {
    __extends(OneDriveFilesTab, _super);
    function OneDriveFilesTab(props) {
        var _this = _super.call(this, props) || this;
        _this.renderBreadcrumbItem = function (item) {
            return (React.createElement(Link, { href: item.href, onClick: item.onClick, key: item.key, className: "ms-Link ms-Breadcrumb-itemLink ".concat(styles.breadcrumbNavItem) }, item.text));
        };
        /**
         * Handles breadcrump item click
         */
        _this.onBreadcrumpItemClick = function (node) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            var breadcrumbClickedItemIndx = 0;
            // Site node clicked
            if (node.folderData === null) {
                _this.setState({
                    libraryAbsolutePath: undefined,
                    folderPath: undefined,
                    folderName: undefined
                });
            }
            // Check if it is folder item
            else if (node.folderData !== null) {
                _this._handleOpenFolder(node.folderData, false);
                // select which node has been clicked
                breadcrumbClickedItemIndx = findIndex(breadcrumbItems, function (item) { return item.folderData && item.folderData.absoluteUrl === node.key; });
            }
            // Trim nodes array
            breadcrumbItems = breadcrumbItems.slice(0, breadcrumbClickedItemIndx + 1);
            // Set new current node
            breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;
            _this.setState({
                breadcrumbItems: breadcrumbItems,
                filePickerResults: []
            });
        };
        /**
         * Is called when user selects a different file
         */
        _this._handleSelectionChange = function (filePickerResults) {
            filePickerResults.map(function (filePickerResult) {
                filePickerResult.downloadFileContent = function () { return _this.props.oneDriveService.downloadSPFileContent(filePickerResult.spItemUrl, filePickerResult.fileName); };
            });
            _this.setState({ filePickerResults: filePickerResults });
        };
        /**
         * Called when user saves
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResults);
        };
        /**
         * Called when user closes tab
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Triggered when user opens a file folder
         */
        _this._handleOpenFolder = function (folder, addBreadcrumbNode) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            if (addBreadcrumbNode) {
                breadcrumbItems.map(function (item) { item.isCurrentItem = false; });
                var breadcrumbNode_1 = {
                    folderData: folder,
                    isCurrentItem: true,
                    text: folder.name,
                    key: folder.absoluteUrl
                };
                breadcrumbNode_1.onClick = function () { _this.onBreadcrumpItemClick(breadcrumbNode_1); };
                breadcrumbItems.push(breadcrumbNode_1);
            }
            _this.setState({
                folderPath: folder.serverRelativeUrl,
                folderName: folder.name,
                libraryAbsolutePath: folder.absoluteUrl,
                breadcrumbItems: breadcrumbItems
            });
        };
        _this.state = {
            filePickerResults: [],
            libraryAbsolutePath: undefined,
            libraryUrl: '/Documents',
            folderPath: undefined,
            folderName: strings.DocumentLibraries,
            breadcrumbItems: []
        };
        return _this;
    }
    OneDriveFilesTab.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folderPath, libraryAbsolutePath, libraryTitle, oneDriveFolderData, breadcrumbItems, breadcrumbNode;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.oneDriveService.getOneDriveRootFolderRelativeUrl()];
                    case 1:
                        folderPath = _a.sent();
                        return [4 /*yield*/, this.props.oneDriveService.getOneDriveRootFolderFullUrl()];
                    case 2:
                        libraryAbsolutePath = _a.sent();
                        return [4 /*yield*/, this.props.oneDriveService.getOneDrivePersonalLibraryTitle()];
                    case 3:
                        libraryTitle = _a.sent();
                        oneDriveFolderData = {
                            isFolder: true,
                            modified: null,
                            modifiedDate: null,
                            absoluteUrl: libraryAbsolutePath,
                            name: libraryTitle,
                            fileIcon: "",
                            serverRelativeUrl: folderPath,
                            spItemUrl: "",
                            supportsThumbnail: false,
                            fileType: ""
                        };
                        breadcrumbItems = this.state.breadcrumbItems;
                        breadcrumbNode = {
                            folderData: oneDriveFolderData,
                            isCurrentItem: true,
                            text: oneDriveFolderData.name,
                            key: oneDriveFolderData.absoluteUrl
                        };
                        breadcrumbNode.onClick = function () { _this.onBreadcrumpItemClick(breadcrumbNode); };
                        breadcrumbItems.push(breadcrumbNode);
                        this.setState({
                            libraryAbsolutePath: libraryAbsolutePath,
                            folderName: folderPath
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    OneDriveFilesTab.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement(Breadcrumb, { items: this.state.breadcrumbItems, className: styles.breadcrumbNav })),
            React.createElement("div", { className: styles.tabFiles }, this.state.libraryAbsolutePath !== undefined &&
                React.createElement(FileBrowser, { onChange: function (filePickerResults) { return _this._handleSelectionChange(filePickerResults); }, onOpenFolder: function (folder) { return _this._handleOpenFolder(folder, true); }, fileBrowserService: this.props.oneDriveService, libraryUrl: this.state.libraryUrl, folderPath: this.state.folderPath, accepts: this.props.accepts })),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: this.state.filePickerResults && !this.state.filePickerResults.length, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return OneDriveFilesTab;
}(React.Component));
export { OneDriveFilesTab };
//# sourceMappingURL=OneDriveFilesTab.js.map