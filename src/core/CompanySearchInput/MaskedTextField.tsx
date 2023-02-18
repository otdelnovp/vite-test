import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IInputMask {
    textFieldParams: any;
    autocompleteValue: any;
    label: string | undefined;
    variant: "standard" | "filled" | "outlined" | undefined;
    fullWidth: boolean;
    InputProps: any;
    autoFocus: boolean;
}

const MaskedTextField = ({ textFieldParams, autocompleteValue, label, variant, fullWidth, InputProps, autoFocus }: IInputMask) => {
    const [card, setCard] = useState("");

    const handleChange = (e: any) => {
        const numeric = e.target.value.replace(/\D/g, '').slice(0, 10)
        setCard(numeric);
        textFieldParams.inputProps.onChange(e)
    };

    const handleFocus = (e: any) => {
        textFieldParams.inputProps.onFocus(e)
    }

    useEffect(() => {
        if (autocompleteValue && autocompleteValue.inputValue) {
            setCard(autocompleteValue.inputValue);
        } else if (autocompleteValue && !autocompleteValue.value) {
            setCard("")
        }
    }, [autocompleteValue])

    return (
        <TextField
            inputProps={{
                ref: textFieldParams.inputProps.ref,
                value: textFieldParams.inputProps.value
            }}
            id={textFieldParams.id}
            label={label}
            variant={variant}
            fullWidth={fullWidth}
            autoFocus={autoFocus}
            InputProps={InputProps}
            onFocus={handleFocus}
            onMouseDown={textFieldParams.inputProps.onMouseDown}
            onBlur={textFieldParams.inputProps.onBlur}
            onChange={handleChange}
            value={card} />
    );
};

export default MaskedTextField;