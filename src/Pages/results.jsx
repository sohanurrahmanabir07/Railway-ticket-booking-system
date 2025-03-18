import React, { useEffect, useState } from 'react'
import loading_gif from '../assets/logo/loading.gif'
import '../css/results.css'
// import '../components/css_comp/seat_selection.css'
import { useSelector, useDispatch } from 'react-redux'
import Result_train from '../components/result_train'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { addTrain, store } from '../components/redux'
import Date_modifier from '../components/css_comp/Date_modifier'


export default function Results() {

  const home_page_info = useSelector((state) => state.var.home_page_info)
  const [loading, setLoading] = useState(false)
  const [train_name_class, setTrain_Name_Class] = useState({})
  const [all_info, setAll_info] = useState([])
  const [selected, setSelected] = useState([])
  const [total_amount, setTotal_Amount] = useState(0)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.var.logged)
  const redx_selected = useSelector((state) => state.var.selected)
  const redx_seat_details = useSelector((state) => state.var.seat_details)
  const redx_total_amount = useSelector((state) => state.var.amount)
  const state = store.getState().var



  useEffect(() => {



    const search_train = async () => {
      setLoading(true)
      const from_to = {
        from: home_page_info?.from,
        to: home_page_info?.to
      }
      await axios.post('http://127.0.0.1:8000/api/train_details', from_to)
        .then((res) => {

          if (res.status == 200) {
            const data = res.data.data
            console.log('data',data)
            const { train_class_info, info } = making_train_data_from_api(data)
            setTrain_Name_Class(train_class_info)
            setAll_info(data)
          }else{
            console.log(res)
            toast.error('No Train Found')
          }
        })


          
        .catch((error) => {

          toast.warning('Data Unavailable')
          setTrain_Name_Class({})
          setLoading(false)
        })
        .finally(() => {

          setTimeout(() => {
            setLoading(false)
          }, 2000);

        })
    }
    search_train();
  }, [home_page_info])


  useEffect(() => {

    setSelected(redx_selected)
    setTotal_Amount(redx_total_amount)
  }, [])

  const making_train_data_from_api = (data) => {
    // setLoading(true);
    const dic = {};

    data.forEach(item => {
      const trainID = item.train_id
      const trainName = item.train_name;
      const className = item.class_name;

      // Initialize the entry if it doesn't exist
      if (!dic.hasOwnProperty(trainName)) {
        dic[trainName] = [trainID, className];
      } else {
        // Add the class only if it's not already present
        if (!dic[trainName].includes(className)) {
          dic[trainName].push(className);
        }
      }
    });

    return { train_class_info: dic, info: data };;
  }
  const clearPreviousSelections = () => {
    setSelected([])
    setTotal_Amount(0)
  }
  const train = useSelector((state) => state.var.train)
  const handleSelected = () => {



    if ((loginUser).length > 0 && selected[(selected.length) - 1].length > 2) {

      setSelected((prev) => {

        const newBooked = [...redx_selected, loginUser[0].passenger_id, total_amount]
        dispatch(addTrain(newBooked))

        return newBooked

      })
      navigate('/passangerinfo')

    }else{
      toast.error('You are not logged in')
      
    } 



  }

  return (
    <>
      <div className='results'>
        <ToastContainer />

        <section className='container-1'>
          <div className='container-1-element'>
            <div className='left-image'>
              <div className='train-image'>
                <img src="https://eticket.railway.gov.bd/assets/img/train-app/running-train-icon.svg" alt="" />
              </div>
              <div className='journey-info'>

                <h3>{home_page_info.from} - {home_page_info.to}</h3>
                <h4>{home_page_info.date}</h4>

              </div>
            </div>

            <div className='middle'>
              <div className='prev'>
                <span><i class="fa-solid fa-angle-left"></i></span>
                <span>Prev</span>
              </div>
              <div className='next'>

                <span>Next</span>
                <span><i class="fa-solid fa-angle-right"></i></span>
              </div>
            </div>

            <div>
              <button className='modify'>Modify Search</button>
            </div>
          </div>


        </section>




        {loading ? (<div id='loading_holder'  ><img id='loadingGif' src={loading_gif} /></div>)



          :
          (<section className='container-2'>
            <div className='results-left'>


              {Object.entries(train_name_class).map(([train_name, details], index) => (
                <Result_train key={index} selected={selected} setSelected={setSelected} total_amount={total_amount} setTotal_Amount={setTotal_Amount} all_info={all_info} train_name={train_name} trainID_classDetails={details} />
              ))}







            </div>
            <div className='results-right'>
              {/* 
              ___________________________________imported__________________ */}
              <div className="right-child-result">

                <h2>Seat Details</h2>
                <div id='ticket-details'>
                  <p>Class</p>
                  <p>Seats</p>
                  <p>Fare</p>
                </div>


                {selected.map((item) => (

                  <>

                    <div id='tickets'>

                      <div>
                        {item[4] == 'AC Berth' ? (
                          <>

                            <p>{item[4].slice(0, 4)}</p>
                            {/* <br /> */}
                            <p>-{item[1]}</p>
                          </>



                        ) : (

                          <>

                            <p>{item[4]}</p>
                            <p>-{item[1]}</p>
                          </>

                        )}
                      </div>
                      <p>{item[2]}</p>
                      <p>{item[3]}</p>


                    </div>
                    <hr />
                  </>

                )



                )}


                <div id='Total-amount'>


                  <h3>Total: ৳ {total_amount} </h3>
                </div>

                <div id='btn-purchase'><button onClick={selected.length > 0 ? () => { handleSelected() } : null} disabled={selected.length < 1} className={`btn-continue-purchase ${selected.length > 0 ? 'activee' : ''}`} >CONTINUE PURCHASE</button></div>

              </div>



              {/* ___________________________________imported__________________  */}


              <div className='img-1'>
                <img src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/BDRAILWAY_TICKET9dbb68e355ee6032758b83a2feeff8e7.png" alt="" />
              </div>
              <div className='img-1'>
                <img src="https://bangladesh-railway.s3-ap-southeast-1.amazonaws.com/production/content-media/BDRAILWAY_TICKETbe588a4fa116054d56dd82632fa1d801.png" alt="" />
              </div>

            </div>
          </section>)}

      </div>
    </>
  )
}
