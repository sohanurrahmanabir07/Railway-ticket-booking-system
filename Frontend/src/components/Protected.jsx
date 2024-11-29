import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"

export const Protected=({children})=>{
    const navigate=useNavigate()
    const access_token=useSelector((state)=>state.var.access_token)
    if (!access_token) {
        return navigate('/login',{
            state:{
                expirey_message:'Please Login First'
            }
        })
    }
    return children
}