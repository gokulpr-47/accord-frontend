import { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useLogout from '../../hooks/useLogout'
import useChat from '../../hooks/useChat';

export default function Server(){
    const { info, setInfo , servers, setServers, activeServer, setActiveServer, activeChannel, setActiveChannel, dbContent, setDbContent, home, setHome } = useChat();
    const logout = useLogout();
    const { serverId, channelId } = useParams()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || '/signin';

    const [selected, setSelected] = useState();
    const email = auth.email

    const [ clicked, setClicked ] = useState(0);

    useEffect(()=>{
        const getServer = async () => {
            
            try{
                const response = await axiosPrivate.get('/createServer',{
                    params: { "email": email }
                }) 
                setServers(response.data.dbserver)
                setDbContent(response.data.dbserver.length)
            } catch(err){
                console.log(err)
                navigate(from, { replace: true});
            }
        }
        getServer();
    },[]) 

    useEffect( async () => {
        try{
            const res = await axiosPrivate.get(`/createServer/${serverId}/${channelId}`,{
                params: {
                    "email": email
                }
            })
            await setServers(res.data.dbserver)
            await setDbContent(res.data.dbserver.length)
            if(!activeServer){
                const currentServer = res.data.dbserver.findIndex(server => {
                    return server._id === serverId
                })
                setActiveServer(currentServer)
                const currentChannel = res.data.dbserver[currentServer]?.channels?.findIndex(channel => {
                    return channel._id === channelId
                })
                setSelected(serverId)
                setActiveChannel(currentChannel)

            }
        } catch(err) {
            console.log(err)
        }
    },[activeServer, clicked])
    
    const findActiveServer = async (e, server_id, server, i) => {
        const names = [];
        setSelected(server._id)
        servers.map((server) => (
            names.push(server.server_name.match(/\b(\w)/g).join(''))
        ))

        setActiveServer(i)
        setClicked(prev => prev+1)
    }

    const element = servers?.map((server, i) =>(
        <Link to={`/channels/${server._id}/${server.channels[0]._id}`} key={i}>
            <div className={`${server._id === selected? "server-container active": "server-container"}`} onClick={(e)=>findActiveServer(e, server._id, server, i)}>
                <p>{server?.server_name?.match(/\b(\w)/g).join('')}</p>
            </div>  
        </Link>
    ))
    
    function pop(){
        setInfo(prevState => !prevState)
    }
    
    const signout = async () => {
        await logout();
        navigate("/signin");
    }
    
    return(
        <div className="server">
            {/* <Link to={'/channels'}>
                <div className="home-container">
                    <p>^</p>
                </div>
            </Link> */}
            {element}
            <div className="new-join" onClick={()=>pop()}>
                <h1>+</h1>
            </div>
            <div className="logout" onClick={() => signout()}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
        </div>
    )
}