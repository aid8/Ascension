/*
    Functions that are not yet tested upon creating/updating:
    - VerifyEligibility
*/
Parse.Cloud.define("AddTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const trophy = new Trophy();
    const argument = request.params;

    trophy.save({
        "TrophyName" : argument.TrophyName,
        "TrophyDescription" : argument.TrophyDescription,
        "TrophyPoints" : argument.TrophyPoints,
        "TrophyImage" : argument.TrophyImage,
        "TrophyCategory" : argument.TrophyCategory,
        "BadgesIDNeeded" : argument.BadgesIDNeeded,
    }).then(()=>{
        console.log("Successfully added Trophy!");
    });
});

//Must specify id of Trophy with name of "TrophyID"
Parse.Cloud.define("EditTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;

    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();

    var list_of_attr = ["TrophyName", "TrophyDescription", "TrophyPoints", 
                        "TrophyImage", "TrophyCategory", "BadgesIDNeeded",
    ];
    
    var list_of_arguments =[argument.TrophyName, argument.TrophyDescription, argument.TrophyPoints, 
                            argument.TrophyImage, argument.TrophyCategory, argument.BadgesIDNeeded
    ];

    for(let i = 0; i < list_of_attr.length; ++i){
        if(list_of_arguments[i] != null){
            res.set(list_of_attr[i], list_of_arguments[i]);
        }
    }

    res.save().then(()=>{
        console.log("Successfully Edited Trophy");
    });
});

Parse.Cloud.define("DeleteTrophy", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;

    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();

    //If a student has a trophy in this, remove it
    //Check chosentrophies as well
    var students = JSON.parse(await Parse.Cloud.run("GetStudents"));
    for (const student of students){
        var TrophiesIDUnlocked = student.TrophiesIDUnlocked;
        var ChosenTrophies = student.ChosenTrophies;
        let edited = false;
        let params = {"StudentID" : student.objectId};
        let index = TrophiesIDUnlocked.indexOf(argument.TrophyID);
        if(index > -1){
            TrophiesIDUnlocked.splice(index, 1);
            params["TrophiesIDUnlocked"] = TrophiesIDUnlocked;
            edited = true;
        }

        index = ChosenTrophies.indexOf(argument.TrophyID)
        if(index > -1){
            ChosenTrophies[index] = null;
            params["ChosenTrophies"] = ChosenTrophies;
            edited = true;
        }

        if(edited){
            await Parse.Cloud.run("EditStudent", params);
        }
    }

    res.destroy().then(() => {
        console.log("Successfully Deleted Trophy");
    });
});

Parse.Cloud.define("GetTrophyData", async(request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const argument = request.params;
    query.equalTo("objectId", argument.TrophyID);
    const res = await query.first();
    return JSON.stringify(res);
});

Parse.Cloud.define("GetTrophies", async(_request) => {
    const Trophy = Parse.Object.extend("Trophy");
    const query = new Parse.Query(Trophy);
    const res = await query.find();
    return JSON.stringify(res);
});

//VerifyEligibility
//TO TEST =======================================================================================================================
//StudentID, TrophyID required
// Currently used in RemoveBadge() in teacher.js
Parse.Cloud.define("VerifyEligibility", async(request) =>{
    const argument = request.params
    
    //Gets the Student
    const Student = new Parse.Object.extend("Student")
    const studentQuery = Parse.Query(Student)
    studentQuery.equalTo("objectId", argument.StudentID)
    const student = await studentQuery.first()
    const studentBadges = student.get("BadgesIDEarned")
    
    //Gets the Trophy
    const Trophy = new Parse.Object.extend("Trophy")
    const trophyQuery = new Parse.Query(Trophy)
    trophyQuery.equalTo("objectId", argument.TrophyID)
    const trophy = await trophyQuery.first()
    trophyBadges = trophy.get("BadgesIDNeeded")

    //Checks if student has all badges for the trophy
    let isEligible = true
    for(let i = 0; i < trophyBadges; i++){
        if(!studentBadges.includes(trophyBadges[i])){
            isEligible = false
            break
        }
    }

    //Adds/Removes the trophy in the Student
    let studentTrophies = student.get("TrophiesIDUnlocked")
    if(isEligible){
        if(!studentTrophies.includes(argument.TrophyID)){
            studentTrophies.push(argument.TrophyID)
        }
    }
    else{
        if(studentTrophies.includes(argument.TrophyID)){
            const index = studentTrophies.indexOf(argument.TrophyID)
            studentTrophies.splice(index, 1)
        }
    }
    student.set("TrophiesIDUnlocked", studentTrophies)
    student.save()
})
//==================================================================================================================================