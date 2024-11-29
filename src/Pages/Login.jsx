import React, { useEffect, useState } from 'react'
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/login.css'
import loading_gif from '../assets/logo/croped.gif'
import { useDispatch, useSelector } from 'react-redux'
import { add_access_token, loginUser, logoutUser, store } from '../components/redux'
import axios from 'axios'
import Registration from '../components/Registration';
import api from '../components/api';
export default function Login() {
  const location = useLocation()
  const [showPass, setshowPass] = useState(false)
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [regAllow, setregAllow] = useState(false)
  const dispatch = useDispatch()
  let usersData = useSelector((state) => state.var.user)

  const findUser = useSelector((state) => state.var.logged)
  const selected = useSelector((state) => state.var.selected)
  const access_token=useSelector((state)=>state.var.access_token)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (number != '' && password != '') {
      setregAllow(true)
    } else {
      setregAllow(false)
    }



  }, [number, password])

  const handleChange = () => {
    setshowPass(!showPass)
  }

  useEffect(()=>{
    console.log(location)
    if(location.state?.expirey_message){
      toast.error(`${location.state.expirey_message}`,{
        autoClose:false
      })

      setTimeout(() => {
        window.history.replaceState(null, document.title, window.location.pathname);
      }, 100);
    }

  },[])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const passenger = {
      'phone': number,
      'password': password
    }
    await api.post('/login', passenger)
      .then((res) => {

        if(res.status==200){
          dispatch(logoutUser()) //logouting first 

          const expire_time=res.data.expires_in

          console.log('expurey time',expire_time)
          
          const expire=Math.floor(Date.now()/1000+parseInt(expire_time))
          
          dispatch(loginUser({user:res.data.user,expire:expire}))
          

          dispatch(add_access_token(res.data.access_token))

          navigate('/')

        }
        else{
          setLoading(false)

          if(res.data.message=='Password is incorrect'){
            toast.error('Incorrect Username or Password',{
              autoClose:false
            })
            
          }
          else{
            toast.error(<Link to={'/registration'}>User not found Tap to Register!!</Link>,{
              autoClose:false
            })
          }


          
        }
  
      })
      .catch((error)=>{
        setLoading(false)
        if(error.response.status==401){
          toast.error('Incorrect Username or Password',{
            autoClose:false
          })
        }
      })
  }

  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   const passenger = {
  //     'phone': number,
  //     'password': password
  //   }
  //   api.post('/login',passenger)
  //   .then((res)=>console.log(res))
  //   .catch((error)=>console.log(error))

  

  //   // await api.get('/me', passenger)
  //   //   .then((res) => console.log(res))
  //   //   .catch((error) => console.log(error))
  // }


  // console.log(usersData)

  return (

    <div className='main-body'>
      <ToastContainer />

      <div className='form-container'>
        <div id='logo-login'><img src="https://brrlict.revstack.tech/cdn/partner/201909242915.png" alt="" /></div>
        <div className='login-second-part'>
          <h1>Bangladesh Railway</h1>
          <div className='login-second-part-second-div'>
            <p>নিরাপদ</p>
            <li>আরামদায়ক</li>
            <li>সাশ্রয়ী</li>
          </div>

        </div>
        <div className='login-third-part-third-div'>
          <form action="" onSubmit={handleSubmit}>
            <div className='login-third-part-forget'>
              <p>Forget Password?</p>
              <p>Need Help</p>
            </div>
            <div className='login-third-part-input'>
              <input className='part-input' type="text" value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Enter Number' />
              <div className='password-box'>
                <input className='part-input' value={password} onChange={(e) => setPassword(e.target.value)} type={`${showPass ? 'text' : 'password'}`} placeholder='Enter Password' />
                <i onClick={handleChange} class="eye fa-regular fa-eye"></i>
              </div>
              <button className={`login-btn part-input ${regAllow ? 'active-login-btn' : ''}`} disabled={regAllow == false} >

                <div id="regi">
                  <p>Login</p>
                </div>
                {loading ? <div id='loading_gif_div'>
                  <img src={loading_gif} alt="" />
                </div> : ''}


              </button>
            </div>
            <p>OR</p>
            <Link to={'/registration'}><h3>REGISTER?</h3></Link>
          </form>
        </div>
      </div>

    </div>
  )
}
