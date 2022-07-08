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
            "PendingApprovalRewarding" : [],
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

//BadgeID, StudentID needed
Parse.Cloud.define("RewardBadge", async(request) => {
    const argument = request.params;

    //Query badge muna, importante si XP
    const Badge = Parse.Object.extend("Badge");
    const badgeQuery = new Parse.Query(Badge); 
    badgeQuery.equalTo("objectId", argument.BadgeID); //badgeQuery dapat ta yan si pangaran before kani
    const res = await badgeQuery.first(); //badgeQuery man dapat digdi
    var badgeXP = res.get("BadgePoints"); //kaag ta sa variable para dai makaribong

    //Query student sunod, tas kunon si badgesIDEarned
    const Student = Parse.Object.extend("Student");
    const studentQuery = new Parse.Query(Student);
    studentQuery.equalTo("objectId", argument.StudentID); //studentQuery dapat ta yan si pangaran before kani
    const res1 = await studentQuery.first(); //studentQuery man dapat digdi
    var badgesIDEarned = res1.get("BadgesIDEarned"); //kaag ta man muna sa variable ini
    var studentXP = res1.get("XP"); //kunon ta man si xp kang student

    //Gibo ning reward, set si badgeID as rewardID
    const Reward = Parse.Object.extend("Reward");
    const reward = new Reward();
    reward.save({
        "RewardID" : argument.BadgeID,
        "DateRewarded" : argument.DateRewarded,
    });

    //then push ta duman sa badgesIDEarned si ID kang reward
    badgesIDEarned.push(reward.get("objectId"));
    //add ta naman si xp
    studentXP += badgeXP;

    res1.set("BadgesIDEarned", badgesIDEarned); //saka ta iupdate si student
    res1.set("XP", studentXP) //update naman si xp
    res1.save(); //save na si student
});