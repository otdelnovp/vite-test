import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';
// @ts-ignore
import FileBase64 from 'react-file-base64';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { DocView } from './DocView';

import { getGuid } from '@helpers/methods';
import { IFileList, checkFileSize } from '@helpers/fileHelper';
import { dictionaries, IDocumentTypeDictOption } from '@helpers/dictionariesHelper';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import {
    getInfoFiles,
    getFile,
    saveFile,
    deleteFile,
    resetFiles,
    resetFile,
    fileSelector,
} from '@services/fileService';

import { useDocsDictUploaderStyles } from './styles';

export interface IDocsDictUploader {
    filesList?: IFileList[] | null;
    objectTypeFilter?: string;
    onDelete: (fileId: string) => void;
    onSave: (newFile: IFileList) => void;
    onlyViewMode?: boolean;
}

const DocsDictUploader = ({
    //user,
    files,
    file,
    filesList,
    objectTypeFilter,
    onDelete,
    onSave,
    onlyViewMode,
}: DocsDictUploaderReduxProps) => {
    const classes = useDocsDictUploaderStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [docViewId, setDocViewId] = useState('');
    const [uploadingFile, setUploadingFile] = useState({} as IDocumentTypeDictOption);

    const onGetInfoFiles = (fileIds: string[]) => dispatch(getInfoFiles(fileIds));
    const onResetFiles = () => dispatch(resetFiles());

    const onGetFile = (fileId: string) => dispatch(getFile(fileId));
    const onResetFile = () => {
        dispatch(resetFile());
        setDocViewId('');
    };
    const onDeleteFile = (fileId: string) =>
        dispatch(
            deleteFile(fileId, {
                onSuccess: () => {
                    onDelete(fileId);
                    if (file) onResetFile();
                },
            }),
        );

    React.useEffect(() => {
        if (filesList?.length) onGetInfoFiles(filesList.map((item) => item.FileId));
    }, [filesList]);

    React.useEffect(() => {
        return () => {
            onResetFiles();
        };
    }, []);

    const uploadMainFile = (file: any) => {
        if (checkFileSize(file)) {
            const newFile = {
                Id: getGuid(),
                Description: uploadingFile.Name,
                Name: file.name,
                Data: file.base64.split(',')[1],
            };
            dispatch(
                saveFile(newFile, {
                    onSuccess: () => onSave({ FileId: newFile.Id, FileTypeCode: uploadingFile.Code }),
                }),
            );
        }
    };

    const getDocumentFileTemplate = (file: any, templateData: IDocumentTypeDictOption) => {
        const fileName =
            (!!file.Description && file.Description) ||
            (!!file.FileName && file.FileName) ||
            (!!file.Name && file.Name) ||
            'без названия';
        const fileCaption = templateData?.Name || fileName;
        const isPdfFile = fileName.split('.').find((item: string) => item.toLowerCase() === 'pdf');
        return (
            <Box className={classes.doc} key={file.FileId}>
                <Box
                    className={clsx(classes.link, classes.uploaded)}
                    onClick={() => {
                        onGetFile(file.FileId);
                        setDocViewId(file.FileId);
                    }}
                >
                    <Box className={classes.icon}>{isPdfFile ? <PictureAsPdfIcon /> : <ImageIcon />}</Box>
                    <Box className={classes.label}>{fileCaption}</Box>
                </Box>
                {!onlyViewMode ? (
                    <Box className={classes.delete} title="Удалить" onClick={() => onDeleteFile(file.FileId)}>
                        <DeleteIcon />
                    </Box>
                ) : null}
            </Box>
        );
    };

    const getDocumentTemplate = (templateData: IDocumentTypeDictOption) => {
        const fileUploader = !onlyViewMode ? <FileBase64 multiple={false} onDone={uploadMainFile} /> : null;
        return (
            <Box className={classes.doc} key={templateData.Code}>
                <Box
                    className={clsx(classes.link, {
                        [classes.onlyView]: onlyViewMode,
                    })}
                    onClick={() => setUploadingFile(templateData)}
                >
                    <Box className={classes.icon}>
                        <ImageIcon />
                    </Box>
                    <Box className={classes.label}>{templateData.Name}</Box>
                    {fileUploader}
                </Box>
            </Box>
        );
    };

    const getActualDocumentTypes = () => {
        if (objectTypeFilter) {
            return dictionaries.documentTypes.filter((itemType) => itemType.ObjectTypeCode === objectTypeFilter);
        } else return dictionaries.documentTypes;
    };

    const createDocsList = () => {
        const actualDocumentTypes = getActualDocumentTypes();
        return (
            <Box className={classes.list}>
                {actualDocumentTypes?.length &&
                    actualDocumentTypes.map((itemType) => {
                        const currentFileId =
                            (filesList?.length && filesList.find((file: any) => file.FileTypeCode === itemType.Code)) ||
                            false;
                        const currentFile =
                            (!!currentFileId &&
                                files?.length &&
                                files.find((file: any) => file.FileId === currentFileId?.FileId)) ||
                            false;
                        return currentFile
                            ? getDocumentFileTemplate(currentFile, itemType)
                            : getDocumentTemplate(itemType);
                    })}
            </Box>
        );
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
type DocsDictUploaderReduxProps = ConnectedProps<typeof connector> & IDocsDictUploader;

export default compose(connector)(DocsDictUploader);
