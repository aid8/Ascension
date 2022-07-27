//Checks if the UserIDPointer is not a student before writing to the database
Parse.Cloud.beforeSave("Announcement", (request) => {
    const params = {
        "StudentID": request.object.get("UserIDPointer"),
        "Type" : 1
    }
    const res1 = Parse.Cloud.run("GetStudentData", params)
    if(res1 != null){
        throw "User cannot be a student!"
    }
});

//Must specify id of user (sender) and house (receiver)
//Students under the said house will receive announcements
//If HouseIDPointer is null, then announcement is for everyone
Parse.Cloud.define("AddAnnouncement", async(request) => {
    const argument = request.params
    const Announcement = Parse.Object.extend("Announcement");
    const announcement = new Announcement();
    announcement.save({
        "AnnouncementText" : request.params.AnnouncementText,
        "UserIDPointer" : request.params.UserID,
        "HouseIDPointer" : request.params.HouseID
    }).then(()=>{
        console.log("Successfully added Announcement!");
    });
});

Parse.Cloud.define("EditAnnouncement", async(request) =>{
    const argument = request.params
    const dataParams = {
        "AnnouncementID": argument.AnnouncementID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetAnnouncementData", dataParams)
    
    var list_of_attr = ["AnnouncementText", "UserIDPointer", "HouseIDPointer",];
    var list_of_arguments = [argument.AnnouncementText, argument.UserID, argument.HouseID];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }
    res.save().then(()=>{
        console.log("Successfully Edited Announcement!");
    });
});

//Must specify id of announcement with name of "AnnouncementID"
Parse.Cloud.define("DeleteAnnouncement", async(request) =>{
    const argument = request.params
    const dataParams = {
        "AnnouncementID": argument.AnnouncementID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetAnnouncementData", dataParams)
    res.destroy().then(()=>{
        console.log("Successfully Deleted Announcement!");
    });
});

//Must specify id of announcement with name of "AnnouncementID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of an announcement or the query's result based on the value of Type
Parse.Cloud.define("GetAnnouncementData", async(request) => {
    const Announcement = Parse.Object.extend("Announcement");
    const query = new Parse.Query(Announcement)
    const argument = request.params;
    query.equalTo("objectId", argument.AnnouncementID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }
    return JSON.stringify(res);
});

//Returns all announcements
Parse.Cloud.define("GetAnnouncements", async(request) =>{
    const Announcement = Parse.Object.extend("Announcement");
    const query = new Parse.Query(Degree);
    const res = await query.find();
    return JSON.stringify(res);
});