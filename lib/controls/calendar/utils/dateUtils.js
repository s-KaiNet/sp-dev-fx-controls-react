import { utcToZonedTime } from 'date-fns-tz';
var ISO_DATE_ONLY_REGEXP = /^(\d{4})-(\d{2})-(\d{2})$/;
var ISO_TIME_ZONE_REGEXP = /(?:Z|[+-]\d{2}:?\d{2})$/i;
var padDatePart = function (datePart) { return datePart.toString().padStart(2, '0'); };
export var getDateKey = function (date) {
    return "".concat(date.getFullYear(), "-").concat(padDatePart(date.getMonth() + 1), "-").concat(padDatePart(date.getDate()));
};
export var parseCalendarDate = function (dateString, timeZone) {
    var dateOnlyMatch = ISO_DATE_ONLY_REGEXP.exec(dateString);
    if (dateOnlyMatch) {
        var year = dateOnlyMatch[1], month = dateOnlyMatch[2], day = dateOnlyMatch[3];
        return new Date(Number(year), Number(month) - 1, Number(day));
    }
    var parsedDate = new Date(dateString);
    if (Number.isNaN(parsedDate.getTime()) || !ISO_TIME_ZONE_REGEXP.test(dateString)) {
        return parsedDate;
    }
    return utcToZonedTime(parsedDate, timeZone);
};
//# sourceMappingURL=dateUtils.js.map