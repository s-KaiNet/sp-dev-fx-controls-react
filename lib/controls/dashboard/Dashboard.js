import { __assign, __spreadArray } from "tslib";
import * as React from "react";
import { ProviderConsumer as FluentUIThemeConsumer, Box, teamsTheme, } from "@fluentui/react-northstar";
import { Widget, WidgetTitle, WidgetBody, WidgetFooter, } from "./widget/DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Toolbar } from "../toolbar";
import styles from "./Dashboard.module.scss";
import { useTelemetry } from "../../common/telemetry";
export function Dashboard(_a) {
    var widgets = _a.widgets, allowHidingWidget = _a.allowHidingWidget, onWidgetHiding = _a.onWidgetHiding, toolbarProps = _a.toolbarProps, WidgetWrapperComponent = _a.WidgetContentWrapper;
    var _b = React.useState(widgets), stateWidgets = _b[0], setWidgets = _b[1];
    var widgetRenderer = WidgetWrapperComponent
        ? renderWidgetWithWrappedContent
        : renderWidget;
    useTelemetry("ReactDashboard", {});
    React.useEffect(function () {
        setWidgets(widgets);
    }, [widgets]);
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            if (!globalTheme || globalTheme.fontFaces.length === 0) {
                globalTheme = teamsTheme;
            }
            return (React.createElement(DashboardTheme, { globalTheme: globalTheme },
                toolbarProps && React.createElement(Toolbar, __assign({}, toolbarProps)),
                React.createElement(Box, { className: styles.dashboardBox }, stateWidgets && stateWidgets.map(widgetRenderer(globalTheme)))));
        } }));
    function renderWidgetWithWrappedContent(globalTheme // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return function (widget, key) {
            return (React.createElement(WidgetWrapperComponent, null, renderWidget(globalTheme)(widget, key)));
        };
    }
    function renderWidget(globalTheme // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return function (widget, key) { return (React.createElement(Widget, { key: key, widget: widget },
            React.createElement(WidgetTitle, { widget: widget, allowHidingWidget: allowHidingWidget, onWidgetHiding: function (hidingWidget) {
                    if (onWidgetHiding) {
                        onWidgetHiding(hidingWidget);
                    }
                    if (!hidingWidget.controlOptions) {
                        hidingWidget.controlOptions = {};
                    }
                    hidingWidget.controlOptions.isHidden = true;
                    setWidgets(__spreadArray([], widgets, true));
                }, globalTheme: globalTheme }),
            React.createElement(WidgetBody, { widget: widget, siteVariables: globalTheme.siteVariables }),
            widget.link && React.createElement(WidgetFooter, { widget: widget }))); };
    }
}
//# sourceMappingURL=Dashboard.js.map