import { IAsyncDictionaries } from '@helpers/dictionariesHelper';

export interface ISelectProps {
    idField?: string;
    valueField?: string;
    textField?: string;
    options?: Array<any>;
    groupBy?: (option: any) => string;
    sortFunc?: (a: any, b: any) => number;
    onError?: (event: any) => void;
    noOptionsText?: string;
    limitTags?: number;
    defaultGroup?: boolean;
    formHelperText?: string;
    freeSolo?: boolean;
}

export const prepareOptionsForInput = (
    options?: Array<IAsyncDictionaries>,
    selectProps?: ISelectProps,
    fakeOption?: any,
) =>
    !options?.length
        ? [fakeOption]
        : !selectProps
        ? options
        : options.map((option) => ({
              // @ts-ignore
              id: option[selectProps?.valueField],
              // @ts-ignore
              value: option[selectProps?.valueField],
              // @ts-ignore
              text: option[selectProps?.textField],
          }));
