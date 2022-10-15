import { createContext, useState } from 'react'

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
    const [ info, setInfo ] = useState(false);
    const [ servers, setServers ] = useState();
    const [ activeServer, setActiveServer ] = useState(0);
    const [ activeChannel, setActiveChannel ] = useState();
    const [ dbContent, setDbContent ] = useState();
    const [ home, setHome ] = useState();
    const [ sidebar, setSidebar ] = useState(true)

    return(
        <ChatContext.Provider value={{ info, setInfo, servers, setServers, activeServer, setActiveServer, activeChannel, setActiveChannel, dbContent, setDbContent, home, setHome, sidebar, setSidebar }} > 
            { children }
        </ChatContext.Provider>
    )
}

export default ChatContext