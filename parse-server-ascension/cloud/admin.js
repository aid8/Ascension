//Returns a list of Degrees from the Database
Parse.Cloud.define("AdminGetDegrees", async() =>{
    const Degree = Parse.Object.extend("Degree");
    const qry = new Parse.Query(Degree);
    qry.exists('DegreeUnitIDPointer')
    const res = await qry.find();
    return JSON.stringify(res);
});

Parse.Cloud.define("AdminSetCourseToAllDegrees", async()=>{
    let CourseDegrees = []
    const Degree = Parse.Object.extend("Degree")
    const qry = new Parse.Query(Degree)
    const res = await qry.find()
    for(i = 0; i < res.length; i++){
        CourseDegrees.push(res[i].id)
    }
    return CourseDegrees
})