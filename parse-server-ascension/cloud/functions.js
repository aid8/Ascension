const { request } = require("http");

Parse.Cloud.define("GoogleSignIn", async (request) => {
    const google = require("googleapis").google;
    // Google's OAuth2 client
    const OAuth2 = google.auth.OAuth2;
  
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
      "762534465467-srl15os6nbsoaqr89aekvicok61tildv.apps.googleusercontent.com",
      "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",
      ["http://localhost:8088/RedirectPage"],
    );
    // Obtain the google login link to which we'll send our users to give us access
    const loginLink = oauth2Client.generateAuthUrl({
      // Indicates that we need to be able to access data continously without the user constantly giving us consent
      access_type: "offline",
      // Using the access scopes from our config file
      scope: ["email", "openid", "profile"],
    });
    return loginLink;
});

Parse.Cloud.define("GoogleToken", async (request) => {
    const google = require("googleapis").google;
  
    // Google's OAuth2 client
    const OAuth2 = google.auth.OAuth2;
  
    // Create an OAuth2 client object from the credentials in our config file
    const oauth2Client = new OAuth2(
        "762534465467-srl15os6nbsoaqr89aekvicok61tildv.apps.googleusercontent.com",
        "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",
        ["http://localhost:8088/RedirectPage"],
    );
  
    if (request.error) {
      // The user did not give us permission.
      return request.error;
    } else {
      try {
        const { tokens } = await oauth2Client.getToken(request.params.code);
        oauth2Client.setCredentials(tokens);
        var oauth2 = google.oauth2({
          auth: oauth2Client,
          version: "v2",
        });
        const usr_info = await oauth2.userinfo.get();
        // Auth data for Parse
        const authData = {
          id: usr_info.data.id,
          email: usr_info.data.email,
          name: usr_info.data.name,
          id_token: tokens.id_token,
          access_token: tokens.access_token,
        };
        return authData;
      } catch (error) {
        return error;
      }
    }
});

Parse.Cloud.define("DeleteFile", async(request) =>{
  const argument = request.params;
  await Parse.Cloud.httpRequest({
    url: argument.url,
    method: 'DELETE',
    headers: {
        'X-Parse-Master-Key' : 'master',
        'X-Parse-Application-Id': 'myAppId'
    }
  }).then(function (httpResponse) {
    // success
    console.log('Request succeeded: ' + httpResponse.text);
  }, function (httpResponse) {
    // error
    console.error('Request failed with response code ' + httpResponse.status);
  });
});

//GetRewardData(Since reward id ang nasa badgesIDEarned kang student, gibo pa kita kani, garo man lang reward to badge/trophy converter)
//RewardID
//automatically gives details about the trophy/badge stored in "RewardData"
Parse.Cloud.define("GetRewardData", async(request) => {
  const Reward = Parse.Object.extend("Reward");
  const query = new Parse.Query(Reward);
  const argument = request.params;
  query.equalTo("objectId", argument.RewardID);
  const res = await query.first();

  var RewardType = res.get("RewardType");
  var params;
  var RewardData;
  if(RewardType == "Badge"){
      params = {"BadgeID" : res.get("RewardID")};
      RewardData = JSON.parse(await Parse.Cloud.run("GetBadgeData", params));
  }
  else if(RewardType == "Trophy"){
      params = {"TrophyID" : res.get("RewardID")};
      RewardData = JSON.parse(await Parse.Cloud.run("GetTrophyData", params));
  }
  RewardData["RewardID"] = argument.RewardID;
  RewardData["DateRewarded"] = res.get("DateRewarded");
  res.set("RewardData", RewardData);
  return JSON.stringify(res);
});


Parse.Cloud.define("GetUpdatedUserData", async(request) => {
  const argument = request.params;
  var query = new Parse.Query(Parse.User);
  query.equalTo("objectId", argument.UserID);
  const res = await query.first();
  return JSON.stringify(res); 
});

//Input must be a path(string) of a txt file (e.g. "/example.txt")
Parse.Cloud.define("GetStaffEmails", (request) =>{
  const {readFileSync} = require('fs');
  const argument = request.params

  const staffEmails = JSON.parse(readFileSync(argument.FilePath, "utf-8"))
  return staffEmails; //an object
});

//takes an array of teacher emails (teacher and NonTeacher)
Parse.Cloud.define("IdentifyUserType", (request) =>{
  const argument = request.params
  const userEmail = argument.email
  if(argument.teacherEmails.indexOf(userEmail) == -1){
    return (argument.nt_DistributorEmails.indexOf(userEmail) == -1) ? "Student" : "NT_Distributor"
  }
  else{
    return "Teacher"
  }
})
