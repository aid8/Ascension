var Global = require('./global');

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
        "UserName" : argument.UserName,
        "Address" : argument.Address,
        "SchoolID" : argument.SchoolID,
        "YearLevel" : argument.YearLevel,
        "StudentUnitIDPointer" : argument.StudentUnitIDPointer,
        "StudentDegreeIDPointer" : argument.StudentDegreeIDPointer,
        "StudentCoursesIDPointer" : argument.StudentCoursesIDPointer,
    }).then(async (res)=>{
        var user = request.user;
        user.set("AccountID", res.id);
        user.set("AccountType", "Student");
        Parse.Object.saveAll([user], { useMasterKey: true });
        console.log("Successfully added Student!");
    });
});

Parse.Cloud.afterSave("Student", async(request)=>{
    const student = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        //Run SearchAscensionTitleFromXp
        var params = {"XpInput" : 0};
        var xptitle = JSON.parse(await Parse.Cloud.run("SearchAscensionTitleFromXp", params));
        var defaultCosmetics = JSON.parse(await Parse.Cloud.run("GetGlobal"));
        return student.save({
            "RegisterDate" : Global.getDateToday(),
            "XP" : 0,
            "AscensionPoints" : 0,
            "BadgesIDEarned" : [],
            "TrophiesIDUnlocked" : [],
            "ChosenTrophies" : [],
            "AvatarsIDUnlocked" : [defaultCosmetics.DefaultAvatarID],
            "FrameIDUnlocked" : [defaultCosmetics.DefaultFrameID],
            "BannerID" : "", //will be set to Banner of house upon assigning house
            "CoverPhotoIDUnlocked" : [defaultCosmetics.DefaultCoverPhotoID],
            "AscensionTitle" : xptitle.AscensionName,
            "StudentHouseIDPointer" : "",
            "EquippedCosmetics" : [defaultCosmetics.DefaultAvatarID, defaultCosmetics.DefaultFrameID, defaultCosmetics.DefaultCoverPhotoID] //set to default id [Avatar, Frame, CoverPhoto]
        }).then(async(res)=>{
            //Run assign house
            params = {"StudentID" : res.id,};
            await Parse.Cloud.run("AssignHouse", params);
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
                        "RegisterDate", "UserName", "Address", "SchoolID",
                        "YearLevel", "StudentUnitIDPointer", "StudentDegreeIDPointer", "StudentCoursesIDPointer",
                        "XP", "AscensionPoints", "BadgesIDEarned", "TrophiesIDUnlocked", "ChosenTrophies",
                        "AvatarsIDUnlocked", "FrameIDUnlocked", "BannerID", "CoverPhotoIDUnlocked","AscensionTitle",
                        "StudentHouseIDPointer", "EquippedCosmetics",
    ];
    var list_of_arguments = [argument.FirstName, argument.MiddleName, argument.LastName, argument.Email, argument.ContactNumber,
                            argument.RegisterDate, argument.UserName, argument.Address, argument.SchoolID,
                            argument.YearLevel, argument.StudentUnitIDPointer, argument.StudentDegreeIDPointer, argument.StudentCoursesIDPointer,
                            argument.XP, argument.AscensionPoints, argument.BadgesIDEarned, argument.TrophiesIDUnlocked, argument.ChosenTrophies,
                            argument.AvatarsIDUnlocked, argument.FrameIDUnlocked, argument.BannerID, argument.CoverPhotoIDUnlocked, argument.AscensionTitle,
                            argument.StudentHouseIDPointer, argument.EquippedCosmetics,
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

    var params = {
        "HouseID" : res.get("StudentHouseIDPointer"),
        "StudentID" : res.id,
    }
    await Parse.Cloud.run("DeleteHouseMember", params);

    res.destroy().then(()=>{
        console.log("Successfully Deleted Student");
    });
});

/* Must specify id of student with name of "StudentID"
    BadgesIDEarned will have BadgesEarned containing the data of each badges
    ChosenTrophies will have ChosenTrophiesData
    Same as TrophiesIDUnlocked, AvatarsIDUnlocked, etc.. 
*/
Parse.Cloud.define("GetStudentData", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //Pass BadgesEarned Data
    var BadgesEarned = [];
    var params;
    for(const RewardID of res.get("BadgesIDEarned")){
        params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        BadgesEarned.push(RewardData.RewardData);
    }
    res.set("BadgesEarned", BadgesEarned);

    //Pass TrophiesUnlocked Data
    var TrophiesUnlocked = [];
    for(const RewardID of res.get("TrophiesIDUnlocked")){
        params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        TrophiesUnlocked.push(RewardData.RewardData);
    }
    res.set("TrophiesUnlocked", TrophiesUnlocked);

    //Pass ChosenTrophies Data
    var ChosenTrophiesData = [];
    for(const RewardID of res.get("ChosenTrophies")){
        params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        ChosenTrophiesData.push(RewardData.RewardData);
    }
    res.set("ChosenTrophiesData", ChosenTrophiesData);

    //Pass CosmeticsUnlocked Data
    var cosmeticArrNames = ["AvatarsIDUnlocked", "FrameIDUnlocked", "CoverPhotoIDUnlocked"];
    var cosmeticArrNewNames = ["AvatarsUnlocked", "FrameUnlocked", "CoverPhotoUnlocked"];

    for(let i = 0; i < cosmeticArrNames.length; ++i){
        var CosmeticUnlocked = [];
        for(const cosmeticID of res.get(cosmeticArrNames[i])){
            params = {
                "CosmeticID" : cosmeticID,
            }
            CosmeticUnlocked.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", params)));
        }
        res.set(cosmeticArrNewNames[i], CosmeticUnlocked);
    }

    //Pass EquippedCosmetics
    var EquippedCosmeticsData = [];
    for(const cosmeticID of res.get("EquippedCosmetics")){
        params = {
            "CosmeticID" : cosmeticID,
        }
        EquippedCosmeticsData.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", params)));
    }
    res.set("EquippedCosmeticsData", EquippedCosmeticsData);

    //Dont save, since we just want this to be passed to the caller
    return JSON.stringify(res);
});

Parse.Cloud.define("GetStudents", async(_request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const res = await query.find();
    return JSON.stringify(res);
});

//Must specify id of student with name of "StudentID",
Parse.Cloud.define("AssignHouse", async(request) => {
    const House = Parse.Object.extend("House");
    const query = new Parse.Query(House); 
    const argument = request.params;
    const res = await query.find();
    const res2 = JSON.parse(JSON.stringify(res))
    let housePopulations = res2.map(obj => obj.HousePopulation) //makes an array of HousePopulation from the Houses
    let max = Math.max.apply(Math, housePopulations)
    let min = Math.min.apply(Math, housePopulations)
    let avail_houses = []
    if(min == max){
        avail_houses = res2;
    }
    else{
        for(const house of res2){
            if(house.HousePopulation == min){
                avail_houses.push(house);
            }
        }
    } 
    const idx = Global.getRndInteger(0, avail_houses.length)
    var params = {
        "StudentID" : argument.StudentID,
        "HouseID" : avail_houses[idx].objectId,
    }

    await Parse.Cloud.run("AddHouseMember", params);
    console.log("Successfully Assigned House");
});

//Must specify id of student with name of "StudentID" and new "HouseID"
Parse.Cloud.define("ChangeStudentHouse", async(request) => {
    const Student = Parse.Object.extend("Student");
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();
    
    var params = {
        "StudentID" : argument.StudentID,
        "HouseID" : res.get("StudentHouseIDPointer"),
    }
    await Parse.Cloud.run("DeleteHouseMember", params);
    
    params["HouseID"] = argument.HouseID;
    await Parse.Cloud.run("AddHouseMember", params);

    console.log("Successfully Changed House");
});

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
        "CoverPhoto" : 2,
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
        var params = {"XpInput" : res.get("XP")};
        var xptitle = JSON.parse(await Parse.Cloud.run("SearchAscensionTitleFromXp", params));
        res.set("AscensionTitle", xptitle.AscensionName);
    }
    else{
        res.set("AscensionTitle", "");
    }

    res.save().then(()=>{
        console.log("Successfully Displayed/Hidden StudentXPTitle!");
    });
});