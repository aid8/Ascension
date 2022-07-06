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