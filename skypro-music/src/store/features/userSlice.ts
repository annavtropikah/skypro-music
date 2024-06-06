
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserStateType = {
    user: {
      id: number | null,
      username: string,
      first_name: string,
      last_name: string,
      email: string,
    },
    login: (
      newUser: number,
      loginData: { email: string; password: string }
    ) => void;
    logout: () => void,
  }

  //первоначальное состояние
// const initialUserState: UserStateType = {
//     user: {
//         id: null,
//         username: "",
//         first_name: "",
//         last_name: "",
//         email: "",
//       },
//       login: (
//         newUser: number,
//         loginData: { email: ""; password: "" }
//       ) => void,
//       logout: () => void,

// }