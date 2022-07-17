<template>
    <h3>Log In (Teacher Testing)</h3>
    <h3>Select Teacher Account</h3>
    <button @click="getTeachers()">Show Teachers</button>
    <ul>
        <li v-for="teacher in Teachers" :key="teacher">{{teacher.LastName}} <button @click="selectTeacher(teacher.objectId)">Select</button></li>
    </ul>
    <p>Selected Teacher: {{SelectedTeacher}}</p>
    <hr>
    
    <h3>Approve / Decline Badges</h3>
    <button @click="getTeacherRequests()">Show Teacher Badge Requests</button>
    <ul>
        <li v-for="request in SelectedTeacherRequest" :key="request">{{request.Proof}} <button @click="selectToApprove(request.StudentIDPointer, request.objectId)">Select</button>  <button @click="declineBadge(request.objectId)">Decline</button> </li>
    </ul>
    <span>!===Select a badge to give before approving===!</span><br>
    <p>Selected RequestID: {{SelectedRequest}}</p>
    <p>Selected ID of Student(requester) to Give Approval: {{SelectedStudent}}</p>
    <button @click="getUnacquiredBadges()">Show Selected Student Unacquired Badges</button>
    <ul>
        <li v-for="badge in UnacquiredStudentBadges" :key="badge">{{badge.BadgeName}} <button @click="selectBadgeToApprove(badge.objectId)">Select</button> </li>
    </ul>
    <p>Selected Badge to Give: {{SelectedBadge}}</p>
    <button @click="approveBadge()">Approve Selected Request and Give Selected Badge</button>

    <hr>
    <h3>Give a Badge to a Student</h3>
    <button @click="getStudentsGive()">Show Students</button>
    <ul>
        <li v-for="student in StudentsGive" :key="student">{{student.LastName}} <button @click="selectStudentGive(student.objectId)">Select</button></li>
    </ul>
    <p>Selected Student: {{SelectedStudentGive}}</p>
    <button @click="getUnacquiredBadgesGive()">Show Selected Student Unacquired Badges</button>
    <ul>
        <li v-for="badge in UnacquiredStudentBadgesGive" :key="badge">{{badge.BadgeName}} <button @click="selectBadgeToGive(badge.objectId)">Select</button> </li>
    </ul>
    <p>Selected Badge to Give: {{SelectedBadgeGive}}</p>
    <button @click="giveBadge()"> Give Selected Badge</button>

    <hr>
    <h3>Give a Badge to a House</h3>
    <button @click="getHousesGive()">Show Houses</button>
    <ul>
        <li v-for="house in HousesGive" :key="house">{{house.HouseName}} <button @click="selectHouseGive(house.objectId)">Select</button></li>
    </ul>
    <p>Selected House: {{SelectedHouseGive}}</p>
    <button @click="getUnacquiredHouseBadges()">Show Selected House Unacquired Badges</button>
    <ul>
        <li v-for="badge in UnacquiredHouseBadgesGive" :key="badge">{{badge.BadgeName}} <button @click="selectHouseBadgeToGive(badge.objectId)">Select</button> </li>
    </ul>
    <p>Selected HouseBadge to Give: {{SelectedHouseBadgeGive}}</p>
    <button @click="giveHouseBadge()"> Give Selected House Badge</button>

    <hr>
    <h3>Remove a Badge of Student</h3>
    <button @click="getStudents()">Show Students</button>
    <ul>
        <li v-for="student in Students" :key="student">{{student.LastName}} <button @click="selectStudent(student.objectId)">Select</button></li>
    </ul>
    <p>Selected Student: {{SelectedStudentRemove}}</p>
    <span>Warning: fix cosmeticsunlocked of students in admin first, there will be an error here if id of cosmetics in students are not found in database</span><br>
    <button @click="getStudentBadges()">Get Selected Student Badges</button>
    <!-- ACTUALLY THIS IN AN ARRAY OF REWARD ID, and reward object has the badgeid -->
    <ul>
        <li v-for="badge in StudentBadges" :key="badge">{{badge}} <button @click="selectBadgeToRemove(badge)">Select</button> </li>
    </ul>
    <p>Selected ID Reward to Remove: {{SelectedBadge}}</p>
    <p>Info of selected badge: Name is={{SelectedBadgeInfo}}</p>
    <button @click="removeBadge()">Remove Badge</button>

    <hr>
    <h3>Remove a Badge of a House</h3>
    <button @click="getHouses()">Show Houses</button>
    <ul>
        <li v-for="house in Houses" :key="house">{{house.HouseName}} <button @click="selectHouse(house.objectId)">Select</button></li>
    </ul>
    <p>Selected House: {{SelectedHouseRemove}}</p>
    <button @click="getHouseBadges()">Get Selected House Badges</button>
    <!-- ACTUALLY THIS IN AN ARRAY OF REWARD ID, and reward object has the badgeid -->
    <ul>
        <li v-for="badge in HouseBadges" :key="badge">{{badge}} <button @click="selectHouseBadgeToRemove(badge)">Select</button> </li>
    </ul>
    <p>Selected ID Reward to Remove: {{SelectedHouseBadge}}</p>
    <p>Info of selected House Badge: Name is={{SelectedHouseBadgeInfo}}</p>
    <button @click="removeHouseBadge()">Remove House Badge</button>

</template>

<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                Teachers : [],
                SelectedTeacherRequest : [],
                UnacquiredStudentBadges : [],
                Students : [],
                StudentBadges : [],
                Houses: [],
                HouseBadges: [],
                
                SelectedTeacher : '',
                SelectedStudent : '',
                SelectedRequest : '',
                SelectedBadge : '',
                SelectedBadgeInfo : '',
                SelectedHouseBadge : '',
                SelectedHouseBadgeInfo : '',

                StudentsGive : [],
                UnacquiredStudentBadgesGive : [],
                SelectedStudentGive : '',
                SelectedBadgeGive : '',

                HousesGive : [],
                UnacquiredHouseBadgesGive : [],
                SelectedHouseGive : '',
                SelectedHouseBadgeGive : '',
                
                SelectedStudentRemove : '',
                SelectedHouseRemove : '',
            }
        },
        components:{
           
        },
        methods:{
            //Approve/Decline Badge
            async getTeachers(){
                const res = JSON.parse(await Parse.Cloud.run("GetTeachers"));
                this.Teachers = res;
            },
            selectTeacher(id){
                this.SelectedTeacher = id;
            },
            async getTeacherRequests(){
                var params = {"TeacherID" : this.SelectedTeacher};
                const res = JSON.parse(await Parse.Cloud.run("GetTeacherData", params));
                this.SelectedTeacherRequest = res.PendingApprovalRewardingData;
            },
            async approveBadge(){
                var params = {
                    "RequestID" : this.SelectedRequest,
                    "BadgeID" : this.SelectedBadge,
                };
                await Parse.Cloud.run("ApproveRequest", params);
                alert('Request Approved!');
                //Reset
                this.getTeacherRequests();
                this.SelectedRequest = '';
                this.SelectedStudent = '';
                this.UnacquiredStudentBadges = [];
                this.SelectedBadge = '';
            },
            async declineBadge(id){
                var params = {"RequestID" : id};
                await Parse.Cloud.run("DeleteRequest", params);
                alert('Request Declined!');
                //Reset
                this.getTeacherRequests();
            },
            selectToApprove(StudentID, RequestID){
                this.SelectedStudent = StudentID;
                this.SelectedRequest = RequestID;
            },
            async getUnacquiredBadges(){
                var params = {"StudentID" : this.SelectedStudent};
                const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredBadges", params));
                this.UnacquiredStudentBadges = res;
            },
            selectBadgeToApprove(id){
                this.SelectedBadge = id;
            },

            //Give Badge
            async getUnacquiredBadgesGive(){
                var params = {"StudentID" : this.SelectedStudentGive};
                const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredBadges", params));
                this.UnacquiredStudentBadgesGive = res;
            },
            selectStudentGive(id){
                this.SelectedStudentGive = id;
            },
            async getStudentsGive(){
                const res = JSON.parse(await Parse.Cloud.run("GetStudents"));
                this.StudentsGive = res;
            },
            selectBadgeToGive(id){
                this.SelectedBadgeGive = id;
            },
            async giveBadge(){
                var params = {"BadgeID" : this.SelectedBadgeGive, "StudentID" : this.SelectedStudentGive};
                await Parse.Cloud.run("RewardBadge", params);
                alert("Successfully Given Badge!");
                this.getUnacquiredBadgesGive();
                this.SelectedBadgeGive = "";
            },

            //Give House Badge
            async getUnacquiredHouseBadges(){
                var params = {"HouseID" : this.SelectedHouseGive};
                const res = JSON.parse(await Parse.Cloud.run("GetUnacquiredHouseBadges", params));
                this.UnacquiredHouseBadgesGive = res;
            },
            selectHouseGive(id){
                this.SelectedHouseGive = id;
            },
            async getHousesGive(){
                const res = JSON.parse(await Parse.Cloud.run("GetHouses"));
                this.HousesGive = res;
            },
            selectHouseBadgeToGive(id){
                this.SelectedHouseBadgeGive = id;
            },
            async giveHouseBadge(){
                var params = {"BadgeID" : this.SelectedHouseBadgeGive, "HouseID" : this.SelectedHouseGive};
                await Parse.Cloud.run("RewardHouseBadge", params);
                alert("Successfully Given House Badge!");
                this.getUnacquiredHouseBadges();
                this.SelectedHouseBadgeGive = "";
            },
            
            //RemoveBadge
            async getStudents(){
                const res = JSON.parse(await Parse.Cloud.run("GetStudents"));
                this.Students = res;
            },
            selectStudent(id){
                this.SelectedStudentRemove = id;
            },
            async getStudentBadges(){
                var params = {"StudentID" : this.SelectedStudentRemove};
                const res = JSON.parse(await Parse.Cloud.run("GetStudentData", params));
                this.StudentBadges = res.BadgesIDEarned;
            },
            async selectBadgeToRemove(id){
                this.SelectedBadge = id;
                var params = {"RewardID" : id};
                const res = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
                this.SelectedBadgeInfo = res.RewardData.BadgeName;
            },
            async removeBadge(){
                var params = {"RewardID" : this.SelectedBadge, "StudentID" : this.SelectedStudentRemove};
                await Parse.Cloud.run("RemoveBadge", params);
                alert("Successfully Removed Badge!");
                this.getStudentBadges();
                this.SelectedBadge = "";
                this.SelectedBadgeInfo = "";
            },

            //RemoveHouseBadge
            async getHouses(){
                const res = JSON.parse(await Parse.Cloud.run("GetHouses"));
                this.Houses = res;
            },
            selectHouse(id){
                this.SelectedHouseRemove = id;
            },
            async getHouseBadges(){
                var params = {"HouseID" : this.SelectedHouseRemove};
                const res = JSON.parse(await Parse.Cloud.run("GetHouseData", params));
                this.HouseBadges = res.HouseBadgesIDEarned;
            },
            async selectHouseBadgeToRemove(id){
                this.SelectedHouseBadge = id;
                var params = {"RewardID" : id};
                const res = JSON.parse(await Parse.Cloud.run("GetRewardData", params));
                this.SelectedHouseBadgeInfo = res.RewardData.BadgeName;
            },
            async removeHouseBadge(){
                var params = {"RewardID" : this.SelectedHouseBadge, "HouseID" : this.SelectedHouseRemove};
                await Parse.Cloud.run("RemoveHouseBadge", params);
                alert("Successfully Removed House Badge!");
                this.getHouseBadges();
                this.SelectedHouseBadge = "";
                this.SelectedHouseBadgeInfo = "";
            },

        },
    }
</script>