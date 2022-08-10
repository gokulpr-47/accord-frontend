import { useContext} from 'react'
import InfoContext from '../../Context/InfoContext'
import ServersContext from '../../Context/ServersContext'

export default function Server(){

    const info = useContext(InfoContext)
    const {servers, setActiveServer} = useContext(ServersContext)
    
    function activeServer(e){
        const names = [];
        servers.map((server) => (
            names.push(server.server_name.match(/\b(\w)/g).join(''))
        ))
        // let index = names.indexOf(e.target.innerText)
        // setActiveServer(servers[index].id)
        setActiveServer(names.indexOf(e.target.innerText))
    }

    const element = servers.map((server) => (
        <div className="server-container" onClick={(e)=>activeServer(e)}>
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