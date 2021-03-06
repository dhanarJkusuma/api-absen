/**
 * Created by Dhanar J Kusuma on 15/02/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Peserta = require('./Peserta');
var User = require('./User');

var locationSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true
    }
});


module.exports = mongoose.model('Location', locationSchema);