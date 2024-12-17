/** Importing "database" module */
const dbu_module = require("../database/dbu.js");
let dbu = dbu_module.dbu;

async function jwtAuthBasic(req, reply) {
    // in postman , authorization section , inserted the jwt token in the request
    // now im exstracting it.
	var auth = req.headers.authorization;
    if(req.headers.authorization === undefined)
        reply.code(403).send('ERROR 403: NOT LOGGED')

    const token = auth.split(' ')[1];
    console.log(`Receive the token as: ${token}`);

    try {
        const decoded = req.server.jwt.verify(token);   
        if(decoded.role !== "basic" && decoded.role !== "admin"){
            reply.code(400).send('ERROR 405: ROLE NOT DEFINED')
            return;
        }
    } catch (error) {
        reply.code(403).send('ERROR 403: TOKEN INVALID');
    }
}

async function jwtAuthAdmin(req, reply) {
    // in postman , authorization section , inserted the jwt token in the request
    // now im exstracting it.
	var auth = req.headers.authorization;
    if(req.headers.authorization === undefined)
        reply.code(403).send('ERROR 403: NOT LOGGED')

    const token = auth.split(' ')[1];
    console.log(`Receive the token as: ${token}`);

    try {
        const decoded = req.server.jwt.verify(token);   
        if(decoded.role !== "admin"){
            reply.code(400).send('ERROR 405: NOT PERMITTED BY BASIC USER')
            return;
        }

    } catch (error) {
        reply.code(403).send('ERROR 403: TOKEN INVALID');
    }
}

module.exports = {jwtAuthAdmin, jwtAuthBasic}