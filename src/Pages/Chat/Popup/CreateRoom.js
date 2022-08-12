import CreateRoomContext from "../../../Context/CreateRoomContext";
import InfoContext from "../../../Context/InfoContext";
import { useContext } from "react";
import './popup.css'
import ServersContext from "../../../Context/ServersContext";
import { nanoid } from 'nanoid'

export default function CreateRoom(){

    const name = useContext(CreateRoomContext)
    const info = useContext(InfoContext)
    const serverC = useContext(ServersContext)
    
    function handleChange(event){
        const {value} = event.target;
        name.setRoomName(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        serverC.setServers(prevState => [
            ...prevState,
            {
                server_name: name.roomName,
                channels: [{
                    channel_name: 'channel 1',
                    chats: [{
                        name: 'Gokul P R',
                        message: 'This text goes here'
                    }]
                }],
                id: nanoid()
            }
        ])
        info.pop()
    }

    return(
        <div className="FirstTab">
            <form onSubmit={handleSubmit}>
                <label>
                    Create Room: 
                    <input type="text" value={name.roomName} onChange={handleChange} />
                </label>
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}