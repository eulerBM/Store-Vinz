// src/utils/wsChat.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const CONFIG = {
    WS_URL: 'http://localhost:8080/ws/chat', 
    RECEIVE_TOPIC: 'chat/message', 
    SEND_DESTINATION: 'receive/chat/message', 
};

let stompClient = null;
let messages = [];

// Inicializa o WebSocket
export function initializeWebSocket(handleMessageReceived) {
    if (stompClient) {
        console.warn('WebSocket já está conectado.');
        return;
    }

    const socket = new SockJS(CONFIG.WS_URL);
    stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (message) => console.log('STOMP Debug:', message),
        onConnect: handleConnect,
        onDisconnect: handleDisconnect,
    });

    stompClient.activate();

    function handleConnect() {
        console.log('Conectado ao WebSocket');
        stompClient.subscribe(CONFIG.RECEIVE_TOPIC, function (message) {
            try {
                const parsedMessage = JSON.parse(message.body.chat.content); // Verifica se o conteúdo é JSON
                if (parsedMessage && parsedMessage.message) {
                    console.log('Mensagem recebida:', parsedMessage);
                    handleMessageReceived(parsedMessage); // Passa para o handleMessageReceived
                } else {
                    console.warn('Mensagem no formato incorreto:', parsedMessage);
                }
            } catch (error) {
                console.error('Erro ao processar a mensagem:', error);
            }
        });
    }

    function handleDisconnect() {
        console.log('Desconectado do WebSocket');
        stompClient = null; // Reseta o cliente ao desconectar
    }
}

// Envia uma mensagem pelo WebSocket
export function sendMessageChat(sender, message, uuidUser) {
    if (stompClient === null || !sender || !message || !uuidUser) {
        console.warn('Parâmetros inválidos ou WebSocket desconectado.');
        return;
    }

    stompClient.publish({
        destination: CONFIG.SEND_DESTINATION,
        body: JSON.stringify({ sender, message, uuidUser }),
    });
}

// Desconecta o WebSocket
export function disconnectWebSocket() {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
        console.log('WebSocket desconectado.');
    }
}

// Recupera as mensagens recebidas
export function getMessages() {
    return messages; // Retorna a lista de mensagens
}
