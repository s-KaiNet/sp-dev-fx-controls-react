import { __assign } from "tslib";
import PnPTelemetry from "@pnp/telemetry-js";
import { version } from './version';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import * as React from 'react';
var CONTROL_TYPE = "react";
/**
 * Track control information
 *
 * @param componentName
 * @param properties
 */
export function track(componentName, properties) {
    if (properties === void 0) { properties = {}; }
    var telemetry = PnPTelemetry.getInstance();
    telemetry.trackEvent(componentName, __assign({ version: version, controlType: CONTROL_TYPE, debug: DEBUG ? "true" : "false", environment: EnvironmentType[Environment.type] }, properties));
}
export var useTelemetry = function (componentName, properties) {
    if (properties === void 0) { properties = {}; }
    var _a = React.useState(false), hasBeenCalled = _a[0], setHasBeenCalled = _a[1];
    if (hasBeenCalled) {
        return;
    }
    track(componentName, properties);
    setHasBeenCalled(true);
};
//# sourceMappingURL=index.js.map