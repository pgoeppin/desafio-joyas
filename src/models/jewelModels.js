const pool = require("../helpers/connectionDB").getInstance();

const getJewels = async () => {
    const { rows } = await pool.query('SELECT * FROM inventario');
    console.log(rows);
    return rows;
}

module.exports = { getJewels }