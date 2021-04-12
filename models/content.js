
module.exports = function (sequelize, DataTypes) {
    const content = sequelize.define("Content", {
        date : {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        title : {
            type: DataTypes.STRING(50),
            allowNull : false
        },
        description : {
            type: DataTypes.STRING(500),
            allowNull : true,
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull : true
        }
    })

    return content;
    
  }