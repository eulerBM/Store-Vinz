import { useState } from 'react';
import NavBar from '../Forms/NavBar';
import '../../css/Chat.css'; 

function Chat() {
    const [messages, setMessages] = useState([]); // Armazena as mensagens
    const [input, setInput] = useState(''); // Controla o que o usuário digita

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend(); 
    }
    }

    const handleSend = () => {
        if (input.trim() === '') return; // Não envia mensagens vazias

        
        // Adiciona a mensagem ao histórico
        setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);

        // Simula a resposta automática
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: 'Obrigado pela sua mensagem! Estamos analisando.' },
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
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${message.sender}`}
                        >
                            {message.text}
                        </div>
                    ))}
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
