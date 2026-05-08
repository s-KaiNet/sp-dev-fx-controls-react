import { __extends } from "tslib";
import * as React from 'react';
import styles from './Accordion.module.scss';
import { css } from "@uifabric/utilities/lib/css";
import { DefaultButton } from '@fluentui/react/lib/Button';
import * as telemetry from '../../common/telemetry';
/**
 * Icon styles. Feel free to change them
 */
var collapsedIcon = { iconName: 'ChevronRight', className: styles.accordionChevron };
var expandedIcon = { iconName: 'ChevronDown', className: styles.accordionChevron };
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion(props) {
        var _this = _super.call(this, props) || this;
        _this._drawerDiv = undefined;
        _this.state = {
            expanded: !props.defaultCollapsed
        };
        collapsedIcon.iconName = props.collapsedIcon || 'CheveronRight';
        expandedIcon.iconName = props.expandedIcon || 'CheveronDown';
        telemetry.track('ReactAccordion', {});
        return _this;
    }
    Accordion.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: css(styles.accordion, this.props.className) },
            React.createElement(DefaultButton, { toggled: true, checked: this.state.expanded, text: this.props.title, iconProps: this.state.expanded ? expandedIcon : collapsedIcon, onClick: function () {
                    _this.setState({
                        expanded: !_this.state.expanded
                    });
                }, "aria-expanded": this.state.expanded, "aria-controls": this._drawerDiv && this._drawerDiv.id }),
            this.state.expanded &&
                React.createElement("div", { className: styles.drawer, ref: function (el) { _this._drawerDiv = el; } }, this.props.children)));
    };
    return Accordion;
}(React.Component));
export { Accordion };
//# sourceMappingURL=Accordion.js.map