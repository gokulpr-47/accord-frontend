import { useState, useRef, useEffect } from 'react'
import useChat from '../../hooks/useChat'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useParams } from 'react-router-dom'
// import TimeAgo from 'timeago-react';
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Messaging({socket}){
    const { servers, activeServer, activeChannel } = useChat();
    const [ newChat, setNewChats ] = useState('') 
    const bottomRef = useRef(null);
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { serverId, channelId } = useParams();
    const [changed, setChanged] = useState(false);
    const [ messages, setMessages ] = useState();
    const [ activeUsers, setActiveUsers ] = useState(0);
    const [ prevChannel, setPrevChannel ] = useState();
    const [ messageClass, setMessageClass ] = useState('messaging-chatarea')
    // const [ room, setRoom ] = useState();
    const {user} = auth;
    const messageElement = useRef();

    useEffect(()=>{
        socket.on('connect')
        socket.emit('leave_room', prevChannel)
        channelId && socket.emit('join_room', channelId);
        socket.on('active_user', (data)=>{
            setActiveUsers(data)
        })
        setPrevChannel(channelId)
        !prevChannel && setActiveUsers(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[channelId])
    

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages(prev=> [...prev, {
                chat: data.newChat, 
                createdAt: data.timestamp,
                senderName: data.user
            }]) 
        })
        // socket.on('active_user', (data)=>{
        //     setActiveUsers(data)
        // })
    },[socket])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [changed, newChat, messages]);    
    
    function handleChange(e){
        const {value} = e.target;
        setNewChats(value)
    }

    
    useEffect(()=> {
        const message = async () => {
            try{
                const response = await axiosPrivate.get(`/message/${channelId}`)
                setMessages(response?.data) 
                setChanged(prev=> !prev)
            } catch(err){
                console.log(err)
            }
        }
        message()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[activeServer, activeChannel])
    
    function handleSubmit(e){
        e.preventDefault()
        
        setMessages(prev=> [...prev, {
            chat: newChat,
            createdAt: Date.now(),
            senderName: user
        }])
        socket.emit("send_message", {
            newChat, 
            channelId,
            timestamp: Date.now(),
            user: user
        })
        const addMessage = async () => {
            try{
                const message = {
                    'channelId': channelId,
                    'senderId': auth.userId,
                    'chat': newChat
                }
                const response = await axiosPrivate.post('/message',
                    JSON.stringify(message),
                    {
                        headers: { 'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                )
                console.log(response)
            } catch(err){
                console.log(err)
            }
        }
        addMessage();
        setNewChats('')
    }

    let element = messages?.map((data, i) => {
            return(
                <div className="chats" key={i}>
                    <div className="user-icon">
                        <p>{data?.senderName?.match(/\b(\w)/g).join('').slice(0,2)}</p>
                    </div>
                    <div className="user-chat-container">
                        <div className="user-name">
                            <h4>{data.senderName}</h4>
                            <p className="message-bottom"> <TimeAgo date={data.createdAt} /> </p>
                        </div>
                        <div className="user-chat">
                            <p>{data.chat}</p>
                        </div>
                    </div>
                </div>
            )
        })
    
    useEffect(()=>{
        console.log(messageElement)
    })

    const addClass = () => {
        console.log('clicked')
        // setMessageClass('messaging-chatarea-reduced')
        // messageElement.current.focus();
    }
    return(
        <div className="messaging">
            <div className="messaging-header">
                <div></div>
                <h2>{servers && servers[servers.findIndex(server=> {return server._id === serverId})]?.channels[servers[servers.findIndex(server=> {return server._id === serverId})].channels.findIndex(channel=>(channel._id===channelId))]?.channel_name }</h2>
                {/* <p>{activeUsers}</p> */}
                {channelId && <p className="activeUsers"><FontAwesomeIcon icon={faUsers} className="users_online"/>{activeUsers}</p>}
            </div>
            <div className={`${messageClass}`}>
                {element}
                <div ref={bottomRef}></div>
            </div>
            <div className="messaging-textarea">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="" id="" 
                        className="textarea-input" 
                        placeholder="Enter text here...." 
                        onChange={handleChange}
                        value={newChat}
                        ref={messageElement}
                        onClick={()=>addClass()}
                        />
                </form>
            </div>
        </div>
    )   
}
