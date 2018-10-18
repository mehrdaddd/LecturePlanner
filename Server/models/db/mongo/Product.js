import mongoose from 'mongoose';
var SchemaTypes = mongoose.Schema.Types;

module.exports = app => {
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;

    var Product = new Schema({
        id: ObjectId,
        name: String,
        price: Number,
        location: {
            lat: Number,
            long: Number, 
            street: String,
            streetNo: Number,
            houseNo: Number,
            plz: Number,
            city: String,
            country: String
            },
        summary: String,
        description: String,
        condition: String,
        available: Boolean,
        category:  String,
        modifiedOn: Date,
        createdOn:  Date
    });

    app.mongoConnection.model('Product', Product);
}