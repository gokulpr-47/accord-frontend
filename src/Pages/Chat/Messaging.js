import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Messaging(){
    return(
        <div className="messaging">
            <div className="messaging-header">
                <h2>Channel 1</h2>
            </div>
            <div className="messaging-chatarea">
                <Row className="chats">
                    <Col className="user-icon">
                        <p>GP</p>
                    </Col>
                    <Col className="user-chat-container">
                        <div className="user-name">
                            <h4>Gokul P R</h4>
                        </div>
                        <div className="user-chat">
                            <p>This is the text that goes here.</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="messaging-textarea">
                <input type="text" name="" id="" className="textarea-input" placeholder="Enter text here...." />
                <FontAwesomeIcon icon={faPaperPlane} />
            </div>
        </div>
    )   
}