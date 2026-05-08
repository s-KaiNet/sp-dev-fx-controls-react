// tslint:disable:max-classes-per-file
import { __extends } from "tslib";
import * as React from "react";
import * as telemetry from '../../../common/telemetry';
import AccordionStore from "../helpers/AccordionStore";
var Context = React.createContext(null);
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = new AccordionStore({
            expanded: _this.props.preExpanded,
            allowMultipleExpanded: _this.props.allowMultipleExpanded,
            allowZeroExpanded: _this.props.allowZeroExpanded,
        });
        _this.toggleExpanded = function (key) {
            _this.setState(function (state) { return state.toggleExpanded(key); }, function () {
                if (_this.props.onChange) {
                    _this.props.onChange(_this.state.expanded);
                }
            });
        };
        _this.isItemDisabled = function (key) {
            return _this.state.isItemDisabled(key);
        };
        _this.isItemExpanded = function (key) {
            return _this.state.isItemExpanded(key);
        };
        _this.getPanelAttributes = function (key, dangerouslySetExpanded) {
            return _this.state.getPanelAttributes(key, dangerouslySetExpanded);
        };
        _this.getHeadingAttributes = function () {
            // uuid: UUID
            return _this.state.getHeadingAttributes();
        };
        _this.getButtonAttributes = function (key, dangerouslySetExpanded) {
            return _this.state.getButtonAttributes(key, dangerouslySetExpanded);
        };
        telemetry.track('ReactAccessibleAccordion', {});
        return _this;
    }
    Provider.prototype.render = function () {
        var _a = this.state, allowZeroExpanded = _a.allowZeroExpanded, allowMultipleExpanded = _a.allowMultipleExpanded;
        return (React.createElement(Context.Provider, { value: {
                allowMultipleExpanded: allowMultipleExpanded,
                allowZeroExpanded: allowZeroExpanded,
                toggleExpanded: this.toggleExpanded,
                isItemDisabled: this.isItemDisabled,
                isItemExpanded: this.isItemExpanded,
                getPanelAttributes: this.getPanelAttributes,
                getHeadingAttributes: this.getHeadingAttributes,
                getButtonAttributes: this.getButtonAttributes,
            } }, this.props.children || null));
    };
    Provider.defaultProps = {
        allowMultipleExpanded: false,
        allowZeroExpanded: false,
    };
    return Provider;
}(React.PureComponent));
export { Provider };
var Consumer = /** @class */ (function (_super) {
    __extends(Consumer, _super);
    function Consumer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderChildren = function (container) {
            return container ? _this.props.children(container) : null;
        };
        return _this;
    }
    Consumer.prototype.render = function () {
        return React.createElement(Context.Consumer, null, this.renderChildren);
    };
    return Consumer;
}(React.PureComponent));
export { Consumer };
//# sourceMappingURL=AccordionContext.js.map