import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
    const Profiles = sequelize.define("Profiles", {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataType.STRING,
            allowNull: true
        },
        lastname: {
            type: DataType.STRING,
            allowNull: true,
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        street: {
            type: DataType.STRING,
            allowNull: true
        },
        houseno: {
            type: DataType.STRING,
            allowNull: true,
        },
        state: {
            type: DataType.STRING,
            allowNull: true,
        },
        city: {
            type: DataType.STRING,
            allowNull: true,
        },
        postalcode: {
            type: DataType.STRING,
            allowNull: true,
        },
        phone: {
            type: DataType.STRING,
            allowNull: true,
        },
        role: {
            type: DataType.STRING,
            allowNull: false,
        },
        lat: {
            type: DataType.STRING,
            allowNull: true,
        },
        long: {
            type: DataType.STRING,
            allowNull: true,
        }
    }, {
        hooks: {
            beforeCreate: profile => {
                const salt = bcrypt.genSaltSync();
                profile.password = bcrypt.hashSync(profile.password, salt);
            }
        }
    });
    Profiles.associate = (models) => {
        Profiles.hasMany(models.Subjects);
    };
    Profiles.isPassword = (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
    };


    // {
    //     hooks: {
    //         beforeCreate: user => {
    //             const salt = bcrypt.genSaltSync();
    //             user.password = bcrypt.hashSync(user.password, salt);
    //         }
    //     },
    //     classMethods: {
    //         associate: (models) => {
    //             Users.hasMany(models.Tasks);
    //         },
    //         isPassword: function(encodedPassword, password) {
    //             return bcrypt.compareSync(password, encodedPassword);
    //         }
    //     },
    //     instanceMethods: {
    //         isPassword: (encodedPassword, password) => {
    //             return bcrypt.compareSync(password, encodedPassword);
    //         }
    //     }
    // }
    return Profiles;
};