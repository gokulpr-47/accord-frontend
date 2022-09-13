import React from 'react'
import Server from './Chat/Server'
import './Chat/chat.css'
import Split from 'react-split'

export default function Home(){

    return(
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
        </Split>
    )
}