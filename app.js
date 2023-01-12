const app = require('./server')

app.use('/', require('./src/routes/jewelRoutes'))

module.exports = app