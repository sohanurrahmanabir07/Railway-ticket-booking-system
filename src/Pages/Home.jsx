import React, { useEffect } from 'react'
import Trainsearching from '../components/trainsearching'
import { useSelector } from 'react-redux'
import '../css/home.css'
import { toast, ToastContainer } from 'react-toastify'
import Dropdwon from '../components/dropdwon'
import { store } from '../components/redux'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Home() {

  const state=store.getState().var
  const navigate=useNavigate()
  const location=useLocation()
  const time=Date.now()/1000



  return (
    <>
      <div className='container-wrapper'>
        <ToastContainer/>

        <div className='first-container' >
          <div id='train_searching'> <Trainsearching /></div>
          <div className='image-train'><img src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/BDRAILWAY_TICKET66d3b68a83b1c4cc05aa5b8d1ab3b7ec.jpg" alt="" /></div>
        </div>


        <div className='second-container'>

          <div className='first-img'>

            <div className='second-container-image'><img src="https://eticket.railway.gov.bd/assets/img/home/search.svg" alt="" width={300} height={250} /></div>
            <h1>Search</h1>
            <p>Choose your origin, destination, journey dates and search for trains</p>

          </div>

          <div className='first-img'>

            <div className='second-container-image'><img src="https://eticket.railway.gov.bd/assets/img/home/select.svg" alt="" width={300} height={250} /></div>
            <h1>Select</h1>
            <p>Select your desired trip and choose your seats</p>

          </div>
          <div className='first-img'>

            <div className='second-container-image'><img src="https://eticket.railway.gov.bd/assets/img/home/pay.svg" alt="" width={300} height={250} /></div>
            <h1>Pay</h1>
            <p>Pay for the tickets via Debit / Credit Cards or MFS</p>

          </div>

        </div>

      </div>



    </>
  )
}
