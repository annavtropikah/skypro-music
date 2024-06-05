
type userType={
    id: 14,
    username: number,
    first_name: string,
    last_name: string,
    email: string, 
}

export type trackType = {
    id: number,
    name: string,
    author: string,
    release_date: string,
    genre: string,
    duration_in_seconds: number,
    album: string,
    logo: string | null,
    track_file: string,
    stared_user: userType[],
}

export type UserStoreType = {
    user: {
      id: number;
      username: string;
      first_name: string;
      last_name: string;
      email: string;
    };
    login: (
      newUser: number,
      loginData: { email: string; password: string }
    ) => void;
    logout: () => void;
  }