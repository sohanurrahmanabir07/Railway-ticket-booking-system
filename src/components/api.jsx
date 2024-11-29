import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { add_access_token, store } from './redux';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000,
});



// const navigate=useNavigate()
// const dispatch=useDispatch()

api.interceptors.request.use(config => {
    const state=store.getState().var
    const token=state.access_token

    // const token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzMyMzk4NzYxLCJleHAiOjE3MzI0MDIzNjEsIm5iZiI6MTczMjM5ODc2MSwianRpIjoiYUhjQW1XV2JWZ25mY0ZxcSIsInN1YiI6IjEiLCJwcnYiOiI0YzZmZWZiMzEzNzA2Y2UzNTI1ODRiNjE3N2ZlYWZmNWExNDZkMmY5In0.rWwVM_DLjzM0DSGfaHtZN-bI9nysKnZsi9o7XMc-gjA'



    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => Promise.reject(error));

// api.interceptors.response.use(
//     response => response,
//     async error => {
//         if (error.response.status === 401) {
//             try {
//                 const refreshToken = useSelector((state)=>state.var.refresh_token)
//                 const response = await axios.post('/', { token: refreshToken });

//                 if (response.data.token) {
//                     localStorage.setItem('token', response.data.token);
//                     error.config.headers.Authorization = `Bearer ${response.data.token}`;
//                     return api(error.config); // Retry original request
//                 }
//             } catch (err) {
//                 // Refresh token failed; log out user
//                 localStorage.clear();
//                 window.location.href = '/login';
//             }
//         }
//         return Promise.reject(error);
//     }
// );


api.interceptors.response.use(
    response=>response,
    async error=>{
        // const status=error.response? error.response.status:''
        // if(status==401){
        //     // navigate('/login')
        //     // useNavigate('/login')
        // }
        // else if(status==402){
        //     await api.post('/refresh')
        //     .then((res)=>{
        //         // dispatch(add_access_token(res.data.access_token))
        //         // useDispatch(add_access_token(res.data.access_token))
        //         console.log('refresh token',res.data)
        //     })
        //     .catch((error)=>console.log('error_occured_during_refresh',error))
        // } else if(status==403){
        //     console.log('Authorization token not found')
        //     // navigate('/login')
        //     // useNavigate('/login')
        // }
        // else{
        //     console.log(error)
        // }
        return Promise.reject(error);
    }
)

export default api;
