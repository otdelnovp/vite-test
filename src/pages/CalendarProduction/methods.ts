import { currentYear } from '@helpers/dateHelper';

export interface ICalendarProductionDay {
    Date: string;
    IsWork: boolean;
    DayType?: string;
    WeekDay: number;
}

export interface ICalendarProductionFilter {
    Year: string;
    CompanyId: string | null;
}

export const calendarProductionFilterInit: ICalendarProductionFilter = {
    Year: currentYear.toString(),
    CompanyId: null,
};

export const prepareCalendarProduction = (calendarProduction: ICalendarProductionDay[]) => {
    const resultCalendar: ICalendarProductionDay[][] = [];
    calendarProduction.forEach((day) => {
        const dayDate = new Date(day.Date);
        // const currentMonth = resultCalendar[dayDate.getMonth()];
        resultCalendar[dayDate.getMonth()] = [...(resultCalendar[dayDate.getMonth()] || []), { ...day, WeekDay: dayDate.getDay() }];
    });

    return resultCalendar;
};
