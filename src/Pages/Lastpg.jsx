import React from 'react'
import { Link } from 'react-router-dom'
import Information from '../components/Information'
import '../components/css_comp/Information.css';
import '../css/Lastpg.css';
import { useSelector } from 'react-redux';

const Lastpg = () => {

    const user=useSelector((state)=>state.var.logged)



    return (

        <div className='pay_info'>
            <div className='payment'>
                <p>Payment Successful!</p>
                <h4>Hi {user[0]?.first_name+' '+user[0]?.sur_name}, We have successfully confimred your ticket!</h4>
                <h5> We request you to read the following</h5>
                <li>
                    To receive a Bangladesh Railway printed ticket, download and show a copy of the printed ticket at the counter.
                </li>
                <li>
                    For cancellation and refund. please show the printed ticket at the station counters.
                </li>
                <li>
                    You are requested to check your 'Spam'/'Junk' email folder, in case the ticket email has landed there. Please mark the email as 'Not Spam' and add the sender to your trusted contact list to receive emails in your inbox in the future.
                </li>
                <li>
                    If you have not received your email after a few hours, please send a support request email at <span></span>
                    <a href="">support@eticket.railway.gov.bd</a>.
                </li>

                <li>
                    Please note that email containing PDF tickets may be delayed for technical reasons. In that case, you can always download your ticket from the "Purchase History" section of the website or "My Tickets" section of Rail Sheba app.
                </li>
                <button className="print_button">Print your ticket now!</button>
            </div>
            <Information/>
        </div>

    )

}

export default Lastpg