import * as React from 'react';
import { Calendar, DateRangeType } from "@fluentui/react-calendar-compat";
import strings from 'ControlStrings';
import { css } from '@emotion/css';
var useCalendarStyles = function () {
    return {
        root: css({
            outline: "none",
        }),
    };
};
export var defaultCalendarMonthStrings = {
    months: [
        strings.DatePickerMonthLongJanuary,
        strings.DatePickerMonthLongFebruary,
        strings.DatePickerMonthLongMarch,
        strings.DatePickerMonthLongApril,
        strings.DatePickerMonthLongMay,
        strings.DatePickerMonthLongJune,
        strings.DatePickerMonthLongJuly,
        strings.DatePickerMonthLongAugust,
        strings.DatePickerMonthLongSeptember,
        strings.DatePickerMonthLongOctober,
        strings.DatePickerMonthLongNovember,
        strings.DatePickerMonthLongDecember,
    ],
    shortMonths: [
        strings.DatePickerMonthShortJanuary,
        strings.DatePickerMonthShortFebruary,
        strings.DatePickerMonthShortMarch,
        strings.DatePickerMonthShortApril,
        strings.DatePickerMonthShortMay,
        strings.DatePickerMonthShortJune,
        strings.DatePickerMonthShortJuly,
        strings.DatePickerMonthShortAugust,
        strings.DatePickerMonthShortSeptember,
        strings.DatePickerMonthShortOctober,
        strings.DatePickerMonthShortNovember,
        strings.DatePickerMonthShortDecember,
    ],
    days: [
        strings.DatePickerDayLongSunday,
        strings.DatePickerDayLongMonday,
        strings.DatePickerDayLongTuesday,
        strings.DatePickerDayLongWednesday,
        strings.DatePickerDayLongThursday,
        strings.DatePickerDayLongFriday,
        strings.DatePickerDayLongSaturday,
    ],
    shortDays: [
        strings.DatePickerDayShortSunday,
        strings.DatePickerDayShortMonday,
        strings.DatePickerDayShortTuesday,
        strings.DatePickerDayShortWednesday,
        strings.DatePickerDayShortThursday,
        strings.DatePickerDayShortFriday,
        strings.DatePickerDayShortSaturday,
    ],
    goToToday: strings.DatePickerGoToToday,
};
export var CalendarMonth = function (props) {
    var onDateChange = props.onDateChange, defaultSelectedDate = props.defaultSelectedDate, onDismiss = props.onDismiss, _a = props.strings, strings = _a === void 0 ? defaultCalendarMonthStrings : _a;
    var styles = useCalendarStyles();
    var _b = React.useState(defaultSelectedDate !== null && defaultSelectedDate !== void 0 ? defaultSelectedDate : new Date()), selectedDate = _b[0], setSelectedDate = _b[1];
    var onSelectDate = React.useCallback(function (date, _selectedDateRangeArray) {
        setSelectedDate(date);
        onDateChange(date);
        onDismiss();
    }, [onDateChange, onDismiss]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Calendar, { className: styles.root, dateRangeType: DateRangeType.Month, highlightSelectedMonth: true, isDayPickerVisible: false, onSelectDate: onSelectDate, value: selectedDate, onDismiss: onDismiss, showGoToToday: false, allFocusable: false, strings: strings })));
};
//# sourceMappingURL=CalendarMonth.js.map