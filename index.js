const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const connection = require('./database/database');


const Games = require('./model/Games');
const User = require('./model/User');


// configurando jwt
const JWTSecret = 'l(ID=Nqltf9yuSq0MMkjoy$szxdJc7bLiSKxFXldIfXT/4vKs·';


// configurando body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// retornando a lista de games 
app.get('/games', (req, res) => {
    Games.findAll()
        .then((games) => {
            res.json(games)

        })
        .catch(() => {
            res.status(400)
        });
});

// retornando usuario
app.post('/auth', (req, res) => {
    var { email, password } = req.body

    if (email != undefined) {
        // procurando pelo email passado
        User.findOne({
            where: {
                email
            }
        }).then((user) => {
            if (password == user.password) {
                // verificação concluida
                // gerando token
                jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '48h' }, (err, token) => {
                    if (err) {
                        // erro ao gerar token
                        res.status(400);
                    } else {
                        res.status(200);
                        res.json({ token });
                    }
                })


            } else {
                // senha incorreta
                res.sendStatus(401);
            }
        }).catch(() => {
            // usuário nao encontrado
            res.sendStatus(404);
        })

    } else {
        // email passado vazio
        res.sendStatus(400)
    };
});

// retornar um game pelo id
app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = req.params.id;
        Games.findByPk(id)
            .then((game) => {
                res.status(200);
                res.json(game);

            }).catch(() => {
                res.sendStatus(404)
            })
    };
});

// criando um novo game
app.post('/game', (req, res) => {
    var { title, price, year } = req.body

    Games.create({
        title,
        price,
        year
    }).then(() => {
        res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(400)
    });
});

// criando um novo usuário
app.post('/user', (req, res) => {
    var { name, email, password } = req.body

    User.create({
        name,
        email,
        password
    }).then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(400);
    });
});

// deletando game pelo id
app.delete('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = req.params.id;
        Games.destroy({
            where: {
                id
            }
        }).then((game) => {

            res.json(game);

        }).catch(() => {
            res.sendStatus(404)
        })
    };
});

// Editando um game
app.put('/game/:id', (req, res) => {
    var id = req.params.id
    var { title, price, year } = req.body

    if (isNaN(id)) {
        res.sendStatus(400);

    } else {
        Games.update({
            title,
            price,
            year
        }, {
            where: {
                id
            }
        }).then(() => {
            res.sendStatus(200)
        }).catch(() => {
            res.sendStatus(400)
        })
    }

});



connection
    .authenticate()
    .then(() => {
        console.log('conectado no banco')
    }).catch((err) => {
        console.log(err)
    });


app.listen(1088, () => {
    console.log('Servidor rodando')
});