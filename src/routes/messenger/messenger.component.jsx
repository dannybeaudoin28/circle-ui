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
                console.log('logging data inside fetchData: ', response.data);
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
        <div>
            <h1>Messenger</h1>
            <ul>
                {messages && messages
                    .filter(message => message.messageReceiver.userId !== receiveId)
                    .map((message) => (
                        <li key={message.messageId}>{message.messageBody}</li>
                    ))}
            </ul>
        </div>
    );
}

export default Messenger;