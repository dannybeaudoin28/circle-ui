import { useState, useEffect, useRef } from 'react';
import './messenger.styles.scss';

import axios from 'axios';

import { useParams } from 'react-router-dom';

import Cookies from 'js-cookie';

const Messenger = () => {
    const baseUrl = 'http://localhost:8888';
    const jwtToken = Cookies.get('jwtToken'); 

    const { sendId, receiveId } = useParams();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [inputs, setInputs] = useState({
        messageBody: '',
        messageSenderId: sendId,
        messageReceiverId: receiveId
    });

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        const { messageBody } = inputs;

        event.preventDefault();

        if (messageBody.length > 0) {
            axios.post(baseUrl + '/messages/post-message', inputs, {
                headers: {
                    'Authorization': `Bearer ` + jwtToken,
                }
            }).then(response => {
                setMessages(messages => [...messages, response.data]);
                setInputs({
                    messageBody: '',
                    messageSenderId: sendId,
                    messageReceiverId: receiveId
                })
            }).catch(error => {
                console.error('error: ', error);
                setInputs({
                    messageBody: '',
                    messageSenderId: sendId,
                    messageReceiverId: receiveId
                })
            })
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(baseUrl + `/messages/get-messages/${sendId}/${receiveId}`, {
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                    }
                });
                console.log('logging data inside fetchData in messenger: ', response.data);
                console.log('also logging receiveId: ', receiveId);
                setMessages(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [jwtToken]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="messenger-container">
            <h1 className="messenger-title">Messenger</h1>
            <div className="messages-container">
                <div className="messages">
                    {messages.map(message => (
                        <div
                            key={message.messageId}
                            className={`message ${message.messageReceiverId == receiveId ? 'receiver' : 'sender'}`}
                        >
                            <div className="message-body">{message.messageBody}</div>
                            <div className="message-timestamp">{message.timestamp}</div>
                        </div>
                    ))}
                </div>
            </div>
            <form className="input-container" onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='messageBody'
                    value={inputs.messageBody}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );    
}

export default Messenger;