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

//Must specify id of teacher with name of "TeacherID"
Parse.Cloud.define("EditTeacher", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const argument = request.params;

    query.equalTo("objectId", argument.TeacherID);
    const res = await query.first();

    var list_of_attr = ["FirstName", "MiddleName", "LastName", 
                        "Email", "ContactNumber", "RegisterDate", "JobTitle", 
                        "TeacherUnitIDPointer", "TeacherCoursesIDPointer", "PendingApprovalBadgesID",
    ];
    
    var list_of_arguments =[argument.FirstName, argument.MiddleName, argument.LastName, 
                            argument.Email, argument.ContactNumber, argument.RegisterDate, argument.JobTitle,
                            argument.TeacherUnitIDPointer, argument.TeacherCoursesIDPointer, argument.PendingApprovalBadgesID,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Teacher");
    });
});

Parse.Cloud.define("DeleteTeacher", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const argument = request.params;

    query.equalTo("objectId", argument.TeacherID);
    const res = await query.first();

    res.destroy().then(() => {
        console.log("Successfully Deleted Teacher");
    });
    
});

Parse.Cloud.define("GetTeacherData", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const argument = request.params;
    query.equalTo("objectId", argument.TeacherID);
    const res = await query.first();
    return JSON.stringify(res);
});

Parse.Cloud.define("GetTeachers", async(_request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const res = await query.find();
    return JSON.stringify(res);
});