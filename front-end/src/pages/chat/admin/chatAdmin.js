import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import NavBar from "../../../components/navbar/NavBar";
import './chatAdmin.css';
import chatAdminService from '../../../services/chatAdminService';

const ChatAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const stompClient = useRef(null);

  if (!userInfo || !userInfo.role) {
    throw new Error('Informações do usuário não encontradas ou inválidas.');
  }

  useEffect(() => {

    const socket = new SockJS('http://192.168.3.103:8080/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.current.subscribe(`/chat/user/${selectedUser.idPublic}`, ({ body }) => {
          setMessages(prev => [...prev, JSON.parse(body)]);
        });
      },
      onStompError: error => console.error('Erro STOMP:', error),
    });

    stompClient.current.activate();
    return () => stompClient.current?.deactivate();
  }, [userInfo.idPublic]);

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
      if (response.chat && response.chat.data && Array.isArray(response.chat.data.content)) {
        setMessages(response.chat.data.content);
        setSelectedUser(user);
        console.log(selectedUser)
      } else {
        console.error("Formato de dados inesperado:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar chat:", error);
    }
  };

  const sendMessage = (dateNow) => {
    if (!selectedUser) {
      console.warn("Nenhum usuário selecionado.");
      return;
    }

    if (!newMessage.trim()) {
      console.warn("Mensagem vazia não será enviada.");
      return;
    }

    console.log("o botão ta funcionando :D")

    stompClient.current.publish({
      destination: "/chat/message/boss",
      body: JSON.stringify({
        nome: userInfo.name,
        senderIdPublicUser: selectedUser.uuidUser,
        senderIdPublicBoss: userInfo.idPublic,
        role: userInfo.role,
        message: newMessage,
        timestamp: dateNow,
      }),
    });

    setNewMessage("")

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

  const renderUserList = () => {
    if (!Array.isArray(users)) {
      return null;
    }

    return users.map(renderUserItem);
  };

  useEffect(() => {
    const container = document.querySelector('.messages-container');
    if (container) {
      container.scrollTop = container.scrollHeight; // Rola até o final
    }
  }, [messages]);

  const renderMessages = () => {
    if (!Array.isArray(messages)) {
      return null;
    }

    return messages.map((message, index) => (
      <div
        key={index}
        className={`message ${[userInfo.name].includes(message.sender) ? 'sent' : 'received'}`}
      >
        <div className="message-content">
          <p>{message.msg}</p>
          <small>{new Date(message.date).toLocaleTimeString()}</small>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <NavBar />
      <div className="admin-chat-container">
        <div className="user-list">
          <h5 className="mb-0">Usuários</h5>
          <div className="user-list-content">{renderUserList()}</div>
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
                  sendMessage(new Date());
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