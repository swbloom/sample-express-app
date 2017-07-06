const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Character = require('./models/character.js');
const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/harrypotter'
mongoose.connect(dbURL);


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Harry Potter API!' });
});

router.route('/characters')
    .post((req, res) => {
        const character = new Character();
        character.name = req.body.name;

        character.save((err, payload) => {
            if (err)
                res.send(err);

            res.json(payload);
        });
    })
    .get((req, res) => {
        Character.find((err, characters) => {
            if (err)
                res.send(err);

            res.json(characters);
        });
    });

router.route('/characters/:character_id')
    .get((req, res) => {
        Character.findById(req.params.character_id, (err, character) => {
            if (err)
                res.send(err);
            res.json(character);
        });
    })
    .put((req, res) => {
        Character.findById(req.params.character_id, (err, character) => {
            if (err)
                res.send(err);
            
            character.name = req.body.name;
            character.house = req.body.house;
            character.role = req.body.role;

            character.save((err, payload) => {
                if (err)
                    res.send(err);
                
                res.json(payload);
            });
        })
    })
    .delete((req, res) => {
        Character.remove({
            _id: req.params.character_id
        }, (err, character) => {
            if (err)
                res.send(err);
            
            res.json({ message: 'Character deleted.' });
        })
    })

app.use('/api', router);
app.listen(port);
console.log('Harry Potter API running on ', + port);
