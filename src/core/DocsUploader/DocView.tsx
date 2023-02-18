import React, { ComponentClass } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';

import { Loader } from '@core/Loader/Loader';

import { base64toBlob } from '@helpers/fileHelper';

import { useDocViewStyles } from './styles';

declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean;
    }
}

export interface IDocView {
    fileData: any;
    onDelete: () => void;
    onClose: () => void;
    onlyViewMode?: boolean;
}

export const DocView = ({ fileData, onDelete, onClose, onlyViewMode }: IDocView) => {
    const classes = useDocViewStyles();

    const downloadFile = () => {
        if (navigator.msSaveBlob) {
            // IE 10+
            const blobResult = base64toBlob(
                fileData.Data,
                fileData.Name.indexOf('.pdf') + 1
                    ? 'data:application/pdf;base64,'
                    : fileData.Name.indexOf('.png') + 1
                    ? 'data:image/png;base64,'
                    : 'data:image/jpeg;base64,',
            );
            navigator.msSaveBlob(blobResult, fileData.Name);
        } else {
            const data =
                (fileData.Name.indexOf('.pdf') + 1
                    ? 'data:application/pdf;base64,'
                    : fileData.Name.indexOf('.png') + 1
                    ? 'data:image/png;base64,'
                    : 'data:image/jpeg;base64,') + fileData.Data;
            const img = document.createElement('img');
            img.src = data;
            const a = document.createElement('a');
            a.setAttribute('download', fileData.Name);
            a.setAttribute('href', data);
            a.appendChild(img);
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const getFileView = () => {
        const fileName = fileData?.Name ? fileData.Name.toLowerCase() : '';
        if (fileName) {
            return fileName.indexOf('.png') + 1 ? (
                <Box className={classes.content}>
                    <img src={'data:image/png;base64,' + fileData.Data} />
                </Box>
            ) : fileName.indexOf('.jpg') + 1 || fileName.indexOf('.jpeg') + 1 ? (
                <Box className={classes.content}>
                    <img src={'data:image/jpeg;base64,' + fileData.Data} />
                </Box>
            ) : fileName.indexOf('.pdf') ? (
                <Box className={classes.content}>
                    <iframe src={'data:application/pdf;base64,' + fileData.Data} />
                </Box>
            ) : null;
        }
        return null;
    };

    const docViewBody = (
        <Box className={classes.view}>
            <Box className={classes.header}>
                {fileData ? (
                    <Box className={classes.wrapper}>
                        <Box className={classes.title}>{fileData.Description || fileData.Name || 'без названия'}</Box>
                        <Box className={classes.tools}>
                            <Tooltip title="Скачать документ">
                                <GetAppIcon onClick={downloadFile} />
                            </Tooltip>
                            {!onlyViewMode ? (
                                <Tooltip title="Удалить документ">
                                    <DeleteIcon onClick={onDelete} />
                                </Tooltip>
                            ) : null}
                            <Tooltip title="Закрыть окно">
                                <CloseIcon fontSize="large" onClick={onClose} />
                            </Tooltip>
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Loader />
                    </Box>
                )}
            </Box>
            {getFileView()}
        </Box>
    );

    return (
        <Dialog open={true} onClose={onClose} fullScreen={true} PaperComponent={Box} maxWidth={false}>
            {docViewBody}
        </Dialog>
    );
};
