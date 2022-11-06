import LocationState from "../store/state/location_state";

interface LocationData
{
    page: keyof LocationState;
    path: string;
}

export default LocationData;