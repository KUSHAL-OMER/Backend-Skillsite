const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    val: {
        type: String,
        required: true
    }
});

const CardSchema = new Schema({
    exp: {
        type: String,
        default: ''
    },
    selected: [SelectSchema],
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

var Cards = mongoose.model('Card', CardSchema);
module.exports = Cards;