import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect } from 'react'
import ServersContext from '../../Context/ServersContext'

export default function Channel(){
    const axiosPrivate = useAxiosPrivate()
    const {servers, activeServer, setServers, activeChannel, setActiveChannel} = useContext(ServersContext)
    
    const short = servers[activeServer]?.channels

    useEffect(() => {
        const getChannel = async () => {
            try{
                let server_id = servers[activeServer]?.id
                const response = await axiosPrivate.get('addChannel',{
                    params: {
                        server_id: server_id
                    }
                })
    
                let channelArray = response.data.channels
                let temp_state = [...servers]
                let temp_element = {...temp_state[activeServer]}
                temp_element.channels = channelArray
                temp_state[activeServer] = temp_element
                setServers(temp_state)
            } catch(err){
                console.log(err)
            }
        }
        getChannel()
    },[ servers.length, activeServer])

    const addChannel = async () => {
        let channelArray = []
        servers[activeServer].channels.map(prevData => channelArray.push(prevData))
        let pushContent = {
            channel_name:'channel '+(short.length+1),
            chats:[]
        }
        let channel_name = pushContent.channel_name;
        let chats = pushContent.chats;
        let id = servers[activeServer].id;
        channelArray.push(pushContent)

        let temp_state = [...servers]
        let temp_element = { ...temp_state[activeServer]}
        temp_element.channels = channelArray
        temp_state[activeServer] = temp_element
        setServers(temp_state)
        console.log(channelArray)

        let email = localStorage.getItem('email')
        
        try{
            const response = await axiosPrivate.post('/addChannel',
                JSON.stringify({ channel_name, chats, id, email }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
        } catch (err){
            console.log(err)
        }
    }

    function channelIndex(e){
        const channels = [];
        short.map(channel => (
            channels.push(channel.channel_name)
        ))
        setActiveChannel(channels.indexOf(e.target.innerText))
    }
    console.log(short)
    let element = short?.length !== 0? 
        short.map(data=>{
            return(
                <div className='channelList' >
                    <p onClick={(e)=>channelIndex(e)}>{data.channel_name}</p>
                </div>
            )
        }):
        ' '
    
    return(
        <div className="channel">
            <h1>ACCORD</h1>
            <h2>{servers[activeServer]?.server_name}</h2>
            {
                servers.length === 0?
                <p>add new server</p>:
                <div className='channels-header'>
                    <p>Channels </p>
                    <p className='addChannel' onClick={()=>addChannel()}>+</p>
                </div>
            }
            {element}
        </div>
    )
}