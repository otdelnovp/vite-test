import React from 'react';
import L from 'leaflet';
import { Marker, Popup, Tooltip as LeafletTooltip } from 'react-leaflet';

import Box from '@mui/material/Box';

import { getDecimalStr, cubicSmToCubicM, metresToKilometres } from '@helpers/methods';
import { IRouteFindFilter, IRoutePoint, IVehicleRouteDataResponse } from '@helpers/routeHelper';

import markerRed from '@icons/marker-red.png';
import markerShadow from '@icons/marker-shadow.png';

import { useEstatesStyles } from '@core/Map/styles';

interface IMapMarker {
    routePoint: IRoutePoint;
    color: string;
    routeFilters: IRouteFindFilter;
    currentRouteData: IVehicleRouteDataResponse;
}

const iconStore = (className: string) =>
    new L.Icon({
        iconUrl: markerRed,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        className,
    });

const markerHtmlStyles = (color: string) => `
  background-color: ${color};
  width: 2rem;
  height: 2rem;
  display: block;
  left: -1rem;
  top: -1rem;
  position: relative;
  border-radius: 2rem 2rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const markerNumberStyles = (number: number) => `
    transform: rotate(-45deg);
    position: absolute;
    top: ${number > 9 ? '0.6' : '0.5'}em;
    left: ${number > 9 ? '0.8' : '1'}em;
    color: white;
`;
interface ICustomIcon {
    number: number;
    color?: string;
}
const customIcon = ({ number, color }: ICustomIcon) =>
    L.divIcon({
        className: 'my-custom-pin',
        iconAnchor: [0, 24],
        //labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles(color || 'blue')}">
    <span style="${markerNumberStyles(number)}">${number}</span>
</span>`,
    });

export const MapMarker: React.FC<IMapMarker> = ({ routePoint, color, routeFilters, currentRouteData }) => {
    const classes = useEstatesStyles();
    const isStore = routePoint.Type === 'LD';
    const pointNumber = isStore ? 0 : routePoint.N - 1;
    return (
        <Marker
            position={[routePoint.Latitude, routePoint.Longitude]}
            icon={isStore ? iconStore(classes.store) : customIcon({ number: pointNumber, color })}
        >
            {isStore ? (
                <LeafletTooltip>
                    <b>{'Склад:'}</b>
                    <br />
                    <span>Расстояние: {<b>{getDecimalStr(metresToKilometres(currentRouteData.Distance), 'км.')}</b>}</span>
                </LeafletTooltip>
            ) : (
                <LeafletTooltip>
                    <b>Заказ для Магазина №{pointNumber}</b>
                    <br />
                    <span>Расстояние: {<b>{getDecimalStr(metresToKilometres(routePoint.Distance), 'км.')}</b>}</span>
                    {routeFilters.UseWeight && (
                        <React.Fragment>
                            <br />
                            <span>Общий вес: {<b>{getDecimalStr(routePoint.Weight, 'кг.')}</b>}</span>
                        </React.Fragment>
                    )}
                    {routeFilters.UseVolume && (
                        <React.Fragment>
                            <br />
                            <span>Объем: {<b>{getDecimalStr(cubicSmToCubicM(routePoint.Volume), 'м3')}</b>}</span>
                        </React.Fragment>
                    )}
                    {routeFilters.UsePallets && (
                        <React.Fragment>
                            <br />
                            <span>Паллеты: {<b>{getDecimalStr(routePoint.PalletCnt, 'шт.')}</b>}</span>
                        </React.Fragment>
                    )}
                </LeafletTooltip>
            )}
            <Popup>
                <Box className={classes.mapPoint}>
                    <Box className={classes.mapPointTitle}>
                        {isStore ? 'Склад' : 'Магазин'}: <b>{pointNumber}</b>
                    </Box>
                </Box>
            </Popup>
        </Marker>
    );
};
