import React, { useState, useEffect, useCallback, useRef } from 'react';
import NavBar from '../Forms/NavBar';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import '../../css/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([
        { sender: '', msg: '', time: '' }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [nameUser, setNameUser] = useState('');
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null);

    const WS_CONFIG = {
        WS_URL: 'http://localhost:8080/ws/chat',
        RECEIVE_TOPIC: 'chat/message',
        SEND_DESTINATION: 'receive/chat/message',
    };

    // Função para buscar mensagens iniciais
    async function fetchInitialMessages() {
        try {
            const response = await axios.get(`http://localhost:8080/chat/get/${userInfo.idPublic}`);
            const formattedMessages = response.data.content.map((msg) => ({
                sender: msg.sender,
                msg: msg.msg,
                time: msg.date,
            }));
            setMessages(formattedMessages);
            setNameUser(response.data.name);
        } catch (error) {
            console.error('Erro ao buscar mensagens iniciais', error);
        }
    }

    const handleMessageReceived = useCallback((message) => {
        try {
            const parsedMessage = JSON.parse(message.body);
            if (parsedMessage && parsedMessage.chat && parsedMessage.chat.content) {
                const newMessages = parsedMessage.chat.content.map((msg) => ({
                    sender: msg.sender,
                    msg: msg.msg,
                    time: msg.date,
                }));
    
                // Substitui as mensagens anteriores com as novas
                setMessages(newMessages);
            } else {
                console.warn('Mensagem no formato incorreto:', parsedMessage);
            }
        } catch (error) {
            console.error('Erro ao processar a mensagem:', error);
        }
    }, []);

    // Inicializa o WebSocket
    function initializeWebSocket() {
        if (stompClientRef.current) {
            console.warn('WebSocket já está conectado.');
            return;
        }

        const socket = new SockJS(WS_CONFIG.WS_URL);
        const client = new Client({
            webSocketFactory: () => socket,
            debug: (message) => console.log('STOMP Debug:', message),
            onConnect: () => {
                console.log('Conectado ao WebSocket');
                client.subscribe(WS_CONFIG.RECEIVE_TOPIC, handleMessageReceived);
            },
            onDisconnect: () => {
                console.log('Desconectado do WebSocket');
                stompClientRef.current = null;
            },
        });

        client.activate();
        stompClientRef.current = client;
    }

    // Função para enviar mensagem pelo WebSocket
    function handleSendMessage() {
        const client = stompClientRef.current;
        if (client && client.connected && newMessage.trim()) {
            client.publish({
                destination: WS_CONFIG.SEND_DESTINATION,
                body: JSON.stringify({
                    sender: userInfo.name,
                    message: newMessage,
                    uuidUser: userInfo.idPublic,
                }),
            });
            setNewMessage('');
        } else {
            console.warn('WebSocket não está conectado ou mensagem vazia.');
        }
    }

    // Rola para o final do chat
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Efeito para rolar o chat sempre que as mensagens forem atualizadas
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Lógica de inicialização
    useEffect(() => {
        fetchInitialMessages();
        initializeWebSocket();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                console.log('WebSocket desconectado.');
                stompClientRef.current = null;
            }
        };
    }, [userInfo.idPublic]);

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.sender}: </strong> {msg.msg} <span>{new Date(msg.time).toLocaleTimeString()}</span>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Digite sua mensagem..."
                    />
                    <button onClick={handleSendMessage}>Enviar</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
