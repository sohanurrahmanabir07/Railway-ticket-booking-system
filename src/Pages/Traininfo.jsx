import React, { useState, useRef, useEffect } from 'react'
import '../css/Traininfo.css'
import Seat_selection from '../components/seat_selection'
import axios from 'axios'
import { toast } from 'react-toastify'
import Form_input from '../components/form'
import location from '../assets/logo/location.png'
import arrow from '../assets/logo/arrow-down.png'
import traininfo from '../assets/images/train-info.svg'
import loading_gif from '../assets/logo/loading.gif'
export default function Traininfo() {

  const [search_train, setSearching_Train] = useState('')
  const [train_id, setTrain_ID] = useState('')
  const [train_route, setTrain_Route] = useState(null)
  const [train_info, setTrain_Info] = useState(null)
  const [Found, setFound] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result_show, setResult_Show] = useState(false)
  const [show_result, setShow_Result] = useState(false)
  let search_result = null

  useEffect(() => {

    async function get_train_name() {
      setLoading(true)
      await axios.get('http://127.0.0.1:8000/api/get_train_info')
        .then((res) => {
          console.log(res)
          setTrain_Info(res.data.train_info)
        })
        .catch((error) => toast.error('Something Went Wrong'))
        .finally(
          setLoading(false)
        )
    }
    get_train_name()
  }, [])


  if (train_info != null) {
    search_result = train_info?.filter((item, index) => item.train_name.toLowerCase().includes(search_train.toLowerCase()))

  }

  const handleSearching = async () => {

    setLoading(true)
    if (train_id != '') {
      await axios.get(`http://127.0.0.1:8000/api/get_train_route/${train_id}`)
        .then((res) => {

          
          if (res.status == 200) {
            console.log(res.data.train)
            setTrain_Route(res.data.train)
          } else {
            toast.error('No Routes Available Yet')
          }
        })
        .catch((error) => toast.error('Server Error'))
        .finally(
          setLoading(false)
        )
    }



  }



  return (


    <>

      {loading ? <div id='loading_holder'  ><img id='loadingGif' src={loading_gif} /></div>
        :

        (

          <section className="container-train-info">

            <div className='left-train-info'>
              <h2>Select Your Preferred Train</h2>
              <div className='searching-box'>
                <p>TRAIN NAME</p>
                <input type="text" placeholder='SELECT TRAIN' onChange={(e) => {
                  setSearching_Train(e.target.value);
                  setShow_Result(true)
                }} value={search_train} />

                {show_result && search_train ?
                  (
                    <div className='show_results'>

                      {search_result?.slice(0, 4).map((item, index) => {

                        return (<h4 key={index} onClick={() => { setSearching_Train(item.train_name); setShow_Result(false); setTrain_ID(item.train_id) }}>{item.train_name} ({item.train_id})</h4>)

                      })}

                    </div>
                  )
                  :
                  ''}
              </div>
              <button onClick={search_train ? handleSearching : null} >SEARCH</button>
            </div>

            <div className="right-train-info">

              {train_route!=null ?

                (
                  <>



                    <div className='train-routes'>




                      <div className='train-name-info'>
                        {train_route ?

                          (<h4>
                            {train_route[0].train_name}
                            ({train_route[0].train_id})
                          </h4>)
                          :
                          'No Train '
                        }
                      </div>
                      <h3 id='routes'>Routes</h3>


                      {train_route?.map((item, index) => {

                        if (index == 0) {
                          return (
                            <div className='route-info' key={index}>

                              <div className='icon-station'>

                                <img src={location} alt="" />
                                <p>{item.station_name}</p>

                              </div>

                              <table>
                                <tr>
                                  <td id='initial-value'>

                                    <p>Arrival: - - - - - - -</p>
                                  </td>
                                  <td><p>Departure: {item.reach_time} </p></td>
                                </tr>
                              </table>
                            </div>
                          )



                        } else if (index == train_route?.length - 1) {
                          return (
                            <div className='route-info' key={index}>

                              <div className='icon-station'>

                                <img src={location} alt="" />
                                <p>{item.station_name}</p>

                              </div>

                              <table>
                                <tr>
                                  <td id='initial-value'>


                                    <p>Arrival: {item.reach_time}</p>
                                  </td>
                                  <td><p>Departure: - - - - - - -</p></td>
                                </tr>
                              </table>
                            </div>
                          )
                        } else {
                          return (
                            <div className='route-info' key={index}>

                              <div className='icon-station'>

                                <img src={arrow} alt="" />
                                <p>{item.station_name}</p>

                              </div>

                              <table>
                                <tr>
                                  <td id='initial-value'>
                                    <p>Arrival: {item.reach_time} </p>
                                  </td>
                                  <td><p>Departure: Few Minutes </p></td>
                                </tr>
                              </table>
                            </div>
                          )
                        }

                      })}






                    </div>
                  </>
                )

                : (
                  <>
                    <div className='train-info-image'>

                      <img src={traininfo} alt="" /><br /><br />
                      <p>Please select your preferred train to see the</p><br />
                      <p>detailed information of your selected train.</p>


                    </div>
                  </>


                )}

            </div>

          </section>


        )

      }



    </>



  )
}
