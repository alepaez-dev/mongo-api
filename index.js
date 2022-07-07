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


// URI mongo al darle conectar a application 
//    -> mongodb+srv://ale:<password>@kodemia.qwmlbhw.mongodb.net/?retryWrites=true&w=majority
// Paso 1 -> cambiar <password> por mi verdadera pass -> kodemia123
// Paso 2 -> quitar queryparams ?retryWrites=true&w=majority y agregarle /kodemia
// resultado : "mongodb+srv://ale:kodemia123@kodemia.qwmlbhw.mongodb.net/kodemia"

// Schemas 
const koderSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true
    },
    edad: {
      type: Number,
      min: 18,
      max: 150
    },
    gen: {
      type: String,
      required: true
    },
    modulo: {
      type: String
    },
    hobbies: {
      type: [String]
    },
    sexo: {
      type: String,
      enum: ["f", "m", "o"]
    }
})

// Modelos
const Koders = mongoose.model("koders", koderSchema)

// Endpoints
app.get("/koders", async (request, response) => {

  // Vamos a utilizar el modelo para acceder a nuestra bd.
  const koders = await Koders.find({}) // Promesa
  console.log("koders", koders)

  response.json({
    "message": "El endpoint koders funciona"
  })
})

// Conectando con la base de datos de Mongo
mongoose.connect("mongodb+srv://ale:kodemia123@kodemia.qwmlbhw.mongodb.net/kodemia") // Promesa
.then(() => {
  console.log("BD connected ....")

  // Prendiendo el servidor
  app.listen(8080, (request, response) => {
    console.log("Nuestro servidor esta prendidoo");
  })
})
.catch((err) => {
  console.log("No se pudo conectar a la base de datos", err)
})

/**
 * !Que se tiene que hacer primero?
 * El servidor prendido ? o la base de datos conectada?
 * Se conecta primero a la base de datos
 */
