const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Network = sequelize.define(
    'network',
    {
        linkedin: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        instagram: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        youtube: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        telegram: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    },
    {
        tableName: 'networks'
    }
)

module.exports = Network