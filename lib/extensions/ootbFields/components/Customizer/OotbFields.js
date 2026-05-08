import { __extends } from "tslib";
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import styles from './OotbFields.module.scss';
import { FieldRendererHelper } from '../../../../common/utilities/FieldRendererHelper';
var LOG_SOURCE = 'OotbFields';
/**
 * Field Customizer control to test fields' controls
 */
var OotbFields = /** @class */ (function (_super) {
    __extends(OotbFields, _super);
    function OotbFields(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.state = {};
        return _this;
    }
    OotbFields.prototype.UNSAFE_componentWillMount = function () {
        var _this = this;
        FieldRendererHelper.getFieldRenderer(this.props.value, {
            className: this.props.className,
            cssProps: this.props.cssProps
        }, this.props.listItem, this.props.context).then(function (fieldRenderer) {
            _this.setState({
                fieldRenderer: fieldRenderer
            });
        });
    };
    OotbFields.prototype.componentDidMount = function () {
        Log.info(LOG_SOURCE, 'React Element: OotbFields mounted');
    };
    OotbFields.prototype.componentWillUnmount = function () {
        Log.info(LOG_SOURCE, 'React Element: OotbFields unmounted');
    };
    OotbFields.prototype.render = function () {
        return (React.createElement("div", { className: styles.cell }, this.state.fieldRenderer));
    };
    return OotbFields;
}(React.Component));
export default OotbFields;
//# sourceMappingURL=OotbFields.js.map