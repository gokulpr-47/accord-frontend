import CreateRoomContext from "../../../Context/CreateRoomContext";
import InfoContext from "../../../Context/InfoContext";
import { useContext } from "react";
import './popup.css'
import ServersContext from "../../../Context/ServersContext";

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
                channels: []
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