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
    <input v-model="Contact" type="text"><br>
    <br>

    <p> What are you? </p>
    <input type="radio" id="student" value="Student" v-model="userType" />
    <label for="student">Student</label>
    <input type="radio" id="teacher" value="Teacher" v-model="userType" />
    <label for="teacher">Teacher</label>
    <input type="radio" id="nt_distributor" value="NT_Distributor" v-model="userType" />
    <label for="nt_distributor">Non Teaching Distributor</label>

    <div v-if="userType === 'Student'">
        <h3>Select Degree</h3>
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
                Contact: '',
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
                }
                if(this.userType == "Student"){
                    await Parse.Cloud.run("addStudent", params);
                }
                alert("Added " + this.userType);
           },
        }
    }
</script>




