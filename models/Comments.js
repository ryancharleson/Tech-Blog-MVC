
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');


class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'post', 
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: 'user',
                key: 'id'
            }
        },
        comment_text: {
            type: DataTypes.STRING, 
            allowNull: false,

        }
    },
    {
        sequelize,
        underscored: true,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;