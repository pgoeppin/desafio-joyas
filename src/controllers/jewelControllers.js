const {
    getJewels
} = require("../models/jewelModels")

const getAllJewels = async (req,res) => {
    try {
        const jewels = await getJewels();
        res.json(jewels);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo obtener los datos" })
    }
};

module.exports = {
    getAllJewels
}