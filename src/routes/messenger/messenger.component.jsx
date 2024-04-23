import { useState, useEffect } from 'react';
import './messenger.styles.scss';

import axios from 'axios';

import { useParams } from 'react-router-dom';

const Messenger = () => {
    const { sendId, receiveId } = useParams();
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseUrl = 'http://localhost:8888';
    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('testing')
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

    return (
        <div className="messenger-container">
            <h1 className="messenger-title">Messenger</h1>
            <ul className="message-list">
                {messages && messages
                    .map((message) => (
                        <li
                            key={message.messageId}
                            className={`message-item ${message.messageReceiverId == receiveId ? 'receiver-message' : 'sender-message'}`}
                        >

                            <div className="message-text">{message.messageBody} {message.messageReceiverId}</div>
                            <div className="message-timestamp">Timestamp: {message.timestamp}</div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Messenger;