import logo from './logo.svg';
import './App.css';
// import './index.css';
import Navbar from './Pages/Navbar';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Results from './Pages/results';
import Choose_seat from './Pages/choose_seat';
import Bookinfo from './Pages/bookinfo';
import Login from './Pages/Login';
import Registration from './components/Registration';
import Home from './Pages/Home';
import Traininfo from './Pages/Traininfo';
import Contact from './Pages/Contact';
import { logoutUser, persistor, store } from './components/redux';
import { Provider, useDispatch } from 'react-redux';
import Footer from './Pages/Footer';
import Passanger_info from './Pages/Pasanger-info';
import Practice from './components/practice';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lastpg from './Pages/Lastpg';
import Profile from './Pages/Profile';
import { useEffect } from 'react';
import { Protected } from './components/Protected';

function Maincontent() {
  const state=store.getState().var
  const navigate=useNavigate()
  const location=useLocation()
  const time=Date.now()/1000

  const dispatch=useDispatch()
  useEffect(()=>{

    if (['/login', '/register'].includes(location.pathname)) {
      return;
    }

    if( state.expirey_time!=null &&  time > state.expirey_time){
      toast.warning('Session has expired redirecting to login')
      setTimeout(() => {
        navigate('/login',{
          state:{
            expirey_message:'Session has expired please login'
          }});
        
      }, 2000);
      dispatch(logoutUser())
     
      
  
      
    }
  })
  return (
    <>
    
      {(location.pathname != '/login' && location.pathname != '/registration') && <Navbar />}
      <Routes>
        

        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/choose_seat/:id' element={<Choose_seat />} />
        <Route path='/booking' element={<Bookinfo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Contact' element={<Protected><Contact /></Protected> } />
        <Route path='/Traininfo' element={<Protected><Traininfo /></Protected>    } />
        <Route path='/registration' element={<Registration />} />
        <Route path='/passangerinfo' element={<Protected><Passanger_info /></Protected>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/practice' element={<Practice />} />
        {/* <Route path='/ticket_purchased'  element={<Protected><Lastpg /></Protected>} /> */}
        <Route path='/ticket_purchased'  element={<Lastpg />} />
        <Route path='/profile' element={<Profile/>}  />
        {/* <Route path='*' element={}  /> */}
      </Routes>
      {(location.pathname != '/login' && location.pathname != '/registration') && <Footer />}

    </>
  );
}



function App() {



  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Maincontent />
            
          </Router>
        </PersistGate>
      </Provider>

    </div>
  );
}

export default App;
