// import { useState } from 'react'
// import Channel from './Channel'
// import Server from './Server'
// import Messaging from './Messaging'
// import Split from 'react-split'
// import './chat.css'

// export default function Chat(){
//     const [server, setServer] = useState([1])

//     return(
//         <div className="chat-container">
//             <Split
//                 className="container-split"
//                 sizes={[5, 20, 75]}
//                 minSize={5}
//                 expandToMin={false}
//                 gutterSize={0}
//                 snapOffset={30} 
//                 dragInterval={1}
//                 direction="horizontal"
//                 cursor="col-resize"
//             >
//                 <Server server={server} />
//                 <Channel />
//                 <Messaging />
//             </Split>
//         </div>
//     )
// }

import React, {useEffect} from 'react';
import SideBar from './Sidebar';
import { useState, createContext } from 'react'
import './chat.css';
import windows from '../../Context/WindowSizeContext'
import Messaging from './Messaging'

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default function Chat() {
    const [ windowSize, setWindowSize ] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },[]); 

    return (
        <div id="App">
            <windows.Provider value={windowSize}>
                <SideBar width={windowSize}/>
            </windows.Provider>
            <div id="page-wrap">
                <Messaging/>
            </div>
        </div>
    );
}