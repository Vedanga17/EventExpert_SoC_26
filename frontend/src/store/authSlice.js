import { createSlice } from '@reduxjs/toolkit';

// 1. Check local storage the moment Redux initializes
const storedUserData = localStorage.getItem('userData');

const initialState = {
    // If storedUserData exists, set status to true. Otherwise, false.
    status: !!storedUserData, 
    // Parse the stringified JSON back into a JavaScript object
    userData: storedUserData ? JSON.parse(storedUserData) : null, 
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            // Your Login.jsx sends action.payload.userData
            state.userData = action.payload.userData; 
            
            // 2. Save a stringified copy to local storage
            localStorage.setItem('userData', JSON.stringify(action.payload.userData));
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            
            // 3. Wipe it from local storage when they log out
            localStorage.removeItem('userData');
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;