const Order = require('../models/order.model');

async function createOrder(req, res) {
    try {
        // Crear una nueva instancia de Order con los datos del cuerpo de la solicitud
        const order = new Order(req.body);
        
        // Guardar la nueva orden en la base de datos
        const newOrder = await order.save();

        // Enviar la respuesta al cliente con el nuevo pedido creado
        return res.status(201).send({
            message: 'Order created',
            newOrder
        });
    } catch (error) {
        // Manejar cualquier error que ocurra al crear la orden
        console.log(error);
        return res.status(500).send({
            message: 'Error creating order',
            error
        });
    }
}

const getOrders = async (req, res) => {
    try {
        // Obtener todos los pedidos de la base de datos
        const orders = await Order.find()
                                            .populate('user', "name email")
                                            .populate('products.product','name price image')
        
        // Enviar respuesta exitosa con los pedidos
        res.status(200).json({
            message: "Orders found",
            orders: orders
        });
    } catch (error) {
        // Manejar el error y enviar respuesta de error
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// Exportar la función createOrder
module.exports = {
    createOrder,
    getOrders
};
