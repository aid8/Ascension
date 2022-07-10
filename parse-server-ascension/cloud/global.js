/*
    You can put here global functions/variables which can be called by all cloud functions

    WARNINGS:
    -   NOT SURE IF GLOBAL VARIABLES SAVES UPON CHANGING / Server Reload
    -   A FIX IS TO SAVE THE VARIABLE IN THE DATABASE, CHECK FUNCTIONS BELOW

    Example to put variable:
    exports.foo = 5;

    For functions:
    exports.func = function(x){
        return x+1;
    }

    To access them:
    var Global = require('./global');
    console.log(Global.foo); //logs 5
    console.log(Global.func(10)); //logs 11
*/

exports.getRndInteger = function(min, max) {  //min is inclusive; max is exclusive
    return Math.floor(Math.random() * (max - min)) + min;
}

//format is mm/dd/yy
exports.getDateToday = function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

//Global Variables but in Database
Parse.Cloud.define("AddGlobal", async(_request) => {
    const Global = Parse.Object.extend("Global");
    const query = new Parse.Query(Global);
    const res = await query.find();

    //Create new global variables if no object is found (new server) and set default ids as blank
    if(res.length == 0){
        const global = new Global();

        global.save({
            "DefaultAvatarID" : "",
            "DefaultFrameID" : "",
            "DefaultCoverPhotoID" : "",
            "DefaultBannerID" : "",
        }).then(()=>{
            console.log("Created a new global entity");
        });
    }
});

Parse.Cloud.define("EditGlobal", async(request) => {
    const Global = Parse.Object.extend("Global");
    const query = new Parse.Query(Global);
    const res = await query.first();
    const args = request.params;
    res.save(args);
});

Parse.Cloud.define("GetGlobal", async(_request) => {
    const Global = Parse.Object.extend("Global");
    const query = new Parse.Query(Global);
    const res = await query.first();
    return JSON.stringify(res);
});