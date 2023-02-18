import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

import { LocationMarker } from '@core/Map/LocationMarker';

import { IGeography } from '@helpers/dictionariesHelper';
import {
    getPolygonDrawConfig,
    getPolylineDrawConfig,
    getShapeType,
    setGeoData,
    // addMarkerToMap,
    DEFAULT_MAP_ZOOM,
    DEFAULT_MAP_TILE_LAYER_ATTRIBUTION,
    DEFAULT_MAP_TILE_LAYER_URL,
    DEFAULT_MAP_ID,
    DEFAULT_MAP_CENTER,
} from '@core/Map/methods';

import './leaflet-draw-ext.css';

export interface IDefaultMap {
    center?: [number, number];
    zoom?: number;
    className?: string;
    attribution?: string;
    url?: string;
    id?: string;
    onClick?: (event: any) => void;
    isDrawable?: boolean;
    pointType?: string;
    onDrawEnd?: (result: any) => void;
    geoData?: IGeography[];
}

const layers = new L.FeatureGroup();
export const drawConfig = {
    editableLayers: layers,
    fullControl: new L.Control.Draw({
        position: 'topright',
        draw: {
            polygon: false,
            polyline: false,
            circle: false,
            rectangle: false,
            marker: false,
            circlemarker: false,
        },
        edit: {
            featureGroup: layers,
            // @ts-ignore
            remove: true,
        },
    }),
};

const DefaultMap = ({
    center,
    zoom,
    className,
    attribution,
    url,
    id,
    onClick,
    isDrawable,
    pointType = 'Point',
    onDrawEnd,
    geoData,
}: //disabled,
IDefaultMap) => {
    //const [ref, setRef] = React.useState(React.useRef<HTMLDivElement>(null));
    const ref = useMap()
    const [marker, setMarker] = React.useState(null);

    // const setMapRef = (leafletElement: any) => {
    //     if (leafletElement) {
    //         setRef(leafletElement);
    //     }
    // };

    const drawCreatedHandler = (e: any) => {
        const { layerType, layer } = e;
        if (onDrawEnd) {
            if (layerType === 'polygon') {
                const points = layer._latlngs;
                const newCoordinates = points[0].map((point: any) => {
                    return {
                        Latitude: point.lat,
                        Longitude: point.lng,
                    };
                });
                onDrawEnd(newCoordinates);
            } else {
                const points = layer._latlngs;
                const newCoordinates = points.map((point: any) => {
                    return {
                        Latitude: point.lat,
                        Longitude: point.lng,
                    };
                });
                onDrawEnd(newCoordinates);
            }
        }
    };

    const drawEditedHandler = (e: any) => {
        const layers: any[] = [];
        e.layers.eachLayer((item: any) => layers.push(item));
        const layer = layers[0];
        const layerType = getShapeType(layer);
        if (onDrawEnd) {
            if (layerType === 'polygon') {
                const points = layer._latlngs;
                const newCoordinates = points[0].map((point: any) => {
                    return {
                        Latitude: point.lat,
                        Longitude: point.lng,
                    };
                });
                onDrawEnd(newCoordinates);
            } else {
                const points = layer._latlngs;
                const newCoordinates = points.map((point: any) => {
                    return {
                        Latitude: point.lat,
                        Longitude: point.lng,
                    };
                });
                onDrawEnd(newCoordinates);
            }
        }
    };

    const drawDeleteHandler = () => {
        if (onDrawEnd) {
            onDrawEnd([]);
        }
    };

    const setDrawableParams = () => {
        const { editableLayers, fullControl } = drawConfig;
        // @ts-ignore
        if (ref && ref.attributionControl && isDrawable) {
            // @ts-ignore
            ref.removeLayer(editableLayers);
            // @ts-ignore
            ref.addLayer(editableLayers);
            // @ts-ignore
            fullControl.remove();
            fullControl.setDrawingOptions({
                polygon: getPolygonDrawConfig(pointType),
                polyline: getPolylineDrawConfig(pointType),
            });
            // @ts-ignore
            ref.addControl(fullControl);
            // @ts-ignore
            ref.on('draw:created', drawCreatedHandler);
            // @ts-ignore
            ref.on('draw:edited', drawEditedHandler);
            // @ts-ignore
            ref.on('draw:deleted', drawDeleteHandler);
        }
    };

    /*const setMapMarker = (event: any, noClick = true) => {
        const { lat, lng } = event.latlng;
        if (ref && !isDrawable && lat && lng) {
            addMarkerToMap({ ref, lat, lng, setMarker, marker });
        }
        if (!noClick && onClick && !isDrawable) onClick(event);
    };*/

    const initMap = () => {
        // @ts-ignore
        if (ref && ref.attributionControl) {
            // @ts-ignore
            ref.eachLayer((layer) => !layer._url && ref.removeLayer(layer));
            setDrawableParams();
            if (geoData?.length && geoData[0].Latitude) {
                setGeoData({ ref, geoData, pointType, setMarker, editableLayers: drawConfig.editableLayers });
            }
        }
    };

    React.useEffect(() => {
        initMap();
    }, [ref, pointType, geoData]);

    return (
        <MapContainer
            center={center || DEFAULT_MAP_CENTER}
            zoom={zoom || DEFAULT_MAP_ZOOM}
            id={id || DEFAULT_MAP_ID}
            //whenCreated={setMapRef}
            className={className}
            style={{ height: '100%' }}
            // todo onClick={(event: any) => (onClick ? setMapMarker(event, false) : null)}
        >
            <TileLayer
                attribution={attribution || DEFAULT_MAP_TILE_LAYER_ATTRIBUTION}
                url={url || DEFAULT_MAP_TILE_LAYER_URL}
            />
            <LocationMarker onClick={onClick} />
        </MapContainer>
    );
};

export default DefaultMap;
