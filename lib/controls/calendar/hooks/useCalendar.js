import { __assign } from "tslib";
import { getDateKey, parseCalendarDate } from '../utils/dateUtils';
import { useCallback, } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique IDs
export var useCalendar = function (timezone) {
    // Initialize events with a unique ID
    var initializeEventsWithId = useCallback(function (events) {
        return events.map(function (event) { return (__assign(__assign({}, event), { id: event.id || uuidv4() })); });
    }, []);
    // Memoized helper for timezone handling
    var toLocalDate = useCallback(function (dateString) {
        return parseCalendarDate(dateString, timezone);
    }, [timezone]);
    var getMonthCalendar = useCallback(function (events, year, month) {
        var eventsWithId = initializeEventsWithId(events);
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var calendarEventsByDay = {};
        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(year, month, day);
            var dateString = getDateKey(date);
            calendarEventsByDay[dateString] = [];
        }
        eventsWithId.forEach(function (event) {
            var eventStart = toLocalDate(event.start);
            var eventEnd = toLocalDate(event.end);
            var currentDate = new Date(eventStart);
            while (currentDate <= eventEnd) {
                var dateString = getDateKey(currentDate);
                if (calendarEventsByDay[dateString]) {
                    calendarEventsByDay[dateString].push(event);
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return calendarEventsByDay;
    }, [initializeEventsWithId, toLocalDate]);
    var getWeekEvents = useCallback(function (events, startDate) {
        var weekEvents = [];
        var start = toLocalDate(startDate);
        var eventsWithId = initializeEventsWithId(events);
        var _loop_1 = function (i) {
            var currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            var dateString = getDateKey(currentDate);
            var dayTimeSlots = Array.from({ length: 48 }, function (_, index) { return ({
                time: "".concat(String(Math.floor(index / 2)).padStart(2, '0'), ":").concat(index % 2 === 0 ? '00' : '30'),
                events: [],
            }); });
            var fullDayEvents = [];
            eventsWithId.forEach(function (event) {
                var eventStart = toLocalDate(event.start);
                var eventEnd = toLocalDate(event.end);
                if (event.isFullDay) {
                    if (getDateKey(eventStart) <= dateString &&
                        getDateKey(eventEnd) >= dateString) {
                        fullDayEvents.push(event);
                    }
                    return;
                }
                if (getDateKey(eventStart) <= dateString &&
                    getDateKey(eventEnd) >= dateString) {
                    var currentSlot = new Date(eventStart);
                    while (currentSlot <= eventEnd) {
                        var slotDateString = getDateKey(currentSlot);
                        if (slotDateString === dateString) {
                            var slotIndex = currentSlot.getHours() * 2 +
                                (currentSlot.getMinutes() >= 30 ? 1 : 0);
                            if (dayTimeSlots[slotIndex]) {
                                dayTimeSlots[slotIndex].events.push(event);
                            }
                        }
                        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
                    }
                }
            });
            weekEvents.push({
                date: dateString,
                fullDayEvents: fullDayEvents,
                timeSlots: dayTimeSlots,
            });
        };
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        return weekEvents;
    }, [initializeEventsWithId, toLocalDate]);
    return {
        getMonthCalendar: getMonthCalendar,
        getWeekEvents: getWeekEvents,
    };
};
export default useCalendar;
//# sourceMappingURL=useCalendar.js.map