
const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema = new Schema({
    name:{type:String,required:true, minlength:3,maxlength:20},
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        index: true,
        validate: {
            validator: (value) => {
                const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
                return regex.test(value);
            },
            message: props => `${props.value} no es un email válido.`
        }
    }
    ,
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100,
        trim: true
    },
    
    // bornDate: {
    //     type: String,
    //     required: true,
    //     validate: {
    //         validator: (value) => {
    //             const fecha = new Date(value);
    //             const hoy = new Date();
    //             return fecha < hoy;
    //         },
    //         message: props => `${props.value} no es una fecha válida.`
    //     }
    // },
    // location: {
    //     type: String,
    //     required: true,
    //     minlength: 3,
    //     maxlength: 100
    //   },

      role: {
        type: String,
        default: "client",
        enum: ["client", "admin"]
      }
      ,
      
      createdAt:{
        type:Date,
        default:Date.now
      }
})
module.exports=mongoose.model("User",userSchema)