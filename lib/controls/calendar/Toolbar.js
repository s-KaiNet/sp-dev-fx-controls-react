import * as React from 'react';
import { ArrowDownFilled, ArrowDownRegular, ArrowUpFilled, ArrowUpRegular, CalendarTodayRegular, bundleIcon, } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { ECalendarViews } from './models/ECalendarViews';
import { SelectCalendarView } from './SelectCalendarView';
import { Tooltip } from '@fluentui/react-tooltip';
import strings from 'ControlStrings';
import { SelectDay } from './selectDay';
import { SelectMonth } from './selectMonth';
import { SelectWeek } from './selectWeek/SelectWeek';
import { Stack } from './stack';
export var Toolbar = React.memo(function (_a) {
    var selectedView = _a.selectedView, onSelectedView = _a.onSelectedView, currentDate = _a.currentDate, setCurrentDate = _a.setCurrentDate, onWeekChange = _a.onWeekChange, onMonthChange = _a.onMonthChange, onDayChange = _a.onDayChange;
    var ArrowDown = React.useMemo(function () { return bundleIcon(ArrowDownFilled, ArrowDownRegular); }, []);
    var ArrowUp = React.useMemo(function () { return bundleIcon(ArrowUpFilled, ArrowUpRegular); }, []);
    var onSelectWeek = React.useCallback(function (week) {
        onWeekChange(week.startDate);
        setCurrentDate(week.startDate);
    }, [onWeekChange, setCurrentDate]);
    var onSelectMonth = React.useCallback(function (month) {
        onMonthChange(month);
        setCurrentDate(month);
    }, [onMonthChange, setCurrentDate]);
    var onSelectDay = React.useCallback(function (day) {
        onDayChange(day);
        setCurrentDate(day);
    }, [onDayChange, setCurrentDate]);
    var RenderSelectView = React.useCallback(function () {
        switch (selectedView) {
            case ECalendarViews.Month:
                return React.createElement(SelectMonth, { onSelected: onSelectMonth, value: currentDate });
            case ECalendarViews.Week:
                return React.createElement(SelectWeek, { onSelected: onSelectWeek, value: currentDate });
            case ECalendarViews.Day:
                return React.createElement(SelectDay, { onSelected: onSelectDay, value: currentDate });
            default:
                return React.createElement(SelectMonth, { onSelected: onSelectMonth, value: currentDate });
        }
    }, [selectedView, onSelectMonth, onSelectWeek, onSelectDay, currentDate]);
    var RenderToday = React.useCallback(function () { return (React.createElement(Tooltip, { content: "Today", relationship: "label" },
        React.createElement(Button, { shape: "circular", icon: React.createElement(CalendarTodayRegular, null), size: "medium", onClick: function () { return onDayChange(new Date()); } }, strings.CalendarControlTodayLabel))); }, [onDayChange]);
    var handleNavigation = React.useCallback(function (offset) {
        var newDate = new Date(currentDate);
        switch (selectedView) {
            case ECalendarViews.Month:
                newDate.setMonth(newDate.getMonth() + offset);
                onMonthChange(newDate);
                break;
            case ECalendarViews.Week:
                newDate.setDate(newDate.getDate() + offset * 7);
                onWeekChange(newDate);
                break;
            case ECalendarViews.Day:
                newDate.setDate(newDate.getDate() + offset);
                onDayChange(newDate);
                break;
            default:
                break;
        }
        setCurrentDate(newDate);
    }, [
        currentDate,
        selectedView,
        onMonthChange,
        onWeekChange,
        onDayChange,
        setCurrentDate,
    ]);
    return (React.createElement(Stack, { width: "calc(100% - 40px)", height: "fit-content", direction: "horizontal", justifyContent: "space-between", alignItems: "center", paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px", paddingTop: "10px", columnGap: '10px', style: { overflow: 'hidden' } },
        React.createElement(Stack, { direction: "horizontal", justifyContent: "start", alignItems: "center", columnGap: '10px' },
            React.createElement(RenderToday, null),
            React.createElement(RenderSelectView, null),
            React.createElement(Tooltip, { content: strings.CalendarControlPreviousLabel, relationship: "label" },
                React.createElement(Button, { size: "medium", icon: React.createElement(ArrowUp, { fontSize: 14 }), onClick: function () { return handleNavigation(-1); } })),
            React.createElement(Tooltip, { content: strings.CalendarControlNextLabel, relationship: "label" },
                React.createElement(Button, { size: "medium", icon: React.createElement(ArrowDown, { fontSize: 14 }), onClick: function () { return handleNavigation(1); } }))),
        React.createElement(Stack, { direction: "horizontal", justifyContent: "start", alignItems: "center", columnGap: '10px' },
            React.createElement(SelectCalendarView, { onSelected: onSelectedView, value: selectedView }))));
});
export default Toolbar;
//# sourceMappingURL=Toolbar.js.map