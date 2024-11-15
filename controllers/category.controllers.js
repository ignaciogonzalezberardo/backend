const Category =require ('../models/category.model')

async function getCategories(req, res) {
    try {
        const categories = await Category.find({}, "name viewValue"); // Solo seleccionar name y viewValue
        return res.status(200).send({
            message: "categorias obtenidas",
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "NO SE PUDO"
        });
    }
}







async function  createCategory(req,res) {
    try {
        const data =new Category(req.body)
        const category =await data.save()
        return res.status(200).send({
            message:"categoria creada",
            category
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"NO SE PUDO"
        })
    }
}

module.exports={
    getCategories,
    createCategory
}