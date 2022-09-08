import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useContext, useEffect } from 'react'
import ServersContext from '../../Context/ServersContext'
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from 'react-router-dom'

export default function Channel(){
    // const channelId = props.channelId
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    const {servers, activeServer, setServers, activeChannel, setActiveChannel} = useContext(ServersContext)
    const { serverId } = useParams();
    
    let short = servers? servers[activeServer]?.channels : ''

    // useEffect(() => {
    //     console.log('entered')
    //     const getChannel = async () => {
    //         try{
    //             let server_id = servers[activeServer]?.id
    //             const response = await axiosPrivate.get('addChannel',{
    //                 params: {
    //                     server_id: server_id
    //                 }
    //             })
    //             let channelArray = response.data.channels
    //             let temp_state = [...servers]
    //             let temp_element = {...temp_state[activeServer]}
    //             temp_element.channels = channelArray
    //             temp_state[activeServer] = temp_element
    //             setServers(temp_state)
    //         } catch(err){
    //             console.log(err)
    //         }
    //     }
    //     getChannel()
    // },[ servers?.length, activeServer])

    const addChannel = async () => {
        // let channelArray = []
        // servers[activeServer].channels.map(prevData => channelArray.push(prevData))
        let pushContent = {
            channel_name:'channel '+(short.length+1),
            chats:[]
        }
        let channel_name = pushContent.channel_name;
        let chats = pushContent.chats;
        let id = serverId

        // channelArray.push(pushContent)
        // let temp_state = [...servers]
        // let temp_element = { ...temp_state[activeServer]}
        // temp_element.channels = channelArray
        // temp_state[activeServer] = temp_element
        // setServers(temp_state)
        // console.log(channelArray)

        let email = auth.email
        
        try{
            console.log('channels.js: ', id)
            const response = await axiosPrivate.post('/addChannel',
                JSON.stringify({ channel_name, chats, id, email }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data))
            const res = await axiosPrivate.get('/createServer',{
                params: { "email": email }
            }) 
            console.log('server.js dbserver content: ', res.data.dbserver)
            await setServers(res.data.dbserver)
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
    
    let element = short?.length !== 0?
        short?.map((data, i)=>{
            return(
                <Link to={`/channels/${servers[activeServer]._id}/${data._id}`}>
                    <div className='channelList' key={i}>
                        <p onClick={(e)=>channelIndex(e)}>{data.channel_name}</p>
                    </div>
                </Link>
            )
        }):
        ''
    
    return(
        <div className="channel">
            <h1>ACCORD</h1>
            <h2>{servers? servers[activeServer]?.server_name : ''}</h2>
            <div className='channels-header'>
            {
                servers?.length === 0?
                    <p>add new server</p> :
                    <>
                        <p>Channels </p>    
                        <p className='addChannel' onClick={()=>addChannel()}>+</p>
                    </>
                }
            </div>
            {element}
        </div>
    )
}