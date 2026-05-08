import { Card, CardFooter, CardHeader, Divider, ProgressBar, tokens, Tooltip, Text, Badge, InfoLabel, } from '@fluentui/react-components';
import * as React from 'react';
import Stack from './stack/Stack';
import { useKpiStyles } from './useKpiStyles';
import { AlertFilled, CalculatorRegular, CheckmarkCircleRegular, DocumentRegular, TargetRegular, } from '@fluentui/react-icons';
import { EGoalMetric } from './IKpiCardData';
import strings from 'ControlStrings';
export var KPICard = function (props) {
    var _a;
    var dataCard = props.dataCard;
    var styles = useKpiStyles();
    // State to control InfoLabel popover visibility
    var _b = React.useState(false), isInfoLabelOpen = _b[0], setIsInfoLabelOpen = _b[1];
    // Handle card mouse leave to auto-dismiss InfoLabel
    var handleCardMouseLeave = React.useCallback(function () {
        setIsInfoLabelOpen(false);
    }, []);
    // Determine if KPI is on track based on goal metric type
    var isOnTrack = React.useMemo(function () {
        return dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
            ? dataCard.currentValue <= dataCard.goal // Lower is better: on track when current <= goal
            : dataCard.currentValue >= dataCard.goal;
    }, // Higher is better: on track when current >= goal
    [dataCard.currentValue, dataCard.goal, dataCard.goalMetric]);
    var progressColor = React.useMemo(function () { return (isOnTrack ? 'success' : 'error'); }, [isOnTrack]);
    var goal = React.useMemo(function () { return dataCard.goal.toLocaleString(); }, [dataCard.goal]);
    var totalPercent = React.useMemo(function () { return (dataCard.currentValue / dataCard.totalItems) * 100; }, [dataCard.currentValue, dataCard.totalItems]);
    // Success / Danger foregrounds
    var accentFg = React.useMemo(function () {
        return isOnTrack
            ? tokens.colorPaletteLightGreenForeground2
            : tokens.colorPaletteRedForeground2;
    }, [isOnTrack]);
    // Success / Danger backgrounds (badge pill bg)
    var accentBg = React.useMemo(function () {
        return isOnTrack
            ? tokens.colorPaletteLightGreenBackground1
            : tokens.colorPaletteRedBackground1;
    }, [isOnTrack]);
    // Success / Danger borders (badge pill border)
    var accentBorder = React.useMemo(function () {
        return isOnTrack
            ? tokens.colorPaletteLightGreenBorder1
            : tokens.colorPaletteRedBorder1;
    }, [isOnTrack]);
    var badgeStyle = React.useMemo(function () { return ({
        background: accentBg,
        border: "1px solid ".concat(accentBorder),
        color: accentFg,
        borderRadius: '20px',
        padding: '12px 12px',
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        letterSpacing: '0.3px',
        maxWidth: 'fit-content',
    }); }, [accentBg, accentBorder, accentFg]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles.card, onMouseLeave: handleCardMouseLeave },
            React.createElement("div", { className: isOnTrack ? styles.glowBlobSuccess : styles.glowBlobError }),
            React.createElement(Stack, { gap: "m", padding: "m" },
                React.createElement(CardHeader, { header: React.createElement(Stack, { direction: "vertical", gap: "2px" },
                        React.createElement(Stack, { direction: "horizontal", alignItems: "center", gap: "8px" },
                            React.createElement(InfoLabel, { style: { zIndex: 99999 }, infoButton: {
                                    popover: {
                                        open: isInfoLabelOpen,
                                        onOpenChange: function (_e, data) {
                                            return setIsInfoLabelOpen(data.open);
                                        },
                                    },
                                }, info: React.createElement(React.Fragment, null,
                                    React.createElement(Text, { size: 300, color: "neutralSecondary" }, dataCard.description || strings.KPINoDescription)) },
                                React.createElement(Text, { weight: "bold", size: 300 }, ((_a = dataCard.title) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || strings.KPIDEfaultTitle))),
                        React.createElement(Text, { size: 200, style: {
                                color: tokens.colorNeutralForeground3,
                                fontStyle: 'italic',
                            } }, dataCard.goalMetric === EGoalMetric.LOWER_IS_BETTER
                            ? strings.KPILowerIsBetter
                            : strings.KPIHigherIsBetter)), action: React.createElement(Tooltip, { content: isOnTrack
                            ? "\u2713 ".concat(strings.KPIWithinGoalThreshold)
                            : "\u26A0 ".concat(strings.KPIExceedsGoalTreshhold), relationship: "inaccessible" },
                        React.createElement(Badge, { className: styles.headerActionBadge, appearance: "ghost", size: "small", icon: isOnTrack ? (React.createElement(CheckmarkCircleRegular, { style: { color: accentFg, fontSize: '22px' } })) : (React.createElement(AlertFilled, { style: { color: accentFg, fontSize: '22px' } })) })) }),
                React.createElement(Stack, { gap: "s", direction: "horizontal", alignItems: "baseline", paddingTop: "s" },
                    React.createElement(Text, { weight: "bold", size: 900 },
                        dataCard.currentValue,
                        " ",
                        React.createElement("br", null)),
                    React.createElement(Text, { weight: "semibold", size: 300, color: "neutralSecondary" },
                        "/ ",
                        dataCard.goal,
                        " ",
                        strings.KPIGoal)),
                React.createElement(Stack, { gap: "s" },
                    React.createElement(Stack, { direction: "horizontal", justifyContent: "space-between" },
                        React.createElement(Text, { size: 300, color: "neutralSecondary" }, strings.KPIProgressGoal),
                        React.createElement(Text, { size: 300, color: "neutralSecondary", weight: "bold" },
                            ((dataCard.currentValue / dataCard.goal) * 100).toFixed(2),
                            "%")),
                    React.createElement(ProgressBar, { value: dataCard.currentValue / dataCard.goal, color: progressColor, style: { height: '8px' }, shape: "rounded" })),
                React.createElement(CardFooter, null,
                    React.createElement(Tooltip, { content: strings.KPIMaxAllowedThreshold, relationship: "inaccessible" },
                        React.createElement(Stack, { alignItems: "center", gap: tokens.spacingVerticalXXS },
                            React.createElement(TargetRegular, { className: styles.footerIcon }),
                            React.createElement(Text, { className: styles.footerLabel }, "Goal"),
                            React.createElement(Text, { className: styles.footerValue }, goal))),
                    React.createElement(Divider, { vertical: true, className: styles.footerDivider }),
                    React.createElement(Tooltip, { content: strings.KPITotalItemsInScope, relationship: "inaccessible" },
                        React.createElement(Stack, { alignItems: "center", gap: tokens.spacingVerticalXXS },
                            React.createElement(DocumentRegular, { className: styles.footerIcon }),
                            React.createElement(Text, { className: styles.footerLabel }, strings.KPITotalItems),
                            React.createElement(Text, { className: styles.footerValue }, dataCard.totalItems.toLocaleString()))),
                    React.createElement(Divider, { vertical: true, className: styles.footerDivider }),
                    React.createElement(Tooltip, { content: strings.KPICurrentValueAsPercent, relationship: "inaccessible" },
                        React.createElement(Stack, { alignItems: "center", gap: tokens.spacingVerticalXXS },
                            React.createElement(CalculatorRegular, { className: styles.footerIcon }),
                            React.createElement(Text, { className: styles.footerLabel }, strings.KPIPercentOfTotal),
                            React.createElement(Text, { className: styles.footerValue },
                                totalPercent.toFixed(2),
                                "%")))),
                React.createElement(Stack, null,
                    React.createElement(Badge, { appearance: "outline", size: "small", style: badgeStyle, icon: isOnTrack ? (React.createElement(CheckmarkCircleRegular, { style: { fontSize: '14px' } })) : (React.createElement(AlertFilled, { style: { fontSize: '14px' } })) }, isOnTrack ? strings.KPIOnTrack : strings.KPIExceedGoal))))));
};
//# sourceMappingURL=KpiCard.js.map