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
    <label for="nt_distributor">Non Teaching Distributor</label>

    <div v-if="userType === 'Student'">
        <br>
        <span>YearLevel: </span>
        <input v-model="YearLevel" type="number"><br>
        
        <!--
        <h3>Select Department</h3>
        ===========EXAMPLE OF SELECTING DEGREE DEPENDING ON SELECTED DEPARTMENT============
        <button @click="getDepartments()">Show Departments</button>
        <ul>
            <li v-for="department in Departments" :key="department">{{department.UnitName}} <button @click="selectDepartment(department.objectId)">Select</button> </li>
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
    <br>
    <button @click="saveProfile()"> Save Profile </button>
</template>

<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                userType: '',
                FirstName: '',
                MiddleName: '',
                LastName: '',
                Email: '',
                ContactNumber: '',
                YearLevel: null,
                StudentUnitIDPointer: '',
                StudentDegreeIDPointer: '',
                StudentCoursesIDPointer: [],

                //Departments: [],
                Degrees: [],
                Courses: [],
            }
        },
        components:{
           
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
                    "YearLevel" : this.YearLevel,
                    "StudentUnitIDPointer" : this.StudentUnitIDPointer,
                    "StudentDegreeIDPointer" : this.StudentDegreeIDPointer,
                    "StudentCoursesIDPointer" : this.StudentCoursesIDPointer,
                }
                if(this.userType == "Student"){
                    await Parse.Cloud.run("AddStudent", params);
                }
                alert("Added " + this.userType);
            },

            async getDepartments(){
                var params = {
                    "UnitType" : "Department",
                };
                const res = JSON.parse(await Parse.Cloud.run("GetUnits", params));
                this.Departments = res;
            },

            async getDegrees(DepartmentID){
                var params = {
                    "DegreeDepartmentIDPointer" : DepartmentID,
                };
                const res = JSON.parse(await Parse.Cloud.run("GetDegrees", params));
                this.Degrees = res;
            },

            //Gets Courses Related/Relevant Only to Selected Degree
            async getCourses(){
                const res = JSON.parse(await Parse.Cloud.run("GetCourses"));
                let coursesToShow = []
                for(let i = 0; i < res.length; i++){
                    if(res[i].CourseDegreesIDPointers.length == 1){     //if Course is only related to one Degree
                        if(res[i].CourseDegreesIDPointers == this.StudentDegreeIDPointer){
                            coursesToShow.push(res[i])
                        }
                    } 
                    else if(res[i].CourseDegreesIDPointers.length > 1){ //if Course if related to more than 1 Degree
                        for(let j = 0; j < res[i].CourseDegreesIDPointers.length; j++){
                            let scan = res[i].CourseDegreesIDPointers.indexOf(this.StudentDegreeIDPointer) 
                            if(scan > -1){
                                coursesToShow.push(res[i])
                                break
                            }
                        }
                    }
                    else{   //if Course is not related to 1 Degree (Elective)
                        coursesToShow.push(res[i])
                    }
                }
                this.Courses = coursesToShow
            },

            /*
            selectDepartment(DepartmentID){
                this.StudentUnitIDPointer = DepartmentID;
            },*/

            selectDegree(DegreeID, UnitID){
                this.StudentDegreeIDPointer = DegreeID;
                this.StudentUnitIDPointer = UnitID;
            },

            selectCourse(CourseID){
                this.StudentCoursesIDPointer.push(CourseID);
            },

            removeCourse(CourseID){
                var index = this.StudentCoursesIDPointer.indexOf(CourseID);
                if (index > -1) {
                    this.StudentCoursesIDPointer.splice(index, 1);
                }
            },
        }
    }
</script>




