const {
    getJewels,
    prepareHATEOAS,
} = require("../models/jewelModels");

const getAllJewels = async (req,res) => {
    const limits = req.query.limits
    const order_by = req.query.order_by
    const page = req.query.page
    try {
        const jewels = await getJewels({limits: limits, order_by: order_by, page: page});
        const HATEOAS = await prepareHATEOAS(jewels)
        res.json(HATEOAS);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo obtener los datos" })
    }
};

module.exports = {
    getAllJewels
}