import mongoose from 'mongoose';

var SchemaTypes = mongoose.Schema.Types;

module.exports = app => {
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;

    var Category = new Schema({
        id: ObjectId,
        name: String,
        description: String,
        modifiedOn: Date,
        createdOn:  Date
    });

    app.mongoConnection.model('Category', Category);
}