const pool = require("../helpers/connectionDB").getInstance();
const format = require('pg-format');


const getJewels = async ({limits = 4, order_by = "id_ASC"}) => {
    const [field, direction] = order_by.split("_");
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s', field, direction, limits);
    const { rows: jewels } = await pool.query(formattedQuery);
    console.log(jewels);
    return jewels;
}

module.exports = { getJewels }