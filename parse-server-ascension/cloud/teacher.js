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
    }).then(async (res)=>{
        var user = request.user;
        user.set("AccountID", res.id);
        user.set("AccountType", "Teacher");
        Parse.Object.saveAll([user], { useMasterKey: true });
        console.log("Successfully added Teacher!");
    });
});

Parse.Cloud.afterSave("Teacher", async(request)=>{
    const teacher = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        return teacher.save({
            "PendingApprovalRewarding" : [],
        });
    }
});

//Must specify id of teacher with name of "TeacherID"
Parse.Cloud.define("EditTeacher", async(request) => {
    const argument = request.params
    const dataParams = {
        "TeacherID": argument.TeacherID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTeacherData", dataParams)

    var list_of_attr = ["FirstName", "MiddleName", "LastName", 
                        "Email", "ContactNumber", "RegisterDate", "JobTitle", 
                        "TeacherUnitIDPointer", "TeacherCoursesIDPointer", "PendingApprovalRewarding",
    ];
    
    var list_of_arguments =[argument.FirstName, argument.MiddleName, argument.LastName, 
                            argument.Email, argument.ContactNumber, argument.RegisterDate, argument.JobTitle,
                            argument.TeacherUnitIDPointer, argument.TeacherCoursesIDPointer, argument.PendingApprovalRewarding,
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
    const argument = request.params
    const dataParams = {
        "TeacherID": argument.TeacherID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTeacherData", dataParams)
    res.destroy().then(() => {
        console.log("Successfully Deleted Teacher");
    });
    
});

//Must specify id of teacher with name of "TeacherID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of a teacher or the query's result based on the value of Type
Parse.Cloud.define("GetTeacherData", async(request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const argument = request.params;
    query.equalTo("objectId", argument.TeacherID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    
    //Pass PendingApprovalRewardingData
    var PendingApprovalRewardingData = [];
    var params;
    for(const RequestID of res.get("PendingApprovalRewarding")){
        params = {
            "RequestID" : RequestID,
        }
        PendingApprovalRewardingData.push(JSON.parse(await Parse.Cloud.run("GetRequestData", params)));
    }
    res.set("PendingApprovalRewardingData", PendingApprovalRewardingData);
    return JSON.stringify(res);
});

Parse.Cloud.define("GetTeachers", async(_request) => {
    const Teacher = Parse.Object.extend("Teacher");
    const query = new Parse.Query(Teacher);
    const res = await query.find();
    return JSON.stringify(res);
});