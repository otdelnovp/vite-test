import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';
// @ts-ignore
import FileBase64 from 'react-file-base64';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import { DocView } from './DocView';

import { getGuid } from '@helpers/methods';
import { checkFileSize, IFileData } from '@helpers/fileHelper';
import { IDocumentTypeDictOption } from '@helpers/dictionariesHelper';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { getFile, saveFile, deleteFile, resetFile, fileSelector } from '@services/fileService';

import { useDocsDictUploaderStyles } from './styles';

export interface IDocsUploader {
    fileList: IFileData[] | null;
    onDelete: (fileId: string) => void;
    onSave: (newFileId: string) => void;
    onlyViewMode?: boolean;
}

const DocsUploader = ({ file, fileList, onDelete, onSave, onlyViewMode }: DocsUploaderReduxProps) => {
    const classes = useDocsDictUploaderStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [docViewId, setDocViewId] = useState('');

    const onGetFile = (fileId: string) => dispatch(getFile(fileId));
    const onResetFile = () => {
        dispatch(resetFile());
        setDocViewId('');
    };
    const onDeleteFile = (fileId: string) => {
        dispatch(deleteFile(fileId));
        onDelete(fileId);
        if (file) onResetFile();
    };

    const uploadMainFile = (file: any) => {
        if (checkFileSize(file)) {
            const newFile = {
                Id: getGuid(),
                Description: file.name,
                Name: file.name,
                Data: file.base64.split(',')[1],
            };
            dispatch(
                saveFile(newFile, {
                    onSuccess: () => onSave(newFile.Id),
                }),
            );
        }
    };

    const getFileTemplate = (file: IFileData) => {
        const fileName = (!!file.Description && file.Description) || (!!file.Name && file.Name) || 'без названия';
        const isPdfFile = fileName.split('.').find((item: string) => item.toLowerCase() === 'pdf');
        return (
            <Box className={classes.doc} key={file.Id}>
                <Box
                    className={clsx(classes.link, classes.uploaded)}
                    onClick={() => {
                        onGetFile(file.Id);
                        setDocViewId(file.Id);
                    }}
                >
                    <Box className={classes.icon}>{isPdfFile ? <PictureAsPdfIcon /> : <ImageIcon />}</Box>
                    <Box className={classes.label}>{fileName}</Box>
                </Box>
                {!onlyViewMode ? (
                    <Box className={classes.delete} title="Удалить" onClick={() => onDeleteFile(file.Id)}>
                        <DeleteIcon />
                    </Box>
                ) : null}
            </Box>
        );
    };

    const getFileUploader = () => {
        return !onlyViewMode ? (
            <Box className={classes.upload}>
                <Button variant="outlined" size="small" startIcon={<AttachFileIcon />}>
                    Загрузить файл
                </Button>
                <FileBase64 multiple={false} onDone={uploadMainFile} />
            </Box>
        ) : null;
    };

    const createDocsList = () => {
        return <Box className={classes.list}>{fileList?.length ? fileList.map((fileItem) => getFileTemplate(fileItem)) : null}</Box>;
    };

    const createDocView = () => {
        return docViewId ? (
            <DocView
                fileData={file}
                onDelete={() => onDeleteFile(docViewId)}
                onClose={() => {
                    setDocViewId('');
                    onResetFile();
                }}
                onlyViewMode={onlyViewMode}
            />
        ) : null;
    };

    return (
        <Box>
            {createDocsList()}
            {getFileUploader()}
            {createDocView()}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { files, file } = fileSelector(state);
    return { user, files, file };
};

const connector = connect(mapStateToProps);
type DocsUploaderReduxProps = ConnectedProps<typeof connector> & IDocsUploader;

export default compose(connector)(DocsUploader);
