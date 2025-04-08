var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { TERMSET_IMG, TERM_IMG } from './TaxonomyPicker';
import styles from './TaxonomyPicker.module.scss';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import * as strings from 'ControlStrings';
import { TermTree } from './TermTree';
/**
 * Term Parent component, represents termset or term if anchorId
 */
var TermParent = /** @class */ (function (_super) {
    __extends(TermParent, _super);
    function TermParent(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The term set selection changed
         */
        _this.termSetSelectionChange = function (ev, isChecked) {
            _this.props.termSetSelectedChange(_this.props.termset, isChecked);
        };
        _this.resolveDisalbedState = function (term) {
            var disabledPaths = [];
            var disabled = false;
            if (_this.props.disabledTermIds && _this.props.disabledTermIds.length > 0) {
                // Check if the current term ID exists in the disabled term IDs array
                disabled = _this.props.disabledTermIds.indexOf(term.Id) !== -1;
                if (disabled) {
                    // Push paths to the disabled list
                    disabledPaths.push(term.PathOfTerm);
                }
            }
            if (_this.props.disableChildrenOfDisabledParents) {
                // Check if parent is disabled
                var parentPath = disabledPaths.filter(function (p) { return term.PathOfTerm.indexOf(p) !== -1; });
                disabled = parentPath && parentPath.length > 0;
            }
            return disabled;
        };
        _this._terms = _this.props.termset.Terms;
        _this.state = {
            loaded: true,
            expanded: true,
            collapseClickedTerm: null
        };
        _this._handleClick = _this._handleClick.bind(_this);
        return _this;
    }
    /**
     * componentWillMount
     */
    TermParent.prototype.UNSAFE_componentWillMount = function () {
        var _this = this;
        // fix term depth if anchroid for rendering
        if (this.props.anchorId) {
            var anchorTerm_1 = this._terms.filter(function (t) { return t.Id.toLowerCase() === _this.props.anchorId.toLowerCase(); }).shift();
            if (anchorTerm_1) {
                // Append ';' separator, as a suffix to anchor term path.
                var anchorTermPath_1 = "".concat(anchorTerm_1.PathOfTerm, ";");
                this._anchorName = anchorTerm_1.Name;
                var anchorTerms = this._terms.filter(function (t) { return t.PathOfTerm.substring(0, anchorTermPath_1.length) === anchorTermPath_1 && t.Id !== anchorTerm_1.Id; });
                anchorTerms = anchorTerms.map(function (term) {
                    term.PathDepth = term.PathDepth - anchorTerm_1.PathDepth;
                    return term;
                });
                this._terms = anchorTerms;
            }
        }
    };
    /**
     * Handle the click event: collapse or expand
     */
    TermParent.prototype._handleClick = function () {
        this.setState({
            expanded: !this.state.expanded
        });
    };
    /**
   * Converts a flat array of terms into a hierarchical tree structure
   * @param terms The flat array of terms
   * @returns An array of ITermsTree representing the root nodes with their children
   */
    TermParent.prototype.buildTermsTree = function (terms) {
        var _this = this;
        // Create a map for quick term lookup by ID
        var termMap = new Map();
        var maxLevel = terms.reduce(function (maxDepth, currentTerm) {
            return currentTerm.PathDepth > maxDepth ? currentTerm.PathDepth : maxDepth;
        }, 0);
        // First pass: create tree nodes for all terms
        terms.forEach(function (term) {
            termMap.set(term.Id, {
                term: term,
                children: [],
                parent: undefined,
                props: undefined
            });
        });
        // Second pass: establish parent-child relationships
        var rootTerms = [];
        terms.forEach(function (term) {
            var termNode = termMap.get(term.Id);
            termNode.props = {
                term: termNode.term,
                termset: _this.props.termset.Id,
                activeNodes: _this.props.activeNodes,
                changedCallback: _this.props.changedCallback,
                multiSelection: _this.props.multiSelection,
                disabled: _this.resolveDisalbedState(termNode.term),
                termActions: _this.props.termActions,
                updateTaxonomyTree: _this.props.updateTaxonomyTree,
                spTermService: _this.props.spTermService,
                maxLevel: maxLevel
            };
            if (term.ParentId && termMap.has(term.ParentId)) {
                // This term has a parent in our collection, add it as a child
                var parentNode = termMap.get(term.ParentId);
                parentNode.children.push(termNode);
                termNode.parent = parentNode;
            }
            else {
                // This is a root term with no parent in our collection
                rootTerms.push(termNode);
            }
        });
        return rootTerms;
    };
    /**
     * Default React render method
     */
    TermParent.prototype.render = function () {
        // Specify the inline styling to show or hide the termsets
        var styleProps = {
            display: this.state.expanded ? 'block' : 'none'
        };
        var termElm = React.createElement("div", null);
        // Check if the terms have been loaded
        if (this.state.loaded) {
            var termTree = this.buildTermsTree(this._terms);
            if (this._terms.length > 0) {
                termElm = (React.createElement("div", { style: styleProps }, termTree.map(function (termsTree) {
                    return React.createElement(TermTree, __assign({ key: termsTree.term.Id }, termsTree));
                })));
            }
            else {
                termElm = React.createElement("div", { className: "".concat(styles.listItem, " ").concat(styles.term) }, strings.TaxonomyPickerNoTerms);
            }
        }
        else {
            termElm = React.createElement(Spinner, { size: SpinnerSize.medium });
        }
        return (React.createElement("div", null,
            React.createElement("div", { className: "".concat(styles.listItem, " ").concat(styles.termset, " ").concat((!this.props.anchorId && this.props.isTermSetSelectable) ? styles.termSetSelectable : ""), onClick: this._handleClick },
                // Show the termset selection box
                (!this.props.anchorId && this.props.isTermSetSelectable) &&
                    React.createElement(Checkbox, { className: styles.termSetSelector, checked: this.props.activeNodes.filter(function (a) { return a.path === "" && a.key === a.termSet; }).length >= 1, onChange: this.termSetSelectionChange }),
                React.createElement("img", { src: this.props.anchorId ? TERM_IMG : TERMSET_IMG, alt: strings.TaxonomyPickerMenuTermSet, title: strings.TaxonomyPickerMenuTermSet }),
                this.props.anchorId ?
                    this._anchorName :
                    this.props.termset.Name),
            React.createElement("div", { style: styleProps }, termElm)));
    };
    return TermParent;
}(React.Component));
export default TermParent;
//# sourceMappingURL=TermParent.js.map