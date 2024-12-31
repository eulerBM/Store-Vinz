// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import NavBar from '../Forms/NavBar';
import { initializeWebSocket, sendMessageChat, disconnectWebSocket } from '../utils/wsChat';
import axios from 'axios';
import '../../css/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [nameUser, setNameUser] = useState('');

    // Função para buscar mensagens iniciais
    async function fetchInitialMessages() {
        try {
            const response = await axios.get(`http://localhost:8080/chat/get/${userInfo.idPublic}`);
            setMessages(response.data.content);
            setNameUser(response.data.name);
        } catch (error) {
            console.error("Erro ao buscar mensagens iniciais", error);
        }
    }

    // Lógica de WebSocket
    useEffect(() => {
        fetchInitialMessages();

        // Função para lidar com mensagens recebidas
        function handleMessageReceived(message) {
            console.log('Mensagem recebida do WebSocket:', message);
            setMessages((prevMessages) => [...prevMessages, message]); // Atualiza as mensagens
        }

        // Inicializa o WebSocket com o callback handleMessageReceived
        initializeWebSocket(handleMessageReceived);

        return () => {
            disconnectWebSocket(); // Desconecta o WebSocket ao desmontar
        };
    }, [userInfo.idPublic]);

    // Função para enviar mensagem
    function handleSendMessage() {
        if (newMessage.trim()) {
            sendMessageChat(userInfo.name, newMessage, userInfo.idPublic);
            setNewMessage('');
        }
    }

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{nameUser}: </strong> {msg.msg}
                        </div>
                    ))}
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
