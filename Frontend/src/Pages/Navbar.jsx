import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import Dropdwon from '../components/dropdwon'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import navbar_button from '../assets/logo/menu.png'
import close_button from '../assets/logo/close.png'
import Sidebar from '../components/Sidebar'


export default function Navbar() {
  const [showNav, setShowNav] = useState(false)
  const temp = useSelector((state) => state.var.logged)
  const userData = useSelector((state) => state.var.logged)[0]
  const [showSidebar, setshowSidebar] = useState(false)
  const navigate = useNavigate()
  let name = ''
  if (userData) {
    console.log("user", userData)
    name = userData.first_name + ' ' + userData.sur_name

  } else {
    console.log("nothing", temp)
  }
  console.log('show', showNav)

  const profile = (
    <>
      <div className='profilesidebar' onClick={() => setShowNav(!showNav)}>
        <div >{name}</div>
        <i className={`fa-solid fa-caret-down ${showNav ? 'rotate' : ''}`}></i>
      </div>

      {showNav ? <div className='dropdown2'> <Dropdwon />  </div> : ''}
    </>

  )

  return (
    <div className='navbar'>

      <div className='Logo-name' >
        <div className='Logo' style={{ cursor: 'pointer' }} onClick={() => navigate('/')}><img src="https://brrlict.revstack.tech/cdn/partner/201909242915.png" alt="" /></div>
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Bangladsh <br /> Railway</div>
      </div>

      <div className='nav-profile' >
        <ul>
          <NavLink to={'/'}> <li>Home</li>  </NavLink>
          <NavLink to={'/Traininfo'}> <li>Train Information</li> </NavLink>
          <NavLink to={'/Contact'}> <li>Contact Us</li></NavLink>
          {!userData ? <NavLink to={'/login'}> <li>Login</li>  </NavLink> : ''}

        </ul>
        {userData ?
          (
            <div className='profile-info' >
              <div className='profile' onClick={() => setShowNav(!showNav)}>
                <div >{name}</div>
                <i className={`fa-solid fa-caret-down ${showNav ? 'rotate' : ''}`}></i>
              </div>

              {showNav ? <div className='dropdown'> <Dropdwon />  </div> : ''}
            </div>
          ) : ''}


      </div>
      <div className='navbar_btn'  >
        {showSidebar==false? 
        (<img src={navbar_button} alt="" onClick={() => setshowSidebar(!showSidebar)} />) 
        :
        
        (<img src={close_button} alt="" onClick={() => setshowSidebar(!showSidebar)} />)
        
        }
        <div className={`sidebar ${showSidebar? 'active':''  }`} >
          <Sidebar showSidebar={showSidebar} setshowSidebar={setshowSidebar} userData={userData} profile={profile} />
        </div>
      </div>




    </div>
  )
}
