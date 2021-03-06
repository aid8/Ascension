Parse.Cloud.define("AddAscensionTitle", async(request) => {
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const ascensionTitle = new AscensionTitle();
    const argument = request.params;

    ascensionTitle.save({
        "AscensionName": argument.AscensionName,
        "AscensionXpRangeCap": argument.AscensionXpRangeCap,
        "AscensionXpRangeStart": argument.AscensionXpRangeStart
    }).then(()=>{
        console.log("Successfully added AscensionTitle!");
    });
});

Parse.Cloud.define("EditAscensionTitle", async(request) =>{
    const argument = request.params
    const dataParams = {
        "AscensionId": argument.AscensionId,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetAscensionTitleData", dataParams);
    
    var list_of_attr = ["AscensionName", "AscensionXpRangeCap", "AscensionXpRangeStart",];
    var list_of_arguments = [argument.AscensionName, argument.AscensionXpRangeCap, argument.AscensionXpRangeStart,];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited AscensionTitle!");
    });
});

Parse.Cloud.define("DeleteAscensionTitle", async(request) =>{
    const argument = request.params
    const dataParams = {
        "AscensionId": argument.AscensionId,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetAscensionTitleData", dataParams)
    res.destroy()
});

Parse.Cloud.define("UpdateAscensionTitle", async(request) =>{
    const argument = request.params
    const dataParams = {
        "AscensionId": argument.AscensionId,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetAscensionTitleData", dataParams)
    res.save({
        "AscensionName": argument.NewAscensionName,
        "AscensionXpRangeCap": argument.NewAscensionXpRangeCap,
        "AscensionXpRangeStart": argument.NewAscensionXpRangeStart,
    }).then(()=>console.log("Ascension Title Updated"))
})

Parse.Cloud.define("GetAscensionTitles", async(_request) =>{
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const query = new Parse.Query(AscensionTitle);
    const res = await query.find();
    return JSON.stringify(res);
});

//Must specify id of Ascension Title with name of "AscensionId"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of an ascension title or the query's result based on the value of Type
Parse.Cloud.define("GetAscensionTitleData", async(request) => {
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const query = new Parse.Query(AscensionTitle);
    const argument = request.params;
    query.equalTo("objectId", argument.AscensionId);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    return JSON.stringify(res);
});

Parse.Cloud.define("SearchAscensionTitleFromXp", async(request) =>{
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const query = new Parse.Query(AscensionTitle);
    const argument = request.params;
    query.greaterThanOrEqualTo('AscensionXpRangeCap', argument.XpInput);
    query.lessThanOrEqualTo('AscensionXpRangeStart', argument.XpInput);
    const res = await query.first()
    return JSON.stringify(res)
})