import React, { useEffect } from 'react';
import SideBar from './Sidebar';
import './chat.css';
import { useMediaQuery } from 'react-responsive'
import Server from './Server'
import Channel from './Channel'
import Messaging from './Messaging'
import Split from 'react-split'
import Popup from './Popup/Popup';
import useChat from '../../hooks/useChat';
import { useParams } from 'react-router-dom'

export default function Chat({socket}) {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const { servers, setActiveServer, setActiveChannel, dbContent, info } = useChat();
    const { serverId, channelId } = useParams()

    useEffect(()=>{
        const serverIndex = servers?.findIndex(server => {
            return server._id === serverId
        })
        setActiveServer(serverIndex)
        const channelIndex = servers? servers[serverIndex]?.channels?.findIndex(channel => {
            return channel._id === channelId    
        }): ''
        setActiveChannel(channelIndex)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[ serverId, channelId ])

    return (
        <>
            { isTabletOrMobile &&
            <>
                <SideBar/>
                    <div className="mobile-wrapper">
                        <div id="App" className='mobile'>
                            <>
                                <div id="page-wrap" class="mobile-page-wrap">
                                    {
                                        servers?
                                            <Messaging socket={socket}/>:
                                            <p>Loading...</p>
                                    }
                                </div>
                            </>
                    </div>
                </div>
            </>
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
                        <Server/>
                        { servers || !dbContent ? 
                            <div className="desktop">
                                <Channel socket={socket}/>
                                <Messaging socket={socket}/>
                            </div>
                            :
                            <p>loading</p>
                        }
                    </Split>
                </div>
            }
            { info && <Popup /> }          
        </>
    );
} 