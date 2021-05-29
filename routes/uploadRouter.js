const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const Images = require('../models/images');
//Storage will define where the file will get stored after successful upload

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Here we are checking whether the uploading file is image file or not thus we are checking extensions (.jpg, .jpeg, .png, .gif)

const imageFileFilter = (req, file, cb) => {
    if(! file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    else {
        cb(null, true);
    }
};

// 'upload' is a middleware to upload the file and will provide req.file property to next middleware

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
//If we get request for this route the we will response with parameters in '.options()'
.options((req, res) => {
    res.sendStatus(200);
})  //When ever we want to 'Preflight' our request, client will first send some 'http options' request message and then obtain the reply from server-side, before it sends the actual request

.get((req, res, next) =>{
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})

// Here ".single('imageFile')" is used to upload single file at a time and 'imageFile' is the field-name

.post( upload.single('photo'), (req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);                            // req.file contains the path of the file, that can be used by the client to find location of file
    const image = {
        img: req.file.filename,
        url: req.protocol+'://'+req.get('host')+'/public/images/'+req.file.filename
    };
    Images.create(image)
    .then((img) => {
        console.log('Image uploaded: ', img);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(img);
    }, (err) => next(err))
    .catch((err) => next(err));
});
/*
uploadRouter.route('/:imagename')
.get((req, res, next) => {
    Images.findOne({img: req.params.imagename})
    .then((img) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.redirect(img.url);
    }, (err) => next(err))
    .catch((err) => next(err));
});
*/
module.exports = uploadRouter;