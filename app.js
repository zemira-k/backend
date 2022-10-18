const express = require("express");
const bodyParser = require("body-parser");

const data = require("./controllers/data");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());

app.post("/", data.sendToWhatsapp);

app.listen(PORT, () => {
  console.log("server connected");
});
