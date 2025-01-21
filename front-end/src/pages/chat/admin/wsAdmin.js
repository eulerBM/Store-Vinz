import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WS_CONFIG = {
  WS_URL: 'http://192.168.3.103:8080/ws/chat',
  RECEIVE_TOPIC: 'chat/message',
  SEND_DESTINATION: 'receive/chat/message',
};

class WebSocketService {
  constructor(config = WS_CONFIG) {
    this.config = config;
    this.stompClient = null;
  }

  // Inicializa o WebSocket
  initialize(handleMessageReceived) {
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
        client.subscribe(this.config.RECEIVE_TOPIC, (message) => {
          try {
            const parsedMessage = JSON.parse(message.body);
            handleMessageReceived?.(parsedMessage);
          } catch (error) {
            console.error('Erro ao processar mensagem recebida:', error);
          }
        });
      },
      onDisconnect: () => {
        console.log('Desconectado do WebSocket');
        this.stompClient = null;
      },
      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      },
    });

    // Atribuindo o stompClient antes de ativá-lo
    this.stompClient = client;

    client.activate();
  }

  // Envia uma mensagem para o WebSocket
  sendMessage(sender, message, uuidUser) {
    if (this.stompClient) {
      if (this.stompClient.connected) {
        try {
          this.stompClient.publish({
            destination: this.config.SEND_DESTINATION,
            body: JSON.stringify({
                sender: sender,
                message: message,
                uuidUser: uuidUser
            }),
          });
          console.log('Mensagem enviada:', message);
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error);
        }
      } else {
        console.warn('WebSocket está desconectado, tentando reconectar...');
        // Opcional: reativar o cliente
        this.initialize();
      }
    } else {
      console.warn('stompClient não está inicializado.');
    }
  }

  // Desconecta o WebSocket
  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('WebSocket desconectado.');
      this.stompClient = null;
    }
  }
}

export default WebSocketService;
