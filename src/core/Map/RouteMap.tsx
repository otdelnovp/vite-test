import React, { memo } from 'react';

import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';

import Box from '@mui/material/Box';

import { MapMarker } from '@core/Map/MapMarker';

import { IRouteFindFilter, IVehicleRouteDataResponse, mapLineColors } from '@helpers/routeHelper';

import { useEstatesStyles } from './styles';

export interface IRouteMap {
    vehicleRouteData: IVehicleRouteDataResponse[];
    routeFilters: IRouteFindFilter;
    allPointsLatLng: [number, number][];
}

const RouteMap: React.FC<IRouteMap> = ({ vehicleRouteData, routeFilters, allPointsLatLng }) => {
    const classes = useEstatesStyles();
    const centerPosition: [number, number] = [59.939864, 30.314565];
    const leafletElement = useMap();
    // const setMapRef = (leafletElement: any) => {
    //     if (leafletElement && allPointsLatLng.length > 0) {
    //         leafletElement.fitBounds(allPointsLatLng);
    //     }
    // };

    return (
        <Box className={classes.map}>
            <MapContainer
                center={centerPosition}
                zoom={11}
                style={{ height: '100%' }}
                //whenCreated={setMapRef}
                whenReady={() => {
                    if (leafletElement && allPointsLatLng.length > 0) {
                        leafletElement.fitBounds(allPointsLatLng);
                    }
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {vehicleRouteData.map((item) => {
                    return item.Points.map((point) => (
                        <MapMarker
                            key={item.N + point.PointId + point.N}
                            routePoint={point}
                            color={mapLineColors[item.N]}
                            routeFilters={routeFilters}
                            currentRouteData={item}
                        />
                    ));
                })}
                {vehicleRouteData.map((item) => {
                    const points = item.Points.map((point) => [point.Latitude, point.Longitude] as [number, number]);
                    points.push(points[0]);
                    return <Polyline key={item.N} pathOptions={{ color: mapLineColors[item.N] }} positions={points} />;
                })}
            </MapContainer>
        </Box>
    );
};

export default memo(RouteMap);
