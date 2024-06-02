

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


export interface authState {
    name: string | null;
    token: string | null;
}

const initialState: authState = {
    name: null,
    token: null
}



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },

        logout: (state) => {
            localStorage.removeItem("token")
            state.token = null
            window.location.reload();
        }
    }
})


export const selectedAuth = (state: RootState) => state.auth

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;