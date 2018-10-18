module.exports = app => {
    const Subjects = app.libs.db.init.models.Subjects;
    return {
        findAll: (result) => {
            Subjects.findAll({})
                .then(subjects => result(subjects))
                .catch(error => {
                    //less fart more art
                });
        },
        add: (model, result) => {
            Subjects.create(model)
                .then(subject => {
                    return result(subject);
                });
        }
    };
};