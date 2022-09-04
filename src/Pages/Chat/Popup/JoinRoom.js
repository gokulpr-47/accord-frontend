import React,{ useContext, useState } from 'react'
import InfoContext from '../../../Context/InfoContext';
import ServersContext from '../../../Context/ServersContext';
import axios from 'axios'
import UserContext from '../../../Context/UserContext';

export default function JoinRoom(){
    const [ code, setCode ] = useState()
    const info = useContext(InfoContext)
    const { authEmail } = useContext(UserContext)
    const {servers, setServers} = useContext(ServersContext)

    function handleChange(event){
        const {value} = event.target;
        setCode(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post('/joinServer',
            JSON.stringify({ code, authEmail }),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        )   
        setServers(prevState => [
            ...prevState,
            response.data.servers
        ])
        // console.log(response.data.servers)
        info.pop()
    }

    return(
        <div className="FirstTab">
            <form onSubmit={handleSubmit}>
                <label>
                    Join Room: 
                    <input type="text" value={code} onChange={handleChange} />
                </label>
                <input type="submit" value="Join" />
            </form>
        </div>
    )
}