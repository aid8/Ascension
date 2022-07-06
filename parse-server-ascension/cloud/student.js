Parse.Cloud.define("AddStudent", async(request) => {
    const Student = Parse.Object.extend("Student");
    const student = new Student();
    const argument = request.params;

    student.save({
        "FirstName" : argument.FirstName,
        "MiddleName" : argument.MiddleName,
        "LastName" : argument.LastName,
        "Email" : argument.Email,
        "ContactNumber" : argument.ContactNumber,
        "RegisterDate" : argument.RegisterDate,
        "YearLevel" : argument.YearLevel,
        "StudentUnitIDPointer" : argument.StudentUnitIDPointer,
        "StudentDegreeIDPointer" : argument.StudentDegreeIDPointer,
        "StudentCoursesIDPointer" : argument.StudentCoursesIDPointer,
    }).then(()=>{
        console.log("Successfully added Student!");
    });
});

Parse.Cloud.afterSave("Student", async(request)=>{
    const student = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        return student.save({
            "XP" : 0,
            "AscensionPoints" : 0,
            "BadgesIDEarned" : [],
            "TrophiesIDUnlocked" : [],
            "ChosenTrophies" : [],
            "AvatarsIDUnlocked" : ["0"], //Change 0 to default id
            "FrameIDUnlocked" : ["0"],
            "BannerIDUnlocked" : ["0"],
            "CoverPhotoIDUnlocked" : ["0"],
            "AscensionTitle" : "Default", //add function "GetAscensionTitle"
            "StudentHouseIDPointer" : "0", //add function "AssignHouse"
            "EquippedCosmetics" : ["0", "0", "0", "0"] //set to default id
        });
    }
});

//Must specify id of student with name of "StudentID"
Parse.Cloud.define("EditStudent", async(request) =>{
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;

    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    
    var list_of_attr = ["FirstName", "MiddleName", "LastName", "Email", "ContactNumber", 
                        "RegisterDate", "YearLevel", "StudentUnitIDPointer", "StudentDegreeIDPointer", "StudentCoursesIDPointer",
                        "XP", "AscensionPoints", "BadgesIDEarned", "TrophiesIDUnlocked", "ChosenTrophies",
                        "AvatarsIDUnlocked", "FrameIDUnlocked", "BannerIDUnlocked", "CoverPhotoIDUnlocked","AscensionTitle",
                        "HouseIDPointer", "EquippedCosmetics",
    ];
    var list_of_arguments = [argument.FirstName, argument.MiddleName, argument.LastName, argument.Email, argument.ContactNumber,
                            argument.RegisterDate, argument.YearLevel, argument.StudentUnitIDPointer, argument.StudentDegreeIDPointer, argument.StudentCoursesIDPointer,
                            argument.XP, argument.AscensionPoints, argument.BadgesIDEarned, argument.TrophiesIDUnlocked, argument.ChosenTrophies,
                            argument.AvatarsIDUnlocked, argument.FrameIDUnlocked, argument.BannerIDUnlocked, argument.CoverPhotoIDUnlocked, argument.AscensionTitle,
                            argument.HouseIDPointer, argument.EquippedCosmetics,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Student");
    });
});

//Must specify id of student with name of "StudentID"
Parse.Cloud.define("DeleteStudent", async(request) =>{
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;

    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //Query House then call delete member

    res.destroy().then(()=>{
        console.log("Successfully Deleted Student");
    });
});

Parse.Cloud.define("GetStudentData", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    return JSON.stringify(res);
});
  