import React from 'react'
import '../Pages/navbar.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clear_access_token, clear_all_selected, logoutUser, persistor } from '../components/redux';
export default function Dropdwon({ setShowNav, showNav }) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const userData=useSelector((state)=>state.var.logged)[0]
  const name=userData.first_name+' '+userData.sur_name


  const Logout=()=>{
    dispatch(logoutUser())
    dispatch(clear_all_selected())
    persistor.purge()
    navigate('/')
  }
  return (
    <>
    <div >
            <h1>{name}</h1>
            <div className='dropdown-element' >
              <span><i class="fa-solid fa-envelope"></i></span>
              <span id='dropdown-element-email'>{userData.email}</span>
            </div>
            <div className='dropdown-element'>
              <span><i class="fa-solid fa-phone"></i></span>
              <span>{userData.phone}</span>
            </div>
            <hr />
            <div className='dropdown-element' onClick={()=>{
              setShowNav(false);
              navigate('/profile');
              

              
             
              
              }} >
              <span><i class="fa-solid fa-user"></i></span>
              <span>Profile</span>
            </div>
            <div className='dropdown-element'>
              <span><i class="fa-solid fa-suitcase"></i></span>
              <span>Purchase History</span>
            </div>
            <div className='dropdown-element'>
              <span><i class="fa-solid fa-lock"></i></span>
              <span>Update Password</span>
            </div>
            <div className='dropdown-element'>
              <span><i class="fa-solid fa-right-from-bracket"></i></span>
              <span onClick={Logout}>Logout</span>
            </div>


          </div>
    </>
  )
}
