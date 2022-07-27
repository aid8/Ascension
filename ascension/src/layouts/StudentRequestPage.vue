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
            <div class="absolute shadow-profile h-[100vh] w-[100vw]"></div>
            <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="h-[100vh] w-[100vw]" v-bind:src="StudentData.EquippedCosmeticsData[2].CosmeticImage" />
        </div>
        <main class="min-w-[1000px]">
            <!--header navigation bar-->
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
                <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentProfilePage">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentQuestPage">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentLeaderboardPage">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">REQUEST</a></div>
                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">{{StudentData.UserName}}</span>
                        <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="/AccountSettings">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><button @click="logOut()" class="text-white text-[12px] hover:text-gold">SIGN OUT</button></div>
                    </div>
                </details>
            </nav>
            
            <div class="absolute inset-y-0 inset-x-0 mx-auto min-w-[1000px] w-full h-[100%]">
                <div class="absolute inset-y-0 min-w-[100px] w-full h-full pt-[50px] pb-[50px]">
                    <div class="flex flex-row items-start justify-center gap-3 pt-[20px] min-h-[500px] w-full h-full">
                        <!--send request form-->
                        <div class="flex flex-col items-center justify-start w-[20%] min-h-[150px] h-full">
                            <form class="flex flex-col gap-5 w-full">
                                <legend class="text-white w-full">SEND REQUEST</legend>
                                <div class="h-auto w-full">
                                    <input @change="onProofFileSelected" class="border-[1px] border-gray bg-black/20 text-white text-[12px] cursor-pointer p-[10px] w-full" type="file" accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"/>
                                    <label class="text-[12px] text-white">Upload a proof of completion for your eligibility in obtaining a badge.</label>
                                </div>
                                <div class="h-auto w-full">
                                    <select v-model="SelectedGiver" class="border-[1px] border-gray bg-black/20 text-white text-[12px] p-[10px] w-full">
                                        <option hidden value="">Select Giver</option>
                                        <option v-for="giver in Givers" :key="giver" v-bind:value="giver">{{giver.FirstName}} {{giver.LastName}}</option>
                                    </select>
                                    <label class="text-[12px] text-white">Select a giver you want to send your request to.</label>
                                </div>
                                <input @click="submitRequest()" class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-full cursor-pointer" type="button" value="SUBMIT" />
                            </form>
                        </div>

                        <!--requests inbox-->
                        <div class="flex flex-col items-center justify-start w-[70%] min-h-[150px] h-full">
                            <nav class="flex flex-row gap-5 h-auto px-[20px] w-full">
                                <div class="h-full w-auto"><a class="text-white text-[13px] hover:text-gold" v-on:click="activeTab('checked')" v-bind:class="{'text-gold':openTab === 'checked'}" href="#">CHECKED</a></div>
                                <div class="h-full w-auto"><a class="text-white text-[13px] hover:text-gold" v-on:click="activeTab('submitted')" v-bind:class="{'text-gold':openTab === 'submitted'}" href="#">SUBMITTED</a></div>
                            </nav>

                            <!--checked requests-->
                            <ul class="flex flex-col bg-black/20 border-[1px] border-gray h-full w-full remove-scroll overflow-y-scroll" v-bind:class="{'flex': openTab === 'checked', 'hidden': openTab !== 'checked'}">
                                <li v-if="StudentAccomplishedRequests.length <= 0" class="flex flex-row px-[10px] py-[3px] border-b-[1px] border-gray w-full">
                                    <div class="flex flex-row items-center justify-start gap-2 w-[60%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <span class="text-white text-[12px]">You don't have any approved/declined request.</span>
                                    </div>
                                </li>
                                <template v-if="StudentAccomplishedRequests.length > 0">
                                    <li v-for="request in StudentAccomplishedRequests" :key="request" class="flex flex-row px-[10px] py-[3px] border-b-[1px] border-gray w-full">
                                        <div class="flex flex-col items-start justify-center w-[30%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                            <strong class="text-white text-[13px]">{{request.GrantorData.FirstName}} {{request.GrantorData.LastName}}</strong>
                                            <span class="text-white text-[12px]">{{request.GrantorData.UnitData.UnitName}}</span>
                                        </div>
                                        <div class="flex flex-row items-center justify-start gap-2 w-[60%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                            <template v-if="request.RequestStatus === 'Approved'">
                                                <span class="text-white text-[12px]">Your request has been approved. You received </span>
                                                <img class="w-[40px] h-auto" v-bind:src="request.RewardData.BadgeImage" />
                                                <span class="text-white text-[12px]">"{{request.RewardData.BadgeName}}" badge.</span>
                                                <span class="text-white text-[12px]">You can now find this badge in your collection.</span>
                                            </template>
                                            <template v-if="request.RequestStatus === 'Denied'">
                                                <span class="text-white text-[12px]">Your request has been denied. Reason: {{request.RequestFeedback}}</span>
                                            </template>
                                        </div>
                                        <div class="flex flex-col items-end justify-center w-[10%] h-full"><span class="text-white text-[12px]">{{request.DateRequested}}</span></div>
                                    </li>
                                </template>
                            </ul>

                            <!--submitted requests-->
                            <ul class="flex flex-col bg-black/20 border-[1px] border-gray h-full w-full remove-scroll overflow-y-scroll" v-bind:class="{'flex': openTab === 'submitted', 'hidden': openTab !== 'submitted'}">
                                <li v-if="StudentPendingRequests.length <= 0" class="flex flex-row px-[10px] py-[3px] border-b-[1px] border-gray w-full">
                                    <div class="flex flex-row items-center justify-start gap-2 w-[60%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <span class="text-white text-[12px]">You don't have any pending request.</span>
                                    </div>
                                </li>
                                <template v-if="StudentPendingRequests.length > 0">
                                    <li v-for="request in StudentPendingRequests" :key="request" class="flex flex-row px-[10px] py-[10px] border-b-[1px] border-gray w-full">
                                        <div class="flex flex-row items-center justify-start gap-2 w-[75%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                            <span class="text-white text-[12px]"><i class="fa-solid fa-paper-plane"></i> Request submitted to: <b>{{request.GrantorData.FirstName}} {{request.GrantorData.LastName}}</b></span>
                                        </div>
                                        <div class="flex flex-row items-center justify-center gap-2 w-[15%] h-full">
                                            <a class="text-gold text-[12px]" v-bind:href="request.ProofFile">Proof of eligibility</a>
                                        </div>
                                        <div class="flex flex-col items-end justify-center w-[10%] h-full"><span class="text-white text-[12px]">{{request.DateRequested}}</span></div>
                                    </li>
                                </template>
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
                openTab: 'checked', //checked, submitted

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                StudentData: {},
                StudentRequests: [],
                StudentPendingRequests: [],
                StudentAccomplishedRequests: [],
                Givers: [],

                SelectedGiver: '',
                ProofFile: '',
                ProofName: '',
            }
        },
        methods: {
            //===========FRONTEND FUNCTIONS===============
            activeTab: function (tabName) {
                this.openTab = tabName
            },

            //==========BACKEND FUNCTIONS=================
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            },

            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },

            async getAccountData(){
                //Get Student Account
                var param = {"StudentID" : this.currentUser.get("AccountID")};
                this.StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
            },

            async getRequests(){
                //Get Student Requests
                var param = {"StudentID" : this.currentUser.get("AccountID")};
                this.StudentRequests = [];
                this.StudentPendingRequests = [];
                this.StudentAccomplishedRequests = [];
                var requests = JSON.parse(await Parse.Cloud.run("GetStudentRequests", param));
                for(var req of requests){
                    param = {"RequestID" : req.objectId, "DataOfGrantor" : true,};
                    var data = JSON.parse(await Parse.Cloud.run("GetRequestData", param));
                    this.StudentRequests.push(data);
                    if(data.RequestStatus === "Pending"){
                        this.StudentPendingRequests.push(data);
                    }
                    else{
                        this.StudentAccomplishedRequests.push(data);
                    }
                }
            },

            async getGivers(){
                this.Givers = [];
                var teachers = JSON.parse(await Parse.Cloud.run("GetTeachers"));
                for(var teacher of teachers){
                    teacher["GiverType"] = "Teacher";
                }
                var nt_distributors = JSON.parse(await Parse.Cloud.run("GetNT_Distributors"));
                for(var nt_distributor of nt_distributors){
                    nt_distributor["GiverType"] = "NT_Distributor";
                }
                this.Givers = this.Givers.concat(teachers, nt_distributors);
            },

            async submitRequest(){
                var params = {
                    "ToRequestID" : this.SelectedGiver.objectId,
                    "ToRequestType" : this.SelectedGiver.GiverType,
                    "StudentIDPointer" : this.currentUser.get("AccountID"),
                    "ProofFile" : this.ProofFile,
                    "ProofName" : this.ProofName,
                }
                await Parse.Cloud.run("AddRequest", params);
                alert("SUBMITTED REQUEST!");
                this.getRequests();
            },
            
            //Proof File
            async onProofFileSelected(e){
                var file = e.target.files[0];
                this.ProofName = file.name;
                this.getBase64(file).then(
                    data => this.ProofFile = data
                );
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
                this. getRequests();
                this.getGivers();
            }
            else{
                window.location.href ='http://' + this.host;
            }
        },

        
    }
</script>