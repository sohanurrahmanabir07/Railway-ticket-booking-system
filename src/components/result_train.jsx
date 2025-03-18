import React, { useState, useRef, useEffect } from 'react'
import './css_comp/result_train.css'
import Seat_selection from './seat_selection'
import { useSelector } from 'react-redux'

export default function Result_train(props) {

    const showClassInfo = useRef(null)
    const seat_Show = useRef(null)
    const [show, setShow] = useState(false)
    const [dekhao, setDekhao] = useState(false)
    const [height, setHeight] = useState(0)
    const journey_info = useSelector((state) => state.var.home_page_info)
    const [filtered_data_for_seat_selection,setFor_seat_selection]=useState([])
    const [seat_details,setSeat_Details]=useState([])

    const {total_amount,setTotal_Amount,selected,setSelected}=props


    useEffect(() => {
        if (seat_Show.current) {
            setHeight(seat_Show.current.scrollHeight); // Update the height after DOM renders
        }
    }, [dekhao]);


    useEffect(() => {


        const class_info = showClassInfo.current
        if (show) {
            // class_info.style.maxHeight= `${(class_info.scrollHeight)+200}px`
            class_info.style.maxHeight = `${(class_info.scrollHeight)}px`
            // console.log(class_info.maxHeight)
        }
        else {
            class_info.style.maxHeight = `0px`
        }
    }, [show])

    const seat=(trainID,class_name)=>{
        const info=props.all_info
        const filtered_info=info.filter((item)=>item.train_id==trainID && item.class_name==class_name)
        setFor_seat_selection(filtered_info)



    }

   const clearPreviousSelections=props.clearPreviousSelections



    return (

            <div className='train-info'>
                <div className='train-name' onClick={() => { setShow(!show); setDekhao(false) }}>
                    <h3>{props.train_name}</h3>
                    <i className={`up-down fa-solid fa-angle-up ${show ? 'up-down-active' : ''}`} style={{ color: '#eaae0b' }}></i>
                </div>
                <div className={`class-info`} ref={showClassInfo}>
                    <div className='train-timing-details'>
                        <div className='time'>
                            <div>
                                <div>
                                    <span>27 SEP,</span>
                                    <span>06:30 AM</span>
                                </div>
                                <div>
                                    {journey_info.from}
                                </div>
                            </div>

                            <div>
                                <div>
                                    <span>27 SEP,</span>
                                    <span>01:00 AM</span>
                                </div>
                                <div>
                                    {journey_info.to}
                                </div>
                            </div>


                        </div>
                        <div className='train-details'>
                            <i className="fa-solid fa-location-dot"></i>
                            <h4>Train Details</h4>

                        </div>
                        {/* (i)=>i.train_id==props.trainID_classDetails[0] && i.class_name==props.trainID_classDetails[index] */}
                    </div>
                    <div className='all-classes'>
                        {props.trainID_classDetails.map((item, index) => {
                            const trainID=props.trainID_classDetails[0]
                            // console.log('train_id',trainID)
                            if (index != 0) {
                                
                                const info=props.all_info
                                let row=(info.filter((i)=>i.train_id==props.trainID_classDetails[0] && i.class_name==props.trainID_classDetails[index]))
                                row=row.slice(0,1)[0]
                                const  class_name=props.trainID_classDetails[index]
                            
                                return (
                                    <div className='classes' key={index}>
                                        <div className='classes-info-1'>
                                            <h3>{class_name}</h3>
                                            <h4 id='green'>৳{row.price}</h4>
                                            <p id='vat'>Including vat</p>
                                        </div>
                                        <hr id='horizontal-line' />
                                        <div className='classes-info-2'>
                                            <p>Available Tickets <br />
                                                (Counter + Online)</p>
                                            <h3 id='greeen'></h3>
                                            <button className='class-btnn' onClick={() =>{ setDekhao(true); seat(trainID,class_name) }}>BOOK NOW</button>
                                        </div>
                                    </div>
                                )
                            }
                        }

                        )}
                       


                    </div>

                </div>
                {/* {filtered_data_for_seat_selection ? console.log('yes it exist'): console.log('it doesnt')} */}
               
                <div className={`show_seat ${dekhao && filtered_data_for_seat_selection ? 'show_seat_pattern' : ''} `}>
                    <Seat_selection seat_details={seat_details} setSeat_Details={setSeat_Details}  total_amount={total_amount} setTotal_Amount={setTotal_Amount}  selected={selected} setSelected={setSelected} compartment={filtered_data_for_seat_selection} />
                </div>


            </div>


    )
}
