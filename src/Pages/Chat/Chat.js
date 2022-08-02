import React, { useState, useContext } from 'react';
import SideBar from './Sidebar';
import './chat.css';
import { useMediaQuery } from 'react-responsive'
import Server from './Server'
import Channel from './Channel'
import Messaging from './Messaging'
import Split from 'react-split'
import InfoContext from '../../Context/InfoContext'
// import Nav from 'react-bootstrap/Nav';

export default function Chat() {
    
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 992px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' })

    const [ info, setInfo ] = useState(false);
    
    function pop(){
        setInfo((prevState)=> !prevState);
    }

    return (
        <>
            { isTabletOrMobile &&
                <div id="App">
                    <InfoContext.Provider value={{ info, setInfo, pop}}>
                        <SideBar/>
                    </InfoContext.Provider>
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
                        <InfoContext.Provider value={{info,setInfo,pop}}>
                            <Server />
                        </InfoContext.Provider>
                        <Channel />
                        <Messaging />
                    </Split>
                </div>
            }
            { info && 
                <div className="popup" onClick={(e)=> e.currentTarget === e.target && pop()}>
                    <div className="popup-container">  
                        {/* <Nav fill variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/signup">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>      
                                <Nav.Link href="/signin">Loooonger NavLink</Nav.Link>
                            </Nav.Item>
                        </Nav> */}
                    </div>
                </div>
            }
        </>
    );
} 