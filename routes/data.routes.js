const dataController = require("../controllers/data.controllers.js")
/** Importing 'auth.js' module*/
const auth = require("../middlewares/auth.js");
const schemaData = require("../schema/data.schema.js")

function DataRoutes(fastify, options, done){

    /** NOTA: SONO API PROTETTE! */

    /**  Carica dei dati nuovi  */
    fastify.post("/data", {preHandler:auth.jwtAuthBasic, schema: schemaData.schemaDataPost},dataController.addData);
    
    /** Ritorna i dati corrispondenti alla chiave */
    fastify.get("/data/:key", {preHandler:auth.jwtAuthBasic},dataController.findData);

    /** Aggiorna i dati corrispondenti alla chiave*/
    fastify.patch("/data/:key", {preHandler:auth.jwtAuthBasic, schema: schemaData.schemaDataPatch} ,dataController.updateData);

    /** Elimina i dati corrispondenti alla chiave */
    fastify.delete("/data/:key", {preHandler:auth.jwtAuthBasic}, dataController.deleteData);
    


    done()
}

module.exports = DataRoutes