const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()) // Vamos a utilizar Json


// Endpoints
app.get("/", (request, response) => {
  response.json({
    "message": "Endpoint de HOME"
  })
})


app.listen(8080, (request, response) => {
  console.log("Nuestro servidor esta prendido");
})