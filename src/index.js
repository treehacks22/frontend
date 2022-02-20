import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Band from './pages/Band'
import Jam from './pages/Jam'
import JamMenu from './pages/JamMenu'
import './index.css'
import RTCMesh from 'react-rtc-real';
import RTCMain from 'react-rtc-real';

require('react-rtc-real/assets/index.css');

const WEBSOCKET_URL = 'wss://192.168.0.17:4000/ws';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' render={(props)=> <RTCMain URL={WEBSOCKET_URL} />} element={<App />}></Route>
      <Route path='band' render={(props)=> <RTCMesh URL={WEBSOCKET_URL} />}  element={<Band />}></Route>
      <Route path='jam' render={(props)=> <RTCMesh URL={WEBSOCKET_URL} />} element={<Jam />}></Route>
      <Route path='jammenu' element={<JamMenu />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
