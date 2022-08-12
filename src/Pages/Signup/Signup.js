import axios from 'axios'
import {useState} from 'react'
// import {Container} from 'react-bootstrap'
import "./signup.css"
import Signin from '../Signin/Signin'
import { Routes, Route, useNavigate } from 'react-router-dom'

export default function Signup(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    })

    const sendData = () => {
        axios({
            method: 'POST',
            data:{
                'username': formData.username,
                'email': formData.email,
                'password': formData.password
            },
            withCredential: true,
            url: 'http://localhost:3001/signup'
        })
    }

    function handleChange(event){
        const {name, value} = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        console.log(formData)
    }

    function navigateSignin(){
        navigate('/signin')
    }

    return(
        <div className='signup-box'>
            <div className="signup-container">
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"                            
                        value={FormData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text" 
                        name="username" 
                        autoComplete="off" 
                        placeholder="Username" 
                        onChange={handleChange}
                        value={FormData.username}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        autoComplete="off"
                        placeholder="Password" 
                        onChange= {handleChange}
                        value= {FormData.password}
                    />
                    <button onClick={sendData}> SIGN UP</button>
                </form>
                <p>Don't have an account? <a onClick={navigateSignin}>SignIn</a></p>
            </div>
        </div>
    )
}