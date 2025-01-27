const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String}
},
{timestamps : true});

module.exports = mongoose.model("menus",menuSchema)