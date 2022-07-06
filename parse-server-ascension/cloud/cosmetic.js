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

Parse.Cloud.define("GetCosmeticData", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;
    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();
    return JSON.stringify(res);
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

Parse.Cloud.define("DeleteCosmetic", async(request) => {
    const Cosmetic = Parse.Object.extend("Cosmetic");
    const query = new Parse.Query(Cosmetic);
    const argument = request.params;

    query.equalTo("objectId", argument.CosmeticID);
    const res = await query.first();

    res.destroy().then(() => {
        console.log("Successfully Deleted Cosmetic");
    });
});