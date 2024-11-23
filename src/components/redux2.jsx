import { configureStore, createSlice } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"

const initialState={
    user:[{id:1,name:'Abir',age:25,contact:12}],
    train:[{id:1, name:'parabot'}]
}

const info={
    name:'info',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            state.user.push(action.payload)
        },
        removeUser:(state,action)=>{
            state.user=state.user.filter((item)=>item.id!=action.payload)
        },
        updateUSer:(state,action)=>{
            const {id,name,age,contact}=action.payload
            const index=state.user.findIndex((item)=>item.id==id)
            if (index!=-1){
                state.user[index]={id,name,age,contact}
            }
        }

        
    }
}

const info_slice=createSlice(info)

const {addUser,removeUser}=info_slice.actions

// -------------------------------------------Store Configuration---------------------

export const store=configureStore({
    reducer:{
        info:info_slice.reducer
    }
    
})
