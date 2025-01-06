class NavBarE {

    static inputIncreaseSize(){
        var getInput = document.getElementById("inputSearch")

        getInput.style.width = "30%"
    }

    static inputReturnNormal(){
        var getInput = document.getElementById("inputSearch")

        getInput.style.width = null
    }
}

export default navbar