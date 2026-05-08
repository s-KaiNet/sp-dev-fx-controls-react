import { __awaiter, __extends, __generator } from "tslib";
import { CommandBarButton } from '@fluentui/react/lib/Button';
import * as React from 'react';
import styles from './TreeView.module.scss';
/**
 * Renders the controls for Button TreeItem action component
 */
var ButtonTreeItemAction = /** @class */ (function (_super) {
    __extends(ButtonTreeItemAction, _super);
    function ButtonTreeItemAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepares the command bar button
         */
        _this.prepareCommandBarButton = function (treeItemAction) {
            var name = treeItemAction.title;
            var text = treeItemAction.title;
            var iconProps = treeItemAction.iconProps;
            var btnTitle = treeItemAction.title;
            return { name: name, text: text, iconProps: iconProps, btnTitle: btnTitle };
        };
        /**
         * On action execution
         */
        _this.onActionExecute = function (treeItemAction) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, treeItemAction.actionCallback(this.props.treeItem)];
                    case 1:
                        _a.sent();
                        this.props.treeItemActionCallback();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    ButtonTreeItemAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    ButtonTreeItemAction.prototype.checkForImmediateInvocations = function () {
        var treeItemActions = this.props.treeItemActions;
        for (var _i = 0, treeItemActions_1 = treeItemActions; _i < treeItemActions_1.length; _i++) {
            var action = treeItemActions_1[_i];
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
    ButtonTreeItemAction.prototype.render = function () {
        var _this = this;
        var _a = this.props, treeItem = _a.treeItem, treeItemActions = _a.treeItemActions;
        // Check if there are actions to show
        var actionsToShow = treeItemActions.filter(function (a) { return !a.hidden; });
        if (actionsToShow && actionsToShow.length === 0) {
            return null;
        }
        return (React.createElement("div", null, treeItemActions &&
            treeItemActions.map(function (treeItemAction) {
                var _a = _this.prepareCommandBarButton(treeItemAction), name = _a.name, text = _a.text, iconProps = _a.iconProps, btnTitle = _a.btnTitle;
                return (treeItemAction.hidden ? (null) : (React.createElement("div", null,
                    React.createElement(CommandBarButton, { split: true, onClick: function () {
                            _this.onActionExecute(treeItemAction)
                                .then(function () {
                                // no-op;
                            })
                                .catch(function () {
                                // no-op;
                            });
                        }, iconProps: iconProps, text: text, title: btnTitle, name: name, key: treeItem.key, className: styles.actionButton, theme: _this.props.theme }))));
            })));
    };
    return ButtonTreeItemAction;
}(React.Component));
export default ButtonTreeItemAction;
//# sourceMappingURL=ButtonTreeItemAction.js.map