import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import Box from '@mui/material/Box';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import IconButton from '@mui/material/IconButton';

import useClickOutside from './useClickOutside';
import { useColorPickerStyles } from './styles';

interface IColorPicker {
    color: string;
    onChange: (newColor: string) => void;
}

const ColorPicker = ({ color, onChange }: IColorPicker) => {
    const popover = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isOpen, toggle] = useState(false);

    const classes = useColorPickerStyles();

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <Box className={classes.container}>
            {isOpen ? (
                <Box className={classes.picker} ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </Box>
            ) : (
                <IconButton onClick={() => toggle(true)}>
                    <ColorLensIcon style={{ color: color }} />
                </IconButton>
            )}
        </Box>
    );
};

export default ColorPicker;

