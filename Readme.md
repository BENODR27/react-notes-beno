//run project
node server.js to run
//npx update
npm install -g npx

//sequelize setup
npm install sequelize-cli --save-dev
npx sequelize-cli init
npx sequelize-cli migration:generate --name your-migration-name

//to migrate and undo
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo

//to create model with migrations
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


npx sequelize-cli model:generate --name User --attributes \
  firstName:string \
  lastName:string \
  email:string \
  age:integer \
  bio:text \
  isAdmin:boolean \
  lastLogin:datetime \
  createdAt:date \
  updatedAt:date

//models
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
npx sequelize-cli model:generate --name User --attributes \
  firstName:{type:string, allowNull:false, validate:{notEmpty:true}} \
  lastName:{type:string, allowNull:false, validate:{notEmpty:true}} \
  email:{type:string, allowNull:false, unique:true, validate:{isEmail:true}} \
  age:{type:integer, allowNull:true} \
  bio:text \
  isAdmin:{type:boolean, allowNull:false, defaultValue:false} \
  lastLogin:{type:date, allowNull:true}


//migrations
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true, // Allows null values for the primary key
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
