import React from 'react'
import './css_comp/form_input.css'
export default function Form_input() {
    return (
        <div>

            <form action="" className='form_input'>
                <label htmlFor="">Info</label>
                <div id='from-to'>
                    <input type="text" name="" id="" placeholder='to' />
                    <input type="text" name="" id="" placeholder='from' />
                </div>

                <div id='from-to'>
                    <input type="text" name="" id="" placeholder='date' />
                    <input type="text" name="" id="" placeholder='class' />

                </div>

            </form>

        </div>
    )
}
