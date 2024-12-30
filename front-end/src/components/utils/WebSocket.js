import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export const createWebSocketClient = (url, onConnect, onDisconnect) => {
    const socket = new SockJS(url);
    const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str),
        onConnect: () => onConnect(stompClient),
        onDisconnect: () => onDisconnect(),
    });

    stompClient.activate(); // Ativa o cliente
    return stompClient; // Retorna o cliente para uso
};

export const subscribeToTopic = (client, topic, callback) => {
    if (client) {
        client.subscribe(topic, (message) => {
            callback(JSON.parse(message.body)); // Processa a mensagem recebida
        });
    }
};

export const sendMessage = (client, destination, payload) => {
    if (client) {
        client.publish({
            destination,
            body: JSON.stringify(payload),
        });
    }
};
