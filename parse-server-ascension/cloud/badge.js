/*
    Functions that are not yet tested upon creating/updating:
    - DeleteBadge
*/
var Global = require('./global');

Parse.Cloud.define("AddBadge", async(request) => {
    const Badge = Parse.Object.extend("Badge");
    const badge = new Badge();
    const argument = request.params;

    badge.save({
        "BadgeName" : argument.BadgeName,
        "BadgeDescription" : argument.BadgeDescription,
        "BadgePoints" : argument.BadgePoints,
        "BadgeImage" : argument.BadgeImage,
    }).then(()=>{
        console.log("Successfully added Badge!");
    });
});

//Must specify id of badge with name of "BadgeID"
Parse.Cloud.define("EditBadge", async(request) => {
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;

    query.equalTo("objectId", argument.BadgeID);
    const res = await query.first();

    var list_of_attr = ["BadgeName", "BadgeDescription", "BadgePoints", 
                        "BadgeImage",
    ];
    
    var list_of_arguments =[argument.BadgeName, argument.BadgeDescription, argument.BadgePoints, 
                            argument.BadgeImage, 
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Badge");
    });
});

Parse.Cloud.define("DeleteBadge", async(request) => {
    var canBeDeleted = true;
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;
    
    query.equalTo("objectId", argument.BadgeID);
    const res = await query.first();
    
    //If a student has this, return error
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (let i = 0; i < students.length; i++){
        var BadgesRewardIDEarned = students[i].BadgesIDEarned;
        var BadgesIDEarned = [];
        for(const RewardID of BadgesRewardIDEarned){
            var param = {"RewardID" : RewardID};
            let rewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", param));
            BadgesIDEarned.push(rewardData.RewardID);
        }
        let index = BadgesIDEarned.indexOf(argument.BadgeID);
        if(index > -1){
            //return Promise.reject("Cannot Delete Badge! One or more students have acquired this badge.");
            canBeDeleted = false
        }
    }
    console.log("VALUE---------------------" + canBeDeleted)
    //If belongs to trophy, remove this one
    var trophies = JSON.parse(await Parse.Cloud.run("GetTrophies"));
    var trophiesEdited = false;
    for (const trophy of trophies){
        var BadgesIDNeeded = trophy.BadgesIDNeeded;
        let index = BadgesIDNeeded.indexOf(argument.BadgeID);
        console.log(index)
        if(index > -1){
            //If the badgesIDNeeded size is 1 and its found in this
            //Means its gonna be empty, just delete the trophy
            let params = {"TrophyID" : trophy.objectId};
            if(BadgesIDNeeded.length <= 1){
                await Parse.Cloud.run("DeleteTrophy", params);
            }
            else{
                //splice this then save
                BadgesIDNeeded.splice(index, 1);
                params["BadgesIDNeeded"] = BadgesIDNeeded;
                await Parse.Cloud.run("EditTrophy", params);
                trophiesEdited = true;
            }
        }
        
        
    }
    
    

    // //If a trophy has been edited, run verify eligiblity
    // if(trophiesEdited){
    //     await Parse.Cloud.run("VerifyTrophyEligibility", argument);
    // }
    if(canBeDeleted){
        res.destroy().then(console.log("Badge has been deleted!"))
    }
    return canBeDeleted
    // res.destroy().then(() => {
    //     console.log("Successfully Deleted Badge");
    // });
});

Parse.Cloud.define("GetBadgeData", async(request) => {
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;
    query.equalTo("objectId", argument.BadgeID);
    const res = await query.first();
    return JSON.stringify(res);
});

Parse.Cloud.define("GetBadges", async(_request) => {
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const res = await query.find();
    return JSON.stringify(res);
});

//StudentID
Parse.Cloud.define("GetUnacquiredBadges", async(request) => {
    //Get Badges
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;
    const res = await query.find();

    //Gets the Student
    const Student = Parse.Object.extend("Student");
    const query1 = new Parse.Query(Student);
    query1.equalTo("objectId", argument.StudentID);
    const res1 = await query1.first();
    const studentBadges = res1.get("BadgesIDEarned");
    var acquiredBadges = {};
    
    for(const RewardID of studentBadges){
        var params = {"RewardID" : RewardID};
        let RewardData = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
        acquiredBadges[RewardData.RewardID] = true;
    }
    
    var unacquiredBadges = [];
    for(const badge of res){
        if(!(badge.id in acquiredBadges)){
            unacquiredBadges.push(badge);
        }
    }
    return JSON.stringify(unacquiredBadges);
});

//BadgeID, StudentID needed
Parse.Cloud.define("RewardBadge", async(request) => {
    const argument = request.params;

    //Query badge muna, importante si XP
    const Badge = Parse.Object.extend("Badge");
    const badgeQuery = new Parse.Query(Badge); 
    badgeQuery.equalTo("objectId", argument.BadgeID);
    const res = await badgeQuery.first();
    var badgeXP = res.get("BadgePoints");

    //Query student sunod, tas kunon si badgesIDEarned
    const Student = Parse.Object.extend("Student");
    const studentQuery = new Parse.Query(Student);
    studentQuery.equalTo("objectId", argument.StudentID);
    const res1 = await studentQuery.first();
    var badgesIDEarned = res1.get("BadgesIDEarned");
    var studentXP = res1.get("XP");

    //Gibo ning reward object, set si badgeID as rewardID
    const Reward = Parse.Object.extend("Reward");
    const reward = new Reward();
    reward.save({
        "RewardID" : argument.BadgeID,
        "RewardType" : "Badge",
        "DateRewarded" : Global.getDateToday(),
    }).then(async(obj)=>{
        badgesIDEarned.push(obj.id);
        studentXP += badgeXP;
        res1.set("BadgesIDEarned", badgesIDEarned);
        res1.set("XP", studentXP);
        res1.save();

        //Then run trophy eligibility
        var param = {"StudentID" : argument.StudentID};
        await Parse.Cloud.run("VerifyTrophyEligibility", param);
    });
});

//GetRewardData(Since reward id ang nasa badgesIDEarned kang student, gibo pa kita kani, garo man lang reward to badge/trophy converter)
//RewardID
//automatically gives details about the trophy/badge stored in "RewardData"
Parse.Cloud.define("GetRewardData", async(request) => {
    const Reward = Parse.Object.extend("Reward");
    const query = new Parse.Query(Reward);
    const argument = request.params;
    query.equalTo("objectId", argument.RewardID);
    const res = await query.first();

    var RewardType = res.get("RewardType");
    var params;
    var RewardData;
    if(RewardType == "Badge"){
        params = {"BadgeID" : res.get("RewardID")};
        RewardData = JSON.parse(await Parse.Cloud.run("GetBadgeData", params));
    }
    else if(RewardType == "Trophy"){
        params = {"TrophyID" : res.get("RewardID")};
        RewardData = JSON.parse(await Parse.Cloud.run("GetTrophyData", params));
    }
    res.set("RewardData", RewardData);
    return JSON.stringify(res);
});

//RewardID, StudentID, required
Parse.Cloud.define("RemoveBadge", async(request) =>{
    const Student = Parse.Object.extend("Student")
    const query = new Parse.Query(Student);
    const argument = request.params;
    query.equalTo("objectId", argument.StudentID);
    const res = await query.first();

    //UpdateStudent
    let rewards = res.get("BadgesIDEarned");
    const index = rewards.indexOf(argument.RewardID);
    if(index > -1){
        rewards.splice(index, 1);
    }
    res.set("BadgesIDEarned", rewards);
    res.save().then(async()=>{
        //Then Run VerifyRemoval
        await Parse.Cloud.run("VerifyTrophyRemoval", argument);
    });

    //Remove Reward Object
    const Reward = Parse.Object.extend("Reward");
    const query1 = new Parse.Query(Reward);
    query1.equalTo("objectId", argument.RewardID);
    const res1 = await query1.first();
    res1.destroy();
});