import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    currentTrans:"",
}

export const currentTransSlice = createSlice({
    name:"currentTrans",
    initialState,
    reducers:{
        setCurrent : (state, action) => {
            state.currentTrans = action.payload
        }
    }
})

export const {setCurrent} = currentTransSlice.actions

export default currentTransSlice.reducer