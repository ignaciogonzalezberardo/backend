const express = require('express');
const app = express();

const cors=require('cors')
const UserRoutes=require('./routes/user.routes')
const productRoutes=require('./routes/product.routes')
const categoryRoutes=require('./routes/category.routes')
const orderRoutes=require('./routes/order.routes')
app.use(cors())
app.use(express.static('public'))
app.use( express.json())
app.use([UserRoutes, productRoutes,categoryRoutes,orderRoutes])
module.exports=app