const userController = require("../controllers/user.controllers.js")

/** Importing 'auth.js' module*/
const auth = require("../middlewares/auth.js")
const schemaUser = require("../schema/user.schema.js")


function UserRoutes(fastify, options, done){

    fastify.post("/login",{schema: schemaUser.schemaUser}, userController.loginUser);
    fastify.post("/register", {schema: schemaUser.schemaUser},userController.createUser);
    /** NOTA: E' UN API PROTETTA */
    fastify.delete("/delete", {preHandler:auth.jwtAuthBasic} ,userController.deleteUser);

    done()
}

module.exports = UserRoutes