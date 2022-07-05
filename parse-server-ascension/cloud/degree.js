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