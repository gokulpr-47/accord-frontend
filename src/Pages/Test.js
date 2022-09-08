import React from 'react'
import {useParams} from 'react-router-dom'

export default function Test(){
    const {testId} = useParams()
    return (
        <h1>Test: {testId}</h1>
    )
}