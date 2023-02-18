import { IFormField } from '@core/UniversalForm/models';

export type ComparsionType = 'equal' | 'not_equal' | 'more' | 'less' | 'more_or_equal' | 'less_or_equal';
export type SortType = 'asc' | 'desc';

export interface ITableElement {
    title: string;
    name: string;
    columns: {
        title: string;
        name: string;
    }[];
}

export interface ITableFieldElement {
    table: string;
    field: string;
    title: string;
    order: number;
    fieldType?: string;
}

export interface IRelationElement {
    table1: string;
    joinType: string;
    table2: string;
    table1Field: string;
    comparsionType: ComparsionType;
    table2Field: string;
}

export interface IConditionElement {
    table: string;
    field: string;
    comparsionType: ComparsionType;
    value: string;
}

export interface IConditionParameter {
    parameter: string;
    value: string;
}

export interface ISortElement {
    table: string;
    field: string;
    sortType: SortType;
    order: number;
}

export interface ICustomReportElement {
    id: string;
    name: string;
    reportType: 'table' | 'histogram' | null;
    dataSource: string;
    tables: string[];
    tableFields: ITableFieldElement[];
    relations: IRelationElement[];
    conditions: IConditionElement[];
    conditionParameters: IConditionParameter[];
    sort: ISortElement[];
}

export interface ICustomReportListElement {
    id: string;
    name: string;
}

export const customReportModel: IFormField[] = [
    {
        name: 'id',
        label: 'Идентификатор',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'name',
        label: 'Наименование',
        config: {
            required: true,
            gridSize: 6,
        },
    },
];
