import React from 'react'
import '../css/footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className='footer'>
            
            <div className='company'>
                <img src="https://eticket.railway.gov.bd/assets/img/home/shohoz-synesis-vincen-jv.webp" alt="" />
            </div>
            <div id='middle-footer'>
                <Link to="/">Terms and Conditions | Privacy Policy</Link>
            </div>

            <div className='right-logo'>
                <div>
                <img src="https://brrlict.revstack.tech/cdn/partner/201909242915.png" width={90} height={90} alt="" />
                </div>
                <div>
                    Bangladesh Railway
                    <p>নিরাপদ . আরামদায়ক . সাশ্রয়ী</p>
                </div>
            </div>

        </div>
    
    </>
  )
}
