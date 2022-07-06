Parse.Cloud.define("AddNT_Distributor", async(request) => {
    const NT_Distributor = Parse.Object.extend("NT_Distributor");
    const nt_distributor = new NT_Distributor();
    const argument = request.params;

    nt_distributor.save({
        "FirstName" : argument.FirstName,
        "MiddleName" : argument.MiddleName,
        "LastName" : argument.LastName,
        "Email" : argument.Email,
        "ContactNumber" : argument.ContactNumber,
        "RegisterDate" : argument.RegisterDate,
        "JobTitle" : argument.JobTitle,
        "NT_DistributorUnitIDPointer" : argument.NT_DistributorUnitIDPointer,
    }).then(()=>{
        console.log("Successfully added NT_Distributor!");
    });
});

Parse.Cloud.afterSave("NT_Distributor", async(request)=>{
    const nt_distributor = request.object;
    const original = request.original;
    //If object is newly created
    if (!original){
        return nt_distributor.save({
            "PendingApprovalBadgesID" : [],
        });
    }
});

Parse.Cloud.define("GetNT_DistributorData", async(request) => {
    const NT_Distributor = Parse.Object.extend("NT_Distributor");
    const query = new Parse.Query(NT_Distributor);
    const argument = request.params;
    query.equalTo("objectId", argument.NT_DistributorID);
    const res = await query.first();
    return JSON.stringify(res);
});

//Must specify id of nt_distributor with name of "NT_DistributorID"
Parse.Cloud.define("EditNT_Distributor", async(request) => {
    const NT_Distributor = Parse.Object.extend("NT_Distributor");
    const query = new Parse.Query(NT_Distributor);
    const argument = request.params;

    query.equalTo("objectId", argument.NT_DistributorID);
    const res = await query.first();

    var list_of_attr = ["FirstName", "MiddleName", "LastName", 
                        "Email", "ContactNumber", "RegisterDate", "JobTitle", 
                        "NT_DistributorUnitIDPointer", "PendingApprovalBadgesID",
    ];
    
    var list_of_arguments =[argument.FirstName, argument.MiddleName, argument.LastName, 
                            argument.Email, argument.ContactNumber, argument.RegisterDate, argument.JobTitle,
                            argument.NT_DistributorUnitIDPointer, argument.PendingApprovalBadgesID,
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited NT_Distributor");
    });
});

Parse.Cloud.define("DeleteNT_Distributor", async(request) => {
    const NT_Distributor = Parse.Object.extend("NT_Distributor");
    const query = new Parse.Query(NT_Distributor);
    const argument = request.params;

    query.equalTo("objectId", argument.NT_DistributorID);
    const res = await query.first();

    res.destroy().then(() => {
        console.log("Successfully Deleted NT_Distributor");
    });
    
});