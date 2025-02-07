import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import NavBar from '../../components/navbar/NavBar';
import chatService from '../../services/chatService';
import './chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const messagesEndRef = useRef(null);
    const stompClient = useRef(null);

    const sendMessageWs = (dateNow) => {
        if (!newMessage.trim() || !stompClient.current?.connected) return;

        stompClient.current.publish({
            destination: "/chat/message/user",
            body: JSON.stringify({
                nome: userInfo.name,
                senderIdPublic: userInfo.idPublic,
                role: userInfo.role,
                message: newMessage,
                timestamp: dateNow,
            }),
        });

        setMessages(prev => [...prev, { sender: userInfo.name, msg: newMessage, time: dateNow }]);
        setNewMessage('');
    
    };


    const fetchInitialMessages = async () => {

        try {

            const response = await chatService.getChat(userInfo.idPublic);

            console.log(response)

            setMessages(response.chat.map(msg => ({
                sender: msg.sender,
                msg: msg.msg,
                time: msg.date
            })));

        } catch (error) {

            console.error('Erro ao obter mensagens iniciais:', error);

        }
    };

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => {
        fetchInitialMessages()
        

        const socket = new SockJS('http://192.168.3.103:8080/ws');
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log(userInfo.idPublic)
                stompClient.current.subscribe(`/user/chat/${userInfo.idPublic}`, ({ body }) => {
                    console.log("to recendo o body do userChat: ", body)
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
                    <h5>Chat - {userInfo.name}</h5>
                </div>
                <div className="messages-container">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${[userInfo.name].includes(message.sender) ? 'sent' : 'received'}`}
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
