import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
// import Logout from './pages/Auth/Logout'
import Home from './pages/DashBoard/Home'
import Income from './pages/DashBoard/Income'
import Expense from './pages/DashBoard/Expense'
import Transactions from './pages/DashBoard/Transactions'
import UserProvider from './context/userContext'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <UserProvider>
      <div >
        <Router>
          <Routes>
            <Route path='/' element={<Root/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signUp' exact element={<SignUp/>}/>
            <Route path='/dashboard' exact element={<Home/>}/>
            <Route path='/income' exact element={<Income/>}/>
            <Route path='/expense' exact element={<Expense/>}/>
            <Route path="/transactions" element={<Transactions />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </Router>
      </div>

      <Toaster
         toastOptions={{
          className: "",
          style: {
            fontSize:'13px'
          },
         }}
      />
    </UserProvider>
    
  )
}

export default App

const Root = () => {

  // Check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
};
