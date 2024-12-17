/** Importing "database" module */
const dbu_module = require("../database/dbu.js");
let dbu = dbu_module.dbu;


/** Importing "Crypto module" */
const crypto  = require('crypto');

// encrypting in sha256 lower hex

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

//* tested OK*/
async function loginUser(req, reply) {
    /** AUTHENTICATION  */
    var {username, password} = req.body;
    if(username === undefined || password === undefined){
        reply.code(406).send("ERROR 400 : BAD REQUEST");
        return;
    }

    var user = dbu.findUserByName(username);
    if(user === undefined){
      reply.code(402).send("ERROR 400: USER NOT EXIST");
      return;
    }

    password = hashPassword(password);
    //console.log(`${password} , ${user.password}` );
    if(user.password != password){
        reply.code(405).send("ERROR 400: PASSWORD NOT RIGHT");
        return;
    }

    /** SENDING JWT TOKEN */
    const payload = { 
        username: user.username,
        password: user.password,
        role: user.role
    };
    
    const token =req.server.jwt.sign(payload);
    //console.log(`token is = ${token}`);
    reply.send(token);
};

//** tested OK */
async function createUser(req, reply) {
    var {username, password} = req.body;
    
    password = hashPassword(password);
    var ok = dbu.findUserByName(username);
    if(ok !== undefined){
        reply.code(401).send('ERROR 401: USERNAME ALREADY REGISTER')
        return;  
    }

    dbu.addUser(username, password );
    reply.code(200).send(`CODE 200 : REGISTER API ASKED  ${username} ${password}`);
};

/** tested OK */
async function deleteUser (req, reply)  {

        /** Retriving the data from the jwt */
        var auth = req.headers.authorization;
        const token = auth.split(' ')[1];
        const decoded = req.server.jwt.verify(token);
        var username = decoded.username;

        var ret =dbu.deleteUser(username);
        if(ret === undefined)
            reply.code(401).send('ERROR 401: USERNAME NOT FOUND');
        else 
            reply.code(200).send('DELETE: SUCCESSFUL,  USER API ASKED'); 

};

module.exports = {loginUser, createUser, deleteUser};