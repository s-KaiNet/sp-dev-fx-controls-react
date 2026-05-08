import { __awaiter, __extends, __generator } from "tslib";
import * as React from 'react';
import { Mode } from './ILocationPicker';
import styles from './LocationPicker.module.scss';
import { SPHttpClient, HttpClient } from '@microsoft/sp-http';
import { Text } from '@fluentui/react/lib/Text';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import * as strings from 'ControlStrings';
import { isEqual } from '@microsoft/sp-lodash-subset';
var LocationPicker = /** @class */ (function (_super) {
    __extends(LocationPicker, _super);
    /**
    * Constructor method
    */
    function LocationPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._token = null;
        _this.focusRef = null; // eslint-disable-line @typescript-eslint/no-explicit-any
        _this.onRenderOption = function (item) {
            var _a = item, text = _a.text, locationItem = _a.locationItem;
            if (locationItem.EntityType === "Custom") {
                return React.createElement(Persona, { text: text, imageAlt: locationItem.EntityType, secondaryText: locationItem.DisplayName, size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials });
            }
            else
                return React.createElement(Persona, { text: text, imageAlt: locationItem.EntityType, secondaryText: _this.getLocationText(locationItem, "full"), size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials });
        };
        _this.getMainContent = function () {
            var _a = _this.state, options = _a.options, selectedItem = _a.selectedItem, currentMode = _a.currentMode;
            var _b = _this.props, className = _b.className, disabled = _b.disabled, placeholder = _b.placeholder, errorMessage = _b.errorMessage;
            switch (currentMode) {
                case Mode.empty:
                    return React.createElement(ComboBox, { className: className, disabled: disabled, placeholder: placeholder, allowFreeform: true, autoComplete: "on", options: options, onRenderOption: _this.onRenderOption, calloutProps: { className: styles.callout }, buttonIconProps: { iconName: "MapPin" }, useComboBoxAsMenuWidth: true, openOnKeyboardFocus: true, scrollSelectedToTop: true, isButtonAriaHidden: true, onInput: function (e) { return _this.getLocatios(e.target.value); }, onChange: _this.onChange, errorMessage: errorMessage });
                case Mode.editView:
                    if (selectedItem.EntityType === "Custom") {
                        return React.createElement("div", { ref: _this.focusRef, "data-selection-index": 0, "data-is-focusable": true, role: "listitem", className: styles.pickerItemContainer, onBlur: _this.onBlur, tabIndex: 0 },
                            React.createElement(Persona, { "data-is-focusable": "false", imageAlt: selectedItem.EntityType, tabIndex: 0, text: selectedItem.DisplayName, title: "Location", className: styles.persona, size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials }),
                            React.createElement(IconButton, { "data-is-focusable": "false", tabIndex: 0, iconProps: { iconName: "Cancel" }, title: "Clear", ariaLabel: "Clear", disabled: disabled, className: styles.closeButton, onClick: _this.onIconButtonClick }));
                    }
                    return React.createElement("div", { ref: _this.focusRef, "data-selection-index": 0, "data-is-focusable": true, role: "listitem", className: styles.pickerItemContainer, onBlur: _this.onBlur, tabIndex: 0 },
                        React.createElement(Persona, { "data-is-focusable": "false", imageAlt: selectedItem.EntityType, tabIndex: 0, text: selectedItem.DisplayName, title: "Location", className: styles.persona, secondaryText: _this.getLocationText(selectedItem, "full"), size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials }),
                        !disabled ?
                            React.createElement(IconButton, { "data-is-focusable": "false", tabIndex: 0, iconProps: { iconName: "Cancel" }, title: "Clear", ariaLabel: "Clear", disabled: disabled, className: styles.closeButton, onClick: _this.onIconButtonClick }) : null);
                case Mode.view:
                    if (selectedItem.EntityType === 'Custom') {
                        return React.createElement("div", { className: styles.locationAddressContainer, onClick: _this.onClick },
                            React.createElement("div", { className: styles.locationContainer, tabIndex: 0 },
                                React.createElement("div", { className: styles.locationDisplayName }, selectedItem.DisplayName)));
                    }
                    return React.createElement("div", { className: styles.locationAddressContainer, onClick: _this.onClick },
                        React.createElement("div", { className: styles.locationContainer, tabIndex: 0 },
                            React.createElement("div", { className: styles.locationDisplayName }, selectedItem.DisplayName),
                            React.createElement("div", { className: styles.locationContent },
                                React.createElement("div", { className: styles.locationAddress }, _this.getLocationText(selectedItem, "street")),
                                React.createElement("div", { className: styles.locationAddress }, _this.getLocationText(selectedItem, "noStreet")))));
            }
        };
        _this.getLocationText = function (item, mode) {
            if (!item.Address) {
                return '';
            }
            var address = item.Address;
            switch (mode) {
                case "street":
                    return address.Street || "";
                case "noStreet":
                    return "".concat(address.City ? address.City + ", " : '').concat(address.State ? address.State + ", " : "").concat(address.CountryOrRegion || "");
            }
            return "".concat(address.Street ? address.Street + ", " : '').concat(address.City ? address.City + ", " : "").concat(address.State ? address.State + ", " : '').concat(address.CountryOrRegion || "");
        };
        _this.onIconButtonClick = function () {
            _this.setState({ currentMode: Mode.empty, selectedItem: null });
            if (_this.props.onChange) {
                _this.props.onChange(null);
            }
        };
        _this.onClick = function () {
            _this.setState({ currentMode: Mode.editView }, function () {
                if (_this.focusRef.current !== null)
                    _this.focusRef.current.focus();
            });
        };
        _this.onBlur = function (ev) {
            try {
                if (ev !== null && ev.relatedTarget && ev.relatedTarget.title !== "Location" && ev.relatedTarget.title !== "Clear") { // eslint-disable-line dot-notation
                    _this.setState({ currentMode: Mode.view });
                }
            }
            catch ( /* no-op; */_a) { /* no-op; */ }
        };
        _this.onChange = function (ev, option) {
            var locationOption = option;
            _this.setState({ selectedItem: locationOption.locationItem, currentMode: Mode.editView }, function () {
                if (_this.focusRef.current !== null)
                    _this.focusRef.current.focus();
            });
            if (_this.props.onChange) {
                _this.props.onChange(locationOption.locationItem);
            }
        };
        _this.getToken().then(function () { }).catch(function () { });
        _this.focusRef = React.createRef();
        if (props.defaultValue) {
            _this.state = {
                options: [],
                currentMode: Mode.view,
                searchText: null,
                isCalloutVisible: true,
                selectedItem: props.defaultValue,
            };
        }
        else {
            _this.state = {
                options: [],
                currentMode: Mode.empty,
                searchText: null,
                isCalloutVisible: true,
                selectedItem: props.defaultValue,
            };
        }
        return _this;
    }
    LocationPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (!isEqual(nextProps.defaultValue, this.props.defaultValue)) {
            if (nextProps.defaultValue) {
                this.setState({ selectedItem: nextProps.defaultValue, currentMode: Mode.view });
            }
        }
    };
    /**
    * Renders the LocationPicker controls with Office UI Fabric
    */
    LocationPicker.prototype.render = function () {
        var label = this.props.label;
        return (React.createElement("div", null,
            label ? React.createElement(Text, null, label) : null,
            this.getMainContent()));
    };
    LocationPicker.prototype.customRenderInitials = function (props) {
        if (props.imageAlt === "Custom")
            return React.createElement(FontIcon, { "aria-label": "Poi", iconName: "Poi", style: { fontSize: "14pt" } });
        else
            return React.createElement(FontIcon, { "aria-label": "EMI", iconName: "EMI", style: { fontSize: "14pt" } });
    };
    LocationPicker.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, spOpts, response, PrimaryQueryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = new Headers();
                        requestHeaders.append("Content-type", "application/json");
                        requestHeaders.append("Cache-Control", "no-cache");
                        spOpts = {
                            body: "{\"resource\":\"https://outlook.office365.com\"}",
                            headers: requestHeaders
                        };
                        return [4 /*yield*/, this.props.context.spHttpClient.post("".concat(this.props.context.pageContext.web.absoluteUrl, "/_api/SP.OAuth.Token/Acquire"), SPHttpClient.configurations.v1, spOpts)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        PrimaryQueryResult = _a.sent();
                        this._token = PrimaryQueryResult.access_token;
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationPicker.prototype.getLocatios = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var optionsForCustomRender_1, requestHeaders, spOpts, response1, json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        optionsForCustomRender_1 = [];
                        requestHeaders = new Headers();
                        requestHeaders.append("Content-type", "application/json");
                        requestHeaders.append("Cache-Control", "no-cache");
                        requestHeaders.append("Authorization", "Bearer ".concat(this._token));
                        spOpts = {
                            body: "{\"QueryConstraint\":{\"Query\":\"".concat(searchText, "\"},\"LocationProvider\":32,\"BingMarket\":\"en-IN\"}"),
                            headers: requestHeaders
                        };
                        return [4 /*yield*/, this.props.context.httpClient.post("https://outlook.office365.com/SchedulingB2/api/v1.0/me/findmeetinglocations", HttpClient.configurations.v1, spOpts)];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        json = _a.sent();
                        json.MeetingLocations.forEach(function (v, i) {
                            var loc = v["MeetingLocation"]; // eslint-disable-line dot-notation
                            optionsForCustomRender_1.push({ text: v.MeetingLocation["DisplayName"], key: i, locationItem: loc }); // eslint-disable-line dot-notation
                        });
                        optionsForCustomRender_1.push({ text: strings.customDisplayName, key: 7, locationItem: { DisplayName: searchText, EntityType: "Custom" } });
                        this.setState({ options: optionsForCustomRender_1 });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Error get Items", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LocationPicker;
}(React.Component));
export { LocationPicker };
//# sourceMappingURL=LocationPicker.js.map