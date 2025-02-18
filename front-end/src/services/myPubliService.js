import axios from 'axios';

class myPubliService{ 

    static async getMyPublics (idPublic, page){

        try {

            const response = await axios.get(`http://192.168.3.103:8080/products/meus_publicados/${idPublic}/${page}`)

            if (response.status === 200){

                return {

                    products: response.data.products,
                    image: response.data.image,
                    totalPages: response.data.totalPages,
                    page: response.data.currentPage
                }
            }

        } catch (error){
            
            if (error.response && error.response.status === 500) {

                return { error: 'Tente mais tarde!' };

            } else {

                return { error: 'Erro interno, tente mais tarde.' };

            }
        }
    }


}

export default myPubliService;