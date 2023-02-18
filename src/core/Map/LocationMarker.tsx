import React, { useState } from 'react';
import { LatLngExpression } from 'leaflet';
import { useMapEvents, Marker } from 'react-leaflet';

interface ILocationMarker {
    onClick?: (event: any) => void;
}
export const LocationMarker: React.FC<ILocationMarker> = ({ onClick }) => {
    const [position, setPosition] = useState<LatLngExpression | null>(null);
    const map = useMapEvents({
        click(event: any) {
            setPosition(event.latlng);
            map.flyTo(event.latlng, map.getZoom());
            if (onClick) onClick(event);
        },
    });

    return position === null ? null : <Marker position={position} />;
};
