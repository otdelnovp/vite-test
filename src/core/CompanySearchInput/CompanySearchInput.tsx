import React, { useEffect, useState } from 'react';
import MaskedTextField from "./MaskedTextField"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { useDebounce } from '@helpers/methods';
import { getCompanySearchDadata, ICompanyType, ICompanyDadataType, prepareCompanyData } from './methods';
import { useCompanySearchInputStyles } from './styles';


interface IOnChangeParams {
    target: {
        name: string;
        value: ICompanyType;
    }
}
interface ICompanySearchInput {
    name: string;
    noOptionsText: string;
    loadingText?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | boolean | null;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange: (params: IOnChangeParams) => void;
    delay?: number;
    inputType?: string;
    required?: boolean;
    error?: boolean;
}


export const CompanySearchInput: React.FC<ICompanySearchInput> = ({
    name,
    label,
    noOptionsText,
    placeholder,
    variant = 'filled',
    defaultValue,
    onChange,
    delay,
    loadingText,
    inputType = "name",
    required = false,
    error = false
}) => {
    const classes = useCompanySearchInputStyles();

    const [value, setValue] = useState<ICompanyDadataType | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<ICompanyDadataType[]>([]);

    const searchCompany = useDebounce(inputValue, delay || 500);

    useEffect(() => {
        if (!searchCompany || searchCompany === defaultValue) {
            setOptions(value ? [value] : [])
            return;
        }
        console.log("loading...")
        setLoading(true)
        getCompanySearchDadata(searchCompany, {
            onSuccess: onSearchSuccess,
            onError: onSearchError,
        }, inputType);
        
    }, [searchCompany]);

    const onSearchSuccess = (result: ICompanyDadataType[]) => {
        setOptions(result)
        setLoading(false)
    };

    const onSearchError = (error: any) => {
        setLoading(false)
    };

    useEffect(() => {
        if (!!defaultValue && typeof defaultValue === 'string')
            setValue({
                value: defaultValue,
                unrestricted_value: defaultValue,
            })
    }, [defaultValue]);

    return (
        <Box className={classes.wrapper}>
            <Autocomplete
                className={classes.input}
                id={name}
                value={value}
                getOptionLabel={(option) => {
                    return option.value
                }}
                renderOption={(props, option) => {
                    if (option.data) {
                        return <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.data.inn}>
                            {`${option.data.name.short_with_opf} (ИНН: ${option.data.inn}, КПП: ${option.data.kpp})`}
                        </Box>
                    } else {
                        return option.value
                    }
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                options={options}
                filterOptions={(options) => options}
                placeholder={placeholder}
                noOptionsText={loading ? loadingText : noOptionsText || 'No options'}
                onChange={(event: any, newValue: ICompanyDadataType | null) => {
                    const newInputValue = (newValue && newValue?.data)
                        ? (inputType === "inn"
                            ? newValue?.data.inn
                            : newValue?.data.name.short_with_opf)
                        : inputValue

                    setOptions(options)
                    setValue(newValue)
                    setInputValue(newInputValue)
                    onChange && onChange({ target: { value: prepareCompanyData(newValue), name: name } });
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue)
                }}
                renderInput={(params) => {
                    return inputType === 'name' ? <TextField
                        {...params}
                        label={label}
                        variant={variant}
                        fullWidth
                        required={required}
                        error={error}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                        autoFocus
                    /> : <MaskedTextField
                        textFieldParams={params}
                        autocompleteValue={value}
                        label={label}
                        variant={variant}
                        fullWidth
                        InputProps={params.InputProps}
                        autoFocus
                    />
                }}
            />
        </Box >
    );
};
