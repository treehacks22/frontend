import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Band from './pages/Band'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path='band' element={<Band />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
)
