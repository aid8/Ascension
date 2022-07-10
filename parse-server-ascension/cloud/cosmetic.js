Parse.Cloud.define("AddCosmetic", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const cosmetic = new Cosmetic();
    const argument = request.params;

    cosmetic.save({
        "CosmeticType" : argument.CosmeticType,
        "CosmeticName" : argument.CosmeticName,
        "CosmeticImage" : argument.CosmeticImage,
    }).then(()=>{
        console.log("Successfully added Cosmetic!");
    });
});

//Must specify id of cosmetic with name of "CosmeticID"
Parse.Cloud.define("EditCosmetic", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;

    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();

    var list_of_attr = ["CosmeticType", "CosmeticName", "CosmeticImage",
    ];
    
    var list_of_arguments =[argument.CosmeticType, argument.CosmeticName, argument.CosmeticImage,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Cosmetic");
    });
});

//Must specify id of cosmetic with name of "CosmeticID"
Parse.Cloud.define("DeleteCosmetic", async(request) => {
    const argument = request.params;
    const Global = JSON.parse(await Parse.Cloud.run("GetGlobal"));
    var DefaultCosmeticsData = {
        "Avatar" : Global.DefaultAvatarID,
        "Frame" : Global.DefaultFrameID,
        "CoverPhoto" : Global.DefaultCoverPhotoID,
    };

    //Do not delete if this is default cosmetic
    if(argument.CosmeticID === Global.DefaultAvatarID || 
        argument.CosmeticID === Global.DefaultCoverPhotoID || 
        argument.CosmeticID === Global.DefaultFrameID || 
        argument.CosmeticID === Global.DefaultBannerID){
        return Promise.reject("Cannot Delete Default Cosmetic!");
    }

    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();

    //Remove this cosmetic if is unlocked by student
    //If this cosmetic is equipped, change it to the defaultID
    //Ignore if it is a banner
    var CosmeticType = res.get("CosmeticType");
    var CosmeticNames = {
        "Avatar" : "AvatarsIDUnlocked",
        "Frame" : "FrameIDUnlocked",
        "CoverPhoto" : "CoverPhotoIDUnlocked",
    };
    var CosmeticName = CosmeticNames[CosmeticType];

    if(CosmeticType != "Banner"){
        var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
        for (const student of students){
            var CosmeticIDEarned = student[CosmeticName];
            var EquippedCosmetics = student.EquippedCosmetics;
            let index = CosmeticIDEarned.indexOf(argument.CosmeticID);
            let edited = false;
            let params = {"StudentID" : student.objectId};
            if(index > -1){
                CosmeticIDEarned.splice(index, 1);
                params[CosmeticName] = CosmeticIDEarned;
                edited = true;
            }
            index = EquippedCosmetics.indexOf(argument.CosmeticID);
            if(index > -1){
                EquippedCosmetics[index] = DefaultCosmeticsData[CosmeticType];
                params["EquippedCosmetics"] = EquippedCosmetics;
                edited = true;
            }
            if(edited){
                await Parse.Cloud.run("EditStudent", params);
            }
        }
    }

    res.destroy().then(() => {
        console.log("Successfully Deleted Cosmetic");
    });
});

//Must specify id of cosmetic with name of "CosmeticID"
Parse.Cloud.define("GetCosmeticData", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;
    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();
    return JSON.stringify(res);
});

//If CosmeticType is not specified, return all cosmetics
Parse.Cloud.define("GetCosmetics", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;
    if(argument.CosmeticType != null){
        query.equalTo("CosmeticType", argument.CosmeticType);
    }
    const res = await query.find();
    return JSON.stringify(res);
});

Parse.Cloud.define("SetDefaultCosmetic", async(request) => {
    const argument = request.params;
    var param = {};
    
    if(argument.CosmeticType == "Avatar"){
        param["DefaultAvatarID"] = argument.CosmeticID;
    }
    else if(argument.CosmeticType == "Frame"){
        param["DefaultFrameID"] = argument.CosmeticID;
    }
    else if(argument.CosmeticType == "CoverPhoto"){
        param["DefaultCoverPhotoID"] = argument.CosmeticID;
    }

    await Parse.Cloud.run("EditGlobal", param);
    console.log("Successfully Changed Default Cosmetic!");
});