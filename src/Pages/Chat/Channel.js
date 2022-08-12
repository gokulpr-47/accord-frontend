import { useContext } from 'react'
import ServersContext from '../../Context/ServersContext'

export default function Channel(){
    const {servers, activeServer, setServers, activeChannel, setActiveChannel} = useContext(ServersContext)
    // const check = servers.findIndex(prevData => prevData.id===activeServer)
    // const activeServer = check<0?0:check

    const short = servers[activeServer].channels

    function addChannel(){
        let channelArray = []
        servers[activeServer].channels.map(prevData => channelArray.push(prevData))
        channelArray.push({
            channel_name:'channel '+(short.length+1),
            chats:[{
                name: 'Accord',
                message: 'Welcome to the new channel'
            }]
        })

        let temp_state = [...servers]
        let temp_element = { ...temp_state[activeServer]}
        temp_element.channels = channelArray
        temp_state[activeServer] = temp_element
        setServers(temp_state)
        console.log(channelArray)
    }

    function channelIndex(e){
        const channels = [];
        short.map(channel => (
            channels.push(channel.channel_name)
        ))
        setActiveChannel(channels.indexOf(e.target.innerText))
        console.log(activeChannel)
    }
    
    let element = short.map(data=>{
        return(
            <div className='channelList'>
                <p onClick={(e)=>channelIndex(e)}>{data.channel_name}</p>
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