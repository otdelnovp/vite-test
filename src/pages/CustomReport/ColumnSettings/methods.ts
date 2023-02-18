import { ICustomReportElement } from '../model';

export const reportTypeOptions = [
    { value: 'table', label: 'Таблица' },
    { value: 'histogram', label: 'Гистограмма' },
];

export const onChangeReportType = (reportType: string | null, body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void) => {
    //@ts-ignore
    setBody({ ...body, reportType: reportType, tableFields: [] });
};

export const onChangeColumnSettings = (
    relationIndex: number,
    field: string,
    value: string | null,
    body: ICustomReportElement,
    setBody: (newBody: ICustomReportElement) => void,
) => {
    const newTableFields = body.tableFields.map((item, index) => {
        if (relationIndex === index) {
            return { ...item, [field]: value };
        }
        return { ...item };
    });
    setBody({ ...body, tableFields: [...newTableFields] });
};
