import axios from 'axios';

class changePasswordService {

    static async changePassword(newPass, oldPass) {

        const token = localStorage.getItem('token')

        try {

            const response = await axios.post(`http://192.168.3.103:8080/auth/change_Password`, {

                senhaAntiga: oldPass,
                senhaNova: newPass, 
                
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
               
            });

            if (response.status === 200) {
                
                return {
                    products: response.data.products,
                    totalPages: response.data.totalPages,
                    currentPage: response.data.currentPage
                };
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

export default changePasswordService;
