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
    seat_details:[],
    amount:0,
    expirey_time:null,
    access_token:null,
    refresh_token:null,
    message:null



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
            const {user,expire}=action.payload
            state.logged.push(user)
            state.expirey_time=expire



        },
        logoutUser: (state, action) => {

            state.logged = []
            state.access_token=null
            state.user=[]
            state.home_page_info = null
            state.selected=[]
            state.amount=null
            state.expirey_time=null
            state.message=null
            

        },
        addUser: (state, action) => {
            state.user.push(action.payload)
        },
        addDetails: (state, action) => {
            state.journey_inf.push(action.payload)
        },
        addTrain:(state,action)=>{
            state.train=action.payload
            console.log('from redux',state.train)
        },
        showDetails: (state, action) => {
            return state.journey_inf

        },
        insert_selected:(state,action)=>{
            const key=action.payload
           state.selected.push(action.payload)
           state.seat_details.push(action.payload)
           state.amount+=parseInt(key[3])
        },
        clear_selected:(state,action)=>{
            const key=action.payload
            const new_selected=state.selected.filter((item)=> !(item[0]==key[0] && item[2]==key[2]) )
            const new_seat_details=state.seat_details.filter((item)=> !(item[0]==key[0] && item[2]==key[2]))
            state.selected=new_selected
            state.seat_details=new_seat_details
            state.amount-=parseInt(key[3])

        },
        clear_all_selected:(state,action)=>{
            state.selected=[]
            state.seat_details=[]
            state.amount=0
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
        },
        remove_after_purchasing_ticket:(state,action)=>{
            state.home_page_info = null
            state.selected=[]
            state.amount=null
            state.expirey_time=null
            state.message=null
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


export const {  remove_after_purchasing_ticket,addItem, addDetails, showDetails, loginUser, addUser, logoutUser, add_home_page_info,insert_selected,clear_selected,clear_all_selected,addTrain,add_access_token,add_refresh_token,clear_access_token,clear_refresh_token } = variableSlice.actions

