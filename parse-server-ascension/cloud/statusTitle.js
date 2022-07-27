//TO DO:
//Must add logic to avoid having titles with the same (year) level
//Test AssignStatusTitle()

Parse.Cloud.define("AddStatusTitle", async(request) => {
    const argument = request.params;
    const StatusTitle = Parse.Object.extend("StatusTitle");
    const statusTitle = new StatusTitle();

    var convertedImage = {base64: argument.StatusTitleImage};
    var parseFile = new Parse.File(argument.StatusTitleImageName, convertedImage);

    parseFile.save({ useMasterKey: true }).then(function(result) {
        var link = result.url();
        statusTitle.save({
            "StatusTitleName" : argument.StatusTitleName,
            "StatusTitleLevel" : argument.StatusTitleLevel,
            "StatusTitleImage" : link,
        }, { useMasterKey: true }).then(()=>{
            console.log("Successfully added Status Title!");
        });
    });
});

Parse.Cloud.define("EditStatusTitle", async(request) =>{
    const argument = request.params
    const dataParams = {
        "StatusTitleID": argument.StatusTitleID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetStatusTitleData", dataParams)

    res.set("StatusTitleName", argument.StatusTitleName)
    res.set("StatusTitleLevel", argument.StatusTitleLevel);

    if(argument.StatusTitleImage != null && argument.StatusTitleImageName != null){
        //Delete old image
        var imageToDelete = res.get("StatusTitleImage").replace('/myAppId','');
        var param = {"url" : imageToDelete};
        await Parse.Cloud.run("DeleteFile", param);

        var convertedImage = {base64: argument.StatusTitleImage};
        var parseFile = new Parse.File(argument.StatusTitleImageName, convertedImage);

        parseFile.save({ useMasterKey: true }).then(function(result) {
            var link = result.url();
            res.set("StatusTitleImage", link);
            res.save().then(()=>{
                console.log("Successfully Edited Badge");
            });
        });
    }
    else{
        res.save().then(()=>{
            console.log("Successfully Edited Badge");
        });
    }
});

//Must specify id of announcement with name of "StatusTitleID"
Parse.Cloud.define("DeleteStatusTitle", async(request) =>{
    const argument = request.params
    const dataParams = {
        "StatusTitleID": argument.StatusTitleID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetStatusTitleData", dataParams);
    
    //checks if a student has this
    const students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for(const student of students){
        if(student.StatusTitleIDPointer === argument.StatusTitleID){
            return Promise.reject("Cannot Delete Status Title! A Student has this equipped.");
        }
    }
    res.destroy().then(()=>{
        console.log("Successfully Deleted Status Title!");
    });
});

//Must specify id of status title with name of "StatusTitleID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of an status title or the query's result based on the value of Type
Parse.Cloud.define("GetStatusTitleData", async(request) => {
    const StatusTitle = Parse.Object.extend("StatusTitle");
    const query = new Parse.Query(StatusTitle)
    const argument = request.params;
    query.equalTo("objectId", argument.StatusTitleID);
    const res = await query.first();
    if(argument.Type == 1){
        return res;
    }
    return JSON.stringify(res);
});

//Returns all status titles
Parse.Cloud.define("GetStatusTitles", async(request) =>{
    const StatusTitle = Parse.Object.extend("StatusTitle");
    const query = new Parse.Query(StatusTitle);
    const res = await query.find();
    return JSON.stringify(res);
});

//StudentID must be passed
Parse.Cloud.define("AssignStatusTitle", async(request) =>{
    const argument = request.params;
    var params = {
        "StudentID": argument.StudentID,
        "Type" : 1,
    }
    const student = await Parse.Cloud.run("GetStudentData", params);

    const statusTitles = await Parse.Cloud.run("GetStatusTitles", params);

    for(const title of statusTitles){
        if(title.StatusTitleLevel == student.YearLevel){
            return title.objectId;
        }
    }
    
})