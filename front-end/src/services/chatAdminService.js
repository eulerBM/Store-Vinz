import axios from 'axios';

class chatAdminService {

    static async getChats() {
        try {
            const response = await axios.get(`http://192.168.3.103:8080/chat/get/chats`);

            if (response.status === 200) {

                return { chats: response.data };
                
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

export default chatAdminService;
