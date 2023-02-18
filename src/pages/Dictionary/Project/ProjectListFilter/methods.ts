import { IFormField } from "@core/UniversalForm/models";
import { IProjectListFilter } from "./model"

export const checkFilterFullfilled = (filter: IProjectListFilter, filterModel: IFormField[]) => {
    const error = filterModel.find((item) => {
        type ObjectKey = keyof typeof filter;
        const nameKey = item.name as ObjectKey;
        if (item.config.required && !filter[nameKey]) return true
        return false
    })
    return !error;
}