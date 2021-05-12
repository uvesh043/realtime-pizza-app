const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    size: {
        type: String,
    }

});
const menu = mongoose.model('menu', menuSchema)
module.exports = menu;