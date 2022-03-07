/*
    User routes / Auth

    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, validateToken } = require('../controllers/auth.controllers');
const { fieldValidator } = require("../middlewares/fieldValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const router = Router();


router.post("/new", 
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "La contraseña es obligatoria").not().isEmpty(),
        check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
        fieldValidator
    ], 
    createUser );

router.post("/",
    [
        check("email", "Email inválido").isEmail(),
        check("password", "Ingresa la contraseña").not().isEmpty(),
        check("password", "Contraseña muy corta").isLength({ min: 6 }),
        fieldValidator
    ], 
    loginUser );

router.get("/renew", jwtValidator, validateToken );

module.exports = router;

