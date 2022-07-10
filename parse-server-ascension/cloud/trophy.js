/*
    Functions that are not yet tested upon creating/updating:
    - DeleteTrophy
    Functions that are incomplete:
    - VerifyUltimateBadge
*/
var Global = require('./global');

Parse.Cloud.define("AddTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const trophy = new Trophy();
    const argument = request.params;

    trophy.save({
        "TrophyName" : argument.TrophyName,
        "TrophyDescription" : argument.TrophyDescription,
        "TrophyPoints" : argument.TrophyPoints,
        "TrophyImage" : argument.TrophyImage,
        "TrophyCategory" : argument.TrophyCategory,
        "BadgesIDNeeded" : argument.BadgesIDNeeded,
    }).then(()=>{
        console.log("Successfully added Trophy!");
    });
});

//Must specify id of Trophy with name of "TrophyID"
Parse.Cloud.define("EditTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;

    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();

    var list_of_attr = ["TrophyName", "TrophyDescription", "TrophyPoints", 
                        "TrophyImage", "TrophyCategory", "BadgesIDNeeded",
    ];
    
    var list_of_arguments =[argument.TrophyName, argument.TrophyDescription, argument.TrophyPoints, 
                            argument.TrophyImage, argument.TrophyCategory, argument.BadgesIDNeeded
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Trophy");
    });
});

Parse.Cloud.define("DeleteTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;

    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();

    //If a student has a trophy in this, reject
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (const student of students){
        var TrophiesRewardIDUnlocked = student.TrophiesIDUnlocked;
        var TrophiesIDUnlocked = [];
        for(const RewardID of TrophiesRewardIDUnlocked){
            var param = {"RewardID" : RewardID};
            let rewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", param));
            TrophiesIDUnlocked.push(rewardData.objectId);
        }
        let index = TrophiesIDUnlocked.indexOf(argument.TrophyID);
        if(index > -1){
            return Promise.reject("Cannot Delete Trophy! One or more students have acquired this Trophy.");
        }
    }

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
    return JSON.stringify(res);
});

Parse.Cloud.define("GetTrophies", async(_request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const res = await query.find();
    return JSON.stringify(res);
});

//StudentID
Parse.Cloud.define("GetUnacquiredTrophies", async(request) => {
    //Get Trophies
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
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

//TrophyID, StudentID
Parse.Cloud.define("RewardTrophy", async(request) => {
    const argument = request.params;

    //Query trophy muna, importante si XP
    const Trophy = Parse.Object.extend("Trophy");
    const trophyQuery = new Parse.Query(Trophy); 
    trophyQuery.equalTo("objectId", argument.TrophyID);
    const res = await trophyQuery.first();
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

//RewardID, StudentID, required
Parse.Cloud.define("RemoveTrophy", async(request) =>{
    const Student = Parse.Object.extend("Student")
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //UpdateStudent
    let rewards = res.get("TrophiesIDUnlocked");
    const index = rewards.indexOf(argument.RewardID);
    if(index > -1){
        rewards.splice(index, 1);
    }
    res.set("TrophiesIDUnlocked", rewards);

    //Check if trophy is in ChosenTrophies

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