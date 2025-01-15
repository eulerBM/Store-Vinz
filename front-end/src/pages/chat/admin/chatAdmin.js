import React, { useState } from "react";
import NavBar from "../../../components/navbar/NavBar";
import "./chatAdmin.css";

const ChatAdmin = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Support Agent",
      text: "Olá! Como posso ajudar você hoje?",
      time: "10:00 AM",
    },
    {
      id: 2,
      user: "User",
      text: "Oi, tenho uma dúvida sobre minha conta",
      time: "10:02 AM",
    },
    {
      id: 3,
      user: "Support Agent",
      text: "Claro! Ficarei feliz em ajudar. O que você gostaria de saber sobre sua conta?",
      time: "10:05 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const users = [
    { id: 1, name: "Atendente", status: "online", role: "agent", avatar: "👩‍💼" },
    { id: 2, name: "João Silva", status: "online", role: "user", avatar: "👤" },
    {
      id: 3,
      name: "Maria Santos",
      status: "online",
      role: "user",
      avatar: "👤",
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      status: "waiting",
      role: "user",
      avatar: "👤",
    },
    { id: 5, name: "Ana Costa", status: "waiting", role: "user", avatar: "👤" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: "User",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");

      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          user: "Support Agent",
          text: "Obrigado pela sua mensagem. Nossa equipe de suporte irá ajudá-lo em breve.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, agentResponse]);
      }, 1000);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="container-fluid vh-100 p-0">
        <div className="row h-100 g-0">
          <div className="col-md-3 bg-dark text-white users-sidebar">
            <div className="p-4">
              <h2 className="mb-4 fs-4 fw-bold">
                <i className="bi bi-people-fill me-2"></i>
                Fila de Atendimento
              </h2>
              <div className="user-list">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="user-card mb-3 p-3 rounded bg-dark-subtle"
                  >
                    <div className="d-flex align-items-center">
                      <div className={`status-dot ${user.status} me-2`}></div>
                      <div className="user-avatar me-2">{user.avatar}</div>
                      <div>
                        <div className="fw-bold text-white">{user.name}</div>
                        <small className="text-light-emphasis">
                          {user.role === "agent" ? "Atendente" : "Cliente"}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-md-9 d-flex flex-column h-100">
            <div className="chat-header bg-primary text-white p-4">
              <h2 className="mb-0 fs-4">Central de Atendimento</h2>
              <p className="mb-0 text-light-emphasis">
                Estamos aqui para ajudar! Como podemos te auxiliar hoje?
              </p>
            </div>

            <div className="flex-grow-1 p-4 overflow-auto messages-container bg-light">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex ${
                    message.user === "User"
                      ? "justify-content-end"
                      : "justify-content-start"
                  } mb-3`}
                >
                  <div
                    className={`message ${
                      message.user === "User" ? "sent" : "received"
                    } 
                               p-3 rounded-3 ${
                                 message.user === "User"
                                   ? "bg-primary text-white"
                                   : "bg-white border"
                               }`}
                  >
                    <div className="message-info mb-1">
                      <small
                        className={
                          message.user === "User" ? "text-light" : "text-muted"
                        }
                      >
                        {message.user} - {message.time}
                      </small>
                    </div>
                    <div>{message.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-4 border-top bg-white"
            >
              <div className="input-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem aqui..."
                />
                <button type="submit" className="btn btn-primary btn-lg">
                  <i className="bi bi-send"></i> Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAdmin;
