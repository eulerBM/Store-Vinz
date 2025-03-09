export function convertImageToBytes(imageFile, callback) {
    const reader = new FileReader();

    reader.onloadend = function() {
        const imageBytes = new Uint8Array(reader.result);
        callback(imageBytes);  
    };

    reader.readAsArrayBuffer(imageFile); 
}