import React,{ useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';
import useChat from '../../../hooks/useChat';

export default function JoinRoom(){
    const [ code, setCode ] = useState()
    // const { authEmail } = useContext(UserContext)
    const { setServers, setDbContent, setInfo } = useChat();
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();

    function handleChange(event){
        const {value} = event.target;
        setCode(value)
    }
    const email = auth.email

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axiosPrivate.post('/joinServer',
            JSON.stringify({ code, email }),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
        )
        const res = await axiosPrivate.get('/createServer',{
            params: { "email": email }
        }) 
        console.log('server.js dbserver content: ', res.data.dbserver)
        await setServers(res.data.dbserver)
        await setDbContent(res.data.dbserver.length)
        setInfo(prevState => !prevState)
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