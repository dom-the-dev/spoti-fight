import {createSlice} from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            window.localStorage.setItem('token', action.payload)
            state.token = action.payload
        },
        clearToken: (state) => {
            window.localStorage.removeItem('token')
            state.token = null
        }
    }
})

export const {setToken, clearToken} = loginSlice.actions;

export default loginSlice.reducer