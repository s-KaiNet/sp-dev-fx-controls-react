import { Card, CardFooter, CardHeader, Divider, tokens, Skeleton, SkeletonItem, } from "@fluentui/react-components";
import * as React from "react";
import Stack from "./stack/Stack";
import { useKpiStyles } from "./useKpiStyles";
import { css } from "@emotion/css";
/**
 * Skeleton loading state for KPICard component.
 * Mimics the exact layout of KPICard while data is being fetched.
 */
export var KPICardSkeleton = function () {
    var styles = useKpiStyles();
    var skeletonStyles = {
        headerTitle: css({
            width: "120px",
            height: "16px",
        }),
        headerBadge: css({
            width: "32px",
            height: "32px",
            borderRadius: "50%",
        }),
        mainValue: css({
            width: "80px",
            height: "42px",
        }),
        goalText: css({
            width: "70px",
            height: "16px",
        }),
        progressLabel: css({
            width: "80px",
            height: "12px",
        }),
        progressValue: css({
            width: "50px",
            height: "12px",
        }),
        progressBar: css({
            width: "100%",
            height: "8px",
            borderRadius: "4px",
        }),
        footerIcon: css({
            width: "16px",
            height: "16px",
            borderRadius: "4px",
        }),
        footerLabel: css({
            width: "50px",
            height: "10px",
        }),
        footerValue: css({
            width: "40px",
            height: "14px",
        }),
        badge: css({
            width: "90px",
            height: "32px",
            borderRadius: "20px",
        }),
    };
    return (React.createElement(Card, { className: styles.card },
        React.createElement(Skeleton, { animation: "pulse" },
            React.createElement(Stack, { gap: "m", padding: "m" },
                React.createElement(CardHeader, { header: React.createElement(Stack, { direction: "horizontal", alignItems: "center", gap: "8px" },
                        React.createElement(SkeletonItem, { className: skeletonStyles.headerTitle })), action: React.createElement(SkeletonItem, { className: skeletonStyles.headerBadge, shape: "circle" }) }),
                React.createElement(Stack, { gap: "s", direction: "horizontal", alignItems: "baseline", paddingTop: "s" },
                    React.createElement(SkeletonItem, { className: skeletonStyles.mainValue }),
                    React.createElement(SkeletonItem, { className: skeletonStyles.goalText })),
                React.createElement(Stack, { gap: "s" },
                    React.createElement(Stack, { direction: "horizontal", justifyContent: "space-between" },
                        React.createElement(SkeletonItem, { className: skeletonStyles.progressLabel }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.progressValue })),
                    React.createElement(SkeletonItem, { className: skeletonStyles.progressBar })),
                React.createElement(CardFooter, null,
                    React.createElement(Stack, { direction: "vertical", alignItems: "center", gap: "xs" },
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerIcon }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerLabel }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerValue })),
                    React.createElement(Divider, { vertical: true, style: {
                            height: "32px",
                            borderColor: tokens.colorNeutralStroke1,
                        } }),
                    React.createElement(Stack, { direction: "vertical", alignItems: "center", gap: "xs" },
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerIcon }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerLabel }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerValue })),
                    React.createElement(Divider, { vertical: true, style: {
                            height: "32px",
                            borderColor: tokens.colorNeutralStroke1,
                        } }),
                    React.createElement(Stack, { direction: "vertical", alignItems: "center", gap: "xs" },
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerIcon }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerLabel }),
                        React.createElement(SkeletonItem, { className: skeletonStyles.footerValue }))),
                React.createElement(Stack, null,
                    React.createElement(SkeletonItem, { className: skeletonStyles.badge }))))));
};
export default KPICardSkeleton;
//# sourceMappingURL=KpiCardSkeleton.js.map