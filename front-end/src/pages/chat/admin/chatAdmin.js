import React, { useState, useEffect } from "react";
import "./chatAdmin.css";
import NavBar from "../../../components/navbar/NavBar";
import chatAdminService from "../../../services/chatAdminService";

function ChatAdmin() {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {

        const result = await chatAdminService.getChats();

        if (result.chats){

            setChats(result.chats)

            console.log(chats)
        }

    };


    useEffect(() => {
        fetchChats();
    }, []);
   
    return (
        <div>
            <NavBar />

            <div className="container-sm" id="chat-container">

                <div className="col-6" id="user-list">

                <h3>Usuários</h3>
                
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <div key={chat.id} className="user-item">
                                {chat.name}
                            </div>
                        ))
                    ) : (
                        <p>Carregando...</p>
                    )}
                    
                </div>

                <div className="col" id="chat-box">

                    <div className="container" id="msg-list">

                    </div>

                    <input type="text" id="input"/>
                    
                </div>

            </div>

        </div>
    );
}

export default ChatAdmin;
