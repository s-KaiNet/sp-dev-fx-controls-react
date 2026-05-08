import { __assign, __extends } from "tslib";
import * as React from "react";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import omit from 'lodash/omit';
/**
 * IFrame Dialog content
 */
var IFrameDialogContent = /** @class */ (function (_super) {
    __extends(IFrameDialogContent, _super);
    function IFrameDialogContent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isContentVisible: false
        };
        return _this;
    }
    IFrameDialogContent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.iFrameDialog },
            React.createElement("iframe", __assign({ ref: function (iframe) { _this._iframe = iframe; }, frameBorder: 0, onLoad: this._iframeOnLoad.bind(this), style: { width: '100%', height: '100%', visibility: this.state.isContentVisible ? 'visible' : 'hidden' } }, omit(this.props, 'height'))),
            !this.state.isContentVisible &&
                React.createElement("div", { className: styles.spinnerContainer },
                    React.createElement(Spinner, { size: SpinnerSize.large }))));
    };
    IFrameDialogContent.prototype._iframeOnLoad = function () {
        try { // for cross origin requests we can have issues with accessing frameElement
            /* eslint-disable @typescript-eslint/no-explicit-any */
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
            this._iframe.contentWindow.frameElement.commitPopUp = this.props.close;
            // SP.UI.Dialog has misspelling of commitPopUp
            this._iframe.contentWindow.frameElement.commitPopup = this.props.close;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
        catch (err) {
            if (err.name !== 'SecurityError') {
                throw err;
            }
        }
        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }
        this.setState({
            isContentVisible: true
        });
    };
    return IFrameDialogContent;
}(React.Component));
export { IFrameDialogContent };
//# sourceMappingURL=IFrameDialogContent.js.map