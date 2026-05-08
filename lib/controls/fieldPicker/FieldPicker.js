import { __assign, __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { SPServiceFactory } from '../../services/SPServiceFactory';
var EMPTY_FIELD_KEY = 'NO_FIELD_SELECTED';
var FieldPicker = /** @class */ (function (_super) {
    __extends(FieldPicker, _super);
    function FieldPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedFields = null;
        /**
         * Fires when a field has been selected from the dropdown.
         * @param option The new selection.
         * @param index Index of the selection.
         */
        _this.onChange = function (event, option, index) {
            var _a = _this.props, multiSelect = _a.multiSelect, onSelectionChanged = _a.onSelectionChanged;
            var fields = _this.state.fields;
            if (multiSelect) {
                var selectedFields = _this._selectedFields ? cloneDeep(_this._selectedFields) : [];
                if (option.selected) {
                    selectedFields.push(option.key.toString());
                }
                else {
                    selectedFields = selectedFields.filter(function (field) { return field !== option.key; });
                }
                _this._selectedFields = selectedFields;
            }
            else {
                _this._selectedFields = option.key.toString();
            }
            if (onSelectionChanged) {
                if (multiSelect) {
                    onSelectionChanged(cloneDeep(fields.filter(function (f) { return _this._selectedFields.some(function (sf) { return f.InternalName === sf; }); })));
                }
                else {
                    onSelectionChanged(cloneDeep(fields.find(function (f) { return f.InternalName === _this._selectedFields; })));
                }
            }
        };
        telemetry.track('ReactFieldPicker');
        _this.state = {
            fields: [],
            loading: false,
        };
        return _this;
    }
    FieldPicker.prototype.componentDidMount = function () {
        this.loadFields().then(function () { }).catch(function () { });
    };
    /**
     * Loads the fields from the provided SharePoint site and updates the options state.
     */
    FieldPicker.prototype.loadFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, listId, includeHidden, includeReadOnly, orderBy, filter, group, webAbsoluteUrl, filterItems, service, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, listId = _a.listId, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, filter = _a.filter, group = _a.group, webAbsoluteUrl = _a.webAbsoluteUrl, filterItems = _a.filterItems;
                        // Show the loading indicator and disable the dropdown
                        this.setState({ loading: true });
                        service = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
                        return [4 /*yield*/, service.getFields({
                                listId: listId,
                                filter: filter,
                                includeHidden: includeHidden,
                                includeReadOnly: includeReadOnly,
                                orderBy: orderBy,
                                group: group
                            })];
                    case 1:
                        results = _b.sent();
                        // Check if custom filter is specified
                        if (filterItems) {
                            results = filterItems(results);
                        }
                        // Hide loading indicator and set the dropdown options.
                        this.setState({
                            loading: false,
                            fields: results,
                        });
                        this.setSelectedFields();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the currently selected field(s);
     */
    FieldPicker.prototype.setSelectedFields = function () {
        this._selectedFields = cloneDeep(this.props.selectedFields);
        this.setState({
            selectedFields: this._selectedFields,
        });
    };
    FieldPicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, webAbsoluteUrl = _a.webAbsoluteUrl, selectedFields = _a.selectedFields, listId = _a.listId;
        if (prevProps.includeHidden !== includeHidden ||
            prevProps.includeReadOnly !== includeReadOnly ||
            prevProps.orderBy !== orderBy ||
            prevProps.webAbsoluteUrl !== webAbsoluteUrl ||
            prevProps.listId !== listId) {
            this.loadFields().then(function () { }).catch(function () { });
        }
        if (prevProps.selectedFields !== selectedFields) {
            this.setSelectedFields();
        }
    };
    FieldPicker.prototype.render = function () {
        var _a = this.state, loading = _a.loading, fields = _a.fields, selectedFields = _a.selectedFields;
        var _b = this.props, className = _b.className, disabled = _b.disabled, multiSelect = _b.multiSelect, label = _b.label, placeholder = _b.placeholder, showBlankOption = _b.showBlankOption;
        var options = fields.map(function (f) { return ({
            key: f.InternalName,
            text: f.Title
        }); });
        if (showBlankOption && !multiSelect) {
            // Provide empty option
            options.unshift({
                key: EMPTY_FIELD_KEY,
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
        };
        if (multiSelect) {
            dropdownProps.multiSelect = true;
            dropdownProps.selectedKeys = selectedFields;
        }
        else {
            dropdownProps.selectedKey = selectedFields;
        }
        return (React.createElement(React.Fragment, null,
            loading && React.createElement(Spinner, { size: SpinnerSize.xSmall }),
            React.createElement(Dropdown, __assign({}, dropdownProps))));
    };
    return FieldPicker;
}(React.Component));
export { FieldPicker };
//# sourceMappingURL=FieldPicker.js.map