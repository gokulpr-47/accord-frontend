import { useContext, useEffect } from 'react'
import InfoContext from '../../Context/InfoContext'
import ServersContext from '../../Context/ServersContext'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UserContext from '../../Context/UserContext'
import useAuth from '../../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Server(){

    const info = useContext(InfoContext)
    const { auth } = useAuth()
    const {servers, setServers, activeServer, setActiveServer, setActiveChannel} = useContext(ServersContext)    
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
            } catch(err){
                console.log(err)
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

    const element = servers?.map((server) =>(
        <div className="server-container" onClick={(e)=>findActiveServer(e)} key={server.id}>
            <p>{server?.server_name?.match(/\b(\w)/g).join('')}</p>
        </div>  
    ))

    function pop(){
        info.pop();
    }
    
    return(
        <div className="server">
            {element}
            <div className="new-join" onClick={()=>pop()}>
                <h1>+</h1>
            </div>
        </div>
    )
}