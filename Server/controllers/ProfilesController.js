import { validator } from 'express-validator';
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

import * as ax from 'axios'

module.exports = app => {
    const repo = app.repositories.sql.ProfileRepository;
    const validator = app.models.viewmodels.profile.ProfileValidationViewModel;

    app.route("/profile/courses")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            var apiAddress = "http://localhost:8990";
            ax.get(apiAddress)
                .then(function (data) {
                    console.log(data)
                    return res.json( { data: data.data.Groups });
                })
                .catch(function (error) {
                    return res.json(error)
                });
        });


    app.route("/profiles")
        .all(app.xticate.authenticate())
        .get((req, res) => {
            var profileId = req.user.id;
            repo.findById(profileId, (profile) => {
                res.json({ profile: profile });
            });
        })
        .put(validator.validate(),
            (req, res) => {

                const errors = validator.response(req, res);
                if (errors.result) {
                    //res.status(422).json({ errors: errors.errors });
                    errors.response;
                } else {
                    var model = req.body;
                    //var apiAddress = "https://maps.googleapis.com/maps/api/geocode/json?"
                    //var parametrizedUrl = apiAddress + `address=${model.houseno}+${model.street},${model.city}+${model.postalcode}`
                    //var urlWithKey = parametrizedUrl + "&key=AIzaSyARaziDR-I66CNvCw9l3ck_JSWd0HJDsyE"
                    //console.log(urlWithKey);
                    //ax.get(urlWithKey)
                    //  .then(function(data) {
                    //    if (data.data.results[0] != null) {
                    //      console.log(data.data.results[0].geometry.location)
                    repo.update({
                        firstname: model.firstname,
                        lastname: model.lastname,
                        //street: model.street,
                        //houseno: model.houseno,
                        //state: model.state,
                        city: model.city,
                        postalcode: model.postalcode,
                        phone: model.phone
                    }, req.user.id, result => {
                        res.json({ profile: result });
                    });
                    // } else {
                    //     res.status(422).send();
                    // }

                    // })
                    // .catch(function(error) {
                    //     res.status(422).send();
                    // })
                    // repo.update(model, req.user.id, result => {
                    //     res.json({ profile: result });
                    // });
                }
            });
}