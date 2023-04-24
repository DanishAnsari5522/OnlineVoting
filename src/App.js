import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import _404 from './pages/404';
import About from './pages/about';
import Privacy from './pages/privacy';
import TOA from './pages/toa';
import Contact from './pages/contact';
import SingleInputForm from './components/singleInputForm';
import Footer from './components/footer';
import FirstPage from './pages/FirstPage/Index';
// import Invoice from './pages/invoice';

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState()
  const [userId, setUserId] = useState()
  const [isAutheticated, setIsAutheticated] = useState(false)
  const [tokenExpired, setTokenExpired] = useState(false)

  // const validate_token = () => {
  //   axios.get('/api/v1/validate_token')
  //   .then(res => {
  //     setUserType(res.data['userType'])
  //     setUserId(res.data['id'])
  //     setTokenExpired(false)
  //     setIsAutheticated(true)
  //     setIsLoading(false)
  //   })
  //   .catch(err => {
  //     // console.log(err.toJSON());
  //     if (Cookies.get('token') !== undefined) {
  //       setTokenExpired(true)
  //       Cookies.remove('token')
  //     }
  //     setIsAutheticated(false)
  //   })
  // }

  useEffect(() => {

    const token = Cookies.get('token');
    const auth = localStorage.getItem('currentUser')
    if (auth) {
      setIsAutheticated(true)
    }
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // validate_token()
    }
    else
      setIsLoading(false)
  }, []);

  if (isLoading === false) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={!isAutheticated ? <FirstPage /> : <Home currentPage={'Dashboard'} />} />
            <Route path='/dashboard' element={!isAutheticated ? <Home currentPage={'Dashboard'} /> : <Navigate to='/login' />} />
            <Route path='/superadmin' element={isAutheticated ? <Home currentPage={'Super Admins'} /> : <Navigate to='/login' />} />
            <Route path='/users' element={!isAutheticated ? <Home currentPage={'Users'} /> : <Navigate to='/login' />} />
            <Route path='/clients' element={!isAutheticated ? <Home currentPage={'Users'} /> : <Navigate to='/login' />} />
            <Route path='/votingList' element={!isAutheticated ? <Home currentPage={'Users'} /> : <Navigate to='/login' />} />
            <Route path='/help' element={!isAutheticated ? <Home userId={userId} userType={userType} currentPage={'Help'} /> : <Navigate to='/login' />} />
            <Route path='/login' element={!isAutheticated ? <Login tokenExpired={tokenExpired} /> : <Navigate to='/' />} />
            <Route path='/register' element={!isAutheticated ? <Register /> : <Navigate to='/' />} />
            <Route path='/forgot_password' element={!isAutheticated ? <SingleInputForm title={'Forgot password'} inputName={'Email'} buttonName={'Send password recovery email'} /> : <Navigate to='/' />} />
            <Route path='/reset_password' element={!isAutheticated ? <SingleInputForm title={'Enter new password'} inputName={'Password'} buttonName={'Reset password'} /> : <Navigate to='/' />} />
            <Route path='/email_verification' element={<SingleInputForm title={'Enter email OTP verification code'} inputName={'Verification code'} buttonName={'Verify'} />} />
            <Route path='/about' element={<About />} />
            <Route path='/privacy_policy' element={<Privacy />} />
            <Route path='/toa' element={<TOA />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<_404 />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </>
    )
  }
}