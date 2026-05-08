import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { SPHttpClient } from "@microsoft/sp-http";
var ListPicker = /** @class */ (function (_super) {
    __extends(ListPicker, _super);
    function ListPicker(props, state) {
        var _this = _super.call(this, props) || this;
        _this.selectedKey = props.selectedKey;
        _this.state = {
            loading: false,
            options: undefined,
            error: undefined
        };
        return _this;
    }
    ListPicker.prototype.componentDidMount = function () {
        this.loadOptions();
    };
    ListPicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.disabled !== prevProps.disabled
        // ||
        // this.props.stateKey !== prevProps.stateKey
        ) {
            this.loadOptions();
        }
    };
    ListPicker.prototype.loadOptions = function () {
        var _this = this;
        this.setState({
            loading: true,
            error: undefined,
            options: undefined
        });
        var options = [];
        this.props.wpContext.spHttpClient.get("".concat(this.props.wpContext.pageContext.web.absoluteUrl, "/_api/web/lists?$filter=Hidden eq false"), SPHttpClient.configurations.v1).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var lists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response.ok) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json()];
                    case 1:
                        lists = _a.sent();
                        options = lists.value.map(function (list) {
                            return {
                                key: list.Id,
                                text: list.Title
                            };
                        });
                        this.setState({
                            loading: false,
                            error: undefined,
                            options: options
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); }).catch(function (error) {
            _this.setState({
                loading: false,
                error: error.statusText,
                options: undefined
            });
        });
    };
    ListPicker.prototype.render = function () {
        var loading = this.state.loading ? React.createElement("div", null,
            React.createElement(Spinner, { label: 'Loading options...' })) : React.createElement("div", null);
        var error = this.state.error !== undefined ? React.createElement("div", { className: 'ms-TextField-errorMessage ms-u-slideDownIn20' },
            "Error while loading items: ",
            this.state.error) : React.createElement("div", null);
        return (React.createElement("div", null,
            React.createElement(Dropdown, { label: this.props.label, disabled: this.props.disabled || this.state.loading || this.state.error !== undefined, onChange: this.onChange.bind(this), selectedKey: this.selectedKey, options: this.state.options }),
            loading,
            error));
    };
    ListPicker.prototype.onChange = function (e, option) {
        this.selectedKey = option.key;
        // reset previously selected options
        var options = this.state.options;
        options.forEach(function (o) {
            if (o.key !== option.key) {
                o.selected = false;
            }
        });
        this.setState(function (prevState, props) {
            prevState.options = options;
            return prevState;
        });
        if (this.props.onChange) {
            this.props.onChange(option);
        }
    };
    return ListPicker;
}(React.Component));
export { ListPicker };
//# sourceMappingURL=ListPicker.js.map