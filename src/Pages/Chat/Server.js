import { useContext, useEffect, useState } from 'react'
import InfoContext from '../../Context/InfoContext'
import ServersContext from '../../Context/ServersContext'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserContext from '../../Context/UserContext'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useLogout from '../../hooks/useLogout'

export default function Server(){
    
    const logout = useLogout();
    const { serverId, channelId } = useParams()
    const info = useContext(InfoContext)
    const { auth } = useAuth()
    const {servers, setServers, activeServer, setActiveServer, setActiveChannel, dbContent, setDbContent, home, setHome} = useContext(ServersContext)    
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || '/signin';

    const [selected, setSelected] = useState();
    const email = auth.email

    useEffect(()=>{
        const getServer = async () => {
            
            try{
                const response = await axiosPrivate.get('/createServer',{
                    params: { "email": email }
                }) 
                await setServers(response.data.dbserver)
                await setDbContent(response.data.dbserver.length)
                setActiveServer(0)
                setActiveChannel(0)
                if(response.data.dbserver.length === 0){
                    const response = await axiosPrivate.post('/home',
                        JSON.stringify({ email }),
                        {
                            headers: { 'Content-Type': 'application/json'},
                            withCredentials: true
                        }
                    );
                    setHome(true)
                }
            } catch(err){
                console.log(err)
                navigate(from, { replace: true});    
            }
        }
        getServer();
    },[]) 
    
    const findActiveServer = async (e, server_id, initParam, server) => {
        const names = [];
        servers.map((server) => (
            names.push(server.server_name.match(/\b(\w)/g).join(''))
        ))

        try{
            const res = await axiosPrivate.get(`/createServer/${server_id}/${initParam}`,{
                params: {
                    "email": email
                }
            })
            await setServers(res.data.dbserver)
            await setDbContent(res.data.dbserver.length)
            let currentServer = servers.map(server => {
                console.log('server._id: ', server._id, 'serverId: ', server_id)
                if(server._id === server_id ) return servers.indexOf(server)
                return 0
            })
            console.log('currentServer: ', currentServer.reduce((prev, curr) => prev + curr))
            // console.log('currentServer: ', currentServer)
            await setActiveServer(currentServer.reduce((prev, curr) => prev + curr))
            console.log('active server: ',activeServer)
            setActiveChannel(servers[activeServer]?.channels.map(channel => {
                if(channel._id === channelId ) return servers[activeServer].channels.indexOf(channel)
            }))
        } catch(err) {
            console.log(err)
        }

        // let index = names.indexOf(e.target.innerText)
        // setActiveServer(servers[index].id)
        // setActiveServer(names.indexOf(e.target.innerText))
        // setActiveChannel(0)
        setSelected(server._id)
    }

    let initParam = servers? `${servers[activeServer]?.channels ? servers[activeServer].channels[0]?._id : ''}` : ' '
    // console.log('channel id : ', servers?  servers[activeServer].channels[0]: '')

    const element = servers?.map((server, i) =>(
        <Link to={`/channels/${server._id}/${initParam}`}>
            <div className={`${server._id === selected? "server-container active": "server-container"}`} onClick={(e)=>findActiveServer(e, server._id, initParam, server)} key={i}>
                <p>{server?.server_name?.match(/\b(\w)/g).join('')}</p>
            </div>  
        </Link>
    ))

    function pop(){
        info.pop();
    }
    
    const signout = async () => {
        await logout();
        navigate("/signin");
    }
    
    return(
        <div className="server">
            <Link to={'/channels/me'}>
                <div className="home-container">
                    <p>^</p>
                </div>
            </Link>
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