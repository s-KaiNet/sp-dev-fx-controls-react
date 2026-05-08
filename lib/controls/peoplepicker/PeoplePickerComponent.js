import { __awaiter, __extends, __generator, __spreadArray } from "tslib";
import * as strings from 'ControlStrings';
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import styles from './PeoplePickerComponent.module.scss';
import SPPeopleSearchService from "../../services/PeopleSearchService";
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Label } from '@fluentui/react/lib/Label';
import FieldErrorMessage from '../errorMessage/ErrorMessage';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';
import { NormalPeoplePicker } from '@fluentui/react/lib/Pickers';
/**
 * PeoplePicker component
 */
var PeoplePicker = /** @class */ (function (_super) {
    __extends(PeoplePicker, _super);
    function PeoplePicker(props) {
        var _this = _super.call(this, props) || this;
        /**
         * A search field change occured
         */
        _this.onSearchFieldChanged = function (searchText, currentSelected) { return __awaiter(_this, void 0, void 0, function () {
            var results, _a, selectedPersons, mostRecentlyUsedPersons, filteredPersons, recentlyUsed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(searchText.length > this.searchTextCount)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.peopleSearchService.searchPeople(searchText, this.suggestionsLimit, this.props.principalTypes, this.props.webAbsoluteUrl, this.groupId, this.props.ensureUser, this.props.allowUnvalidated)];
                    case 1:
                        results = _b.sent();
                        _a = this.state, selectedPersons = _a.selectedPersons, mostRecentlyUsedPersons = _a.mostRecentlyUsedPersons;
                        filteredPersons = this.removeDuplicates(results, selectedPersons);
                        // If a resultFilter is provided apply the filter to the results
                        if (this.props.resultFilter !== undefined && filteredPersons.length > 0) {
                            filteredPersons = this.props.resultFilter(filteredPersons);
                        }
                        recentlyUsed = __spreadArray(__spreadArray([], filteredPersons, true), mostRecentlyUsedPersons, true);
                        recentlyUsed = uniqBy(recentlyUsed, "text");
                        this.setState({
                            mostRecentlyUsedPersons: recentlyUsed.slice(0, this.suggestionsLimit)
                        });
                        return [2 /*return*/, filteredPersons];
                    case 2: return [2 /*return*/, []];
                }
            });
        }); };
        /**
         * On item selection change event
         */
        _this.onChange = function (items) {
            _this.setState({
                selectedPersons: items
            });
            _this.validate(items)
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        };
        /**
         * On blur UI event
         * @param ev
         */
        _this.onBlur = function (ev) {
            if (_this.props.validateOnFocusOut) {
                _this.validate(_this.state.selectedPersons)
                    .then(function () {
                    // no-op;
                })
                    .catch(function () {
                    // no-op;
                });
            }
        };
        /**
         * Returns the most recently used person
         *
         * @param currentPersonas
         */
        _this.returnMostRecentlyUsedPerson = function (currentPersonas) {
            var mostRecentlyUsedPersons = _this.state.mostRecentlyUsedPersons;
            return _this.removeDuplicates(mostRecentlyUsedPersons, currentPersonas);
        };
        /**
         * Removes duplicates
         *
         * @param personas
         * @param possibleDupes
         */
        _this.removeDuplicates = function (personas, possibleDupes) {
            return personas.filter(function (persona) { return !_this.listContainsPersona(persona, possibleDupes); });
        };
        _this.validate = function (items) { return __awaiter(_this, void 0, void 0, function () {
            var result, resolvedResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.props.errorMessage || !this.props.onGetErrorMessage) { // ignoring all onGetErrorMessage logic
                            this.validated(items);
                            return [2 /*return*/];
                        }
                        result = this.props.onGetErrorMessage(items || []);
                        if (!result) {
                            this.validated(items);
                            this.setState({
                                errorMessage: undefined
                            });
                            return [2 /*return*/];
                        }
                        if (!(typeof result === 'string')) return [3 /*break*/, 1];
                        if (!result) {
                            this.validated(items);
                            this.setState({
                                errorMessage: undefined
                            });
                        }
                        else {
                            this.setState({
                                errorMessage: result
                            });
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result];
                    case 2:
                        resolvedResult = _b.sent();
                        if (!resolvedResult) {
                            this.validated(items);
                            this.setState({
                                errorMessage: undefined
                            });
                        }
                        else {
                            this.setState({
                                errorMessage: resolvedResult
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        this.validated(items);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.validated = function (value) {
            if (_this.props.onChange) {
                _this.props.onChange(value);
            }
        };
        /**
         * Checks if list contains the person
         *
         * @param persona
         * @param personas
         */
        _this.listContainsPersona = function (persona, personas) {
            if (!personas || !personas.length || personas.length === 0) {
                return false;
            }
            return personas.some(function (item) { return item.text === persona.text && item.secondaryText === persona.secondaryText; });
        };
        _this.peopleSearchService = new SPPeopleSearchService(props.context, props.useSubstrateSearch);
        _this.suggestionsLimit = _this.props.suggestionsLimit ? _this.props.suggestionsLimit : 5;
        _this.searchTextCount = _this.props.searchTextLimit ? _this.props.searchTextLimit : 2;
        telemetry.track('ReactPeoplePicker', {
            groupName: !!props.groupName,
            name: !!props.groupName,
            titleText: !!props.titleText
        });
        _this.state = {
            selectedPersons: [],
            mostRecentlyUsedPersons: [],
            resolveDelay: _this.props.resolveDelay || 200,
            errorMessage: props.errorMessage
        };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    PeoplePicker.prototype.UNSAFE_componentWillMount = function () {
        this.getInitialPersons(this.props)
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * componentWillUpdate lifecycle hook
     */
    PeoplePicker.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        if (!isEqual(this.props.defaultSelectedUsers, nextProps.defaultSelectedUsers) ||
            this.props.groupName !== nextProps.groupName ||
            this.props.webAbsoluteUrl !== nextProps.webAbsoluteUrl ||
            this.peopleSearchService.getSumOfPrincipalTypes(this.props.principalTypes) !== this.peopleSearchService.getSumOfPrincipalTypes(nextProps.principalTypes)) {
            this.getInitialPersons(nextProps)
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        }
    };
    PeoplePicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.errorMessage !== this.props.errorMessage) {
            this.setState({
                errorMessage: nextProps.errorMessage
            });
        }
    };
    /**
     * clears all users and groups
     */
    PeoplePicker.prototype.clearSelectedPersons = function () {
        this.setState({
            selectedPersons: []
        });
    };
    /**
     * Get initial persons
     */
    PeoplePicker.prototype.getInitialPersons = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var groupName, groupId, webAbsoluteUrl, defaultSelectedUsers, ensureUser, allowUnvalidated, principalTypes, _a, selectedPersons, _i, _b, userValue, valueAndTitle, userResult, inactiveUser;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        groupName = props.groupName, groupId = props.groupId, webAbsoluteUrl = props.webAbsoluteUrl, defaultSelectedUsers = props.defaultSelectedUsers, ensureUser = props.ensureUser, allowUnvalidated = props.allowUnvalidated, principalTypes = props.principalTypes;
                        if (!groupName) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.peopleSearchService.getGroupId(groupName, webAbsoluteUrl)];
                    case 1:
                        _a.groupId = _c.sent();
                        if (!this.groupId) {
                            this.setState({
                                internalErrorMessage: strings.PeoplePickerGroupNotFound
                            });
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (groupId) {
                            this.groupId = groupId;
                        }
                        else {
                            this.groupId = null;
                        }
                        _c.label = 3;
                    case 3:
                        if (!defaultSelectedUsers) return [3 /*break*/, 8];
                        selectedPersons = [];
                        _i = 0, _b = props.defaultSelectedUsers;
                        _c.label = 4;
                    case 4:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        userValue = _b[_i];
                        valueAndTitle = [];
                        valueAndTitle.push(userValue);
                        if (userValue && userValue.indexOf('/') > -1) {
                            valueAndTitle = userValue.split('/');
                        }
                        return [4 /*yield*/, this.peopleSearchService.searchPersonByEmailOrLogin(valueAndTitle[0], principalTypes, webAbsoluteUrl, this.groupId, ensureUser, allowUnvalidated)];
                    case 5:
                        userResult = _c.sent();
                        if (userResult) {
                            selectedPersons.push(userResult);
                        }
                        else if (valueAndTitle.length === 2 && valueAndTitle[1]) { //user not found.. bind the title if exists
                            inactiveUser = { text: valueAndTitle[1] };
                            selectedPersons.push(inactiveUser);
                        }
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        this.setState({
                            selectedPersons: selectedPersons,
                            internalErrorMessage: undefined
                        });
                        _c.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default React component render method
     */
    PeoplePicker.prototype.render = function () {
        var _a;
        var _b = this.props, peoplePickerCntrlclassName = _b.peoplePickerCntrlclassName, peoplePickerWPclassName = _b.peoplePickerWPclassName, required = _b.required, titleText = _b.titleText, suggestionsLimit = _b.suggestionsLimit, placeholder = _b.placeholder, personSelectionLimit = _b.personSelectionLimit, disabled = _b.disabled, showtooltip = _b.showtooltip, tooltipMessage = _b.tooltipMessage, tooltipDirectional = _b.tooltipDirectional, errorMessageClassName = _b.errorMessageClassName;
        var _c = this.state, selectedPersons = _c.selectedPersons, resolveDelay = _c.resolveDelay, errorMessage = _c.errorMessage, internalErrorMessage = _c.internalErrorMessage;
        var suggestionProps = {
            suggestionsHeaderText: strings.peoplePickerSuggestionsHeaderText,
            noResultsFoundText: strings.genericNoResultsFoundText,
            loadingText: strings.peoplePickerLoadingText,
            resultsMaximumNumber: suggestionsLimit ? suggestionsLimit : 5,
            searchingText: strings.PeoplePickerSearchText
        };
        var peoplepicker = (React.createElement("div", { id: "people", className: "".concat(styles.defaultClass, " ").concat(peoplePickerWPclassName ? peoplePickerWPclassName : '') },
            titleText && React.createElement(Label, { required: required }, titleText),
            React.createElement(NormalPeoplePicker, { pickerSuggestionsProps: suggestionProps, styles: (_a = this.props.styles) !== null && _a !== void 0 ? _a : undefined, onResolveSuggestions: this.onSearchFieldChanged, onEmptyInputFocus: this.returnMostRecentlyUsedPerson, getTextFromItem: function (peoplePersonaMenu) { return peoplePersonaMenu.text; }, className: "ms-PeoplePicker ".concat(peoplePickerCntrlclassName ? peoplePickerCntrlclassName : ''), key: 'normal', removeButtonAriaLabel: 'Remove', inputProps: {
                    'aria-label': 'People Picker',
                    placeholder: placeholder
                }, selectedItems: selectedPersons, itemLimit: personSelectionLimit || 1, disabled: disabled || !!internalErrorMessage, onChange: this.onChange, onBlur: this.onBlur, resolveDelay: resolveDelay })));
        return (React.createElement("div", null,
            showtooltip ? (React.createElement(TooltipHost, { content: tooltipMessage || strings.peoplePickerComponentTooltipMessage, id: 'pntp', calloutProps: { gapSpace: 0 }, directionalHint: tooltipDirectional || DirectionalHint.leftTopEdge }, peoplepicker)) : (React.createElement("div", null, peoplepicker)),
            React.createElement(FieldErrorMessage, { errorMessage: errorMessage || internalErrorMessage, className: errorMessageClassName })));
    };
    return PeoplePicker;
}(React.Component));
export { PeoplePicker };
//# sourceMappingURL=PeoplePickerComponent.js.map