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
            <!--main header navigation bar-->
            <nav v-if="currentUser.get('AccountType') === ''" class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center h-[50px] z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full"></div>
                <a class="absolute left-[10px]" href="#"><img class="w-[130px] h-auto" src="" /></a> <!--../assets/img/logo/AscensionWhite.png-->
                <div class="absolute top-[15px] right-[10px] flex items-center justify-end cursor-pointer w-[170px] z-[9]">
                    <a class="text-white text-[13px] hover:text-gold active:text-gold_hover" href="#">SIGN IN</a>
                </div>
            </nav>
            <!--student header navigation bar-->
            <nav v-if="currentUser.get('AccountType') === 'Student'" class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center h-[50px] z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full"></div>
                <a class="absolute left-[10px]" href="#"><img class="w-[130px] h-auto" src="" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="StudentProfilePage">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="StudentQuestPage">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="StudentLeaderboardPage">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="StudentRequestPage">REQUEST</a></div>

                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">{{UserData.UserName}}</span>
                        <img v-if="UserData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="UserData.EquippedCosmeticsData[0].CosmeticImage" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="/AccountSettings">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a @click="logOut()" class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--giver header navigation bar-->
            <nav v-if="currentUser.get('AccountType') === 'Teacher' || currentUser.get('AccountType') === 'NT_Distributor'" class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center h-[50px] z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full"></div>
                <a class="absolute left-[10px]" href="#"><img class="w-[130px] h-auto" src="" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px] hover:text-gold" href="GiverStudentPage">STUDENT</a></div>
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
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a @click="logOut()" class="text-white text-[13px] hover:text-gold z-[9]" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>

            <!--main content-->
            <div class="absolute top-0 flex min-w-[1000px] w-full h-full pt-[50px]">
                <div class="inline-flex items-center justify-center w-full h-full">
                    <div class="flex flex-row max-w-[1366px] w-full h-full">
                        <!--overflow body for form-->
                        <div class="flex flex-col items-center justify-start gap-5 w-full h-full remove-scroll overflow-y-scroll">
                            <!--student form body-->
                            <form v-if="currentUser.get('AccountType') === 'Student'" class="flex flex-col items-start justify-start gap-3 max-[35%] w-[35%] h-auto py-[30px]">
                                <!--display profile-->
                                <div class="flex justify-center w-full">
                                    <div class="relative flex items-center justify-center w-[180px] h-[180px]">
                                        <img v-if="UserData.EquippedCosmeticsData !== undefined" class="rounded-full w-[130px] h-auto" v-bind:src="UserData.EquippedCosmeticsData[0].CosmeticImage" />
                                        <img v-if="UserData.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto w-[180px] h-auto" v-bind:src="UserData.EquippedCosmeticsData[1].CosmeticImage" />
                                    </div>
                                </div>
                                <div class="flex flex-col items-center w-full">
                                    <span class="text-gold text-[25px]">{{UserData.UserName}}</span>
                                    <span class="text-white text-[13px]">{{UserData.FirstName}} {{UserData.MiddleName}} {{UserData.LastName}}</span>
                                    <span class="text-white text-[13px]">{{UserData.Email}}</span>
                                    <span class="text-white text-[13px]">{{UserData.ContactNumber}}</span>
                                </div>
                                <!--change username, schoold id, address-->
                                <div class="flex items-center justify-center gap-3 flex-row w-full">
                                    <input v-model="UserData.UserName" class="bg-black/20 border-[1px] border-gray p-[10px] text-white text-[13px] w-[50%]" type="text" placeholder="Username" />
                                    <input v-model="UserData.SchoolID" class="bg-black/20 border-[1px] border-gray p-[10px] text-white text-[13px] w-[50%]" type="text" placeholder="School ID" />
                                </div>
                                <input v-model="UserData.Address" class="bg-black/20 border-[1px] border-gray p-[10px] text-white text-[13px] w-full" type="text" placeholder="Address" />
                                <!--change current degree-->
                                <select @change="onDegreeChange($event)" v-model="UserDegreeIndex" class="bg-black/20 border-[1px] border-gray p-[10px] w-full text-white text-[13px]">
                                    <option v-for="(degree, index) in Degrees" :key="degree" class="text-black text-[13px]" v-bind:name="index" v-bind:value="index">{{degree.DegreeName}}</option>
                                </select>
                                <!--add new course-->
                                <span class="text-white text-[13px]">SELECT COURSE</span>
                                <select v-model="UserCoursesIDToAdd" multiple class="flex flex-col border-[1px] border-gray bg-black/20 px-[10px] h-[200px] w-full remove-scroll overflow-y-scroll cursor-default">
                                    <template v-for="course in Courses" :key="course.objectId">
                                        <option v-if="(course.CourseDegreesIDPointers.indexOf(UserDegreeIDPointer) !== -1 || course.CourseDegreesIDPointers.length === 0 ) && UserCoursesIDPointer.indexOf(course.objectId) === -1" class="text-white text-[13px]" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                    </template>
                                </select>

                                <div class="flex justify-end w-full"><button @click="addUserCourses()" class="bg-blue text-white text-[12px] py-[5px] w-[80px]" type="button">ADD</button></div>

                                <!--student's current course (remove current course)-->
                                <span class="text-white text-[13px]">CURRENT COURSE</span>
                                <select v-model="UserCoursesIDToDelete" multiple class="flex flex-col border-[1px] border-gray bg-black/20 px-[10px] h-[200px] w-full remove-scroll overflow-y-scroll cursor-default">
                                    <template v-for="course in Courses" :key="course.objectId">
                                        <option v-if="UserCoursesIDPointer.indexOf(course.objectId) > -1" class="text-white text-[13px]" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                    </template>
                                </select>

                                <div class="flex justify-end w-full"><button @click="deleteUserCourses()" class="bg-blue text-white text-[12px] py-[5px] w-[80px]" type="button">REMOVE</button></div>
                                <!--save changes button-->
                                <div class="flex flex-row justify-center w-full">
                                    <button @click="saveChanges()" class="bg-blue text-white text-[12px] py-[10px] w-full" type="button">SAVE CHANGES</button>
                                </div>
                               
                            </form>
                            <!--teacher form body-->
                            <form v-if="currentUser.get('AccountType') === 'Teacher'" class="flex flex-col items-start justify-start gap-3 max-[35%] w-[35%] h-auto py-[30px]">
                                <!--display profile-->
                                <div class="flex flex-col items-center w-full">
                                    <span class="text-white text-[18px]">{{UserData.FirstName}} {{UserData.MiddleName}} {{UserData.LastName}}</span>
                                    <span class="text-white text-[13px]">{{UserData.Email}}</span>
                                    <span class="text-white text-[13px]">{{UserData.ContactNumber}}</span>
                                </div>
                                <!--change job title-->
                                <input v-model="UserData.JobTitle" class="bg-black/20 border-[1px] border-gray p-[10px] text-white text-[13px] w-full" type="text" placeholder="Job Title" />
                                <!--change current unit-->
                                <select v-model="UserUnitIDPointer" class="bg-black/20 border-[1px] border-gray p-[10px] w-full text-white text-[13px]">
                                    <option v-for="unit in Units" :key="unit" v-bind:value="unit.objectId" class="text-black text-[13px]">{{unit.UnitName}}</option>
                                </select>
                                <!--add new course-->
                                <span class="text-white text-[13px]">SELECT COURSE</span>
                                <select v-model="UserCoursesIDToAdd" multiple class="flex flex-col border-[1px] border-gray bg-black/20 px-[10px] h-[200px] w-full remove-scroll overflow-y-scroll cursor-default">
                                    <template v-for="course in Courses" :key="course.objectId">
                                        <option v-if="UserCoursesIDPointer.indexOf(course.objectId) === -1" class="text-white text-[13px]" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                    </template>
                                </select>
                                <div class="flex justify-end w-full"><button @click="addUserCourses()" class="bg-blue text-white text-[12px] py-[5px] w-[80px]" type="button">ADD</button></div>

                                <!--giver's current course (remove current course)-->
                                <span class="text-white text-[13px]">CURRENT COURSE</span>
                                <select v-model="UserCoursesIDToDelete" multiple class="flex flex-col border-[1px] border-gray bg-black/20 px-[10px] h-[200px] w-full remove-scroll overflow-y-scroll cursor-default">
                                    <template v-for="course in Courses" :key="course.objectId">
                                        <option v-if="UserCoursesIDPointer.indexOf(course.objectId) > -1" class="text-white text-[13px]" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                    </template>
                                </select>
                                <div class="flex justify-end w-full"><button @click="deleteUserCourses()" class="bg-blue text-white text-[12px] py-[5px] w-[80px]" type="button">REMOVE</button></div>
                                <!--save changes button-->
                                <div class="flex flex-row justify-center w-full">
                                    <button @click="saveChanges()" class="bg-blue text-white text-[12px] py-[10px] w-full" type="button">SAVE CHANGES</button>
                                </div>
                               
                            </form>
                            <!--nt-distributor form body-->
                            <form v-if="currentUser.get('AccountType') === 'NT_Distributor'" class="flex flex-col items-start justify-start gap-3 max-[35%] w-[35%] h-auto py-[30px]">
                                <!--display profile-->
                                <div class="flex flex-col items-center w-full">
                                    <span class="text-white text-[18px]">{{UserData.FirstName}} {{UserData.MiddleName}} {{UserData.LastName}}</span>
                                    <span class="text-white text-[13px]">{{UserData.Email}}</span>
                                    <span class="text-white text-[13px]">{{UserData.ContactNumber}}</span>
                                </div>
                                <!--change job title-->
                                <input v-model="UserData.JobTitle" class="bg-black/20 border-[1px] border-gray p-[10px] text-white text-[13px] w-full" type="text" placeholder="Job Title" />
                                <!--change current unit-->
                                <select v-model="UserUnitIDPointer" class="bg-black/20 border-[1px] border-gray p-[10px] w-full text-white text-[13px]">
                                    <option v-for="unit in Units" :key="unit" v-bind:value="unit.objectId" class="text-black text-[13px]">{{unit.UnitName}}</option>
                                </select>
                                <!--save changes button-->
                                <div class="flex flex-row justify-center w-full">
                                    <button @click="saveChanges()" class="bg-blue text-white text-[12px] py-[10px] w-full" type="button">SAVE CHANGES</button>
                                </div>
                               
                            </form>
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
                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                UserData: [],
                Degrees: [],
                Courses: [],
                Units: [],

                //Need UserDegreeIndex and LastDegreeIndex to roll back to last Degree upon changing if there are courses not enrolled in that degreee
                UserDegreeIndex: '',
                UserLastDegreeIndex: '',
                UserDegreeIDPointer: '',

                UserUnitIDPointer: '',
                UserCoursesIDPointer: [],
                UserCoursesData: [],
                UserCoursesIDToAdd: [],
                UserCoursesIDToDelete: [],
            }
        },

        methods: {
            //===========FRONTEND FUNCTIONS===============
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            onDegreeChange(event){
                this.selectDegree(event.target.value);
            },

            async selectDegree(degreeIndex){
                var lastUserDegreeIDPointer = this.UserDegreeIDPointer;
                this.UserDegreeIDPointer = this.Degrees[degreeIndex].objectId;
                this.UserUnitIDPointer = this.Degrees[degreeIndex].DegreeUnitIDPointer;
                await this.getCourses();
                //Checks if selected courses are valid
                if(this.currentUser.get("AccountType") === "Student"){
                    console.log("YPE");
                    if(!this.checkIfSelectedCoursesAreValid()){
                        alert("Please remove courses that are not in that degree");
                        this.UserDegreeIndex = this.UserLastDegreeIndex;
                        this.UserDegreeIDPointer = lastUserDegreeIDPointer;
                        this.getCourses();
                    }
                }
                this.UserLastDegreeIndex = this.UserDegreeIndex;
            },
            selectUnit(UnitID){
                this.UserUnitIDPointer = UnitID;
            },

            //==========BACKEND FUNCTIONS=================
            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },

            checkIfSelectedCoursesAreValid(){
                console.log(this.UserCoursesIDPointer, "IS VALID", this.Courses);
                for(const course of this.UserCoursesIDPointer){
                    if(this.Courses.map(function(e) { return e.objectId; }).indexOf(course) === -1){
                        return false;
                    }
                }
                return true;
            },
            
            addUserCourses(){
                this.UserCoursesIDPointer = this.UserCoursesIDPointer.concat(this.UserCoursesIDToAdd);
            },

            deleteUserCourses(){
                for(const e of this.UserCoursesIDToDelete){
                    var index = this.UserCoursesIDPointer.indexOf(e);
                    if (index > -1){
                        this.UserCoursesIDPointer.splice(index, 1);
                        break;
                    }
                }
            },

            async getAccountData(){
                var params = {}
                if(this.currentUser.get("AccountType") === "Student"){
                    params = {"StudentID" : this.currentUser.get("AccountID")};
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetStudentData", params));
                    this.UserCoursesIDPointer = this.UserData.StudentCoursesIDPointer;
                    this.UserDegreeIDPointer = this.UserData.StudentDegreeIDPointer;
                    await this.getDegrees();
                    this.UserDegreeIndex = this.Degrees.map(function(e) { return e.objectId; }).indexOf(this.UserDegreeIDPointer);
                    this.UserLastDegreeIndex = this.UserDegreeIndex;
                    this.getCourses();
                }
                else if(this.currentUser.get("AccountType") === "Teacher"){
                    params = {"TeacherID" : this.currentUser.get("AccountID")};
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetTeacherData", params));
                    this.getUnits("Department");
                    this.getCourses();
                    this.UserUnitIDPointer = this.UserData.TeacherUnitIDPointer;
                    this.UserCoursesIDPointer = this.UserData.TeacherCoursesIDPointer;
                    this.UserDegreeIDPointer = this.UserData.TeacherDegreeIDPointer;
                    
                }
                else if(this.currentUser.get("AccountType") === "NT_Distributor"){
                    params = {"NT_DistributorID" : this.currentUser.get("AccountID")};
                    this.UserData = JSON.parse(await Parse.Cloud.run("GetNT_DistributorData", params));
                    this.getUnits("Office");
                    this.UserUnitIDPointer = this.UserData.NT_DistributorUnitIDPointer;
                }
            },
            
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
                var params = {};
                if(this.currentUser.get("AccountType") === "Student"){
                    params = {
                        "CourseDegreeID" : this.UserDegreeIDPointer,
                    };
                }
                const res = JSON.parse(await Parse.Cloud.run("GetCourses", params));
                this.Courses = res;
            },

            async saveChanges(){
                var params = {};
                if(this.currentUser.get("AccountType") === "Student"){
                    params = {
                        "StudentID" : this.currentUser.get("AccountID"),
                        "UserName" : this.UserData.UserName,
                        "SchoolID" : this.UserData.SchoolID,
                        "Address" : this.UserData.Address,
                        "StudentDegreeIDPointer" : this.UserDegreeIDPointer,
                        "StudentCoursesIDPointer" : this.UserCoursesIDPointer,
                    }
                    await Parse.Cloud.run("EditStudent", params);
                    alert("Changes Saved!");
                }
                else if(this.currentUser.get("AccountType") === "Teacher"){
                    params = {
                        "TeacherID" : this.currentUser.get("AccountID"),
                        "JobTitle" : this.UserData.JobTitle,
                        "TeacherUnitIDPointer" : this.UserUnitIDPointer,
                        "TeacherDegreeIDPointer" : this.UserDegreeIDPointer,
                        "TeacherCoursesIDPointer" : this.UserCoursesIDPointer,
                    }
                    await Parse.Cloud.run("EditTeacher", params);
                    alert("Changes Saved!");
                }
                else if(this.currentUser.get("AccountType") === "NT_Distributor"){
                    params = {
                        "NT_DistributorID" : this.currentUser.get("AccountID"),
                        "JobTitle" : this.UserData.JobTitle,
                        "NT_DistributorUnitIDPointer" : this.UserUnitIDPointer,
                    }
                    await Parse.Cloud.run("EditNT_Distributor", params);
                    alert("Changes Saved!");
                }
            },
        },

        beforeMount(){
            if (this.currentUser) {
                this.getAccountData();
            }
            else {
                window.location.href ='http://' + this.host;
            }

        },

    }
</script>