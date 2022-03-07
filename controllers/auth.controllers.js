const { response } = require("express");
const bcrypt = require("bcryptjs/dist/bcrypt");
const UserModel = require("../models/User.model");
const { generateJWT } = require("../helpers/jwt");


const createUser = async(req, res = response) => {

    const { name, email, password } = req.body;
    
    try {
        let user = await UserModel.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario ya existe"
            });
        }

        user  = new UserModel({
            name,
            email,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSaltSync();
        user.password = await bcrypt.hashSync(password, salt);

        await user.save();

        // generate JWT token
        const token = await generateJWT(user._id, user.name);

        res.status(201).json({
            ok: true,
            uid: user._id,
            name: user.name,
            email: user.email,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el administrador',
            
        });
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe"
            });
        }

        // compare password
        const validPassword = await bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            });
        }

        // generate JWT token
        const token = await generateJWT(user._id, user.name);

        res.json({
            ok: true,
            uid: user._id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hable con el administrador',
            
        });
    }

}

const validateToken =  async(req, res = response) => {

    const { uid, name } = req;

    // generate JWT token
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    validateToken
}