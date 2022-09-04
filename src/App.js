import { useState } from 'react'
import Signin from './Pages/Signin/Signin'
import Signup from './Pages/Signup/Signup'
import Chat from './Pages/Chat/Chat'
import PersistLogin from './Pages/PersistLogin'
import UserContext from './Context/UserContext'
import { AuthProvider } from './Context/AuthProvider'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

export default function App(){

    const [ user, setUser ] = useState(localStorage.getItem('username') || '')
    const [ authEmail, setAuthEmail ] = useState() 
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    return(
       <Router>
            <AuthProvider>
                <UserContext.Provider value={{ user, setUser, authEmail, setAuthEmail, isLoggedIn, setIsLoggedIn }}>
                    <Routes>
                        {/* <Route path='/' element={ user ? <Chat/> : <Navigate to='/signin' />} /> */}
                        <Route path='/Signin' element={<Signin/>} />
                        <Route path='/signup' element={<Signup/>} />

                        <Route element={<PersistLogin/>}>
                            <Route path='/' element={<Chat/>} />
                        </Route>
                    </Routes>
                </UserContext.Provider>
            </AuthProvider>
       </Router>
    )
}