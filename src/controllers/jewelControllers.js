const { getJewels, getFilteredJewel } = require("../models/jewelModels");

const getAllJewels = async (req, res) => {
  const limits = req.query.limits;
  const order_by = req.query.order_by;
  const page = req.query.page;
  try {
    const jewels = await getJewels({
      limits: limits,
      order_by: order_by,
      page: page,
    });
    const HATEOAS = await prepareHATEOAS(jewels);
    res.json(HATEOAS);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ message: "Error 400. No se pudo obtener los datos. Por favor, revise sus parametros" });
  }
};

const getFilteredJewels = async (req, res) => {
  const queryStrings = req.query;
  try {
    const jewels = await getFilteredJewel(queryStrings);
    res.json(jewels);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Error 400. No se pudo obtener los datos. Por favor, revise sus parametros" });
  }
};

const prepareHATEOAS = (jewels) => {
  const results = jewels
    .map((jewel) => {
      return {
        name: jewel.nombre,
        href: `/joyas/joya/${jewel.id}`,
      };
    })
    .slice(0, 4);
  const totalJoyas = jewels.length;
  const stockTotal = jewels.map((jewel) => jewel.stock).reduce((a, b) => a + b);
  const HATEOAS = {
    totalJoyas,
    stockTotal,
    results,
  };
  return HATEOAS;
};

module.exports = {
  getAllJewels,
  getFilteredJewels,
};
