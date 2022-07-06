Parse.Cloud.define("AddTeacher", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const teacher = new Teacher();
    const argument = request.params;

    teacher.save({
        "FirstName" : argument.FirstName,
        "MiddleName" : argument.MiddleName,
        "LastName" : argument.LastName,
        "Email" : argument.Email,
        "ContactNumber" : argument.ContactNumber,
        "RegisterDate" : argument.RegisterDate,
        "JobTitle" : argument.JobTitle,
        "TeacherUnitIDPointer" : argument.TeacherUnitIDPointer,
        "TeacherCoursesIDPointer" : argument.TeacherCoursesIDPointer,
    }).then(()=>{
        console.log("Successfully added Teacher!");
    });
});

Parse.Cloud.afterSave("Teacher", async(request)=>{
    const teacher = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        return teacher.save({
            "PendingApprovalBadgesID" : [],
        });
    }
});

Parse.Cloud.define("GetTeacherData", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const argument = request.params;
    query.equalTo("objectId", argument.TeacherID);
    const res = await query.first();
    return JSON.stringify(res);
});