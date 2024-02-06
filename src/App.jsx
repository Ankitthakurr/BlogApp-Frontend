import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Register from './components/Register'
import HomePage from './components/HomePage'
import PageNotFound from './PageNotFound'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './components/AdminPage'

const App = () => {
  return (
    <div>
      <Router>
      <Navbar/>
        <Routes  >
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={ <Login/>}/>
          <Route path='/register' element={ <Register/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          <Route path="/admin" element={<AdminPage/>}/>
        </Routes>
          <ToastContainer/>
      </Router>
    </div>
  )
}

export default App

