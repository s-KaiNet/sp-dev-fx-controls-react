import * as React from "react";
import { Card, Text, Button } from "@fluentui/react-components";
import { DataBarVerticalStarRegular, SettingsRegular, SparkleRegular, } from "@fluentui/react-icons";
import Stack from "./stack/Stack";
import { useKpiStyles } from "./useKpiStyles";
// Mock data for the list URL
var mockListUrl = "/sites/mock-site/Lists/Directory Status Config";
/**
 * NoKpisCard Component

 */
export var NoKpisCard = function () {
    var styles = useKpiStyles();
    var listUrl = mockListUrl;
    var isLoading = false;
    var onConfigure = React.useCallback(function () {
        if (!listUrl)
            return;
        var host = window.location.origin;
        // listUrl is already the ServerRelativeUrl, just append AllItems.aspx
        var appConfigUrl = "".concat(host).concat(listUrl, "/AllItems.aspx");
        window.open(appConfigUrl, "_blank");
    }, [listUrl]);
    return (React.createElement(Card, { className: styles.noKpiCardContainer },
        React.createElement("div", { className: styles.noKpiBackgroundOrb1 }),
        React.createElement("div", { className: styles.noKpiBackgroundOrb2 }),
        React.createElement(Stack, { alignItems: "center", justifyContent: "center", gap: "s" },
            React.createElement("div", { className: styles.noKpiIconContainer },
                React.createElement(DataBarVerticalStarRegular, { className: styles.noKpiIcon }),
                React.createElement(SparkleRegular, { className: styles.noKpiSparkle1 }),
                React.createElement(SparkleRegular, { className: styles.noKpiSparkle2 })),
            React.createElement(Text, { className: styles.noKpiTitle }, "No KPIs Configured"),
            React.createElement("div", { className: styles.noKpiDecorativeLine }),
            React.createElement(Text, { className: styles.noKpiSubtitle },
                "Start tracking your team's performance by configuring",
                " ",
                React.createElement("span", { className: styles.noKpiHighlight }, "KPI parameters"),
                " in the App Configuration list."),
            !isLoading && listUrl && (React.createElement("div", { className: styles.noKpiButtonContainer },
                React.createElement(Button, { appearance: "outline", icon: React.createElement(SettingsRegular, null), className: styles.noKpiButton, onClick: onConfigure }, "Configure KPIs"))))));
};
export default NoKpisCard;
//# sourceMappingURL=NoKpisCard.js.map