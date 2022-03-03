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
        check("name", "Name is required").not().isEmpty(),
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        fieldValidator
    ], 
    createUser );

router.post("/",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        fieldValidator
    ], 
    loginUser );

router.get("/renew", jwtValidator, validateToken );

module.exports = router;

