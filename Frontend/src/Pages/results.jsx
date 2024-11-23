import React, { useEffect, useState } from 'react'
import loading_gif from '../assets/logo/loading.gif'
import '../css/results.css'
// import '../components/css_comp/seat_selection.css'
import { useSelector, useDispatch } from 'react-redux'
import Result_train from '../components/result_train'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { addTrain } from '../components/redux'


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





  useEffect(() => {



    const search_train = async () => {
      setLoading(true)
      const from_to = {
        from: home_page_info.from,
        to: home_page_info.to
      }
      await axios.post('http://127.0.0.1:8000/api/train_details', from_to)
        .then((res) => {
          const data = res.data.data
          const { train_class_info, info } = making_train_data_from_api(data)
          setTrain_Name_Class(train_class_info)
          setAll_info(data)
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



    if ((loginUser).length>0 && selected[(selected.length) - 1].length > 2) {

      setSelected((prev) => {

        const newBooked = [...prev, loginUser[0].passenger_id, total_amount]
        dispatch(addTrain(newBooked))

        return newBooked

      })
      navigate('/passangerinfo')

    }else{
      
      toast.warning('PLease Login First')

      setTimeout(() => {
        navigate('/login')
      }, 1500);
    }
    // if(loginUser){
    //   navigate('/passangerinfo')
    // }else{
    //   navigate('/login')
    //   toast.warning('PLease Login First')
    // }
    // console.log('loginUser',login)
    



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

                <h3>Dhaka - Sylhet</h3>
                <h4>27-September-2024 </h4>

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
