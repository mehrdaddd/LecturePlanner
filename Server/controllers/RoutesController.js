import * as ax from 'axios'

module.exports = app => {
    //const repo = app.repositories.sql.ProfileRepository;


    app.route("/routes/nearstops")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            const b = req.query;
            const lat = b.lat
            const long = b.long
            var apiAddress = `http://localhost:4444/me?lat=${lat}&long=${long}`;
            console.log(apiAddress)
            ax.get(apiAddress)
                .then(function (data) {
                    res.json({ data: data.data });
                })
                .catch(function (error) {
                    res.json(error)
                });
        });

        app.route("/routes/location")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            const b = req.query;
            const location = b.location
            const long = b.long
            var apiAddress = `http://localhost:4444/location?location=${location}`;
            console.log(apiAddress)
            ax.get(apiAddress)
                .then(function (data) {
                    res.json({ data: data.data });
                })
                .catch(function (error) {
                    res.json(error)
                });
        })

        app.route("/routes/path")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            const b = req.query;
            const source = b.s
            const destination = b.d
            var apiAddress = `http://localhost:4444/path?s=${source}&d=${destination}`;
            console.log(apiAddress)
            ax.get(apiAddress)
                .then(function (data) {
                    res.json({ data: data.data });
                })
                .catch(function (error) {
                    res.json(error)
                });
        })
}