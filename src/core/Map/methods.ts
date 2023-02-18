import L from 'leaflet';

import { primaryColor, secondaryColor } from '@theme/main';
import { IGeography } from '@helpers/dictionariesHelper';

export const ZOOM_BUFFER = 0.1;
export const DEFAULT_MAP_ZOOM = 12;
export const DEFAULT_MAP_TILE_LAYER_ATTRIBUTION = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
export const DEFAULT_MAP_TILE_LAYER_URL = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
//export const DEFAULT_MAP_TILE_LAYER_URL = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'; // симпатичная (платная?)
export const DEFAULT_MAP_ID = 'map';
export const DEFAULT_MAP_CENTER: [number, number] = [55.755814, 37.617635];

export const getPolygonDrawConfig = (pointType: string) => {
    if (pointType === 'Polygon') {
        return {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
                color: primaryColor,
            },
        };
    }
    return false;
};

export const getPolylineDrawConfig = (pointType: string) => {
    if (pointType === 'Line') {
        return {
            //allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: "<strong>Oh snap!<strong> you can't draw that!", // Message that will show when intersect
            },
            shapeOptions: {
                color: primaryColor,
            },
        };
    }
    return false;
};

export const getShapeType = (layer: any) => {
    if (layer instanceof L.Circle) {
        return 'circle';
    }

    if (layer instanceof L.Marker) {
        return 'marker';
    }

    if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
        return 'polyline';
    }

    if (layer instanceof L.Polygon && !(layer instanceof L.Rectangle)) {
        return 'polygon';
    }

    if (layer instanceof L.Rectangle) {
        return 'rectangle';
    }
};

interface IGeoData {
    ref: any;
    geoData: IGeography[];
    pointType: string;
    editableLayers?: any;
    setMarker: (markerData: any) => void;
}
export const setGeoData = ({ ref, geoData, pointType, editableLayers, setMarker }: IGeoData) => {
    if (editableLayers && editableLayers.clearLayers) {
        editableLayers.clearLayers();
    }

    geoData.forEach((geo, index: number) => {
        addMarkerToMap({ ref, lat: geo.Latitude, lng: geo.Longitude, setMarker, number: index + 1 });
    });
    if (geoData && geoData.length > 1) {
        const coords = geoData.map((item) => [item.Latitude, item.Longitude]);
        if (pointType === 'Polygon') {
            // @ts-ignore
            const polygon = L.polygon(coords, { color: primaryColor, dashArray: '5, 10' }).addTo(ref);
            // @ts-ignore
            ref.fitBounds(polygon.getBounds().pad(ZOOM_BUFFER));
            if (editableLayers && editableLayers.addLayer) {
                editableLayers.addLayer(polygon);
            }
        } else if (pointType === 'Line') {
            // @ts-ignore
            const polyline = L.polyline(coords, { color: primaryColor, dashArray: '5, 10' }).addTo(ref);
            // @ts-ignore
            ref.fitBounds(polyline.getBounds().pad(ZOOM_BUFFER));
            if (editableLayers && editableLayers.addLayer) {
                editableLayers.addLayer(polyline);
            }
        }
    } else {
        return false;
    }
};

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

const markerNumberStyles = `
    transform: rotate(-45deg);
    position: absolute;
    top: 0.5em;
    left: 1em;
    color: white;
`;

const customIcon = (number?: number) =>
    L.divIcon({
        className: 'my-custom-pin',
        iconAnchor: [0, 24],
        //labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles(secondaryColor)}">
    <span style="${markerNumberStyles}">${number}</span>
</span>`,
    });

interface IAddMarker {
    ref: any;
    lat: number;
    lng: number;
    setMarker: (markerData: any) => void;
    marker?: any;
    number?: number;
}
export const addMarkerToMap = ({ ref, lat, lng, setMarker, marker, number }: IAddMarker) => {
    if (ref && marker) {
        // @ts-ignore
        ref.removeLayer(marker);
    }
    // @ts-ignore
    const mapMarker = new L.marker([lat, lng], { icon: customIcon(number) }).addTo(ref);
    // @ts-ignore
    ref.panTo([lat, lng]);
    setMarker(mapMarker);
};
