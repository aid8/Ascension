Parse.Cloud.define("AddDegree", async(request) => {
    const Degree = Parse.Object.extend("Degree");
    const degree = new Degree();
    degree.save({
        "DegreeName" : request.params.DegreeName,
        "DegreeUnitIDPointer" : request.params.DegreeUnitIDPointer,
    }).then(()=>{
        console.log("Successfully added Degree!");
    });
});

//Must specify id of degree with name of "DegreeID" then the attribute name along with the new value
Parse.Cloud.define("EditDegree", async(request) =>{
    const Degree = Parse.Object.extend("Degree");
    const query = new Parse.Query(Degree);
    const argument = request.params;
    query.equalTo("objectId", argument.DegreeID);
    const res = await query.first();
    
    var list_of_attr = ["DegreeName", "DegreeUnitIDPointer",];
    var list_of_arguments = [argument.DegreeName, argument.DegreeUnitIDPointer,];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Degree");
    });
});

//Must specify id of degree with name of "DegreeID"
Parse.Cloud.define("DeleteDegree", async(request) =>{
    const Degree = Parse.Object.extend("Degree");
    const query = new Parse.Query(Degree);
    const argument = request.params;
    query.equalTo("objectId", argument.DegreeID);
    const res = await query.first();

    //Should throw error if a student has this degree
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (const student of students){
        if(student.StudentDegreeIDPointer === argument.DegreeID){
            return Promise.reject("Cannot Delete Degree! A Student has this Degree");
        }
    }

    res.destroy().then(()=>{
        console.log("Successfully Deleted Degree");
    });
});

//Must specify id of degree with name of "DegreeID"
//Returns the data of a degree
Parse.Cloud.define("GetDegreeData", async(request) => {
    const Degree = Parse.Object.extend("Degree");
    const query = new Parse.Query(Degree);
    const argument = request.params;
    query.equalTo("objectId", argument.DegreeID);
    const res = await query.first();
    return JSON.stringify(res);
});

//Returns all degrees if DegreeUnitIDPointer is not specified
Parse.Cloud.define("GetDegrees", async(request) =>{
    const Degree = Parse.Object.extend("Degree");
    const query = new Parse.Query(Degree);
    const argument = request.params;
    if(argument.DegreeUnitIDPointer != null){
        query.equalTo("DegreeUnitIDPointer", argument.DegreeUnitIDPointer);
    }
    const res = await query.find();
    return JSON.stringify(res);
});