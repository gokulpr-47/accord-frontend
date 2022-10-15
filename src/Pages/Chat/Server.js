import { useEffect, useState } from 'react'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useLogout from '../../hooks/useLogout'
import useChat from '../../hooks/useChat';

export default function Server(){
    const { setInfo , servers, setServers,setActiveServer, setActiveChannel, setDbContent, setSidebar} = useChat();
    const logout = useLogout();
    const { serverId, channelId } = useParams()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || '/signin';

    const [selected, setSelected] = useState();
    const email = auth.email

    // const [ clicked, setClicked ] = useState(0);

    useEffect(()=>{
        setSelected(serverId)
    },[serverId])
    // console.log(clicked)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 
    
    const findActiveServer = async (e, server_id, server, i) => {
        const names = [];
        setSelected(server._id)
        servers.map((server) => (
            names.push(server.server_name.match(/\b(\w)/g).join(''))
        ))
        // setClicked(prev => prev+1)
        const serverIndex = servers?.findIndex(server => {
            return server._id === serverId
        })
        setActiveServer(serverIndex)
        const channelIndex = servers? servers[serverIndex]?.channels?.findIndex(channel => {
            return channel._id === channelId    
        }): ''
        setActiveChannel(channelIndex)
    }

    const element = servers?.map((server, i) =>(
        <Link to={`/channels/${server._id}/${servers[i].channels[0]._id}`} key={i}>
            <div className={`${server._id === selected? "server-container active": "server-container"}`} onClick={(e)=>findActiveServer(e, server._id, server, i)}>
                <p>{server?.server_name?.match(/\b(\w)/g).join('')}</p>
            </div>  
        </Link>
    ))
    
    function pop(){
        setInfo(prevState => !prevState)
        setSidebar(false);
    }
    
    const signout = async () => {
        await logout();
        navigate("/signin");
    }
    
    return(
        <div className="server">
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
