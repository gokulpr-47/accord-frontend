import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Split from 'react-split'
import Server from './Server'
import Channel from './Channel'
import useChat from '../../hooks/useChat'
import { useEffect } from 'react';

export default function Sidebar() {
    const { servers, sidebar, setSidebar } = useChat();

    const handleOnOpen = () => {
        console.log('clicked burger')
        setSidebar(true)
    }
    const handleOnClose = () => {
        console.log('close');
        setSidebar(false);
    }
    return (
        <Menu 
            customBurgerIcon={ <FontAwesomeIcon icon={faBars} /> }
            customCrossIcon={ <FontAwesomeIcon icon={faBars}/> }
            className="menu-container"
            onOpen={handleOnOpen}
            onClose={handleOnClose}
            isOpen={sidebar} 
        >
            <div className="chat-container">
                <Split
                    className="container-split"
                    sizes={[30,70]}
                    minSize={5}
                    expandToMin={false}
                    gutterSize={0}
                    snapOffset={30}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                >
                    <Server />
                    {
                        servers?
                            <Channel />:
                            <p>Loading...</p>
                    }
                </Split>
            </div>
        </Menu>
    );
};