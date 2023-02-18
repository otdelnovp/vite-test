
import { IWorkedTimeDateData } from '../methods';

export interface ICalendarDay {
    Date: string;
    IsWork: boolean;
    DayType?: string;
    WeekDay: number;
    Hours: number;
    Selected?: boolean;
}

export const getCalendarData = (year: number, monthIndex: number, dateList: IWorkedTimeDateData[]) => {
    const calendarData: ICalendarDay[] = [];
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    for (let i = 0; i < lastDay; i++) {
        const currentDate = new Date(year, monthIndex, i);
        const currentDateStr = year + "-" + String(monthIndex + 1).padStart(2, '0') + "-" + String(i + 1).padStart(2, '0');
        const workedData = dateList.find(item => item.Date === currentDateStr)
        const newDay = {
            Date: currentDateStr,
            IsWork: currentDate.getDay() === 6 || currentDate.getDay() === 7,
            WeekDay: currentDate.getDay(),
            Hours: workedData ? workedData.Time : 0,
        }
        calendarData.push(newDay)
    }
    return calendarData
}

