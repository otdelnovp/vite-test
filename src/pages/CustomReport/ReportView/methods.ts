import { IConditionParameter, ICustomReportElement } from '../model';

export const onFieldChange = (parameter: string, value: string, body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void) => {
    const newConditionParameters: IConditionParameter[] = body.conditionParameters.map((item) => {
        if (item.parameter === parameter) {
            return { ...item, value: value };
        }
        return { ...item };
    });
    setBody({ ...body, conditionParameters: [...newConditionParameters] });
};
