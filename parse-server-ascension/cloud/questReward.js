Parse.Cloud.define("AddQuestReward", async(request) => {
    const QuestReward = Parse.Object.extend("QuestReward");
    const questReward = new QuestReward();
    const argument = request.params;

    questReward.save({
        "RewardCosmeticID": argument.RewardCosmeticID,
        "RewardCosmeticType": argument.RewardCosmeticType,
        "RequiredAscensionPoints": argument.RequiredAscensionPoints,
    }).then(()=>{
        console.log("Successfully added Quest Reward!");
    });
});

Parse.Cloud.define("EditQuestReward", async(request) =>{
    const argument = request.params
    const dataParams = {
        "QuestRewardID": argument.QuestRewardID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetQuestRewardData", dataParams);
    
    var list_of_attr = ["RewardCosmeticID", "RewardCosmeticType", "RequiredAscensionPoints",];
    var list_of_arguments = [argument.RewardCosmeticID, argument.RewardCosmeticType, argument.RequiredAscensionPoints,];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Quest Reward!");
    });
});

Parse.Cloud.define("DeleteQuestReward", async(request) =>{
    const argument = request.params;
    const dataParams = {
        "QuestRewardID": argument.QuestRewardID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetQuestRewardData", dataParams);
    res.destroy()
});

//If SortType is defined, this is sorted by that
Parse.Cloud.define("GetQuestRewards", async(request) =>{
    const argument = request.params
    const QuestReward = Parse.Object.extend("QuestReward");
    const query = new Parse.Query(QuestReward);
    if(argument.SortType === "Ascending"){
        query.ascending("RequiredAscensionPoints");
    }
    else if(argument.SortType === "Descending"){
        query.descending("RequiredAscensionPoints");
    }
    const res = await query.find();
    return JSON.stringify(res);
});

//Must specify id of QuestReward with name of "QuestRewardID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of QuestReward or the query's result based on the value of Type
Parse.Cloud.define("GetQuestRewardData", async(request) => {
    const QuestReward = Parse.Object.extend("QuestReward");
    const query = new Parse.Query(QuestReward);
    const argument = request.params;
    query.equalTo("objectId", argument.QuestRewardID);
    var res = await query.first();
    if(argument.Type == 1){
        return res
    }
    
    //Also return reward data.
    var param = {"CosmeticID" : res.get("RewardCosmeticID")};
    res.set("RewardCosmeticData", JSON.parse(await Parse.Cloud.run("GetCosmeticData", param)));

    return JSON.stringify(res);
});