import UnfollowConfirmationData from "../../data/unfollow_confirmation_data";

type UnfollowConfirmationState = {
    data?: UnfollowConfirmationData;
    active: boolean;
};

export const initialUnfollowConfirmationState: UnfollowConfirmationState = {
    active: false,
};

export default UnfollowConfirmationState;