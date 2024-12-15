import { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import NavBar from '../Forms/NavBar';
import axios from 'axios';
import '../../css/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]); // Armazena as mensagens
    const [input, setInput] = useState(''); // Controla o que o usuário digita
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Controla o estado do emoji picker
    const getInfosUser = JSON.parse(localStorage.getItem("userInfo"));
    const messagesEndRef = useRef(null);

    // Função para rolar até o final do chat
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Rola automaticamente para o final quando mensagens são atualizadas
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Função para buscar histórico de mensagens
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post("http://localhost:8080/chat/get", {
                    uuidUser: getInfosUser.idPublic // Enviado no request body
                });

                if (response.data && Array.isArray(response.data.content)) {
                    setMessages(response.data.content);
                } else {
                    console.error("Formato inesperado de resposta:", response.data);
                    setMessages([]);
                }
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
                setMessages([]);
            }
        };

        fetchMessages();
    }, [getInfosUser.idPublic]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const sendMessagesServer = () => {
        try {
            axios.post("http://localhost:8080/chat/send", {
                sender: "USER",
                message: input,
                uuidUser: getInfosUser.idPublic
            }).then((response) => {
                if (response.status === 200) {
                    setMessages((prevMessages) => [...prevMessages, { sender: 'USER', msg: input, date: new Date().toISOString() }]);
                } else {
                    setMessages((prevMessages) => [...prevMessages, { sender: 'Sistema', msg: "Não foi possível enviar essa mensagem!", date: new Date().toISOString() }]);
                }
            });
        } catch (error) {
            console.error("Erro ao enviar mensagens:", error);
            setMessages([]);
        }
    };

    const handleSend = () => {
        if (input.trim() === '') return;

        sendMessagesServer();

        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'BOT', msg: 'Obrigado pela sua mensagem! Estamos analisando.', date: new Date().toISOString() },
            ]);
        }, 1000);

        setInput('');
    };

    const onEmojiClick = (event, emojiObject) => {
        setInput((prevInput) => prevInput + emojiObject.emoji); // Adiciona o emoji ao texto atual
    };

    return (
        <div>
            <NavBar />
            <div className="chat-container">
                <h2 className="chat-header">Chat de Suporte</h2>

                {/* Área de mensagens com scroll */}
                <div className="chat-messages">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender.toLowerCase()}`}>
                                <p className="chat-sender">
                                    {message.sender === "USER" ? "Você" : message.sender}
                                </p>
                                <p className="chat-text">{message.msg}</p>
                                <p className="chat-date">{new Date(message.date).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>Sem mensagens no histórico.</p>
                    )}

                    {/* Elemento usado para rolar até o final */}
                    <div ref={messagesEndRef}></div>
                </div>

                {/* Campo de entrada e botão */}
                <div className="chat-input-container">
                    <button
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        className="emoji-button"
                    >
                        😊
                    </button>
                    {showEmojiPicker && (
                        <div className="emoji-picker-container">
                            <EmojiPicker onEmojiClick={onEmojiClick} />
                        </div>
                    )}
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite sua mensagem..."
                        className="chat-input"
                    />
                    <button
                        onClick={handleSend}
                        className="chat-button"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
