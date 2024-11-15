const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');
const upload = require('../middlewares/uploadFile');
const validation = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// Ruta para obtener productos
router.get("/products", productController.getProducts);

// Ruta para crear un producto (con archivo de imagen)
router.post("/products", [upload], productController.createProduct);

// Ruta para editar un producto (requiere autenticación y ser admin)
router.put("/products/:id", [validation, isAdmin, upload], productController.editProduct);
// Ruta para obtener un producto por ID
router.get("/products/:id", productController.getProductById);

// Ruta para eliminar un producto (requiere autenticación y ser admin)
router.delete("/products/:id", [validation, isAdmin], productController.deleteProduct);

module.exports = router;

