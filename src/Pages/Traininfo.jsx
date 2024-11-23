import React, { useState,useRef, useEffect } from 'react'
import '../css/Traininfo.css'
import Seat_selection from '../components/seat_selection'
import axios from 'axios'
import { toast } from 'react-toastify'
import Form_input from '../components/form'
export default function Traininfo() {
  const DDD=useRef(null)
  const [stations,setStaions]=useState()

  let [see,setSee]=useState(false)
  const [search,setSearch]=useState('')
  const [v,setV]=useState([])
  const [hold,sethOLD]=useState('')
  


  const newarr=[1,2,3]
  const NewArray=[[1,2,3],[4,5,6],7]
  const dict={}
  const arr=[
    
    {station_id: 1, station_name: 'Kamalapur', location: 'Dhaka'},
    {station_id: 2, station_name: 'Biman_bandar', location: 'Dhaka'},
    {station_id: 3, station_name: 'Gazipur', location: 'chittagong'},
    {station_id: 4, station_name: 'bhairab', location: 'chittagong'},
    {station_id: 5, station_name: 'chittagong', location: 'sylhet'},
    {station_id: 6, station_name: 'sylhet', location: 'Dhaka'},
    
  ] 

  const [array,setArray]=useState(null)
  const [option,setOption]=useState('Sylhet')

  useEffect(()=>{

    const temp_arr=[]
    for(let i=0;i<3;i++){
      const temp_obj={
        'name':'',
        'address':'Sylhet'
      }
      temp_arr.push(temp_obj)
      
  
    }
    setArray(temp_arr)

  },[])
 
  const handleChange=(e,index)=>{
     const newArr=[...array]

     console.log('form index',index)
     newArr[index]={...newArr[index],[e.target.name]:e.target.value}
     setArray(newArr)
  }




  return (


    <>

      {newarr.map((item,index)=>{
        return (<div key={index}>

          <input type="text" name="name"  value={array?array[index]?.name:null} onChange={(e)=>handleChange(e,index)} placeholder='name' id="" />
          <select name="address" id=""  onChange={(e)=>handleChange(e,index)} value={array?array[index]?.address:null}>
            <option value="Sylhet">Sylhet</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Ctg">Ctg</option>
          </select>

      </div>)

      })}


      {array?array.map((item,index)=>{
        if(item.name!=''){
          return (
            <div>
              <p>This is from input field{index+1}</p>
              <p>Name: {item.name}</p>
              <p>Address: {item.address}</p>
            </div>
            
          )
        }
      }): ''}

      <div className='form'>
        <Form_input/>
      </div>
      

    </>



  )
}
