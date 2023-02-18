export interface IDepartmentColumnElement {
    Id: string;
    ParentId: string;
    Name: string;
    Address: string;
    ContactPerson: string;
    Email: string;
    Phone: string;
    IsDeleted: boolean;
}

export const departmentColumns = [
    {
        field: 'Id',
        label: 'ИД организации',
        elementType: 'field',
        config: {
            type: 'guid',
            visible: false,
        },
    },
    {
        field: 'Name',
        label: 'Наименование',
        elementType: 'field',
        config: {
            type: 'string',
            visible: true,
        },
    },
    {
        field: 'Address',
        label: 'Адрес фактический',
        elementType: 'field',
        config: {
            type: 'string',
            visible: true,
        },
    },
];
