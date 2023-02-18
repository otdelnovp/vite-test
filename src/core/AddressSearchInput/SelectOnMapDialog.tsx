import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import { AlertCollapse } from '@core/Alert/AlertCollapse';

import { AddressSearchInput } from '@core/AddressSearchInput/AddressSearchInput';
import UniversalInput from '@core/UniversalInput/UniversalInput';

import DefaultMap from '@core/Map/DefaultMap';

import { useUniversalInputStyles } from '@core/UniversalInput/styles';
import { IsMobile } from '@helpers/methods';
import { IAddressDadataType, getGeolocateSearchDadata, prepareAddressData, IAddressType, emptyAddressData } from '@core/AddressSearchInput/methods';

import { useAddressSearchInputStyles } from './styles';

export interface ISelectOnMapDialog {
    handleClose: () => void;
    handleSubmit: (data: any) => void;
    addressData?: string;
    isEditMode?: boolean;
    editValue?: IAddressType;
    addNumber?: number;
    mode?: 'Point' | 'Polygon' | 'Line';
}

export const SelectOnMapDialog = ({
    handleClose,
    handleSubmit,
    addressData,
    isEditMode = false,
    editValue = {} as IAddressType,
}: ISelectOnMapDialog) => {
    const classesSearch = useAddressSearchInputStyles();

    const [pointData, setPointData] = React.useState(editValue ? editValue : { ...emptyAddressData });
    const [error, setError] = React.useState(false);
    const [searchOn, setSearchOn] = React.useState(true);
    const classes = useUniversalInputStyles();

    const onAddressChange = (newAddressData: IAddressType | null) => {
        if (newAddressData) {
            setPointData({ ...newAddressData });
        }
    };

    const onAddressTextChange = (event: any) => {
        const { name, value } = event.target;
        const newPointData = { ...pointData, [name]: value };
        console.log(11111, event.target, pointData, newPointData);
        setPointData(newPointData);
    };

    const onSubmitForm = () => {
        if (!pointData.PointAddress || !pointData.Latitude) {
            setError(true);
        } else {
            handleSubmit(pointData);
        }
    };

    const onMapClick = (event: any) => {
        setSearchOn(false);
        setPointData({
            FIAS: null,
            Latitude: event.latlng.lat,
            Longitude: event.latlng.lng,
            PointAddress: pointData.PointAddress,
        });
        getGeolocateSearchDadata(event.latlng.lat, event.latlng.lng, {
            onSuccess: onGeolocateSearchSuccess,
        });
    };

    const [mapClickedValue, setMapClickedValue] = React.useState('');
    const onGeolocateSearchSuccess = (newDataDadata: IAddressDadataType[]) => {
        if (newDataDadata?.length) {
            setMapClickedValue(newDataDadata[0].value);
            const newPointData = prepareAddressData(newDataDadata[0]);
            setPointData({ ...newPointData });
        }
    };

    const setGeographyData = (newGeographyData: any) => {
        console.log(newGeographyData);
        //setPointData({ ...pointData, Geography: newGeographyData });
    };

    return (
        <Dialog open={true} fullScreen={IsMobile()} onClose={handleClose} fullWidth={true} maxWidth="md">
            <Box margin={1}>
                <DialogTitle id="form-dialog-title">Указать точку на карте</DialogTitle>
                <DialogContent>
                    <AlertCollapse
                        show={error}
                        useStyle={error}
                        severity={'error'}
                        onClose={() => setError(false)}
                        message="Введите адрес локации или укажите точку на карте"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box className={classesSearch.searchField}>
                                <Box className={classesSearch.searchInput}>
                                    {searchOn ? (
                                        <AddressSearchInput
                                            name="Address"
                                            label="Поиск по адресу"
                                            defaultValue={!isEditMode && addressData}
                                            mapClickedValue={mapClickedValue}
                                            onChange={onAddressChange}
                                            noOptionsText="Не найден адрес"
                                            loadingText="Загрузка..."
                                        />
                                    ) : (
                                        <UniversalInput
                                            name="PointAddress"
                                            label="Адрес"
                                            value={pointData.PointAddress}
                                            onChange={onAddressTextChange}
                                        />
                                    )}
                                </Box>
                                <Box className={classesSearch.searchMode}>
                                    <ToggleButtonGroup value={searchOn} exclusive onChange={() => setSearchOn(!searchOn)}>
                                        <ToggleButton value={true}>
                                            <Tooltip title="Режим поиска адреса в базе">
                                                <SearchIcon />
                                            </Tooltip>
                                        </ToggleButton>
                                        <ToggleButton value={false}>
                                            <Tooltip title="Текстовый ввод адреса">
                                                <TextFieldsIcon />
                                            </Tooltip>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Box>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <UniversalInput
                                name="Latitude"
                                label="Широта"
                                value={pointData.Latitude}
                                onChange={() => {}}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <UniversalInput
                                name="Longitude"
                                label="Долгота"
                                value={pointData.Longitude}
                                onChange={() => {}}
                                disabled={true}
                            />
                        </Grid> */}
                        <Grid item xs={12} className={classes.mapField}>
                            <DefaultMap
                                onClick={onMapClick}
                                geoData={[{ Latitude: pointData.Latitude || 0, Longitude: pointData.Longitude || 0 }]}
                                onDrawEnd={setGeographyData}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Отмена
                    </Button>
                    <Button onClick={onSubmitForm} variant="contained" color="secondary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
