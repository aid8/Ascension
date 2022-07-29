<style>
    body {
        background-image: theme('backgroundImage.default');
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        font-family: theme('fontFamily.default');
        margin: 0;
    }
    ul::-webkit-scrollbar {
        display: none;
    }
    .remove-scroll::-webkit-scrollbar{
        display: none;
    }


</style>
<template>
    <head>
        <title>Quest Page</title>
    </head>
    <body>
        <div class="absolute h-[100vh] w-[100vw]">
            <div class="absolute shadow-profile h-[100vh] w-[100vw]">
            </div>
            <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="h-[100vh] w-[100vw]" v-bind:src="StudentData.EquippedCosmeticsData[2].CosmeticImage" />
        </div>
        <main class="min-w-[1000px]">
            <!--header navigation bar-->
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
                <a class="absolute left-[10px]" href="#"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentProfilePage">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentLeaderboardPage">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentRequestPage">REQUEST</a></div>
                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">{{StudentData.UserName}}</span>
                        <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="/AccountSettings">ACCOUNT SETTINGS</a></div>
                        <div @click="logOut()" class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--quest tab-->
            <nav class="absolute flex flex-row items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('daily')" v-bind:class="{'text-gold': openTab === 'daily'}" href="#">DAILY</a>
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('weekly')" v-bind:class="{'text-gold': openTab === 'weekly'}" href="#">WEEKLY</a>
            </nav>
            
            <!--daily-->
            <div class="absolute inset-y-0 min-w-[1000px] w-[100%] h-[100%] pt-[100px] pb-[50px]">
                <div class="flex flex-row items-start justify-center gap-[40px] h-full">
                    <!--next reward-->
                    <div class="flex flex-col items-center justify-start gap-3 min-h-[500px] w-[300px] h-full">
                        <!--mission summary-->
                        <div class="w-full justify-center flex flex-row">
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Totaly daily mission completed">
                                <span>{{StudentData.StudentDailyQuestsID.length}}</span>
                                <i class="fa-solid fa-calendar-day"></i>
                            </div>
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Totaly weekly mission completed">
                                <span>{{StudentData.StudentWeeklyQuestsID.length}}</span>
                                <i class="fa-solid fa-calendar-week"></i>
                            </div>
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Current Ascension Points">
                                <span>{{StudentData.AscensionPoints}}</span>
                                <i class="fa-solid fa-fire"></i>
                            </div>
                        </div>
                        <!--next reward text-->
                        <div class="w-full flex items-center justify-start">
                            <span class="text-white text-[15px]">Next Reward:</span>
                        </div>
                        <!--next reward image-->
                        <div class="w-full flex items-center justify-center">
                            <div class="flex items-center justify-center border-[1px] border-gray w-[300px] h-[300px]">
                                <img v-if="NextRewardData.RewardCosmeticData !== undefined" class="block w-auto h-auto" v-bind:src="NextRewardData.RewardCosmeticData.CosmeticImage" />
                            </div>
                        </div>
                        <!--next reward name and its level (what level its placed in)-->
                        <div class="w-full flex flex-col items-center justify-center text-white">
                            <strong v-if="NextRewardData.RewardCosmeticData !== undefined" class="text-[15px]">{{NextRewardData.RewardCosmeticData.CosmeticName}}</strong>
                            <span class="text-[13px]">Ascension Points Needed: {{NextRewardData.RequiredAscensionPoints}}</span>
                        </div>
                    </div>

                    <!--quest progress and list-->
                    <div class="flex flex-col items-center justify-start gap-3 min-h-[500px] w-[70%] h-full">
                        <!--progress and rewards-->
                        <div class="flex w-full h-[20%]" title="Press shift + scroll to scroll horizontally">
                            <div class="block items-center justify-start border-[1px] border-gray bg-black/20 w-full h-full whitespace-nowrap remove-scroll overflow-x-scroll">
                                <!--bg color of number changes-->
                                <!--level container-->
                                <div class="flex w-full mx-[50px] h-full">
                                    <div v-for="reward in QuestRewards" :key="reward" class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" v-bind:value="reward.ProgressPercentage" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold border-[5px] rotate-45 w-[50px] h-[50px] overflow-hidden" v-bind:class="{'border-gold': StudentData.AscensionPoints > reward.RequiredAscensionPoints}">
                                            <img v-if="checkIfRewardIsNotAcquired(reward)" @click="claimQuestReward(reward)" class="flex -rotate-45 scale-[1.5] w-[150px] h-auto cursor-pointer" v-bind:src="reward.RewardCosmeticData.CosmeticImage" />
                                            <div v-if="!checkIfRewardIsNotAcquired(reward)" class="relative flex items-center justify-center -rotate-45 scale-[1.5] w-[150px] h-auto">
                                                <img class="w-[150px] h-auto brightness-50 z-10" v-bind:src="reward.RewardCosmeticData.CosmeticImage" />
                                                <div class="absolute text-gold text-[15px] z-20"><i class="fa-solid fa-check"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--daily quest list-->
                        <div class="flex w-full h-[80%]" v-bind:class="{'hidden': openTab !== 'daily', 'flex': openTab === 'daily'}">
                            <!--quest list container-->
                            <ul class="flex flex-col border-[1px] border-gray w-full h-full bg-black/20 overflow-y-scroll">
                                <!--quest list row-->
                                <li v-for="quest in StudentData.StudentDailyQuests" :key="quest" class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-[60px] w-full border-b-[1px] border-gray">
                                    <!--required number of how many times to do the quest-->
                                    <div class="flex items-center justify-center h-full">
                                        <div class="flex items-center justify-center rounded-full w-[45px] h-[45px] border-[1px] border-gray">
                                            <span class="text-white text-[12px]">{{quest.QuestPoints}}</span>
                                        </div>
                                    </div>
                                    <!--quest information-->
                                    <div class="flex flex-col items-start justify-center text-white remove-scroll overflow-x-auto whitespace-nowrap h-full w-full" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-[15px]">{{quest.QuestName}}</strong>
                                        <span class="text-[12px]">{{quest.QuestDescription}}</span>
                                    </div>
                                    <!--claim button-->
                                    <div v-if="quest.QuestStatus === 'Completed'" class="flex items-center justify-center h-full">
                                        <button @click="claimPoints(quest)" class="flex items-center justify-center bg-blue text-white text-[12px] w-[100px] h-[35px] hover:bg-blue_hover active:bg-blue_active">CLAIM</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!--weekly quest list-->
                        <div class="flex w-full h-[80%]" v-bind:class="{'hidden': openTab !== 'weekly', 'flex': openTab === 'weekly'}">
                            <!--quest list container-->
                            <ul class="flex flex-col border-[1px] border-gray w-full h-full bg-black/20 overflow-y-scroll">
                                <!--quest list row-->
                                <li v-for="quest in StudentData.StudentWeeklyQuests" :key="quest" class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-[60px] w-full border-b-[1px] border-gray">
                                    <!--required number of how many times to do the quest-->
                                    <div class="flex items-center justify-center h-full">
                                        <div class="flex items-center justify-center rounded-full w-[45px] h-[45px] border-[1px] border-gray">
                                            <span class="text-white text-[12px]">{{quest.QuestPoints}}</span>
                                        </div>
                                    </div>
                                    <!--quest information-->
                                    <div class="flex flex-col items-start justify-center text-white remove-scroll overflow-x-auto whitespace-nowrap h-full w-full" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-[15px]">{{quest.QuestName}}</strong>
                                        <span class="text-[12px]">{{quest.QuestDescription}}</span>
                                    </div>
                                    <!--claim button-->
                                    <div v-if="quest.QuestStatus === 'Completed'"  class="flex items-center justify-center h-full">
                                        <button @click="claimPoints(quest)" class="flex items-center justify-center bg-blue text-white text-[12px] w-[100px] h-[35px] hover:bg-blue_hover active:bg-blue_active">CLAIM</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </body>
</template>

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css';

    export default {
        data(){
            return{
                //FRONTEND VARIABLES
                openTab: 'daily', //daily, weekly
                isDailyClaim: false,
                isWeeklyClaim: false, 
                isRewardClaim: false,

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                StudentData: [],
                QuestRewards: [],
                NextRewardData: '',
            }
        },

        methods: {
            //===========FRONTEND FUNCTIONS===============
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            dailyClaimed: function (yes) {
                this.isDailyClaim = yes
            },
            weeklyClaimed: function (yes) {
                this.isWeeklyClaim = yes
            },
            rewardClaimed: function (yes) {
                this.isRewardClaim = yes
            },

            //==========BACKEND FUNCTIONS=================
            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },

            async getAccountData(){
                var param = {"StudentID" : this.currentUser.get("AccountID")};
                //Run GetStudentQuestFirst
                await Parse.Cloud.run("GetStudentQuests", param).then(async()=>{
                    this.StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
                });

                //Get unacquired cosmetics
                param["CosmeticType"] = "Avatar";
                this.StudentData["UnacquiredAvatars"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));
                param["CosmeticType"] = "Frame";
                this.StudentData["UnacquiredFrames"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));
                param["CosmeticType"] = "CoverPhoto";
                this.StudentData["UnacquiredCoverPhotos"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));

                //Get DailyQuests Data
                var studentDailyQuests = [];
                for(let quest of this.StudentData.StudentDailyQuestsID){
                    param = {"QuestID" : quest.QuestID};
                    let data = JSON.parse(await Parse.Cloud.run("GetQuestData", param));
                    data["QuestStatus"] = quest.QuestStatus;
                    studentDailyQuests.push(data);
                }
                //Get WeeklyQuests Data
                var studentWeeklyQuests = [];
                for(let quest of this.StudentData.StudentWeeklyQuestsID){
                    param = {"QuestID" : quest.QuestID};
                    let data = JSON.parse(await Parse.Cloud.run("GetQuestData", param));
                    data["QuestStatus"] = quest.QuestStatus;
                    studentWeeklyQuests.push(data);
                }
                this.StudentData["StudentDailyQuests"] = studentDailyQuests;
                this.StudentData["StudentWeeklyQuests"] = studentWeeklyQuests;

                //Then GetQuestReward (needs here since there is await)
                this.getQuestRewards();
            },

            async getQuestRewards(){
                var param = {"SortType" : "Ascending"};
                var res = JSON.parse(await Parse.Cloud.run("GetQuestRewards", param));
                this.QuestRewards = [];

                var lastPoint = 0;
                for(var questReward of res){
                    param = {"QuestRewardID" : questReward.objectId};
                    var data = JSON.parse(await Parse.Cloud.run("GetQuestRewardData", param));
                    //Compute Progress bar here
                    var neededPoints = data.RequiredAscensionPoints - lastPoint;
                    if(this.StudentData.AscensionPoints < data.RequiredAscensionPoints && this.NextRewardData === ''){
                        this.NextRewardData = data;
                    }
                    data["ProgressPercentage"] = ((this.StudentData.AscensionPoints - lastPoint) / neededPoints) * 100;
                    this.QuestRewards.push(data);
                    lastPoint = data.RequiredAscensionPoints;
                }
            },

            async claimPoints(quest){
                if(quest.QuestStatus === "Completed"){
                    var param = {
                        "StudentID" : this.currentUser.get("AccountID"), 
                        "QuestID" : quest.objectId,
                        "QuestType" : quest.QuestType,
                    };
                    await Parse.Cloud.run("CompleteStudentQuest", param);
                    alert("CLAIMED!");
                }
            },

            async claimQuestReward(reward){
                var param = {
                    "StudentID": this.currentUser.get("AccountID"),
                    "CosmeticID": reward.RewardCosmeticID,
                    "CosmeticType": reward.RewardCosmeticType,
                };
                await Parse.Cloud.run("RewardCosmetic", param);
                alert("REWARD CLAIMED!, CHECK COLLECTIONS");
                this.$router.go(0);
            },

            checkIfRewardIsNotAcquired(reward){
                var type = reward.RewardCosmeticType;
                var id = reward.RewardCosmeticID;
                if(this.StudentData.UnacquiredAvatars === undefined || this.StudentData.UnacquiredFrames === undefined || this.StudentData.UnacquiredCoverPhotos === undefined){
                    return false;
                }
                if(type === "Avatar"){
                    return this.StudentData.UnacquiredAvatars.map(function(e) { return e.objectId; }).indexOf(id) > -1;
                }
                else if(type === "Frame"){
                    return this.StudentData.UnacquiredFrames.map(function(e) { return e.objectId; }).indexOf(id) > -1;
                }
                else if(type === "CoverPhoto"){
                    return this.StudentData.UnacquiredCoverPhotos.map(function(e) { return e.objectId; }).indexOf(id) > -1;
                }
                return false;
            },
        },

        beforeMount(){
            if (this.currentUser) {
                //If account is not student, go to homepage
                if(this.currentUser.get("AccountType") !== "Student"){
                    window.location.href ='http://' + this.host;
                    return;
                }
                //If Account is logged in and does not have an account yet, redirect to sign up page
                else if(this.currentUser.get("AccountID") === undefined){
                    window.location.href ='http://' + this.host + '/SignUpPage';
                    return;
                }
                this.getAccountData();
            }
            else{
                window.location.href ='http://' + this.host;
            }
        },

    }
</script>