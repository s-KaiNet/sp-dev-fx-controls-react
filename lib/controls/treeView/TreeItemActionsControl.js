import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import ButtonTreeItemAction from './ButtonTreeItemAction';
import { DropdownTreeItemAction } from './DropdownTreeItemAction';
import { TreeItemActionsDisplayMode } from './ITreeItemActions';
/**
 * Renders the controls for TreeItem actions component
 */
var TreeItemActionsControl = /** @class */ (function (_super) {
    __extends(TreeItemActionsControl, _super);
    /**
     * Constructor method
     * @param props properties interface
     */
    function TreeItemActionsControl(props) {
        var _this = _super.call(this, props) || this;
        var treeItemActions = _this.props.treeItemActions;
        var displayMode = treeItemActions.treeItemActionsDisplayMode ? treeItemActions.treeItemActionsDisplayMode : TreeItemActionsDisplayMode.Buttons;
        _this.state = {
            availableActions: [],
            displayMode: displayMode
        };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    TreeItemActionsControl.prototype.UNSAFE_componentWillMount = function () {
        this.getAvailableActions()
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Get the available treeItem actions
     */
    TreeItemActionsControl.prototype.getAvailableActions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var treeItemActions, availableActions, _i, _a, action;
            return __generator(this, function (_b) {
                treeItemActions = this.props.treeItemActions;
                availableActions = [];
                if (treeItemActions.actions) {
                    for (_i = 0, _a = treeItemActions.actions; _i < _a.length; _i++) {
                        action = _a[_i];
                        availableActions.push(action);
                    }
                }
                this.setState({
                    availableActions: availableActions
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * Default React render method
     */
    TreeItemActionsControl.prototype.render = function () {
        var treeItem = this.props.treeItem;
        var _a = this.state, displayMode = _a.displayMode, availableActions = _a.availableActions;
        if (!availableActions || availableActions.length <= 0 || !treeItem) {
            return null;
        }
        return (React.createElement("div", null, displayMode === TreeItemActionsDisplayMode.ContextualMenu ?
            React.createElement(DropdownTreeItemAction, { key: "DdAction-".concat(treeItem.key), treeItemActions: availableActions, treeItem: treeItem, treeItemActionCallback: this.props.treeItemActionCallback, theme: this.props.theme })
            :
                React.createElement(ButtonTreeItemAction, { key: "BtnAction-".concat(treeItem.key), treeItemActions: availableActions, treeItem: treeItem, treeItemActionCallback: this.props.treeItemActionCallback, theme: this.props.theme })));
    };
    return TreeItemActionsControl;
}(React.Component));
export default TreeItemActionsControl;
//# sourceMappingURL=TreeItemActionsControl.js.map