import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSingupData(state, value) {
            state.signupData = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
        setToken(state, value) {
            state.token = value.payload
        },
    }
})

// export the reducer 
export const {setToken, setLoading, setSingupData} = authSlice.actions;

// export slice
export default authSlice.reducer; 