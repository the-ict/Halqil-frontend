import { createSlice, TaskAbortError } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            console.log("action payload: ", action.payload)
            state.loading = false
            state.user = action.payload
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true
        },
        logout: () => {
            return initialState;
        }
    }
})


export const { loginStart, loginFailure, loginSuccess, logout } = userSlice.actions

export default userSlice.reducer