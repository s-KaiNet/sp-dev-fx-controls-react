var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    useEffect(function () {
        var hasVisibleChild = function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, children_1, child, childIsHidden, _a, _b, action, shouldApply, result;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!((_c = props.termActions.actions) === null || _c === void 0 ? void 0 : _c.length)) {
                            return [2 /*return*/, true];
                        }
                        _i = 0, children_1 = children;
                        _d.label = 1;
                    case 1:
                        if (!(_i < children_1.length)) return [3 /*break*/, 8];
                        child = children_1[_i];
                        childIsHidden = false;
                        _a = 0, _b = props.termActions.actions;
                        _d.label = 2;
                    case 2:
                        if (!(_a < _b.length)) return [3 /*break*/, 6];
                        action = _b[_a];
                        return [4 /*yield*/, action.applyToTerm(child.term, function () {
                                // no-op
                            }, function () {
                                // no-op
                            })];
                    case 3:
                        shouldApply = _d.sent();
                        if (!shouldApply) return [3 /*break*/, 5];
                        return [4 /*yield*/, action.actionCallback(null, child.term)];
                    case 4:
                        result = _d.sent();
                        if (result.updateActionType === UpdateType.hideTerm) {
                            childIsHidden = true;
                            return [3 /*break*/, 6];
                        }
                        _d.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 2];
                    case 6:
                        if (!childIsHidden) {
                            return [2 /*return*/, true];
                        }
                        _d.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/, true];
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