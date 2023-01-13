const pool = require("../database/connectionDB").pool
const format = require('pg-format');


const getJewels = async ({limits = 4, order_by = "id_ASC", page = 1}) => {
    const [field, direction] = order_by.split("_");
    const offset = (page - 1) * limits
    // ¿Por que offset con page-1? Para que la primera pagina sea 1 y no 0
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', field, direction, limits, offset);
    console.log(formattedQuery);
    try {
        const { rows: jewels } = await pool.query(formattedQuery);
        // console.log(jewels);
        return jewels;
    } catch (e) {
        console.log("Error al consultar los datos en la tabla inventario:", e.code, e.message);
        throw new Error(e);
    }


}

const getFilteredJewel = async ({ precio_max, precio_min, categoria, metal }) => {
    let filters = []
    if (precio_max) filters.push(`precio <= ${precio_max}`)
    if (precio_min) filters.push(`precio >= ${precio_min}`)
    if (categoria) filters.push(`categoria = '${categoria}'`)
    if (metal) filters.push(`metal = '${metal}'`)
    let query = 'SELECT * FROM inventario' 
    if (filters.length > 0) {
        filters = filters.join(' AND ')
        query += ` WHERE ${filters}`
    }
    console.log(query)
    try {
        const { rows: jewels } = await pool.query(query)
        return jewels
    } catch (e) {
        console.log("Error al consultar los datos en la tabla inventario:", e.code, e.message);
        throw new Error(e);
    }

}

module.exports = { getJewels, getFilteredJewel }