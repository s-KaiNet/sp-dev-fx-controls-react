import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { css } from '@fluentui/react/lib/Utilities';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Check } from '@fluentui/react/lib/Check';
import { Placeholder } from '../../../Placeholder';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import * as strings from 'ControlStrings';
import styles from './RecentFilesTab.module.scss';
/**
 * Rows per page
 */
var ROWS_PER_PAGE = 3;
/**
 * Maximum row height
 */
var MAX_ROW_HEIGHT = 175;
var RecentFilesTab = /** @class */ (function (_super) {
    __extends(RecentFilesTab, _super);
    function RecentFilesTab(props) {
        var _this = _super.call(this, props) || this;
        _this._listElem = undefined;
        _this._onSelectionChanged = function () {
            var filePickerResults = [];
            // Get the selected item
            _this._selection.getSelection().map(function (selectedKey) {
                if (!selectedKey.isFolder && selectedKey.fileUrl)
                    filePickerResults.push({
                        fileAbsoluteUrl: selectedKey.fileUrl,
                        fileName: GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl),
                        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedKey.fileUrl),
                        downloadFileContent: function () { return _this.props.fileSearchService.downloadSPFileContent(selectedKey.fileUrl, GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl)); }
                    });
            });
            _this.setState({ filePickerResults: filePickerResults });
            if (_this._listElem) {
                // Force the list to update to show the selection check
                _this._listElem.forceUpdate();
            }
        };
        /**
           * Calculates how many items there should be in the page
           */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                if (surfaceRect.width === 0) {
                    //surfaceRect.width is 0 on load of this component, passing some default values so it renders.
                    _this._columnCount = 9;
                    _this._columnWidth = 161;
                }
                else {
                    _this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                    _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                }
                _this._rowHeight = _this._columnWidth;
            }
            return _this._columnCount * ROWS_PER_PAGE;
        };
        /** Calculates the list "page" height (a.k.a. row) */
        _this._getPageHeight = function () {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        /**
         * Renders a "please wait" spinner while we're loading
         */
        _this._renderSpinner = function () {
            return React.createElement(Spinner, { label: strings.Loading });
        };
        /**
         * Renders a message saying that there are no recent files
         */
        _this._renderPlaceholder = function () {
            return React.createElement(Placeholder, { iconName: 'OpenFolderHorizontal', iconText: strings.NoRecentFiles, description: strings.NoRecentFilesDescription });
        };
        /**
         * Renders a grid list containing results
         */
        _this._renderGridList = function () {
            return React.createElement("span", { className: styles.recentGridList, role: "grid" },
                React.createElement(FocusZone, null,
                    React.createElement(SelectionZone, { selection: _this._selection, selectionMode: SelectionMode.multiple, onItemInvoked: function (item) { return _this._handleItemInvoked(item); } // eslint-disable-line @typescript-eslint/no-explicit-any
                     },
                        React.createElement(List, { ref: _this._linkElement, items: _this.state.results, onRenderCell: _this._onRenderCell, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4 }))));
        };
        /**
         * Renders each result in its own cell
         */
        _this._onRenderCell = function (item, index) {
            var isSelected = false;
            if (_this._selection) {
                isSelected = _this._selection.isKeySelected(item.key);
            }
            return (React.createElement("div", { className: styles.gridListCell, role: "gridCell" },
                React.createElement("div", { className: css(styles.itemTile, styles.isFile, styles.hasThumbnail, isSelected ? styles.isSelected : undefined), role: "link", "aria-selected": isSelected, "data-is-draggable": "false", "data-is-focusable": "true", "data-selection-index": index, "data-selection-invoke": "true", "data-item-index": index, "data-automationid": "ItemTile", style: {
                        width: _this._columnWidth,
                        height: _this._rowHeight
                    } },
                    React.createElement("div", { className: styles.itemTileContent },
                        React.createElement("div", { className: styles.itemTileFile },
                            React.createElement("div", { className: styles.itemTileFileContainer },
                                React.createElement("div", { className: styles.itemTileThumbnail },
                                    React.createElement(Image, { src: item.fileUrl, width: _this._columnWidth, height: _this._rowHeight, imageFit: ImageFit.cover })),
                                React.createElement("div", { className: styles.itemTileCheckCircle, role: 'checkbox', "aria-checked": isSelected, "data-item-index": index, "data-selection-toggle": true, "data-automationid": 'CheckCircle' },
                                    React.createElement(Check, { checked: isSelected })),
                                React.createElement("div", { className: styles.itemTileNamePlate },
                                    React.createElement("div", { className: styles.itemTileName }, item.name),
                                    React.createElement("div", { className: styles.itemTileSubText },
                                        React.createElement("span", null,
                                            strings.EditedByNamePlate,
                                            item.editedBy)))))))));
        };
        /**
         * Gets called what a file is selected.
         */
        _this._handleItemInvoked = function (item) {
            if (!item.isFolder) {
                _this._selection.toggleKeySelected(item.key);
            }
        };
        /**
         * Gets called when it is time to save the currently selected item
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResults);
        };
        /**
         * Gets called when it is time to close (without saving)
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Creates a ref to the list
         */
        _this._linkElement = function (e) {
            _this._listElem = e;
        };
        _this._selection = null;
        _this.state = {
            isLoading: true,
            results: [],
            filePickerResults: [],
        };
        return _this;
    }
    /**
     * Gets the most recently used files
     */
    RecentFilesTab.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recentFilesResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.fileSearchService.executeRecentSearch(this.props.accepts)];
                    case 1:
                        recentFilesResult = _a.sent();
                        this._selection = new Selection({
                            selectionMode: SelectionMode.multiple,
                            onSelectionChanged: this._onSelectionChanged
                        });
                        this._selection.setItems(recentFilesResult, true);
                        this.setState({
                            isLoading: false,
                            results: recentFilesResult
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Render the tab
     */
    RecentFilesTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, results = _a.results, isLoading = _a.isLoading;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.RecentDocumentsHeader)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) }, isLoading ?
                this._renderSpinner() :
                results === undefined || results.length < 1 ? this._renderPlaceholder() : this._renderGridList()),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: this.state.filePickerResults && !this.state.filePickerResults.length, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return RecentFilesTab;
}(React.Component));
export default RecentFilesTab;
//# sourceMappingURL=RecentFilesTab.js.map