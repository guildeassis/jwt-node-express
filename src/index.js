const jwt = require('jsonwebtoken');

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

module.exports = function (options) {
    var module = {};
    var secret = options.secret;
    var expiresIn = options.expiresIn;

    // Check to make sure header is not undefined, if so, return Forbidden (403)
    module.verifyMW = (req, res, next) => {
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
    module.sign = function (params) {
        return new Promise((resolve, reject) => {
            if (isJson(params)) {
                jwt.sign(params, secret, { expiresIn: expiresIn }, (err, token) => {
                    if (err) { reject(err); }
                    else { resolve(token); }
                });
            }
            else {
                reject("Invalid json");
            }
        });
    }

    // Verify if a token is valid (for example, if is not expired)
    module.verify = function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, jwtData) => {
                if (err) { reject(err); }
                else { resolve(jwtData); }
            });
        });
    }

    return module;
};