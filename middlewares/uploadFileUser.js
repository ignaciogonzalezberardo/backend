const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Asegúrate de importar 'crypto' si no lo habías hecho antes

const storage = multer.diskStorage({
    destination: 'public/image/user', // Asegúrate de que esta carpeta exista
    filename: (req, file, cb) => {
        const name = crypto.randomUUID();
        console.log('Nombre del archivo generado:', name);  // Verifica el nombre generado
        const filename = name + path.extname(file.originalname);

        cb(null, filename); // Este es el nombre final del archivo
    },
});


const upload = multer({ storage }).single('image');

module.exports = upload;
