import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from "redux";

const initialState = {
    user: [{ id: 1, name: 'abir' }],
    logged: [],
    home_page_info: null,
    train: [],
    selected_exist: null,
    selected: [],
    access_token:null,
    refresh_token:null



};

const variable =
{
    name: 'variable',
    initialState,
    reducers: {
        add_home_page_info: (state, action) => {
            state.home_page_info = action.payload
        },
        loginUser: (state, action) => {
            state.logged.push(action.payload)
        },
        logoutUser: (state, action) => {

            state.logged = []
            state.access_token=null
            state.user=[]
            state.home_page_info = null

        },
        addUser: (state, action) => {
            state.user.push(action.payload)
        },
        addDetails: (state, action) => {
            state.journey_inf.push(action.payload)
        },
        addTrain:(state,action)=>{
            state.train=action.payload
        },
        showDetails: (state, action) => {
            return state.journey_inf

        },
        insert_selected:(state,action)=>{
           state.selected=action.payload
        },
        clear_selected:(state,action)=>{
            const key=action.payload
            const new_selected=state.selected.filter((item)=> !(item[0]==key[0] && item[2]==key[2]) )
            state.selected=new_selected
            // console.log("removed",state.selected)
        },
        clear_all_selected:(state,action)=>{
            state.selected=[]
            // console.log('insert selected cleared',state.selected)
        },
        add_access_token:(state,action)=>{
            state.access_token=action.payload
        },
        add_refresh_token:(state,action)=>{
            state.refresh_token=action.payload
        },
        clear_access_token:(state,action)=>{
            state.access_token=null
        },
        clear_refresh_token:(state,action)=>{
            state.refresh_token=null
        }

    }
}



const variableSlice = createSlice(variable)

// Persist Config
const persistConfig = {
    key: 'root',
    storage, // default to localStorage
};

// Combine reducers (in case you have multiple reducers)
const rootReducer = combineReducers({
    var: variableSlice.reducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);


export const { addItem, addDetails, showDetails, loginUser, addUser, logoutUser, add_home_page_info,insert_selected,clear_selected,clear_all_selected,addTrain,add_access_token,add_refresh_token,clear_access_token,clear_refresh_token } = variableSlice.actions

