import mongoose from 'mongoose';


module.exports = app => {
    var Schema = mongoose.Schema;
    var ObjectId = mongoose.Schema.ObjectId;


    var Task = new Schema({
        id: ObjectId,
        title: String,
        description: String
    });

    // Task.pre("save", function(next) {
    //     next();
    // });
    app.mongoConnection.model('Task', Task);
}