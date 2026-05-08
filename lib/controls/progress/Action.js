import { __extends } from "tslib";
import * as React from 'react';
import { ProgressActionState } from './IProgress';
import styles from './Progress.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import { css } from '@fluentui/react/lib/Utilities';
var Action = /** @class */ (function (_super) {
    __extends(Action, _super);
    function Action() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Default React render method
     */
    Action.prototype.render = function () {
        var _a = this.props, state = _a.state, subActionsTitles = _a.subActionsTitles, errorMessage = _a.errorMessage, title = _a.title, className = _a.className, successIconName = _a.successIconName, errorIconName = _a.errorIconName, inProgressIconName = _a.inProgressIconName;
        var inactive = state === ProgressActionState.notStarted;
        var labelClassName = inactive ? css(styles.label, styles.inactive) : styles.label;
        var iconName = '';
        var iconClassName = '';
        switch (state) {
            case ProgressActionState.finished:
                iconName = successIconName || 'CheckMark';
                iconClassName = styles.successIcon;
                break;
            case ProgressActionState.notStarted:
                iconName = successIconName || 'CheckMark';
                iconClassName = styles.inactiveIcon;
                break;
            case ProgressActionState.errored:
                iconName = errorIconName || 'Error';
                iconClassName = styles.errorIcon;
                break;
            case ProgressActionState.inProgress:
                iconName = inProgressIconName;
                break;
        }
        return (React.createElement("div", { className: css(styles.actionContainer, className) },
            React.createElement("div", { className: styles.actionHeader },
                iconName ? (React.createElement(Icon, { className: css(styles.actionIcon, iconClassName), iconName: iconName })) : (React.createElement(Spinner, { className: css(styles.actionIcon, styles.spinner), size: SpinnerSize.small })),
                React.createElement("div", { className: labelClassName }, title)),
            subActionsTitles && (React.createElement("div", { className: styles.subActionsContainer }, subActionsTitles.map(function (saTitle, index) { return (React.createElement("div", { className: labelClassName, key: index }, saTitle)); }))),
            state === ProgressActionState.errored && (React.createElement("div", { className: styles.errorContainer },
                React.createElement(Label, { className: styles.errorMessage }, errorMessage)))));
    };
    return Action;
}(React.Component));
export { Action };
//# sourceMappingURL=Action.js.map