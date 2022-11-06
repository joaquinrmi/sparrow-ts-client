type ProfileDataResponse = {
    handle: string,
    name: string;
    picture: string;
    banner: string;
    description: string;
    joinDate: number;
    birthdate: number;
    location: string;
    website: string;
    cheepCount: number;
    followingCount: number;
    followerCount: number;
    following: boolean;
};

export default ProfileDataResponse;