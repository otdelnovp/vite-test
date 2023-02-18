import { ICustomReportElement } from '../model';

export const addTableField = (tableField: any, body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void) => {
    setBody({
        ...body,
        tableFields: [
            ...body.tableFields,
            {
                table: tableField.table,
                field: tableField.field,
                title: tableField.title,
                order: body.tableFields.length + 1,
            },
        ],
    });
};

export const deleteTableField = (tableField: any, body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void) => {
    let newTableFields = body.tableFields.filter(
        (filterField) => !(filterField.table === tableField.table && filterField.field === tableField.field),
    );
    newTableFields = newTableFields.map((item, index) => {
        return { ...item, order: index + 1 };
    });
    setBody({
        ...body,
        tableFields: newTableFields,
    });
};
