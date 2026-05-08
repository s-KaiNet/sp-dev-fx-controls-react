import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, } from '@fluentui/react/lib/Dropdown';
import { Spinner, SpinnerSize, } from '@fluentui/react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { SPServiceFactory } from '../../services/SPServiceFactory';
var EMPTY_CONTENTTYPE_KEY = 'NO_CONTENTTYPE_SELECTED';
var ContentTypePicker = /** @class */ (function (_super) {
    __extends(ContentTypePicker, _super);
    function ContentTypePicker(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedContentTypes = null;
        /**
         * Fires when an item has been selected from the dropdown.
         * @param event Event that has been fired.
         * @param option The new selection.
         * @param index Index of the selection.
         */
        _this.onChange = function (event, option, index) {
            var _a = _this.props, multiSelect = _a.multiSelect, onSelectionChanged = _a.onSelectionChanged;
            var contentTypes = _this.state.contentTypes;
            if (multiSelect) {
                var selectedContentTypes = _this._selectedContentTypes ? cloneDeep(_this._selectedContentTypes) : [];
                if (option.selected) {
                    selectedContentTypes.push(option.key.toString());
                }
                else {
                    selectedContentTypes = selectedContentTypes.filter(function (ct) { return ct !== option.key; });
                }
                _this._selectedContentTypes = selectedContentTypes;
            }
            else {
                _this._selectedContentTypes = option.key.toString();
            }
            if (onSelectionChanged) {
                if (multiSelect) {
                    onSelectionChanged(cloneDeep(contentTypes.filter(function (ct) { return _this._selectedContentTypes.some(function (sct) { return ct.StringId === sct; }); })));
                }
                else {
                    onSelectionChanged(cloneDeep(contentTypes.find(function (ct) { return ct.StringId === _this._selectedContentTypes; })));
                }
            }
        };
        telemetry.track('ReactContentTypePicker');
        _this.state = {
            contentTypes: [],
            loading: false,
        };
        return _this;
    }
    ContentTypePicker.prototype.componentDidMount = function () {
        this.loadContentTypes().then(function () { }).catch(function () { });
    };
    ContentTypePicker.prototype.loadContentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, listId, includeHidden, includeReadOnly, orderBy, filter, group, webAbsoluteUrl, filterItems, service, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, listId = _a.listId, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, filter = _a.filter, group = _a.group, webAbsoluteUrl = _a.webAbsoluteUrl, filterItems = _a.filterItems;
                        // Show the loading indicator and disable the dropdown
                        this.setState({ loading: true });
                        service = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
                        return [4 /*yield*/, service.getContentTypes({
                                listId: listId,
                                filter: filter,
                                includeHidden: includeHidden,
                                includeReadOnly: includeReadOnly,
                                orderBy: orderBy,
                                group: group,
                            })];
                    case 1:
                        results = _b.sent();
                        // Check if custom filter is specified
                        if (filterItems) {
                            results = filterItems(results);
                        }
                        // Hide the loading indicator and set the dropdown options
                        this.setState({
                            loading: false,
                            contentTypes: results,
                        });
                        this.setSelectedContentTypes();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the currently selected content type(s).
     */
    ContentTypePicker.prototype.setSelectedContentTypes = function () {
        this._selectedContentTypes = cloneDeep(this.props.selectedContentTypes);
        this.setState({
            selectedContentTypes: this._selectedContentTypes,
        });
    };
    ContentTypePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, webAbsoluteUrl = _a.webAbsoluteUrl, selectedContentTypes = _a.selectedContentTypes, listId = _a.listId;
        if (prevProps.includeHidden !== includeHidden ||
            prevProps.includeReadOnly !== includeReadOnly ||
            prevProps.orderBy !== orderBy ||
            prevProps.webAbsoluteUrl !== webAbsoluteUrl ||
            prevProps.listId !== listId) {
            this.loadContentTypes().then(function () { }).catch(function () { });
        }
        if (prevProps.selectedContentTypes !== selectedContentTypes) {
            this.setSelectedContentTypes();
        }
    };
    ContentTypePicker.prototype.render = function () {
        var _a = this.state, loading = _a.loading, contentTypes = _a.contentTypes, selectedContentTypes = _a.selectedContentTypes;
        var _b = this.props, className = _b.className, disabled = _b.disabled, multiSelect = _b.multiSelect, label = _b.label, placeholder = _b.placeholder, showBlankOption = _b.showBlankOption;
        var options = contentTypes.map(function (f) { return ({
            key: f.StringId,
            text: f.Name,
        }); });
        if (showBlankOption && !multiSelect) {
            // Provide empty option
            options.unshift({
                key: EMPTY_CONTENTTYPE_KEY,
                text: '',
            });
        }
        var dropdownProps = {
            className: className,
            options: options,
            disabled: loading || disabled,
            label: label,
            placeholder: placeholder,
            onChange: this.onChange,
            styles: this.props.styles
        };
        if (multiSelect) {
            dropdownProps.multiSelect = true;
            dropdownProps.selectedKeys = selectedContentTypes;
        }
        else {
            dropdownProps.selectedKey = selectedContentTypes;
        }
        return (React.createElement(React.Fragment, null,
            loading && React.createElement(Spinner, { size: SpinnerSize.xSmall }),
            React.createElement(Dropdown, __assign({}, dropdownProps))));
    };
    return ContentTypePicker;
}(React.Component));
export { ContentTypePicker };
//# sourceMappingURL=ContentTypePicker.js.map