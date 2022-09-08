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
import UserContext from '../../Context/UserContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signin from '../Signin/Signin';
import useAuth from '../../hooks/useAuth'
import { useParams } from 'react-router-dom';

export default function Chat() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const { serverId, channelId } = useParams()
    
    const { auth, persist } = useAuth()

    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const [ info, setInfo ] = useState(false);
    const [ servers, setServers] = useState();
    const [ activeServer, setActiveServer ] = useState(0)
    const [ activeChannel, setActiveChannel ] = useState(0)
    const [ dbContent, setDbContent] = useState(0)
    const [ home, setHome ] = useState();

    function pop(){
        setInfo((prevState)=> !prevState);
    }

    return (
        <>
            { isTabletOrMobile &&
                <div id="App">
                    <ServersContext.Provider value = {{ 
                        servers, 
                        setServers, 
                        activeServer, 
                        setActiveServer, 
                        activeChannel, 
                        setActiveChannel,
                        user,
                        setUser,
                        dbContent,
                        setDbContent
                    }}>
                        <InfoContext.Provider value={{ info, setInfo, pop}}>
                            <SideBar/>
                        </InfoContext.Provider>
                        <>
                            <div id="page-wrap">
                                {
                                    servers?
                                        <Messaging/>:
                                        <p>Loading...</p>
                                }
                            </div>
                        </>
                    </ServersContext.Provider>
                </div>
            }
            { isDesktopOrLaptop && 
                <div className="chat-container">
                    <Split
                        className="container-split"
                        sizes={[5, 95]}
                        minSize={5}
                        expandToMin={false}
                        gutterSize={0}
                        snapOffset={30} 
                        dragInterval={1}
                        direction="horizontal"
                        cursor="col-resize"
                    >                        
                        <ServersContext.Provider value = {{ servers, 
                            setServers, 
                            activeServer, 
                            setActiveServer, 
                            activeChannel, 
                            setActiveChannel,
                            user,
                            setUser,
                            dbContent,
                            setDbContent,
                            home,
                            setHome
                        }}>
                            <InfoContext.Provider value={{info,setInfo,pop}}>
                                <Server/>
                                { servers || !dbContent ? 
                                    <>
                                        <Channel/>
                                        <Messaging />
                                    </>
                                    :
                                    <p>loading</p>
                                }
                            </InfoContext.Provider>
                        </ServersContext.Provider>
                    </Split>
                </div>
            }
            { info && 
                <ServersContext.Provider value = {{ servers, setServers, dbContent, setDbContent}}>
                    <InfoContext.Provider value={{ info, setInfo, pop }}>
                        <Popup />
                    </InfoContext.Provider> 
                </ServersContext.Provider>
            }          
        </>
    );
} 