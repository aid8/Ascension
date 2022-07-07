/*
    Functions that are not yet tested upon creating/updating:
    - DeleteBadge
*/
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
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;

    query.equalTo("objectId", argument.BadgeID);
    const res = await query.first();

    //IF belongs to trophy, remove this one
    var trophies = JSON.parse(await Parse.Cloud.run("GetTrophies"));
    for (const trophy of trophies){
        var BadgesIDNeeded = trophy.BadgesIDNeeded;
        let index = BadgesIDNeeded.indexOf(argument.BadgeID);
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
            }
            //Should not break, badge may belong to more trophies
            //break;
        }
    }

    //If student has a badge in this, remove it
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (const student of students){
        var BadgesIDEarned = student.BadgesIDEarned;
        let index = BadgesIDEarned.indexOf(argument.BadgeID);
        if(index > -1){
            BadgesIDEarned.splice(index, 1);
            let params = {
                "StudentID" : student.objectId,
                "BadgesIDEarned" : BadgesIDEarned,
            };
            await Parse.Cloud.run("EditStudent", params);
            //Should not break, badge may be acquired by more students
            //break;
        }
    }

    res.destroy().then(() => {
        console.log("Successfully Deleted Badge");
    });
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
