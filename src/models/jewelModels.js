const pool = require("../helpers/connectionDB").getInstance();
const format = require('pg-format');


const getJewels = async ({limits = 4, order_by = "id_ASC", page = 1}) => {
    const [field, direction] = order_by.split("_");
    const offset = (page - 1) * limits
    const formattedQuery = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', field, direction, limits, offset);
    const { rows: jewels } = await pool.query(formattedQuery);
    console.log(jewels);
    return jewels;
}

const prepareHATEOAS = (jewels) => {

    const results = jewels.map((jewel) => {
        return {
            name: jewel.nombre,
            href: `/joyas/joya/${jewel.id}`,
        }
    }).slice(0, 4)
    const totalJoyas = jewels.length
    const stockTotal = jewels.map(jewel => jewel.stock).reduce((a,b) => a + b)
    const HATEOAS = {
        totalJoyas,
        stockTotal,
        results
    }
    return HATEOAS
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
    const { rows: jewels } = await pool.query(query)
    return jewels
}

module.exports = { getJewels, prepareHATEOAS, getFilteredJewel }