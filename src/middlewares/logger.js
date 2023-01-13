const reportRequest = async (req, res, next) => {
    const params = req.params;
    const query = req.query;
    const body = req.body;
    const url = req.url;
    console.log(
      `Hoy ${new Date()} Se ha recibido una consulta en la ruta ${url} 
    con los parámetros:
    `,
      "Por params: ",
      params,
      "Por query: ",
      query,
      "Por body: ",
      body
    );
    next();
  };
  
  module.exports = { reportRequest };