import React from 'react';

import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';

import { FilterType, SelectableRows, Responsive } from 'mui-datatables';

import DataTableFooter from '@core/DataTable/DataTableFooter/DataTableFooter';

interface IEditToolbar {
    showEditDialog?: (arg0?: string) => void;
}

const EditToolbar = ({ showEditDialog }: IEditToolbar) => {
    if (!showEditDialog) return <></>;
    const toolbarIconsProps = [
        {
            title: 'Добавить',
            onClick: () => {
                showEditDialog();
            },
            icons: <AddBoxIcon />,
            key: 'addKey',
        },
    ];
    return (
        <>
            {toolbarIconsProps.map((toolProps) => (
                <Tooltip title={toolProps.title} key={toolProps.key}>
                    <IconButton onClick={() => showEditDialog()}>{toolProps.icons}</IconButton>
                </Tooltip>
            ))}
        </>
    );
};

const customSearchRender = (searchText: string, handleSearch: any, hideSearch: any, options: any) => {
    return (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <SearchIcon
                sx={{
                    margin: 'auto 0',
                    color: '#aaaaaa',
                }}
            />
            <FilledInput
                id="seacrh-textfield"
                value={searchText || ''}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Поиск по списку..."
                sx={{
                    margin: '20px 0',
                    height: '2.6em',
                    padding: '16px 4px 16px 8px',
                    borderRadius: '2px',
                    marginLeft: '-30px',
                    minWidth: '400px',
                }}
            />
        </Box>
    );
};

const textLabels = {
    body: {
        noMatch: 'Записей не найдено',
        toolTip: 'Сортировать',
    },
    pagination: {
        next: 'След. стр',
        previous: 'Пред. стр',
        rowsPerPage: 'Записей на странице:',
        displayRows: 'из',
    },
    toolbar: {
        search: 'Поиск',
        downloadCsv: 'Скачать CSV',
        print: 'Печать',
        viewColumns: 'Настройка колонок',
        filterTable: 'Фильтровать таблицу',
    },
    filter: {
        all: 'Все',
        title: 'Фильтры',
        reset: 'Сброс',
    },
    viewColumns: {
        title: 'Показывать колонки',
        titleAria: 'Показывать/Спрятать колонки таблицы',
    },
    selectedRows: {
        text: 'ряд(ов) выбран(о)',
        delete: 'Удалить',
        deleteAria: 'Удалить выбранные ряды',
    },
};

interface IFooter {
    (
        count: number,
        page: number,
        rowsPerPage: number,
        changeRowsPerPage: (numberOfRows: number) => void,
        changePage: (currentPage: number) => void,
        textLabels: any,
        customFooter?: JSX.Element,
    ): void;
}

const datatableFooter: IFooter = (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels, customFooter) => {
    return (
        <DataTableFooter
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            textLabels={textLabels}
            customFooter={customFooter}
        />
    );
};

interface IGetMUIDatatableOptions {
    showEditDialog?: (arg0?: string) => void;
    data?: any;
    serverPagination?: boolean;
    changePage?: (tableState: any) => void;
    pageSize?: number;
    customFooter?: JSX.Element;
}

export const getMUIDatatableOptions = (args: IGetMUIDatatableOptions) => {
    const rowsPerPage = args.pageSize ? args.pageSize : 10;
    const rowsPerPageOptions = args.serverPagination ? [rowsPerPage] : [20, 40, 100];
    const serverSide = args.serverPagination;

    let options = {
        responsive: 'standard' as Responsive,
        filterType: 'dropdown' as FilterType,
        filter: !serverSide,
        customToolbar: args.showEditDialog ? () => <EditToolbar showEditDialog={args.showEditDialog} /> : undefined,
        textLabels: textLabels,
        tableBodyMaxHeight: 'auto',
        selectableRows: 'none' as SelectableRows,
        serverSide: serverSide,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: rowsPerPageOptions,
        print: false,
        download: false,
        search: !args.serverPagination,
        searchAlwaysOpen: !args.serverPagination,
        sort: !args.serverPagination,
        setRowProps: (rowData: string[], dataIndex: number) => {
            const onDoubleClick = {
                onDoubleClick: () => {
                    if (args.showEditDialog) args.showEditDialog(rowData[0]);
                    return null;
                },
            };
            if (args.data && args.data[dataIndex] && args.data[dataIndex]['IsDeleted']) {
                return { ...onDoubleClick, style: { background: 'rgba(255, 0, 0, 0.05)' } };
            }
            return onDoubleClick;
        },
    };

    //@ts-ignore
    options.customFooter = (count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels) =>
        datatableFooter(count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels, args.customFooter);

    if (args.serverPagination) {
        //@ts-ignore
        options.onTableChange = (action: any, tableState: any) => {
            if (action === 'changePage') {
                args.changePage && args.changePage(tableState.page);
            }
        };
    } else {
        //@ts-ignore
        options.customSearchRender = customSearchRender;
    }

    return options;
};

interface IGetMUIDatatableColumns {
    columns: any;
    showEditDialog?: (id?: string) => void;
    listActionClass?: string;
    idColumnName?: string;
    listData?: any;
    showDeleteDialog?: (id: string) => void;
    titleColumnName?: string;
}

export const getMUIDatatableColumns = (args: IGetMUIDatatableColumns) => {
    const { columns, listData, showEditDialog, showDeleteDialog, listActionClass, idColumnName } = args;
    return showEditDialog
        ? [
              ...columns,
              {
                  name: idColumnName ? idColumnName : 'Id',
                  label: ' ',
                  options: {
                      filter: false,
                      searchable: false,
                      sort: false,
                      viewColumns: false,
                      setCellProps: () => ({ style: { width: 50, padding: '8px 8px' } }),
                      customBodyRender: (value: string) => {
                          const currentRow = listData ? listData.find((row: any) => row[idColumnName ? idColumnName : 'Id'] === value) : undefined;
                          return (
                              <Box
                                  sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                  }}
                              >
                                  <Tooltip title="Редактировать">
                                      <IconButton onClick={() => showEditDialog(value)}>
                                          <EditIcon sx={{ color: '#144678' }} />
                                      </IconButton>
                                  </Tooltip>
                                  {showDeleteDialog && (
                                      <Tooltip title={currentRow.IsDeleted ? 'Снять пометку на удаление' : 'Пометить на удаление'}>
                                          <IconButton onClick={() => showDeleteDialog(value)}>
                                              <DeleteForeverIcon sx={{ color: currentRow.IsDeleted ? '#FF7070 !important' : '#ddd !important' }} />
                                          </IconButton>
                                      </Tooltip>
                                  )}
                              </Box>
                          );
                      },
                  },
              },
          ]
        : [...columns];
};

export const booleanCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => {
    if (value) return <DeleteForeverIcon sx={{ color: '#FF7070 !important' }} />;
};

export const booleanFilterOptions = {
    names: ['Да', 'Нет'],
    logic: (value: boolean, filterVal: string) => {
        return (!value && filterVal == 'Да') || (value && filterVal == 'Нет');
    },
};

export const checkBooleanCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => {
    if (value) return <CheckIcon />;
};

export const colorCustomBodyRender = (value: any, tableMeta: any, updateValue: any) => {
    if (value) return <ColorLensIcon sx={{ color: `#${value}` }} />;
};

export const getSortOrder = (columns: any[]) => {
    const sortColumn = columns.find((item) => item.options && item.options.sortDefault);
    if (sortColumn) {
        return { name: sortColumn.name, direction: sortColumn.options.sortDefault };
    }
    return { name: 'Name', direction: 'asc' };
};
