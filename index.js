const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connection = require('./database/database');


const Games = require('./model/Games')



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
            res.sendStatus(400)
        });
});

// retornar um game pelo id
app.get('/game/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = req.params.id;
        Games.findByPk(id)
            .then((game) => {

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
                id: id
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