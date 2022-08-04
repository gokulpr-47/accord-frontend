import React,{ useContext } from 'react'
import InfoContext from '../../../Context/InfoContext';
import JoinRoomContext from '../../../Context/JoinRoomContext';

export default function JoinRoom(){
    const code = useContext(JoinRoomContext)

    function handleChange(event){
        const {value} = event.target;
        code.setJoinCode(value)
    }

    function handleSubmit(e){
        e.preventDefault()
    }

    return(
        <div className="FirstTab">
            <form onSubmit={handleSubmit}>
                <label>
                    Join Room: 
                    <input type="text" value={code.joinCode} onChange={handleChange} />
                </label>
                <input type="submit" value="Join" />
            </form>
        </div>
    )
}