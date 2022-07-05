Parse.Cloud.define("AddStudent", async(request) => {
    const Student = Parse.Object.extend("Student");
    const student = new Student();

    student.save({
        "FirstName" : request.params.FirstName,
        "MiddleName" : request.params.MiddleName,
        "LastName" : request.params.LastName,
        "Email" : request.params.Email,
        "ContactNumber" : request.params.ContactNumber,
        "RegisterDate" : request.params.RegisterDate,
        "YearLevel" : request.params.YearLevel,
        "StudentUnitIDPointer" : request.params.StudentUnitIDPointer,
        "StudentDegreeIDPointer" : request.params.StudentDegreeIDPointer,
        "StudentCoursesIDPointer" : request.params.StudentCoursesIDPointer,
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
            "HouseIDPointer" : "0", //add function "AssignHouse"
            "EquippedCosmetics" : ["0", "0", "0", "0"] //set to default id
        });
    }
});

Parse.Cloud.define("GetStudentData", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    return JSON.stringify(res);
});
  