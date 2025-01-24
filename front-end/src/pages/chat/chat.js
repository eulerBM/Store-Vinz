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

    // Função para enviar mensagem via STOMP
    const sendMessageWs = (dateNow) => {

        if (newMessage.trim()) {
            // Verifique se o stompClient está inicializado e conectado
            if (stompClient.current && stompClient.current.connected) {
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
                
                const newMsgSendUser = ({
                    sender: userInfo.role,
                    msg: newMessage,
                    time: dateNow,

                })

                setMessages(prevMessages => prevMessages.concat(newMsgSendUser));
                setNewMessage('');
                console.log("Mensagem enviada com sucesso");
            } else {
                console.warn('STOMP não está conectado.');
            }
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
        const socket = new SockJS('http://192.168.3.103:8080/ws'); // Endereço do WebSocket no backend

        stompClient.current = new Client({
            webSocketFactory: () => socket,
            onConnect: (frame) => {
                console.log('Conectado ao servidor WebSocket via STOMP:', frame);

                // Inscreve-se no tópico para receber mensagens
                stompClient.current.subscribe(`/chat/user/${userInfo.idPublic}`, (messageOutput) => {
                    const message = JSON.parse(messageOutput.body);
                    setMessages((prevMessages) => [...prevMessages, message]);
                });
            },
            onStompError: (error) => {
                console.error('Erro STOMP: ', error);
            },
        });

        stompClient.current.activate();

        // Cleanup na desmontagem do componente
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
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
                className={`message ${!['ADMIN', 'SUPER'].includes(message.sender) ? 'sent' : 'received'}`}
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
                <form className="p-4 border-t">
                    <div className="input-group">
                        <input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Digite sua mensagem..."
                        />
                        <button onClick={(e) => {e.preventDefault(); const dateNowE = new Date(); sendMessageWs(dateNowE)}} className="btn btn-primary" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Chat;
