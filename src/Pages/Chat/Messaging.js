import { useContext, useState, useRef, useEffect } from 'react'
import useChat from '../../hooks/useChat'
import UserContext from '../../Context/UserContext'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useParams } from 'react-router-dom'
import { format } from 'timeago.js'

export default function Messaging(){
    const { user } = useContext(UserContext)
    const { servers, setServers, activeServer, activeChannel, setActiveChannel } = useChat();
    const [ newChat, setNewChats ] = useState() 
    const bottomRef = useRef(null);
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { serverId, channelId } = useParams();
    const [changed, setChanged] = useState(false);
    const [ messages, setMessages ] = useState();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [changed, newChat]);
    
    
    function handleChange(e){
        const {value} = e.target;
        setNewChats(value)
    }

    useEffect(()=> {
        const message = async () => {
            try{
                const response = await axiosPrivate.get(`/message/${channelId}`)
                const chatCollection = response?.data?.map((chat) => {
                    return({
                        name: chat.senderName,
                        message: chat.chat,
                        createdAt: chat.createdAt
                    })
                })
                setMessages(response?.data)
                servers && setChanged(prev=> !prev)
            } catch(err){
                console.log(err)
            }
        }
        message()
    },[activeServer, activeChannel])
    
    function handleSubmit(e){
        e.preventDefault()
        let chats = []
        servers[activeServer].channels[activeChannel].chats.map(prevData=>chats.push(prevData))
        chats.push({
            name: auth.user,
            message: newChat
        })
        let temp_state = [...servers]
        let temp_element = { ...temp_state[activeServer]}
        temp_element.channels[activeChannel].chats = chats
        temp_state[activeServer] = temp_element
        setServers(temp_state)
        
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
                setNewChats('')
            }catch(err){
                console.log(err)
            }
        }
        addMessage();
    }

    let element = messages.map((data, i) => {
            return(
                <div className="chats" key={i}>
                    <div className="user-icon">
                        <p>{data?.senderName?.match(/\b(\w)/g).join('').slice(0,2)}</p>
                    </div>
                    <div className="user-chat-container">
                        <div className="user-name">
                            <h4>{data.senderName}</h4>
                            <p className="message-bottom"> {format(data.createdAt)} </p>
                        </div>
                        <div className="user-chat">
                            <p>{data.chat}</p>
                        </div>
                    </div>
                </div>
            )
        })
    
    return(
        <div className="messaging">
            <div className="messaging-header">
                <h2>{servers && servers[activeServer]?.channels[activeChannel]?.channel_name }</h2>
            </div>
            <div className="messaging-chatarea">
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
                        />
                </form>
            </div>
        </div>
    )   
}