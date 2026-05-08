import { __awaiter, __extends, __generator } from "tslib";
import * as React from "react";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./DocumentLibraryBrowser.module.scss";
import * as strings from "ControlStrings";
/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
var DocumentLibraryBrowser = /** @class */ (function (_super) {
    __extends(DocumentLibraryBrowser, _super);
    function DocumentLibraryBrowser(props) {
        var _this = _super.call(this, props) || this;
        /**
        * Renders a cell for search suggestions
        */
        _this._onRenderLibraryTile = function (item, index) {
            return (React.createElement("div", { key: item.absoluteUrl, className: styles.filePickerFolderCardTile, "data-is-focusable": true, onClick: function (_event) { return _this._handleOpenLibrary(item); } },
                React.createElement("div", { className: styles.filePickerFolderCardImage },
                    React.createElement(Icon, { className: styles.filePickerFolderCoverBack, imageProps: {
                            src: strings.FolderBackPlate
                        } }),
                    React.createElement(Icon, { className: styles.filePickerFolderCoverFront, imageProps: {
                            src: strings.FolderFrontPlate
                        } })),
                React.createElement("div", { className: styles.filePickerFolderCardTitle }, item.title)));
        };
        /**
         * Calls parent when library is opened
         */
        _this._handleOpenLibrary = function (library) {
            _this.props.onOpenLibrary(library);
        };
        _this.state = {
            isLoading: true,
            lists: []
        };
        return _this;
    }
    DocumentLibraryBrowser.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.fileBrowserService.getSiteMediaLibraries(this.props.includePageLibraries)];
                    case 1:
                        lists = _a.sent();
                        this.setState({
                            lists: lists,
                            isLoading: false
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DocumentLibraryBrowser.prototype.render = function () {
        var _this = this;
        var _a = this.state, lists = _a.lists, isLoading = _a.isLoading;
        return (React.createElement("div", { className: styles.documentLibraryBrowserContainer },
            isLoading && React.createElement(Spinner, { label: strings.Loading }),
            React.createElement(Stack, { wrap: true, horizontal: true, horizontalAlign: "start", verticalAlign: "center" }, lists.map(function (list, index) {
                return _this._onRenderLibraryTile(list, index);
            }))));
    };
    return DocumentLibraryBrowser;
}(React.Component));
export { DocumentLibraryBrowser };
//# sourceMappingURL=DocumentLibraryBrowser.js.map