import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { css } from '@fluentui/react/lib/Utilities';
import * as strings from 'ControlStrings';
import styles from './UploadFilePickerTab.module.scss';
var UploadFilePickerTab = /** @class */ (function (_super) {
    __extends(UploadFilePickerTab, _super);
    function UploadFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        _this._loadPreiview = function (file) {
            return new Promise(function (resolve) {
                if (!GeneralHelper.isImage(file.name)) {
                    resolve(undefined);
                    return;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result);
                };
            });
        };
        /**
         * Gets called when a file is uploaded
         */
        _this._handleFileUpload = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var files, file, filePickerResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!event.target.files || event.target.files.length < 1) {
                            return [2 /*return*/];
                        }
                        files = event.target.files;
                        file = files[0];
                        filePickerResult = {
                            fileAbsoluteUrl: null,
                            fileName: file.name,
                            fileSize: file.size,
                            fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
                            downloadFileContent: function () { return Promise.resolve(file); }
                        };
                        if (!GeneralHelper.isImage(file.name)) return [3 /*break*/, 2];
                        // Convert to base64 image
                        _a = filePickerResult;
                        return [4 /*yield*/, this._loadPreiview(file)];
                    case 1:
                        // Convert to base64 image
                        _a.previewDataUrl = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.setState({
                            filePickerResult: filePickerResult,
                            filePreview: filePickerResult.previewDataUrl
                        });
                        this.props.onChange([filePickerResult]);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Saves base64 encoded image back to property pane file picker
         */
        _this._handleSave = function () {
            _this.props.onSave([_this.state.filePickerResult]);
        };
        /**
         * Closes tab without saving
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        _this.state = {
            filePickerResult: undefined
        };
        return _this;
    }
    UploadFilePickerTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, filePickerResult = _a.filePickerResult, filePreview = _a.filePreview;
        var fileName = filePickerResult ? filePickerResult.fileName : null;
        var acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.UploadFileHeader)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                React.createElement("input", { className: styles.localTabInput, type: "file", id: "fileInput", accept: acceptedFilesExtensions, multiple: false, onChange: function (event) { return _this._handleFileUpload(event); } }),
                fileName && filePreview &&
                    /** Display image preview */
                    React.createElement("div", { className: styles.localTabSinglePreview },
                        React.createElement("img", { className: styles.localTabSinglePreviewImage, src: filePreview, alt: filePickerResult.fileName }),
                        React.createElement("span", null, fileName)),
                React.createElement("div", null,
                    React.createElement("label", { className: styles.localTabFilename }, (!filePreview && fileName ? fileName : ""))),
                React.createElement("label", { className: styles.localTabLabel, htmlFor: "fileInput" }, (fileName ? strings.ChangeFileLinkLabel : strings.ChooseFileLinkLabel)),
                this.props.renderCustomUploadTabContent && this.props.renderCustomUploadTabContent(this.state.filePickerResult)),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !filePickerResult, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.AddFileButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return UploadFilePickerTab;
}(React.Component));
export default UploadFilePickerTab;
//# sourceMappingURL=UploadFilePickerTab.js.map