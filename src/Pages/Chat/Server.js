import { useState, useContext} from 'react'
import InfoContext from '../../Context/InfoContext'
import ServersContext from '../../Context/ServersContext'

export default function Server(){

    const info = useContext(InfoContext)
    const serverC = useContext(ServersContext)

    console.log(serverC.servers)

    const element = serverC.servers.map((server) => (
        <div className="server-container">
            <p>{server.server_name.match(/\b(\w)/g).join('')}</p>
        </div>  
    ))

    function pop(){
        info.pop();
    }
    
    return(
        <div className="server">
            {element}
            <div className="new-join" onClick={()=>pop()}>
                <h1>+</h1>
            </div>
        </div>
    )
}