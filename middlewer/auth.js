const jwt = require('jsonwebtoken')
const JWTSecret = 'l(ID=Nqltf9yuSq0MMkjoy$szxdJc7bLiSKxFXldIfXT/4vKs·';



function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    // validando token

    if (authToken != undefined) {
        // pegando o token da variavel authToken
        const token = authToken.split(' ')[1]

        // conferindo os tokens

        jwt.verify(token, JWTSecret, (error, data) => {
            if (error) {
                res.sendStatus(401)
            } else {
                req.token = token;

                req.loggedUser = {
                    id: data.id,
                    email: data.email
                };

                next();
            };
        });

    } else {
        res.sendStatus(401)
    };



};

module.exports = auth