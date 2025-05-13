const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Certificate = sequelize.define(
    'certificate',
    {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50],
            },
        },
        info: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        certificateLink: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                isUrl: true,
            },
        }
    },
    {
        timestamps: true,
        tableName: 'certificates'
    }
)

module.exports = Certificate