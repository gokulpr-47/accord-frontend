export default function Server(props){
    console.log(props);
    return(
        <div className="server">
            {props.name}
        </div>
    )
}