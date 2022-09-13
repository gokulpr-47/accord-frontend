import { useContext } from 'react'
import ChatContext from '../Context/ChatContext'

const useChat = () => {
    return useContext(ChatContext);
}

export default useChat;