import { useContext, useEffect } from 'react'
import InfoContext from '../../Context/InfoContext'
import ServersContext from '../../Context/ServersContext'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserContext from '../../Context/UserContext'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useLogout from '../../hooks/useLogout'

export default function Server(){
    // const serverId = props.serverId

    const logout = useLogout();

    const info = useContext(InfoContext)
    const { auth } = useAuth()
    const {servers, setServers, activeServer, setActiveServer, setActiveChannel, dbContent, setDbContent, home, setHome} = useContext(ServersContext)    
    const axiosPrivate = useAxiosPrivate();
    
    const navigate = useNavigate();
    const location = useLocation ();
    const from = location.state?.from?.pathname || '/signin';


    useEffect(()=>{
        const getServer = async () => {
            const email = auth.email
            
            try{
                const response = await axiosPrivate.get('/createServer',{
                    params: { "email": email }
                }) 
                await setServers(response.data.dbserver)
                await setDbContent(response.data.dbserver.length)
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
    
    const findActiveServer = (e) => {
        const names = [];
        servers.map((server) => (
            names.push(server.server_name.match(/\b(\w)/g).join(''))
        ))

        // let index = names.indexOf(e.target.innerText)
        // setActiveServer(servers[index].id)
        setActiveServer(names.indexOf(e.target.innerText))
        setActiveChannel(0)
    }

    let initParam = servers? `${servers[activeServer]?.channels? servers[activeServer].channels[0]?._id : ''}` : ' '

    const element = servers?.map((server, i) =>(
        <Link to={`/channels/${server._id}/${initParam}`}>
            <div className="server-container" onClick={(e)=>findActiveServer(e)} key={i}> 
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