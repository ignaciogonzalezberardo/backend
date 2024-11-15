const multer = require('multer');
const path = require('path');
const crypto = require('crypto'); // Asegúrate de importar 'crypto' si no lo habías hecho antes

const storage = multer.diskStorage({
    destination: 'public/image/products', // Faltaba una coma aquí
    filename: (req, file, cb) => {
        const name = crypto.randomUUID();
        console.log(file);
        const filename = name + path.extname(file.originalname);

        cb(null, filename);
    },
});

const upload = multer({ storage }).single('image');

module.exports = upload;
