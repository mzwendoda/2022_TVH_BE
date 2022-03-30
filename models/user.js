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