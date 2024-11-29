import React, { useState } from 'react'
import '../css/Profile.css';


const Profile = () => {
    let [change, setChange] = useState(false)
    return (
        <>
            <body>
                <div className='profile-infoo'>
                    <h3> Profile</h3>
                    <hr />
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <p>Name</p>
                        <div className='place'>
                            <p>Lamisa</p>
                        </div>
                    </div>
                    <div>
                        {
                            change == true ?
                                ''
                                :
                                (<div className='input'>
                                    <p>Email</p>
                                    <div className='place'>
                                        <p>lamisasharmin2@gmail.com</p>
                                    </div>
                                </div>)
                        }
                    </div>

                    <div className='input'>
                        <p>Primary Mobile Number</p>
                        <div className='place'>
                            <p>01705365949</p>
                        </div>
                    </div>
                    <div>
                        {
                            change == true ? (<div className='input'>
                                <p>Alternative Mobile Number</p>
                                <div className='place_input'>
                                    <input type='text' placeholder='Enter Alternative Number' />
                                    <p>Alternative number must be unique and not registered.</p>
                                </div>
                            </div>)
                                : ''
                        }
                    </div>
                    <div>
                        {
                            change == true ?
                                ((<div className=''>
                                    <p>Email</p>
                                    <div className='place_all'>
                                        <input type="text" placeholder='lamisasharmin2@gmail.com' />
                                    </div>
                                </div>))
                                :
                                ((<div className='input'>
                                    <p>Identification Number</p>
                                    <div className='id_verified'>
                                        <div className='place'>
                                            <p>9582454055</p>
                                        </div>
                                        <div className='veri'>
                                            <p className='verified'>Verified</p>
                                        </div>
                                    </div>
                                </div>))
                        }
                    </div>

                    <div>
                        {
                            change == true ?
                                ''
                                :
                                (<div className='input'>
                                    <p>Date of Birth</p>
                                    <div className='place'>
                                        <p>2000-10-27</p>
                                    </div>
                                </div>)
                        }

                    </div>
                    <div className='input'>
                        <p>Postal Code</p>
                        <div className='place'>
                            {
                                change == true ?
                                    (<input type="text" placeholder='4000' />)
                                    :
                                    <p>4000</p>
                            }
                        </div>
                    </div>
                    <div className='input'>
                        <p>Address</p>
                        <div className='place_add'>
                            {
                                change == true ?
                                    (<input type="text" placeholder='16 Jamal Khan, Ambia Serene, chittagong' />)
                                    :
                                    <p>16 Jamal Khan, Ambia Serene, chittagong</p>
                            }
                        </div>
                    </div>
                </div>
                {
                    change == true ?
                        (
                            <div>
                                <button className='edit_button'>SAVE</button>
                                <button className='cancel_button' onClick={() => setChange(false)}>Cancel</button>
                            </div>
                        )
                        :
                        (
                            <button className='edit_button' onClick={() => setChange(true)}> Edit Profile</button>
                        )
                }
            </body>

        </>
    )
}

export default Profile