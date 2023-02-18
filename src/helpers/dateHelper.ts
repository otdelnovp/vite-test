import moment, { Moment } from 'moment';

export const baseDateTimeFormat = 'YYYY-MM-DDTHH:mm:ssZ';

export const startOfDay = (date = moment()) => date.startOf('day');
export const endOfDay = (date = moment()) => date.endOf('day');

export const startOfYear = (date = moment()) => date.startOf('year');
export const endOfYear = (date = moment()) => date.endOf('year');

export const startOfMonth = (date = moment()) => date.startOf('month');
export const endOfMonth = (date = moment()) => date.endOf('month');

export const addDays = (date = moment(), days: number) => date.add(days, 'days');
export const addMinutes = (date = moment(), days: number) => date.add(days, 'minutes');

export const nextDateStr = (format?: string) => momentToFormatString(addDays(startOfDay(), 1), format);

export const nextDateMoment = () => addDays(startOfDay(), 1);

export const stringToDateTimeStringFormat = (dateTime: string, format?: string) => {
    return moment(dateTime)
        .format(format ? format : 'DD.MM.YYYY HH:mm')
        .toString();
};

export const momentToFormatString = (dateTime: Moment = moment(), format?: string) => {
    if (!dateTime) dateTime = moment();
    return dateTime.format(format ? format : baseDateTimeFormat).toString();
};

export const stringToMoment = (dateStr: string) => {
    return moment(dateStr);
};

export const getStartDateForSearch = () => {
    return momentToFormatString(addMinutes(addDays(startOfDay(), 1), 1));
};

export const getEndDateForSearch = () => {
    return momentToFormatString(addDays(endOfDay(), 31));
};

export const getDateStr = (date?: string | null) => moment(date).format('DD.MM.YYYY');
export const getTimeStr = (date?: string | null) => moment(date).format('HH:mm');
export const getDateTimeStr = (date?: string | null) => moment(date).format('DD.MM.YYYY HH:mm');

export const isActualDate = (date: string) => moment(date).diff(moment(nextDateStr())) > 0;

export const getTimeFromMinutes = (minutesValue: number | null = 0) => {
    if (!minutesValue) return '0:00';
    const hours = Math.floor(minutesValue / 60);
    const minutes = Math.floor(minutesValue % 60);
    // hours = hours <= 4 ? 4 : hours <= 12 ? hours - 1 : hours - 2;
    return hours + ':' + (minutes < 10 ? '0' + minutes : minutes);
};

export const getRuLocaleWeekDay = (day: number) => (day + 6) % 7;

export const dateToServerTimestamp = (dateTime: string = '') => {
    return new Date(dateTime).toISOString();
};

export const weekDayList: string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const monthList: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth() + 1;
export const yearList: number[] = [currentYear - 1, currentYear, currentYear + 1];

export const getDaysInMonth = (dateInMonth: string) => {
    const currentYear = new Date(dateInMonth).getFullYear();
    const currentMonth = new Date(dateInMonth).getMonth();
    return new Date(currentYear, currentMonth + 1, 0).getDate();
};

export interface ICalendarDay {
    Date: Date;
    DayOfWeek: number;
    DayOfWeekName: string;
}
export interface ICalendarWeek {
    WeekStartDay: number;
    WeekEndDay: number;
    Days: ICalendarDay[];
}
export const getCalendarWeeks = (dateInMonth: string): ICalendarWeek[] => {
    const currentYear = new Date(dateInMonth).getFullYear();
    const currentMonth = new Date(dateInMonth).getMonth();
    const daysInMonth = getDaysInMonth(dateInMonth);

    let currentWeek = 0;
    const calendarWeeks: ICalendarWeek[] = [
        {
            WeekStartDay: 1,
            WeekEndDay: 1,
            Days: [],
        },
    ];
    for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
        const currentDate = new Date(`${currentYear}-${currentMonth + 1}-${currentDay}`);
        const currentDayOfWeek = getRuLocaleWeekDay(currentDate.getDay());
        calendarWeeks[currentWeek].Days.push({
            Date: currentDate,
            DayOfWeek: currentDayOfWeek,
            DayOfWeekName: weekDayList[currentDayOfWeek],
        });
        if (currentDayOfWeek === 6 || currentDay === daysInMonth) {
            calendarWeeks[currentWeek].WeekEndDay = currentDay;
            if (currentDay < daysInMonth) {
                currentWeek++;
                calendarWeeks[currentWeek] = {
                    WeekStartDay: currentDay + 1,
                    WeekEndDay: currentDay + 1,
                    Days: [],
                };
            }
        }
    }

    return calendarWeeks;
};

export const getHoursMaskByMinutes = (minutesValue: number): string => {
    if (isNaN(minutesValue)) return '';
    let hours = Math.floor(minutesValue / 60);
    let minutes: number | string = Math.floor(minutesValue % 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return hours + ':' + minutes;
};

export const getTimeMaskByStr = (str: string): string => {
    let result: number | string = 0;
    let strValue = str.replace(/[^:0-9]/gim, '');
    if (strValue.indexOf(':') + 1) {
        result = getHoursMaskByMinutes(getMinutesFromString(strValue));
    } else {
        if (!!strValue) result = strValue + ':00';
        else result = '0:00';
    }
    return result;
};

export const getMinutesFromString = (stringValue: string): number => {
    let result: number = 0;
    const replacedStr = replaceDelimiter(stringValue);
    const timeArr = replacedStr.split(':');
    if (timeArr && timeArr.length > 0) {
        result += !isNaN(parseInt(timeArr[0]) * 60) ? parseInt(timeArr[0]) * 60 : 0;
    }
    if (timeArr && timeArr.length > 1) {
        result += !isNaN(parseFloat(timeArr[1])) ? parseFloat(timeArr[1]) : 0;
    }
    return result;
};

const replaceDelimiter = (value: string): string => {
    return value.replace('-', ':').replace(' ', ':').replace('/', ':').replace(',', ':').replace('.', ':').replace(/\s/g, ':');
};

export const parseTimeMaskToMinutes = (mask: string): number => {
    const maskArr = mask.split(':');
    return 60 * parseInt(maskArr[0]) + parseInt(maskArr[1]);
};

export const getWeekNumber = (d: Date): number[] => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    //@ts-ignore
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

export const addDaysToDate = (d: Date, days: number): Date => {
    let newDate = new Date(d)
    newDate.setDate(newDate.getDate() + days)
    return newDate
}

export const liveClockDateFormat = 'dddd, DD MMMM YYYY';
export const liveClockTimeFormat = 'HH:mm';

export const toLiveClockDateFormat = (date = moment()) => {
    date.locale('ru');
    return date.format(liveClockDateFormat).toString();
}
export const toLiveClockTimeFormat = (date = moment()) => {
    date.locale('ru');
    return date.format(liveClockTimeFormat).toString();
};

export const momentToFormatDateString = (date = moment()) => date.format(baseDateTimeFormat).toString();
export const stringToFormatDateString = (dateStr = '') => moment(dateStr).format(baseDateTimeFormat).toString();
