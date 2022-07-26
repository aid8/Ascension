var Global = require('./global');

Parse.Cloud.define("AddRequest", async(request) => {
    const Request = Parse.Object.extend("Request");
    const requestobj = new Request();
    const argument = request.params;

    var convertedFile = {base64: argument.ProofFile};
    var parseFile = new Parse.File(argument.ProofName, convertedFile);

    parseFile.save({ useMasterKey: true }).then(function(result) {
        var link = result.url();
        requestobj.save({
            "ProofFile" : link,
            "StudentIDPointer" : argument.StudentIDPointer,
            "DateRequested" : Global.getDateToday(),
            "ToRequestIDPointer": argument.ToRequestID,
            "ToRequestType" : argument.ToRequestType,
        }, { useMasterKey: true }).then(async (res) =>{
            var params = {};
            var torequest;
            if(argument.ToRequestType === "Teacher"){
                params["TeacherID"] = argument.ToRequestID;
                torequest = JSON.parse(await Parse.Cloud.run("GetTeacherData", params));
                torequest.PendingApprovalRewarding.push(res.id);
                params["PendingApprovalRewarding"] = torequest.PendingApprovalRewarding;
                await Parse.Cloud.run("EditTeacher", params);
            }
            else if(argument.ToRequestType === "NT_Distributor"){
                params["NT_DistributorID"] = argument.ToRequestID;
                torequest = JSON.parse(await Parse.Cloud.run("GetNT_DistributorData", params));
                torequest.PendingApprovalRewarding.push(res.id);
                params["PendingApprovalRewarding"] = torequest.PendingApprovalRewarding;
                await Parse.Cloud.run("EditNT_Distributor", params);
            }
            console.log("Successfully added Request!");
        });
    });
});

Parse.Cloud.afterSave("Request", async(request)=>{
    const req = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        return req.save({
            "RequestStatus" : "Pending",
            "RequestFeedback" : "",
        });
    }
});

//Must specify id of request with name of "ToRequestID" then the attribute name along with the new value
Parse.Cloud.define("EditRequest", async(request) =>{
    const argument = request.params
    const dataParams = {
        "RequestID": argument.RequestID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetRequestData", dataParams)
    
    var list_of_attr = ["Proof", "StudentIDPointer", "DateRequested", "ToRequestIDPointer", 
                        "ToRequestType", "RequestStatus", "RequestFeedback",
    ];
    var list_of_arguments = [argument.Proof, argument.StudentIDPointer, argument.DateRequested, argument.ToRequestIDPointer,
                             argument.ToRequestType, argument.RequestStatus, argument.RequestFeedback,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Request");
    });
});

//Must specify id of request with name of "RequestID"
Parse.Cloud.define("DeleteRequest", async(request) =>{
    const argument = request.params
    const dataParams = {
        "RequestID": argument.RequestID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetRequestData", dataParams)

    //Remove this in pending of teacher
    var teachers = JSON.parse(await Parse.Cloud.run("GetTeachers"));
    for(const teacher of teachers){
        let pendings = teacher.PendingApprovalRewarding;
        let index = pendings.indexOf(argument.RequestID);
        if(index > -1){
            pendings.splice(index, 1);
            let params = {"TeacherID" : teacher.objectId, "PendingApprovalRewarding" : pendings};
            await Parse.Cloud.run("EditTeacher", params);
            break;
        }
    }

    //remove this in pending of nt_distributor
    var nt_distributors = JSON.parse(await Parse.Cloud.run("GetNT_Distributors"));
    for(const nt_distributor of nt_distributors){
        let pendings = nt_distributor.PendingApprovalRewarding;
        let index = pendings.indexOf(argument.RequestID);
        if(index > -1){
            pendings.splice(index, 1);
            let params = {"NT_DistributorID" : nt_distributor.objectId, "PendingApprovalRewarding" : pendings};
            await Parse.Cloud.run("EditNT_Distributor", params);
            break;
        }
    }

    res.destroy().then(()=>{
        console.log("Successfully Deleted Request");
    });
});

//Provide RequestID, BadgeID, and RequestStatus (Approved or Declined) and RequestFeeback if declined
Parse.Cloud.define("SetRequest", async(request) =>{
    const argument = request.params
    const dataParams = {
        "RequestID": argument.RequestID,
        "Type": 1,
    }
    const res = await Parse.Cloud.run("GetRequestData", dataParams)

    var params = {};
    if(argument.RequestStatus === "Approved"){
        params = {
            "BadgeID" : argument.BadgeID,
            "StudentID" : res.get("StudentIDPointer"),
        };
        await Parse.Cloud.run("RewardBadge", params);
    }
    
    params = {
        "RequestID" : argument.RequestID,
        "RequestStatus" : argument.RequestStatus,
    };
    if(argument.RequestStatus === "Approved"){
        params["RequestFeedback"] = argument.BadgeID;
    }
    else if(argument.RequestStatus === "Declined"){
        params["RequestFeedback"] = argument.RequestFeeback;
    }
    await Parse.Cloud.run("EditRequest", params);
});

//Must specify id of request with name of "RequestID"; Specify Type to 1 only if you need the query's result (object)
//Returns the data of a request or the query's result based on the value of Type
//Added more options (DataOfRequestor: boolean, DataOfGrantor: boolean)
Parse.Cloud.define("GetRequestData", async(request) => {
    const Request = Parse.Object.extend("Request");
    const query = new Parse.Query(Request);
    const argument = request.params;
    query.equalTo("objectId", argument.RequestID);
    const res = await query.first();
    if(argument.Type == 1){
        return res
    }

    //Get ToRequestData
    var params = {};
    var data;
    if(argument.DataOfGrantor){
        if(res.get("ToRequestType") === "Teacher"){
            params["TeacherID"] = res.get("ToRequestIDPointer");
            data = JSON.parse(await Parse.Cloud.run("GetTeacherData", params));
        }
        else if(res.get("ToRequestType") === "NT_Distributor"){
            params["NT_DistributorID"] = res.get("ToRequestIDPointer");
            data = JSON.parse(await Parse.Cloud.run("GetNT_DistributorData", params));
        }
        res.set("GrantorData", data);
    }
    //Get StudentData
    else if(argument.DataOfRequestor){
        params["StudentID"] = res.get("StudentIDPointer");
        data = JSON.parse(await Parse.Cloud.run("GetStudentData", params));
        res.set("RequestorData", data);
    }

    //If Request is approved, get badge data
    if(res.get("RequestStatus") === "Approved"){
        params = {"BadgeID" : res.get("RequestFeedback")};
        res.set("RewardData", JSON.parse(await Parse.Cloud.run("GetBadgeData", params)));
    }

    return JSON.stringify(res);
});

Parse.Cloud.define("GetRequests", async(_request) =>{
    const Request = Parse.Object.extend("Request");
    const query = new Parse.Query(Request);
    const res = await query.find();
    return JSON.stringify(res);
});

//StudentID
Parse.Cloud.define("GetStudentRequests", async(request) =>{
    const argument = request.params;
    //Get Requests
    const Request = Parse.Object.extend("Request");
    const query = new Parse.Query(Request);
    const res = await query.find();

    var AccountRequests = [];
    for(var req of res){
        if(req.get("StudentIDPointer") === argument.StudentID){
            AccountRequests.push(req);
        }
    }

    return JSON.stringify(AccountRequests);
});