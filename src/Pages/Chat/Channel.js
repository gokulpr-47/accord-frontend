import { useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from 'react'
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from 'react-router-dom'
import useChat from '../../hooks/useChat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Channel(){
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    const { servers, activeServer, setServers, setActiveChannel } = useChat();
    const { serverId, channelId } = useParams();

    let short = servers? servers[activeServer]?.channels : ''
    
    const [ selected, setSelected ] = useState(channelId);
    const [ copied, setCopied ] = useState(false)


    let email = auth.email

    useEffect(()=>{
        setSelected(channelId)
    },[activeServer])

    // useEffect(()=> {
    //     console.log('selected: ',selected)
    //     const ch = servers? servers[activeServer]?.channels?.findIndex((channel)=> {
    //         return channel._id === selected
    //     }) : ''
    //     setActiveChannel(ch)
    // },[channelId])

    const getServer = async () => {
        try{
            console.log('entered delte')
            const res = await axiosPrivate.get('/createServer',{
                params: { "email": email }
            }) 
            setServers(res.data.dbserver)
        } catch(err) {
            console.log(err)
        }
    }

    const addChannel = async () => {
        let pushContent = {
            channel_name:'channel '+(short.length+1),
            chats:[]
        }
        let channel_name = pushContent.channel_name;
        let chats = pushContent.chats;
        let id = serverId
        try{
            console.log('channels.js: ', id)
            await axiosPrivate.post('/addChannel',
                JSON.stringify({ channel_name, chats, id, email }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            await getServer();
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

    const deleteserver = async (serverId) => {
        try{
            await axiosPrivate.delete('/createServer',{
                params: { "server_id": serverId}
            })
            await getServer();
        } catch(err) {
            console.log(err)
        }
    }
    
    let element = short?.length !== 0?
        short?.map((data, i)=>{
            return(
                <Link to={`/channels/${servers[activeServer]._id}/${data._id}`} key={i}>
                    <div className={`${data._id === selected? 'channelList active': 'channelList'}`} onClick={(e)=>setSelected(data._id)}>
                        <p onClick={(e)=>channelIndex(e)}>{data.channel_name}</p>
                    </div>
                </Link>
            )
        }):
        ''

    return(
        <div className="channel">
            <h1>ACCORD</h1>
            <div className="server-name">
                <h2>{servers? servers[activeServer]?.server_name : ''}</h2>
                <div className="serverNameIcons">
                <CopyToClipboard text={serverId}
                    onCopy={() => {setCopied(true); setTimeout(() => {setCopied(false)}, 2000)}}>
                    <FontAwesomeIcon icon={faCopy} className="copyIcon"  />
                </CopyToClipboard>
                    {copied? <p>copied !</p>: ''}
                    <>
                        <FontAwesomeIcon icon={faTrash} className="deleteIcon" onClick={()=>deleteserver(serverId)}/>
                    </>
                </div>
            </div>  
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