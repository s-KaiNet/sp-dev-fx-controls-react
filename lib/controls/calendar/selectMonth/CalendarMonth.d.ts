import * as React from 'react';
import { CalendarStrings } from "@fluentui/react-calendar-compat";
export declare const defaultCalendarMonthStrings: CalendarStrings;
export interface ICalendarMonthProps {
    onDateChange: (date: Date) => void;
    defaultSelectedDate?: Date;
    onDismiss: () => void;
    strings?: CalendarStrings;
}
export declare const CalendarMonth: React.FunctionComponent<ICalendarMonthProps>;
//# sourceMappingURL=CalendarMonth.d.ts.map