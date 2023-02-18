import { IFormField } from '@core/UniversalForm/models';
import { IDictionary, dictionariesConfig } from '@pages/Dictionary/dictionariesConfig';

export const isRequired = (model: IFormField[], fieldName: string): boolean => {
    const fieldModel = model.find((item) => item.name === fieldName);
    return fieldModel ? (fieldModel.config.required ? fieldModel.config.required : false) : false;
};

export const idFieldName = (dictionaryName: string) => {
    const dictConfigArray = dictionariesConfigArray();
    const dictConfig = dictConfigArray.find((item) => item.name === dictionaryName);
    return dictConfig ? dictConfig.idField : 'Id';
};

export const dictionariesConfigArray = () => {
    let newArray: IDictionary[] = [];
    dictionariesConfig.forEach((item) => {
        newArray = [...newArray, ...item.dictionaries];
    });
    return newArray;
};

