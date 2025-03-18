import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addDetails, showDetails,add_home_page_info } from './redux';
import './css_comp/trainsearching.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Date_modifier from './css_comp/Date_modifier';

export default function Trainsearching() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('')
    const home_page_info=useSelector((state)=>state.var.home_page_info)
    const [classs, setClass] = useState('')
    const [show1, setShow1] = useState(true)
    const [show2, setShow2] = useState(true)
    const [enble_btn,setEanblebtn]=useState(false)
    const [result, setResult] = useState([]) 


    useEffect(()=>{
       const fetch= async ()=>{
            await axios.get('http://127.0.0.1:8000/api/get_stations')
            .then((res)=>{
                setResult(res.data.stations)
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        fetch();
    },[])

    
    


    

    const searchresult = result.filter((item) => item.station_name.toLowerCase().includes(from.toLowerCase()))
    const searchresult2 = result.filter((item) => item.station_name.toLowerCase().includes(to.toLowerCase()))




    const passinfo = (e) => {
        e.preventDefault()
        const modifed_date=Date_modifier(date)
        if (from && to && date && classs) {
            const journey_info = {
                from: from,
                to: to,
                date: modifed_date,
                class: classs
            }
            dispatch(add_home_page_info(journey_info))
            navigate('/results')
        } 


    }

    
    useEffect(() => {
        if (to !== '' && from !== '' && date !== '' && classs !== '') {
            setEanblebtn(true);
        } else {
            setEanblebtn(false);
        }
    }, [from, to, date, classs]); 
    return (
        <>
            <form action="" onSubmit={(e) => passinfo(e)} className='main-container'  >
                    <div className='searching-container'>
                        <div className='from_to'>
                            <div className='input-div'>
                                <label htmlFor="">From</label> <br />
                                <input type="text" id="input-field" value={from} onChange={(e) => { setFrom(e.target.value); setShow1(true); }} />
                                {from && show1 ? <div  id='search-result'  >
                                    {
                                        searchresult.slice(0, 4).map((item,index) => (
                                            <li  key={index} style={{ cursor: 'pointer' }} onClick={() => { setShow1(false); setFrom(item.station_name) }}>{item.station_name}</li>
                                        ))
                                    }</div> : null}


                            </div>
                            <div className='input-div'>
                                <label htmlFor="">To</label><br />
                                <input type="text" id="input-field" value={to} onChange={(e) => { setTo(e.target.value); setShow2(true); }} />
                                {to && show2 ? <div id='search-result'  >
                                    {
                                        searchresult2.slice(0, 4).map((item,index) => (
                                            <li key={index} style={{ cursor: 'pointer' }} onClick={() => { setShow2(false); setTo(item.station_name) }}>{item.station_name}</li>
                                        ))
                                    }</div> : null}

                            </div>
                        </div>

                            <div className='date-class'>
                                <div className='input-div'>
                                    <label htmlFor="">Date</label> <br />
                                    <input type="date" name="" id="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
                                </div>
   
                                    <div className='input-div'>
                                        <label htmlFor="">Class</label><br />
                                        <select id="input-field" value={classs} onChange={(e) => setClass(e.target.value)} >
                                            <option value="">Choose one</option>
                                            <option value="Snigdha">Snigdha</option>
                                            <option value="AC-B">AC-B</option>
                                            <option value="Shovon">Shovon</option>
                                            <option value="AC-S">AC-S</option>
                                        </select>
    

                                </div>
                            </div>
                            <div className='btn'>
                                <button className={`btn-click ${enble_btn? 'btn-active':''}`} disabled={enble_btn==false} >Search</button>
                            </div>



                    </div>

            






            </form>



        </>
    )
}

