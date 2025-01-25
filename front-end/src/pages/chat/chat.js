import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import NavBar from '../../components/navbar/NavBar';
import axios from 'axios';
import './chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [nameUser, setNameUser] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const messagesEndRef = useRef(null);
    const stompClient = useRef(null);

    const SEND_MESSAGE_WS = "/chat/message/user";

    const sendMessageWs = (dateNow) => {
        if (!newMessage.trim() || !stompClient.current?.connected) return;

        stompClient.current.publish({
            destination: SEND_MESSAGE_WS,
            body: JSON.stringify({
                nome: userInfo.name,
                senderIdPublic: userInfo.idPublic,
                role: userInfo.role,
                message: newMessage,
                timestamp: dateNow,
            }),
        });

        setMessages(prev => [...prev, { sender: userInfo.role, msg: newMessage, time: dateNow }]);
        setNewMessage('');
    };

    const fetchInitialMessages = async () => {
        try {
            const { data } = await axios.get(`http://192.168.3.103:8080/chat/get/${userInfo.idPublic}`);
            setMessages(data.content.map(msg => ({
                sender: msg.sender,
                msg: msg.msg,
                time: msg.date,
                role: msg.role,
            })));
            setNameUser(data.name);
        } catch (error) {
            console.error('Erro ao buscar mensagens iniciais:', error);
        }
    };

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        fetchInitialMessages();

        const socket = new SockJS('http://192.168.3.103:8080/ws');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                stompClient.current.subscribe(`/chat/user/${userInfo.idPublic}`, ({ body }) => {
                    setMessages(prev => [...prev, JSON.parse(body)]);
                });
            },
            onStompError: error => console.error('Erro STOMP:', error),
        });

        stompClient.current.activate();
        return () => stompClient.current?.deactivate();
    }, [userInfo.idPublic]);

    useEffect(scrollToBottom, [messages]);

    return (
        <div>
            <NavBar />
            <div className="chat-window">
                <div className="chat-header">
                    <h5>Chat - {nameUser}</h5>
                </div>
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${['ADMIN', 'SUPER'].includes(message.role) ? 'received' : 'sent'}`}
                        >
                            <div className="message-content">
                                <p>{message.msg}</p>
                                <small>{new Date(message.time).toLocaleTimeString()}</small>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
                <form className="p-4 border-t" onSubmit={(e) => { e.preventDefault(); sendMessageWs(new Date()); }}>
                    <div className="input-group">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Digite sua mensagem..."
                        />
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
