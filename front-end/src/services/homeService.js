import axios from 'axios';

class homeService {

    static getAllProducts (pageAtual) {

        try {
    
            const response = axios.get(`http://192.168.3.103:8080/products/all/${pageAtual}`)
    
            if (response.status === 200) {
    
                const allProducts = response.data.products;
                const totalPages = response.data.totalPages;
                const pageAtual = response.data.currentPage;
    
                return  allProducts, totalPages, pageAtual
    
    
            }
    
        } catch (error) {
    
            if (error.response && error.response.status === 500){
                return 'Tente mais tarde!'
            } else {
    
                return 'Erro interno, tente mais tarde'
            }

        }
    
    }
    
}

export default homeService;

