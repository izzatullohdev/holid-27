const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Contact = sequelize.define(
    'contact',
    {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: 'contacts'
    }
)

module.exports = Contact