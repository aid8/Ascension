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
    <span>Badge Description: </span>
    <input v-model="BadgeDescription" type="text"><br>
    <span>Badge Points: </span>
    <input v-model="BadgePoints" type="number"><br>
    <span>Badge Image </span>
    <input v-model="BadgeImage" type="text"><br>
    <button @click="addBadge()">Add Badge</button><br>

    <h3>Edit Badge</h3>
    <span>Badge Name: </span>
    <input v-model="NewBadgeName" type="text"><br>
    <span>Badge Description: </span>
    <input v-model="NewBadgeDescription" type="text"><br>
    <span>Badge Points: </span>
    <input v-model="NewBadgePoints" type="number"><br>
    <span>Badge Image: </span>
    <input v-model="NewBadgeImage" type="text"><br>
    <button @click="editBadge()">Edit Badge</button><br><br>
    <button @click="getBadges()">Load Available Badges</button>
    <ul v-if="ShowBadges">
        <li v-for="badge in Badges" :key="badge.objectId">{{badge.BadgeName}} 
            <button @click="getBadge(badge)">Edit</button>
            
        </li>
    </ul>
    <hr>
    
    <h3>Add Trophy</h3>
    <span>Trophy Name: </span>
    <input v-model="TrophyName" type="text"><br>
    <span>Trophy Description: </span>
    <input v-model="TrophyDescription" type="text"><br>
    <span>Trophy Points: </span>
    <input v-model="TrophyPoints" type="number"><br>
    <span>Trophy Image: </span>
    <input v-model="TrophyImage" type="text"><br>
    <span>Trophy Category: </span>
    <input v-model="TrophyCategory" type="text"><br>
    <span>Required Badges: </span>
    <button @click="getBadgesForTrophy()">Load Badges</button>
    <ul v-if="ShowBadgesForTrophy">
        <li v-for="badge in AvailableBadgesForTrophy" :key="badge.objectId">{{badge.BadgeName}} 
            <button @click="assignToTrophy(badge.objectId, 0)">Add To Trophy</button>
            <button @click="unassignToTrophy(badge.objectId, 0)">Remove From Trophy</button>
        </li>
    </ul><br>
    <p>{{AssignedBadgesForTrophy}}</p>
    <button @click="addTrophy()">Add Trophy</button><br>

    <h3>Modify Trophy</h3>
    <span>Trophy Name: </span>
    <input v-model="NewTrophyName" type="text"><br>
    <span>Trophy Description: </span>
    <input v-model="NewTrophyDescription" type="text"><br>
    <span>Trophy Points: </span>
    <input v-model="NewTrophyPoints" type="number"><br>
    <span>Trophy Image: </span>
    <input v-model="NewTrophyImage" type="text"><br>
    <span>Trophy Category: </span>
    <input v-model="NewTrophyCategory" type="text"><br>
    <span>Required Badges: </span>
    <button @click="getBadgesForUpdatedTrophy()">Load Badges</button>
    <ul v-if="NewShowBadgesForTrophy">
        <li v-for="badge in AvailableBadgesForTrophy" :key="badge.objectId">{{badge.BadgeName}} 
            <button @click="assignToTrophy(badge.objectId, 1)">Add To Trophy</button>
            <button @click="unassignToTrophy(badge.objectId, 1)">Remove From Trophy</button>
        </li>
    </ul><br>
    <p>{{AssignedBadgesforNewTrophy}}</p>
    <button @click="getTrophies()">Load Trophies</button><br>
    <ul v-if="ShowTrophies">
        <li v-for="trophy in Trophies" :key="trophy.objectId">{{trophy.TrophyName}}
        <button @click="getTrophy(trophy)">Edit</button>
        <button @click="deleteTrophy(trophy.objectId)">Delete</button>
        </li>
    </ul>
    <button @click="editTrophy()">Update Trophy</button>
    <hr>

    <h3>Add Ascension Titles</h3>
    <span>Ascension Name: </span>
    <input v-model="AscensionName" type="text"><br>
    <span>Ascension Xp Starting Range: </span>
    <input v-model="AscensionXpRangeStart" type="number"><br>
    <span>Ascension Xp Cap: </span>
    <input v-model="AscensionXpRangeCap" type="number"><br>
    <button @click="addAscensionTitle()">Add Ascension Title</button>
    
    <h3>Modify Ascension Titles</h3>
    <span>Ascension Name: </span>
    <input v-model="NewAscensionName" type="text"><br>
    <span>Ascension Xp Starting Range: </span>
    <input v-model="NewAscensionXpRangeStart" type="number"><br>
    <span>Ascension Xp Cap: </span>
    <input v-model="NewAscensionXpRangeCap" type="number"><br>
    <button @click="updateAscensionTitle()">Save Title</button><br><br>
    <button @click="getAscensionTitles()">Load Available Titles</button>
    <ul v-if="ShowAscensionTitles">
        <li v-for="title in AscensionTitles" :key="title.objectId">{{title.AscensionName}} 
            <button @click="getAscensionTitle(title)">Edit</button>
            <button @click="deleteAscensionTitle(title.objectId)">Delete</button>
        </li>
    </ul>
    <!-- TO DO AFTER FIXING XP RANGE START -->
    <h3>Get Ascension Title</h3>
    <span>Xp Value: </span>
    <input v-model="XpInput" type="number"><button @click="searchAscensionTitleFromXp(XpInput)">Search</button>
    <p>Ascension Title Result: {{AscensionTitleFromXpInput}}</p>
    <hr>

    <h3>Add House</h3>
    <span>House Name: </span>
    <input v-model="HouseName" type="text"><br>
    <button @click="addHouse()">Add House</button><br>
    <hr>

    <h3>Add Cosmetic (All cosmetics testing)</h3>
    <span>Cosmetic Name: </span>
    <input v-model="CosmeticName" type="text"><br>
    <button @click="addCosmetic()">Add Cosmetic</button><br>
    <hr>

    <!-- Test Delete Default Cosmetic -->
    <h3>Delete a Default Cosmetic  </h3>
    <button @click="test()">Delete Cosmetic</button><br>
    <hr>

    <h3>Others</h3>
    <button @click="homepage()">Go to hompeage</button><br>
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
                BadgeDescription: '',
                BadgePoints: '',
                BadgeImage: '',
                NewBadgeName: '',
                NewBadgeDescription: '',
                NewBadgePoints: '',
                NewBadgeImage: '',
                BadgeIdPointer: '',
                Badges: [],
                
                //Trophy Variables
                TrophyCategory: '',
                TrophyName: '',
                TrophyDescription: '',
                TrophyPoints: 0,
                TrophyImage: '',
                AvailableBadgesForTrophy: [],
                AssignedBadgesForTrophy: [],
                NewTrophyCategory: '',
                NewTrophyName: '',
                NewTrophyDescription: '',
                NewTrophyPoints: 0,
                NewTrophyImage: '',
                AssignedBadgesforNewTrophy: [],
                Trophies: [],

                //Ascension Title Variables
                AscensionName: '',
                AscensionXpRangeStart: 0,
                AscensionXpRangeCap: 0,
                NewAscensionName: '',
                NewAscensionXpRangeStart: 0,
                NewAscensionXpRangeCap: 0,
                AscensionTitleIdPointer: '',
                AscensionTitles: [],
                AscensionTitleFromXpInput: '',
                XpInput: 0,

                //House Variables,
                HouseName: '',

                //Cosmetic Variables
                CosmeticName: '',

                //Other Variables
                Degrees: [],
                ShowRelevantDegrees: false,
                ShowAscensionTitles: false,
                ShowBadges: false,
                ShowBadgesForTrophy: false,
                NewShowBadgesForTrophy: false,
                ShowTrophies: false,
            }
        },
        components:{
           
        },
        // Testing delete default cosmetics
        methods:{
            async test(){
                var params = {
                     "CosmeticID" : "1",
                }
                try{
                    await Parse.Cloud.run("DeleteCosmetic", params);
                }
                catch(error){
                    console.log(error.message);
                }
                console.log("B");
            },

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
                this.ShowBadges = false
                var params = {
                    "BadgeName" : this.BadgeName,
                    "BadgeDescription" : this.BadgeDescription,
                    "BadgePoints" : this.BadgePoints,
                    "BadgeImage" : this.BadgeImage,
                }
                await Parse.Cloud.run("AddBadge", params);
                alert("Added Badge");
            },

            async editBadge(){
                this.ShowBadges = false
                var params = {
                    "BadgeName" : this.NewBadgeName,
                    "BadgeDescription" : this.NewBadgeDescription,
                    "BadgePoints" : this.NewBadgePoints,
                    "BadgeImage" : this.NewBadgeImage,
                    "BadgeID" : this.BadgeIdPointer,
                }
                await Parse.Cloud.run("EditBadge", params).then(alert("Badge edited!"))
            },

            async getBadges(){
                this.ShowBadges = true
                this.Badges = JSON.parse(await Parse.Cloud.run("GetBadges"))
            },

            async getBadge(Badge){
                this.NewBadgeName = Badge.BadgeName
                this.NewBadgeDescription = Badge.BadgeDescription
                this.NewBadgePoints = Badge.BadgePoints
                this.NewBadgeImage = Badge.BadgeImage
                this.BadgeIdPointer = Badge.objectId
            },

            //Trophy Functions
            async addTrophy(){
                this.ShowBadgesForTrophy = false
                this.NewShowBadgesForTrophy = false
                var params = {
                    "TrophyName": this.TrophyName,
                    "TrophyDescription": this.TrophyDescription,
                    "TrophyPoints": this.TrophyPoints,
                    "TrophyImage": this.TrophyImage,
                    "TrophyCategory": this.TrophyCategory,
                    "BadgesIDNeeded": this.AssignedBadgesForTrophy,
                }
                await Parse.Cloud.run("AddTrophy", params).then(alert("Added Trophy"))
            },

            async editTrophy(){
                this.ShowTrophies = false
            },
            
            async deleteTrophy(id){
                var params = {
                    "TrophyID": id
                }
                await Parse.Cloud.run("DeleteTrophy", params)
            },

            async getTrophy(trophy){
                this.NewTrophyName = trophy.TrophyName
                this.NewTrophyDescription = trophy.TrophyDescription
                this.NewTrophyPoints = trophy.TrophyPoints
                this.NewTrophyImage = trophy.TrophyImage
                this.NewTrophyCategory = trophy.TrophyCategory
                this.AssignedBadgesforNewTrophy = trophy.BadgesIDNeeded
                
            },

            async getTrophies(){
                this.ShowTrophies = true
                this.Trophies = JSON.parse(await Parse.Cloud.run("GetTrophies"))
            },
            
            //num is used to know which array will be used
            async assignToTrophy(badgeId, num){
                if(num == 0 && !this.AssignedBadgesForTrophy.includes(badgeId)){
                    this.AssignedBadgesForTrophy.push(badgeId)
                }
                else if(num == 1 && !this.AssignedBadgesforNewTrophy.includes(badgeId)){
                    this.AssignedBadgesforNewTrophy.push(badgeId)
                }
                
            },

            //num is used to know which array will be used
            async unassignToTrophy(badgeId, num){
                if(num == 0 && this.AssignedBadgesForTrophy.includes(badgeId)){
                    const index = this.AssignedBadgesForTrophy.indexOf(badgeId)
                    this.AssignedBadgesForTrophy.splice(index, 1)
                }
                else if(num == 1 && this.AssignedBadgesforNewTrophy.includes(badgeId)){
                    const index = this.AssignedBadgesforNewTrophy.indexOf(badgeId)
                    this.AssignedBadgesforNewTrophy.splice(index, 1)
                }
            },

            
            async getBadgesForTrophy(){
                this.ShowBadgesForTrophy = true
                this.AvailableBadgesForTrophy = JSON.parse(await Parse.Cloud.run("GetBadges"))
            },

            async getBadgesForUpdatedTrophy(){
                this.NewShowBadgesForTrophy = true
                this.AvailableBadgesForTrophy = JSON.parse(await Parse.Cloud.run("GetBadges"))
            },

            //Ascension Title Functions
            async addAscensionTitle(){
                if(this.AscensionXpRangeCap > 0 && this.AscensionXpRangeStart > -1 && this.AscensionXpRangeStart < this.AscensionXpRangeCap){
                    var params = {
                        "AscensionName": this.AscensionName,
                        "AscensionXpRangeStart": this.AscensionXpRangeStart,
                        "AscensionXpRangeCap": this.AscensionXpRangeCap
                        
                    }
                    await Parse.Cloud.run("AddAscensionTitle", params).then(alert("Added Ascension Title"))
                }
                else{
                    alert("Invalid Values!")
                }
                
            },

            async getAscensionTitles(){
                this.ShowAscensionTitles = true
                this.AscensionTitles = JSON.parse(await Parse.Cloud.run("GetAscensionTitles"))
            },


            async deleteAscensionTitle(AscensionTitleId){
                var params = {
                    "AscensionId": AscensionTitleId
                }
                await Parse.Cloud.run("DeleteAscensionTitle", params).then(alert("Ascension Title Deleted"))
            },

            async getAscensionTitle(AscensionTitle){
                this.NewAscensionName = AscensionTitle.AscensionName
                this.NewAscensionXpRangeCap = AscensionTitle.AscensionXpRangeCap
                this.NewAscensionXpRangeStart = AscensionTitle.AscensionXpRangeStart
                this.AscensionTitleIdPointer = AscensionTitle.objectId
            },

            async updateAscensionTitle(){
                this.ShowAscensionTitles = false
                
                if(this.NewAscensionXpRangeCap > 0 && this.NewAscensionXpRangeStart > -1 && this.NewAscensionXpRangeStart < this.NewAscensionXpRangeCap){
                    var params = {
                        "AscensionId": this.AscensionTitleIdPointer,
                        "NewAscensionName": this.NewAscensionName,
                        "NewAscensionXpRangeCap": this.NewAscensionXpRangeCap,
                        "NewAscensionXpRangeStart": this.NewAscensionXpRangeStart
                    }
                    await Parse.Cloud.run("UpdateAscensionTitle", params).then(alert("Ascension Title Modified"))
                }
                else{
                    alert("Invalid Values")
                }
                
            },

            async searchAscensionTitleFromXp(XpInput){
               if(XpInput >= 0){
                    var params = {
                        "XpInput": XpInput
                    }
                    const res = JSON.parse(await Parse.Cloud.run("SearchAscensionTitleFromXp", params))
                    if(res != null){
                        this.AscensionTitleFromXpInput = res.AscensionName
                    }
                    else{
                        alert("Out of bounds!") //Will print if there's an XP gap within Titles 
                    }                           //E.g. 1-10, 20-100. Code prints if XpInput is 11-19
                    
               }
               else{
                    alert("Out of bounds!")
               }
            },

            //House Functions
            async addHouse(){
                var params = {
                    "HouseName" : this.HouseName,
                    "HouseBannerIDPointer" : "",
                }
                await Parse.Cloud.run("AddHouse", params);
                alert("Added House");
            },

            //Cosmetic Functions
            async addCosmetic(){
                var params = {
                    "CosmeticName" : this.CosmeticName,
                    "CosmeticType" : "Avatar",
                    "CosmeticImage" : "None",
                }
                await Parse.Cloud.run("AddCosmetic", params);
                params["CosmeticType"] = "Frame";
                await Parse.Cloud.run("AddCosmetic", params);
                params["CosmeticType"] = "CoverPhoto";
                await Parse.Cloud.run("AddCosmetic", params);
                alert("Added Cosmetic for all!");
            },

            //Others
            homepage(){
                let host = window.location.host;
                window.location.href ='http://' + host;
            },
        }
    }
</script>
