Parse.Cloud.define("AddAscensionTitle", async(request) => {
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const ascensionTitle = new AscensionTitle();
    const argument = request.params;

    ascensionTitle.save({
        "AscensionName": argument.AscensionName,
        "AscensionXpRangeCap": argument.AscensionXpRangeCap
    }).then(()=>{
        console.log("Successfully added AscensionTitle!");
    });
});

Parse.Cloud.define("DeleteAscensionTitle", async(request) =>{
    const AscensionTitle = Parse.Object.extend("AscensionTitle")
    const qry = new Parse.Query(AscensionTitle)
    const result = await qry.get(request.params.AscensionId)
    result.destroy()
});

Parse.Cloud.define("UpdateAscensionTitle", async(request) =>{
    const AscensionTitle = Parse.Object.extend("AscensionTitle")
    const qry = new Parse.Query(AscensionTitle)
    const argument = request.params
    const result = await qry.get(argument.AscensionId)
    result.save({
        "AscensionName": argument.NewAscensionName,
        "AscensionXpRangeCap": argument.NewAscensionXpRangeCap
    }).then(()=>console.log("Ascension Title Updated"))
    

})

Parse.Cloud.define("GetAscensionTitles", async(request) =>{
    const AscensionTitle = Parse.Object.extend("AscensionTitle");
    const query = new Parse.Query(AscensionTitle);
    const res = await query.find();
    return JSON.stringify(res);
});