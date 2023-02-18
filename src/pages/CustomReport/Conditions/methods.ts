import { IConditionParameter, ICustomReportElement } from '../model';

export const updateConditionParameters = (body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void) => {
    let newConditionParameters: IConditionParameter[] = [];
    body.conditionParameters.forEach((item) => {
        const found = body.conditions.find((foundItem) => foundItem.value === item.parameter);
        if (found) newConditionParameters.push({ ...item });
    });
    body.conditions.forEach((item) => {
        const found = body.conditionParameters.find((foundItem) => foundItem.parameter === item.value);
        if (!found) newConditionParameters.push({ parameter: item.value, value: '' });
    });
    setBody({ ...body, conditionParameters: newConditionParameters });
};
