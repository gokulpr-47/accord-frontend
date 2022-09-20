import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Split from 'react-split'
import Server from './Server'
import Channel from './Channel'
import useChat from '../../hooks/useChat'

export default function Sidebar() {
    const { servers } = useChat();
    return (
        <Menu 
            isOpen={true} 
            customBurgerIcon={  <FontAwesomeIcon icon={faBars} /> }
            customCrossIcon={ <FontAwesomeIcon icon={faBars} /> }
            className="menu-container"
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