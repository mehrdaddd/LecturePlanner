import { error } from "util";

module.exports = app => {
    const repo = app.repositories.sql.SubjectRepository;
    //const validator = app.models.viewmodels.category.CategoryValidationViewModel;


    app.get('/subjects', (req, res) => {
        repo.findAll(subjects => {
            res.json({ subjects: subjects });
        })
    });

    
}