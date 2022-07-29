var Global = require('./global');

Parse.Cloud.define("AddQuest", async(request) => {
    const Quest = Parse.Object.extend("Quest");
    const quest = new Quest();
    const argument = request.params

    quest.save({
        "QuestName" : argument.QuestName,
        "QuestType" : argument.QuestType,
        "QuestDescription" : argument.QuestDescription,
        "QuestPoints" : argument.QuestPoints,
    }).then(()=>{
        console.log("Successfully added Quest!");
    });
});

Parse.Cloud.define("EditQuest", async(request) =>{
    const argument = request.params
    const dataParams = {
        "QuestID": argument.QuestID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetQuestData", dataParams)
    
    var list_of_attr = ["QuestName", "QuestType", "QuestDescription", "QuestPoints",];
    var list_of_arguments = [argument.QuestName, argument.QuestType, argument.QuestDescription, argument.QuestPoints];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }
    res.save().then(()=>{
        console.log("Successfully Edited Quest!");
    });
});

//Must specify id of quest with name of "QuestID"
Parse.Cloud.define("DeleteQuest", async(request) =>{
    const argument = request.params
    const dataParams = {
        "QuestID": argument.QuestID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetQuestData", dataParams)
    res.destroy().then(()=>{
        console.log("Successfully Deleted Quest!");
    });
});

//Must specify id of Quest with name of "QuestID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of an Quest or the query's result based on the value of Type
Parse.Cloud.define("GetQuestData", async(request) => {
    const Quest = Parse.Object.extend("Quest");
    const query = new Parse.Query(Quest)
    const argument = request.params;
    query.equalTo("objectId", argument.QuestID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    return JSON.stringify(res);
});

//Returns all quests
Parse.Cloud.define("GetQuests", async(_request) =>{
    const Quest = Parse.Object.extend("Quest");
    const query = new Parse.Query(Quest);
    const res = await query.find();
    return JSON.stringify(res);
});

//Returns random set of quests based on Type and Number of quests
Parse.Cloud.define("GetRandomQuests", async(request) =>{
    const Quest = Parse.Object.extend("Quest");
    const query = new Parse.Query(Quest);
    const argument = request.params;
    query.equalTo("QuestType", argument.QuestType);
    const res = await query.find();

    var questsCopy = [];
    var randomQuests = [];
    
    for (const quest of res){
        questsCopy.push(quest.id);
    }

    if(argument.NumOfQuests > res.length){
        return Promise.reject("Number of Quests given exceeds quests storage with type of " + argument.QuestType);
    }

    for(let i = 0; i < argument.NumOfQuests; ++i){
        let idx = Global.getRndInteger(0, questsCopy.length);
        randomQuests.push({"QuestID" : questsCopy[idx], "QuestStatus" : "Incomplete"});
        questsCopy.splice(idx, 1);
    }
        
    return JSON.stringify(randomQuests);
});