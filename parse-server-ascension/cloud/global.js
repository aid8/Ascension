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

//format is mm/dd/yyyy
exports.getDateToday = function(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}

//format is mm/dd/yyyy
//Adds the given day with the days parameter. It month and year adjusts accordingly.
//addDayOnDate("7/29/2022", 5);
exports.addDaysOnDate = function(date, days) {
    var s = date.split('/');
    var result = new Date(s[2] + '-' + s[0] + '-' + s[1]);
    result.setDate(result.getDate() + days);
    var resultArr = result.toISOString().slice(0,10).replace(/-/g," ").split(' ');
    //Return as MM/DD/YY
    return resultArr[1] + "/" + resultArr[2] + "/" + resultArr[0];
}

//format is mm/dd/yyyy
//compareDate("7/29/2022", "7/30/2022", ">");
exports.compareDate = function(date1, date2, operator){
    var s1 = date1.split('/');
    var s2 = date2.split('/');
    var date1C = new Date(s1[2] + '-' + s1[0] + '-' + s1[1]);
    var date2C = new Date(s2[2] + '-' + s2[0] + '-' + s2[1]);
    switch(operator){
        case ">":
            return date1C > date2C;
        case "<":
            return date1C < date2C;
        case ">=":
            return date1C >= date2C;
        case "<=":
            return date1C <= date2C;
        case "==":
            return +date1C === +date2C;
        default:
    }
    return false;
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