import * as React from 'react';
import { CalendarMonthFilled, CalendarMonthRegular, bundleIcon, } from '@fluentui/react-icons';
import { Menu, MenuButton, MenuList, MenuPopover, MenuTrigger, } from '@fluentui/react-components';
import { CalendarMonth } from './CalendarMonth';
import strings from 'ControlStrings';
import { format } from 'date-fns';
export var SelectMonth = function (props) {
    var onSelected = props.onSelected, value = props.value;
    var Calendar = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
    var _a = React.useState(value !== null && value !== void 0 ? value : new Date()), selectedDate = _a[0], setSelectedDate = _a[1];
    React.useEffect(function () {
        onSelected(value !== null && value !== void 0 ? value : new Date());
        setSelectedDate(value !== null && value !== void 0 ? value : new Date());
    }, [value]);
    var _b = React.useState(false), open = _b[0], setOpen = _b[1];
    var onOpenChange = function (_e, data) {
        setOpen(data.open);
    };
    var onDateChange = React.useCallback(function (date) {
        onSelected(date);
        setSelectedDate(date);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Menu, { open: open, onOpenChange: onOpenChange },
            React.createElement(MenuTrigger, { disableButtonEnhancement: true },
                React.createElement(MenuButton, { shape: "circular", icon: React.createElement(Calendar, null), style: { minWidth: "200px" }, "aria-label": "".concat(strings.CalendarControlSelectMonthLabel, ": ").concat(format(selectedDate, "MMMM yyyy")) }, format(selectedDate, "MMMM yyyy"))),
            React.createElement(MenuPopover, null,
                React.createElement(MenuList, null,
                    React.createElement(CalendarMonth, { onDateChange: onDateChange, defaultSelectedDate: selectedDate, onDismiss: function () {
                            setOpen(false);
                        } }))))));
};
//# sourceMappingURL=SelectMonth.js.map