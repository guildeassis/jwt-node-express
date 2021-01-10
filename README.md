# jwt-node-express

A node library with functions and middleware for express.
Warning: **This library is in BETA**
## Install
```
$ npm install jwt-node-express
```

## Usage
### First import and select options (secret and expiresIn)

```javascript
const JwtNodeExpress = require('jwt-node-express');
const jwtne = JwtNodeExpress({ secret: 'secret', expiresIn: '1d' });
```
### New token example
```javascript
app.post('/new-user', (req, res) => {
    jwtne.sign({user_id: 15}).then(token => { // 'user_id: 15' is an example, but any valid json is accepted
            console.log(token) //token has created
        });
});

```

### Now you can use the middleware verifyMW 
```javascript
app.post('/user-info', jwtne.verifyMW, (req, res) => { //middleware verifyMW
    req.jwtData; //all jwt data is here
});
```

### verify a token without middleware
```javascript
//Verify if a token is valid
jwtne.veriy(token).then(jwtData => {
    console.log(jwtData) //token is valid
}).catch(rej => { //If token is not valid (possibly expired)
    console.log("Invalid token");
});
```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
