import { useState, useEffect } from "react";
import NavBar from "../components/Forms/NavBar";
import axios from "axios";

function ChatAdmin() {
    const [chats, setChats] = useState([]);
    const [responses, setResponses] = useState([]); // Armazenar respostas de cada chat
    const getInfosUser = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:8080/chat/get/chats");
                if (response.data) {
                    setChats(response.data);
                    console.log(response);
                } else {
                    console.error("Formato inesperado de resposta:", response.data);
                }
            } catch (error) {
                console.error("Erro ao buscar mensagens:", error);
            }
        };

        fetchMessages();
    }, []);

    // Função para capturar a resposta digitada no textarea
    const handleTextChange = (e, index) => {
        const newResponses = [...responses];
        newResponses[index] = e.target.value; // Atualiza a resposta do chat específico
        setResponses(newResponses);
    };

    // Função para capturar o clique do botão e enviar a mensagem
    const handleButtonClick = async (index, uuidUser) => {
        const message = responses[index]; // Resposta do usuário no chat específico
        if (!message || message.trim() === "") {
            console.error("Mensagem não pode ser vazia.");
            return;
        }
        console.log(`Mensagem enviada: ${message}`);

        try {
            // Enviar a resposta para o servidor
            await axios.post("http://localhost:8080/chat/send", {
                sender: getInfosUser.role,
                message: message,
                uuidUser: uuidUser
            });
            
            console.log("Mensagem enviada com sucesso!");

            // Limpar o campo de resposta após o envio bem-sucedido
            const newResponses = [...responses];
            newResponses[index] = ""; // Limpa a resposta do chat específico
            setResponses(newResponses);

        } catch (error) {
            console.error("Erro ao enviar a mensagem:", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="container mt-3">
                {chats.map((chat, index) => (
                    <div key={chat.id} className="accordion" id={`accordionExample${index}`}>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded={index === 0} // Apenas o primeiro item aberto por padrão
                                    aria-controls={`collapse${index}`}
                                >
                                    Chat: {chat.name || `Chat ${index + 1}`}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent={`#accordionExample${index}`}
                            >
                                <div className="accordion-body">
                                    <strong>Mensagens:</strong>
                                    <ul>
                                        {chat.content && chat.content.length > 0 ? (
                                            chat.content.map((message, msgIndex) => (
                                                <li key={msgIndex}>
                                                    <strong>{message.sender}:</strong> {message.msg}
                                                    <br />
                                                    <small className="text-muted">{new Date(message.date).toLocaleString()}</small>
                                                </li>
                                            ))
                                        ) : (
                                            <p>Sem mensagens</p>
                                        )}
                                    </ul>
                                    <div className="mb-3">
                                        <label htmlFor={`textarea${index}`} className="form-label">
                                            Digite para responder o usuário
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id={`textarea${index}`}
                                            rows="3"
                                            value={responses[index] || ""}
                                            onChange={(e) => handleTextChange(e, index)} 
                                        ></textarea>
                                    </div>
                                    <button
                                        id={`buttonEnviar${index}`}
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => handleButtonClick(index, chat.uuidUser)}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ChatAdmin;
