import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const getInfosUser = JSON.parse(localStorage.getItem('userInfo'));
if (!getInfosUser || !getInfosUser.idPublic) {
  throw new Error('Informações do usuário não encontradas ou inválidas.');
}

const WS_CONFIG = {
  WS_URL: 'http://192.168.3.103:8080/ws/chat',
  RECEIVE_TOPIC: 'chat/message',
  SEND_DESTINATION: '/chat/message/boss',
  USER_CHANNEL: `chat/user/${getInfosUser.idPublic}`
};

class WebSocketService {
  constructor(config = WS_CONFIG) {
    this.config = config;
    this.stompClient = null;
  }

  // Inicializa o WebSocket
  initialize(handleMessageReceived, userId) {
    if (this.stompClient) {
      console.warn('WebSocket já está conectado.');
      return;
    }

    const socket = new SockJS(this.config.WS_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (message) => console.log('STOMP Debug:', message),
      onConnect: () => {
        console.log('Conectado ao WebSocket');

        // Inscrevendo-se no canal do usuário
        client.subscribe(this.config.USER_CHANNEL, (message) => {
          const parsedMessage = JSON.parse(message.body);
          console.log("------ RECEBI ---------");
          console.log(parsedMessage);
          handleMessageReceived?.(parsedMessage);
        });
      },
      onDisconnect: () => {
        console.log('Desconectado do WebSocket. Tentando reconectar...');
        setTimeout(() => this.initialize(handleMessageReceived, userId), 5000); // Reconecta após 5 segundos
      },
      onStompError: (frame) => console.error('Erro STOMP:', frame),
    });

    this.stompClient = client;
    try {
      client.activate();
    } catch (error) {
      console.error('Erro ao ativar o cliente STOMP:', error);
    }
  }

  // Envia uma mensagem para o WebSocket
  sendMessage(senderIdPublicUser, message) {
    if (this.stompClient) {
      if (this.stompClient.connected) {
        try {
          this.stompClient.publish({
            destination: this.config.SEND_DESTINATION,
            body: JSON.stringify({
              nome: getInfosUser.name,
              senderIdPublicUser:senderIdPublicUser,
              senderIdPublicBoss:getInfosUser.idPublic,
              role: getInfosUser.role,
              message: message,
              timestamp: new Date()
              
            }),
          });
          console.log('Mensagem enviada:', message);
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
        }
      } else {
        console.warn('WebSocket está desconectado, tentando reconectar...');
        this.initialize(); // Reconecta
      }
    } else {
      console.warn('stompClient não está inicializado.');
    }
  }

  // Desconecta o WebSocket
  disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.deactivate();
      console.log('WebSocket desconectado.');
      this.stompClient = null;
    }
  }
}

export default WebSocketService;