
import { userType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type UserStateType = {
  user: userType



}

// первоначальное состояние
const initialState: UserStateType = {
  user: {
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    email: "",

  },
  // tokens:{
  //  accesstoken
  //  refreshtoken
  // }


}



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => {
      state.user = action.payload
    }
  }
})

export const{setUser}=userSlice.actions
export const userReducer=userSlice.reducer