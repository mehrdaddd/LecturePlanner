import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
    const Profiles = app.libs.db.init.models.Profiles;
    const cfg = app.libs.configuration;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    const strategy = new Strategy(params, (load, authorized) => {

        Profiles.findById(load.id)
            .then(profile => {
                if (profile) {
                    return authorized(null, {
                        id: profile.id,
                        email: profile.email,
                        role: profile.role
                    });
                }
                return authorized(null, { success: false, profile: null });
            })
            .catch(error => authorized(error, null));
    });




    const authUtil = {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            passport.use(strategy);
            var authentication = passport.authenticate("jwt", cfg.jwtSession);

            //console.log(authentication)
            return authentication;
        },
        profileProvider: (req, result) => {
            let header = req.headers['authorization'];
            if (header != undefined) {
                var jwt = require('json-web-token');
                var token = header.split("Bearer ")[1];
                jwt.decode(cfg.jwtSecret, token, function(err, decodedPayload, decodedHeader) {
                    if (err) {
                        result(-1);
                    } else {
                        result(decodedPayload.id);
                    }
                });
            }
        }
    };
    app.xticate = authUtil;
    return authUtil;
};