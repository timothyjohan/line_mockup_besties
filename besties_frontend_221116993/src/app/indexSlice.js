import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    index:{
        friend:{},
        chat:[{}]
    },
}

export const indexSlice = createSlice({
    name: "index",
    initialState,
    reducers: {
        setIndex: (state, action) => {
            state.index = action.payload;
        },
        setFriend: (state, action) => {
            state.index.friend = action.payload;
        },
        setChats: (state, action) => {
            state.index.chat = action.payload;
        },
    },
});

export const {setIndex, setChats, setFriend} = indexSlice.actions

export default indexSlice.reducer