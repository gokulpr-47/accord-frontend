import React from 'react'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import Chat from './Pages/Chat/Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function App(){

    return(
       <Router>
            <Routes>
                <Route path='' element={<Chat/>} />
                <Route path='/Signin' element={<Signin/>} />
                <Route path='/signup' element={<Signup/>} />
            </Routes>
       </Router>
    )
}