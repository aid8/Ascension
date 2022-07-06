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

//Must specify id of student with name of "StudentID" then the attribute name along with the new value
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

/* Must specify id of student with name of "StudentID"
    BadgesIDEarned will have BadgesEarned containing the data of each badges
    ChosenTrophies will have ChosenTrophiesData
    Same as TrophiesIDUnlocked, AvatarsIDUnlocked, etc.. 
    Comment ko muna si iba ta dai pa handa sa version ko si ibang entity
*/
Parse.Cloud.define("GetStudentData", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //Pass BadgesEarned Data
    var BadgesEarned = [];
    for(const badgeID of res.get("BadgesIDEarned")){
        var params = {
            "BadgeID" : badgeID,
        }
        //BadgesEarned.push(JSON.parse(await Parse.Cloud.run("GetBadgeData", params)));
    }
    res.set("BadgesEarned", BadgesEarned);

    //Pass TrophiesUnlocked Data
    var TrophiesIDUnlocked = [];
    for(const trophyID of res.get("TrophiesIDUnlocked")){
        var params = {
            "TrophyID" : trophyID,
        }
        //BadgesEarned.push(JSON.parse(await Parse.Cloud.run("GetTrophyData", params)));
    }
    res.set("TrophiesUnlocked", TrophiesIDUnlocked);

    //Pass ChosenTrophies  Data
    var ChosenTrophies = [];
    for(const trophyID of res.get("TrophiesIDUnlocked")){
        var params = {
            "TrophyID" : trophyID,
        }
        //BadgesEarned.push(JSON.parse(await Parse.Cloud.run("GetTrophyData", params)));
    }
    res.set("ChosenTrophiesData", ChosenTrophies);

    //Pass CosmeticsUnlocked Data
    var cosmeticArrNames = ["AvatarsIDUnlocked", "FrameIDUnlocked", "BannerIDUnlocked", "CoverPhotoIDUnlocked"];
    var cosmeticArrNewNames = ["AvatarsUnlocked", "FrameUnlocked", "BannerUnlocked", "CoverPhotoUnlocked"];

    for(let i = 0; i < cosmeticArrNames.length; ++i){
        var CosmeticUnlocked = [];
        for(const cosmeticID of res.get(cosmeticArrNames[i])){
            var params = {
                "CosmeticID" : cosmeticID,
            }
            //CosmeticUnlocked.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", params)));
        }
        res.set(cosmeticArrNewNames[i], CosmeticUnlocked);
    }

    //Dont save, since we just want this to be passed to the caller
    return JSON.stringify(res);
});


//AssignHouse
//Pending since there are still no House functions in this version
/*
Parse.Cloud.define("AssignHouse", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //GetAllHouses
    //DeleteHouseMember in res.get("HouseID");
    //res.set("HouseID", HouseID);
    res.save().then(()=>{
        console.log("Successfully Changed House");
    });
});
*/

//Must specify id of student with name of "StudentID", along with three top trophiesID named "TrophiesID_1", "TrophiesID_2", "TrophiesID_3"
Parse.Cloud.define("ChangeTopTrophies", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    var ChosenTrophies = [argument.TrophiesID_1, argument.TrophiesID_2, argument.TrophiesID_3]

    for(let i = 0; i < ChosenTrophies.length; ++i){
        if(ChosenTrophies[i] == null){
            ChosenTrophies[i] = "";
        }
    }

    res.set("ChosenTrophies", ChosenTrophies);
    res.save().then(()=>{
        console.log("Successfully Edited Top Trophies");
    });
});

//Must specify id of student with name of "StudentID", CosmeticID and CosmeticType
Parse.Cloud.define("AddStudentCosmetic", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    var cosmeticName = {
        "Avatar" : "AvatarsIDUnlocked",
        "Frame" : "FrameIDUnlocked",
        "Banner" : "BannerIDUnlocked",
        "CoverPhoto" : "CoverPhotoIDUnlocked",
    };
    let cosmeticArr = res.get(cosmeticName[argument.CosmeticType]);
    cosmeticArr.push(argument.CosmeticID);
    res.set(cosmeticName[argument.CosmeticType], cosmeticArr);

    res.save().then(()=>{
        console.log("Successfully Added Cosmetics");
    });
});

//Must specify id of student with name of "StudentID", CosmeticID and CosmeticType
//Useful for event/timed cosmetic
Parse.Cloud.define("DeleteStudentCosmetic", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    var cosmeticName = {
        "Avatar" : "AvatarsIDUnlocked",
        "Frame" : "FrameIDUnlocked",
        "Banner" : "BannerIDUnlocked",
        "CoverPhoto" : "CoverPhotoIDUnlocked",
    };
    let cosmeticArr = res.get(cosmeticName[argument.CosmeticType]);
    let index = cosmeticArr.indexOf(argument.CosmeticID);
    if(index > -1){
        cosmeticArr.splice(index, 1);
    }
    res.set(cosmeticName[argument.CosmeticType], cosmeticArr);

    res.save().then(()=>{
        console.log("Successfully Deleted Cosmetics");
    });
});

//Must specify id of student with name of "StudentID", CosmeticType and CosmeticID
Parse.Cloud.define("ChangeEquippedStudentCosmetic", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    var cosmeticIndex = {
        "Avatar" : 0,
        "Frame" : 1,
        "Banner" : 2,
        "CoverPhoto" : 3,
    };
    var index = cosmeticIndex[argument.CosmeticType];
    let cosmeticEquippedArr = res.get("EquippedCosmetics");
    cosmeticEquippedArr[index] = argument.CosmeticID;
    res.set("EquippedCosmetics", cosmeticEquippedArr);

    res.save().then(()=>{
        console.log("Successfully Changed Equipped Cosmetics!");
    });
});

//Must specify id of student with name of "StudentID", "DisplayTitle" with value of boolean
//Change console.log to the proper function of getting ascension title
Parse.Cloud.define("DisplayStudentXPTitle", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    if(argument.DisplayTitle){
        console.log("Call GetXPAscensionTitle");
    }
    else{
        res.set("AscensionTitle", "");
    }

    res.save().then(()=>{
        console.log("Successfully Displayed/Hidden StudentXPTitle!");
    });
});

//RequestBadge
//Pending, since Proof entity is still being planned in this version
/*
//Must specify id of student with name of "StudentID", BadgeID, UserType and TeacherID/NT_DistributorID
Parse.Cloud.define("RequestBadge", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
});
*/