import React, { useState, useEffect, useRef } from 'react';
import NavBar from "../../../components/navbar/NavBar"
import './chatAdmin.css';
import chatAdminService from '../../../services/chatAdminService';

const getUsers = await chatAdminService.getChats();
const getChat = await chatAdminService.getChat();

const mockUsers = [
  { id: 1, name: 'João Silva', status: 'online', lastMessage: 'Preciso de ajuda com meu pedido' },
  { id: 2, name: 'Maria Santos', status: 'offline', lastMessage: 'Obrigada pelo suporte!' },
  { id: 3, name: 'Pedro Oliveira', status: 'online', lastMessage: 'Como faço para...' },
];

const UserList = ({ onUserSelect, selectedUser }) => (
  <div className="user-list">
    <div className="user-list-header">
      <h5 className="mb-0">Usuários</h5>
      <span className="badge bg-primary">
        online 
      </span>
    </div>
    <div className="user-list-content">

    {getUsers.chats.map(user => (

        <div
          key={user.id}
          className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
          onClick={() => { onUserSelect(user); getUuidUser(user.uuidUser);}}
        >
          <div className="user-status">
            <span className={`status-indicator ${user.status}`}></span>
          </div>
          <div className="user-info">
            <h6 className="mb-1">{user.name}</h6>
            <p className="mb-0 text-truncate">{user.lastMessage}</p>
          </div>
        </div>

    ))}
      
      {mockUsers.map(user => (
        <div
          key={user.id}
          className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
          onClick={() => onUserSelect(user)}
        >
          <div className="user-status">
            <span className={`status-indicator ${user.status}`}></span>
          </div>
          <div className="user-info">
            <h6 className="mb-1">{user.name}</h6>
            <p className="mb-0 text-truncate">{user.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  if (!selectedUser) {
    return (
      <div className="chat-window chat-empty">
        <div className="empty-state">
          <i className="bi bi-chat-dots"></i>
          <h4>Selecione um usuário para iniciar o chat</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="user-info">
          <h5 className="mb-0">{selectedUser.name}</h5>
          <span className={`status ${selectedUser.status}`}>
            {selectedUser.status === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'admin' ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <small className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="message-input">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Digite sua mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!newMessage.trim()}
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

const getUuidUser = (uuidUser) => {

  const response = chatAdminService.getChat(uuidUser)

  



}

const ChatAdmin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState({});

  const handleUserSelect = (user) => {
    
    setSelectedUser(user);
  };

  const handleSendMessage = (message) => {
    if (!selectedUser) return;

    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedUser.id]: [
        ...(prevMessages[selectedUser.id] || []),
        {
          id: Date.now(),
          text: message,
          sender: 'admin',
          timestamp: new Date().toISOString()
        }
      ]
    }));
  };

  return (
    <div>
      <NavBar/>
    
      <div className="admin-chat-container">
        <UserList onUserSelect={handleUserSelect} selectedUser={selectedUser} />
        <ChatWindow 
          selectedUser={selectedUser}
          messages={messages[selectedUser?.id] || []}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatAdmin;
