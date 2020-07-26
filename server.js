const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const routes = require("./routes");

// enable all CORS requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`API server is on port ${PORT}`);
});