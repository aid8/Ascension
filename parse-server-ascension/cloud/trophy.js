/*
    Functions that are incomplete:
    - VerifyUltimateBadge
*/
var Global = require('./global');

Parse.Cloud.define("AddTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const trophy = new Trophy();
    const argument = request.params;

    var convertedImage = {base64: argument.TrophyImage};
    var parseFile = new Parse.File(argument.TrophyImageName, convertedImage);

    parseFile.save({ useMasterKey: true }).then(function(result) {
        var link = result.url();
        trophy.save({
            "TrophyName" : argument.TrophyName,
            "TrophyDescription" : argument.TrophyDescription,
            "TrophyPoints" : argument.TrophyPoints,
            "TrophyImage" : link,
            "TrophyType" : argument.TrophyType,
            "BadgesIDNeeded" : argument.BadgesIDNeeded,
        }, { useMasterKey: true }).then(()=>{
            console.log("Successfully Added Trophy!");
        });
    });
});

Parse.Cloud.afterSave("Trophy", async(request) => {  
    var trophy = request.object;
    var trophy_orig = request.original;

    //If badgesIDNeeded are edited, call verify trophy eligibility/removal for all students
    if(trophy_orig){ //If trophy is edited
        var curBadges = trophy_orig.get("BadgesIDNeeded");
        var updatedBadges = trophy.get("BadgesIDNeeded");
        //Convered to JSON to compare array properly
        var need_verification = (JSON.stringify(curBadges) !== JSON.stringify(updatedBadges));

        if (need_verification) {
            var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
            for(const student of students){
                var param = {"StudentID" : student.objectId}
                if(updatedBadges.length > curBadges.length){
                    await Parse.Cloud.run("VerifyTrophyRemoval", param);
                }
                else{
                    await Parse.Cloud.run("VerifyTrophyEligibility", param);
                }
            }
        }
    }
});

//Must specify id of Trophy with name of "TrophyID"
Parse.Cloud.define("EditTrophy", async(request) => {
    const argument = request.params;
    const params = {
        "TrophyID": argument.TrophyID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTrophyData", params)

    var list_of_attr = ["TrophyName", "TrophyDescription", "TrophyPoints", 
                    "TrophyType", "BadgesIDNeeded",
    ];
    
    var list_of_arguments =[argument.TrophyName, argument.TrophyDescription, argument.TrophyPoints, 
                           argument.TrophyType, argument.BadgesIDNeeded
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    //If Trophy Image is provided, then replace the image
    if(argument.TrophyImage != null && argument.TrophyImageName != null){
        //Delete old image
        var imageToDelete = res.get("TrophyImage").replace('/myAppId','');
        var param = {"url" : imageToDelete};
        await Parse.Cloud.run("DeleteFile", param);

        var convertedImage = {base64: argument.TrophyImage};
        var parseFile = new Parse.File(argument.TrophyImageName, convertedImage);

        parseFile.save({ useMasterKey: true }).then(function(result) {
            var link = result.url();
            res.set("TrophyImage", link);
            res.save().then(()=>{
                console.log("Successfully Edited Trophy");
            });
        });
    }
    else{
        res.save().then(()=>{
            console.log("Successfully Edited Trophy");
        });
    }
});

Parse.Cloud.define("DeleteTrophy", async(request) => {
    const argument = request.params;
    const params = {
        "TrophyID": argument.TrophyID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTrophyData", params)

    //If a student has a trophy in this, reject
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    var param;
    for (const student of students){
        var TrophiesRewardIDUnlocked = student.TrophiesIDUnlocked;
        var TrophiesIDUnlocked = [];
        for(const RewardID of TrophiesRewardIDUnlocked){
            param = {"RewardID" : RewardID};
            let rewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", param));
            TrophiesIDUnlocked.push(rewardData.RewardID);
        }
        let index = TrophiesIDUnlocked.indexOf(argument.TrophyID);
        if(index > -1){
            return Promise.reject("Cannot Delete Trophy! One or more students have acquired this Trophy.");
        }
    }

    //Delete image
    var imageToDelete = res.get("TrophyImage").replace('/myAppId','');
    param = {"url" : imageToDelete};
    await Parse.Cloud.run("DeleteFile", param);

    res.destroy().then(() => {
        console.log("Successfully Deleted Trophy");
    });
});

Parse.Cloud.define("GetTrophyData", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    return JSON.stringify(res);
});

//If TrophyType is defined, query depending on trophytype
Parse.Cloud.define("GetTrophies", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    if(argument.TrophyType !== undefined){
        query.equalTo("TrophyType", argument.TrophyType);
    }
    const res = await query.find();
    return JSON.stringify(res);
});

//StudentID
Parse.Cloud.define("GetUnacquiredTrophies", async(request) => {
    //Get Trophies
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    query.equalTo("TrophyType", "Student");
    const res = await query.find();

    //Gets the Student
    const Student = Parse.Object.extend("Student");
    const query1 = new Parse.Query(Student);
    query1.equalTo("objectId", argument.StudentID);
    const res1 = await query1.first();
    const studentTrophies = res1.get("TrophiesIDUnlocked");
    var acquiredTrophies = {};
    
    for(const RewardID of studentTrophies){
        var params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        acquiredTrophies[RewardData.RewardID] = true;
    }
    
    var unacquiredTrophies = [];
    for(const trophy of res){
        if(!(trophy.id in acquiredTrophies)){
            unacquiredTrophies.push(trophy);
        }
    }
    return JSON.stringify(unacquiredTrophies);
});

//HouseID
Parse.Cloud.define("GetUnacquiredHouseTrophies", async(request) => {
    //Get Trophy
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    query.equalTo("TrophyType", "House");
    const res = await query.find();

    //Gets the House
    const House = Parse.Object.extend("House");
    const query1 = new Parse.Query(House);
    query1.equalTo("objectId", argument.HouseID);
    const res1 = await query1.first();
    const houseTrophies = res1.get("HouseTrophiesIDUnlocked");
    var acquiredHouseTrophies = {};
    
    for(const RewardID of houseTrophies){
        var params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        acquiredHouseTrophies[RewardData.RewardID] = true;
    }
    
    var unacquiredHouseTrophies = [];
    for(const trophy of res){
        if(!(trophy.id in acquiredHouseTrophies)){
            unacquiredHouseTrophies.push(trophy);
        }
    }
    return JSON.stringify(unacquiredHouseTrophies);
});

//TrophyID, StudentID
Parse.Cloud.define("RewardTrophy", async(request) => {
    const argument = request.params;

    //Query trophy muna, importante si XP
    const params = {
        "TrophyID": argument.TrophyID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTrophyData", params)
    var trophyXP = res.get("TrophyPoints");

    //Query student sunod, tas kunon si trophiesIDEarned
    const Student = Parse.Object.extend("Student");
    const studentQuery = new Parse.Query(Student);
    studentQuery.equalTo("objectId", argument.StudentID);
    const res1 = await studentQuery.first();
    var trophiesIDUnlocked = res1.get("TrophiesIDUnlocked");
    var studentXP = res1.get("XP");

    //Gibo ning reward object, set si trophyID as rewardID
    const Reward = Parse.Object.extend("Reward");
    const reward = new Reward();
    reward.save({
        "RewardID" : argument.TrophyID,
        "RewardType" : "Trophy",
        "DateRewarded" : Global.getDateToday(),
    }).then(async(obj)=>{
        trophiesIDUnlocked.push(obj.id);
        studentXP += trophyXP;
        res1.set("TrophiesIDUnlocked", trophiesIDUnlocked);
        res1.set("XP", studentXP);
        res1.save();

        //Call VerifyUltimateBadge
        var param = {"StudentID" : argument.StudentID};
        await Parse.Cloud.run("VerifyUltimateBadge", param);
    });
});

//TrophyID, HouseID
Parse.Cloud.define("RewardHouseTrophy", async(request) => {
    const argument = request.params;

    //Query trophy muna, importante si XP
    const params = {
        "TrophyID": argument.TrophyID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetTrophyData", params)
    var trophyXP = res.get("TrophyPoints");

    //Then Query house, then get the trophiesUnlocked
    const House = Parse.Object.extend("House");
    const houseQuery = new Parse.Query(House);
    houseQuery.equalTo("objectId", argument.HouseID);
    const res1 = await houseQuery.first();
    var houseTrophiesIDUnlocked = res1.get("HouseTrophiesIDUnlocked");
    var houseXP = res1.get("HouseXP");

    //Gibo ning reward object, set si trophyID as rewardID
    const Reward = Parse.Object.extend("Reward");
    const reward = new Reward();
    reward.save({
        "RewardID" : argument.TrophyID,
        "RewardType" : "Trophy",
        "DateRewarded" : Global.getDateToday(),
    }).then(async(obj)=>{
        houseTrophiesIDUnlocked.push(obj.id);
        houseXP += trophyXP;
        res1.set("HouseTrophiesIDUnlocked", houseTrophiesIDUnlocked);
        res1.set("HouseXP", houseXP);
        res1.save();
    });
});


//RewardID, StudentID, required
Parse.Cloud.define("RemoveTrophy", async(request) =>{
    const Student = Parse.Object.extend("Student")
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //GetRewardData
    const rewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", argument));
    var trophyXP = rewardData.RewardData.TrophyPoints;

    //UpdateStudent
    let rewards = res.get("TrophiesIDUnlocked");
    let studentXP = res.get("XP");
    const index = rewards.indexOf(argument.RewardID);
    if(index > -1){
        rewards.splice(index, 1);
    }
    res.set("TrophiesIDUnlocked", rewards);
    res.set("XP", studentXP - trophyXP);

    //Check if trophy is in ChosenTrophies

    res.save();

    //Remove Reward Object
    const Reward = Parse.Object.extend("Reward");
    const query1 = new Parse.Query(Reward);
    query1.equalTo("objectId", argument.RewardID);
    const res1 = await query1.first();
    res1.destroy();
});

//RewardID, HouseID, required
Parse.Cloud.define("RemoveHouseTrophy", async(request) =>{
    const House = Parse.Object.extend("House")
    const query = new Parse.Query(House);
    const argument = request.params;
    query.equalTo("objectId", argument.HouseID);
    const res = await query.first();

    //GetRewardData
    const rewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", argument));
    var trophyXP = rewardData.RewardData.TrophyPoints;

    //Update House
    let rewards = res.get("HouseTrophiesIDUnlocked");
    let houseXP = res.get("HouseXP");
    const index = rewards.indexOf(argument.RewardID);
    if(index > -1){
        rewards.splice(index, 1);
    }
    res.set("HouseTrophiesIDUnlocked", rewards);
    res.set("HouseXP", houseXP - trophyXP);
    res.save();

    //Remove Reward Object
    const Reward = Parse.Object.extend("Reward");
    const query1 = new Parse.Query(Reward);
    query1.equalTo("objectId", argument.RewardID);
    const res1 = await query1.first();
    res1.destroy();
});

//StudentID only, tests all trophies if eligible
Parse.Cloud.define("VerifyTrophyEligibility", async(request) =>{
    const argument = request.params;
    
    //Gets the Data of student
    var param = {"StudentID" : argument.StudentID};
    var StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
    var Badges = StudentData.BadgesEarned;

    //Get all unacquired trophies
    const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredTrophies", param));

    for(const trophy of res){
        let BadgesIDNeeded = trophy.BadgesIDNeeded;
        let count = 0;
        for(const badge of Badges){
            if(BadgesIDNeeded.includes(badge.objectId)){
                count += 1;
            }
        }
        if(count == BadgesIDNeeded.length){
            param = {
                "StudentID" : argument.StudentID,
                "TrophyID" : trophy.objectId,
            };
            await Parse.Cloud.run("RewardTrophy", param);
        }
    }
});

//HouseID only, tests all trophies if eligible
Parse.Cloud.define("VerifyHouseTrophyEligibility", async(request) =>{
    const argument = request.params;
    
    //Gets the Data of house
    var param = {"HouseID" : argument.HouseID};
    var HouseData = JSON.parse(await Parse.Cloud.run("GetHouseData", param));
    var HouseBadges = HouseData.HouseBadgesEarned;

    //Get all unacquired trophies
    const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredHouseTrophies", param));

    for(const trophy of res){
        let BadgesIDNeeded = trophy.BadgesIDNeeded;
        let count = 0;
        for(const badge of HouseBadges){
            if(BadgesIDNeeded.includes(badge.objectId)){
                count += 1;
            }
        }
        if(count == BadgesIDNeeded.length){
            param = {
                "HouseID" : argument.HouseID,
                "TrophyID" : trophy.objectId,
            };
            await Parse.Cloud.run("RewardHouseTrophy", param);
        }
    }
});

//VerifyTrophyRemoval
//StudentID only, tests if a trophy should be removed upon removing badge
//Chcek trophy badges id earned
Parse.Cloud.define("VerifyTrophyRemoval", async(request) =>{
    const argument = request.params;
    
    //Gets the Data of student
    var param = {"StudentID" : argument.StudentID};
    var StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
    var Badges = StudentData.BadgesEarned;
    var Trophies = StudentData.TrophiesUnlocked;
    var TrophiesRewardID = StudentData.TrophiesIDUnlocked;

    //Check and remove trophy
    for(let i = 0; i < Trophies.length; ++i){
        let BadgesIDNeeded = Trophies[i].BadgesIDNeeded;
        let count = 0;
        for(const badge of Badges){
            if(BadgesIDNeeded.includes(badge.objectId)){
                count += 1;
            }
        }
        if(count != BadgesIDNeeded.length){
            param = {
                "StudentID" : argument.StudentID,
                "RewardID" : TrophiesRewardID[i],
            };
            await Parse.Cloud.run("RemoveTrophy", param);
        }
    }
});

//VerifyHouseTrophyRemoval
//HousetID only, tests if a trophy should be removed upon removing house badge
Parse.Cloud.define("VerifyHouseTrophyRemoval", async(request) =>{
    const argument = request.params;
    
    //Gets the Data of House
    var param = {"HouseID" : argument.HouseID};
    var HouseData = JSON.parse(await Parse.Cloud.run("GetHouseData", param));
    var Badges = HouseData.HouseBadgesEarned;
    var Trophies = HouseData.HouseTrophiesUnlocked;
    var TrophiesRewardID = HouseData.HouseTrophiesIDUnlocked;

    //Check and remove trophy
    for(let i = 0; i < Trophies.length; ++i){
        let BadgesIDNeeded = Trophies[i].BadgesIDNeeded;
        let count = 0;
        for(const badge of Badges){
            if(BadgesIDNeeded.includes(badge.objectId)){
                count += 1;
            }
        }
        if(count != BadgesIDNeeded.length){
            param = {
                "HouseID" : argument.HouseID,
                "RewardID" : TrophiesRewardID[i],
            };
            await Parse.Cloud.run("RemoveHouseTrophy", param);
        }
    }
});

//StudentID
Parse.Cloud.define("VerifyUltimateBadge", async(request) =>{
    const argument = request.params;
    //Gets the Data of student
    var param = {"StudentID" : argument.StudentID};
    var StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
    var TrophiesID = StudentData.TrophiesIDUnlocked;
    const totalTrophies = JSON.parse(await Parse.Cloud.run("GetTrophies"));

    if(totalTrophies.length == TrophiesID.length){
        console.log("THIS STUDENT SHOULD BE REWARDED WILL ULTIMATE BADGE");
    }
});