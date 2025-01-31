import React, { useState, useEffect, useRef } from 'react';
import NavBar from "../../../components/navbar/NavBar";
import './chatAdmin.css';
import chatAdminService from '../../../services/chatAdminService';
import WebSocketService from './wsAdmin';

const ChatAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo || !userInfo.role) {
    throw new Error('Informações do usuário não encontradas ou inválidas.');
  }

  // ------------------- WS -------------------
  const webSocketService = useRef(null);

  const sendMessage = () => {
    if (!selectedUser) {
      console.warn("Nenhum usuário selecionado.");
      return;
    }

    if (!newMessage.trim()) {
      console.warn("Mensagem vazia não será enviada.");
      return;
    }

    if (webSocketService.current) {
      webSocketService.current.sendMessage(selectedUser.uuidUser, newMessage);
      setNewMessage(''); // Limpa o campo de mensagem após o envio
    } else {
      console.error("WebSocketService não inicializado.");
    }
  };

  useEffect(() => {
    const handleMessageReceived = (message) => {
      console.log('Mensagem recebida:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    if (!webSocketService.current) {
      webSocketService.current = new WebSocketService();
    }

    webSocketService.current.initialize(handleMessageReceived);

    return () => {
      if (webSocketService.current) {
        webSocketService.current.disconnect();
      }
    };
  }, []);

  //--------------------------------------------

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await chatAdminService.getChats();
        const { chats } = response;

        if (chats && Array.isArray(chats.data)) {
          setUsers(chats.data);
        } else {
          console.error("Formato de dados inesperado:", response);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchChats();
  }, []);

  const handleUserSelect = async (user) => {
    try {
      const response = await chatAdminService.getChat(user.uuidUser);
      setMessages(response.chat.data.content);
      setSelectedUser(user);
      console.log(user);
    } catch (error) {
      console.error("Erro ao buscar chat:", error);
    }
  };

  const renderUserItem = (user) => (
    <div
      key={user.id}
      className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
      onClick={() => handleUserSelect(user)}
    >
      <h6 className="mb-1">{user.name}</h6>
      <p className="mb-0">
        {user.lastMsg
          ? user.lastMsg.length > 20
            ? `${user.lastMsg.substring(0, 20)}...`
            : user.lastMsg
          : 'erro...'}
      </p>
    </div>
  );

  const renderMessages = () =>
    messages?.map((message, index) => (
      <div
        key={index}
        className={`message ${['ADMIN', 'SUPER'].includes(message.sender) ? 'sent' : 'received'}`}
      >
        <div className="message-content">
          <p>{message.msg}</p>
          <small>{new Date(message.date).toLocaleTimeString()}</small>
        </div>
      </div>
    ));

  return (
    <div>
      <NavBar />
      <div className="admin-chat-container">
        <div className="user-list">
          <h5 className="mb-0">Usuários</h5>
          <div className="user-list-content">{users.map(renderUserItem)}</div>
        </div>

        <div className="chat-window">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <h5 className="mb-0">{selectedUser.name}</h5>
              </div>
              <div className="messages-container">{renderMessages()}</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  type="text"
                  name="message"
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  required
                />
                <button type="submit">Enviar</button>
              </form>
            </>
          ) : (
            <div className="chat-empty">
              <h4>Selecione um usuário para iniciar o chat</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;