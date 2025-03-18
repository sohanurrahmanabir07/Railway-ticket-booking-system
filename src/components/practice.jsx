import React, { useEffect, useState } from 'react'
import Seat_selection from './seat_selection'
import './css_comp/trainsearching.css';
import axios from 'axios';

export default function Practice() {
    let [count, setCount] = useState(0)
    const  user=[{id:1,name:'abir',password:'123'},{id:2,name:'anik',password:'123'},{id:3,name:'ashik',password:'123'}]
    const [plsShow,setplsShow]=useState(false)
    const [showDrop,setshowDrop]=useState(false)
    const data=user.find((u)=>u.name=='abir' && u.password=='123')
    useEffect(() => {
        // console.log('Updated count from useEffect:', count)
    }, [count])
    // console.log('Count before render:', count);
    // console.log('pls show',plsShow)
    // console.log('show drop',showDrop)

    const [info,setInfo]=useState({
        name:'',
        phone:'',
        password:''
    })
    const [pass,setPass]=useState({
        'pass':'',
        'repass':''
    })
    const handleInput=(e)=>{
        setInfo({
            ...info,
            [e.target.name]:e.target.value
        })
    }
    async function handleSubmitt(e){
        e.preventDefault()
        if(pass.pass==pass.repass){
            info['password']=pass.pass
            await axios.post('http://127.0.0.1:8000/api/add_user',info)
            .then((res)=>{
                console.log(res)
                alert("submit")
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            alert(pass.pass)
        }

        



    }
    const handlePass=(e)=>{
        setPass({
            ...pass,
            [e.target.name]:e.target.value
        })


    }
    return (
        <div className='parent-div'>
           
            <form action="" onSubmit={handleSubmitt}>
                <input type="text" name="name" onChange={handleInput} placeholder='enter name' id="" />
                <input type="text" name="phone" id=""  onChange={handleInput} placeholder='enter phone' />
                <input type="text" name="pass" id=""  onChange={handlePass} placeholder='enter pass' />
                <input type="text" name="repass" id=""  onChange={handlePass} placeholder='enter rewrite-pass' />
                <button>Submit</button>
            </form>
            
        </div>
    )
}
