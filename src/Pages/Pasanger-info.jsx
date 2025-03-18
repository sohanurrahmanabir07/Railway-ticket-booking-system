import React, { useEffect, useRef, useState } from 'react'
import '../css/passenger_info.css'
import bkash from '../assets/logo/bkash.png'
import nagad from '../assets/logo/Nagad.png'
import rocket from '../assets/logo/rocket.png'
import upay from '../assets/logo/upay.png'

import visa from '../assets/logo/visa.png'
import mastercard from '../assets/logo/mastercard.png'
import dutchbangla from '../assets/logo/dutch-bangla.png'

import checked from '../assets/logo/checked.png'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import api from '../components/api'
import { addTrain, store } from '../components/redux'




export default function Passanger_info() {

  const [payment_method, setPayment_method] = useState('mobile-banking')
  const [payment_selected, setPaymentSelected] = useState('')
  const [total_amount, setTotal_Amount] = useState(null)


  let initial_amount = 0

  useEffect(() => {
    // console.log(payment_method)
  }, [payment_method])
  // ---------------------------calling  from redux------------------------------------
  const train = useSelector((state) => state.var.train)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.var.logged)[0]
  const home_page_info = useSelector((state) => state.var.home_page_info)
  const redx_total_amount = useSelector((state) => state.var.amount)


  console.log('train', train)
  // ---------------------------calling  from redux------------------------------------
  const [passenger_details, setPassenger_Details] = useState([])
  const newDetails = []
  const navigate = useNavigate()


  useEffect(() => {

    if (train && train.length > 0) {
      train.map((item, index) => {
        if (typeof (item) == 'object') {
          if (item.length > 2 && index == 0) {
            const temp = {
              'name': `${user.first_name + ' ' + user.sur_name}`,
              'passenger_type': 'Adult'

            }
            newDetails.push(temp)
          } else if (item.length > 2 && index != 0) {
            const temp = {
              'name': '',
              'passenger_type': 'Adult'

            }
            newDetails.push(temp)
          }
        }

      })
      setPassenger_Details(newDetails);
      // setTotal_Amount(train[train.length - 1]);
      setTotal_Amount(redx_total_amount)
    }

  }, []);

  const handlePassenger_Details = (e, index) => {
    const updatedPassenger_Details = [...passenger_details]

    console.log('initially passenger details', passenger_details)



    if (e.target.name == 'passenger_type' && passenger_details[index].passenger_type == 'Adult' && e.target.value == 'Child') {
      setTotal_Amount(parseInt(total_amount) - (Math.round(parseInt(train[index][3]) * .667)))
    } else if (e.target.name == 'passenger_type' && passenger_details[index].passenger_type == 'Child' && e.target.value == 'Adult') {
      setTotal_Amount(parseInt(total_amount) + (Math.round(parseInt(train[index][3]) * .667)))
    }


    // updatedPassenger_Details[index] = { ...updatedPassenger_Details[index], [e.target.name]: e.target.value }
    updatedPassenger_Details[index] = { ...updatedPassenger_Details[index], [e.target.name]: e.target.value }
    setPassenger_Details(updatedPassenger_Details)



  }

  const handlePaymentOption = (value) => {

    if (payment_selected != value) {
      setPaymentSelected(value)

    } else {
      setPaymentSelected('')
    }

  }
  const buyTicket = async () => {

    const state = store.getState().var
    console.log(state.access_token)

    let flag = false
    // console.log('length',passenger_details)
    console.log('Passenger_info', passenger_details)
    passenger_details.map((item, index) => {
      if (item.name == '') {
        toast.warning(`Passenger ${index + 1} detailas not filled`)
        flag = true

      }
    })
    if (flag == false) {
      let new_arr = []
      train.map((item, index) => {
        if (typeof (item) == 'object') {

          if (train.slice(-1)[0].length != 12) {
            const demo_pnr = 'ABCDEFGH12345678910IJKLMNOPQRSTUVWXYZ'
            let pnr = ''
            for (let i = 0; i < 12; i++) {
              const index = Math.floor(Math.random() * 35) + 0
              pnr += demo_pnr[index]

            }
            let temp_train = [...train]
            temp_train.push(pnr)
            dispatch(addTrain(temp_train))

          }




          let temp_arr = {
            'compartment_id': '',
            'passenger_id': '',
            'seat_number': '',
            'pnr': train.slice(-1)[0]
          }
          item.map((item2, index2) => {
            if (index2 == 0) {
              temp_arr.compartment_id = item2
            } else if (index2 == 2) {
              temp_arr.seat_number = item2
            }
          })
          temp_arr.passenger_id = train[2]
          new_arr.push(temp_arr)
          console.log(temp_arr)
          console.log(train)

        }
        
      })

      await api.post('/add_ticket',new_arr)
      .then((res)=>{
        if(res.data.status==200){
          toast.success('Ticket Successfully purchased',{
            autoClose:false
          })

          setTimeout(()=>{
            navigate('/ticket_purchased')
          },1500)

        }

      })
      .catch((error)=>{
        console.log(error.response.status)
        if(error.response.status==401 || error.response.status==403){
          toast.error('Session Unauthorized',{
            autoClose:false
          })

          setTimeout(() => {
            navigate('/login')
          }, 1500);
        }else{
          toast.warning('Token has Expired wait for Extension')

          const  refresh_token=async()=>{
            await api.post('/refresh')
            .then((res)=>{
              if(res.response.status==200){
                api.post('/add_ticket',new_arr)
                .then((res)=>{

                  if(res.data.status==200){
                    toast.success('Ticket Successfully purchased',{
                      autoClose:false
                    })

                    setTimeout(()=>{
                      navigate('/ticket_purchased')
                    },1500)


                  }


                })
                .catch((error)=>{
                  toast.error('Something went wrong')
                })

              }
            })
          }

        }



      })
    }
  }
  return (
    <>

      <div className='passanger_info'>

        <h2>Purchase Ticket</h2>
        <hr />
        <br />
        <br />
        <div className='main-section'>
          <section className='left'>
            <h3 id='section-heading'>PASSENGER DETAILS</h3>
            <hr id='hr' />
            {train.map((item, index) => {
              if (typeof (item) == 'object') {
                if (index == 0) {
                  return (
                    <div key={index} className='passenger-details'>
                      <h4>Passanger {index + 1}</h4>
                      <p>Name *</p>
                      <input disabled name='name' id='input_field' value={user?.first_name + ' ' + user?.sur_name} />
                      <p>Passenger Type</p>
                      <select id='input_field' disabled value={passenger_details[index]?.passenger_type || ''} name='passenger_type' className='passenger-type' >
                        <option value="Adult">Adult</option>
                        <option value="Child">Child</option>
                      </select>
                    </div>
                  )

                } else {
                  return (
                    <div key={index} className='passenger-details'>
                      <h4>Passanger {index + 1}</h4>
                      <p>Name *</p>
                      <input type="text" name='name' id='input_field' onChange={(e) => handlePassenger_Details(e, index)} value={passenger_details[index]?.name || ''} />
                      <p>Passenger Type</p>
                      <select id='input_field' onChange={(e) => handlePassenger_Details(e, index)} value={passenger_details[index]?.passenger_type || ''} name='passenger_type' className='passenger-type' >
                        <option value="Adult">Adult</option>
                        <option value="Child">Child</option>
                      </select>
                    </div>
                  )
                }
              }

            })}

            <div className='contact-information'>
              <h3>CONTACT INFORMATION</h3>
              <hr />
              <p>Mobile*</p>
              <input type="text" id='input_field' />
              <p>Email*</p>
              <input type="text" id='input_field' />
            </div>

          </section>
          <section className='right'>
            <div className='passenger-info-journey-details'>
              <h3 id='section-heading'>JOURNEY DETAILS</h3>
              <hr />
              <br />
              <h3> {train[0][6]} ({train[0][5]}) [{train[0][4].toUpperCase()}]</h3>
              <p>{home_page_info.from}-{home_page_info.to}</p>
              <span id='span'>
                <span id='dep'>Departure :</span>
                <span> Wed, 09 oct 2024, 06:30 AM</span>

              </span>
              <br />
              <hr />
              <span id='spann'>
                <span id='dep'>Coach: </span>
                <span><strong>{train[0][1]}</strong></span>
              </span><br />
              <span id='span'>
                <span id='dep'>Seat Type: </span>
                <span>{train[0][4]}</span>
              </span><br />
              <span id='span'>
                <span id='dep'>Seats: </span>
                {train.map((item, index) => {
                  if (typeof (item) == 'object') {
                    if (index == 0) {
                      return (
                        <span><strong>{item[2]}</strong></span>
                      )
                    } else {
                      return (
                        <span>,<strong>{item[2]}</strong></span>
                      )
                    }
                  }
                })}

              </span>
            </div>
          </section>

        </div>
        {/* ----------------------------------payment----------------------------------------- */}
      </div>
      <div className="payment-info">
        <ToastContainer />
        <section className='payment-left'>
          <h3 id='section-heading'>PAYMENT DETAILS</h3>
          <hr id='hr' />
          <br />
          <div className='payment-details-caution'>
            <div id='boxx'>
              <span>Total Amount Payable: </span><span id='tk'> <span>৳</span>{total_amount ? total_amount : '00'}</span>

            </div>
            <div id='image-train'>
              <img src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/BDRAILWAY_TICKETedb48de8b2dad8f59c9d24fd9399fbfe.jpg" alt="" />
            </div>
            <div id='boxx' >

              By clicking on the "PROCEED TO PAYMENT" button below, you acknowledge that you have read and agreed to the Terms & Conditions
              <br />

              <strong>Please complete your payment within 15 minutes, otherwise your seat(s) will be cancelled.</strong> <br />
              Provision for case in which tickets have been issued for trains not having room available for additional passenger:
              <br />
              <li>Fares shall be deemed to be accepted, and tickets to be issued, subject to the condition of there being room available in the train for which the tickets are issued.</li><br />
              <li>A person to whom a ticket has been issued and for whom there is not room available in the train for which the ticket was issued shall on returning the ticket within three hours after the departure of the train be entitled to have his fare at once refunded.</li><br />
              <li>A person for whom there is not room available for the class of carriage for which he has purchased a ticket and who is obliged to travel in a carriage of a lower class shall be entitled on delivering up his ticket to a refund of the difference between the fare paid by him and the fare payable for the class of carriage in which he traveled.
              </li>

            </div>
            <div className='payment-method'>
              <div className='payment-option-tab'>
                <div className={`mobile-banking-credit-debit-card ${payment_method == 'mobile-banking' ? 'active-border' : ''} `} onClick={() => { setPayment_method('mobile-banking'); setPaymentSelected('') }}>
                  <p>Mobile Banking</p>
                </div>
                <div className={`mobile-banking-credit-debit-card ${payment_method == 'card-payment' ? 'active-border' : ''} `} onClick={() => { setPayment_method('card-payment'); setPaymentSelected('') }}>
                  <p>Credit or Debit Card</p>
                </div>
              </div>
              <div className={`select-payment-method ${payment_method == 'mobile-banking' ? 'active-payment' : ''} `}>
                <p>Please select your mode of Payment Method</p>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('bkash')}>
                  <div >
                    <img src={bkash} id='img' alt="" />
                    {payment_selected == 'bkash' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>

                </div>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('nagad')}>
                  <div >
                    <img src={nagad} id='img' alt="" />
                    {payment_selected == 'nagad' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>

                </div>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('rocket')}>
                  <div >
                    <img src={rocket} id='img' alt="" />
                    {payment_selected == 'rocket' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>

                </div>
                <div id='upay' className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('upay')} >
                  <div>
                    <img src={upay} id='img' alt="" />
                    {payment_selected == 'upay' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>

                </div>

                <div id='btn-container'><button disabled={payment_selected == ''} onClick={buyTicket} className={`btn-continue-purchase ${payment_selected != '' ? 'activee' : ''}`}>CONTINUE PURCHASE</button></div>
              </div>



              {/* -----------------for banking-------------------------- */}

              <div className={`select-payment-method ${payment_method == 'card-payment' ? 'active-payment' : ''}`}>
                <p>Please select your mode of Payment Method</p>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('visa')} >
                  <div>
                    <img src={visa} id='img' alt="" />
                    {payment_selected == 'visa' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>

                </div>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('mastercard')} >
                  <div>
                    <img src={mastercard} id='img' alt="" />
                    {payment_selected == 'mastercard' ? (<img src={checked} width={17} height={17} alt="" />) : ''}

                  </div>

                </div>
                <div className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('rocket')} >
                  <div>
                    <img src={rocket} id='img' alt="" />
                    {payment_selected == 'rocket' ? (<img src={checked} width={17} height={17} alt="" />) : ''}

                  </div>

                </div>
                <div id='upay' className="bkash-nagad-rocket-upay" onClick={() => handlePaymentOption('dutchbangla')} >
                  <div>
                    <img src={dutchbangla} id='img' alt="" />
                    {payment_selected == 'dutchbangla' ? (<img src={checked} width={17} height={17} alt="" />) : ''}
                  </div>
                </div>
                <div id='btn-container'><button disabled={payment_selected == ''} onClick={buyTicket} className={`btn-continue-purchase ${payment_selected != '' ? 'activee' : ''}`}>CONTINUE PURCHASE</button></div>

              </div>


            </div>

          </div>
        </section>
        <section className='payment-right'>
          <div className='passenger-info-journey-details'>
            <h3 id='section-heading'>FARE DETAILS</h3>
            <hr />
            <div>
              <p>Ticet Price</p>
              <p>{total_amount}</p>
            </div>
            <div>
              <p>VAT</p>
              <p>5%</p>
            </div>
            <div>
              <p>Service Charge</p>
              <p>40</p>
            </div>
            <div>
              <p><h4>**Total</h4></p>
              <p><h4>{total_amount + Math.round(total_amount * 0.05) + 40}</h4></p>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}
