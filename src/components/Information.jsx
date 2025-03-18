import { tab } from '@testing-library/user-event/dist/tab'
import React from 'react'
import './css_comp/Information.css';
import { useSelector } from 'react-redux';


const Information = () => {

  const train=useSelector((state)=>state.var.train)
  const home_page_info=useSelector((state)=>state.var.home_page_info)
  console.log('home page',home_page_info)

  return (
    <div className='journey'>
      <table >
        <tr >
          <h5>Journey Details</h5>  
        </tr>
        <tr  >
          <td >
            <p >PNR</p>
          </td>
          <td >
            <p >{train? train[4]: 'Not available'}</p>
          </td>
        </tr>
        <tr className=''>
          <td >
            <p >Train Name:</p>
          </td>
          <td >
            <p >{train? train[0][6]: 'Not available' } ({train? train[0][5]: 'Not available' })</p>
          </td>
        </tr>
        <tr>  
          <td>
            <p >Class:</p>
          </td>
          <td >
            <p >{train? train[0][4]: 'Not available' }</p>
          </td>
        </tr>
        <tr>
          <td >
            <p >Seats:</p>
          </td>
          <td >
            <p >GHA-{
              
              train.map((item,index)=>{
                if(typeof(item)=='object'){
                  if(index==0){
                    return (
                      <strong>{item[2]}</strong>
                    )
                  }else{
                    
                    return (
                      <strong>{',' +item[2]}</strong>
                    )
                  }
                }
              })
              
              
              }</p>
          </td>
        </tr>
        <tr>
          <td >
            <p >From and To City:</p>
          </td>
          <td >
            <p><strong>{home_page_info?.from}</strong> to <strong>{home_page_info?.to}</strong></p>
          </td>
        </tr>
        <tr >
          <td >
            <p >Journey Date and Time:</p>
          </td>
          <td >
            <p >Wed, 13 Nov 2024, 06:15 AM</p>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default Information