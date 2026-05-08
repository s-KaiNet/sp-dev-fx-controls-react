import { __awaiter, __extends, __generator } from "tslib";
import { IconButton } from '@fluentui/react/lib/Button';
import * as React from 'react';
import styles from './TreeView.module.scss';
/**
 * Renders the controls for Dropdown TreeItem action component
 */
var DropdownTreeItemAction = /** @class */ (function (_super) {
    __extends(DropdownTreeItemAction, _super);
    function DropdownTreeItemAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepates contextual menu items for dropdown.
         */
        _this.prepareContextualMenuProps = function (treeItem, treeItemActions) {
            var items = [];
            var useTargetWidth = true;
            var _loop_1 = function (treeItemAction) {
                if (!treeItemAction.hidden) {
                    var treeItemActionMenuItem = {
                        key: treeItem.key.toString(),
                        onClick: function () {
                            _this.onActionExecute(treeItemAction)
                                .then(function () {
                                // no-op;
                            })
                                .catch(function () {
                                // no-op;
                            });
                        }
                    };
                    treeItemActionMenuItem.text = treeItemAction.title;
                    treeItemActionMenuItem.name = treeItemAction.title;
                    treeItemActionMenuItem.iconProps = treeItemAction.iconProps;
                    useTargetWidth = treeItemActionMenuItem.iconProps ? false : true;
                    items.push(treeItemActionMenuItem);
                }
            };
            for (var _i = 0, treeItemActions_1 = treeItemActions; _i < treeItemActions_1.length; _i++) {
                var treeItemAction = treeItemActions_1[_i];
                _loop_1(treeItemAction);
            }
            var contextualMenuProps = {
                items: items,
                useTargetWidth: useTargetWidth
            };
            return contextualMenuProps;
        };
        /**
         * Handler to execute selected action.
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
    DropdownTreeItemAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    DropdownTreeItemAction.prototype.checkForImmediateInvocations = function () {
        var treeItemActions = this.props.treeItemActions;
        for (var _i = 0, treeItemActions_2 = treeItemActions; _i < treeItemActions_2.length; _i++) {
            var action = treeItemActions_2[_i];
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
    DropdownTreeItemAction.prototype.render = function () {
        var _a = this.props, treeItem = _a.treeItem, treeItemActions = _a.treeItemActions;
        var contextualMenuProps = this.prepareContextualMenuProps(treeItem, treeItemActions);
        return (React.createElement("div", null,
            React.createElement(IconButton, { menuProps: contextualMenuProps, menuIconProps: { iconName: 'MoreVertical' }, className: styles.actionMore, title: "More", ariaLabel: "More", theme: this.props.theme })));
    };
    return DropdownTreeItemAction;
}(React.Component));
export { DropdownTreeItemAction };
//# sourceMappingURL=DropdownTreeItemAction.js.map