# jwt-node-express

A node library with functions and middleware for express.
Warning: **This library is in BETA**
## Install

```
$ npm install jwt-node-express
```

## Usage

```javascript
const JwtNodeExpress = require('jwt-node-express');
const jwtne = JwtNodeExpress({ secret: 'secret', expiresIn: '1d' });

app.post('user-info', jwtne.veriyJwtMW, (req, res) => { //middleware veriyJwtMW
    var jwtData = req.jwtData; //all jwt data is here

    //You can create a token with a user id easily
    jwtf.createToken('userId').then(token => {
        console.log(token) //token has created
    });
    
    //Verify if token is valid
    jwtf.veriyJwt(data.token).then(jwtData => {
        console.log(jwtData) //token is valid
    }).catch(rej => { //If token is not valid (possibly expired)
        console.log("Invalid token");
    });
});


```

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
