const { response } = require("express");
const { validationResult } = require("express-validator");


const fieldValidator = (req, res = response, next) => {
    // error handling
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.array()[0].msg,
            error: errors.mapped()
        });
    }

    next();
}

module.exports = {
    fieldValidator
}