export interface ITab {
    value: string;
    title: string;
}

export interface IMuiTab {
    index: number;
    label: string;
    children: React.ReactNode;
}

export const muiTabProps = (index: number) => ({
    id: `tab-${index}`,
    'aria-controls': `tabPanel-${index}`,
});
