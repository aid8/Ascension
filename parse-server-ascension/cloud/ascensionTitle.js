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