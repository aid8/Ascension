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

Parse.Cloud.define("GetTrophyData", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();
    return JSON.stringify(res);
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

    res.destroy().then(() => {
        console.log("Successfully Deleted Trophy");
    });
});