import logo from './logo.svg';
import './App.css';
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
import { persistor, store } from './components/redux';
import { Provider } from 'react-redux';
import Footer from './Pages/Footer';
import Passanger_info from './Pages/Pasanger-info';
import Practice from './components/practice';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Maincontent() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <>
    
      {(location.pathname != '/login' && location.pathname != '/registration') && <Navbar />}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/results' element={<Results />} />
        <Route path='/choose_seat/:id' element={<Choose_seat />} />
        <Route path='/booking' element={<Bookinfo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Traininfo' element={<Traininfo />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/passangerinfo' element={<Passanger_info />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/practice' element={<Practice />} />
        {/* <Route path='*' element={}  /> */}
      </Routes>

    </>
  );
}



function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Maincontent />
            {/* <Footer/> */}
          </Router>
        </PersistGate>
      </Provider>

    </div>
  );
}

export default App;
