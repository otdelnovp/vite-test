import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import RoomIcon from '@mui/icons-material/Room';

import { SelectOnMapDialog } from './SelectOnMapDialog';

import { useDebounce } from '@helpers/methods';

import { getAddressSearchDadata, IAddressDadataType, IAddressData, IAddressType, prepareAddressData } from './methods';

import { useAddressSearchInputStyles } from './styles';

interface IAddressSearchInput {
    name: string;
    noOptionsText: string;
    loadingText?: string;
    label?: string;
    placeholder?: string;
    defaultValue?: string | boolean | null;
    defaultPoint?: IAddressType;
    mapClickedValue?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    onChange?: (point: IAddressType | null, name?: string) => void;
    delay?: number;
    isSelectOnMap?: boolean;
}

export const AddressSearchInput: React.FC<IAddressSearchInput> = ({
    name,
    label,
    noOptionsText,
    placeholder,
    variant = 'filled',
    defaultValue,
    defaultPoint,
    mapClickedValue,
    onChange,
    delay,
    loadingText,
    isSelectOnMap,
}) => {
    const classes = useAddressSearchInputStyles();

    const [data, setData] = React.useState({
        value: null,
        inputValue: '',
        loading: false,
        options: [],
    } as IAddressData);

    const { value, loading, inputValue, options } = data;

    const searchAddress = useDebounce(inputValue, delay || 500);

    React.useEffect(() => {
        if (searchAddress === '') {
            setData({ ...data, options: value ? [value] : [] });
            return undefined;
        }
        setData({ ...data, loading: true });
        getAddressSearchDadata(searchAddress, {
            onSuccess: onSearchSuccess,
            onError: onSearchError,
        });
    }, [searchAddress]);

    const onSearchSuccess = (result: IAddressDadataType[]) => {
        setData({
            ...data,
            loading: false,
            options: result,
            value: {
                value: inputValue,
                unrestricted_value: inputValue,
            },
        });
    };

    const onSearchError = (error: any) => {
        console.log('error', error);
        setData({ ...data, loading: false });
    };

    React.useEffect(() => {
        if (!!defaultValue && typeof defaultValue === 'string')
            setData({
                ...data,
                value: {
                    value: defaultValue,
                    unrestricted_value: defaultValue,
                },
            });
    }, []);

    React.useEffect(() => {
        if (!!mapClickedValue && typeof mapClickedValue === 'string')
            setData({
                ...data,
                value: {
                    value: mapClickedValue,
                    unrestricted_value: mapClickedValue,
                },
            });
    }, [mapClickedValue]);

    const [selectOnMapDialogShow, toggleSelectOnMapDialog] = useState(false);

    return (
        <Box className={classes.wrapper}>
            <Autocomplete
                className={classes.input}
                id={name}
                value={value}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.value)}
                options={options}
                filterOptions={(options) => options}
                placeholder={placeholder}
                noOptionsText={loading ? loadingText : noOptionsText || 'No options'}
                onChange={(event: any, newValue: IAddressDadataType | null) => {
                    setData({
                        ...data,
                        options: newValue ? [newValue, ...options] : options,
                        value: newValue,
                    });
                    onChange && onChange(prepareAddressData(newValue), name);
                }}
                onInputChange={(event, newInputValue) => {
                    setData({ ...data, inputValue: newInputValue });
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        variant={variant}
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                        autoFocus
                    />
                )}
            />
            {isSelectOnMap && (
                <IconButton onClick={() => toggleSelectOnMapDialog(true)} aria-label="openMap" className={classes.button}>
                    <RoomIcon />
                </IconButton>
            )}
            {selectOnMapDialogShow && (
                <SelectOnMapDialog
                    addressData={inputValue}
                    editValue={defaultPoint}
                    handleClose={() => toggleSelectOnMapDialog(false)}
                    handleSubmit={(newAddressData: IAddressType) => {
                        if (newAddressData && typeof onChange === 'function') {
                            onChange(newAddressData, name);
                            setData({
                                ...data,
                                value: {
                                    value: newAddressData.PointAddress || '',
                                    unrestricted_value: newAddressData.PointAddress || '',
                                },
                            });
                            toggleSelectOnMapDialog(false);
                        }
                    }}
                />
            )}
        </Box>
    );
};
