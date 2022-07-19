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
    <span>Badge Type: </span>
    <input v-model="BadgeType" type="text"><br>
    <span>Badge Image </span>
    <input @change="onBadgeImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <button @click="addBadge()">Add Badge</button><br>

    <h3>Edit / Delete Badge</h3>
    <span>Badge Name: </span>
    <input v-model="NewBadgeName" type="text"><br>
    <span>Badge Description: </span>
    <input v-model="NewBadgeDescription" type="text"><br>
    <span>Badge Points: </span>
    <input v-model="NewBadgePoints" type="number"><br>
    <span>Badge Type: </span>
    <input v-model="NewBadgeType" type="text"><br>
    <span>Badge Image: </span>
    <input @change="onNewBadgeImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <button @click="editBadge()">Edit Badge</button><br><br>
    <button @click="getBadges()">Load Available Badges</button>
    <ul v-if="ShowBadges">
        <li v-for="badge in Badges" :key="badge.objectId">{{badge.BadgeName}} 
            <button @click="getBadge(badge)">Edit</button>
            <button @click="deleteBadge(badge)">Delete</button>
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
    <input @change="onTrophyImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <span>Trophy Type: </span>
    <input v-model="TrophyType" type="text"><br>
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

    <h3>Edit / Delete Trophy</h3>
    <span>Trophy Name: </span>
    <input v-model="NewTrophyName" type="text"><br>
    <span>Trophy Description: </span>
    <input v-model="NewTrophyDescription" type="text"><br>
    <span>Trophy Points: </span>
    <input v-model="NewTrophyPoints" type="number"><br>
    <span>Trophy Image: </span>
    <input @change="onNewTrophyImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <span>Trophy Type: </span>
    <input v-model="NewTrophyType" type="text"><br>
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
    <span>House Banner ID: {{SelectedHouseBannerID}}</span><br>
    <button @click="loadHouseBanners()">Load House Banners</button><br>
    <ul>
        <li v-for="banner in HouseBanners" :key="banner">{{banner.CosmeticName}} <button @click="selectHouseBanner(banner.objectId)">Select</button></li>
    </ul>

    <button @click="addHouse()">Add House</button><br>
    <hr>

    <h3>Add Cosmetic</h3>
    <span>Cosmetic Name: </span>
    <input v-model="CosmeticName" type="text"><br>
    <span>Cosmetic Type: </span>
    <input v-model="CosmeticType" type="text"><br>
    <span>Cosmetic Image </span>
    <input @change="onCosmeticImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <button @click="addCosmetic()">Add Cosmetic</button><br>

    <h3>Edit / Delete Cosmetic</h3>
    <span>Cosmetic Name: </span>
    <input v-model="NewCosmeticName" type="text"><br>
    <span>Cosmetic Type: </span>
    <input v-model="NewCosmeticType" type="text"><br>
    <span>Cosmetic Image </span>
    <input @change="onNewCosmeticImageSelected" type="file" name="img" accept="image/x-png,image/gif,image/jpeg"/><br>
    <button @click="editCosmetic()">Edit Cosmetic</button><br>
    <button @click="getAllCosmetics()">Load All Cosmetics</button>
    <ul>
        <li v-for="cosmetic in AllCosmetics" :key="cosmetic">{{cosmetic.CosmeticName}} 
            <button @click="getCosmetic(cosmetic)">Edit</button>
            <button @click="deleteCosmetic(cosmetic)">Delete</button>
        </li>
    </ul>
    <hr>

    <h3>Set a Default Cosmetic</h3>
    <button @click="getCosmetics()">Get Cosmetics</button><br>
    <h4>Avatars</h4>
    <ul>
        <li v-for="avatar in Avatars" :key="avatar">{{avatar.CosmeticName}} <button @click="selectCosmetic('Avatar', avatar.objectId)">Select</button></li>
    </ul>
    <p>Selected CosmeticID for Avatar: {{SelectedAvatar}}</p>
    <button @click="setCosmetic('Avatar')">Set Default for Avatar</button>
    
    <h4>Frames</h4>
    <ul>
        <li v-for="frame in Frames" :key="frame">{{frame.CosmeticName}} <button @click="selectCosmetic('Frame', frame.objectId)">Select</button></li>
    </ul>
    <p>Selected CosmeticID for Frame: {{SelectedFrame}}</p>
    <button @click="setCosmetic('Frame')">Set Default for Frame</button>

    <h4>CoverPhoto</h4>
    <ul>
        <li v-for="coverphoto in CoverPhotos" :key="coverphoto">{{coverphoto.CosmeticName}} <button @click="selectCosmetic('CoverPhoto', coverphoto.objectId)">Select</button></li>
    </ul>
    <p>Selected CosmeticID for CoverPhoto: {{SelectedCoverPhoto}}</p>
    <button @click="setCosmetic('CoverPhoto')">Set Default for CoverPhoto</button><br>

    <h4>Banners (for house)</h4>
    <ul>
        <li v-for="banner in Banners" :key="banner">{{banner.CosmeticName}} <button @click="selectCosmetic('Banner', banner.objectId)">Select</button></li>
    </ul>
    <p>Selected CosmeticID for Banner: {{SelectedBanner}}</p>
    <button @click="setCosmetic('Banner')">Set Default for Banner</button><br>

    <h4> TESTING </h4>
    <button @click="setStudentCosmetics()">Set All Students Cosmetic to Selected Cosmetics (Includes Equipped)</button>
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
                BadgeImageName: '',
                BadgeType: '',
                NewBadgeName: '',
                NewBadgeDescription: '',
                NewBadgePoints: '',
                NewBadgeImage: '',
                NewBadgeImageName: '',
                NewBadgeType: '',
                BadgeIdPointer: '',
                Badges: [],
                
                //Trophy Variables
                TrophyType: '',
                TrophyName: '',
                TrophyDescription: '',
                TrophyPoints: 0,
                TrophyImage: '',
                TrophyImageName: '',
                AvailableBadgesForTrophy: [],
                AssignedBadgesForTrophy: [],
                NewTrophyType: '',
                NewTrophyName: '',
                NewTrophyDescription: '',
                NewTrophyPoints: 0,
                NewTrophyImage: '',
                NewTrophyImageName: '',
                NewTrophyID : '',
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
                SelectedHouseBannerID: '',
                HouseBanners: '',

                //Cosmetic Variables
                CosmeticName: '',
                CosmeticType: '',
                CosmeticImage: '',
                CosmeticImageName: '',
                NewCosmeticID: '',
                NewCosmeticName: '',
                NewCosmeticType: '',
                NewCosmeticImage: '',
                NewCosmeticImageName: '',
                CosmeticIdPointer: '',
                Avatars: [],
                Frames: [],
                CoverPhotos: [],
                Banners : [],
                AllCosmetics : [],
                SelectedAvatar : '',
                SelectedFrame : '',
                SelectedCoverPhoto : '',
                SelectedBanner : '',

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
        // Testing delete default cosmetics (Change to your default cosmeticid/update this)
        methods:{
            async test(){
                var params = {
                     "CosmeticID" : "",
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
            async addBadge(){
                this.ShowBadges = false;
                var params = {
                    "BadgeName" : this.BadgeName,
                    "BadgeDescription" : this.BadgeDescription,
                    "BadgePoints" : this.BadgePoints,
                    "BadgeType" : this.BadgeType,
                    "BadgeImage" : this.BadgeImage,
                    "BadgeImageName" : this.BadgeImageName,
                }
                await Parse.Cloud.run("AddBadge", params).then(alert("Added Badge!"));
            },

            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            },

            async onBadgeImageSelected(e){
                var file = e.target.files[0];
                this.BadgeImageName = file.name;
                this.getBase64(file).then(
                    data => this.BadgeImage = data
                );
            },

            async onNewBadgeImageSelected(e){
                var file = e.target.files[0];
                this.NewBadgeImageName = file.name;
                this.getBase64(file).then(
                    data => this.NewBadgeImage = data
                );
            },

            async editBadge(){
                this.ShowBadges = false
                var params = {
                    "BadgeName" : this.NewBadgeName,
                    "BadgeDescription" : this.NewBadgeDescription,
                    "BadgePoints" : this.NewBadgePoints,
                    "BadgeType" : this.NewBadgeType,
                    "BadgeImage" : this.NewBadgeImage,
                    "BadgeID" : this.BadgeIdPointer,
                }
                if(this.NewBadgeImageName != ""){
                    params["BadgeImageName"] = this.NewBadgeImageName;
                }
                await Parse.Cloud.run("EditBadge", params).then(alert("Badge edited!"));
            },

            async getBadges(){
                this.ShowBadges = true
                this.Badges = JSON.parse(await Parse.Cloud.run("GetBadges"))
            },

            async getBadge(Badge){
                this.NewBadgeName = Badge.BadgeName
                this.NewBadgeDescription = Badge.BadgeDescription
                this.NewBadgePoints = Badge.BadgePoints
                this.NewBadgeType = Badge.BadgeType
                this.NewBadgeImage = Badge.BadgeImage
                this.BadgeIdPointer = Badge.objectId
            },
            
            async deleteBadge(badge){
                var param = {
                    "BadgeID": badge.objectId
                }
                try{
                    await Parse.Cloud.run("DeleteBadge", param);
                    alert("DELETED BADGE!");
                }
                catch(e){
                    alert(e.message);
                }
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
                    "TrophyType": this.TrophyType,
                    "BadgesIDNeeded": this.AssignedBadgesForTrophy,
                    "TrophyImageName" : this.TrophyImageName,
                }
                await Parse.Cloud.run("AddTrophy", params).then(alert("Added Trophy"));
            },

            async onTrophyImageSelected(e){
                var file = e.target.files[0];
                this.TrophyImageName = file.name;
                this.getBase64(file).then(
                    data => this.TrophyImage = data
                );
            },

            async onNewTrophyImageSelected(e){
                var file = e.target.files[0];
                this.NewTrophyImageName = file.name;
                this.getBase64(file).then(
                    data => this.NewTrophyImage = data
                );
            },

            async editTrophy(){
                this.ShowTrophies = false
                var params = {
                    "TrophyID" : this.NewTrophyID,
                    "TrophyName": this.NewTrophyName,
                    "TrophyDescription": this.NewTrophyDescription,
                    "TrophyPoints": this.NewTrophyPoints,
                    "TrophyImage": this.NewTrophyImage,
                    "TrophyType": this.NewTrophyType,
                    "BadgesIDNeeded": this.AssignedBadgesforNewTrophy,
                }
                if(this.NewTrophyImageName != ""){
                    params["TrophyImageName"] = this.NewTrophyImageName;
                }
                await Parse.Cloud.run("EditTrophy", params).then(alert("Edited Trophy"));
            },
            
            async deleteTrophy(id){
                var params = {
                    "TrophyID": id
                }
                try{
                    await Parse.Cloud.run("DeleteTrophy", params).then(alert("Deleted Trophy"));
                }
                catch(e){
                    alert(e.message);
                }
            },

            async getTrophy(trophy){
                this.NewTrophyID = trophy.objectId;
                this.NewTrophyName = trophy.TrophyName
                this.NewTrophyDescription = trophy.TrophyDescription
                this.NewTrophyPoints = trophy.TrophyPoints
                this.NewTrophyImage = trophy.TrophyImage
                this.NewTrophyType = trophy.TrophyType
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
                this.ShowBadgesForTrophy = true;
                var params = {};
                if(this.TrophyType != ""){
                    params["BadgeType"] = this.TrophyType;
                }
                this.AvailableBadgesForTrophy = JSON.parse(await Parse.Cloud.run("GetBadges", params))
            },

            async getBadgesForUpdatedTrophy(){
                this.NewShowBadgesForTrophy = true;
                var params = {};
                if(this.TrophyType != ""){
                    params["BadgeType"] = this.TrophyType;
                }
                this.AvailableBadgesForTrophy = JSON.parse(await Parse.Cloud.run("GetBadges", params))
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
                    "HouseBannerIDPointer" : this.SelectedHouseBannerID,
                }
                await Parse.Cloud.run("AddHouse", params);
                alert("Added House");
            },

            async loadHouseBanners(){
                var params = {"CosmeticType" : "Banner"}
                const res = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));
                this.HouseBanners = res;
            },

            async selectHouseBanner(id){
                this.SelectedHouseBannerID = id;
            },

            //Cosmetic Functions
            async addCosmetic(){
                var params = {
                    "CosmeticName" : this.CosmeticName,
                    "CosmeticType" : this.CosmeticType,
                    "CosmeticImage" : this.CosmeticImage,
                    "CosmeticImageName" : this.CosmeticImageName,
                }
                await Parse.Cloud.run("AddCosmetic", params);
                alert("Added " + this.CosmeticType);
            },

            async editCosmetic(){
                var params = {
                    "CosmeticID" : this.NewCosmeticID,
                    "CosmeticName": this.NewCosmeticName,
                    "CosmeticType": this.NewCosmeticType,
                    "CosmeticImage": this.NewCosmeticImage,
                }
                if(this.NewCosmeticImage != ""){
                    params["CosmeticImageName"] = this.NewCosmeticImageName;
                }
                await Parse.Cloud.run("EditCosmetic", params).then(alert("Edited Cosmetic"));
            },

            async onCosmeticImageSelected(e){
                var file = e.target.files[0];
                this.CosmeticImageName = file.name;
                this.getBase64(file).then(
                    data => this.CosmeticImage = data
                );
            },

            async onNewCosmeticImageSelected(e){
                var file = e.target.files[0];
                this.NewCosmeticImageName = file.name;
                this.getBase64(file).then(
                    data => this.NewCosmeticImage = data
                );
            },

            async getCosmetics(){
                var params = {"CosmeticType" : "Avatar"}
                const res = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));
                this.Avatars = res;

                params["CosmeticType"] = "Frame";
                const res1 = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));
                this.Frames = res1;

                params["CosmeticType"] = "CoverPhoto";
                const res2 = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));
                this.CoverPhotos = res2;

                params["CosmeticType"] = "Banner";
                const res3 = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));
                this.Banners = res3;
            },

            async getAllCosmetics(){
                this.AllCosmetics = JSON.parse(await Parse.Cloud.run("GetCosmetics"));
            },

            async getCosmetic(cosmetic){
                this.NewCosmeticID = cosmetic.objectId;
                this.NewCosmeticName = cosmetic.CosmeticName;
                this.NewCosmeticType = cosmetic.CosmeticType;
            },

            async deleteCosmetic(cosmetic){
                var params = {
                    "CosmeticID": cosmetic.objectId,
                }
                try{
                    await Parse.Cloud.run("DeleteCosmetic", params).then(alert("Deleted Cosmetic"));
                    this.getAllCosmetics();
                }
                catch(e){
                    alert(e.message);
                }
            },

            selectCosmetic(type, id){
                if(type === "Avatar"){
                    this.SelectedAvatar = id;
                }
                else if(type === "Frame"){
                    this.SelectedFrame = id;
                }
                else if(type === "CoverPhoto"){
                    this.SelectedCoverPhoto = id;
                }
                else if(type === "Banner"){
                    this.SelectedBanner = id;
                }
            },

            async setCosmetic(type){
                var params = {"CosmeticType" : type};
                if(type === "Avatar"){
                    params["CosmeticID"] = this.SelectedAvatar
                }
                else if(type === "Frame"){
                    params["CosmeticID"] = this.SelectedFrame
                }
                else if(type === "CoverPhoto"){
                    params["CosmeticID"] = this.SelectedCoverPhoto
                }
                else if(type === "Banner"){
                    params["CosmeticID"] = this.SelectedBanner
                }
                await Parse.Cloud.run("SetDefaultCosmetic", params);
                alert("Successfully Changed Default Cosmetic");
            },

            async setStudentCosmetics(){
                var AvatarsIDUnlocked = [this.SelectedAvatar];
                var FrameIDUnlocked = [this.SelectedFrame];
                var CoverPhotoIDUnlocked = [this.SelectedCoverPhoto];
                var EquippedCosmetics = [this.SelectedAvatar, this.SelectedFrame, this.SelectedCoverPhoto];
                
                const students = JSON.parse(await Parse.Cloud.run("GetStudents"));
                for(const student of students){
                    var params = {
                        "StudentID" : student.objectId, 
                        "AvatarsIDUnlocked" : AvatarsIDUnlocked,
                        "FrameIDUnlocked" : FrameIDUnlocked,
                        "CoverPhotoIDUnlocked" : CoverPhotoIDUnlocked,
                        "EquippedCosmetics" : EquippedCosmetics,
                    };
                    await Parse.Cloud.run("EditStudent", params);
                }
                alert("Successfully Edited Student Cosmetics");
            },

            //Others
            homepage(){
                let host = window.location.host;
                window.location.href ='http://' + host;
            },
        }
    }
</script>
