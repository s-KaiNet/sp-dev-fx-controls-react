import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { TermActionsDisplayMode, TermActionsDisplayStyle } from './ITermsActions';
import { DropdownTermAction } from './DropdownTermAction';
import ButtonTermAction from './ButtonTermAction';
var TermActionsControl = /** @class */ (function (_super) {
    __extends(TermActionsControl, _super);
    function TermActionsControl(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Sets the visibility of a certain action
         * @param isHidden
         */
        _this.setActionStateForTerm = function (actionId, termId, type, value) {
            _this.setState(function (prevState) {
                var _a;
                var termActionChanges = prevState.termActionChanges;
                if (!termActionChanges[termId]) {
                    termActionChanges[termId] = [];
                }
                var actionChanges = termActionChanges[termId].filter(function (action) { return action.actionId === actionId; });
                if (actionChanges.length === 0) {
                    termActionChanges[termId].push((_a = {
                            actionId: actionId
                        },
                        _a[type] = value,
                        _a));
                }
                else {
                    actionChanges[0][type] = value;
                }
                return {
                    termActionChanges: termActionChanges
                };
            });
        };
        var termActions = _this.props.termActions;
        var displayMode = termActions.termActionsDisplayMode ? termActions.termActionsDisplayMode : TermActionsDisplayMode.buttons;
        var displayStyle = termActions.termActionsDisplayStyle ? termActions.termActionsDisplayStyle : TermActionsDisplayStyle.text;
        _this.state = {
            availableActions: [],
            displayMode: displayMode,
            displayStyle: displayStyle,
            termActionChanges: {}
        };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    TermActionsControl.prototype.UNSAFE_componentWillMount = function () {
        this.getAvailableActions()
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Get the available term actions
     */
    TermActionsControl.prototype.getAvailableActions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, term, termActions, availableActions, _i, _b, action, available;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, term = _a.term, termActions = _a.termActions;
                        availableActions = [];
                        if (!termActions.actions) return [3 /*break*/, 4];
                        _i = 0, _b = termActions.actions;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        action = _b[_i];
                        return [4 /*yield*/, action.applyToTerm(term, this.props.termActionCallback, this.setActionStateForTerm)];
                    case 2:
                        available = _c.sent();
                        if (available) {
                            availableActions.push(action);
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.setState({
                            availableActions: availableActions
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default React render method
     */
    TermActionsControl.prototype.render = function () {
        var term = this.props.term;
        var _a = this.state, displayStyle = _a.displayStyle, displayMode = _a.displayMode, availableActions = _a.availableActions, termActionChanges = _a.termActionChanges;
        if (!availableActions || availableActions.length <= 0 || !term) {
            return null;
        }
        return (React.createElement("div", null, displayMode === TermActionsDisplayMode.dropdown ?
            React.createElement(DropdownTermAction, { key: "DdAction-".concat(term.Id), termActions: availableActions, term: term, displayStyle: displayStyle, termActionCallback: this.props.termActionCallback, spTermService: this.props.spTermService, termActionChanges: termActionChanges })
            :
                React.createElement(ButtonTermAction, { key: "BtnAction-".concat(term.Id), termActions: availableActions, term: term, displayStyle: displayStyle, termActionCallback: this.props.termActionCallback, spTermService: this.props.spTermService, termActionChanges: termActionChanges })));
    };
    return TermActionsControl;
}(React.Component));
export default TermActionsControl;
//# sourceMappingURL=TermActionsControl.js.map