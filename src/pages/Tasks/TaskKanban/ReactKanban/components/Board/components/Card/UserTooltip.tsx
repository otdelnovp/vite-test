import React from "react";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from '@mui/material/styles';

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[15],
        borderRadius: theme.spacing(1),
        maxWidth: 'none',
        padding: theme.spacing(2),
        fontSize: '1em',
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.background.paper,
    },
  }));