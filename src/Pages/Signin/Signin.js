import {useState} from 'react'
import {Container} from 'react-bootstrap'
import "./Signin.css"
import axios from 'axios'

export default function Login(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
    const sendData = () =>{
        axios({
            method: "POST",
            data: {
                email: formData.email,
                password: formData.password,
            },
            withCredential: true,
            url: "http://localhost:3001/signin"
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

    return(
        <Container>
            <div className='login-box'>
                <div className="login-container">
                    <h1>SIGN IN</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email" 
                            name="email" 
                            autoComplete="off" 
                            placeholder="Email" 
                            onChange={handleChange}
                            value={FormData.email}
                        />
                        <input 
                            type="password" 
                            name="password" 
                            autoComplete="off"
                            placeholder="Password" 
                            onChange= {handleChange}
                            value= {FormData.password}
                        />
                        <button onClick={sendData}> SIGN IN</button>
                    </form>
                    <p>Don't have an account? Sign Up</p>
                </div>
            </div>
        </Container>
    )
}