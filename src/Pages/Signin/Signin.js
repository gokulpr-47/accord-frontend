import { useState, useContext, useRef, useEffect } from 'react'
import "./Signin.css"
import axios from '../../api/axios'
import { useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
import useAuth from '../../hooks/useAuth'
import useChat from '../../hooks/useChat';

export default function Signin(){

    const { setAuth, persist, setPersist } = useAuth();
    const { servers, setActiveServer } = useChat();

    const { setUser } = useContext(UserContext)

    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || '/channels';

    const userRef = useRef();
    const errRef = useRef();

    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: ""
    // })
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setErrMsg('')
    },[email,password])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const response = await axios.post('/signin',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser(response.data.user.username) //don't need 
            const accessToken = response?.data?.accessToken;
            const user = response.data.user.username;
            const userId = response.data.user._id
            console.log(response)
            await setAuth({ email, user, accessToken, userId }) 
            await setPersist(true);
            servers && setActiveServer(0)
            localStorage.setItem('persist', persist);
            navigate(from, { replace: true});
        } catch(err){
            console.log(err)
            if(!err?.response){
                setErrMsg('No Server Response');
            } else if( err.response?.status === 400){
                setErrMsg('Missing email or password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    function navigateSignup(){
        navigate('/signup')
    }

    return(
        // <Container>
            <div className='login-box'>
                <div className="login-container">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>SIGN IN</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email" 
                            name="email" 
                            ref={userRef}
                            autoComplete="off" 
                            placeholder="Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            autoComplete="off"
                            placeholder="Password" 
                            onChange= {(e) => setPassword(e.target.value)}
                            value= {password}
                        />
                        <button> SIGN IN</button>
                    </form>
                    <p>Don't have an account? <span onClick={navigateSignup}>Sign Up</span></p>
                </div>
            </div>
        // </Container>
    )
}