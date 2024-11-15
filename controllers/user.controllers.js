    const User = require('../models/user.model')
    const bcrypt=require("bcrypt")
    const saltRounds=10
    const SECRET=process.env.SECRET
    const jwt = require ('jsonwebtoken')
    async function getUsers(req,res){
        
        try {
            
            const users=await User.find()
            console.log(users)

            return res.status(200).send(users)




        } catch (error) {
            console.log(  error)
            res.status(500).send("Error al obtener usuaruis")
        }



    }


    async function createUser(req, res) {
        if (!req.body.password) {
            return res.status(400).send({
                ok: false,
                message: "Necesitas una contraseña"
            });
        }
    
        try {
            // Crear un nuevo usuario con los datos del request body
            const user = new User(req.body);
    
            // Encriptar la contraseña usando bcrypt con async/await
            user.password = await bcrypt.hash(user.password, saltRounds);
    
            // Si hay un archivo adjunto, asignar la imagen al usuario
   
    
            // Guardar el nuevo usuario en la base de datos
            const newUser = await user.save();
    
            // Devuelve el usuario recién creado, sin incluir la contraseña en la respuesta
            newUser.password = undefined; // Elimina la contraseña antes de enviar la respuesta
            return res.status(201).send({
                message: 'Usuario creado correctamente',
                user: newUser
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                ok: false,
                message: "Ocurrió un error en el servidor"
            });
        }
    }


    async function getUsersById(req, res) {
        try {
            const { id } = req.params;

            // Verificar permisos de acceso: solo el admin o el propio usuario puede ver sus datos
            if (req.user.role !== "admin" && id !== req.user.id) {
                return res.status(403).send({
                    message: "No tienes permiso para acceder a esta información"
                });
            }

            const user = await User.findById(id).select("-password"); // Excluir la contraseña del resultado

            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }

            return res.status(200).send(user);
        } catch (error) {
            console.log(error);
            return res.status(500).send("No se pudo obtener el usuario de la base de datos");
        }
    }

        
        // Eliminar un usuario


        async function deleteUser(req, res) {
            try {
                const { id } = req.params;  // Obtenemos el ID del parámetro
        
                // Verificación de permisos: solo el admin o el propio usuario pueden eliminar
                if (req.user.role !== "admin" && req.user.id !== id) {
                    return res.status(403).send({
                        message: "No tienes permiso para eliminar este usuario"
                    });
                }
        
                const deleteUser = await User.findByIdAndDelete(id);
            
                if (!deleteUser) {
                    return res.status(404).send("Usuario no encontrado");
                }
                return res.status(200).send("El usuario fue borrado");
            } catch (error) {
                console.log(error);
                return res.status(500).send("No se pudo borrar el usuario de la base de datos");
            }
        }
        
        
async function updateUser(req, res) {
    try {
        const { id } = req.params;

        // Verificación de permisos
        if (req.user.role !== "admin" && req.user.id !== id) {
            return res.status(403).send({
                message: "No tienes permiso para realizar esta acción"
            });
        }

        // Encriptar nueva contraseña si se envía
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        }

        console.log("Datos para actualización:", req.body);  // Debugging

        // Actualizar usuario
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

        if (!updatedUser) {
            return res.status(404).send("Usuario no encontrado");
        }

        console.log("Usuario actualizado:", updatedUser);  // Debugging

        return res.status(200).send({
            message: "Usuario actualizado correctamente",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error en actualización:", error);
        return res.status(500).send("No se pudo actualizar el usuario en la base de datos");
    }
}

        

        async function login(req, res) {
            try {
                const { email, password } = req.body;
                console.log(`Email: ${email}, Password: ${password}`);
        
                // Validar que los campos de email y password estén presentes
                if (!email || !password) {
                    return res.status(400).send({
                        message: "Faltan datos: email o contraseña son obligatorios"
                    });
                }
        
                // Buscar el usuario por su email
                const user = await User.findOne({ email });
        
                if (!user) {
                    return res.status(404).send({
                        message: "Usuario no encontrado"
                    });
                }
        
                // Comparar la contraseña con bcrypt
                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return res.status(400).send({
                        message: "Contraseña incorrecta"
                    });
                }
        
                // Eliminar la contraseña del usuario antes de devolverlo
                user.password = undefined;
        
                // Firmar el token con jwt (recuerda definir la variable SECRET correctamente)
                const token = jwt.sign(user.toJSON(), SECRET, {
                    expiresIn: '1h' // Duración de 1 hora para el token
                });
        
                console.log(`Token generado: ${token}`);
        
                // Devolver la respuesta de éxito
                return res.status(200).send({
                    message: "Inicio de sesión correcto",
                    user,
                    token
                });
            } catch (error) {
                console.error("Error en el inicio de sesión:", error);
                return res.status(500).send({
                    message: "Error interno del servidor"
                });
            }
        }
        
    module.exports={
        getUsers,
        createUser,
        getUsersById,
        deleteUser,
        updateUser,
        login
    }