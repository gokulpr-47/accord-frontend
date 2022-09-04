import CreateRoomContext from "../../../Context/CreateRoomContext";
import InfoContext from "../../../Context/InfoContext";
import { useContext } from "react";
import './popup.css'
import ServersContext from "../../../Context/ServersContext";
import { nanoid } from 'nanoid'
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UserContext from "../../../Context/UserContext";
import useAuth from '../../../hooks/useAuth'

export default function CreateRoom(){

    const { roomName, setRoomName } = useContext(CreateRoomContext)
    const info = useContext(InfoContext)
    const serverC = useContext(ServersContext)
    const authEmail = useContext(UserContext)
    const axiosPrivate = useAxiosPrivate();

    const { auth } = useAuth();
    
    function handleChange(event){
        const {value} = event.target;
        setRoomName(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        serverC.setServers(prevState => [
            ...prevState,
            {
                server_name: roomName,
                channels: [],
                id: nanoid()
            }
        ])

        let id = nanoid()
        let email = auth.email
        try{
            const response = await axiosPrivate.post('/createServer',
                JSON.stringify({ roomName, email ,id }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
        } catch(err) {
            console.log(err)
        }
        info.pop()
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