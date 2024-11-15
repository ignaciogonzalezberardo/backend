const router =require ('express').Router()
const orderController=require('../controllers/order.controlers')
router.post('/orders',orderController.createOrder)
router.get('/orders',orderController.getOrders)


module.exports=router