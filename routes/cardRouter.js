const express = require('express');
const mongoose = require('mongoose');
const Cards = require('../models/cards');
const cardRouter = express.Router();
const bodyParser = require('body-parser');
cardRouter.use(bodyParser.json());

cardRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    //res.end("We will provide all the cards");

    Cards.find({})
    .then((cards) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(cards);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req, res, next) => {
    //res.end("We will post the content: "+JSON.stringify(req.body.msg)+" and "+JSON.stringify(req.body.selected));

    Cards.create(req.body)
    .then((card) => {
        console.log('Card created: ', card);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(card);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = cardRouter;