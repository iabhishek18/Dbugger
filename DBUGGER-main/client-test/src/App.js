import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Reset from './components/Reset';
import Feedback from './components/Feedback';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookie, setCookie] = useCookies();

  // useEffect(() => {
  //   if (cookie['login'] === '1') {
  //     window.location.href = "/welcome";
  //   }
  // })

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;