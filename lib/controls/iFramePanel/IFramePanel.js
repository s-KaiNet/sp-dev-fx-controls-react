import { __assign, __extends } from "tslib";
import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import omit from 'lodash/omit';
import { IFramePanelContent } from './IFramePanelContent';
import * as telemetry from '../../common/telemetry';
var IFramePanel = /** @class */ (function (_super) {
    __extends(IFramePanel, _super);
    function IFramePanel(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('ReactIFramePanel', {});
        _this.state = {};
        return _this;
    }
    /**
     * Default React render
     */
    IFramePanel.prototype.render = function () {
        var _a = this.props, height = _a.height, allowFullScreen = _a.allowFullScreen, iframeOnLoad = _a.iframeOnLoad, allowTransparency = _a.allowTransparency, name = _a.name, sandbox = _a.sandbox, scrolling = _a.scrolling, seamless = _a.seamless;
        return (React.createElement(Panel, __assign({}, omit(this.props, 'className')),
            React.createElement(IFramePanelContent, { src: this.props.url, iframeOnLoad: iframeOnLoad, close: this.props.onDismiss, height: height, allowFullScreen: allowFullScreen, allowTransparency: allowTransparency, name: name, sandbox: sandbox, scrolling: scrolling, seamless: seamless })));
    };
    return IFramePanel;
}(React.Component));
export { IFramePanel };
//# sourceMappingURL=IFramePanel.js.map