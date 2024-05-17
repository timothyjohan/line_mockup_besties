import {configureStore} from "@reduxjs/toolkit"
import DTransReducer from "./DTransSlice"
import currentTransSlice from "./currentTransSlice"
import indexSlice from "./indexSlice"

//store digunakan untuk menampung semua slice redux
const store = configureStore({
    reducer:{
        index: indexSlice,
    },
})
export default store