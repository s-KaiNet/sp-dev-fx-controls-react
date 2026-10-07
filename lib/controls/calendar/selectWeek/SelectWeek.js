import * as React from 'react';
import { Calendar, DateRangeType, } from '@fluentui/react-calendar-compat';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon, } from '@fluentui/react-icons';
import { Menu, MenuButton, MenuList, MenuPopover, MenuTrigger, } from '@fluentui/react-components';
import { format, utcToZonedTime } from 'date-fns-tz';
import strings from 'ControlStrings';
export var defaultSelectWeekStrings = {
    selectWeekPlaceholder: strings.CalendarControlSelectWeekLabel,
};
var formatWeekLabel = function (week) {
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var startMonth = format(week.start, 'MMM', { timeZone: timeZone });
    var endMonth = format(week.end, 'MMM', { timeZone: timeZone });
    var startYear = format(week.start, 'yyyy', { timeZone: timeZone });
    var endYear = format(week.end, 'yyyy', { timeZone: timeZone });
    if (startYear !== endYear) {
        return "".concat(format(week.start, 'dd MMM yyyy', { timeZone: timeZone }), " - ").concat(format(week.end, 'dd MMM yyyy', { timeZone: timeZone }));
    }
    if (startMonth !== endMonth) {
        return "".concat(format(week.start, 'dd MMM', { timeZone: timeZone }), " - ").concat(format(week.end, 'dd MMM yyyy', { timeZone: timeZone }));
    }
    return "".concat(format(week.start, 'dd', { timeZone: timeZone }), " - ").concat(format(week.end, 'dd MMM yyyy', { timeZone: timeZone }));
};
var getWeekRange = function (date) {
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var zonedDate = utcToZonedTime(date, timeZone);
    var start = new Date(zonedDate);
    start.setDate(zonedDate.getDate() - zonedDate.getDay());
    var end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
        start: utcToZonedTime(start, timeZone),
        end: utcToZonedTime(end, timeZone),
    };
};
export var SelectWeek = React.memo(function (props) {
    var onSelected = props.onSelected, value = props.value, _a = props.strings, selectWeekStrings = _a === void 0 ? defaultSelectWeekStrings : _a;
    var dateRangeType = DateRangeType.Week;
    var _b = React.useState(value !== null && value !== void 0 ? value : new Date()), selectedDate = _b[0], setSelectedDate = _b[1];
    var _c = React.useState(function () {
        var newValue = value !== null && value !== void 0 ? value : new Date();
        if (newValue) {
            var weekRange = getWeekRange(newValue);
            return formatWeekLabel(weekRange);
        }
        return selectWeekStrings.selectWeekPlaceholder;
    }), selectedWeek = _c[0], setSelectedWeek = _c[1];
    var _d = React.useState(false), open = _d[0], setOpen = _d[1];
    var onOpenChange = React.useCallback(function (_e, data) {
        setOpen(data.open);
    }, []);
    var MonthIcon = React.useMemo(function () { return bundleIcon(CalendarMonthFilled, CalendarMonthRegular); }, []);
    var onSelectDate = React.useCallback(function (date) {
        if (date) {
            setSelectedDate(date);
            var weekRange = getWeekRange(date);
            var weekLabel = formatWeekLabel(weekRange);
            setSelectedWeek(weekLabel);
            onSelected({ startDate: weekRange.start, endDate: weekRange.end });
            setOpen(false);
        }
    }, [onSelected]);
    var firstDayOfWeek = React.useMemo(function () { return 0; }, []);
    return (React.createElement(Menu, { open: open, onOpenChange: onOpenChange },
        React.createElement(MenuTrigger, { disableButtonEnhancement: true },
            React.createElement(MenuButton, { shape: "circular", icon: React.createElement(MonthIcon, null), style: { minWidth: '200px' }, "aria-label": "".concat(strings.CalendarControlSelectWeekLabel, ": ").concat(selectedWeek) }, selectedWeek)),
        React.createElement(MenuPopover, { style: { maxWidth: 'fit-content' } },
            React.createElement(MenuList, null,
                React.createElement(Calendar, { dateRangeType: dateRangeType, highlightSelectedMonth: true, showGoToToday: true, onSelectDate: onSelectDate, value: selectedDate, firstDayOfWeek: firstDayOfWeek })))));
});
//# sourceMappingURL=SelectWeek.js.map