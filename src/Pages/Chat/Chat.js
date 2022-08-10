import React, { useState, useContext, useEffect } from 'react';
import SideBar from './Sidebar';
import './chat.css';
import { useMediaQuery } from 'react-responsive'
import Server from './Server'
import Channel from './Channel'
import Messaging from './Messaging'
import Split from 'react-split'
import InfoContext from '../../Context/InfoContext'
import Popup from './Popup/Popup';
import ServersContext from '../../Context/ServersContext'
import {nanoid} from 'nanoid'

export default function Chat() {    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const [ info, setInfo ] = useState(false);
    const [servers, setServers] = useState([
        {
            server_name: 'server 1',
            channels: ['channel 1', 'channel 2'],
            id: nanoid()
        }
    ]);
    const [ activeServer, setActiveServer ] = useState(0)

    function pop(){
        setInfo((prevState)=> !prevState);
    }

    return (
        <>
            { isTabletOrMobile &&
                <div id="App">
                    <ServersContext.Provider value = {{ servers, setServers, activeServer, setActiveServer }}>
                        <InfoContext.Provider value={{ info, setInfo, pop}}>
                            <SideBar/>
                        </InfoContext.Provider>
                    </ServersContext.Provider>
                    <>
                        <div id="page-wrap">
                            <Messaging/>
                        </div>
                    </>
                </div>
            }
            { isDesktopOrLaptop && 
                <div className="chat-container">
                    <Split
                        className="container-split"
                        sizes={[5, 20, 75]}
                        minSize={5}
                        expandToMin={false}
                        gutterSize={0}
                        snapOffset={30} 
                        dragInterval={1}
                        direction="horizontal"
                        cursor="col-resize"
                    >                        
                        <ServersContext.Provider value = {{ servers, setServers, activeServer, setActiveServer }}>
                            <InfoContext.Provider value={{info,setInfo,pop}}>
                                <Server />
                                <Channel />
                                <Messaging />
                            </InfoContext.Provider>
                        </ServersContext.Provider>
                    </Split>
                </div>
            }
            { info && 
                <ServersContext.Provider value = {{ servers, setServers}}>
                    <InfoContext.Provider value={{ info, setInfo, pop }}>
                        <Popup />
                    </InfoContext.Provider> 
                </ServersContext.Provider>
            }          
        </>
    );
} 