import { ITaskData } from '@pages/Tasks/methods';

export const quillConfig = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
            // ['link', 'image', 'video'],
            ['clean'],
            [{ align: [] }],
        ],
    },
    clipboard: {
        matchVisual: false,
    },
};

export const prepareToSaveTask = (task: ITaskData) => {
    const resultTask = { ...task };
    return resultTask;
};

