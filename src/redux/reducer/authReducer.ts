import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

import { AuthType } from "../../types/Auth";

const initialState: AuthType = {
    name : null,
    token: null
}
export const authSlice = createSlice ({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<AuthType>) => {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: action.payload.name,
                    token: action.payload.token
                })
            )
            state.name = action.payload.name
            state.token = action.payload.token
        },
        logout: (state) => {
            localStorage.clear()
            state.name = null
            state.token = null
        }
    }
})
export const selectAuth = (state:RootState) => state.auth
export default authSlice.reducer
export const {setUser, logout} = authSlice.actions

