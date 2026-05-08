import { __assign, __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from "react";
import Term from "./Term";
import styles from './TaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';
import { COLLAPSED_IMG, EXPANDED_IMG } from "./TaxonomyPicker";
import { UpdateType } from "./termActions";
export var TermTree = function (_a) {
    var props = _a.props, term = _a.term, children = _a.children;
    var findActiveDescendantRecursive = function (nodes) {
        var _loop_1 = function (node) {
            // Check if this child is active
            if (props.activeNodes.some(function (activeNode) { return activeNode.key === node.term.Id; })) {
                return { value: true };
            }
            // Check its children recursively
            if (node.children && node.children.length > 0) {
                var hasActiveChild = findActiveDescendantRecursive(node.children);
                if (hasActiveChild)
                    return { value: true };
            }
        };
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var node = nodes_1[_i];
            var state_1 = _loop_1(node);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return false;
    };
    var isActiveOrHasActiveDescendant = function () {
        // Check if current term is active
        var isCurrentTermActive = props.activeNodes.some(function (node) { return node.key === term.Id; });
        // If current term is active, no need to check children
        if (isCurrentTermActive)
            return true;
        // Check if any descendant term is active
        var hasActiveDescendant = findActiveDescendantRecursive(children);
        return hasActiveDescendant;
    };
    var _b = useState(true), hasVisibleChild = _b[0], setHasVisibleChild = _b[1];
    var _c = useState(function () {
        return term.PathDepth < 1 || isActiveOrHasActiveDescendant();
    }), expanded = _c[0], setExpanded = _c[1];
    var onCollapseClick = function () {
        setExpanded(!expanded);
    };
    var isHiddenByActions = function (term, actions) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, actions_1, action, shouldApply, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, actions_1 = actions;
                    _a.label = 1;
                case 1:
                    if (!(_i < actions_1.length)) return [3 /*break*/, 5];
                    action = actions_1[_i];
                    return [4 /*yield*/, action.applyToTerm(term, function () {
                            // no-op
                        }, function () {
                            // no-op
                        })];
                case 2:
                    shouldApply = _a.sent();
                    if (!shouldApply) return [3 /*break*/, 4];
                    return [4 /*yield*/, action.actionCallback(null, term)];
                case 3:
                    result = _a.sent();
                    if (result.updateActionType === UpdateType.hideTerm) {
                        return [2 /*return*/, true];
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/, false];
            }
        });
    }); };
    useEffect(function () {
        var hasVisibleChild = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, children_1, child, childIsHidden;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!((_a = props.termActions.actions) === null || _a === void 0 ? void 0 : _a.length)) {
                            return [2 /*return*/, true];
                        }
                        _i = 0, children_1 = children;
                        _b.label = 1;
                    case 1:
                        if (!(_i < children_1.length)) return [3 /*break*/, 4];
                        child = children_1[_i];
                        return [4 /*yield*/, isHiddenByActions(child.term, props.termActions.actions)];
                    case 2:
                        childIsHidden = _b.sent();
                        if (!childIsHidden) {
                            return [2 /*return*/, true];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, false];
                }
            });
        }); };
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        hasVisibleChild().then(function (result) {
            setHasVisibleChild(result);
        });
    }, []);
    return (React.createElement("div", { className: styles.termTree },
        term.PathDepth < props.maxLevel && hasVisibleChild && term.TermsCount > 0 && React.createElement("img", { onClick: onCollapseClick, src: expanded ? EXPANDED_IMG : COLLAPSED_IMG, alt: strings.TaxonomyPickerExpandTitle, title: strings.TaxonomyPickerExpandTitle }),
        React.createElement("div", null,
            React.createElement(Term, __assign({}, props)),
            React.createElement("div", { style: { display: expanded ? 'block' : 'none' } }, children.map(function (child) {
                return (React.createElement("div", { key: child.term.Id },
                    React.createElement(TermTree, __assign({}, child))));
            })))));
};
//# sourceMappingURL=TermTree.js.map