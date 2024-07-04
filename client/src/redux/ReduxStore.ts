import {configureStore} from "@reduxjs/toolkit"
import ModalReducer from "./slices/ModalSlice"
import authenticationReducer from "./slices/AuthenticationSlice"

export const store =configureStore({
    reducer: {
        authentication:authenticationReducer,
        modal:ModalReducer
    }

})


export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch