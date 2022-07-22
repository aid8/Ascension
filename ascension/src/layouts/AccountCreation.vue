<template>
    <span>First Name: </span>
    <input v-model="FirstName" type="text"><br>
    <span>Middle Name: </span>
    <input v-model="MiddleName" type="text"><br>
    <span>Last Name: </span>
    <input v-model="LastName" type="text"><br>
    <span>Email: </span>
    <input v-model="Email" type="text"><br>
    <span>Contact: </span>
    <input v-model="ContactNumber" type="text"><br>
    <br>

    <p> What are you? </p>
    <input type="radio" id="student" value="Student" v-model="userType" />
    <label for="student">Student</label>
    <input type="radio" id="teacher" value="Teacher" v-model="userType" />
    <label for="teacher">Teacher</label>
    <input type="radio" id="nt_distributor" value="NT_Distributor" v-model="userType" />
    <label for="nt_distributor">Non-teaching Distributor</label>
    
    <div v-if="userType === 'Student'">
        <br>
        <span>UserName: </span>
        <input v-model="UserName" type="text"><br>
        <span>Address: </span>
        <input v-model="Address" type="text"><br>
        <span>SchoolID: </span>
        <input v-model="SchoolID" type="text"><br>
        <span>YearLevel: </span>
        <input v-model="YearLevel" type="number"><br>
        <!--
        <h3>Select Department</h3>
        ===========EXAMPLE OF SELECTING DEGREE DEPENDING ON SELECTED DEPARTMENT============
        <button @click="getDepartments()">Show Departments</button>
        <ul>
            <li v-for="department in Departments" :key="department">{{department.UnitName}} <button @click="selectUnit(department.objectId)">Select</button> </li>
        </ul>
        <p>Selected DepartmentID: {{StudentUnitIDPointer}}</p>

        <h3>Select Degree</h3>
        <button @click="getDegrees(StudentUnitIDPointer)">Show Degrees</button>
        <ul>
            <li v-for="degree in Degrees" :key="degree">{{degree.DegreeName}} <button @click="selectDegree(degree.objectId)">Select</button> </li>
        </ul>
        <p>Selected DegreeID: {{StudentDegreeIDPointer}}</p>
        -->

        <h3>Select Degree</h3>
        <button @click="getDegrees()">Show Degrees</button>
        <ul>
            <li v-for="degree in Degrees" :key="degree">{{degree.DegreeName}} <button @click="selectDegree(degree.objectId, degree.DegreeUnitIDPointer)">Select</button> </li>
        </ul>
        <p>Selected DegreeID: {{StudentDegreeIDPointer}}</p>
        <p>Selected UnitID: {{StudentUnitIDPointer}}</p>

        <h3>Select Courses</h3>
        <button @click="getCourses()">Show Courses</button>
        <ul>
            <li v-for="course in Courses" :key="course">{{course.CourseName}} <button @click="selectCourse(course.objectId)">Select</button> <button @click="removeCourse(course.objectId)">Remove</button> </li>
        </ul>
        <p>Selected Courses: {{StudentCoursesIDPointer}}</p>
    </div>
    
    <div v-else-if="userType === 'Teacher'">
        <br>
        <span>JobTitle: </span>
        <input v-model="JobTitle" type="text"><br>
        
        <h3>Select Unit</h3>
        <button @click="getUnits('Department')">Show Units</button>
        <ul>
            <li v-for="unit in Units" :key="unit">{{unit.UnitName}} <button @click="selectUnit(unit.objectId)">Select</button> </li>
        </ul>
        <p>Selected UnitID: {{TeacherUnitIDPointer}}</p>

        <h3>Select Courses</h3>
        <button @click="getCourses()">Show Courses</button>
        <ul>
            <li v-for="course in Courses" :key="course">{{course.CourseName}} <button @click="selectCourse(course.objectId)">Select</button> <button @click="removeCourse(course.objectId)">Remove</button> </li>
        </ul>
        <p>Selected Courses: {{TeacherCoursesIDPointer}}</p>
    </div>

    <div v-else-if="userType === 'NT_Distributor'">
        <br>
        <span>JobTitle: </span>
        <input v-model="JobTitle" type="text"><br>
        
        <h3>Select Unit</h3>
        <button @click="getUnits('Office')">Show Units</button>
        <ul>
            <li v-for="unit in Units" :key="unit">{{unit.UnitName}} <button @click="selectUnit(unit.objectId)">Select</button> </li>
        </ul>
        <p>Selected UnitID: {{NT_DistributorUnitIDPointer}}</p>
    </div>
    <br>
    <button @click="saveProfile()"> Save Profile </button>
</template>

<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                userType: '',
                FirstName: Parse.User.current().get("firstname"),
                MiddleName: '',
                LastName: Parse.User.current().get("lastname"),
                Email: Parse.User.current().get("email"),
                ContactNumber: '',
                UserName: '',
                Address: '',
                SchoolID: '',
                YearLevel: null,
                StudentUnitIDPointer: '',
                StudentDegreeIDPointer: '',
                StudentCoursesIDPointer: [],
                JobTitle: '',
                TeacherUnitIDPointer: '',
                TeacherCoursesIDPointer: [],
                NT_DistributorUnitIDPointer: '',

                Units: [],
                Degrees: [],
                Courses: [],
            }
        },
        components:{
           
        },
        async beforeMount(){
            var currentUser = Parse.User.current();
            if (currentUser) {
                console.log("Logged in");
                console.log(currentUser);
            }
            else{
                console.log("User is not logged in");
            }
        },
        methods:{
            async saveProfile(){
                var params = {
                    "FirstName": this.FirstName,
                    "MiddleName": this.MiddleName,
                    "LastName": this.LastName,
                    "Email" : this.Email,
                    "ContactNumber" : this.ContactNumber,
                    "RegisterDate" : "datetoday",
                }
                if(this.userType == "Student"){
                    params["UserName"] = this.UserName;
                    params["SchoolID"] = this.SchoolID;
                    params["Address"] = this.Address;
                    params["YearLevel"] = this.YearLevel;
                    params["StudentUnitIDPointer"] = this.StudentUnitIDPointer;
                    params["StudentDegreeIDPointer"] = this.StudentDegreeIDPointer;
                    params["StudentCoursesIDPointer"] = this.StudentCoursesIDPointer;
                    await Parse.Cloud.run("AddStudent", params);
                }
                else if(this.userType == "Teacher"){
                    params["JobTitle"] = this.JobTitle;
                    params["TeacherUnitIDPointer"] = this.TeacherUnitIDPointer;
                    params["TeacherCoursesIDPointer"] = this.TeacherCoursesIDPointer;
                    await Parse.Cloud.run("AddTeacher", params);
                }
                else if(this.userType == "NT_Distributor"){
                    params["JobTitle"] = this.JobTitle;
                    params["NT_DistributorUnitIDPointer"] = this.NT_DistributorUnitIDPointer;
                    await Parse.Cloud.run("AddNT_Distributor", params);
                }
                alert("Added " + this.userType);
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
                var params = {
                    "CourseDegreeID" : this.StudentDegreeIDPointer,
                };
                if(this.userType == "Student"){
                    params["CourseDegreeID"] = this.StudentDegreeIDPointer;
                }
                else{
                    params = {};
                }
                const res = JSON.parse(await Parse.Cloud.run("GetCourses", params));
                this.Courses = res;
            },

            selectDegree(DegreeID, UnitID){
                if(this.userType == "Student"){
                    this.StudentDegreeIDPointer = DegreeID;
                    this.StudentUnitIDPointer = UnitID;
                }
            },
            selectCourse(CourseID){
                if(this.userType == "Student" && !this.StudentCoursesIDPointer.includes(CourseID)){
                    this.StudentCoursesIDPointer.push(CourseID);
                }
                else if(this.userType == "Teacher" && !this.TeacherCoursesIDPointer.includes(CourseID)){
                    this.TeacherCoursesIDPointer.push(CourseID);
                }
            },
            removeCourse(CourseID){
                var index
                if(this.userType == "Student"){
                    index = this.StudentCoursesIDPointer.indexOf(CourseID);
                    if (index > -1) {
                        this.StudentCoursesIDPointer.splice(index, 1);
                    }
                }
                else if(this.userType == "Teacher"){
                    index = this.TeacherCoursesIDPointer.indexOf(CourseID);
                    if (index > -1) {
                        this.TeacherCoursesIDPointer.splice(index, 1);
                    }
                }
            },
            selectUnit(UnitID){
                if(this.userType == "Teacher"){
                    this.TeacherUnitIDPointer = UnitID;
                }
                else if(this.userType == "NT_Distributor"){
                    this.NT_DistributorUnitIDPointer = UnitID;
                }
            }
        }
    }
</script>