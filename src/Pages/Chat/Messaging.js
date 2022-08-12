import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState, useRef, useEffect } from 'react'
import ServersContext from '../../Context/ServersContext'

export default function Messaging(){
    const { servers, setServers, activeServer, activeChannel, user } = useContext(ServersContext)
    const [ newChat, setNewChats ] = useState()
    
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
        console.log('changed')
    }, [newChat]);

    let element = servers[activeServer].channels[activeChannel].chats.map(data => {
        return(
            <div className="chats">
                <div className="user-icon">
                    <p>{data.name.match(/\b(\w)/g).join('').slice(0,2)}</p>
                </div>
                <div className="user-chat-container">
                    <div className="user-name">
                        <h4>{data.name}</h4>
                    </div>
                    <div className="user-chat">
                        <p>{data.message}</p>
                    </div>
                </div>
            </div>
        )
    })

    function handleChange(e){
        const {value} = e.target;
        setNewChats(value)
    }

    function handleSubmit(e){
        e.preventDefault()
        let chats = []
        servers[activeServer].channels[activeChannel].chats.map(prevData=>chats.push(prevData))
        chats.push({
            name: user,
            message: newChat
        })
        console.log(chats);
        let temp_state = [...servers]
        let temp_element = { ...temp_state[activeServer]}
        temp_element.channels[activeChannel].chats = chats
        temp_state[activeServer] = temp_element
        setServers(temp_state)
        setNewChats('')
    }

    return(
        <div className="messaging">
            <div className="messaging-header">
                <h2>{servers[activeServer].channels[activeChannel].channel_name}</h2>
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