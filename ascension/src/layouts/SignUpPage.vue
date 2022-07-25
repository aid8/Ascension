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
        <main class="relative justify-center min-w-[1000px] h-[100vh]">
            <img class="absolute top-[10px] left-[10px] w-[80px] h-auto" src="../assets/img/logo/ccs-logo-white.png">
            <img class="absolute top-[10px] right-[10px] w-[80px] h-auto" src="../assets/img/logo/adnu-logo.png">
            <section class="flex items-center justify-center pt-[50px]">
                <form class="flex flex-col items-center justify-center gap-2 bg-black/20 w-[400px] border-[1px] border-gray px-[30px] py-[20px]">
                    <img class="w-[180px] py-[20px] h-auto" src="../assets/img/logo/text-logo-default.png" />
                    <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="First Name" v-model="FirstName" readonly/>
                    <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Middle Name" v-model="MiddleName"/>
                    <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Last Name" v-model="LastName" readonly/>
                    <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="email" placeholder="Email" v-model="Email" readonly/>
                    <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="tel" placeholder="Contact Number" v-model="ContactNumber" />
                    <div class="flex flex-row gap-3 items-center justify-center">
                        <input checked type="radio" id="student" v-on:click="showRole('student')" name='UserType' /><label for="student" class="text-[10px] text-white">STUDENT</label>
                        <input type="radio" id="teacher" v-on:click="showRole('teacher')" name='UserType' /><label  for="teacher" class="text-[10px] text-white">TEACHER</label>
                        <input type="radio" id="ntDistributor" v-on:click="showRole('ntDistributor')" name='UserType' /><label for="ntDistributor" class="text-[10px] text-white">NT DISTRIBUTOR</label>
                    </div>
                    
                    <!--student-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'student', 'flex': selectedRole === 'student'}">
                        <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Address" />
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Username" v-model="UserName"/>
                            <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="School ID" v-model="SchoolID" />
                            <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                                <option hidden>Year Level</option>
                                <option class="text-black" value="1">1</option>
                                <option class="text-black" value="2">2</option>
                                <option class="text-black" value="3">3</option>
                                <option class="text-black" value="4">4</option>
                                <option class="text-black" value="5">5</option>
                            </select>
                        </div>

                        <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden>Select Degree</option>
                            <option class="text-black">Degree Name</option>
                        </select>
                        
                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">SELECT COURSE</summary>
                            <div class="flex flex-row gap-2 border-gray border-b-[1px]"><input type="checkbox" /><label class="text-white text-[12px]">Course Name</label></div>
                            <div><button class="float-right mt-[10px] text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[5vw]">ADD</button></div>
                        </details>

                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">ADDED COURSE</summary>
                            <div class="flex flex-row gap-2 border-gray border-b-[1px]"><input type="checkbox" /><label class="text-white text-[12px]">Course Name</label></div>
                            <div><button class="float-right mt-[10px] text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[5vw]">REMOVE</button></div>
                        </details>
                        <input class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[100%]" type="submit" value="CONTINUE" />
                    </div>
                    <!--teacher-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'teacher', 'flex': selectedRole === 'teacher'}">
                        <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Job Title" />

                        <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden>Select Unit</option>
                            <option class="text-black">Unit Name</option>
                        </select>
                        
                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">SELECT COURSE</summary>
                            <div class="flex flex-row gap-2 border-gray border-b-[1px]"><input type="checkbox" /><label class="text-white text-[12px]">Course Name</label></div>
                            <div><button class="float-right mt-[10px] bg-blue text-white text-[10px] h-[30px] w-[5vw]">ADD</button></div>
                        </details>

                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">ADDED COURSE</summary>
                            <div class="flex flex-row gap-2 border-gray border-b-[1px]"><input type="checkbox" /><label class="text-white text-[12px]">Course Name</label></div>
                            <div><button class="float-right mt-[10px] bg-blue text-white text-[10px] h-[30px] w-[5vw]">REMOVE</button></div>
                        </details>
                        <input class="bg-blue text-white text-[10px] h-[30px] w-[100%]" type="submit" value="CONTINUE" />
                    </div>
                    <!--non teaching distributor-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'ntDistributor', 'flex': selectedRole === 'ntDistributor'}">
                        <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Job Title" />

                        <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden>Select Unit</option>
                            <option class="text-black">Unit Name</option>
                        </select>
                        <input class="bg-blue text-white text-[10px] h-[30px] w-[100%]" type="submit" value="CONTINUE" />
                    </div>
                </form>
            </section> 
            <footer class="w-full flex items-center justify-center text-white text-[12px] py-[20px]">
                <span>©Ascension from CCS • Ateneo de Naga University</span>
            </footer>
        </main>
    </body>
</template>

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css';

    export default {
        data(){
            return{
                //VARIABLES USED IN FRONT-END
                selectedRole: 'student', //student, teacher, ntDistributor
                userType: '',
                FirstName: Parse.User.current().get("firstname"),
                MiddleName: '',
                LastName: Parse.User.current().get("lastname"),
                Email: Parse.User.current().get("email"),
                ContactNumber: '',
                UserName: '',
                Address: '',
                SchoolID: '',
                YearLevel: '',

                //OTHER VARIABLES
                StaffEmails: [],
                

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,
            }
        },

        methods: {
            showRole: function (roleType) {
                this.selectedRole = roleType
            },
        },

        async beforeMount(){
            if (this.currentUser) {
                console.log("THERE IS A USER")
                //Preparing values of Teaching and NonTeaching Arrays (line 129 and 130)
                //For getting staff emails for User Type assignment
                //Change directory if needed
                var param = {"FilePath": "emails/staffEmails.json"};
                this.StaffEmails = await Parse.Cloud.run("GetStaffEmails", param)
                param = {
                    "teacherEmails": this.StaffEmails.teacherEmails,
                    "nt_DistributorEmails": this.StaffEmails.nt_DistributorEmails,
                    "email": this.Email,
                }
                this.selectedRole = await Parse.Cloud.run("IdentifyUserType", param)
                console.log(this.selectedRole)
                //Redirect to StudentHomePage if logged in and has data
                if(this.currentUser.get("AccountType") === "Student"){
                    window.location.href ='http://' + this.host + '/StudentHomePage';
                }
            }
        },

    }
</script>