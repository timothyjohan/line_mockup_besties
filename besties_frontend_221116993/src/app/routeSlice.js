import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    route:"login",
}

export const routeSlice = createSlice({
    name:"route",
    initialState,
    reducers:{
        setRoute : (state, action) => {
            state.route = action.payload
        }
    }
})

export const {setRoute} = routeSlice.actions

export default routeSlice.reducer