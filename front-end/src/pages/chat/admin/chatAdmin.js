import React, { useState, useEffect, useRef } from 'react';
import NavBar from "../../../components/navbar/NavBar";
import './chatAdmin.css';
import chatAdminService from '../../../services/chatAdminService';
import { Users } from 'lucide-react';

const ChatAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lastMsg, setLastMsg] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    chatAdminService.getChats().then(response => {

      console.log(response.chats.data)

        if (response.chats && Array.isArray(response.chats.data)) {

          setUsers(response.chats.data);

        } else {

          console.error("Formato de dados inesperado:", response);

        }
      })
      .catch(error => console.error("Erro ao buscar usuários:", error));
  }, []);

  const handleUserSelect = (user) => {
    chatAdminService.getChat(user.uuidUser)
      .then(response => {
        console.log(response.chat.data.content);
        setMessages(response.chat.data.content);
        setSelectedUser(user);
      })
      .catch(error => console.error("Erro ao buscar chat:", error));
  };

  const handleSendMessage = (message) => {
    if (!selectedUser) return;

    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now(),
        text: message,
        sender: 'admin',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div>
      <NavBar />
      <div className="admin-chat-container">
        <div className="user-list">
          <h5 className="mb-0">Usuários</h5>
          <div className="user-list-content">
            {users.map(user => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'active' : ''}`}
                onClick={() => handleUserSelect(user)}
              >
                <h6 className="mb-1">{user.name}</h6>
                <p className="mb-0">{user.lastMsg ? user.lastMsg.length > 20 ? `${user.lastMsg.substring(0, 20)}...` : user.lastMsg : 'erro...'}</p>
               
              </div>
            ))}
          </div>
        </div>

        <div className="chat-window">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <h5 className="mb-0">{selectedUser.name}</h5>
              </div>
              <div className="messages-container">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.sender === 'admin' ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      <p>{message.msg}</p>
                      <small>{new Date(message.date).toLocaleTimeString()}</small>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(e.target.message.value); e.target.reset(); }}>
                <input type="text" name="message" placeholder="Digite sua mensagem..." required />
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
