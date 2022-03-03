const jwt = require("jsonwebtoken");


const generateJWT = (uid, name) => {

    return new Promise( (resolve, reject) => {
        const payload = {uid, name};
        
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: process.env.EXPIRES_IN
        }, (err, token) => {
            
            if (err) {
                console.log(err);
                reject('Can not generate JWT token');
            }
                
            resolve(token);
            
        });
    });

}

module.exports = {
    generateJWT
}
