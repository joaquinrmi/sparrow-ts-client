import CheepDataResponse from "./cheep_data_response";

type SearchCheepsResponse = {
    cheeps: Array<CheepDataResponse>;
    next: number;
};

export default SearchCheepsResponse;