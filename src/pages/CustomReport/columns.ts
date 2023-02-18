export interface ICustomReportColumnElement {
    id: string;
    name: string;
}

export const customReportColumns = [
    {
        name: 'id',
        label: 'Идентификатор',
        options: {
            viewColumns: false,
            display: false,
        },
    },
    {
        name: 'name',
        label: 'Наименование',
        options: {},
    },
];
