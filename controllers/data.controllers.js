/** Importing "database" module */
const dbu_module = require("../database/dbu.js");
let dbu = dbu_module.dbu;

/** UTILITY FUNCTION FOR RETREIVING NAME */
function getUsernameFromToken(req){
    var auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const decoded_token = req.server.jwt.verify(token);
    return decoded_token.username;
}

/** TESTED OK*/
async function addData(req, reply) {
    var {key, data} = req.body;
    if(key == undefined || data == undefined)
        reply.send('INVALID INPUT')


    //base64 to string with buffer.toString('base64')    
    let ret = dbu.addData(getUsernameFromToken(req), key, data.toString('base64') );
    if(ret === undefined ){
        reply.code(405).send('POST DATA: KEY ALREADY EXIST');
    }else reply.send(`POST DATA: API REQ SUCCESSFULLY`);
}



/** TESTED OK */
async function  findData(req, reply) {    
    const {key} = req.params;
    var username = getUsernameFromToken(req);

    //console.log(`username : ${username} key: ${key}`);
    var data = dbu.findData(username,key);
    if(data === undefined){ 
        reply.code(404).send(`ERROR 404: KEY NOT EXIST`);
    }else{
        var decoded_data = atob(data.data);
        reply.send(`GET: SUCCESSFULL DATA API ASKED ${decoded_data}`);
    }
}




/** TESTED OK */
async function updateData(req, reply) {
    const {key} = req.params;
    const {data} = req.body;
    
    var username = getUsernameFromToken(req);
    //console.log(`username : ${username} key: ${key}`);
    var ret = dbu.updateData(username,key,btoa(data));
    if(ret === undefined)
        reply.code(404).send(`PATCH: ERROR 404 FAILED KEY NOT FOUND`);
    else reply.send(`PATCH DATA API ASKED ${key}`);
}




/**TESTED OK */
async function deleteData(req, reply) {
    const {key} = req.params;
    var username = getUsernameFromToken(req);

    //console.log(`username : ${username} key: ${key}`);
    var ret = dbu.removeData(username,key);
    if(ret === undefined){ 
        reply.code(404).send(`DELETE: KEY NOT EXIST`);
    }
    
    reply.send(`REMOVED DATA API ASKED ${key}:SUCCESSFULL`);
}


module.exports = {addData, findData, updateData, deleteData}