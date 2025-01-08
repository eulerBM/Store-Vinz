class NavBarEffect {
    
    static inputIncreaseSize(){

        const getInput = document.getElementById("inputSearch")
        
        getInput.style.width = "30%"
    }

    static inputReturnNormal(){
        
        const getInput = document.getElementById("inputSearch")

        getInput.style.width = null
    }

}

export default NavBarEffect;