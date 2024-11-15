const Product = require('../models/product.model');

async function getProducts(req, res) {
    try {
        // Inicializa el array de filtros
        const filter = [];
        
        // Agrega filtro por nombre si el parámetro name está presente en la query
        if (req.query.name) {
            filter.push({ name: { $regex: req.query.name, $options: 'i' } });
        }
        
        // Agrega filtro por precio mínimo si el parámetro min_price está presente en la query
        if (req.query.min_price) {
            filter.push({ price: { $gte: req.query.min_price } });
        }

        // Crea la consulta basada en si hay filtros aplicados o no
        const query = filter.length > 0 ? { $and: filter } : {};

        // Ejecuta la búsqueda de productos basados en los filtros aplicados o devuelve todos los productos si no hay filtros
        const products = await Product.find(query).select('name price image description category createdAt descriptionp ').sort({price:1});
        
        // Devuelve la lista de productos obtenida
        return res.status(200).send({
            message: "Productos obtenidos correctamente",
            products
        });
    } catch (error) {
        console.log(error);
        // Maneja cualquier error durante la obtención de productos
        return res.status(500).send({ message: 'Error al obtener los productos' });
    }
}

async function createProduct(req, res) {
    try {
        
        // Crea una nueva instancia del modelo Product con los datos enviados en el body de la request
        const product = new Product(req.body);
        


        if (req.file){
            product.image=req.file.filename
        }
        // Guarda el nuevo producto en la base de datos
        const newProduct = await product.save();
        
        // Devuelve el producto recién creado
        return res.status(201).send({
            message: 'Producto creado correctamente',
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        // Maneja cualquier error durante la creación del producto
        return res.status(500).send({ message: 'Error al crear el producto' });
    }
}


async function getProductById(req, res) {
    try {
      const { id } = req.params; // Captura el id de los parámetros de la ruta
  
      const product = await Product.findById(id); // Busca el producto en la base de datos
  
      if (!product) {
        return res.status(404).send("Producto no encontrado");
      }
  
      return res.status(200).send(product); // Devuelve el producto
    } catch (error) {
      console.log(error);
      return res.status(500).send("No se pudo obtener el producto");
    }
  }
  

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;  // Obtenemos el ID del parámetro

        // Verificación de permisos: solo el admin o el propio usuario pueden eliminar
        if (req.user.role !== "admin" && req.user.id !== id) {
            return res.status(403).send({
                message: "No tienes permiso para eliminar este usuario"
            });
        }

        const deleteProduct= await Product.findByIdAndDelete(id);
    
        if (!deleteProduct) {
            return res.status(404).send("Usuario no encontrado");
        }
        return res.status(200).send("El usuario fue borrado");
    } catch (error) {
        console.log(error);
        return res.status(500).send("No se pudo borrar el usuario de la base de datos");
    }
}

async function editProduct(req, res) {
    try {
        // Busca el producto por su ID
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Actualiza los campos del producto con los datos enviados en el cuerpo de la solicitud
        Object.assign(product, req.body);

        // Si se sube una nueva imagen, actualiza la propiedad image
        if (req.file) {
            product.image = req.file.filename;
        }

        // Guarda el producto actualizado
        const updatedProduct = await product.save();

        // Devuelve el producto actualizado
        return res.status(200).send({
            message: 'Producto actualizado correctamente',
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
        // Maneja cualquier error durante la actualización del producto
        return res.status(500).send({ message: 'Error al actualizar el producto' });
    }
}



// Exporta las funciones para que puedan ser utilizadas en otros archivos
module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    editProduct
};
