<style>
    body {
        background-image: theme('backgroundImage.default');
        background-size: cover;
        background-attachment: fixed;
        background-repeat: no-repeat;
        font-family: theme('fontFamily.default');
        margin: 0;
        overflow: hidden;
    }
    ul::-webkit-scrollbar {
        display: none;
    }
    .scroll::-webkit-scrollbar {
        display: none;
    }

</style>

<template>
    <head>
        <title>Leaderboard</title>
    </head>

    <header>
        <!--header navigation bar-->
        <nav class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center z-[7]">
            <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
            <a class="absolute left-[10px] z-[9]" href="/"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>

            <!--student page-->
            <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverStudentPage">STUDENT</a></div>
            <!--house page-->
            <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverHousePage">HOUSE</a></div>
            <!--leaderboard page-->
            <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gold z-[9]"><a class="text-gold text-[13px]" href="GiverLeaderboardPage">LEADERBOARDS</a></div>
            <!--request page-->
            <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverRequestPage">REQUEST</a></div>

            <details class="absolute top-[15px] right-[10px] w-[170px] z-[9]">
                <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                    <span class="text-white text-[12px]">Giver's First Name</span>
                </summary>
                <div class="relative bg-black/20 border-[1px] mt-[22px] border-gray z-[9]">
                    <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
                    <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold z-[9]" @click="logOut()">SIGN OUT</a></div>
                </div>
            </details>
        </nav>
    </header>

    <div class="text-white text-[13px]">
        <!-- leaderboard tab -->
        <nav class="flex items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
            <button class="text-white text-[12px] hover:text-gold" v-on:click="toggleTabs(1)" v-bind:class="{'text-gold': openTab === 1}">STUDENT</button>
            <button class="text-white text-[12px] hover:text-gold" v-on:click="toggleTabs(2)" v-bind:class="{'text-gold': openTab === 2}">HOUSE</button>
        </nav>

        <!-- student leaderboard content -->
        <div>
            <div v-show="openTab === 1" class="my-2 w-full h-screen flex justify-center">
                <div class="w-5/6 h-4/5 flex-col flex justify-center">
                    <!--student leaderboard head container-->
                    <ul class="sticky mt-0 flex flex-row border-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                        <!--student leaderboard head row-->
                        <li class="relative flex flex-row items-center justify-center px-[12px] h-full w-full">
                            <div class="flex items-center justify-center w-[5%] h-full">RANK</div>
                            <div class="flex items-center justify-center w-[40%] h-full">NAME</div>
                            <div class="flex items-center justify-center w-[35%] h-full">TITLE</div>
                            <div class="flex items-center justify-center w-[5%] h-full">POINTS</div>
                            <div class="flex items-center justify-center w-[15%] h-full">HOUSE</div>
                        </li>
                    </ul>
                    <!--student leaderboard list body-->
                    <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-full bg-black/20 overflow-y-scroll">
                        <!--student leaderboard list row-->
                        <li v-for="student in StudentsLeaderboard" :key="student" class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                            <div class="flex items-center justify-center w-[5%] h-full"> <!--ranking-->
                                <div class="block w-[30px] h-[30px] border-[3px] -rotate-45" v-bind:class="{'border-gold': student.Ranking <= 3}"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">{{student.Ranking}}</span></div>
                            </div>
                            <div class="flex items-center justify-start w-[40%] h-full pl-2"> <!--name-->
                                <!--image-->
                                <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                    <img v-if="student.EquippedCosmeticsData !== undefined" class="w-[35px] rounded-full h-auto" v-bind:src="student.EquippedCosmeticsData[0].CosmeticImage" />
                                    <img v-if="student.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto w-[40px] h-auto" v-bind:src="student.EquippedCosmeticsData[1].CosmeticImage" />
                                </div>
                                <!--text-->
                                <div class="inline-flex flex-col pl-2">
                                    <strong class="text-white text-[15px]">{{student.UserName}}</strong>
                                    <span class="text-white text-[13px]">{{student.FirstName}} {{student.MiddleName}} {{student.LastName}}</span>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-[35%] h-full"><span class="text-white text-[13px]">{{student.AscensionTitle}}</span></div> <!--title-->
                            <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">{{student.XP}}</span></div> <!--points-->
                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">{{student.StudentHouse.HouseName}}</span></div> <!--house-->
                        </li>
                    </ul>
                </div>
            </div>


            <div v-show="openTab === 2" class="my-2 w-full h-screen flex flex-col justify-center items-center scroll overflow-x-scroll">
                <ul class="w-5/6 h-full scroll overflow-x-scroll">
                    <ul class="flex h-1/2 border-[1px] border-gray bg-black/20 overflow-x-scroll">
                        <li v-for="house in HousesLeaderboard" :key="house" class="flex items-start justify-center w-fit max-h-[500px] h-full px-5">
                            <img class="w-auto h-full pb-4" v-bind:src="house.HouseBanner" />
                        </li>
                    </ul>
                    <div class="flex h-5/6 my-5 gap-2">
                        <!--house ranking-->
                        <div class="w-2/5 h-5/6 border-[1px] border-gray text-[12px]">
                            <ul class="flex w-full bg-black/50 py-1 border-b-[1px] border-gray">
                                <li class="flex justify-center items-center w-[15%]">RANK</li>
                                <li class="flex justify-center items-center w-[55%]">NAME</li>
                                <li class="flex justify-center items-center w-[10%]">POINTS</li>
                                <li class="flex justify-center items-center w-[20%]">MEMBERS</li>
                            </ul>
                            <!--house leaderboard list body-->
                            <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                <!--house leaderboard list row-->
                                <li v-for="house in HousesLeaderboard" :key="house" class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="selectHouse(house)">
                                    <div class="flex items-center justify-center w-[15%] h-full">
                                        <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">{{house.Ranking}}</span>
                                    </div>
                                    <div class="flex items-center justify-start gap-3 w-[55%] h-full">
                                        <!--image-->
                                        <div class="relative w-[40px] h-full flex items-center justify-center">
                                            <img class="w-[35px] h-auto" v-bind:src="house.HouseBanner" />
                                        </div>
                                        <!--text-->
                                        <strong class="text-white text-[15px]">{{house.HouseName}}</strong>
                                    </div>
                                    <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">{{house.HouseXP}}</span></div>
                                    <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">{{house.HousePopulation}}</span></div>
                                </li>
                            </ul>

                        </div>
                        <!--house members leaderboard-->
                        <div class="w-3/5 h-5/6 border-[1px] border-gray">
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
                </ul>
            </div>
        </div>
    </div>

    
</template>

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css';

    export default {
        data() {
            return {
                //FRONTEND VARIABLES
                openTab: 2, //student, house

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host: window.location.host,

                StudentData: [],
                StudentsLeaderboard: [],
                StudentRank: 0,

                HousesLeaderboard: [],
                HouseStudentLeaderboard: {},

                SelectedHouse: '',

            };
        },

        components: {
        },

        methods:{
            //===========FRONTEND FUNCTIONS===============
            toggleTabs: function(tabNumber) {
                this.openTab = tabNumber
            },

             //==========BACKEND FUNCTIONS=================
            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
            },

            async getAccountData(){
                var param = {"TeacherID" : this.currentUser.get("AccountID")};
                this.TeacherData = JSON.parse(await Parse.Cloud.run("GetTeacherData", param));
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
                // If account is not giver, go to homepage
                if(this.currentUser.get("AccountType") !== "Teacher"){
                    window.location.href ='http://' + this.host;
                    return;
                }
                // If Account is logged in and does not have an account yet, redirect to sign up page
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
