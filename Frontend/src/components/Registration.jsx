import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, logoutUser, addUser } from '../components/redux'
import '../css/login.css'
import loading_gif from '../assets/logo/croped.gif'
import axios from 'axios'

export default function Registration() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.var.user)
    const [size, setSize] = useState(users.length)
    const [showPass, setshowPass] = useState(false)
    const [number, setNumber] = useState('')
    const [passwordd, setPassword] = useState('')
    const [re_write_password, setRepassword] = useState('')
    const [regAllow, setregAllow] = useState(false)
    const navigate = useNavigate()
    const [user_info, setUserInfo] = useState([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(
        {
            id: users.length,
            first_name: '',
            sur_name: '',
            phone: '',
            email: '',
            address: '',
            date_of_birth: '',
            nid: '',
            password: ''

        }

    )
    const handleForm = (e) => {
        const { name, value } = e.target;
        setUser((prev_info) => ({
            ...prev_info,
            [name]: value
        }))


    }
    // console.log(users)
    if (users.length > size) {
        // alert('Added')
        setSize(users.length)
        // console.log(users)
    }

    useEffect(() => {
        if (user.first_name !== '' && user.sur_name !== '' && user.address !== '' && user.email !== '' && user.nid !== '' && passwordd !== '' && re_write_password !== '') {
            setregAllow(true)
        } else {
            setregAllow(false)
        }
    }, [user.first_name, user.sur_name, user.address, user.email, passwordd, re_write_password, user.nid])

    const handleChange = () => {
        setshowPass(!showPass)
    }


    async function FormSubmission(e) {
        e.preventDefault()
        setLoading(true)

        const size = users.length

        if (passwordd == re_write_password) {
            setUserInfo({
                ...user,
                password: passwordd
            })

            const updateUser = {
                ...user,
                password: passwordd

            }
            await axios.post('http://127.0.0.1:8000/api/add_passenger', updateUser)
                .then((res) => {
                    console.log(res)
                    toast.success('Registered successfully')
                    dispatch(logoutUser()) //logouting first 
                    dispatch(loginUser(res.data.user))
                    if (res.status == 200) {

                        setTimeout(() => {
                            toast.success('Taking to homepage',{
                                autoClose:false
                            })
                        }, 1000);

                        setTimeout(() => {
    
                            navigate('/')
                        }, 2000);

                    } else {
                        toast.error('Failed to Register')
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)

                    toast.warn('Something went wrong', {
                        transition: 'Slide'
                    });

                })


            dispatch(addUser(updateUser))



        }

        setUser(
            {
                first_name: '',
                sur_name: '',
                phone: '',
                email: '',
                address: '',
                date_of_birth: '',
                nid: '',
                password: ''

            }
        )
        setPassword('')
        setRepassword('')

    }


    return (
        <div className='main-body'>
            <ToastContainer />
            <section className='reg-body'>
                {/* {(user_info)} */}

                <div className='login-third-part-third-div'>
                    <form action="" onSubmit={regAllow && FormSubmission}>
                        <h2 style={{ color: 'gray' }}>Registration</h2>
                        <br />
                        <div className='login-third-part-input'>
                            <div className='firstname-surname'>
                                <input id='part-input' name='first_name' type="text" value={user.first_name} onChange={handleForm} placeholder='Enter First Name' />
                                <input id='part-input' name='sur_name' type="text" value={user.sur_name} onChange={handleForm} placeholder='Enter Surname' />

                            </div>

                            <input id='part-input' name='phone' type="text" value={user.phone} onChange={handleForm} placeholder='Enter Phone ' />
                            <input id='part-input' name='email' type="text" value={user.email} onChange={handleForm} placeholder='Enter Email' />
                            <input id='part-input' name='address' type="text" value={user.address} onChange={handleForm} placeholder='Enter Adderss' />
                            <input id='part-input' name='date_of_birth' type="text" value={user.date_of_birth} onChange={handleForm} placeholder='Enter Date of Birth' />
                            <input id='part-input' name='nid' type="text" value={user.nid} onChange={handleForm} placeholder='Enter NID/ Birth Certificate' />
                            <div className='password-box'>
                                <input id='part-input' value={passwordd} onChange={(e) => setPassword(e.target.value)} type={`${showPass ? 'text' : 'password'}`} placeholder='Enter Password' />
                                <i onClick={handleChange} class="eye fa-regular fa-eye"></i>
                            </div>
                            <div className='password-box'>
                                <input id='part-input' value={re_write_password} onChange={(e) => setRepassword(e.target.value)} type={`${showPass ? 'text' : 'password'}`} placeholder='Re-writePassword' />
                                <i onClick={handleChange} class="eye fa-regular fa-eye"></i>
                            </div>

                            <button className={`login-btn ${regAllow ? 'active-login-btn' : ''}`} disabled={regAllow == false} id='part-input'>

                                <div id="regi">
                                    <p>Register</p>
                                </div>
                                {loading ? <div id='loading_gif_div'>
                                    <img src={loading_gif} alt="" />
                                </div> : ''}


                            </button>
                        </div>
                        <br />
                        <p>Already Have Account?</p>
                        <br />
                        <Link to={'/login'}><h3>Login?</h3></Link>
                    </form>
                </div>

            </section>

            {/* <div>
                {user_info.length>0&&user_info.map((item)=>(
                    <p>{item.address}</p>
                ))}
            </div> */}

        </div>
    )
}
