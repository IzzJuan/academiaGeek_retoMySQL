const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const morgan = require('morgan');
const { port } = require('./config');

const app = express();

app.set('port', port);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use(require('./routes/index.routes'));
app.use(require('./routes/semillero_sas.routes'));
app.use(require('./routes/insertar_registro.routes'));
app.use(require('./routes/insertar_registros.routes'));

module.exports = app;