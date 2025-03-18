import React from 'react'

import './css_comp/sidebar.css'
import { Link } from 'react-router-dom'

export default function Sidebar(props) {
    const {userData,profile,showSidebar,setshowSidebar}=props
    let name = ''
    if (userData) {
        // console.log("user", userData)
        name = userData.first_name + ' ' + userData.sur_name

    } 

    return (
        <div >
            <Link to={'/'} onClick={()=>setshowSidebar(!showSidebar)} ><li>Home</li></Link>
            <Link to={'/Traininfo'} onClick={()=>setshowSidebar(!showSidebar)} ><li>Train information</li></Link>
            <Link to={'/Contact'} onClick={()=>setshowSidebar(!showSidebar)} ><li>Contact Us</li></Link>
            
            
            
            {userData? 
            <>
                {profile}
            </>
            
            
            
            :   <Link to={'/login'} ><li>Login</li></Link>   }
        </div>
    )
}
