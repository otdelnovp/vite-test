export interface IFormField {
    name: string;
    label: string;
    input?: string;
    config: {
        type?: string;
        hidden?: boolean;
        required?: boolean;
        gridSize?: number;
        placeholder?: string;
        fieldText?: string;
        dictionaryName?:
            | 'companies'
            | 'companyUsers'
            | 'departments'
            | 'companyOwnershipTypes'
            | 'companyUsers'
            | 'boardStates'
            | 'roles'
            | 'userGroups'
            | 'tasks';
        options?: { id: string; value: string; text: string }[];
        skipCurrentId?: boolean;
        selectProps?: { valueField: string; textField: string };
        parentId?: string | string[] | undefined;
        filterFields?: string[] | undefined;
        minDate?: string;
        maxDate?: string;
        dates?: string[];
    };
}

