import axios from 'axios';

class homeService {

    static async getAllProducts(pageAtual) {
        try {
            const response = await axios.get(`http://192.168.3.103:8080/products/all/${pageAtual}`);

            if (response.status === 200) {
                
                return {
                    products: response.data.products,
                    image: response.data.image,
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

export default homeService;
