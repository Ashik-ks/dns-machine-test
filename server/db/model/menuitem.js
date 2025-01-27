const mongoose = require('mongoose')

const menuitemSchema = new mongoose.Schema({
    name : {type : String},
    description : {type : String},
    price : {type : Number},
    menuId : {type:mongoose.Schema.Types.ObjectId,ref:'menus'}
},
{timestamps : true});

module.exports = mongoose.model("menuitems",menuitemSchema)