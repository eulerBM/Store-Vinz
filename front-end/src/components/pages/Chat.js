import React, { useState, useEffect } from 'react';
import NavBar from '../Forms/NavBar';
import { createWebSocketClient, subscribeToTopic, sendMessage } from '../utils/WebSocket';
import '../../css/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Função chamada quando o WebSocket é conectado
    const handleConnect = (client) => {
        console.log('Connected to WebSocket');
        subscribeToTopic(client, '/chat/get-chat-response', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    };

    // Função chamada quando o WebSocket é desconectado
    const handleDisconnect = () => {
        console.log('Disconnected from WebSocket');
    };

    // Função para buscar as mensagens iniciais
    const fetchInitialMessages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/chat/get/${userInfo.idPublic}`);
            const data = await response.json();
            setMessages(data); // Supondo que a resposta seja um array de mensagens
        } catch (error) {
            console.error("Erro ao buscar mensagens iniciais", error);
        }
    };

    // Inicializa o WebSocket e busca as mensagens iniciais ao carregar o componente
    useEffect(() => {
        fetchInitialMessages(); // Buscar as mensagens iniciais

        const client = createWebSocketClient('http://localhost:8080/ws', handleConnect, handleDisconnect);
        setStompClient(client);

        return () => client.deactivate(); // Desativa o WebSocket ao desmontar o componente
    }, []);

    // Envia uma mensagem ao servidor
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            sendMessage(stompClient, '/app/chat/get-chat', {
                sender: userInfo.name,
                message: newMessage,
                uuidUser: userInfo.idPublic,
            });
            setNewMessage('');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className="chat-message">
                            <strong>{msg.sender}:</strong> {msg.message}
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
