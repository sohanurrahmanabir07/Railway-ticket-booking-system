import React, { useState, useEffect, useRef } from 'react'
import './css_comp/seat_selection.css'
import horizontal_loading from '../assets/logo/horizontal_loading.gif'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { insert_selected, clear_selected, clear_all_selected } from './redux'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'


export default function Seat_selection(props) {

  const seat = []
  const [booked, setBooked] = useState([18, 19, 30])
  const compartment = props.compartment
  const [sortedCompartment, setSortedCompartment] = useState([]);
  const [currentCompartment, setCurrentCompartment] = useState()
  const [selected_compartment, setSelected_Compartment] = useState([])
  const [seat_limited, setSeat_Limited] = useState(false)
  const [loading, setLoading] = useState(false)



  const { total_amount, setTotal_Amount, selected, setSelected, setSeat_Details, seat_detials } = props


  let row_count = 0;
  const dispatch = useDispatch()


  const get_booked_seat = async (compartment_id) => {
    setLoading(true)
    await axios.get(`http://127.0.0.1:8000/api/get_booked_seat/${compartment_id}`)
      .then((res) => {

        setTimeout(() => {
          setLoading(false)
          setBooked(res.data.data)
        }, 1500);


      })
      .catch((error) => console.log('Error'.error))
  }



  useEffect(() => {

    compartment.sort((item1, item2) => (item1.remaining_seat < item2.remaining_seat) ? 1 : -1)
    setCurrentCompartment(compartment[0])
    setSelected_Compartment(compartment[0]?.compartment_id)
    setSortedCompartment(compartment)
    get_booked_seat(compartment[0]?.compartment_id)




  }, [compartment])
  const column = 5


  const row = currentCompartment ? ((Math.floor(currentCompartment.total_seat) / column) + 1) : 0



  const navigate = useNavigate()
  let count = 1
  useEffect(() => {

    const check_seat = () => {

      if (selected.length == 4) {
        setSeat_Limited(true)
      } else {
        setSeat_Limited(false)
      }

    }
    check_seat();
  }, [selected])
  const clear_all_selected_seats = () => {
    setSelected([])
    setSeat_Details([])
    setTotal_Amount(0)

  }



  const handleBooked = (key, seatnumber) => {
    const newBooked = selected.filter((item) => item[2] == key[2] && item[0] == key[0])
    if (newBooked.length < 1) {

      if (selected.length > 0) {
        if (selected[0][5] == key[5]) {

          setSelected((prevValue) => [...prevValue, key])
          setSeat_Details((prev) => [...prev, key])
          setTotal_Amount((prev) => prev + parseInt(key[3]))

        } else {


          const prev_train = selected[0][6]
          toast.warning(`You have previously selected in ${prev_train}`, {
            autoClose: false
          })

          setTimeout(() => {
            toast.info('Tap here to remove prevous selection', {
              onClick: () => {
                clear_all_selected_seats();
              },
              autoClose: false
            })
          }, 1000);
        }

      } else {
        setSelected((prevValue) => [...prevValue, key])
        setSeat_Details((prev) => [...prev, key])

        setTotal_Amount((prev) => prev + parseInt(key[3]))



      }




    } else {
      const newBooked = selected.filter((item) => !(item[0] == key[0] && item[2] == key[2]))
      setSelected(newBooked)
      setSeat_Details(newBooked)
      setTotal_Amount((prev) => prev - parseInt(key[3]))


    }
    console.log('selecetd seaet',selected)





  }



  for (let i = 0; i < row; i++) {
    const roww = []

    if ((i == Math.floor(row / 2))) {
      roww.push(<div key={i} >
        <br />
        <br />
      </div>)
    } else {

      for (let j = 0; j < column + 1; j++) {
        if (j == 2 || (i == Math.floor(row / 2))) {
          roww.push(
            <div id="space" key={`${i}-${j}`}>

            </div>
          )
        } else {
          const currenCount = count
          // const key_value=`${currentCompartment.compartment_id}-${currentCompartment.compartment_name}-${currenCount}`
          const key_value = [currentCompartment.compartment_id, currentCompartment.compartment_name, currenCount, currentCompartment.price, currentCompartment.class_name, currentCompartment.train_id, currentCompartment.train_name]
          if (booked.find((i) => i == count)) {
            roww.push(<div id='seat-booked' key={key_value}>
              {currentCompartment.compartment_name}-{count}
            </div>)
          } else if (selected.find((i) => i[2] == key_value[2] && i[0] == key_value[0])) {

            roww.push(<div id='seat-selected' onClick={() => handleBooked(key_value, currenCount)} key={key_value}>
              {currentCompartment.compartment_name}-{count}
            </div>)

          }


          else {
            roww.push(<div id={`seat${seat_limited ? 'limited' : ''}`} disabled={seat_limited == true} onClick={!seat_limited ? () => handleBooked(key_value, currenCount) : null} key={key_value}>
              {currentCompartment.compartment_name}-{count}
            </div>)
          }

          count++
        }


      }

    }


    seat.push(roww)

  }
  const Change_Compartment = (e) => {
    const key_value = e.target.value
    const choosen_compartment = sortedCompartment.filter((item) => item.compartment_id == key_value)
    setCurrentCompartment(choosen_compartment[0])
    setSelected_Compartment(choosen_compartment[0].compartment_id)
    get_booked_seat(choosen_compartment[0]?.compartment_id)



  }




  return (
    <>

      <div id='select_show'>
        <div id='caution'>Choose your seat(s)** Maximum 4 seats can be booked at a time.</div><hr />
        <div id='caution'><p>To know seat number(s), rest the cursor on your desired seat(s). Click on it to select or deselect.</p></div>

        <section className='parent'>

          <div className='left-child'>

            <h2>Select Coach</h2>
            <select name="" multiple={false} value={selected_compartment} onChange={Change_Compartment} id="select-coach" >
              {compartment.map((item) => (
                <option key={item.compartment_id} value={item.compartment_id}>{item.compartment_name}-{item.remaining_seat}</option>
              ))}
            </select>

            <div className="seat-status">
              <div className='available'>
                <p>Available</p>
                <div id='box'>

                </div>
              </div>
              <div className='available' id='booked'>
                <p>Booked</p>
                <div id='box'>

                </div>
              </div>
              <div className='available' id='selected'>
                <p>Selected</p>
                <div id='box'>

                </div>
              </div>

            </div>


            <div className="seat-choose">

              {loading ? 
              
              <div>

                <img src={horizontal_loading} alt="" width={90} height={50}  style={{color:'black'}} />

              </div> :


                seat.map((item, index) =>


                (
                  <div id='row' key={index}>
                    {item.map((element, index) => (
                      element
                    ))}
                  </div>

                )

                )




              }


            </div>


          </div>

          {/* <div className="right-child">

            <h2>Seat Details</h2>
            <div id='ticket-details'>
              <p>Class</p>
              <p>Seats</p>
              <p>Fare</p>
            </div>


            {seat_detials.map((item) => (


              <div id='tickets'>

                <p >{item[4] == 'AC Berth' ? item[4].slice(0, 4) : item[4]}-{item[1]}</p>
                <p>{item[2]}</p>
                <p>{item[3]}</p>


              </div>
            )



            )}

            <div id='Total-amount'>


              <h3>Total: ৳ {total_amount} </h3>
            </div>

            <div id='btn-purchase'><button onClick={() => navigate('/passangerinfo')} id='btn-continue-purchase'>CONTINUE PURCHASE</button></div>
            <button onClick={()=>setSeat_Details([])}> Reset</button>
          </div> */}



        </section>
      </div>

    </>
  )
}
