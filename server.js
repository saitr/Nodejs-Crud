const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql');
const fileUpload = require('express-fileupload'); // Make sure to have express-fileupload properly installed
require('./src/database/connection');

const app = express();
app.use(bodyParser.json());

app.use(fileUpload());

const auth_routes = require('./src/routes/auth_routes');
app.use(auth_routes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
