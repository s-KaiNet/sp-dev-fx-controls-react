import { __assign, __extends } from "tslib";
import * as React from "react";
import { Dialog } from '@fluentui/react/lib/Dialog';
import { IFrameDialogContent } from './IFrameDialogContent';
import * as telemetry from '../../common/telemetry';
import { Guid } from "@microsoft/sp-core-library";
import omit from 'lodash/omit';
import merge from 'lodash/merge';
/**
 * Dialog component to display content in iframe
 */
var IFrameDialog = /** @class */ (function (_super) {
    __extends(IFrameDialog, _super);
    function IFrameDialog(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('IFrameDialog', {});
        _this.state = {
            dialogId: null
        };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    IFrameDialog.prototype.UNSAFE_componentWillMount = function () {
        this.setState({
            dialogId: "dialog-".concat(Guid.newGuid().toString())
        });
    };
    /**
     * componentDidMount lifecycle hook
     */
    IFrameDialog.prototype.componentDidMount = function () {
        this.setDialogStyling();
    };
    IFrameDialog.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.hidden && nextProps.hidden !== this.props.hidden) {
            this.setState({
                isStylingSet: false
            });
        }
    };
    IFrameDialog.prototype.componentDidUpdate = function (prevProps, prevState) {
        this.setDialogStyling();
    };
    IFrameDialog.prototype.render = function () {
        var _this = this;
        var _a = this.props, iframeOnLoad = _a.iframeOnLoad, height = _a.height, width = _a.width, allowFullScreen = _a.allowFullScreen, allowTransparency = _a.allowTransparency, marginHeight = _a.marginHeight, marginWidth = _a.marginWidth, name = _a.name, sandbox = _a.sandbox, scrolling = _a.scrolling, seamless = _a.seamless, modalProps = _a.modalProps, dialogContentProps = _a.dialogContentProps, className = _a.className;
        var dlgModalProps = __assign(__assign({}, modalProps), { onLayerDidMount: function () { _this.setDialogStyling(); } });
        var dlgContentProps = merge({}, dialogContentProps, {
            styles: {
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                },
                inner: {
                    flexGrow: 1
                },
                innerContent: {
                    height: '100%'
                }
            }
        });
        var dlgStyles = {
            main: {
                width: width,
                maxWidth: width,
                minWidth: width,
                height: height
            }
        };
        return (React.createElement(Dialog, __assign({ className: "".concat(this.state.dialogId, " ").concat(className || ''), styles: dlgStyles, modalProps: dlgModalProps, dialogContentProps: dlgContentProps }, omit(this.props, 'className', 'modalProps', 'dialogContentProps')),
            React.createElement(IFrameDialogContent, { src: this.props.url, iframeOnLoad: iframeOnLoad, close: this.props.onDismiss, height: height, allowFullScreen: allowFullScreen, allowTransparency: allowTransparency, marginHeight: marginHeight, marginWidth: marginWidth, name: name, sandbox: sandbox, scrolling: scrolling, seamless: seamless })));
    };
    /**
     * Set the dialog style
     */
    IFrameDialog.prototype.setDialogStyling = function () {
        if (!this.state.isStylingSet && !this.props.hidden && this.state.dialogId) {
            var element = document.querySelector(".".concat(this.state.dialogId, " .ms-Dialog-main"));
            var width = this.props.width;
            if (element && width) {
                element.style.width = width;
                element.style.minWidth = width;
                element.style.maxWidth = width;
                this.setState({
                    isStylingSet: true
                });
            }
        }
    };
    return IFrameDialog;
}(React.Component));
export { IFrameDialog };
//# sourceMappingURL=IFrameDialog.js.map