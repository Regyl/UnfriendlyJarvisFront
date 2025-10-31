import {configureStore} from '@reduxjs/toolkit'
import {authorizationSlice} from "./features/authorization";

export default configureStore({
    reducer: {
        auth: authorizationSlice,
    },
})