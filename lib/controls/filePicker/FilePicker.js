import { __assign, __awaiter, __extends, __generator, __spreadArray } from "tslib";
import * as React from "react";
import * as strings from "ControlStrings";
import { ActionButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Label } from "@fluentui/react/lib/Label";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { Nav } from "@fluentui/react/lib/Nav";
import { css } from "@fluentui/react/lib/Utilities";
import * as telemetry from "../../common/telemetry";
import { FileBrowserService } from "../../services/FileBrowserService";
import { FilesSearchService } from "../../services/FilesSearchService";
import { OneDriveService } from "../../services/OneDriveService";
import { OrgAssetsService } from "../../services/OrgAssetsService";
import styles from "./FilePicker.module.scss";
import LinkFilePickerTab from "./LinkFilePickerTab/LinkFilePickerTab";
import { OneDriveFilesTab } from "./OneDriveFilesTab/OneDriveFilesTab";
import RecentFilesTab from "./RecentFilesTab/RecentFilesTab";
import SiteFilePickerTab from "./SiteFilePickerTab/SiteFilePickerTab";
import { StockImages } from "./StockImagesTab/StockImages";
import UploadFilePickerTab from "./UploadFilePickerTab/UploadFilePickerTab";
import MultipleUploadFilePickerTab from "./MultipleUploadFilePickerTab/MultipleUploadFilePickerTab";
import WebSearchTab from "./WebSearchTab/WebSearchTab";
import { FilePickerTab } from "./FilePickerTab";
var FilePicker = /** @class */ (function (_super) {
    __extends(FilePicker, _super);
    function FilePicker(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Renders the panel header
         */
        _this._renderHeader = function () {
            return (React.createElement("div", { className: "ms-Panel-header" },
                React.createElement("p", { className: css("ms-Panel-headerText", styles.header), role: "heading" }, strings.FilePickerHeader)));
        };
        /**
         * Open the panel
         */
        _this._handleOpenPanel = function () {
            _this.setState({
                panelOpen: true,
                selectedTab: _this._getDefaultSelectedTabKey(_this.props, _this.state.organisationAssetsEnabled),
            });
        };
        /**
         * Closes the panel
         */
        _this._handleClosePanel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel();
            }
            _this.setState({
                panelOpen: false,
            });
        };
        /**
         * On save action
         */
        _this._handleSave = function (filePickerResult) {
            _this.props.onSave(filePickerResult);
            _this.setState({
                panelOpen: false,
            });
        };
        _this._handleOnChange = function (filePickerResult) {
            if (_this.props.onChange) {
                _this.props.onChange(filePickerResult);
            }
        };
        /**
         * Changes the selected tab when a link is selected
         */
        _this._handleLinkClick = function (ev, item) {
            _this.setState({ selectedTab: item.key });
        };
        /**
         * Prepares navigation panel options
         */
        _this._getNavPanelOptions = function () {
            var addUrl = _this.props.storeLastActiveTab !== false;
            var links = [];
            if (!_this.props.hideRecentTab) {
                links.push({
                    name: strings.RecentLinkLabel,
                    url: addUrl ? "#recent" : undefined,
                    icon: "Recent",
                    key: FilePickerTab.Recent,
                });
            }
            if (!_this.props.hideStockImages) {
                links.push({
                    name: strings.StockImagesLinkLabel,
                    url: addUrl ? "#stockImages" : undefined,
                    key: FilePickerTab.StockImages,
                    icon: "ImageSearch",
                });
            }
            if (_this.props.bingAPIKey && !_this.props.hideWebSearchTab) {
                links.push({
                    name: strings.WebSearchLinkLabel,
                    url: addUrl ? "#search" : undefined,
                    key: FilePickerTab.Web,
                    icon: "Search",
                });
            }
            if (!_this.props.hideOrganisationalAssetTab &&
                _this.state.organisationAssetsEnabled) {
                links.push({
                    name: strings.OrgAssetsLinkLabel,
                    url: addUrl ? "#orgAssets" : undefined,
                    icon: "FabricFolderConfirm",
                    key: FilePickerTab.OrgAssets,
                });
            }
            if (!_this.props.hideOneDriveTab) {
                links.push({
                    name: "OneDrive",
                    url: addUrl ? "#onedrive" : undefined,
                    key: FilePickerTab.OneDrive,
                    icon: "OneDrive",
                });
            }
            if (!_this.props.hideSiteFilesTab) {
                links.push({
                    name: strings.SiteLinkLabel,
                    url: addUrl ? "#globe" : undefined,
                    key: FilePickerTab.Site,
                    icon: "Globe",
                });
            }
            if (!_this.props.hideLocalUploadTab) {
                links.push({
                    name: strings.UploadLinkLabel,
                    url: addUrl ? "#upload" : undefined,
                    key: FilePickerTab.Upload,
                    icon: "System",
                });
            }
            if (!_this.props.hideLocalMultipleUploadTab) {
                links.push({
                    name: strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName,
                    url: addUrl ? "#Multipleupload" : undefined,
                    key: FilePickerTab.MultipleUpload,
                    icon: "BulkUpload",
                });
            }
            if (!_this.props.hideLinkUploadTab) {
                links.push({
                    name: strings.FromLinkLinkLabel,
                    url: addUrl ? "#link" : undefined,
                    key: FilePickerTab.Link,
                    icon: "Link",
                });
            }
            if (_this.props.tabOrder) {
                links = _this._getTabOrder(links);
            }
            var groups = [{ links: links }];
            return groups;
        };
        /**
         * Sorts navigation tabs based on the tabOrder prop
         */
        _this._getTabOrder = function (links) {
            var sortedKeys = __spreadArray(__spreadArray([], _this.props.tabOrder, true), links.map(function (l) { return l.key; }).filter(function (key) { return !_this.props.tabOrder.includes(key); }), true);
            links.sort(function (a, b) {
                return sortedKeys.indexOf(a.key) - sortedKeys.indexOf(b.key);
            });
            return links;
        };
        /**
         * Returns the default selected tab key
         */
        _this._getDefaultSelectedTabKey = function (props, orgAssetsEnabled) {
            var tabsConfig = [
                { isTabVisible: !props.hideRecentTab, tabKey: FilePickerTab.Recent },
                { isTabVisible: !props.hideStockImages, tabKey: FilePickerTab.StockImages },
                { isTabVisible: props.bingAPIKey && !props.hideWebSearchTab, tabKey: FilePickerTab.Web },
                { isTabVisible: !props.hideOrganisationalAssetTab && orgAssetsEnabled, tabKey: FilePickerTab.OrgAssets },
                { isTabVisible: !props.hideOneDriveTab, tabKey: FilePickerTab.OneDrive },
                { isTabVisible: !props.hideSiteFilesTab, tabKey: FilePickerTab.Site },
                { isTabVisible: !props.hideLocalUploadTab, tabKey: FilePickerTab.Upload },
                { isTabVisible: !props.hideLinkUploadTab, tabKey: FilePickerTab.Link },
                { isTabVisible: !props.hideLocalMultipleUploadTab, tabKey: FilePickerTab.MultipleUpload }
            ];
            var visibleTabs = tabsConfig.filter(function (tab) { return tab.isTabVisible; });
            var visibleTabKeys = visibleTabs.map(function (tab) { return tab.tabKey; });
            // If defaultSelectedTab is provided and is visible, then return tabKey
            if (_this.props.defaultSelectedTab && visibleTabKeys.includes(_this.props.defaultSelectedTab)) {
                return _this.props.defaultSelectedTab;
            }
            // If no valid default tab is provided, find the first visible tab in the order
            if (_this.props.tabOrder) {
                var visibleTabSet_1 = new Set(visibleTabKeys);
                return _this.props.tabOrder.find(function (key) { return visibleTabSet_1.has(key); });
            }
            else {
                return visibleTabKeys[0]; // first visible tab from default order
            }
        };
        telemetry.track("ReactFilePicker", {});
        // Initialize file browser services
        _this.fileBrowserService = new FileBrowserService(props.context, _this.props.itemsCountQueryLimit, _this.props.webAbsoluteUrl);
        _this.oneDriveService = new OneDriveService(props.context, _this.props.itemsCountQueryLimit);
        _this.orgAssetsService = new OrgAssetsService(props.context, _this.props.itemsCountQueryLimit);
        _this.fileSearchService = new FilesSearchService(props.context, _this.props.bingAPIKey, _this.props.webAbsoluteUrl);
        _this.state = {
            panelOpen: _this.props.isPanelOpen || false,
            organisationAssetsEnabled: false,
            showFullNav: true,
        };
        return _this;
    }
    FilePicker.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orgAssetsEnabled, orgAssetsLibraries, _a, title, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orgAssetsEnabled = false;
                        if (!!this.props.hideOrganisationalAssetTab) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.orgAssetsService.getSiteMediaLibraries()];
                    case 1:
                        orgAssetsLibraries = _b.sent();
                        orgAssetsEnabled = orgAssetsLibraries ? true : false;
                        _b.label = 2;
                    case 2:
                        this.setState({
                            organisationAssetsEnabled: orgAssetsEnabled,
                            selectedTab: this._getDefaultSelectedTabKey(this.props, orgAssetsEnabled),
                        });
                        if (!(!!this.props.context && !!this.props.webAbsoluteUrl)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileBrowserService.getSiteTitleAndId()];
                    case 3:
                        _a = _b.sent(), title = _a.title, id = _a.id;
                        this.setState({
                            webTitle: title,
                            webId: id
                        });
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * componentWillReceiveProps lifecycle hook
   *
   * @param nextProps
   */
    FilePicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.isPanelOpen || nextProps.isPanelOpen !== this.props.isPanelOpen) {
            this.setState({
                panelOpen: nextProps.isPanelOpen
            });
        }
    };
    FilePicker.prototype.render = function () {
        var _this = this;
        // If no acceptable file type was passed, and we're expecting images, set the default image filter
        var accepts = this.props.accepts;
        var buttonClassName = this.props.buttonClassName
            ? this.props.buttonClassName
            : "";
        var panelClassName = this.props.panelClassName
            ? this.props.panelClassName
            : "";
        var linkTabProps = {
            accepts: accepts,
            context: this.props.context,
            onClose: function () { return _this._handleClosePanel(); },
            onSave: function (value) {
                _this._handleSave(value);
            },
        };
        var buttonProps = {
            text: this.props.buttonLabel,
            disabled: this.props.disabled,
            onClick: this._handleOpenPanel,
            className: "pnp__file-picker__button ".concat(buttonClassName),
        };
        /**
         * Test if button Icon or buttonIconProps were specified
         */
        var buttonIconProps = {};
        if (this.props.buttonIconProps) {
            buttonIconProps = this.props.buttonIconProps;
            buttonIconProps.iconName = this.props.buttonIcon
                ? this.props.buttonIcon
                : this.props.buttonIconProps.iconName;
        }
        else if (this.props.buttonIcon) {
            buttonIconProps.iconName = this.props.buttonIcon;
        }
        return (React.createElement("div", { className: "pnp__file-picker" },
            !this.props.hidden && this.props.label && (React.createElement(Label, { required: this.props.required }, this.props.label)),
            !this.props.hidden && (this.props.buttonIcon || this.props.buttonIconProps) ? (React.createElement(ActionButton, __assign({ iconProps: buttonIconProps }, buttonProps))) : (!this.props.hidden &&
                React.createElement(PrimaryButton, __assign({}, buttonProps))),
            React.createElement(Panel, { isOpen: this.state.panelOpen, isBlocking: true, hasCloseButton: true, className: "pnp__file-picker__panel ".concat(styles.filePicker, " ").concat(panelClassName), onDismiss: this._handleClosePanel, type: PanelType.extraLarge, isFooterAtBottom: true, onRenderNavigation: function () {
                    return undefined;
                }, headerText: strings.FilePickerHeader, isLightDismiss: true, onRenderHeader: function () { return _this._renderHeader(); } },
                React.createElement("div", { className: styles.nav },
                    React.createElement(Nav, { groups: this._getNavPanelOptions(), selectedKey: this.state.selectedTab, onLinkClick: function (ev, item) { return _this._handleLinkClick(ev, item); } })),
                React.createElement("div", { className: styles.tabsContainer },
                    this.state.selectedTab === FilePickerTab.Link && (React.createElement(LinkFilePickerTab, __assign({ fileSearchService: this.fileSearchService, renderCustomLinkTabContent: this.props.renderCustomLinkTabContent, allowExternalLinks: this.props.allowExternalLinks, checkIfFileExists: this.props.checkIfFileExists !== false }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.Upload && (React.createElement(UploadFilePickerTab, __assign({ renderCustomUploadTabContent: this.props.renderCustomUploadTabContent }, linkTabProps, { onChange: this._handleOnChange }))),
                    this.state.selectedTab === FilePickerTab.MultipleUpload && (React.createElement(MultipleUploadFilePickerTab, __assign({ renderCustomMultipleUploadTabContent: this.props.renderCustomMultipleUploadTabContent }, linkTabProps, { onChange: this._handleOnChange }))),
                    this.state.selectedTab === FilePickerTab.Site && (React.createElement(SiteFilePickerTab, __assign({ fileBrowserService: this.fileBrowserService, includePageLibraries: this.props.includePageLibraries, defaultFolderAbsolutePath: this.props.defaultFolderAbsolutePath, webTitle: this.state.webTitle, webId: this.state.webId, webAbsoluteUrl: this.props.webAbsoluteUrl }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.OrgAssets && (React.createElement(SiteFilePickerTab, __assign({ breadcrumbFirstNode: {
                            isCurrentItem: true,
                            text: strings.OrgAssetsTabLabel,
                            key: FilePickerTab.OrgAssets,
                        }, fileBrowserService: this.orgAssetsService, webTitle: this.state.webTitle }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.Web && (React.createElement(WebSearchTab, __assign({ bingSearchService: this.fileSearchService }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.OneDrive && (React.createElement(OneDriveFilesTab, __assign({ oneDriveService: this.oneDriveService }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.Recent && (React.createElement(RecentFilesTab, __assign({ fileSearchService: this.fileSearchService }, linkTabProps))),
                    this.state.selectedTab === FilePickerTab.StockImages && (React.createElement(StockImages, __assign({ language: this.props.context.pageContext.cultureInfo.currentCultureName, fileSearchService: this.fileSearchService }, linkTabProps)))))));
    };
    return FilePicker;
}(React.Component));
export { FilePicker };
//# sourceMappingURL=FilePicker.js.map