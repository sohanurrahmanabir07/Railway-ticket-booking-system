import React from 'react'
import { useDispatch } from 'react-redux'
import { addItem } from '../components/redux'
export default function Choose_seat() {
const dispatch=useDispatch();
const add=()=>{
  const user={
    id:1,
    name:'Abir'
  }
  dispatch(addItem(user))
  console.log(addItem)
}

  return (
    <>
       <div>Choose_seat</div>
       
    </>
   

  )
}
