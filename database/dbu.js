/** Importing file system module of NODE.js */
const fs = require('fs');

var dbu ;



function writeOnFile(dbu){
    try {
        console.log("writing on file users.json");
        console.log(JSON.stringify(dbu,null,2));
        fs.writeFileSync("./users.json",JSON.stringify(dbu,null ,2 ), 'utf-8' );
    } catch (error) {
        console.log('error writing the user in file user.js', error);
    }
}

Array.prototype.print =
function (){
    console.log("Array 'users':");
    console.log(this); 
}

function init() {
    let data = fs.readFileSync("./users.json");
    dbu = JSON.parse(data);
    //dbu.print();
}

/** Init Database user */
init();

//** User Operations */

/** if the user already exist returns undefined */
Array.prototype.addUser = function (username, password){
    var user = this.findUserByName(username);
    if(user !== undefined) return undefined;

    var newuser = {username , password} ;
    newuser.data = [];
    newuser.role = "basic";
    this.push( newuser );
    console.log("Inserting:");
    //this.print();
    writeOnFile(this)

    return this[this.length-1];
}



Array.prototype.deleteUser = function(username){
    var index = this.findIndex(a => a.username === username)
    if(index === -1){ console.log("NOT FOUND"); return undefined;}



    console.log(`username ${username} index ${index}`)
    this.splice( index , 1)
    writeOnFile(this);
    return 0;
}

Array.prototype.findUserByName = function(username){
    var index =this.findIndex(a => a.username === username);
    return index !== -1 ?   this.at(index) : undefined   ;
    
}

Array.prototype.findUserById = function(id){
    return this.at(id);
}

//**  DATA OPERATIONS */

Array.prototype.addData = function(username,key , data){
    let user = this.findUserByName(username);
    if(user == undefined){ 
        console.log("user not found");
        return undefined;
    }

    if(this.findData(username,key) !== undefined){
        console.log("key already exist");
        return undefined;
    }

    data = btoa(data)
    user.data.push({key,data});
    console.log(`Adding to ${username} the data with key ${key} and value ${data}`);
    writeOnFile(this);
    return 0;
}

Array.prototype.removeData = function(username, key){
    let user = this.findUserByName(username);
    if(user === undefined){
        console.log(`user ${username} not found`);
        return undefined;
    }

    var index = user.data.findIndex(a => a.key === key)
    if(index === -1){ console.log(`NOT FOUND DATA WITH KEY ${key}`); return undefined;}
    console.log(`removing data username ${username} index ${index} key ${key}`)
    user.data.splice( index , 1);
    writeOnFile(this);
    return 0;
}

Array.prototype.findData = function(username,key){
    let user = this.findUserByName(username);
    var index = user.data.findIndex(a => a.key === key);
    if(index === -1) return undefined;
    return user.data[index];
}

Array.prototype.updateData = function(username, key, new_data){
    var data = this.findData(username,key);
    if(data === undefined){ 
        console.log("UPDATE FAILED : data not found"); 
        return undefined;
    }
    data.data = new_data;
    writeOnFile(this);
    return 0;
}

/** Exporting Singleton */

module.exports = {dbu};