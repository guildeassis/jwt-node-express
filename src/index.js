const jwt = require('jsonwebtoken');

module.exports = function(options) {
    var module = {};
    var secret = options.secret;
    var expiresIn = options.expiresIn;

    // Check to make sure header is not undefined, if so, return Forbidden (403)
    module.veriyJwtMW = (req, res, next) => {
        const header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            jwt.verify(req.token, secret, (err, jwtData) => {
                if (err) res.status(400).json({ errors: "Invalid token", error_detail: err });
                else {
                    req.jwtData = jwtData;
                    next();
                }
            });
        } else res.sendStatus(403);
    }

    // Create a token
    module.createToken = function(id) {
        return new Promise((resolve, reject) => { 
            jwt.sign({ id: id }, secret, { expiresIn: expiresIn }, (err, token) => {
                if (err) { reject("err"); }
                else { resolve(token); }
            });
        });
    }

    // Verify if a token is valid (for example, if is not expired)
    module.veriyJwt = function(token) {
        return new Promise((resolve, reject) => { 
            jwt.verify(token, secret, (err, jwtData) => {
                if (err) { reject(err); }
                else { resolve(jwtData); }
            });
        });
    }

    return module;
};