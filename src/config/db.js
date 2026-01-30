const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Sync database (tạo bảng tự động)
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize database:', error);
    });

// Hàm test kết nối
async function connection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { sequelize, connection };
