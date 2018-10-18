module.exports = app => {
    app.libs.db.init.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => console.log(`server started on ${app.get("port")}`));
    });
}