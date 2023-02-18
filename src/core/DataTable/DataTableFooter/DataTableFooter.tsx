import React, { useState } from 'react';

import { Box, Button, IconButton, TableCell, TableFooter, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


import { sx } from './styles';

interface IDataTableFooterProps {
    count: number;
    page: number;
    rowsPerPage: number;
    changeRowsPerPage: (numberOfRows: number) => void;
    changePage: (currentPage: number) => void;
    textLabels: any;
    customFooter: JSX.Element | undefined;
}

const DataTableFooter = ({ count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels, customFooter }: IDataTableFooterProps) => {

    const [localPage, setLocalPage] = useState(page + 1)
    const maxPage = Math.ceil(count / rowsPerPage)

    const handlePageChange = (page: number) => {
        changePage(page);
    };

    const goPrevPage = () => {
        if (localPage > 1) {
            setLocalPage(localPage - 1)
            changePage(localPage - 2);
        }
    }

    const goNextPage = () => {
        if (localPage < maxPage) {
            setLocalPage(localPage + 1)
            changePage(localPage);
        }
    }

    return (
        <TableFooter>
            <TableRow>
                <TableCell sx={sx.cell} colSpan={1000}>
                    {customFooter}
                    <Box sx={sx.container}>
                        <Typography sx={sx.text}>
                            Страница
                        </Typography>
                        <TextField
                            type="number"
                            sx={sx.pageNumber}
                            id="page"
                            value={localPage}
                            onChange={(e: any) => { setLocalPage(parseInt(e.target.value)) }}
                            onBlur={(e: any) => {
                                if (localPage != page + 1) {
                                    handlePageChange(localPage - 1)
                                }
                            }}
                            inputProps={{
                                min: 1, max: maxPage,
                                onKeyPress: (e) => {
                                    if (e.code == 'Enter') {
                                        handlePageChange(localPage - 1)
                                    }
                                }
                            }}
                            disabled={maxPage == 1}
                        />
                        <Typography sx={sx.text}>
                            из {maxPage}
                        </Typography>
                        <Tooltip title="Предыдущая страница">
                            <IconButton
                                aria-label="prev-week"
                                onClick={goPrevPage}
                                disabled={localPage == 1}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Следующая страница">
                            <IconButton
                                aria-label="next-week"
                                onClick={goNextPage}
                                disabled={localPage == maxPage}>
                                <ChevronRightIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </TableCell>
            </TableRow>
        </TableFooter>
    );

};

export default DataTableFooter;

