import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { BasePicker } from '@fluentui/react/lib/Pickers';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import styles from './TaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';
import { IconButton } from '@fluentui/react';
import { UpdateType } from './termActions';
var TermBasePicker = /** @class */ (function (_super) {
    __extends(TermBasePicker, _super);
    function TermBasePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermBasePicker;
}(BasePicker));
export { TermBasePicker };
var TermPicker = /** @class */ (function (_super) {
    __extends(TermPicker, _super);
    /**
     * Constructor method
     */
    function TermPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.allTerms = null;
        _this.onRenderItem = _this.onRenderItem.bind(_this);
        _this.onRenderSuggestionsItem = _this.onRenderSuggestionsItem.bind(_this);
        _this.onFilterChanged = _this.onFilterChanged.bind(_this);
        _this.onGetTextFromItem = _this.onGetTextFromItem.bind(_this);
        _this.state = {
            terms: _this.props.value
        };
        _this.termsService = new SPTermStorePickerService(_this.props.termPickerHostProps, _this.props.context);
        return _this;
    }
    /**
     * componentWillReceiveProps method
     */
    TermPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        // check to see if props is different to avoid re-rendering
        var newKeys = nextProps.value.map(function (a) { return a.key; });
        var currentKeys = this.state.terms.map(function (a) { return a.key; });
        if (newKeys.sort().join(',') !== currentKeys.sort().join(',')) {
            this.setState({ terms: nextProps.value });
        }
    };
    /**
     * Renders the item in the picker
     */
    TermPicker.prototype.onRenderItem = function (term) {
        return (React.createElement("div", { className: styles.pickedTermRoot, key: term.index, title: term.item.name, "data-selection-index": term.index, "data-is-focusable": !term.disabled && true },
            React.createElement("span", { className: styles.pickedTermText }, term.item.name),
            !term.disabled && (React.createElement(IconButton, { iconProps: { iconName: "Cancel" }, onClick: term.onRemoveItem, className: styles.pickedTermCloseIcon }))));
    };
    /**
     * Renders the suggestions in the picker
     */
    TermPicker.prototype.onRenderSuggestionsItem = function (term) {
        var termParent = term.termSetName;
        var termTitle = "".concat(term.name, " [").concat(term.termSetName, "]");
        if (term.path.indexOf(";") !== -1) {
            var splitPath = term.path.split(";");
            termParent = splitPath[splitPath.length - 2];
            splitPath.pop();
            termTitle = "".concat(term.name, " [").concat(term.termSetName, ":").concat(splitPath.join(':'), "]");
        }
        return (React.createElement("div", { className: styles.termSuggestion, title: termTitle },
            React.createElement("div", null, term.name),
            React.createElement("div", { className: styles.termSuggestionSubTitle },
                " ",
                strings.TaxonomyPickerInLabel,
                " ",
                termParent ? termParent : strings.TaxonomyPickerTermSetLabel)));
    };
    /**
     * When Filter Changes a new search for suggestions
     */
    TermPicker.prototype.onFilterChanged = function (filterText, tagList) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, termPickerHostProps, isTermSetSelectable, termResults, terms, termSet, filteredTerms, _b, disabledTermIds_1, disableChildrenOfDisabledParents, _loop_1, this_1, _i, terms_1, term;
            var _this = this;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(filterText !== "")) return [3 /*break*/, 8];
                        _a = this.props, termPickerHostProps = _a.termPickerHostProps, isTermSetSelectable = _a.isTermSetSelectable;
                        return [4 /*yield*/, this.termsService.searchAllTermsByName(filterText)];
                    case 1:
                        termResults = _d.sent();
                        terms = termResults.map(function (r) { return _this.termsService.convertTermToPickerTerm(r); });
                        if (!(isTermSetSelectable && !termPickerHostProps.anchorId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.termsService.getTermSet()];
                    case 2:
                        termSet = _d.sent();
                        // Check if termset was retrieved and if it contains the filter value
                        if (termSet && termSet.Name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) {
                            // Add the termset to the suggestion list
                            terms.push({
                                key: this.termsService.cleanGuid(termSet.Id),
                                name: termSet.Name,
                                path: "",
                                termSet: this.termsService.cleanGuid(termSet.Id)
                            });
                        }
                        _d.label = 3;
                    case 3:
                        filteredTerms = [];
                        _b = this.props, disabledTermIds_1 = _b.disabledTermIds, disableChildrenOfDisabledParents = _b.disableChildrenOfDisabledParents;
                        _loop_1 = function (term) {
                            var canBePicked, sourceTerm, _e, _f, action, shouldApply, result, disabledParents, findTerm;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        canBePicked = true;
                                        sourceTerm = termResults.filter(function (t) { return t.Id === term.key; })[0];
                                        if (!(((_c = this_1.props.termPickerHostProps.termActions.actions) === null || _c === void 0 ? void 0 : _c.length) > 0)) return [3 /*break*/, 5];
                                        _e = 0, _f = this_1.props.termPickerHostProps.termActions.actions;
                                        _g.label = 1;
                                    case 1:
                                        if (!(_e < _f.length)) return [3 /*break*/, 5];
                                        action = _f[_e];
                                        return [4 /*yield*/, action.applyToTerm(sourceTerm, function () {
                                                // no-op
                                            }, function () {
                                                // no-op
                                            })];
                                    case 2:
                                        shouldApply = _g.sent();
                                        if (!shouldApply) return [3 /*break*/, 4];
                                        return [4 /*yield*/, action.actionCallback(null, sourceTerm)];
                                    case 3:
                                        result = _g.sent();
                                        if (result.updateActionType === UpdateType.disableTerm || result.updateActionType === UpdateType.hideTerm) {
                                            canBePicked = false;
                                        }
                                        _g.label = 4;
                                    case 4:
                                        _e++;
                                        return [3 /*break*/, 1];
                                    case 5:
                                        if (!(disabledTermIds_1 && disabledTermIds_1.length > 0)) return [3 /*break*/, 9];
                                        if (!(disabledTermIds_1.indexOf(term.key) !== -1)) return [3 /*break*/, 6];
                                        canBePicked = false;
                                        return [3 /*break*/, 9];
                                    case 6:
                                        if (!disableChildrenOfDisabledParents) return [3 /*break*/, 9];
                                        if (!!this_1.allTerms) return [3 /*break*/, 8];
                                        return [4 /*yield*/, this_1.termsService.getAllTerms(this_1.props.termPickerHostProps.termsetNameOrID, this_1.props.termPickerHostProps.hideDeprecatedTags, this_1.props.termPickerHostProps.hideTagsNotAvailableForTagging)];
                                    case 7:
                                        this_1.allTerms = _g.sent();
                                        _g.label = 8;
                                    case 8:
                                        // Check if there are terms retrieved
                                        if (this_1.allTerms.Terms && this_1.allTerms.Terms.length > 0) {
                                            disabledParents = this_1.allTerms.Terms.filter(function (t) { return disabledTermIds_1.indexOf(t.Id) !== -1; });
                                            // Check if disabled parents were found
                                            if (disabledParents && disabledParents.length > 0) {
                                                findTerm = disabledParents.filter(function (pt) { return term.path.indexOf(pt.PathOfTerm) !== -1; });
                                                if (findTerm && findTerm.length > 0) {
                                                    canBePicked = false;
                                                }
                                            }
                                        }
                                        _g.label = 9;
                                    case 9:
                                        if (canBePicked) {
                                            // Only retrieve the terms which are not yet tagged
                                            if (tagList.filter(function (tag) { return tag.key === term.key; }).length === 0) {
                                                filteredTerms.push(term);
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, terms_1 = terms;
                        _d.label = 4;
                    case 4:
                        if (!(_i < terms_1.length)) return [3 /*break*/, 7];
                        term = terms_1[_i];
                        return [5 /*yield**/, _loop_1(term)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, filteredTerms];
                    case 8: return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    /**
     * gets the text from an item
     */
    TermPicker.prototype.onGetTextFromItem = function (item) {
        return item.name;
    };
    /**
     * Render method
     */
    TermPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChanged = _a.onChanged, onInputChange = _a.onInputChange, onBlur = _a.onBlur, onNewTerm = _a.onNewTerm, allowMultipleSelections = _a.allowMultipleSelections, placeholder = _a.placeholder;
        var terms = this.state.terms;
        var clearDisplayValue = function () {
            var _a;
            var picker = _this.state.elRef;
            var autoFill = (_a = picker === null || picker === void 0 ? void 0 : picker['input']) === null || _a === void 0 ? void 0 : _a.current; // eslint-disable-line dot-notation
            if (autoFill) {
                autoFill['_value'] = ''; // eslint-disable-line dot-notation, @typescript-eslint/no-explicit-any
                autoFill.setState({ inputValue: '' });
            }
            else {
                throw new Error("TermPicker.TermBasePicker.render.clearDisplayValue no autoFill to reset displayValue");
            }
        };
        var inputProps = { placeholder: placeholder };
        if (onNewTerm) {
            inputProps.onKeyDown = function (e) {
                if (e && e.key === 'Enter' && (!(e.ctrlKey || e.altKey || e.shiftKey)) && e.target.value) { // eslint-disable-line dot-notation
                    onNewTerm(e.target.value); // eslint-disable-line dot-notation
                    clearDisplayValue();
                }
            };
        }
        return (React.createElement("div", null,
            React.createElement(TermBasePicker, { ref: function (elRef) {
                    if (!_this.state.elRef) {
                        _this.setState({ elRef: elRef });
                    }
                }, disabled: disabled, onResolveSuggestions: this.onFilterChanged, onRenderSuggestionsItem: this.onRenderSuggestionsItem, getTextFromItem: this.onGetTextFromItem, onRenderItem: this.onRenderItem, defaultSelectedItems: value, selectedItems: terms, onChange: onChanged, onInputChange: onInputChange, onBlur: onBlur, itemLimit: !allowMultipleSelections ? 1 : undefined, className: styles.termBasePicker, inputProps: inputProps })));
    };
    return TermPicker;
}(React.Component));
export default TermPicker;
//# sourceMappingURL=TermPicker.js.map