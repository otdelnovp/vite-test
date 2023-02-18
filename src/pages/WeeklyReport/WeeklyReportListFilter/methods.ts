import { IFormField } from "@core/UniversalForm/models";
import { IWeeklyReportListFilter } from "./model"

export const checkFilterFullfilled = (filter: IWeeklyReportListFilter, filterModel: IFormField[]) => {
    const error = filterModel.find((item) => {
        type ObjectKey = keyof typeof filter;
        const nameKey = item.name as ObjectKey;
        if (item.config.required && !filter[nameKey]) return true
        return false
    })
    return !error;
}