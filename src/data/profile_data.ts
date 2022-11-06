interface ProfileData
{
    handle?: string;
    name: string;
    picture: string;
    banner?: string;
    description?: string;
    joinDate: number;
    birthdate?: number;
    location?: string;
    website?: string;
    followerCount: number;
    followingCount: number;
    cheepCount: number;
    following: boolean;
}

export const emptyProfileData: ProfileData = {
    handle: undefined,
    name: "",
    picture: "",
    joinDate: 0,
    followingCount: 0,
    followerCount: 0,
    cheepCount: 0,
    following: false
};

export default ProfileData;