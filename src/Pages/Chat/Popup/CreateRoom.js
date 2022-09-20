import CreateRoomContext from "../../../Context/CreateRoomContext";
// import InfoContext from "../../../Context/InfoContext";
import { useContext } from "react";
import './popup.css'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import UserContext from "../../../Context/UserContext";
import useAuth from '../../../hooks/useAuth'
// import { useParams } from 'react-router-dom'
import useChat from "../../../hooks/useChat";

export default function CreateRoom(){

    const { roomName, setRoomName } = useContext(CreateRoomContext)
    // const info = useContext(InfoContext)
    // const { servers, setServers, setDbContent, activeServer} = useContext(ServersContext)
    const { setServers, setDbContent, setInfo } = useChat();
    // const authEmail = useContext(UserContext)
    const axiosPrivate = useAxiosPrivate();
    // let { serverId } = useParams();

    const { auth } = useAuth();
    
    function handleChange(event){
        const {value} = event.target;
        setRoomName(value)
    }

    const handleSubmit = async (e) => {
        console.log('entered createroom handleSubmit')
        e.preventDefault()
        // setServers(prevState => [
        //     ...prevState,
        //     {
        //         server_name: roomName,
        //         channels: [],
        //         id: nanoid()
        //     }
        // ])

        // let id = nanoid()
        let email = auth.email
        let channel_name = 'channel 1'
        let chats = []
        try{
            const response = await axiosPrivate.post('/createServer',
                JSON.stringify({ roomName, email }), //removed id 
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log('creating channel')
            console.log('createRoom response: ', response)
            let id = response.data.result._id
            console.log(id)
            await axiosPrivate.post('/addChannel',
                JSON.stringify({ channel_name, chats, id, email }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log('calling servers')
            const res = await axiosPrivate.get('/createServer',{
                params: { "email": email }
            }) 
            console.log('server.js dbserver content: ', res.data.dbserver)
            await setServers(res.data.dbserver)
            await setDbContent(res.data.dbserver.length)
        } catch(err) {
            console.log(err)
        }
        setInfo(prevState => !prevState)
    }

    return(
        <div className="FirstTab">
            <form onSubmit={handleSubmit}>
                <label>
                    Create Room: 
                    <input type="text" value={roomName} onChange={handleChange} />
                </label>
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}