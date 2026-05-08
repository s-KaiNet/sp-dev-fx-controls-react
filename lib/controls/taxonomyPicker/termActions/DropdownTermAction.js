import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TermActionsDisplayStyle } from './ITermsActions';
import { getTermActionChange } from './getTermActionChange';
var DropdownTermAction = /** @class */ (function (_super) {
    __extends(DropdownTermAction, _super);
    function DropdownTermAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepates contextual menu items for dropdown.
         */
        _this.prepareContextualMenuProps = function (term, termActions) {
            var items = [];
            var displayStyle = _this.props.displayStyle;
            var useTargetWidth = true;
            // Get term action changes
            var termActionChanges = _this.props.termActionChanges;
            var tac = termActionChanges[term.Id];
            var _loop_1 = function (termAction) {
                var _a = getTermActionChange(tac, termAction), actionDisabled = _a.actionDisabled, actionHidden = _a.actionHidden;
                if ((!termAction.hidden && !actionHidden) || !actionHidden) {
                    var termActionMenuItem = {
                        key: term.Id.toString(),
                        onClick: function () {
                            _this.onActionExecute(termAction)
                                .then(function () {
                                // no-op;
                            })
                                .catch(function () {
                                // no-op;
                            });
                        },
                        disabled: actionDisabled
                    };
                    if (displayStyle && (displayStyle === TermActionsDisplayStyle.text || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
                        termActionMenuItem.text = termAction.title;
                        termActionMenuItem.name = termAction.title;
                        useTargetWidth = false;
                    }
                    if (displayStyle && (displayStyle === TermActionsDisplayStyle.icon || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
                        termActionMenuItem.iconProps = { iconName: termAction.iconName };
                    }
                    items.push(termActionMenuItem);
                }
            };
            for (var _i = 0, termActions_1 = termActions; _i < termActions_1.length; _i++) {
                var termAction = termActions_1[_i];
                _loop_1(termAction);
            }
            var contextualMenuProps = {
                items: items,
                useTargetWidth: useTargetWidth
            };
            return contextualMenuProps;
        };
        /**
         * Prepare term action button style.
         */
        _this.getTermActionActionButtonStyle = function () {
            var result = {
                backgroundColor: "transparent",
                width: "14px",
                display: "inline-flex",
                padding: "0px"
            };
            return result;
        };
        /**
         * Handler to execute selected action.
         */
        _this.onActionExecute = function (termAction) { return __awaiter(_this, void 0, void 0, function () {
            var updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, termAction.actionCallback(this.props.spTermService, this.props.term)];
                    case 1:
                        updateAction = _a.sent();
                        this.props.termActionCallback(updateAction);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    DropdownTermAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    DropdownTermAction.prototype.checkForImmediateInvocations = function () {
        var termActions = this.props.termActions;
        for (var _i = 0, termActions_2 = termActions; _i < termActions_2.length; _i++) {
            var action = termActions_2[_i];
            if (action.invokeActionOnRender) {
                this.onActionExecute(action)
                    .then(function () {
                    // no-op;
                })
                    .catch(function () {
                    // no-op;
                });
            }
        }
    };
    /**
     * Default React render method
     */
    DropdownTermAction.prototype.render = function () {
        var _a = this.props, term = _a.term, termActions = _a.termActions;
        var termActionButtonStyle = this.getTermActionActionButtonStyle();
        var contextualMenuProps = this.prepareContextualMenuProps(term, termActions);
        return (React.createElement("div", { style: { display: 'flex', alignItems: 'stretch', height: '32px' } },
            React.createElement(DefaultButton, { style: termActionButtonStyle, menuProps: contextualMenuProps })));
    };
    return DropdownTermAction;
}(React.Component));
export { DropdownTermAction };
//# sourceMappingURL=DropdownTermAction.js.map