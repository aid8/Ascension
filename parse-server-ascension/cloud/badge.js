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

Parse.Cloud.define("GetBadgeData", async(request) => {
    const Badge = Parse.Object.extend("Badge");
    const query = new Parse.Query(Badge);
    const argument = request.params;
    query.equalTo("objectId", argument.BadgeID);
    const res = await query.first();
    return JSON.stringify(res);
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

    res.destroy().then(() => {
        console.log("Successfully Deleted Badge");
    });
});