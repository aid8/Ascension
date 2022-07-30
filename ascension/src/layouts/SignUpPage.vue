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
                        <input v-model="selectedRole" type="radio" id="student" v-on:click="showRole('Student')" name='UserType' value="Student"/><label for="student" class="text-[10px] text-white">STUDENT</label>
                        <input v-model="selectedRole" type="radio" id="teacher" v-on:click="showRole('Teacher')" name='UserType' value="Teacher"/><label  for="teacher" class="text-[10px] text-white">TEACHER</label>
                        <input v-model="selectedRole" type="radio" id="ntDistributor" v-on:click="showRole('NT_Distributor')" name='UserType' value="NT_Distributor" /><label for="ntDistributor" class="text-[10px] text-white">NT DISTRIBUTOR</label>
                    </div>
                    
                    <!--student-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'Student', 'flex': selectedRole === 'Student'}">
                        <input v-model="Address" class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Address" />
                        <div class="flex flex-row gap-2 items-center justify-center">
                            <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Username" v-model="UserName"/>
                            <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="School ID" v-model="SchoolID" />
                            <select v-model="YearLevel" class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                                <option hidden value="">Year Level</option>
                                <option class="text-black" value=1>1</option>
                                <option class="text-black" value=2>2</option>
                                <option class="text-black" value=3>3</option>
                                <option class="text-black" value=4>4</option>
                            </select>
                        </div>

                        <select @change="onDegreeChange($event)" v-model="StudentDegreeIDPointerIndex" class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden value="">Select Degree</option>
                            <option v-for="(degree, index) in Degrees" :key="degree" class="text-black" v-bind:name="index" v-bind:value="index">{{degree.DegreeName}}</option>
                        </select>
                        
                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">SELECT COURSE</summary>
                            <span class="text-white text-[12px]">HOLD CTRL TO SELECT MULTIPLE</span>
                            <select v-model="StudentCoursesIDPointer" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[340px] px-[10px]">
                                <template v-for="course in Courses" :key="course.objectId">
                                    <option v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                </template>
                            </select>
                        </details>

                        <input @click="saveProfile()" class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[100%]" type="button" value="CONTINUE" />
                    </div>
                    <!--teacher-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'Teacher', 'flex': selectedRole === 'Teacher'}">
                        <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Job Title" />

                        <select v-model="TeacherUnitIDPointer" class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden value="">Select Unit</option>
                            <option v-for="unit in Units" :key="unit" class="text-black" v-bind:value="unit.objectId">{{unit.UnitName}}</option>
                        </select>
                        
                        <details class="cursor-pointer w-full">
                            <summary class="text-white text-[12px]">SELECT COURSE</summary>
                            <span class="text-white text-[12px]">HOLD CTRL TO SELECT MULTIPLE</span>
                            <select v-model="TeacherCoursesIDPointer" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[340px] px-[10px]">
                                <template v-for="course in Courses" :key="course.objectId">
                                    <option v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                </template>
                            </select>
                        </details>

                        <input @click="saveProfile()" class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[100%]" type="button" value="CONTINUE" />
                    </div>
                    <!--non teaching distributor-->
                    <div class="flex flex-col items-center justify-center gap-2 w-full" v-bind:class="{'hidden': selectedRole !== 'NT_Distributor', 'flex': selectedRole === 'NT_Distributor'}">
                        <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full" type="text" placeholder="Job Title" />

                        <select v-model="NT_DistributorUnitIDPointer" class="bg-black/20 border-[1px] border-gray text-[12px] text-white p-[10px] w-full">
                            <option hidden value="">Select Unit</option>
                            <option v-for="unit in Units" :key="unit" class="text-black" v-bind:value="unit.objectId">{{unit.UnitName}}</option>
                        </select>
                        
                        <input @click="saveProfile()" class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-[100%]" type="button" value="CONTINUE" />
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
                selectedRole: 'Student', //Student, Teacher, NT_Distributor
                FirstName: Parse.User.current().get("firstname"),
                MiddleName: '',
                LastName: Parse.User.current().get("lastname"),
                Email: Parse.User.current().get("email"),
                ContactNumber: '',
                UserName: '',
                Address: '',
                SchoolID: '',
                YearLevel: '',
                StudentUnitIDPointer: '',
                StudentDegreeIDPointer: '',
                StudentDegreeIDPointerIndex: '',
                StudentCoursesIDPointer: [],

                //Giver Variables
                JobTitle: '',
                TeacherUnitIDPointer: '',
                TeacherCoursesIDPointer: [],
                NT_DistributorUnitIDPointer: '',

                CoursesIDToAdd: [],
                CoursesIDToDelete: [],

                //OTHER VARIABLES
                StaffEmails: [],
                Units: [],
                Degrees: [],
                Courses: [],

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,
            }
        },

        methods: {
            //===========FRONTEND FUNCTIONS===============
            showRole: function (roleType) {
                this.selectedRole = roleType
            },

            onDegreeChange(event){
                this.selectDegree(event.target.value);
            },

            checkIfDataIsIncomplete(){
                if(this.MiddleName === "" || this.ContactNumber === ""){
                    return true;
                }
                if(this.selectedRole === "Student"){
                    return (this.UserName === "" || this.SchoolID === "" || this.YearLevel === "" ||
                    this.StudentDegreeIDPointer === "" || this.Address === "");
                }
                else if(this.selectedRole === "Teacher"){
                    return (this.JobTitle === "" || this.TeacherUnitIDPointer === "");
                }
                else if(this.selectedRole === "NT_Distributor"){
                    return (this.JobTitle === "" || this.NT_DistributorUnitIDPointer === "");
                }
                return false;
            },

            //==========BACKEND FUNCTIONS=================
            async getUnits(type){
                var params = {
                    "UnitType" : type,
                };
                const res = JSON.parse(await Parse.Cloud.run("GetUnits", params));
                this.Units = res;
            },

            async getDegrees(UnitID){
                var params = {
                    "DegreeUnitIDPointer" : UnitID,
                };
                const res = JSON.parse(await Parse.Cloud.run("GetDegrees", params));
                this.Degrees = res;
            },

            //Gets Courses Related/Relevant Only to Selected Degree
            async getCourses(){
                var params = {
                    "CourseDegreeID" : this.StudentDegreeIDPointer,
                };
                if(this.selectedRole == "Student"){
                    params["CourseDegreeID"] = this.StudentDegreeIDPointer;
                }
                else{
                    params = {};
                }
                const res = JSON.parse(await Parse.Cloud.run("GetCourses", params));
                this.Courses = res;
            },

            selectDegree(degreeIndex){
                if(this.selectedRole == "Student"){
                    this.StudentDegreeIDPointer = this.Degrees[degreeIndex].objectId;
                    this.StudentUnitIDPointer = this.Degrees[degreeIndex].DegreeUnitIDPointer;
                    this.getCourses();
                }
                
            },
            selectUnit(UnitID){
                if(this.selectedRole == "Teacher"){
                    this.TeacherUnitIDPointer = UnitID;
                }
                else if(this.selectedRole == "NT_Distributor"){
                    this.NT_DistributorUnitIDPointer = UnitID;
                }
            },

            async saveProfile(){
                if(this.checkIfDataIsIncomplete()){
                    alert("Please fill out all details!");
                    return;
                }
                var params = {
                    "FirstName": this.FirstName,
                    "MiddleName": this.MiddleName,
                    "LastName": this.LastName,
                    "Email" : this.Email,
                    "ContactNumber" : this.ContactNumber,
                }
                if(this.selectedRole == "Student"){
                    params["UserName"] = this.UserName;
                    params["SchoolID"] = this.SchoolID;
                    params["Address"] = this.Address;
                    params["YearLevel"] = parseInt(this.YearLevel);
                    params["StudentUnitIDPointer"] = this.StudentUnitIDPointer;
                    params["StudentDegreeIDPointer"] = this.StudentDegreeIDPointer;
                    params["StudentCoursesIDPointer"] = this.StudentCoursesIDPointer;
                    await Parse.Cloud.run("AddStudent", params);
                }
                else if(this.selectedRole == "Teacher"){
                    params["JobTitle"] = this.JobTitle;
                    params["TeacherUnitIDPointer"] = this.TeacherUnitIDPointer;
                    params["TeacherCoursesIDPointer"] = this.TeacherCoursesIDPointer;
                    await Parse.Cloud.run("AddTeacher", params);
                }
                else if(this.selectedRole == "NT_Distributor"){
                    params["JobTitle"] = this.JobTitle;
                    params["NT_DistributorUnitIDPointer"] = this.NT_DistributorUnitIDPointer;
                    await Parse.Cloud.run("AddNT_Distributor", params);
                }
                alert("Added " + this.selectedRole);
                
                //Update user locally
                var currentUser = Parse.User.current();
                params = {"UserID" : currentUser.id};
                var updatedData = JSON.parse(await Parse.Cloud.run("GetUpdatedUserData", params));
                Parse.User.current().set("AccountType", updatedData.AccountType);
                Parse.User.current().set("AccountID", updatedData.AccountID);
                await Parse.User.current().save().then(()=>{
                    //refresh page
                    this.$router.go(0); 
                });
            },
        },

        async beforeMount(){
            console.log(this.currentUser);
            if (this.currentUser) {
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
                this.selectedRole = await Parse.Cloud.run("IdentifyUserType", param);
                if(this.selectedRole === "Student"){
                    this.getDegrees();
                }
                else if(this.selectedRole === "Teacher"){
                    this.getUnits("Department");
                    this.getCourses();
                }
                else if(this.selectedRole === "NT_Distributor"){
                    this.getUnits("Office");
                }
                //Redirect to StudentHomePage if logged in and has data
                if(this.currentUser.get("AccountType") === "Student"){
                    window.location.href ='http://' + this.host + '/StudentHomePage';
                }
                else if(this.currentUser.get("AccountType") === "Teacher" || this.currentUser.get("AccountType") === "NT_Distributor"){
                    window.location.href ='http://' + this.host + '/GiverStudentPage';
                }
            }
        },

    }
</script>