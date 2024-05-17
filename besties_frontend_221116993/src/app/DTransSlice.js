import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    listDtrans:[]
}
export const DTransSlice = createSlice({
    name:"DTrans",
    initialState,
    reducers:{
        setDTrans : (state, action) => {
            state.listDtrans = action.payload
        },
        pushDTrans : (state, action) => {
            state.listDtrans.push(action.payload)
        }
    }
})

export const {setDTrans, pushDTrans} = DTransSlice.actions

export default DTransSlice.reducer