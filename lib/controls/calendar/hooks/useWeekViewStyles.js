import React from 'react';
import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';
export var useWeekViewStyles = function () {
    var styles = {
        container: css({
            display: 'flex',
            flexDirection: 'column',
            width: 'calc(100% - 40px)',
            height: '100vh',
            overflow: 'hidden',
            padding: '20px',
        }),
        header: css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderBottom: "1px solid ".concat(tokens.colorNeutralStroke1),
        }),
        weekGrid: css({
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)',
            gridTemplateRows: '50px 40px repeat(48, 33px)',
            height: 'fit-content',
            overflowY: 'auto',
            border: "1px solid ".concat(tokens.colorNeutralStroke1),
            maxHeight: 'calc(100vh - 100px)',
            scrollbarWidth: 'thin',
            scrollbarColor: "".concat(tokens.colorBrandBackground, " ").concat(tokens.colorNeutralBackground1),
            '&::-webkit-scrollbar': {
                width: '8px', // Width of the scrollbar
            },
            '&::-webkit-scrollbar-track': {
                background: tokens.colorNeutralBackground1, // Scrollbar track background
            },
            '&::-webkit-scrollbar-thumb': {
                background: tokens.colorBrandBackground,
                borderRadius: '4px', // Rounded corners for the thumb
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: tokens.colorBrandBackgroundHover, // Lighter color on hover
            },
        }),
        blankHeader: css({
            gridColumn: '1',
            backgroundColor: tokens.colorNeutralBackground3,
            borderBottom: "3px solid ".concat(tokens.colorNeutralStroke3),
            position: 'sticky',
            top: 0,
            zIndex: 10, // Ensures it stays above the scrolling grid
        }),
        timeColumn: css({
            gridColumn: '1',
            gridRow: '3 / span 49',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: tokens.colorNeutralBackground1,
            borderRight: "1px solid ".concat(tokens.colorNeutralStroke1),
        }),
        timeCell: css({
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            color: tokens.colorNeutralForeground3,
            borderBottom: "1px solid ".concat(tokens.colorNeutralStroke1),
            justifyContent: 'center',
        }),
        fullDayRow: css({
            gridRow: '2',
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)',
            gap: '0',
            padding: '0',
            backgroundColor: tokens.colorNeutralBackground2,
            borderBottom: "3px solid ".concat(tokens.colorNeutralStroke2), // Bottom border for the row
        }),
        fullDayLabel: css({
            gridColumn: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            color: tokens.colorBrandBackground,
            padding: '5px',
            borderRight: "1px solid ".concat(tokens.colorNeutralStroke1),
            borderBottom: "3px solid ".concat(tokens.colorNeutralStroke2), // Bottom border for the cell
        }),
        fullDayCell: css({
            borderRight: "1px solid ".concat(tokens.colorNeutralStroke1),
            display: 'flex',
            flexDirection: 'row',
            gap: '0px',
            padding: '4px',
            borderBottom: "3px solid ".concat(tokens.colorNeutralStroke2),
            overflow: 'hidden', // Ensure events don’t overflow the cell
        }),
        fullDayEvent: css({
            flex: '1 1 auto',
            minWidth: '24px',
            height: '24px',
            padding: '4px 8px',
            backgroundColor: tokens.colorBrandBackground,
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }),
        dayHeaderCell: css({
            textAlign: 'center',
            backgroundColor: tokens.colorNeutralBackground2,
            padding: '8px',
            fontWeight: 'bold',
            borderBottom: "1px solid ".concat(tokens.colorNeutralStroke1),
            position: 'sticky',
            top: 0,
            zIndex: 10, // Ensures it stays above the scrolling grid
        }),
        todayHeaderCell: css({
            borderTop: "5px solid ".concat(tokens.colorBrandBackground),
        }),
        eventCard: css({
            padding: 2,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '2px',
            zIndex: 1,
            position: 'absolute',
            alignContent: 'center',
            overflow: 'hidden',
            ':hover': {
                pointerEvents: 'auto',
                cursor: 'pointer',
            },
        }),
        event: css({
            height: '100%',
            backgroundColor: tokens.colorBrandBackground,
            borderRadius: '4px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '2px',
            zIndex: 1,
            position: 'absolute',
            alignContent: 'center',
            ':hover': {
                pointerEvents: 'auto',
                cursor: 'pointer',
            },
        }),
        dayCell: css({
            borderBottom: "1px solid ".concat(tokens.colorNeutralStroke1),
            borderRight: "1px solid ".concat(tokens.colorNeutralStroke1),
            position: 'relative',
            overflow: 'visible',
            FlexDirection: 'column',
            gap: '4px',
        }),
        currentTimeIndicator: css({
            position: 'absolute',
            left: 0,
            height: '2px',
            backgroundColor: tokens.colorPaletteRedBorderActive,
            width: '100%',
            zIndex: 1,
        }),
        currentHalfHourCell: css({
            border: "2px solid ".concat(tokens.colorPaletteRedBorderActive), // Highlight with a red border
        }),
        eventTitle: css({
            display: '-webkit-box',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical',
            textAlign: 'start',
            textOverflow: 'ellipsis',
            paddingLeft: '8px',
            wordBreak: 'break-word',
            overflow: 'hidden',
        }),
        popoverContent: css({
            padding: 0,
            borderTopWidth: 20,
            borderTopStyle: 'solid',
        }),
    };
    var applyEventHouverColorClass = React.useCallback(function (backgroundColor, hoverColor) {
        return css({
            backgroundColor: backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : tokens.colorBrandBackground,
            ':hover': {
                backgroundColor: hoverColor !== null && hoverColor !== void 0 ? hoverColor : tokens.colorBrandBackgroundHover,
            },
        });
    }, [tokens.colorBrandBackground, tokens.colorBrandBackgroundHover]);
    var appyDynamicStyles = React.useCallback(function (eventIndex, eventCount, rowHeight, spanSlots) {
        return css({
            flex: "0 0 calc(100% / ".concat(eventCount, ")"),
            height: "".concat(rowHeight * spanSlots, "px"),
            left: "".concat(eventIndex * 10, "%"),
            width: "calc(".concat(100 - eventIndex * 10, "% - 8px)"),
            margin: 4,
            marginTop: 0,
            marginBottom: 0,
        });
    }, []);
    return { styles: styles, applyEventHouverColorClass: applyEventHouverColorClass, appyDynamicStyles: appyDynamicStyles };
};
//# sourceMappingURL=useWeekViewStyles.js.map