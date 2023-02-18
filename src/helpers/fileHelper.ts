export interface IFileList {
    FileId: string;
    FileTypeCode: string;
}
export interface IFileData {
    Id: string;
    Name?: string;
    Description?: string;
    Data?: string;
    DocumentTypeId?: string;
    UserId?: string;
    UserName?: string;
    CreateDate: string;
}

const maxFileSizeMb = 10;
const maxFileSize = maxFileSizeMb * 1024 * 1024; // 10MB;
export const getFileSizeMsgText = (extensions: string[]) => {
    return `Загружаемые файлы должны быть в формате ${extensions.map((item) => '.' + item).join(', ')} и не более ${maxFileSizeMb} Мбайт.`;
};
const FILE_EXTENSIONS = ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx', 'html'];
const SIGN_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg'];

export const checkFileSize = (item: any, showAlert?: (message: string) => void) => {
    if ((item.file && (isNaN(item.file.size) || item.file.size > maxFileSize)) || !checkFileExtension(item.name, item.isSignFile)) {
        const errorText = getFileSizeMsgText(item.isSignFile ? SIGN_FILE_EXTENSIONS : FILE_EXTENSIONS);
        if (typeof showAlert === 'function') showAlert(errorText);
        else alert(errorText);
        return false;
    }
    return true;
};

export const checkFileExtension = (fileName: string, isSignFile: boolean) => {
    const extensions = isSignFile ? SIGN_FILE_EXTENSIONS : FILE_EXTENSIONS;
    const fileNames = fileName.split('.');
    return fileNames && fileNames.length > 0 ? extensions.indexOf(fileNames[fileNames.length - 1].toLowerCase()) !== -1 : false;
};

export const getFileIconType = (fileName: string) => {
    if (!fileName) return '';
    if (
        fileName.toLowerCase().indexOf('.jpg') + 1 ||
        fileName.toLowerCase().indexOf('.jpeg') + 1 ||
        fileName.toLowerCase().indexOf('.png') + 1 ||
        fileName.toLowerCase().indexOf('.gif') + 1
    ) {
        return 'image';
    } else if (fileName.toLowerCase().indexOf('.doc') + 1 || fileName.toLowerCase().indexOf('.txt') + 1) {
        return 'word';
    } else if (fileName.toLowerCase().indexOf('.pdf') + 1) {
        return 'pdf';
    } else if (fileName.toLowerCase().indexOf('.html') + 1) {
        return 'code';
    } else {
        return 'alternate';
    }
};

export const base64toBlob = (base64Data: any, contentType = '') => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        const begin = sliceIndex * sliceSize;
        const end = Math.min(begin + sliceSize, bytesLength);

        const bytes = new Array(end - begin);
        for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
};

export const downloadReportFile = (data: any, fileName: string) => {
    const byteCharacters = window.atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return saveFile(byteArray, fileName, 'application/octet-stream');
};

export const saveFile = (data: any, file: any, data_type: any) => {
    const textToSaveAsBlob = new Blob([data], { type: data_type });
    const downloadLink = document.createElement('a');
    downloadLink.download = file;
    downloadLink.innerHTML = 'Download File';
    downloadLink.href = window.URL.createObjectURL(textToSaveAsBlob);
    downloadLink.onclick = (event) => {
        // @ts-ignore
        document.body.removeChild(event?.target);
    };
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
};

export const downloadFileByUrl = (url: string, fileName: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.innerHTML = fileName;
    downloadLink.href = url;
    downloadLink.onclick = (event) => {
        // @ts-ignore
        document.body.removeChild(event?.target);
    };
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
};
