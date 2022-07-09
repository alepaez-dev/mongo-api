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
  // Query params
  const { name, modulo } = request.query

  try {
    // Lo que puede fallar aqui, hay que intentar

    /**
     * 
     * 5000
     * 
     * 50 koders
     * 50 -> 100
     * 50 -> 150
     * 
     * Paginacion
     * 
     * recibiriamos -> queryparam = page
     * 
     * totalKoders = 5000,
     * page: 5,
     * koders: [
     *  ....
     * ]
     * hasNextPage: yes
     * nextPage: 6
     * hasBeforePage: true
     */

    const koders = await Koders.find({ name: name, modulo: modulo }) // Promesa
    response.json({
      success: true,
      data: {
        koders
      } 
    })
  } catch(error) {
    // Fallo
    response.status(400) // 400
    response.json({
      success: false,
      error
    })
  }
})

// Los identificadores van de path param
app.get("/koders/:identificador", async (request, response) => {
  // Destructuracion
  try {
    const { identificador } = request.params
    const koder = await Koders.findById(identificador, "edad" )
    response.json({
      success:true,
      data: {
        koder
      }
    })
  } catch(error) {
    // El error es un objeto
    response.status(404) // no se encontro 
    response.json({
      success: false,
      message: error.message
    })
  }
})


// Rest -> Arquitectura que se sigue
// Restful -> Eso es restful -> que esta siguiendo la arquitectura rest 
// 1 -> , comunicaciones Hyper JSON
// 2 -> /recurso/identificador -> /koders/id
// 3 -> Tenias que seguir un protocolo de comunicacion que no tuviera estado -> HTTP
// Rest API -> /recurso/identificador/
app.post("/koders", async (request, response) => {
  // Post, ruta
  // Modelo -> Schema
  // El id se genera en automatico
  // request.body
  try {
    const koder = await Koders.create(request.body)
    response.status(201)
    response.json({
      data: {
        koder
      }
    })
  }catch(error){
    response.status(400)
    response.json({
      success: false,
      message: error.message
    })
  }
})

// Delete
app.delete("/koders/:id", async (request, response) => {
  const { id } = request.params

  try {
   const koder = await Koders.findByIdAndDelete(id)
   console.log("koder", koder)
   response.json({
     success: true,
     message: "El koder fue eliminado"
   })

  }catch(error) {
   response.status(404) // Koder not found
   response.json({
     success: false,
     message: error.message
   })
 }
})


/**
 * Endpoint Delete
 */


// ruta
// methodo
// que quieren


// Tengo una empresa de mudanza y necesito una sistema
// -> Go 
// ->
// Post -> Create
// Delete -> 

/**
 * Endpoint -> patch
 * Actualizar un koder
 * Validen errores
 */
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
