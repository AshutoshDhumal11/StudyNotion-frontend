import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    user: (() => {
        try {
            const userData = localStorage.getItem("user");
            if(!userData || userData === "undefined") {
                return null;
            }
            // return userData ? JSON.parse(userData) : null;
            return JSON.parse(userData);
        } catch (error) {
            console.error("Failed to parse user data from localStorage:", error);
            return null; // Fallback value in case of a parsing error
        }
    })(),
    loading: false,  
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

// export the reducer 
export const {setUser, setLoading} = profileSlice.actions;

// export slice
export default profileSlice.reducer; 
