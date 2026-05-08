import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, } from '@fluentui/react/lib/Button';
import SPservice from "../../services/SPService";
import * as strings from 'ControlStrings';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import styles from './ListItemAttachments.module.scss';
var UploadAttachment = /** @class */ (function (_super) {
    __extends(UploadAttachment, _super);
    function UploadAttachment(props) {
        var _this = _super.call(this, props) || this;
        _this._isFileExplorerOpen = false;
        /**
         * On attachment upload event
         */
        _this.onAttachmentUpload = function () {
            // fire click event
            _this.fileInput.current.value = '';
            _this.fileInput.current.click();
        };
        /**
         * Add a new attachment
         */
        _this.addAttachment = function (e) {
            _this.setState({
                isLoading: true
            });
            var reader = new FileReader();
            var file = e.target.files[0];
            return new Promise(function (resolve, reject) {
                reader.onloadend = function () { return __awaiter(_this, void 0, void 0, function () {
                    var updatedItem, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                if (!(this.props.itemId && this.props.itemId > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this._spservice.addAttachment(this.props.listId, this.props.itemId, file.name, file, this.props.webUrl)];
                            case 1:
                                updatedItem = _a.sent();
                                // Notify parent component of the ETag change
                                if (updatedItem && this.props.onAttachmentChange) {
                                    this.props.onAttachmentChange(updatedItem);
                                }
                                _a.label = 2;
                            case 2:
                                this.props.onAttachmentUpload(file);
                                this.setState({
                                    isLoading: false
                                });
                                resolve();
                                return [3 /*break*/, 4];
                            case 3:
                                error_1 = _a.sent();
                                this.setState({
                                    hideDialog: false,
                                    isLoading: false,
                                    dialogMessage: strings.ListItemAttachmentsuploadAttachmentErrorMsg.replace('{0}', file.name).replace('{1}', error_1.message)
                                });
                                reject(error_1);
                                return [3 /*break*/, 4];
                            case 4:
                                this._isFileExplorerOpen = false;
                                return [2 /*return*/];
                        }
                    });
                }); };
                reader.readAsDataURL(file);
            });
        };
        /**
         * Called when the hidden file input is clicked (activated).
         * @param e - Mouse click event on the file input element.
        */
        _this.onInputActivated = function (e) {
            setTimeout(function () {
                window.addEventListener('focus', _this.handleFocusAfterDialog);
            }, 300);
        };
        /**
         * Handles window focus event after the file picker dialog is closed.
        */
        _this.handleFocusAfterDialog = function () {
            window.removeEventListener('focus', _this.handleFocusAfterDialog);
            _this._isFileExplorerOpen = false;
            _this.props.onUploadDialogClosed();
        };
        /**
         * Close dialog
         */
        _this.closeDialog = function () {
            _this.setState({
                hideDialog: true,
                dialogMessage: '',
            });
        };
        _this.state = {
            hideDialog: true,
            dialogMessage: '',
            isLoading: false,
        };
        // Get SPService
        _this._spservice = new SPservice(_this.props.context);
        _this.fileInput = React.createRef();
        return _this;
    }
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    UploadAttachment.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.fireUpload && !this._isFileExplorerOpen) {
            this.fileInput.current.value = '';
            this.fileInput.current.click();
            this._isFileExplorerOpen = true;
        }
    };
    /**
     * Default React render method
     */
    UploadAttachment.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("input", { id: "file-picker", style: { display: 'none' }, type: "file", onChange: function (e) { return _this.addAttachment(e); }, onClick: function (e) { return _this.onInputActivated(e); }, ref: this.fileInput }),
            React.createElement("div", { className: styles.uploadBar },
                React.createElement(CommandBar, { items: [{
                            key: 'Add',
                            name: strings.ListItemAttachmentsCommandBarAddAttachmentLabel,
                            iconProps: {
                                iconName: 'Upload'
                            },
                            onClick: this.onAttachmentUpload,
                            disabled: this.props.disabled
                        }] })),
            React.createElement("div", null, this.state.isLoading ? React.createElement(ProgressIndicator, { label: strings.ListItemAttachmentsloadingMessage }) : ""),
            React.createElement(Dialog, { hidden: this.state.hideDialog, type: DialogType.normal, onDismiss: this.closeDialog, dialogContentProps: {
                    type: DialogType.normal,
                    title: strings.ListItemAttachmentsuploadAttachmentDialogTitle,
                    subText: this.state.dialogMessage
                }, modalProps: {
                    isBlocking: true,
                    containerClassName: 'ms-dialogMainOverride'
                } },
                React.createElement(DialogFooter, null,
                    React.createElement(PrimaryButton, { onClick: this.closeDialog }, "OK")))));
    };
    return UploadAttachment;
}(React.Component));
export { UploadAttachment };
//# sourceMappingURL=UploadAttachment.js.map