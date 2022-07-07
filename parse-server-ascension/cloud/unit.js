/*
    Functions that are not yet tested upon creating/updating:
    - DeleteUnit
*/
Parse.Cloud.define("AddUnit", async(request) => {   //async AddUnit(request){}
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

//Must specify id of unit with name of "UnitID" then the attribute name along with the new value
Parse.Cloud.define("EditUnit", async(request) =>{
    const Unit = Parse.Object.extend("Unit");
    const query = new Parse.Query(Unit);
    const argument = request.params;
    query.equalTo("objectId", argument.UnitID);
    const res = await query.first();
    
    var list_of_attr = ["UnitName", "UnitContactNumber", "UnitType",];
    var list_of_arguments = [argument.UnitName, argument.UnitContactNumber, argument.UnitType,];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Unit");
    });
});

//Must specify id of unit with name of "UnitID"
Parse.Cloud.define("DeleteUnit", async(request) =>{
    const Unit = Parse.Object.extend("Unit");
    const query = new Parse.Query(Unit);
    const argument = request.params;
    query.equalTo("objectId", argument.UnitID);
    const res = await query.first();

    //Should throw error if a teacher/nt belongs to this unit/UnitID
    var teachers = JSON.parse(await Parse.Cloud.run("GetTeachers"));
    for (const teacher of teachers){
        if(teacher.TeacherUnitIDPointer === argument.UnitID){
            return Promise.reject("Cannot Delete Unit! A Teacher is in this Unit!");
        }
    }

    var nt_distributors = JSON.parse(await Parse.Cloud.run("GetNT_Distributors"));
    for (const nt_distributor of nt_distributors){
        if(nt_distributor.NT_DistributorUnitIDPointer === argument.UnitID){
            return Promise.reject("Cannot Delete Unit! An NT_Distributor is in this Unit!");
        }
    }

    res.destroy().then(()=>{
        console.log("Successfully Deleted Unit");
    });
});

//Must specify id of unit with name of "UnitID"
//Returns the data of a unit
Parse.Cloud.define("GetUnitData", async(request) => {
    const Unit = Parse.Object.extend("Unit");
    const query = new Parse.Query(Unit);
    const argument = request.params;
    query.equalTo("objectId", argument.UnitID);
    const res = await query.first();
    return JSON.stringify(res);
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