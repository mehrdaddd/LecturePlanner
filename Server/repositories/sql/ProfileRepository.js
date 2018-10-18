module.exports = app => {
    const Profiles = app.libs.db.init.models.Profiles;
    return {
        findAll: (model, result) => {
            // Products.findAll({})
            //     .then(products => result(products))
            //     .catch(error => {

            //     });
        },
        add: (model, result) => {
            model.role = "user";
            Profiles.create(model)
                .then(profile => {
                    result(profile);
                });
        },
        update: (model, profileId, result) => {

            Profiles.update(model, {
                where: {
                    id: profileId
                }
            }).then(profile => {
                result(profileId)
            });
        },
        profileExistsByEmail: (model, result) => {
            Profiles.findOne({
                where: { email: model.email }
            }).then(profile => {

                if (profile === null)
                    return result(false);
                else
                    return result(true);
            })
        },
        isAddressComplete: (model, result) => {
            Profiles.findOne({
                where: { id: model }
            }).then(profile => {

                if (profile.lat != "" && profile.long != "") {
                    result(true);
                } else {
                    result(false)
                }
            })
        },
        findById: (model, result) => {
            Profiles.findOne({
                where: { id: model }
            }).then(profile => {
                if (profile != null) {
                    return result({
                        firstname: profile.firstname != null ? profile.firstname : "",
                        lastname: profile.lastname != null ? profile.lastname : "",
                        email: profile.email != null ? profile.email : "",
                        street: profile.street != null ? profile.street : "",
                        houseno: profile.houseno != null ? profile.houseno : "",
                        state: profile.state != null ? profile.state : "",
                        city: profile.city != null ? profile.city : "",
                        postalcode: profile.postalcode != null ? profile.postalcode : "",
                        phone: profile.phone != null ? profile.phone : "",
                        lat: profile.lat != null ? profile.lat : "",
                        long: profile.long != null ? profile.long : ""
                    })
                }
                return null;
            })

        }
    }
};