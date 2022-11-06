type LocationState = {
    profile: string;
    innerProfile: string;
    relations: string;
    cheepPage: string;
    mainAsideSearch: string;
    mainAsideGallery: string;
};

export const initialLocationState: LocationState = {
    profile: "",
    innerProfile: "",
    relations: "",
    cheepPage: "",
    mainAsideSearch: "",
    mainAsideGallery: "",
};

export default LocationState;