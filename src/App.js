import { useState } from 'react'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import Chat from './Pages/Chat/Chat'
import PersistLogin from './Pages/PersistLogin'
import UserContext from './Context/UserContext'
import { AuthProvider } from './Context/AuthProvider'
import { BrowserRouter as Router, Route, Routes, Redirect, Navigate} from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Tests from './Pages/Tests'
import Test from './Pages/Test'
import Home from './Pages/Home'

export default function App(){

    const [ user, setUser ] = useState(localStorage.getItem('username') || '')
    const [ authEmail, setAuthEmail ] = useState() 
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const { auth } = useAuth();
    // const email = auth.email 

    return(
       <Router>
            <AuthProvider>
                <UserContext.Provider value={{ user, setUser, authEmail, setAuthEmail, isLoggedIn, setIsLoggedIn }}>
                    <Routes>
                        <Route path='*' element={<Navigate to="/channels" replace/>} />
                        <Route path='/Signin' element={<Signin/>} />
                        <Route path='/signup' element={<Signup/>} />

                        <Route element={<PersistLogin/>}>   
                            <Route path='channels' element={<Chat/>} />
                            <Route path='channels/:serverId/:channelId' element={<Chat/>} />
                        </Route>
                        <Route path="tests/:testId" element={<Test/>} />
                    </Routes>
                </UserContext.Provider>
            </AuthProvider>
       </Router>
    )
}