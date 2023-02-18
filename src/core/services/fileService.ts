import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';

interface IUserSlice {
    isLoadingFiles: boolean;
    files: [] | null;
    file: any | null;
}

const initialState: IUserSlice = {
    isLoadingFiles: false,
    files: null,
    file: null,
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        resetFiles: (state) => {
            state.files = null;
        },
        resetFile: (state) => {
            state.file = null;
        },

        getInfoFilesRequest: (state) => {
            state.isLoadingFiles = true;
            state.files = null;
        },
        getInfoFilesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoadingFiles = false;
            state.files = action.payload?.result;
        },
        getInfoFilesFailure: (state) => {
            state.isLoadingFiles = false;
        },

        getFileRequest: (state) => {
            state.isLoadingFiles = true;
            state.file = null;
        },
        getFileSuccess: (state, action: PayloadAction<any>) => {
            state.isLoadingFiles = false;
            // state.file = { ...action.payload?.result?.Info, Data: action.payload?.result };
            state.file = action.payload?.result;
        },
        getFileFailure: (state) => {
            state.isLoadingFiles = false;
        },

        saveFileRequest: (state) => {
            state.isLoadingFiles = true;
        },
        saveFileSuccess: (state) => {
            state.isLoadingFiles = false;
        },
        saveFileFailure: (state) => {
            state.isLoadingFiles = false;
        },

        deleteFileRequest: (state) => {
            state.isLoadingFiles = true;
        },
        deleteFileSuccess: (state) => {
            state.isLoadingFiles = false;
        },
        deleteFileFailure: (state) => {
            state.isLoadingFiles = false;
        },
    },
});

const { reducer, actions } = fileSlice;

export const {
    resetFiles,
    resetFile,

    getInfoFilesRequest,
    getInfoFilesSuccess,
    getInfoFilesFailure,

    getFileRequest,
    getFileSuccess,
    getFileFailure,

    saveFileRequest,
    saveFileSuccess,
    saveFileFailure,

    deleteFileRequest,
    deleteFileSuccess,
    deleteFileFailure,
} = actions;

export const fileSelector = (state: RootState) => {
    const { isLoadingFiles, files, file } = state.file;
    return {
        isLoadingFiles,
        files,
        file,
    };
};

export const getInfoFiles = (fileIds: string[], options?: IAsyncOptions) => {
    const requestBody = {
        type: 'File.Info',
        body: {
            Files: fileIds?.length ? fileIds : [],
        },
    };
    const actionTypes = {
        request: getInfoFilesRequest,
        success: getInfoFilesSuccess,
        failure: getInfoFilesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getFile = (fileId: string, options?: IAsyncOptions) => {
    // const requestBody = {
    //     type: 'System.Batch',
    //     body: {
    //         Id: fileId,
    //         CALL: [
    //             {
    //                 type: 'System.Transform',
    //                 pattern: { Files: ['body.Id'] },
    //                 variables: { Files: 'body.Files' },
    //             },
    //             { type: 'File.Info', label: 'Info', attribute: 'body[0]' },
    //             { type: 'File.Load', label: 'Data', attribute: 'body.Data' },
    //         ],
    //     },
    // };
    const requestBody = {
        type: 'File.Load',
        body: {
            Id: fileId,
        },
    };
    const actionTypes = {
        request: getFileRequest,
        success: getFileSuccess,
        failure: getFileFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const saveFile = (fileData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'File.Save',
        body: fileData,
    };
    const actionTypes = {
        request: saveFileRequest,
        success: saveFileSuccess,
        failure: saveFileFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const deleteFile = (fileId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'File.Delete',
        body: {
            Id: fileId,
        },
    };
    const actionTypes = {
        request: deleteFileRequest,
        success: deleteFileSuccess,
        failure: deleteFileFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
