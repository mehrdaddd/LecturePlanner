import mongoose from 'mongoose';


module.exports = app => {
    app.mongoConnection = mongoose.connect('mongodb://localhost:27017/zone', { useMongoClient: true });
}