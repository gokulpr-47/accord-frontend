import { createContext, useState } from 'react'

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
    const [ info, setInfo ] = useState(false);
    const [ servers, setServers ] = useState();
    const [ activeServer, setActiveServer ] = useState();
    const [ activeChannel, setActiveChannel ] = useState();
    const [ dbContent, setDbContent ] = useState();
    const [ home, setHome ] = useState();

    return(
        <ChatContext.Provider value={{ info, setInfo, servers, setServers, activeServer, setActiveServer, activeChannel, setActiveChannel, dbContent, setDbContent, home, setHome }} > 
            { children }
        </ChatContext.Provider>
    )
}

export default ChatContext