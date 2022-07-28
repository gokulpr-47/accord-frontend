import React, {useContext, useState} from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import windows from '../../Context/WindowSizeContext'
import { useEffect } from 'react';
import Split from 'react-split'
import Server from './Server'
import Channel from './Channel'

export default props => {
    
    const users = useContext(windows);

    const [show, setShow] = useState(false)

    useEffect(()=>{
        if(users.innerWidth>992){
            setShow(true)
        }
        else{
            setShow(false)
        }
        console.log(show)
    },[users])
    return (
        <Menu 
            isOpen={show} 
            customBurgerIcon={ !show && <FontAwesomeIcon icon={faBars} /> }
            customCrossIcon={ !show && <FontAwesomeIcon icon={faBars} /> }
            disableOverlayClick={ show }
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
                    <Channel />
                </Split>
            </div>         
        </Menu>
    );
};