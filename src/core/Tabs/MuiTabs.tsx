import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { IMuiTab, muiTabProps } from './methods';
import { SxProps } from '@mui/material';

interface MuiTabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export const MuiTabPanel = ({ children, value, index, ...other }: MuiTabPanelProps) => (
    <div role="tabpanel" hidden={value !== index} id={`tabPanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
        {value === index && children}
    </div>
);

interface MuiTabsProps {
    list: IMuiTab[];
    gutterBottom?: boolean;
    externalTabControl?: boolean;
    extTabValue?: number;
    setExtTabValue?: (currentTab: number) => void;
}
export const MuiTabs = ({ list, gutterBottom, externalTabControl, extTabValue, setExtTabValue }: MuiTabsProps) => {
    const [taskTabValue, setTaskTabValue] = React.useState(0);

    const handleTaskTabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        if (externalTabControl) {
            setExtTabValue && setExtTabValue(newTabValue)
        } else {
            setTaskTabValue(newTabValue);
        }
    };

    return (
        <React.Fragment>
            <Tabs sx={gutterBottom ? { marginBottom: 2 } : undefined} value={externalTabControl ? extTabValue : taskTabValue} onChange={handleTaskTabChange}>
                {list.map((tab: IMuiTab) => (
                    <Tab key={tab.index} label={tab.label} {...muiTabProps(tab.index)} />
                ))}
            </Tabs>
            {list.map((tab: IMuiTab) => (
                <MuiTabPanel key={tab.index} value={externalTabControl ? extTabValue || 0 : taskTabValue} index={tab.index}>
                    {tab.children}
                </MuiTabPanel>
            ))}
        </React.Fragment>
    );
};
