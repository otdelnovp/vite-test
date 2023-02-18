import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';

interface IGetMUIDatatableColumnsDeleteEdit {
    (columns: any,
        deleteRow: (arg0: string) => void,
        listActionClass: string | undefined,
        idColumnName?: string | undefined,
        moveRow?: (arg0: string, direction: string) => void
    ): any[]
}

export const getMUIDatatableColumnsDeleteEdit: IGetMUIDatatableColumnsDeleteEdit = (columns, deleteRow, listActionClass, idColumnName, moveRow) => {
    return [
        ...columns,
        {
            name: idColumnName ? idColumnName : 'Id',
            label: ' ',
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                setCellProps: () => ({ style: { width: 50 } }),
                customBodyRender: (value: string) => {
                    return <Box sx={{ display: 'flex', flexDiection: 'row' }} >
                        <Tooltip title="Удалить">
                            <ClearIcon sx={{ color: '#aa0000' }} onClick={() => deleteRow(value)} className={listActionClass} />
                        </Tooltip>
                        {moveRow && <Tooltip title="Вверх">
                            <ArrowUpwardIcon onClick={() => moveRow(value, "up")} className={listActionClass} />
                        </Tooltip>}
                        {moveRow && <Tooltip title="Вниз">
                            <ArrowDownwardIcon onClick={() => moveRow(value, "down")} className={listActionClass} />
                        </Tooltip>}
                    </Box >
                }
            },
        },
    ];
};