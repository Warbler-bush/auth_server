/** 
 * 
 * Viene messo di default nel database l'admin(con ruolo admin) che puo' passare tutte le autenticazioni di tutte le operazioni..
 * non ho scritto gli endpoint del admin che richiederebbe nel body l'username dell'utente su cui porrebbe fare le operazioni.
 * 
 * 
*/ 

/*Setting up fastify server*/

/** Importing env variables */
require('dotenv').config()

const fastify = require('fastify')({
  logger: {
    level: 'info',
    file: 'C:\\Users\\wangw\\OneDrive\\Desktop\\CODE\\backend_esercizio_wangwei\\log.txt'
  }
})

/** Importing 'cookie' module and 'jwt' module */
const fastify_cookie = require('@fastify/cookie');
const fastify_jwt =require("@fastify/jwt");


/** Appending plugins of "users" */
fastify.register(require('./routes/user.routes.js'));
/** Appending plugins of "data" */
fastify.register(require('./routes/data.routes.js'));

/** Appending plugins of 'session' and 'cookie' to fastify */
fastify.register(fastify_cookie);

//console.log(process.env.JWT_SIGNING_SECRET);
/** Importing 'jwt' module for authentication */
fastify.register(fastify_jwt, {secret: process.env.JWT_SIGNING_SECRET});

/**
 * Starting server function
 */
const start = async () => {
  try {
    await fastify.listen({port:3000})
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

/** Starting the server */
start()

