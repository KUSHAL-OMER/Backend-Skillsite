const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    img: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    }
});

var Images = mongoose.model('Image', ImageSchema);
module.exports = Images;