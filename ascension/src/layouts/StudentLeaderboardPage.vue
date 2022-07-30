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
                <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentProfilePage">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentQuestPage">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentRequestPage">REQUEST</a></div>
                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">{{StudentData.UserName}}</span>
                        <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="/AccountSettings">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a @click="logOut()" class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--leaderboard tab-->
            <nav class="absolute flex flex-row items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('student')" v-bind:class="{'text-gold': openTab === 'student', 'text-white': openTab !== 'student'}" href="#">STUDENT</a>
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('house')" v-bind:class="{'text-gold': openTab === 'house', 'text-white': openTab !== 'house'}" href="#">HOUSE</a>
            </nav>
            <!--leaderboard content-->
            <div class="absolute inset-y-0 inset-x-0 mx-auto min-w-[1000px] w-[100%] h-[100%]">
                <!--student-->
                <div class="absolute inset-y-0 min-w-[00px] w-full h-full pt-[100px] pb-[50px]">
                    <div class="flex flex-row items-start justify-center gap-5 h-full">
                        <!--student leaderboard section-->
                        <div class="flex flex-col items-center justify-start gap-3 w-[1200px] min-h-[150px] h-full" v-bind:class="{'hidden': openTab !== 'student', 'flex': openTab === 'student'}">
                            <div class="flex flex-col w-full h-full">
                                <!--student leaderboard head container-->
                                <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                    <!--student leaderboard head row-->
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                        <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">RANK</div>
                                        <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                        <div class="flex items-center justify-center w-[30%] h-full text-white text-[12px]">TITLE</div>
                                        <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">POINTS</div>
                                        <div class="flex items-center justify-center w-[10%] h-full text-white text-[12px]">HOUSE</div>
                                    </li>
                                </ul>
                                <!--student leaderboard list body-->
                                <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[85%] bg-black/20 overflow-y-scroll">
                                    <!--student leaderboard list row-->
                                    <li v-for="student in StudentsLeaderboard" :key="student" class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <div class="block w-[30px] h-[30px] border-[3px] -rotate-45" v-bind:class="{'border-gold': student.Ranking <= 3}"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">{{student.Ranking}}</span></div>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img v-if="student.EquippedCosmeticsData !== undefined" class="w-[35px] rounded-full h-auto" v-bind:src="student.EquippedCosmeticsData[0].CosmeticImage" />
                                                <img v-if="student.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto w-[40px] h-auto" v-bind:src="student.EquippedCosmeticsData[1].CosmeticImage" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">{{student.UserName}}</strong>
                                                <span class="text-white text-[13px]">{{student.FirstName}} {{student.MiddleName}} {{student.LastName}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">{{student.AscensionTitle}}</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">{{student.XP}}</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">{{student.StudentHouse.HouseName}}</span></div>
                                    </li>
                                </ul>
                                <!--current user-->
                                <ul class="flex flex-row border-x-[1px] border-gray w-full max-h-full min-h-[50px] h-[10%] bg-black/50">
                                    <!--student leaderboard list row-->
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">{{StudentRank}}</span>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="w-[35px] rounded-full h-auto" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" />
                                                <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto w-[40px] h-auto" v-bind:src="StudentData.EquippedCosmeticsData[1].CosmeticImage"/>
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">{{StudentData.UserName}}</strong>
                                                <span class="text-white text-[13px]">{{StudentData.FirstName}} {{StudentData.MiddleName}} {{StudentData.LastName}}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">{{StudentData.AscensionTitle}}</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">{{StudentData.XP}}</span></div>
                                        <div v-if="StudentData.StudentHouse !== undefined" class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">{{StudentData.StudentHouse.HouseName}}</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--house leaderboard section-->
                        <div class="flex flex-col items-center justify-start gap-10 w-full min-h-[900px] h-full" v-bind:class="{'hidden': openTab !== 'house', 'flex': openTab === 'house'}">
                            <!--house Banner-->
                            <div class="flex items-center jusitfy-center bg-black/20 border-[1px] border-gray w-[80%] h-[60%]">
                                <div class="block items-center justify-start w-full h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                    <!--bg color of number changes-->
                                    <!--level container-->
                                    <div class="flex w-full h-full">
                                        <div class="flex items-start justify-start w-full h-full">
                                            <!--the banners will be in order list from left to right depending on the rank-->
                                            <div v-for="house in HousesLeaderboard" :key="house" class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" v-bind:src="house.HouseBanner" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--leaderboards-->
                            <div class="flex flex-row items-center justify-start gap-3 w-[80%] max-h-[300px] h-[40%]">
                                <!--house leaderboard-->
                                <div class="flex flex-col w-[35%] h-full">
                                    <!--house leaderboard head container-->
                                    <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                        <!--house leaderboard head row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                            <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">RANK</div>
                                            <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                            <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">POINTS</div>
                                            <div class="flex items-center justify-center w-[20%] h-full text-white text-[12px]">MEMBERS</div>
                                        </li>
                                    </ul>
                                    <!--house leaderboard list body-->
                                    <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                        <!--house leaderboard list row-->
                                        <li v-for="house in HousesLeaderboard" :key="house" class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="selectHouse(house)">
                                            <div class="flex items-center justify-center w-[15%] h-full">
                                                <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">{{house.Ranking}}</span>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-full flex items-center justify-center">
                                                    <img class="w-[35px] h-auto" v-bind:src="house.HouseBanner" />
                                                </div>
                                                <!--text-->
                                                <strong class="text-white text-[15px]">{{house.HouseName}}</strong>
                                            </div>
                                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">{{house.HouseXP}}</span></div>
                                            <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">{{house.HousePopulation}}</span></div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <!--student in selected house leaderboard-->
                                <div class="flex flex-col w-[65%] h-full">
                                    <!--student in selected house leaderboard list head-->
                                    <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                        <!--student leaderboard head row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                            <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">RANK</div>
                                            <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                            <div class="flex items-center justify-center w-[35%] h-full text-white text-[12px]">TITLE</div>
                                            <div class="flex items-center justify-center w-[10%] h-full text-white text-[12px]">POINTS</div>
                                        </li>
                                    </ul>
                                    <!--student in selected house leaderboard list body-->
                                    <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                        <!--student leaderboard list row-->
                                        <template v-if="SelectedHouse !== ''"> 
                                            <li v-for="student in HouseStudentLeaderboard[SelectedHouse.objectId]" :key="student" class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                                <div class="flex items-center justify-center w-[5%] h-full">
                                                    <div class="block w-[30px] h-[30px] border-[3px]" v-bind:class="{'border-gold -rotate-45': student.Ranking <= 3}"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">{{student.Ranking}}</span></div>
                                                </div>
                                                <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                    <!--image-->
                                                    <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                        <img v-if="student.EquippedCosmeticsData !== undefined" class="w-[35px] rounded-full h-auto" v-bind:src="student.EquippedCosmeticsData[0].CosmeticImage" />
                                                        <img v-if="student.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto w-[40px] h-auto" v-bind:src="student.EquippedCosmeticsData[1].CosmeticImage" />
                                                    </div>
                                                    <!--text-->
                                                    <div class="inline-flex flex-col">
                                                        <strong class="text-white text-[15px]">{{student.UserName}}</strong>
                                                        <span class="text-white text-[13px]">{{student.FirstName}} {{student.MiddleName}} {{student.LastName}}</span>
                                                    </div>
                                                </div>
                                                <div class="flex items-center justify-center w-[35%] h-full"><span class="text-white text-[13px]">{{student.AscensionTitle}}</span></div>
                                                <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">{{student.XP}}</span></div>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                                
                            </div>
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
                openTab: 'student', //student, house
                selectedHouse: 'liberalitas', //fides, fortis, liberalitas, equitas

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                StudentData: [],
                StudentsLeaderboard: [],
                StudentRank: 0,

                HousesLeaderboard: [],
                HouseStudentLeaderboard: {},

                SelectedHouse: '',
            }
        },
        methods: {
            //===========FRONTEND FUNCTIONS===============
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            viewHouse: function (houseName) {
                this.selectedHouse = houseName
            },

            //==========BACKEND FUNCTIONS=================
            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },

            async getAccountData(){
                var param = {"StudentID" : this.currentUser.get("AccountID")};
                this.StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
            },

            async getStudentsLeaderboard(){
                this.StudentsLeaderboard = [];
                var param = {"LeaderboardLimit" : 100,};
                var res = JSON.parse(await Parse.Cloud.run("GetStudentsLeaderboard", param));
                for(var student of res){
                    //Get ranking
                    if(student.objectId === this.currentUser.get("AccountID")){
                        this.StudentRank = student.Ranking;
                    }
                    //Get other important data
                    param = {"HouseID" : student.StudentHouseIDPointer};
                    student["StudentHouse"] = JSON.parse(await Parse.Cloud.run("GetHouseData", param));

                    var EquippedCosmeticsData = [];
                    for(const cosmeticID of student.EquippedCosmetics){
                        param = {
                            "CosmeticID" : cosmeticID,
                        }
                        EquippedCosmeticsData.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", param)));
                    }
                    student["EquippedCosmeticsData"] = EquippedCosmeticsData;
                    this.StudentsLeaderboard.push(student);
                }
            },

            async getHousesLeaderboard(){
                this.HousesLeaderboard = [];
                this.HouseStudentLeaderboard = [];
                var leaderboard = JSON.parse(await Parse.Cloud.run("GetHousesLeaderboard"));
                for(let house of leaderboard){
                    //GetHouseLeaderboard
                    var param = {"HouseID" : house.objectId, "Count" : 100};
                    var HouseData = JSON.parse(await Parse.Cloud.run("GetHouseData", param));
                    HouseData["Ranking"] = house.Ranking;
                    this.HousesLeaderboard.push(HouseData);

                    //Get HouseStudentLeaderboard
                    var studentLeaderboardData = JSON.parse(await Parse.Cloud.run("GetHouseStudentLeaderboard", param));
                    var tmp = [];
                    for(let student of studentLeaderboardData){
                        //Get Cosmetics
                        var EquippedCosmeticsData = [];
                        for(const cosmeticID of student.EquippedCosmetics){
                            param = {
                                "CosmeticID" : cosmeticID,
                            }
                            EquippedCosmeticsData.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", param)));
                        }
                        student["EquippedCosmeticsData"] = EquippedCosmeticsData;
                        tmp.push(student);
                    }
                    this.HouseStudentLeaderboard[house.objectId] = tmp;
                }
            },

            async selectHouse(house){
                this.SelectedHouse = house;
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
                this.getStudentsLeaderboard();
                this.getHousesLeaderboard();
            }
            else{
                window.location.href ='http://' + this.host;
            }
        },
    }
</script>