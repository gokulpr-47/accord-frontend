import { useState, useContext} from 'react'
import InfoContext from '../../Context/InfoContext'

export default function Server(){
    const [servers, setServers] = useState([{server_name: 'server 1'}]);

    const info = useContext(InfoContext)

    const element = servers.map((server) => (
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