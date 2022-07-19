Parse.Cloud.define("AddCosmetic", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const cosmetic = new Cosmetic();
    const argument = request.params;

    var convertedImage = {base64: argument.CosmeticImage};
    var parseFile = new Parse.File(argument.CosmeticImageName, convertedImage);

    parseFile.save({ useMasterKey: true}).then(function(result){
        var link = result.url();
        cosmetic.save({
            "CosmeticName" : argument.CosmeticName,
            "CosmeticType" : argument.CosmeticType,
            "CosmeticImage" : link,
        }, { useMasterKey: true}).then(()=>{
            console.log("Successfully added " + argument.CosmeticType);
        });
    });
});

//Must specify id of cosmetic with name of "CosmeticID"
Parse.Cloud.define("EditCosmetic", async(request) => {
    const argument = request.params
    const dataParams = {
        "CosmeticID": argument.CosmeticID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetCosmeticData", dataParams)

    var list_of_attr = ["CosmeticType", "CosmeticName",
    ];
    
    var list_of_arguments =[argument.CosmeticType, argument.CosmeticName,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }
    if(argument.CosmeticImage != null && argument.CosmeticImageName != null){
        //Delete old image
        var imageToDelete = res.get("CosmeticImage").replace('/myAppId','');
        var param = {"url" : imageToDelete};
        await Parse.Cloud.run("DeleteFile", param);

        var convertedImage = {base64: argument.CosmeticImage};
        var parseFile = new Parse.File(argument.CosmeticImageName, convertedImage);

        parseFile.save({ useMasterKey: true }).then(function(result) {
            var link = result.url();
            res.set("CosmeticImage", link);
            res.save().then(()=>{
                console.log("Successfully Edited Cosmetic");
            });
        });
    }
    else{
        res.save().then(()=>{
            console.log("Successfully Edited Cosmetic");
        });
    }
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

    const dataParams = {
        "CosmeticID": argument.CosmeticID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetCosmeticData", dataParams)

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

    //Delete image
    var imageToDelete = res.get("CosmeticImage").replace('/myAppId','');
    var param = {"url" : imageToDelete};
    await Parse.Cloud.run("DeleteFile", param);

    res.destroy().then(() => {
        console.log("Successfully Deleted Cosmetic");
    });
});

//Must specify id of cosmetic with name of "CosmeticID";  Specify Type to 1 only if you need the query's result (object)
//Returns the data of a course or the query's result based on the value of Type
Parse.Cloud.define("GetCosmeticData", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;
    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    
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
    else if(argument.CosmeticType == "Banner"){
        param["DefaultBannerID"] = argument.CosmeticID;
    }

    await Parse.Cloud.run("EditGlobal", param);
    console.log("Successfully Changed Default Cosmetic!");
});