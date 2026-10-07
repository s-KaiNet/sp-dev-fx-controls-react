import * as React from 'react';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon, } from '@fluentui/react-icons';
import { Menu, MenuButton, MenuList, MenuPopover, MenuTrigger, } from '@fluentui/react-components';
import { format, utcToZonedTime } from 'date-fns-tz';
import { Calendar } from '@fluentui/react-calendar-compat';
import strings from 'ControlStrings';
export var SelectDay = React.memo(function (props) {
    var onSelected = props.onSelected, value = props.value;
    var _a = React.useState(value !== null && value !== void 0 ? value : new Date()), selectedDate = _a[0], setSelectedDate = _a[1];
    var _b = React.useState(function () {
        var initialDate = value !== null && value !== void 0 ? value : new Date();
        return format(initialDate, 'dd MMM, yyyy');
    }), selectedLabel = _b[0], setSelectedLabel = _b[1];
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var onOpenChange = React.useCallback(function (_e, data) {
        setOpen(data.open);
    }, []);
    var MonthIcon = React.useMemo(function () { return bundleIcon(CalendarMonthFilled, CalendarMonthRegular); }, []);
    var onSelectDate = React.useCallback(function (date) {
        if (date) {
            var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            var zonedDate = utcToZonedTime(date, timeZone);
            setSelectedDate(zonedDate);
            setSelectedLabel(format(zonedDate, 'dd MMM, yyyy'));
            onSelected(zonedDate);
            setOpen(false);
        }
    }, [onSelected]);
    return (React.createElement(Menu, { open: open, onOpenChange: onOpenChange },
        React.createElement(MenuTrigger, { disableButtonEnhancement: true },
            React.createElement(MenuButton, { shape: "circular", icon: React.createElement(MonthIcon, null), style: { minWidth: '200px' }, "aria-label": "".concat(strings.CalendarControlSelectDayLabel, ": ").concat(selectedLabel) }, selectedLabel)),
        React.createElement(MenuPopover, { style: { maxWidth: 'fit-content' } },
            React.createElement(MenuList, null,
                React.createElement(Calendar, { highlightSelectedMonth: true, showGoToToday: true, onSelectDate: onSelectDate, value: selectedDate })))));
});
//# sourceMappingURL=SelectDay.js.map