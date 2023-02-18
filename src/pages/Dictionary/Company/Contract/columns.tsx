import React from 'react';
import { stringToDateTimeStringFormat } from '@helpers/dateHelper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface IContractColumnElement {
    Id: string;
    Counterparty: {
        Name: string;
        Type: string;
    };
    SupplierId: string;
    SupplierName: string;
    CustomerId: string;
    CustomerName: string;
    Number: string;
    DateOfIssue: string;
    ValidFrom: string;
    ValidTo: string;
    Description: string;
    IsDeleted: boolean;
}

export const contractColumns = [
    {
        name: 'Id',
        label: 'ИД контракта',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'Number',
        label: 'Номер договора',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            sortDefault: 'asc',
        },
    },
    {
        name: 'Counterparty',
        label: 'Контрагент',
        options: {
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                if (value) {
                    console.log('value', value);
                    const currentValue = value;
                    const nextColumnValue = tableMeta.tableData[tableMeta.rowIndex][tableMeta.columnIndex + 1];
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography>{value.Name}</Typography>
                            <Typography sx={{ fontSize: '0.8em', color: '#aaa' }}>{value.Type}</Typography>
                        </Box>
                    );
                } else {
                    return 'no data';
                }
            },
        },
    },
    {
        name: 'DateOfIssue',
        label: 'Дата договора',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'ValidFrom',
        label: 'Действует с',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'ValidTo',
        label: 'Действует по',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'Description',
        label: 'Описание',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
