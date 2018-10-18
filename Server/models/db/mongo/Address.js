import mongoose from 'mongoose';
var SchemaTypes = mongoose.Schema.Types;

module.exports = app => {
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;

    var Address = new Schema({
        id: ObjectId,
        profileId: Number,
        addresses: []  
        
    });

    app.mongoConnection.model('Address', Address);
}