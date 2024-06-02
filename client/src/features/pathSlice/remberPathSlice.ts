import { createSlice } from "@reduxjs/toolkit"

const rememberPathSlice = createSlice({
    name: 'path',
    initialState: {
        pathName: null
    },

    reducers: {
        setPathName: (state, action) => {
            state.pathName = action.payload
        }
    }
})


export const { setPathName } = rememberPathSlice.actions
export default rememberPathSlice.reducer