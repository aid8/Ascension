<template>
    <h1> Admin page </h1>

    <h3>Add Unit</h3>
    <span>UnitName: </span>
    <input v-model="UnitName" type="text"><br>
    <span>ContactNumber: </span>
    <input v-model="UnitContactNumber" type="Number"><br>
    <span>Unit Type: </span>
    <input type="radio" id="department" value="Department" v-model="UnitType" />
    <label for="department">Department</label>
    <input type="radio" id="office" value="Office" v-model="UnitType" />
    <label for="office">Office</label><br>
    <button @click="addUnit()">Add Unit</button>
    <hr>

    <h3>Add Degrees</h3>
    <span>DegreeName: </span>
    <input v-model="DegreeName" type="text"><br>
    <p>Select Unit/Department</p>
    <button @click="getUnits('Department')">Show Departments</button>
    <ul>
        <li v-for="department in Departments" :key="department.id">{{department.UnitName}} <button @click="selectDepartment(department.objectId)">Select</button> </li>
    </ul>
    <p>Selected Unit/DepartmentID: {{SelectedDepartment}}</p>
    <button @click="addDegree()">Add Degree</button><br>
    <hr>

    <h3>Add Courses</h3>
    <span>CourseName: </span>
    <input v-model="CourseName" type="text"><br>
    <span>CourseCode: </span>
    <input v-model="CourseCode" type="text"><br>
    <!--ASDLKANSDKLANSDLKASNDKLANSLKDNAKSLDNLASDKANLSDKNALKSNDLK-->
    <!-- <span>Is Part of a Degree: </span>
    <input type="radio" id="CourseDegreeYes" value="true" v-model="CourseHasDegree" />
    <label for="CourseDegreeYes">Yes</label>
    <input type="radio" id="CourseDegreeNo" value="false" v-model="CourseHasDegree" />
    <label for="CourseDegreeNo">No</label><br> -->
    <span>CourseDegree: </span> 
    <button @click="getDegrees()">Load Relevant Degrees</button>
    <ul v-if="ShowRelevantDegrees">
        <li>No Degree (Elective)<button @click="setCourseDegree(null)">Select</button></li>  
        <li>All Degrees <button @click="setCourseToAllDegrees()">Select</button></li>
        <li v-for="degree in Degrees" :key="degree.objectId">{{degree.DegreeName}} <button @click="setCourseDegree(degree.objectId)">Select Degree</button> </li>
    </ul>
    <br>
    <p>{{CourseDegreesIDPointers}}</p>
    <button @click="addCourse()">Add Course</button>
    <hr>

    <!--Testing for badges, add other necessarry attributes-->
    <h3>Add Badges</h3>
    <span>Badge Name: </span>
    <input v-model="BadgeName" type="text"><br>
    <button @click="addBadge()">Add Badge</button><br>
    <hr>

    <h3>Others</h3>
    <button @click="homepage()">Go to hompeage</button>
</template>

<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                //Unit Variables
                UnitName: '',
                UnitContactNumber: '',
                UnitType: '',

                //Degree Variables
                DegreeName: '',
                Departments: [],
                SelectedDepartment: '',

                //Course Variables
                CourseName: '',
                CourseCode: '',
                CourseDegreesIDPointers: [],

                //Badge Variables
                BadgeName: '',

                //Other Variables
                Degrees: [],
                ShowRelevantDegrees: false,
            }
        },
        components:{
           
        },
        methods:{
            //Unit Functions
            async addUnit(){
                var params = {
                    "UnitName": this.UnitName,
                    "UnitContactNumber": this.UnitContactNumber,
                    "UnitType" : this.UnitType,
                };
                await Parse.Cloud.run("AddUnit", params);
                alert("Added Unit");
            },

            async getUnits(UnitType){
                var params = {
                    "UnitType" : UnitType
                };
                const res = JSON.parse(await Parse.Cloud.run("GetUnits", params));
                this.Departments = res;
            },

            selectDepartment(DepartmentID){
                this.SelectedDepartment = DepartmentID;
            },

            //Degree Functions
            async addDegree(){
                var params = {
                    "DegreeName" : this.DegreeName,
                    "DegreeUnitIDPointer" : this.SelectedDepartment,
                }
                await Parse.Cloud.run("AddDegree", params);
                alert("Added Degree");
            },

            //Course Functions
            async addCourse(){
                var params = {
                    "CourseName" : this.CourseName,
                    "CourseCode" : this.CourseCode, 
                    "CourseDegreesIDPointers": this.CourseDegreesIDPointers
                }
                await Parse.Cloud.run("AddCourse", params);
                this.ShowRelevantDegrees = false
                alert("Added Course");
            },

            async getDegrees(){ 
                this.ShowRelevantDegrees = true
                const res = JSON.parse(await Parse.Cloud.run("GetDegrees"));
                this.Degrees = res;
            },

            setCourseDegree(degId){
                if(degId != null){
                    this.CourseDegreesIDPointers.push(degId)
                }
                else{
                    this.CourseDegreesIDPointers.length = 0
                }
            },

            async setCourseToAllDegrees(){
                this.CourseDegreesIDPointers .length = 0
                const res = JSON.parse(await Parse.Cloud.run("GetDegrees"));
                let CourseDegrees = []
                for(const degree of res){
                    CourseDegrees.push(degree.objectId);
                }
                this.CourseDegreesIDPointers = CourseDegrees;
            },

            //Badges Functions
            //Testing! add other necessarry attributes
            async addBadge(){
                var params = {
                    "BadgeName" : this.BadgeName,
                    "BadgeDescription" : "",
                    "BadgePoints" : 0,
                    "BadgeImage" : "",
                }
                await Parse.Cloud.run("AddBadge", params);
                alert("Added Badge");
            },

            //Others
            homepage(){
                let host = window.location.host;
                window.location.href ='http://' + host;
            },
        }
    }
</script>
