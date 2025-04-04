import axios from 'axios';

class chatService {

    static async getChat(idPublic) {

        try {

            const response = await axios.get(`http://192.168.3.103:8080/chat/get/${idPublic}`);

            if (response.status === 200) {

                return { chat: response.data.content};
                
            }

        } catch (error) {

            if (error.response && error.response.status === 500) {

                return { error: 'Tente mais tarde!' };

            } else {

                return { error: 'Erro interno, tente mais tarde.' };

            }
        }
    }
}

export default chatService;
