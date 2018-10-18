import cors from "cors";
import bodyParser from "body-parser";
const fileUpload = require('express-fileupload')

module.exports = app => {
    app.set("port", 2000)
    app.set("json spaces", 4);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cors({
        origin: ["http://localhost:8080"],
        methods: ["GET", "POST", "PUT", "DELETE"]
    }))

    app.use(app.libs.authentication.initialize());
    app.use(fileUpload());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};