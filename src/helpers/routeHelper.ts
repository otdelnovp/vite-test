import { endOfMonth, momentToFormatString, startOfYear } from '@helpers/dateHelper';

export interface IUnloadPoint {
    PointId: string;
    PalletCnt?: number;
    Volume?: number;
    Weight?: number;
}

export interface IRouteClarkeWrightRequest {
    LoadPoint: string;
    UnloadPoints: IUnloadPoint[];
}

export interface IRoutePoint {
    Distance: number;
    Latitude: number;
    Longitude: number;
    N: number;
    PalletCnt?: number;
    PointId: string;
    Type: 'LD' | 'UL';
    Volume?: number;
    Weight?: number;
}
export interface IVehicleRouteDataResponse {
    Distance: number;
    N: number;
    Points: IRoutePoint[];
    VehicleId: string;
    Visible: boolean;
}

export interface IRouteFindFilter {
    FromDate: string;
    ToDate: string;
    AddressId: string;
    UseWeight: boolean;
    UseTemp: boolean;
    UseVolume: boolean;
    UsePallets: boolean;
}

export const emptyRouteFindFilter: IRouteFindFilter = {
    FromDate: momentToFormatString(startOfYear()),
    ToDate: momentToFormatString(endOfMonth()),
    AddressId: '',
    UseWeight: true,
    UseTemp: false,
    UseVolume: false,
    UsePallets: false,
};

export const mapLineColors = ['red', 'green', 'blue', 'purple', 'lime', 'orange', 'yellow'];

export interface IPreparedVehicleRouteData {
    vehicleRouteData: IVehicleRouteDataResponse[];
    allPointsLatLng: [number, number][];
}
export const prepareVehicleRouteData = (response: IVehicleRouteDataResponse[]) => {
    const result: IPreparedVehicleRouteData = { vehicleRouteData: [], allPointsLatLng: [] };
    for (let i = 0; i < response.length; i++) {
        const currentVehicleRoute = response[i];
        for (let j = 0; j < currentVehicleRoute.Points.length; j++) {
            const currentPoint = currentVehicleRoute.Points[j];
            if (currentPoint && currentPoint.Latitude && currentPoint.Longitude) {
                if (j === 0) {
                    result.allPointsLatLng.push([currentPoint.Latitude, currentPoint.Longitude]);
                }
                if (j !== 0 && currentPoint.Distance !== 0) {
                    result.allPointsLatLng.push([currentPoint.Latitude, currentPoint.Longitude]);
                }
            }
        }
        result.vehicleRouteData.push({ ...currentVehicleRoute, Visible: true });
    }
    return result;
};

export const emptyPreparedVehicleRouteData: IPreparedVehicleRouteData = { vehicleRouteData: [], allPointsLatLng: [] };
