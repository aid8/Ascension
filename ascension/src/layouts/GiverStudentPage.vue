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

/*100vh*/
</style>

<template>

    <body>
        <main class="min-w-[1000px]">
            <!--pop up menu for giving badges-->
            <div class="absolute top-0 flex items-center justify-center min-w-[1000px] min-h-[600px] w-full h-[100vh] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'hidden': activePopUpTab === true, 'hidden': activePopUpTab === false}">
                <div class="flex items-center justify-center w-full h-full">
                    <div class="relative flex flex-row items-center justify-center gap-3 bg-black/20 border-[1px] border-gray px-[12px] w-[700px] h-[450px]">
                        <!--go back button-->
                        <nav class="absolute top-0 flex flex-row items-center gap-3 w-full h-auto px-[10px] py-[5px]">
                            <a class="text-[15px] text-white hover:text-gold_hover active:text-gold_active" v-on:click="viewPopUpTab(false)" href="#"><i class="fa-solid fa-angle-left"></i></a>
                            <span class="text-[15px] text-white">Username</span>
                        </nav>
                        <!--item inventory/list-->
                        <div class="inline-flex flex-col items-center justify-center gap-2 w-[70%] h-[370px]">
                            <!--search bar with sorter-->
                            <div class="flex flex-row items-center justify-start gap-3 w-full">
                                <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white px-[10px] py-[5px] w-[60%]" type="text" placeholder="Search badge..." />
                                <span class="inline-flex h-full items-center justify-end text-[12px] text-white w-[15%]">Search by:</span>
                                <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white px-[10px] py-[5px] w-[25%]">
                                    <option class="text-black">Name</option>
                                    <option class="text-black">Type</option>
                                </select>
                            </div>
                            <!--inventory-->
                            <div class="inline-flex items-start justify-start border-gray border-[1px] bg-black/20 p-[5px] w-full h-[95%] remove-scroll overflow-y-scroll">
                                <div> <!--container-->
                                    <!--item (badge)-->
                                    <div v-for="badge in Badges" :key="badge.objectId" v-bind:value="badge.objectId" 
                                        class="inline-flex items-center justify-center border-[1px] border-gray bg-black/20 m-[5px] p-[5px] w-[64.5px] h-[64.5px] cursor-pointer" 
                                        v-on:click="selectBadge(badge)" 
                                        v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': badge.objectId === SelectedBadgeID}">
                                        <img class="w-auto h-auto" alt="Badge" v-bind:src="badge.BadgeImage" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--selected badge-->
                        <div class="inline-flex items-center justify-center w-[30%] h-[370px]">
                            <div v-if="SelectedBadgeID !== ''" class="inline-flex flex-col items-center justify-center gap-3 w-full h-full">
                                <!--image-->
                                <div class="inline-flex items-center justify-center border-[1px] border-gray w-full h-[55%]">
                                    <img class="w-[170px] h-[170px]" v-bind:src="BadgeImage" />
                                </div>
                                <!--item information-->
                                <div class="flex flex-col w-full h-[35%] remove-scroll overflow-y-scroll ">
                                    <span class="text-[15px] text-white w-full">{{BadgeName}}</span>
                                    <span class="text-[12px] text-gold w-full">{{BadgeType}}</span>
                                    <p class="text-[12px] text-white">{{BadgeDescription}}</p>
                                </div>
                                <!--give button-->
                                <button @click="giveBadge()" class="bg-blue text-white text-[12px] w-full h-[10%] hover:bg-blue_hover active:bg-blue_active">GIVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--giver header navigation bar-->
            <nav v-if="currentUser.get('AccountType') === 'Teacher' || currentUser.get('AccountType') === 'NT_Distributor'" class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center h-[50px] z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full"></div>
                <a class="absolute left-[10px]" href="#"><img class="w-[130px] h-auto" src="../assets/img/logo/AscensionWhite.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverTeacherPage">STUDENT</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverHousePage">HOUSE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverLeaderboardPage">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverRequestPage">REQUEST</a></div>

                <details class="absolute top-[15px] right-[10px] w-[170px] z-[9]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[13px]">{{UserData.FirstName}}</span>
                    </summary>
                    <div class="relative bg-black/20 border-[1px] mt-[22px] border-gray z-[9]">
                        <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[13px] hover:text-gold z-[9]" href="">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[13px] hover:text-gold z-[9]" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--main content-->
            <div class="absolute top-0 min-w-[1000px] min-h-[600px] w-full h-[100vh] pt-[80px] pb-[35px]">
                <!--student section-->
                <div class="flex flex-col items-center justify-start gap-3 w-full h-full">
                    <!--selected user-->
                    <div class="inline-flex flex-row items-center justify-center gap-3 bg-black/20 px-[20px] border-[1px] border-gray min-h-[180px] max-h-[190px] min-w-[1000px] w-[80%] h-[30%]">
                        <!--avatar and personal info-->
                        <div class="inline-flex flex-row gap-2 w-[45%]">
                            <!--avatar and frame-->
                            <div class="relative inline-flex items-center jutsify-center max-w-[150px] max-h-[150px] w-[150px] h-[150px]">
                                <img v-if="SelectedStudentID !== ''" class="absolute inset-0 m-auto rounded-full w-[105px] h-auto" v-bind:src="StudentEquippedCosmeticsData[0].CosmeticImage" />
                                <img v-if="SelectedStudentID !== ''" class="absolute inset-0 m-auto w-full h-full" v-bind:src="StudentEquippedCosmeticsData[1].CosmeticImage" />
                            </div>
                            <!--personal info-->
                            <div class="inline-flex flex-col items-start justify-center">
                                <span class="text-[20px] text-gold">{{StudentUserName}}</span>
                                <span class="text-[13px] text-white">{{StudentFirstName}} {{StudentMiddleName}} {{StudentLastName}}</span>
                                <span class="text-[13px] text-white">{{StudentAddress}}</span>
                                <span class="text-[13px] text-white">{{StudentContactNum}}</span>
                                <span class="text-[13px] text-white">{{StudentEmail}}</span>
                            </div>
                        </div>
                        <div class="inline-flex flex-row items-center justify-end gap-10 w-[55%] h-full"> <!--graphics-->
                            <!--status icon-->
                            <div class="inline-flex justify-center max-w-[125px] w-auto h-auto">
                                <img v-if="SelectedStudentID !== ''" class="max-w-[130px] w-auto h-full" v-bind:src="StudentStatusTitleData.StatusTitleImage" />
                            </div>
                            <!--banner-->
                            <div class="inline-flex justify-center w-auto h-full">
                                <img v-if="SelectedStudentID !== ''" class="max-h-[200px] w-auto h-full" v-bind:src="StudentHouseData.HouseBanner" />
                            </div>
                            <!--top 3 trophies and recently obtained badges-->
                            <div class="inline-flex flex-col items-center justify-center w-auto">
                                <div class="inline-flex flex-row items-center justify-center gap-2 w-full">
                                    <template v-for="trophy in StudentChosenTrophies" :key="trophy">
                                        <img v-if="trophy !== null" class="w-[50px] h-auto" v-bind:title="trophy.TrophyName" v-bind:alt="trophy.TrophyName" v-bind:src="trophy.TrophyImage" />
                                    </template>
                                </div>
                                <span class="block border-gray border-b-[1px] my-[5px] mx-[auto] leading-[0.1px] w-[80%]"></span> <!--separator-->
                                <div class="inline-flex flex-row items-center justify-center gap-2 w-full">
                                    <template v-for="badge in StudentAcquiredBadges" :key="badge">
                                        <img v-if="badge !== null" class="w-[30px] h-auto" v-bind:title="badge.BadgeName" v-bind:alt="badge.BadgeName" v-bind:src="badge.BadgeImage" />
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--search bar and sorter-->
                   <form class="flex flex-row items-center justify-start gap-5 max-h-[35px] min-w-[1000px] w-[80%] h-[7%]">
                        <!--search bar-->
                        <input v-model="StudentSearch" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[200px] px-[10px]" type="search" placeholder="Search student..." />
                        <div class="flex flex-row items-center w-auto h-full gap-5">
                            <span class="text-[12px] text-white">Search By:</span>
                            <select v-model="StudentSearchType" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[150px] px-[10px]">
                                <option class="text-black" value="FirstName">First Name</option>
                                <option class="text-black" value="LastName">Last Name</option>
                                <option class="text-black" value="UserName">Username</option>
                            </select>
                        </div>
                    </form>
                    <!--student list-->
                    <div class="flex flex-row items-center justify-center gap-3 min-w-[1000px] w-[80%] h-[63%]">
                        <!--student list-->
                        <div class="flex flex-col w-full h-full">
                            <!--student list head container-->
                            <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray max-h-[40px] w-full h-[10%] bg-black/50">
                                <!--student leaderboard head row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                    <div class="flex items-center justify-center w-[5%] h-full"></div> <!--space filler-->
                                    <div class="flex items-center justify-center w-[40%] h-full text-white text-[12px]">NAME</div>
                                    <div class="flex items-center justify-center w-[23%] h-full text-white text-[12px]">TITLE</div>
                                    <div class="flex items-center justify-center w-[11%] h-full text-white text-[12px]">POINTS</div>
                                    <div class="flex items-center justify-center w-[10%] h-full text-white text-[12px]">HOUSE</div>
                                    <div class="flex items-center justify-center w-[11%] h-full text-white text-[12px]">ACTION</div>
                                </li>
                            </ul>
                            <!--student leaderboard list body-->
                            <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[90%] bg-black/20 overflow-y-scroll">
                                <!--student leaderboard list row-->
                                <li v-for="student in studentQuery" :key="student.objectId" v-bind:value="student.objectId" class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full h-[55px] border-b-[1px] border-gray">
                                    <div class="flex items-center justify-center gap-2 w-[5%] h-full">
                                        <a @click="selectStudent(student)" class="text-[25px] text-white" href="#"><i class="fa-solid fa-eye"></i></a>
                                    </div>
                                    <div class="flex items-center justify-start gap-2 w-[40%] h-full">
                                        <!--image-->
                                        <div class="relative w-[50px] h-[50px] flex items-center justify-center">
                                            <img class="w-[35px] rounded-full h-auto" v-bind:src="student.EquippedCosmeticsData[0].CosmeticImage" />
                                            <img class="absolute inset-0 m-auto w-full h-full" v-bind:src="student.EquippedCosmeticsData[1].CosmeticImage" />
                                        </div>
                                        <!--text-->
                                        <div class="inline-flex flex-col">
                                            <span class="text-gold text-[15px]">{{student.UserName}}</span>
                                            <span class="text-white text-[13px]">{{student.FirstName}} {{student.MiddleName}} {{student.LastName}}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-center w-[23%] h-full"><span class="text-white text-[13px]">{{student.AscensionTitle}}</span></div>
                                    <div class="flex items-center justify-center w-[11%] h-full"><span class="text-white text-[13px]">{{student.XP}}</span></div>
                                    <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">{{student.StudentHouse.HouseName}}</span></div>
                                    <!--give badge to house button-->
                                    <div class="flex items-center justify-center w-[11%] h-full">
                                        <button class="bg-blue text-white text-[12px] hover:bg-blue_hover w-[100px] py-[8px] active:bg-blue_active" @click="selectStudent(student)" v-on:click="viewPopUpTab(true)">GIVE BADGE</button>
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
                activePopUpTab: false,
                showItem: false,
                openStudent: 0,

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host: window.location.host,

                UserData: [],
                StudentData: {},

                //Containers
               
                Students: [],
                Trophies: [],
                Badges: [],
                
                //Backend Variables
                //StudentVariables
                StudentFirstName: '',
                StudentMiddleName: '',
                StudentLastName: '',
                StudentContactNum: '',
                StudentEmail: '',
                StudentUserName: '',
                StudentAddress: '',
                StudentSchoolID: '',
                StudentEquippedCosmeticsData: [],
                SelectedStudentID: '',
                StudentSearch: '',
                StudentChosenTrophies: [],
                StudentAcquiredBadges: [],
                StudentHouseData: '',
                StudentSearchType: "FirstName",
                
                //Badge Variables
                BadgeName: '',
                BadgeDescription: '',
                BadgePoints: '',
                BadgeImage: '',
                BadgeImageName: '',
                BadgeType: '',
                BadgeDesignInspiration: '',
                SelectedBadgeID: '',
                SelectedBadgeData: {},
            }
        },
        methods: {
            viewPopUpTab: function (bool) {
                this.activePopUpTab = bool
            },
            viewStudent: function (studentNumber) {
                this.openStudent = studentNumber
            },
            viewItem: function (item) {
                this.showItem = item
            },

            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },
            async getAccountData(){
                var params = {}
                if(this.currentUser.get("AccountType") === "Student"){
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetStudentData", params));
                }
                else if(this.currentUser.get("AccountType") === "Teacher"){
                    params = {"TeacherID" : this.currentUser.get("AccountID")};
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetTeacherData", params));
                    this.UserUnitIDPointer = this.UserData.TeacherUnitIDPointer;
                }
                else if(this.currentUser.get("AccountType") === "NT_Distributor"){
                    params = {"NT_DistributorID" : this.currentUser.get("AccountID")};
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetNT_DistributorData", params));
                }
            },
            async getStudents(){
                this.Students = [];
                var res = JSON.parse(await Parse.Cloud.run("GetStudents"));
                for(var student of res){
                    var param = {"DegreeID" : student.StudentDegreeIDPointer};
                    student["StudentDegree"] = JSON.parse(await Parse.Cloud.run("GetDegreeData", param));
                    param = {"HouseID" : student.StudentHouseIDPointer};
                    student["StudentHouse"] = JSON.parse(await Parse.Cloud.run("GetHouseData", param));
                    param = {"StatusTitleID" : student.StudentStatusTitleIDPointer};
                    student["StatusTitleData"] = JSON.parse(await Parse.Cloud.run("GetStatusTitleData", param));

                    var EquippedCosmeticsData = [];
                    for(const cosmeticID of student.EquippedCosmetics){
                        param = {
                            "CosmeticID" : cosmeticID,
                        }
                        EquippedCosmeticsData.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", param)));
                    }
                    student["EquippedCosmeticsData"] = EquippedCosmeticsData;
                    this.Students.push(student);
                    
                    /*
                        This is replaced since this is loading all data of the student, just do this upon selecting
                        this.Students.push(JSON.parse(await Parse.Cloud.run("GetStudentData", param)));
                    */
                }
            },
            async getStatusTitles(){
                const res = JSON.parse(await Parse.Cloud.run("GetStatusTitles"));
                this.StatusTitles = res;
            },
            //Student functions
            async selectStudent(student){
                if(this.SelectedStudentID !== student.objectId){
                    this.SelectedStudentID = student.objectId;
                    this.StudentFirstName = student.FirstName;
                    this.StudentMiddleName = student.MiddleName;
                    this.StudentLastName = student.LastName;
                    this.StudentContactNum = student.ContactNumber;
                    this.StudentEmail = student.Email;
                    this.StudentDegreeIDPointer = student.StudentDegreeIDPointer;
                    this.StudentUnitIDPointer = student.StudentUnitIDPointer;
                    this.StudentUserName = student.UserName;
                    this.StudentAddress = student.Address;
                    this.StudentSchoolID = student.SchoolID;
                    this.StudentYearLevel = student.YearLevel;
                    this.StudentStatusTitleData = student.StatusTitleData;
                    this.StudentCoursesIDPointer = student.StudentCoursesIDPointer;
                    this.StudentEquippedCosmeticsData = student.EquippedCosmeticsData;
                    this.StudentData = student;
                    this.openStudent = 1;

                    //GetSelected student other data (badges and trophies)
                    var param = {"StudentID" : student.objectId};
                    var studentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
                    this.StudentAcquiredBadges = studentData.BadgesEarned;
                    this.StudentChosenTrophies = studentData.ChosenTrophiesData;
                    this.StudentHouseData = student.StudentHouse;

                    //Fix Chosen Trophies
                    for(let i = 0; i < 3; ++i){
                        if(!this.StudentChosenTrophies[i]){
                            this.StudentChosenTrophies[i] = null;
                        }
                    }

                    //Fix Acquired Badges
                    this.StudentAcquiredBadges.slice(0, 5);
                    for(let i = 0; i < 5; ++i){
                        if(!this.StudentAcquiredBadges[i]){
                            this.StudentAcquiredBadges[i] = null;
                        }
                    }
                    //Sort data by date rewarded(not sure)
                    this.StudentAcquiredBadges.sort(function(first, second) {
                        if(first === null || second === null) return false;
                        return first.DateRewarded > second.DateRewarded;
                    });
                    this.getBadges();
                }
                
            },
            resetSelectedStudent(){
                this.SelectedStudentID = "";
                this.StudentFirstName = "";
                this.StudentMiddleName = "";
                this.StudentLastName = "";
                this.StudentContactNum = "";
                this.StudentEmail = "";
                this.StudentUnitIDPointer = "";
                this.StudentUserName = "";
                this.StudentAddress = "";
                this.StudentSchoolID = "";
                this.StudentYearLevel = 1;
                this.StudentEquippedCosmeticsData = [];
            },
            //Badge functions
            async getBadges(){
                var params = {"StudentID" : this.SelectedStudentID};
                const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredBadges", params));
                this.Badges = res;
            },
            selectBadge(badge){
                console.log(badge);
                if(this.SelectedBadgeID !== badge.objectId){
                    this.SelectedBadgeID = badge.objectId;
                    this.BadgeName = badge.BadgeName;
                    this.BadgeDescription = badge.BadgeDescription;
                    this.BadgePoints = badge.BadgePoints;
                    this.BadgeType = badge.BadgeType;
                    this.BadgeImage = badge.BadgeImage;
                    this.BadgeDesignInspiration = badge.BadgeDesignInspiration;
                }
                else{
                    this.resetSelectedBadge();
                }
            },
            resetSelectedBadge(){
                this.SelectedBadgeID = "";
                this.BadgeName = "";
                this.BadgeDescription = "";
                this.BadgePoints = "";
                this.BadgeType = "";
                this.BadgeImage = "";
                this.BadgeImageName = "";
                this.BadgeDesignInspiration = "";
            },
            //Give Badge
            async giveBadge(){
                var params = {"BadgeID" : this.SelectedBadgeID, "StudentID" : this.SelectedStudentID};
                console.log(params);
                await Parse.Cloud.run("RewardBadge", params);
                alert("Successfully Given Badge!");
                this.SelectedBadgeID = "";
                this.getBadges();
                this.selectStudent(this.StudentData);
            },
        },
        computed: {
            isDisabled() {
                return this.categoryName.length > 0;
            },

            studentQuery(){
                if(this.StudentSearch !== ""){
                    return this.Students.filter((student)=>{
                        var value;
                        switch(this.StudentSearchType) {
                            case "FirstName":
                                value = student.FirstName;
                                break;
                            case "LastName":
                                value = student.LastName;
                                break;
                            case "UserName":
                                value = student.UserName;
                                break;
                            case "SchoolID":
                                value = student.SchoolID;
                                break;
                            default:
                                // code block
                        }
                        return this.StudentSearch.toLowerCase().split(' ').every(v => value.toLowerCase().includes(v))
                    });
                }
                else{
                    return this.Students;
                }
            },
        },
        beforeMount(){
            if (this.currentUser) {
                this.getAccountData();
                this.getStudents();
                this.getStatusTitles();
            }
            else {
                window.location.href ='http://' + this.host;
            }
                
        },
    }
</script>