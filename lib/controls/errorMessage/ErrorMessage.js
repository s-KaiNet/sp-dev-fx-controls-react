import { __extends } from "tslib";
import * as React from 'react';
import styles from './ErrorMessage.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
/**
 * Component that shows an error message when something went wront with the property control
 */
var FieldErrorMessage = /** @class */ (function (_super) {
    __extends(FieldErrorMessage, _super);
    function FieldErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldErrorMessage.prototype.render = function () {
        var _a = this.props, errorMessage = _a.errorMessage, className = _a.className;
        if (errorMessage !== undefined && errorMessage !== null && errorMessage !== '') {
            return (React.createElement("div", { "aria-live": "assertive" },
                React.createElement("p", { className: "ms-TextField-errorMessage ".concat(styles.errorMessage, " ").concat(className || '') },
                    React.createElement(Icon, { iconName: 'Error', className: styles.errorIcon }),
                    React.createElement("span", { "data-automation-id": "error-message" }, errorMessage))));
        }
        else {
            return null;
        }
    };
    return FieldErrorMessage;
}(React.Component));
export default FieldErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map