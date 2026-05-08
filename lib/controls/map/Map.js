import { __awaiter, __extends, __generator } from "tslib";
import * as strings from 'ControlStrings';
import * as React from 'react';
import styles from './Maps.module.scss';
import { MapType } from './IMap';
import { Label } from '@fluentui/react/lib/Label';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import * as telemetry from '../../common/telemetry';
import { isEqual } from "@microsoft/sp-lodash-subset";
/**
 * Maps control
 */
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Get coordinates using the OpenStreetMap nominatim API
         */
        //20200614 - updated comment to reflect API used
        _this._getCoordinates = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, mapData, location_1, coordinates, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._startLoading();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=".concat(this.state.address))];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        mapData = _a.sent();
                        if (mapData && mapData.length > 0) {
                            location_1 = mapData[0];
                            coordinates = {
                                latitude: parseFloat(location_1.lat),
                                longitude: parseFloat(location_1.lon),
                                displayName: location_1.display_name, // 20200614 - JJ - let's keep the display name
                                address: location_1.address, // 20200614 - JJ - and the address
                            };
                            this.setState({
                                coordinates: coordinates,
                                showmessageerror: false
                            });
                            // Check if the control needs to send an update
                            if (this.props.onUpdateCoordinates) {
                                this.props.onUpdateCoordinates(coordinates);
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        this.setState({
                            showmessageerror: true
                        });
                        return [3 /*break*/, 5];
                    case 5:
                        this._stopLoading();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
        * Update address on submit (while searching is enabled)
        */
        _this._onChangedAddress = function (newValue) {
            _this.setState({
                address: newValue,
            });
        };
        var coordinates = _this.props.coordinates;
        telemetry.track('ReactMap', {});
        _this.state = {
            coordinates: coordinates || {
                latitude: null,
                longitude: null
            },
            address: "",
            showmessageerror: false,
            loading: false
        };
        return _this;
    }
    /**
     * componentWillUpdate lifecycle hook
     */
    Map.prototype.UNSAFE_componentWillUpdate = function (nextProps, nextState) {
        if (!isEqual(this.props.coordinates, nextProps.coordinates)) {
            this.setState({
                coordinates: nextProps.coordinates
            });
        }
    };
    /**
    * Get the dif value based on zoom supplied (dif is for calculating the 4 corners of the map)
    */
    Map.prototype._getDif = function () {
        var zoom = this.props.zoom;
        // 20200614 - JJ - support zoom levels beyond 15
        var newZoom = zoom >= 0 ? zoom % 16 : 10;
        var multiplier = Math.floor(newZoom / 16) + 1;
        return (0.0025 + (0.005 * (15 - (newZoom)))) / multiplier;
    };
    /**
    * Get width as percentage
    */
    Map.prototype._getWidth = function () {
        var widthToReturn = this.props.width;
        if (widthToReturn) {
            var lastChar = widthToReturn.substr(widthToReturn.length - 1);
            if (lastChar !== '%') {
                widthToReturn = "".concat(widthToReturn, "%");
            }
        }
        else {
            widthToReturn = "100%";
        }
        return widthToReturn;
    };
    /**
    * Get height of the maps
    */
    Map.prototype._getHeight = function () {
        return this.props.height ? this.props.height : 300;
    };
    /**
    * Get the type of the maps
    */
    Map.prototype._getMapType = function () {
        return this.props.mapType ? this.props.mapType : MapType.standard;
    };
    /**
    * Compute the url for the iframe
    */
    Map.prototype._getMapUrl = function () {
        var dif = this._getDif();
        var mapType = this._getMapType();
        var coordinates = this.state.coordinates;
        var mapUrl = "";
        if (coordinates.latitude && coordinates.longitude) {
            var bbox1 = coordinates.longitude - dif;
            var bbox2 = coordinates.latitude - dif;
            var bbox3 = coordinates.longitude + dif;
            var bbox4 = coordinates.latitude + dif;
            var rootUrl = "https://www.openstreetmap.org/export/embed.html";
            var qs = "?bbox=".concat(bbox1, ",").concat(bbox2, ",").concat(bbox3, ",").concat(bbox4, "&layer=").concat(mapType, "&marker=").concat(coordinates.latitude, ",").concat(coordinates.longitude);
            mapUrl = rootUrl + qs;
        }
        return mapUrl;
    };
    /**
     * Gets map url for a static Bing map
     *
     * @private
     * @param {(string | number)} width
     * @param {(string | number)} height
     * @returns {string}
     * @memberof Map
     */
    Map.prototype._getBingMapUrl = function (width, height) {
        var _a = this.props, mapSource = _a.mapSource, zoom = _a.zoom;
        var _b = this.state.coordinates, latitude = _b.latitude, longitude = _b.longitude;
        var mapType = mapSource === "BingStatic" ? "s" : "d"; // s for static or d for draggable
        return "https://www.bing.com/maps/embed?h=".concat(height, "&w=").concat(width, "&cp=").concat(latitude, "~").concat(longitude, "&lvl=").concat(zoom, "&typ=").concat(mapType, "&sty=r");
    };
    /**
    * Stop loading by changing status to null
    */
    Map.prototype._stopLoading = function () {
        this.setState({
            loading: false
        });
    };
    /**
    * Start loading by changing status to Spinner
    */
    Map.prototype._startLoading = function () {
        this.setState({
            loading: true
        });
    };
    /**
     * Default React render method
     */
    Map.prototype.render = function () {
        var _this = this;
        var mapSource = this.props.mapSource;
        var width = this._getWidth();
        var height = this._getHeight();
        var mapUrl = ["BingDraggable", "BingStatic"].indexOf(mapSource) !== -1 ? this._getBingMapUrl(width, height) : this._getMapUrl(); //20200614 - JJ - rudimentary bing map support (draggable/static) with pushpin (static only)
        return (React.createElement("div", { id: "mapsContainer", className: "".concat(styles.mapContainer, " ").concat(this.props.mapsClassName ? this.props.mapsClassName : '') },
            this.props.titleText && (React.createElement(Label, null, this.props.titleText)),
            (this.props.enableSearch) && (React.createElement("div", { id: "mapsSearch", className: styles.searchContainer },
                React.createElement(TextField, { value: this.state.address, onChange: function (e, value) { return _this._onChangedAddress(value); }, onKeyPress: function (event) { return event.key === "Enter" ? _this._getCoordinates() : null; }, iconProps: { iconName: 'World' }, className: styles.searchTextBox }),
                React.createElement(PrimaryButton, { text: strings.mapsSearchButtonText, title: strings.mapsSearchButtonText, className: styles.submitButton, iconProps: { iconName: 'Search' }, onClick: this._getCoordinates }))),
            this.state.loading ? (React.createElement(Spinner, { size: SpinnerSize.large, label: this.props.loadingMessage ? this.props.loadingMessage : strings.mapsLoadingText })) : ((mapUrl.length > 0 && !this.state.showmessageerror) ? (React.createElement("div", { id: "mapsIframe" },
                React.createElement("iframe", { width: width, height: height, scrolling: "no", src: mapUrl }),
                mapSource === "BingStatic" && React.createElement(Icon, { iconName: "Location", style: { fontSize: "26px", position: "relative", top: (Math.floor(-height / 2)), left: "50%", marginTop: "-14px" } }))) : (React.createElement("p", { className: "ms-TextField-errorMessage ".concat(styles.errorMessage, " ").concat(this.props.errorMessageClassName ? this.props.errorMessageClassName : '') },
                React.createElement(Icon, { iconName: 'Error', className: styles.errorIcon }),
                React.createElement("span", { "data-automation-id": "error-message" }, this.props.errorMessage ? this.props.errorMessage : strings.mapsErrorMessage))))));
    };
    return Map;
}(React.Component));
export { Map };
//# sourceMappingURL=Map.js.map