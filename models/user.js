// 'use strict';
// const sequelize = require("../connection/db");
// const {DataTypes,Model} = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init({
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         customValidator(name) {
//           if (name === null) {
//             throw new Error("name can't be null!!");
//           }
//         }
//       }
//     },
//     surname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'Please enter your surname'
//         }
//       }
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate:{
//         isEmail: {msg: "It must be a valid Email address"},
//       },
//       validate: {
//         notNull: {
//           msg: 'Please enter your email'
//         }
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'Please enter your password'
//         }
//       }
//     },
//     passcorn: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'Please enter your passcorn'
//         }
//       }
//     }
//   }, {
//     sequelize,
//     tableName:"users",
//     modelName: 'users',
//   });
//   return user;
// };


const sequelize = require('../connection/db')
const Sequelize = require('sequelize')


const User = sequelize.define('user',{
  name:{
    type: Sequelize.STRING
  },
  surname: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  passcorn: {
    type: Sequelize.STRING
  }
})


module.exports = User;