function Anonymous() {

    function IdGenerator(){
        
        const timestamp = Date.now().toString(36); 
        const randomPart = Math.random().toString(36).substring(2, 10); 
        const anonymousId = `${timestamp}-${randomPart}`;
        return anonymousId;

    }

    return IdGenerator;

}

export default Anonymous;
