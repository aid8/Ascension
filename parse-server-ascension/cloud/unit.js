Parse.Cloud.define("AddUnit", async(request) => {
    const Unit = Parse.Object.extend("Unit");
    const unit = new Unit();
    unit.save({
        "UnitName" : request.params.UnitName,
        "UnitContactNumber" : request.params.UnitContactNumber,
        "UnitType" : request.params.UnitType,
    }).then(()=>{
        console.log("Successfully added Unit!");
    });
});

//Returns all units when UnitType is not specified
Parse.Cloud.define("GetUnits", async(request) =>{
    const Unit = Parse.Object.extend("Unit");
    const query = new Parse.Query(Unit);
    const argument = request.params;
    if(argument.UnitType != null){
        query.equalTo("UnitType", argument.UnitType);
    }
    const res = await query.find();
    return JSON.stringify(res);
});