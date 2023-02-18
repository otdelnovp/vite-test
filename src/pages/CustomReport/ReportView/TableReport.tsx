import React from 'react';

import Box from '@mui/material/Box';

import DataTable from '@core/DataTable/DataTable';
import { getMUIDatatableOptions } from '@helpers/dataTableHelper';

import { ICustomReportElement } from '../model';
import { sx } from '../styles';

interface ITableReportProps {
    body: ICustomReportElement;
    customReportData: any[];
}

const TableReport = ({ body, customReportData }: ITableReportProps) => {
    const options = { ...getMUIDatatableOptions({ data: customReportData }) };

    const getColumns = (body: ICustomReportElement) => {
        return [
            {
                name: 'production_product',
                label: 'Продукт',
                options: {
                    filter: true,
                    searchable: true,
                    viewColumns: true,
                    sortThirdClickReset: true,
                },
            },
            {
                name: 'production_year',
                label: 'Год',
                options: {
                    filter: true,
                    searchable: true,
                    viewColumns: true,
                    sortThirdClickReset: true,
                },
            },
            {
                name: 'production_volume',
                label: 'Объем производства',
                options: {
                    filter: true,
                    searchable: true,
                    viewColumns: true,
                    sortThirdClickReset: true,
                },
            },
        ];

        return body.tableFields
            ? body.tableFields.map((item) => {
                  return {
                      name: `${item.table}_${item.field}`,
                      label: item.title,
                      options: {
                          filter: true,
                          searchable: true,
                          viewColumns: false,
                          sortThirdClickReset: true,
                      },
                  };
              })
            : [];
    };

    return (
        <React.Fragment>
            <Box sx={sx.tableBox}>
                <DataTable options={options} columns={getColumns(body)} data={customReportData ? customReportData : []} />
            </Box>
        </React.Fragment>
    );
};

export default TableReport;
