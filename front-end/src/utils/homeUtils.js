class homeUtils{

    static formatPrice (price){
        if (!price) return "0,00";

        return parseFloat(price).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
}

export default homeUtils;