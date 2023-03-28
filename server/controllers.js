const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../les2/node.db'
  });

const User = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    email: DataTypes.STRING,
}, {
    timestamps: false
});

class Controller {
    async getHunters() {
        return new Promise(async (resolve, _) => { 
            let hunters = await User.findAll()
            resolve(hunters)  
        });
    }

    async getHunter(hunter_id) {
        return new Promise(async (resolve, reject) => {
            let hunter = await User.findAll({
                where: {
                    id: hunter_id
                }
              })

            if (hunter) {
                resolve(hunter);
            } else {
                reject(`Hunter with id ${id} not found `);
            }
        })
    }

    async createHunter(hunter) {
        return new Promise(async (resolve, _) => {
            const firstName = hunter["firstName"]
            const middleName = hunter["middleName"]
            const lastName = hunter["lastName"]
            const age = hunter["age"]
            const email = hunter["email"]

            const new_hunter = await User.create({ firstName: firstName, middleName: middleName,
            lastName: lastName, age: age, email: email});
            
            resolve(new_hunter);
        });
    }

    async updateHunter(hunter_id, new_firstName) {
        return new Promise(async (resolve, reject) => {
            
            await User.update({ firstName: new_firstName}, {
                where: {
                  id: hunter_id
                }
              });

            let hunter = await this.getHunter(hunter_id)
            resolve(hunter);
        });
    }

    async deleteHunter(hunter_id) {
        return new Promise(async (resolve, reject) => {
            await User.destroy({
                where: {
                  id: hunter_id
                }
            });
            
            resolve(`Hunter deleted successfully`);
        });
    }
}

module.exports = Controller;