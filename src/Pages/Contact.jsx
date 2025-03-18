import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addItem } from '../components/redux'

export default function Contact() {
  const dispatch=useDispatch() 
  const todos=useSelector((state)=>state.var.user)
  const train_info=useSelector((state)=>state.var.train) 
  const add=(user)=>{

    dispatch(addItem(user))
    console.log()
  }
  
    return (
      <>
         <div>Choose_seat</div>
         <button onClick={()=>add('abir')}>Click</button>
         {todos.map((item,index)=>(
          <p>{item.name}</p>
         ))}

         <h1>Train Info</h1>
         <hr />
         
      </>
     
  
    )
  }
  