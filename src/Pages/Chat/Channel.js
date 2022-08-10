import { useContext } from 'react'
import ServersContext from '../../Context/ServersContext'

export default function Channel(){
    const {servers, activeServer, setServers, setActiveServer} = useContext(ServersContext)
    // const check = servers.findIndex(prevData => prevData.id===activeServer)
    // const activeServer = check<0?0:check
    
    const short = servers[activeServer].channels

    function addChannel(){
        let channelArray = []
        servers[activeServer].channels.map(prevData => channelArray.push(prevData))
        channelArray.push('channel '+(short.length+1))
        console.log(channelArray)

        let temp_state = [...servers]
        let temp_element = { ...temp_state[activeServer]}
        temp_element.channels = channelArray
        temp_state[activeServer] = temp_element
        setServers(temp_state)

        console.log(servers)
        console.log(activeServer)
    }
    
    let element = short.map(data=>{
        return(
            <div>
                <p>{data}</p>
            </div>
        )
    })   

    return(
        <div className="channel">
            <h1>ACCORD</h1>
            <h2>{servers[activeServer].server_name}</h2>
            <div className='channels-header'>
                <p>Channels </p>
                <p className='addChannel' onClick={()=>addChannel()}>+</p>
            </div>
            {element}
        </div>
    )
}