import MuiCssBaseline from './MuiCssBaseline';
import MuiSvgIcon from './MuiSvgIcon';
import MuiTypography from './MuiTypography';
import MuiAppBar from './MuiAppBar';
import MuiSwitch from './MuiSwitch';
import MuiContainer from './MuiContainer';
import MuiDivider from './MuiDivider';
import MuiPaper from './MuiPaper';
import MuiButton from './MuiButton';
import MuiIconButton from './MuiIconButton';
import MuiToolbar from './MuiToolbar';
import { MuiDialogTitle, MuiDialogContent, MuiDialogActions } from './MuiDialog';
import { MuiListItem, MuiListItemIcon } from './MuiList';
import { MuiSlider } from './MuiSlider';
import { MuiStep } from './MuiStep';
import { MuiRating } from './MuiRating';
import { MuiTab, MuiTabs } from './MuiTab';
import {
    MuiTable,
    MuiTableRow,
    MuiTableCell,
    MUIDataTable,
    MUIDataTableToolbar,
    MUIDataTableHeadCell,
    MUIDataTableBodyRow,
    MUIDataTableBodyCell,
    MUIDataTableFilter,
    MUIDataTableFilterList,
    MUIDataTableFooter,
} from './MuiTable';
import { MuiFormLabel, MuiInputLabel, MuiFilledInput, MuiOutlinedInput, MuiInputAdornment } from './MuiForm';

export default (darkMode?: boolean) => ({
    MuiCssBaseline: MuiCssBaseline(darkMode),

    MuiSvgIcon,
    MuiTypography,
    MuiAppBar,
    MuiSwitch,

    MuiContainer,
    MuiDivider: MuiDivider(darkMode),
    MuiPaper: MuiPaper(darkMode),
    MuiButton: MuiButton(darkMode),
    MuiIconButton: MuiIconButton(darkMode),
    MuiToolbar,

    MuiDialogTitle,
    MuiDialogContent,
    MuiDialogActions,

    MuiListItem,
    MuiListItemIcon,

    MuiSlider,
    MuiStep,
    MuiRating,

    MuiTab: MuiTab(darkMode),
    MuiTabs: MuiTabs(darkMode),

    MuiTable: MuiTable(darkMode),
    MuiTableRow: MuiTableRow(darkMode),
    MuiTableCell: MuiTableCell(darkMode),

    MUIDataTable: MUIDataTable(darkMode),
    MUIDataTableToolbar: MUIDataTableToolbar(darkMode),
    MUIDataTableHeadCell: MUIDataTableHeadCell(darkMode),
    MUIDataTableBodyRow: MUIDataTableBodyRow(darkMode),
    MUIDataTableBodyCell: MUIDataTableBodyCell(darkMode),
    MUIDataTableFilter: MUIDataTableFilter(darkMode),
    MUIDataTableFilterList: MUIDataTableFilterList(darkMode),
    MUIDataTableFooter: MUIDataTableFooter(darkMode),

    MuiFormLabel: MuiFormLabel(darkMode),
    MuiInputLabel: MuiInputLabel(darkMode),
    MuiFilledInput: MuiFilledInput(darkMode),
    MuiOutlinedInput: MuiOutlinedInput(darkMode),
    MuiInputAdornment: MuiInputAdornment(),
});

