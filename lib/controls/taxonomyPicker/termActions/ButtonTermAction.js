import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { TermActionsDisplayStyle } from './ITermsActions';
import { getTermActionChange } from './getTermActionChange';
var ButtonTermAction = /** @class */ (function (_super) {
    __extends(ButtonTermAction, _super);
    function ButtonTermAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepares the command bar button
         */
        _this.prepareCommandBarButton = function (termAction) {
            var name = "";
            var text = "";
            var iconName = "";
            var btnTitle = "";
            if ((_this.props.displayStyle && (_this.props.displayStyle === TermActionsDisplayStyle.text || _this.props.displayStyle === TermActionsDisplayStyle.textAndIcon))) {
                name = termAction.title;
                text = termAction.title;
            }
            if (_this.props.displayStyle && (_this.props.displayStyle === TermActionsDisplayStyle.icon || _this.props.displayStyle === TermActionsDisplayStyle.textAndIcon)) {
                iconName = termAction.iconName;
            }
            btnTitle = termAction.title;
            return { name: name, text: text, iconName: iconName, btnTitle: btnTitle };
        };
        /**
         * Gets the action button styling
         */
        _this.getTermActionActionButtonStyle = function () {
            var result = {
                backgroundColor: "transparent",
                width: _this.props.displayStyle === TermActionsDisplayStyle.icon ? "32px" : null,
                height: "32px"
            };
            return result;
        };
        /**
         * On action execution
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
    ButtonTermAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    ButtonTermAction.prototype.checkForImmediateInvocations = function () {
        var termActions = this.props.termActions;
        for (var _i = 0, termActions_1 = termActions; _i < termActions_1.length; _i++) {
            var action = termActions_1[_i];
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
     * Render all the term actions
     */
    ButtonTermAction.prototype.renderTermActions = function () {
        var _this = this;
        var _a = this.props, term = _a.term, termActions = _a.termActions, termActionChanges = _a.termActionChanges;
        // Get term action changes
        var tac = termActionChanges[term.Id];
        return (termActions && termActions.map(function (termAction) {
            var _a = _this.prepareCommandBarButton(termAction), name = _a.name, text = _a.text, iconName = _a.iconName, btnTitle = _a.btnTitle;
            var _b = getTermActionChange(tac, termAction), actionDisabled = _b.actionDisabled, actionHidden = _b.actionHidden;
            if (actionHidden) {
                return null;
            }
            if (termAction.hidden && actionHidden === null) {
                return null;
            }
            return (React.createElement("div", { key: termAction.id },
                React.createElement(CommandBarButton, { split: true, onClick: function () {
                        _this.onActionExecute(termAction)
                            .then(function () {
                            // no-op;
                        })
                            .catch(function () {
                            // no-op;
                        });
                    }, iconProps: {
                        iconName: iconName || null,
                        style: { display: iconName ? null : "none" }
                    }, disabled: actionDisabled, text: text, title: btnTitle, name: name, key: term.Id, style: _this.getTermActionActionButtonStyle() })));
        }));
    };
    /**
     * Default React render method
     */
    ButtonTermAction.prototype.render = function () {
        // Get termActions
        var allActions = this.renderTermActions().filter(function (action) { return action !== null; });
        if (allActions && allActions.length > 0) {
            return (React.createElement("div", { style: { display: 'flex', alignItems: 'stretch', height: '32px' } }, allActions));
        }
        return null;
    };
    return ButtonTermAction;
}(React.Component));
export default ButtonTermAction;
//# sourceMappingURL=ButtonTermAction.js.map