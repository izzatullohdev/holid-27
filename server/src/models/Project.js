const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Project = sequelize.define(
    'project',
    {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50],
            },
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        technologies: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },           
        githubLink: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        liveDemoLink: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        }
    },
    {
        timestamps: true,
        tableName: 'projects'
    }
)

module.exports = Project