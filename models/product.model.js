const mongoose =require('mongoose')

const Schema = mongoose.Schema

const productSchema=new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: 3,
        maxlength: 80
    },
    price:Number,
    description:String,
    descriptionp:String,
    category:String,
    image:String,
    createdAt:{type: Date,default:Date.now},
    active:Boolean,
    updateAt:{type:Boolean, default:true}
})
module.exports=mongoose.model('Product',productSchema)