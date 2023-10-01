import Compressor from "compressorjs";

function EncodeBase64(file: Blob, cb: (arg0: string | ArrayBuffer) => void) {
    new Compressor(file, {
        quality: 0.7,
        success(result) {
            const reader = new FileReader();
            // reader.readAsDataURL(result);
            // Encode pero texto plano no URI
            reader.readAsDataURL(result);
            reader.onload = function () {
                cb(reader.result as string);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        },
        error(err) {
            console.log(err.message);
            console.log('error aqui');
        },
    });
}
  
export default EncodeBase64;