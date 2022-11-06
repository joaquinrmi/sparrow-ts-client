import CloseConfirmationData from "../../data/close_confirmation_data";

type CloseConfirmationState = {
    data?: CloseConfirmationData;
    active: boolean;
};

export const initialCloseConfirmationState: CloseConfirmationState = {
    active: false,
};

export default CloseConfirmationState;