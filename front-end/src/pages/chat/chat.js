import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client'; // Importação do Socket.IO
import NavBar from '../../components/navbar/NavBar';
import axios from 'axios';
import './chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [nameUser, setNameUser] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const messagesEndRef = useRef(null);
    const socket = useRef(null);

    // Função para enviar mensagem via Socket.IO
    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            socket.current.emit('sendMessage', {
                sender: userInfo.name,
                msg: newMessage,
                userId: userInfo.idPublic,
            });
            setNewMessage('');
        } else {
            console.warn('Mensagem vazia não será enviada.');
        }
    };

    // Carrega mensagens iniciais do backend
    const fetchInitialMessages = async () => {
        try {
            const response = await axios.get(`http://192.168.3.103:8080/chat/get/${userInfo.idPublic}`);
            const formattedMessages = response.data.content.map((msg) => ({
                sender: msg.sender,
                msg: msg.msg,
                time: msg.date,
            }));
            setMessages(formattedMessages);
            setNameUser(response.data.name);
        } catch (error) {
            console.error('Erro ao buscar mensagens iniciais:', error);
        }
    };

    // Rola para o final do chat
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Inicializa o Socket.IO
        socket.current = io('http://192.168.3.103:8080'); // Altere para o endereço correto do backend

        // Conecta e escuta eventos
        socket.current.on('connect', () => {
            console.log('Conectado ao servidor Socket.IO');
            socket.current.emit('joinRoom', { userId: userInfo.idPublic });
        });

        // Recebe mensagens do servidor
        socket.current.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socket.current.on('disconnect', () => {
            console.log('Desconectado do servidor Socket.IO');
        });

        // Cleanup na desmontagem do componente
        return () => {
            socket.current.disconnect();
        };
    }, [userInfo.idPublic]);

    // Carrega mensagens iniciais e rola o chat para o final
    useEffect(() => {
        fetchInitialMessages();
    }, []);

    // Rola o chat sempre que as mensagens mudam
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const renderMessages = () =>
        messages.map((message, index) => (
            <div
                key={index}
                className={`message ${['ADMIN', 'SUPER'].includes(message.sender) ? 'sent' : 'received'}`}
            >
                <div className="message-content">
                    <p>{message.msg}</p>
                    <small>{new Date(message.time).toLocaleTimeString()}</small>
                </div>
            </div>
        ));

    return (
        <div>
            <NavBar />
            <div className="chat-window">
                <div className="chat-header">
                    <h5 className="mb-0">Chat - {nameUser}</h5>
                </div>
                <div className="messages-container">
                    {renderMessages()}
                    <div ref={messagesEndRef}></div>
                </div>
                <form onSubmit={sendMessage} className="p-4 border-t">
                    <div className="input-group">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Digite sua mensagem..."
                        />
                        <button className="btn btn-primary" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
