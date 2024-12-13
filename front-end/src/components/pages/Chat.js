import { useState, useEffect } from 'react';
import NavBar from '../Forms/NavBar';
import axios from 'axios';
import '../../css/Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]); // Armazena as mensagens
    const [input, setInput] = useState(''); // Controla o que o usuário digita
    const getInfosUser = JSON.parse(localStorage.getItem("userInfo"));

    // Função para buscar histórico de mensagens
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.post("http://localhost:8080/chat/get", {
                    uuidUser: getInfosUser.idPublic // Enviado no request body
                });

                // Verifica se o campo content existe e é um array
                if (response.data && Array.isArray(response.data.content)) {
                    setMessages(response.data.content);
                } else {
                    console.error("Formato inesperado de resposta:", response.data);
                    setMessages([]); // Garante que será um array vazio em caso de erro
                }
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
                setMessages([]); // Em caso de erro, evita estado inválido
            }
        };

        fetchMessages();
    }, [getInfosUser.idPublic]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    function sendMessagesServer(){

        try {

            const response = axios.post("http://localhost:8080/chat/send",
                {
                    sender: "USER",
                    message: input,
                    uuidUser: getInfosUser.idPublic
                }
            )
            if(response.status === 200){

                setMessages((prevMessages) => [...prevMessages, { sender: 'USER', msg: input, date: new Date().toISOString() }]);

            } else {

                setMessages((prevMessages) => [...prevMessages, { sender: 'USER', msg: "Não foi possivel enviar essa mensagem !", date: new Date().toISOString() }]);

            }

        } catch (error) {

            console.error("Erro ao enviar mensagens:", error);
            setMessages([]); 
        }

        
    }

    const handleSend = () => {
        if (input.trim() === '') return; // Não envia mensagens vazias

        sendMessagesServer();

        // Simula a resposta automática
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'ADMIN', msg: 'Obrigado pela sua mensagem! Estamos analisando.', date: new Date().toISOString() },
            ]);
        }, 1000);

        setInput(''); // Limpa o campo de entrada
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
                                    {message.sender === "USER" ? "Você" : message.sender} {/* Condicional simples para troca do nome */}
                                </p>
                                <p className="chat-text">{message.msg}</p>
                                <p className="chat-date">{new Date(message.date).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>Sem mensagens no histórico.</p> 
            )}
                </div>

                {/* Campo de entrada e botão */}
                <div className="chat-input-container">
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
