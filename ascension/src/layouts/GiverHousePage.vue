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
                            <span class="text-[15px] text-white">Select Badge</span>
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
                                    <div v-for="badge in UnacquiredHouseBadgesGive" :key="badge.objectId" v-bind:value="badge.objectId" 
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
                                <button @click="giveHouseBadge()" class="bg-blue text-white text-[12px] w-full h-[10%] hover:bg-blue_hover active:bg-blue_active">GIVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--giver navigation bar-->
            <nav v-if="currentUser.get('AccountType') === 'Teacher' || currentUser.get('AccountType') === 'NT_Distributor'" class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center h-[50px] z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full"></div>
                <a class="absolute left-[10px]" href="#"><img class="w-[130px] h-auto" src="../assets/img/logo/AscensionWhite.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverStudentPage">STUDENT</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold z-[9]"><a class="text-gold text-[13px]" href="GiverHousePage">HOUSE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverLeaderboardPage">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverRequestPage">REQUEST</a></div>

                <details class="absolute top-[15px] right-[10px] w-[170px] z-[9]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[13px]">{{UserData.FirstName}}</span>
                    </summary>
                    <div class="relative bg-black/20 border-[1px] mt-[22px] border-gray z-[9]">
                        <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[13px] hover:text-gold z-[9]" href="AccountSettings">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a @click="logOut()" class="text-white text-[13px] hover:text-gold z-[9]" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--main content-->
            <div class="absolute top-0 min-w-[1000px] min-h-[600px] w-full h-[100vh] pt-[80px] pb-[35px]">
                <!--house section-->
                <div class="flex flex-col items-center justify-start gap-3 w-full h-full">
                    <!--search bar and sorter-->
                    <form class="flex flex-row items-center justify-start gap-5 max-h-[35px] w-[80%] h-[7%]">
                        <!--search bar-->
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[200px] px-[10px]" type="search" placeholder="Search house..." />
                        <div class="flex flex-row items-center w-auto h-full gap-5">
                            <span class="text-[12px] text-white">Search By:</span>
                            <select class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[150px] px-[10px]">
                                <option class="text-black">Name</option>
                                <option class="text-black">Points</option>
                                <option class="text-black">No. of Members</option>
                            </select>
                        </div>
                    </form>
                    <!--house list-->
                    <div class="flex flex-row items-center justify-center gap-3 w-[80%] h-[93%]">
                        <!--house list-->
                        <div class="flex flex-col w-full h-full">
                            <!--house list head container-->
                            <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray max-h-[40px] w-full h-[7%] bg-black/50">
                                <!--house leaderboard head row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                    <div class="flex items-center justify-center w-[35%] h-full text-white text-[12px]">NAME</div>
                                    <div class="flex items-center justify-center w-[35%] h-full text-white text-[12px]">POINTS</div>
                                    <div class="flex items-center justify-center w-[19%] h-full text-white text-[12px]">MEMBERS</div>
                                    <div class="flex items-center justify-center w-[11%] h-full text-white text-[12px]">ACTION</div>
                                </li>
                            </ul>
                            <!--house list body-->
                            <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[93%] bg-black/20 overflow-y-scroll">
                                <!--house list row-->
                                <li v-for="house in Houses" :key="house" class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full border-b-[1px] border-gray">
                                    <!--house name and banner-->
                                    <div class="flex items-center justify-start gap-3 w-[35%] h-full">
                                        <!--image-->
                                        <div class="relative w-[40px] h-full flex items-center justify-center">
                                            <img class="w-[35px] h-auto" v-bind:src="house.HouseBanner" />
                                        </div>
                                        <!--text-->
                                        <span class="text-white text-[15px]">{{house.HouseName}}</span>
                                    </div>
                                    <!--house points-->
                                    <div class="flex items-center justify-center w-[35%] h-full"><span class="text-white text-[13px]">{{house.HouseXP}}</span></div>
                                    <!--house members-->
                                    <div class="flex items-center justify-center w-[19%] h-full"><span class="text-white text-[13px]">{{house.HousePopulation}}</span></div>
                                    <!--give badge to house button-->
                                    <div class="flex items-center justify-center w-[11%] h-full">
                                        <button @click="selectHouse(house.objectId)" class="bg-blue text-white text-[12px] hover:bg-blue_hover w-[100px] py-[8px] active:bg-blue_active" v-on:click="viewPopUpTab(true)">GIVE BADGE</button>
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
                selectedItem: false,

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host: window.location.host,

                UserData: [],

                //Containers
                Houses: [],

                HousesGive : [],
                UnacquiredHouseBadgesGive : [],
                SelectedHouseGive : '',
                SelectedHouseBadgeGive : '',

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
                SelectedBadgeInfo : '',
                SelectedHouseBadge : '',
                SelectedHouseBadgeInfo : '',
            }
        },
        methods: {
            viewItem: function (itemName) {
                this.selectedItem = itemName
            },
            viewPopUpTab: function (bool) {
                this.activePopUpTab = bool
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
            async getHouses(){
                const res = JSON.parse(await Parse.Cloud.run("GetHouses"));
                this.Houses = res;

                //Add house banner
                for(var house of this.Houses){
                    var params = {"HouseID" : house.objectId};
                    const data = JSON.parse(await Parse.Cloud.run("GetHouseData", params));
                    house["HouseBanner"] = data.HouseBanner;
                }
            },
            //Badge functions
            async getUnacquiredHouseBadges(){
                var params = {"HouseID" : this.SelectedHouseGive};
                const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredHouseBadges", params));
                this.UnacquiredHouseBadgesGive = res;
            },
            async selectHouse(id){
                this.SelectedHouseGive = id;
                this.getUnacquiredHouseBadges();
            },
            async getHousesGive(){
                const res = JSON.parse(await Parse.Cloud.run("GetHouses"));
                this.HousesGive = res;
            },
            selectHouseBadgeToGive(id){
                this.SelectedHouseBadge = id;
            },
            async giveHouseBadge(){
                var params = {"BadgeID" : this.SelectedBadgeID, "HouseID" : this.SelectedHouseGive};
                await Parse.Cloud.run("RewardHouseBadge", params);
                alert("Successfully Given House Badge!");
                this.getUnacquiredHouseBadges();
                this.SelectedHouseBadgeGive = "";
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
                var params = {"BadgeID" : this.SelectedBadgeID, "HouseID" : this.SelectedHouseID};
                console.log(params);
                await Parse.Cloud.run("RewardBadge", params);
                alert("Successfully Given Badge!");
                this.SelectedBadgeID = "";
                this.getUnacquiredBadges();
            },
        },
        beforeMount(){
            if (this.currentUser) {
                this.getAccountData();
                this.getHouses();
            }
            else {
                window.location.href ='http://' + this.host;
            }
                
        },
    }
</script>