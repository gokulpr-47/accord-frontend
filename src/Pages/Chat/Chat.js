import React, { useState, useContext, useEffect } from 'react';
import SideBar from './Sidebar';
import './chat.css';
import { useMediaQuery } from 'react-responsive'
import Server from './Server'
import Channel from './Channel'
import Messaging from './Messaging'
import Split from 'react-split'
import Popup from './Popup/Popup';
import UserContext from '../../Context/UserContext';
import useChat from '../../hooks/useChat';

export default function Chat() {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const { servers, dbContent, info, setInfo } = useChat();

    return (
        <>
            { isTabletOrMobile &&
                <div id="App">
                        <SideBar/>
                        <>
                            <div id="page-wrap">
                                {
                                    servers?
                                        <Messaging/>:
                                        <p>Loading...</p>
                                }
                            </div>
                        </>
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
                        <Server/>
                        { servers || !dbContent ? 
                            <div className="desktop">
                                <Channel/>
                                <Messaging />
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