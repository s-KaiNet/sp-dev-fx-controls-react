import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { css } from '@fluentui/react/lib/Utilities';
import * as strings from 'ControlStrings';
import styles from './LinkFilePickerTab.module.scss';
var LinkFilePickerTab = /** @class */ (function (_super) {
    __extends(LinkFilePickerTab, _super);
    function LinkFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Called as user types in a new value
         */
        _this._handleChange = function (fileUrl) {
            var filePickerResult = fileUrl ? {
                fileAbsoluteUrl: fileUrl,
                fileName: GeneralHelper.getFileNameFromUrl(fileUrl),
                fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(fileUrl),
                downloadFileContent: function () { return _this.props.fileSearchService.downloadBingContent(fileUrl, GeneralHelper.getFileNameFromUrl(fileUrl)); }
            } : null;
            _this.setState({
                filePickerResult: filePickerResult
            });
        };
        /**
         * Verifies the url that was typed in
         * @param value
         */
        _this._getErrorMessagePromise = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var fileExists, strResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // DOn't give an error for blank or placeholder value, but don't make it a valid entry either
                        if (value === undefined || value === '') {
                            this.setState({ isValid: false });
                            return [2 /*return*/, ''];
                        }
                        // Make sure that user is typing a valid URL format
                        if (!this._isUrl(value)) {
                            this.setState({ isValid: false });
                            return [2 /*return*/, strings.InvalidUrlError];
                        }
                        // If we don't allow external links, verify that we're in the same domain
                        if (!this.props.allowExternalLinks && !this._isSameDomain(value)) {
                            this.setState({ isValid: false });
                            return [2 /*return*/, strings.NoExternalLinksValidationMessage];
                        }
                        if (!this.props.checkIfFileExists) {
                            this.setState({ isValid: true });
                            return [2 /*return*/, ''];
                        }
                        return [4 /*yield*/, this.props.fileSearchService.checkFileExists(value)];
                    case 1:
                        fileExists = _a.sent();
                        this.setState({ isValid: fileExists });
                        strResult = fileExists ? '' : strings.ProvidedValueIsInvalid;
                        return [2 /*return*/, strResult];
                }
            });
        }); };
        /**
         * Handles when user saves
         */
        _this._handleSave = function () {
            _this.props.onSave([_this.state.filePickerResult]);
        };
        /**
         * HAndles when user closes without saving
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Is this a URL ?
         * (insert guy holding a butterfly meme)
         */
        _this._isUrl = function (fileUrl) {
            try {
                var myURL = new URL(fileUrl.toLowerCase());
                return myURL.host !== undefined;
            }
            catch (_a) {
                return false;
            }
        };
        _this._isSameDomain = function (fileUrl) {
            if (fileUrl) {
                return true;
            }
            var siteUrl = _this.props.context.pageContext.web.absoluteUrl;
            var siteDomainParts = GeneralHelper.getDomain(siteUrl).split('.');
            var fileDomainParts = GeneralHelper.getDomain(fileUrl).split('.');
            return siteDomainParts[0] === fileDomainParts[0] || "".concat(siteDomainParts[0], "-my") === fileDomainParts[0];
        };
        _this.state = { isValid: false };
        return _this;
    }
    LinkFilePickerTab.prototype.render = function () {
        var _this = this;
        var fileUrl = this.state.filePickerResult ? this.state.filePickerResult.fileAbsoluteUrl : null;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.LinkHeader)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                React.createElement(TextField, { multiline: true, required: true, resizable: false, deferredValidationTime: 300, className: styles.linkTextField, label: strings.LinkFileInstructions, ariaLabel: strings.LinkFileInstructions, placeholder: "https://", onGetErrorMessage: function (value) { return _this._getErrorMessagePromise(value); }, autoAdjustHeight: false, underlined: false, borderless: false, validateOnFocusIn: false, validateOnFocusOut: false, validateOnLoad: true, value: fileUrl, onChange: function (e, newValue) { return _this._handleChange(newValue); } }),
                this.props.renderCustomLinkTabContent && this.props.renderCustomLinkTabContent(this.state.filePickerResult)),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !this.state.isValid, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return LinkFilePickerTab;
}(React.Component));
export default LinkFilePickerTab;
//# sourceMappingURL=LinkFilePickerTab.js.map