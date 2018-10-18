module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define("Subjects", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        }
    });



    // Subjects.associate = (models) => {
    //     Categories.hasMany(models.Products);
    // };


    return Subjects;
};