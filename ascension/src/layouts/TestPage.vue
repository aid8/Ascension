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
    <head>
        <title>Admin</title>
    </head>

    <body>
        <!--
        <nav class="px-[10px] py-[5px] block bg-black/30 mx-[auto] min-w-[1000px] w-[100%] backdrop-blur-[20px] border-b-[1px] border-gray text-right z-[5]">
            <a class="text-[13px] text-white hover:text-gold" href="#">Admin <i class="fa-solid fa-caret-down"></i></a>
        </nav>
        -->
        <main class="mx-[auto] grid grid-cols-12 grid-rows-1 min-w-[1366px] max-w-[1366px]">
            <!--left navigation bar-->
            <nav class="flex flex-col items-center justify-start col-span-2 text-[13px] py-[20px] h-[100%] border-r-[1px] border-gray">
                <button class="w-[100%] py-[10px] px-[20px] text-right" v-on:click="activeTab('modify')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'modify', 'text-gold cursor-default': openTab === 'modify'}">MODIFY</button>
                <button class="w-[100%] py-[10px] px-[20px] text-right" v-on:click="activeTab('student')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'student', 'text-gold cursor-default': openTab === 'student'}">STUDENT</button>
                <button class="w-[100%] py-[10px] px-[20px] text-right" v-on:click="activeTab('giver')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'giver', 'text-gold cursor-default': openTab === 'giver'}">GIVER</button>
                <details class="text-right w-full cursor-pointer">
                    <summary class="text-white py-[10px] px-[20px]">ADMIN</summary>
                    <button class="bg-black/20 px-[20px] text-white w-full text-right py-[10px]">SIGN OUT</button>
                </details>
            </nav>
            <!--add/edit/delete tab-->
            <section class="grid grid-cols-2 col-span-10" v-bind:class="{'hidden': openTab !== 'modify', 'block': openTab === 'modify'}">
                <!--middle section-->
                <div class="py-[30px] remove-scroll col-span-1 h-[100vh] overflow-y-scroll">
                    <!--units-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">UNIT</legend>
                        <input v-model="UnitName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Unit Name" />
                        <input v-model="UnitContactNumber" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="tel" placeholder="Contact Number" />
                        <div class="mb-[10px]">
                            <input v-model="UnitType" required class="align-middle mr-[5px]" type="radio" id="department" value="Department" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="department">Department</label>
                            <input v-model="UnitType" required class="align-middle mr-[5px]" type="radio" id="office" value="Office" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="office">Office</label>
                        </div>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteUnit()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editUnit()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addUnit()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--degrees-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">DEGREE</legend>
                        <input v-model="DegreeName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Degree Name" />
                        <select v-model="DegreeUnitIDPointer" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden value="">Select Department</option>
                            <option v-for="department in Departments" :key="department.objectId" v-bind:value="department.objectId">{{ department.UnitName }}</option>
                        </select>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteDegree()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editDegree()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addDegree()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--courses-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">COURSE</legend>
                        <input v-model="CourseName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Course Name" />
                        <input v-model="CourseCode" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Course Code" />
                        <legend class="mb-[10px] text-white text-[13px]">SELECT DEGREES (CTRL TO SELECT MULTIPLE)</legend>
                        <select v-model="CourseDegreesIDPointers" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[400px] px-[10px]">
                            <option v-for="degree in Degrees" :key="degree.objectId" v-bind:value="degree.objectId">{{ degree.DegreeName }}</option>
                        </select>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteCourse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editCourse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addCourse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--badges-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">BADGE</legend>
                        <input v-model="BadgeName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Badge Name" />
                        <input v-model="BadgeDescription" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input v-model="BadgeDesignInspiration" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Design Inspiration" />
                        <input v-model="BadgePoints" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Badge Points" />
                        <div class="mb-[10px]">
                            <input v-model="BadgeType" required class="align-middle mr-[5px]" type="radio" id="studentBadgeType" value="Student" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="studentBadgeType">Student</label>
                            <input v-model="BadgeType" required class="align-middle mr-[5px]" type="radio" id="houseBadgeType" value="House" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="houseBadgeType">House</label>
                        </div>
                        <input @change="onBadgeImageSelected" required class="text-[12px] h-[40px] w-[400px]" type="file" name="img" accept="image/x-png,image/gif,image/jpeg" ref="BadgeFileUpload"/>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteBadge()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editBadge()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addBadge()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--trophies-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">TROPHY</legend>
                        <input v-model="TrophyName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Trophy Name" />
                        <input v-model="TrophyDescription" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input v-model="TrophyDesignInspiration" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Design Inspiration" />
                        <input v-model="TrophyPoints" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Trophy Points" />
                        <div class="mb-[10px]">
                            <input v-model="TrophyType" required class="align-middle mr-[5px]" type="radio" id="studentTrophyType" value="Student" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="studentTrophyType">Student</label>
                            <input v-model="TrophyType" required class="align-middle mr-[5px]" type="radio" id="houseTrophyType" value="House" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="houseTrophyType">House</label>
                            <input v-model="TrophyType" required class="align-middle mr-[5px]" type="radio" id="ultimateTrophyType" value="Ultimate" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="ultimateTrophyType">Ultimate</label>
                        </div>
                        <legend v-if="TrophyType !== 'Ultimate' && TrophyType !== ''" class="mb-[10px] text-white text-[13px]">SELECT BADGES NEEDED BY TROPHY (CTRL TO SELECT MULTIPLE)</legend>
                        <select v-if="TrophyType !== 'Ultimate' && TrophyType !== ''" v-model="BadgesIDNeeded" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[400px] px-[10px]">
                            <template v-if="TrophyType === 'Student'">
                                <option v-for="badge in StudentBadges" :key="badge.objectId" v-bind:value="badge.objectId">{{ badge.BadgeName }}</option>
                            </template>
                            <template v-if="TrophyType === 'House'">
                                <option v-for="badge in HouseBadges" :key="badge.objectId" v-bind:value="badge.objectId">{{ badge.BadgeName }}</option>
                            </template>
                        </select>
                        <input @change="onTrophyImageSelected" required class="text-[12px] h-[40px] w-[400px]" type="file" name="img" accept="image/x-png,image/gif,image/jpeg" ref="TrophyFileUpload"/>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteTrophy()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editTrophy()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addTrophy()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--title-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">ASCENSION TITLE</legend>
                        <input v-model="AscensionName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Ascension Title" />
                        <input v-model="AscensionXpRangeStart" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" min="0" max="940" type="number" placeholder="Starting XP Value" />
                        <input v-model="AscensionXpRangeCap" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" min="120px" max="1020" type="number" placeholder="Max XP Value" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteAscensionTitle()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editAscensionTitle()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addAscensionTitle()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--cosmetics-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">COSMETICS</legend>
                        <input v-model="CosmeticName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Cosmetic Name" />
                        <select v-model="CosmeticType" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden value="">Cosmetic Type</option>
                            <option class="text-black" value="Avatar">Avatar</option>
                            <option class="text-black" value="Frame">Frames</option>
                            <option class="text-black" value="Banner">Banner</option>
                            <option class="text-black" value="CoverPhoto" >Background</option>
                        </select>
                        <input @change="onCosmeticImageSelected" required class="text-[12px] h-[40px] w-[400px]" type="file" name="img" accept="image/x-png,image/gif,image/jpeg" ref="CosmeticFileUpload"/>
                        <div class="w-[400px] grid grid-cols-4 grid-rows-2 gap-2">
                            <input @click="deleteCosmetic()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="setDefaultCosmetic()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="SET DEFAULT" title="Set default for user's cosmetic" />
                            <input @click="editCosmetic()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addCosmetic()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                    <!--house-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">HOUSE</legend>
                        <input v-model="HouseName" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="House Name" />
                        <select v-model="HouseBannerIDPointer" required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden value="">Select Banner</option>
                            <option v-for="banner in Banners" :key="banner.objectId" v-bind:value="banner.objectId">{{ banner.CosmeticName }}</option>
                        </select>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input @click="deleteHouse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                            <input @click="editHouse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="EDIT" />
                            <input @click="addHouse()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="button" value="ADD" />
                        </div>
                    </form>
                </div>
                <!--right section-->
                <div class="col-span-1">
                    <!--sub navigation bar-->
                    <nav class="grid grid-cols-8 col-span-1">
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('units')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'units', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'units'}" title="List of Units, Degrees, and Courses">UNITS</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('degrees')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'degrees', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'degrees'}" title="List of Units, Degrees, and Courses">DEGREES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('courses')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'courses', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'courses'}" title="List of Units, Degrees, and Courses">COURSES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('badges')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'houses', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'houses'}" title="List of Badges and Trophies">BADGES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('trophies')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'trophies', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'trophies'}" title="List of Badges and Trophies">TROPHIES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('titles')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'titles', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'titles'}" title="List of Ascension Titles">TITLES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('cosmetics')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'cosmetics', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'cosmetics'}" title="List of Houses">COSMETICS</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('houses')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'houses', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'houses'}" title="List of Houses">HOUSES</button>
                    </nav>
                    <!--units tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'units', 'block': openModifyTab === 'units'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="unit in Units" :key="unit.objectId" v-bind:value="unit.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectUnit(unit)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedUnitID === unit.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--text-->
                                    <div class="flex col-span-9 cursor-default">
                                        <div class="flex justify-center items-center w-[auto]">{{unit.UnitName}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--degrees tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'degrees', 'block': openModifyTab === 'degrees'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="degree in Degrees" :key="degree.objectId" v-bind:value="degree.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectDegree(degree)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedDegreeID === degree.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--text-->
                                    <div class="flex col-span-8 cursor-default">
                                        <div class="flex justify-center items-center w-[auto]">{{degree.DegreeName}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--courses tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'courses', 'block': openModifyTab === 'courses'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="course in Courses" :key="course.objectId" v-bind:value="course.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectCourse(course)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedCourseID === course.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--text-->
                                    <div class="flex col-span-8 cursor-default">
                                        <div class="flex justify-center items-center w-[auto]">{{course.CourseName}}</div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--badges tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'badges', 'block': openModifyTab === 'badges'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="badge in Badges" :key="badge.objectId" v-bind:value="badge.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectBadge(badge)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedBadgeID === badge.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Badge" v-bind:src="badge.BadgeImage" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">{{badge.BadgeName}}</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]">{{badge.BadgeType}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--trophies tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'trophies', 'block': openModifyTab === 'trophies'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="trophy in Trophies" :key="trophy.objectId" v-bind:value="trophy.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectTrophy(trophy)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedTrophyID === trophy.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Trophy" v-bind:src="trophy.TrophyImage" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">{{trophy.TrophyName}}</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]">{{trophy.TrophyType}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--ascension title tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'titles', 'block': openModifyTab === 'titles'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="title in AscensionTitles" :key="title.objectId" v-bind:value="title.objectId">
                                <!--whole item-->
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectAscensionTitle(title)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedAscensionTitleID === title.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default w-[100%]">
                                        <div class="flex justify-center items-center w-[auto]">{{title.AscensionName}}</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default text-right mr-[10px]">
                                        <span class="w-[auto]">{{title.AscensionXpRangeStart}}</span>
                                        <span class="w-[auto] mx-[5px]">-</span>
                                        <span class="w-[auto]">{{title.AscensionXpRangeCap}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--cosmetics tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'cosmetics', 'block': openModifyTab === 'cosmetics'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="cosmetic in Cosmetics" :key="cosmetic.objectId" v-bind:value="cosmetic.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectCosmetic(cosmetic)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedCosmeticID === cosmetic.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Avatar" v-bind:src="cosmetic.CosmeticImage" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">{{cosmetic.CosmeticName}}</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <i v-if="cosmetic.CosmeticDefault" class="fa-solid fa-gear mr-[10px]"></i>
                                        <span class="text-right mr-[10px] w-[auto]">{{cosmetic.CosmeticType}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--house tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'houses', 'block': openModifyTab === 'houses'}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li v-for="house in Houses" :key="house.objectId" v-bind:value="house.objectId">
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button @click="selectHouse(house)" class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i v-if="SelectedHouseID === house.objectId" class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="House Logo" v-bind:src="house.HouseBanner" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">{{house.HouseName}}</div>
                                    </div>
                                    <!--number of population--> 
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]"><i class="mr-[5px] fa-solid fa-circle-user"></i>{{house.HousePopulation}}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <!--student list-->
            <section class="grid col-span-10 h-[100vh]" v-bind:class="{'hidden': openTab !== 'student', 'block': openTab === 'student'}">
                <div class="col-span-1 px-[30px] py-[30px]">
                    <!--selected user-->
                    <div class="grid grid-cols-11 mb-[10px] mx-[auto] h-[25vh] w-[100%]">
                        <!--user image-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-5 flex items-center justify-start">
                            <div class="relative flex items-center justify-center w-[150px] h-[150px] mr-[5px]">
                                <img v-if="SelectedStudentID !== ''" class="border-[5px] border-white absolute h-[120px] w-[120px] rounded-full" loading="lazy" alt="Avatar" v-bind:src="StudentEquippedCosmeticsData[0].CosmeticImage"/>
                            </div>
                            <div>
                                <span class="block text-[22px] text-gold">{{StudentUserName}}</span>
                                <span class="block text-[12px] text-white">{{StudentFirstName}} {{StudentMiddleName}} {{StudentLastName}}</span>
                                <span class="block text-[12px] text-white">{{StudentAddress}}</span>
                                <span class="block text-[12px] text-white">{{StudentContactNum}}</span>
                                <span class="block text-[12px] text-white">{{StudentEmail}}</span>
                            </div>
                        </div>
                        <!--house banner-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-1 flex items-center justify-center">
                            <img class="w-[60px] h-[auto]" loading="lazy" title="House Banner" alt="House Banner" v-bind:src="StudentHouseData.HouseBanner" />
                        </div>
                        <!--top three trophies and recently obtained badges-->
                        <div v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-3 flex flex-col items-center justify-center">
                                <!--trophies-->
                                <div class="grid grid-cols-3 items-center justify-center gap-3">
                                    <template v-for="trophy in StudentChosenTrophies" :key="trophy">
                                        <img v-if="trophy !== null" class="col-span-1 inline-block w-[50px] h-[auto]" v-bind:title="trophy.TrophyName" loading="lazy"  v-bind:alt="trophy.TrophyName" v-bind:src="trophy.TrophyImage" />
                                    </template>
                                </div>
                                <!--badges-->
                                <span class="block border-gray border-b-[1px] my-[5px] mx-[auto] leading-[0.1px] w-[250px]"></span> <!--separator-->
                                <div class="grid grid-cols-5 items-center justify-center gap-3">
                                    <template v-for="badge in StudentAcquiredBadges" :key="badge">
                                        <img v-if="badge !== null" class="col-span-1 inline-block w-[35px] h-[auto]" v-bind:title="badge.BadgeName" loading="lazy" v-bind:alt="badge.BadgeName" v-bind:src="badge.BadgeImage" />
                                    </template>
                                </div>
                        </div>
                    </div>
                    <!--search bar-->
                    <form class="mb-[10px] mx-[auto] w-[100%]">
                        <input v-model="StudentSearch" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[400px] px-[10px]" type="text" placeholder="Search student..." />
                        <span class="mb-[10px] mx-[10px] text-white text-[11px]">Search by:</span>
                        <select v-model="StudentSearchType" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[150px] px-[10px]">
                            <option class="text-black" value="FirstName">First Name</option>
                            <option class="text-black" value="LastName">Last Name</option>
                            <option class="text-black" value="UserName">User Name</option>
                            <option class="text-black" value="SchoolID">School ID</option>
                        </select>
                    </form>
                    <!--student list-->
                    <table class="mx-[auto] border-gray w-[100%] border-[1px]">
                        <thead class="bg-black/20 border-b-[1px] border-gray text-white flex flex-col">
                            <tr class="py-[5px] px-[10px]">
                                <th class="sticky w-[40px] text-[13px] text-center font-normal"></th>
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">School ID</th>
                                <th class="sticky w-[350px] text-[13px] text-center font-normal">Degree</th>
                                <th class="sticky w-[50px] text-[13px] text-center font-normal">Year</th>
                                <th class="sticky w-[100px] text-[13px] text-center font-normal">House</th>
                                <th class="sticky w-[75px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-black/30 remove-scroll text-white overflow-y-scroll h-[50vh] flex flex-col">
                            <tr v-for="student in studentQuery" :key="student.objectId" v-bind:value="student.objectId" class="py-[5px] px-[10px]">                           
                                <td class="w-[40px] text-center">
                                    <button @click="selectStudent(student)" class="text-[25px] hover:text-white/50 active:text-white/20"><i class="fa-solid fa-eye"></i></button>
                                </td>
                                <td class="w-[320px] text-[12px] text-left">
                                    <div class="flex items-center justify-start">
                                        <img class="border-[2px] h-[40px] w-[40px] mr-[10px] rounded-full" loading="lazy" alt="Avatar" v-bind:src="student.EquippedCosmeticsData[0].CosmeticImage">
                                        <div>
                                            <span class="block my-[-3px] text-[13px]">{{student.UserName}}</span>
                                            <span class="block my-[-3px] text-[12px]">{{student.FirstName}} {{student.MiddleName}} {{student.LastName}}</span>    
                                        </div>
                                    </div>
                                </td>
                                <td class="w-[120px] text-[12px] text-center">{{student.SchoolID}}</td>
                                <td class="w-[350px] text-[12px] text-left">{{student.StudentDegree.DegreeName}}</td>
                                <td class="w-[50px] text-[12px] text-center">{{student.YearLevel}}</td>
                                <td class="w-[100px] text-[12px] text-center">{{student.StudentHouse.HouseName}}</td>
                                <td class="w-[75px] text-[12px] text-center">
                                    <button @click="selectStudent(student, 'edit')" class="mr-[5px] bg-blue hover:bg-blue_hover active:bg-blue_active w-[30px] h-[30px] text-white" title="Edit this user" v-on:click="activePopUp('editStudent')"><i class="fa-solid fa-user-pen"></i></button>
                                    <button @click="selectStudent(student, 'delete')" class="ml-[5px] bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--pop up menu (edit menu)-->  
                    <div class="flex items-center justify-center absolute inset-[0px] m-[auto] bg-black/20 backdrop-blur-[20px] w-[100vw] h-[100vh]" v-bind:class="{'hidden': popUp === 'closePopUp', 'hidden': popUp !== 'editStudent', 'flex': popUp === 'editStudent'}">
                        <div class="absolute inset-[0px] m-[auto] bg-black/50 text-white border-[1px] border-gray h-[70vh] w-[75vh] remove-scroll overflow-scroll">
                            <!--header-->
                            <header class="flex flex-row gap-2 items-center sticky top-[0px] bg-black border-b-[1px] border-gray px-[10px]">
                                <button class="text-white hover:text-gold my-[auto]" v-on:click="activePopUp('closePopUp')"><i class="fa-solid fa-angle-left"></i></button>
                                <span v-if="SelectedStudentID !== ''" class="w-[100%] text-[12px]">{{StudentFirstName}} {{StudentMiddleName}} {{StudentLastName}}</span>
                                <div class="float-right flex flex-row">
                                    <button @click="deleteStudent()" class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-red_hover active:text-red_active" title="Delete this user"><i class="fa-solid fa-user-slash"></i>DELETE</button>
                                    <button @click="editStudent()" class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-blue_hover active:text-blue_active" title="Save changes"><i class="fa-solid fa-floppy-disk"></i>SAVE</button>
                                </div>
                            </header>
                            <!--student information-->
                            <section v-if="SelectedStudentID !== ''" class="flex flex-col gap-3 items-center justify-center py-[20px]">
                                <input v-model="StudentFirstName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="First Name" />
                                <input v-model="StudentMiddleName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Middle Name" />
                                <input v-model="StudentLastName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Last Name" />
                                <input v-model="StudentAddress" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Current Address" />
                                <input v-model="StudentContactNum" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="tel" placeholder="Contact Number" />
                                <input v-model="StudentEmail" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Email" />
                                <input v-model="StudentSchoolID" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="School ID" />
                                <select v-model="StudentDegreeIDPointer" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">
                                    <option v-for="degree in Degrees" :key="degree.objectId" v-bind:value="degree.objectId">{{ degree.DegreeName }}</option>
                                </select>
                                <!--year level-->
                                <select v-model="StudentYearLevel" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">
                                    <option class="text-black" value=1>1</option>
                                    <option class="text-black" value=2>2</option>
                                    <option class="text-black" value=3>3</option>
                                    <option class="text-black" value=4>4</option>
                                </select>
                                <!--courses taken by student-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">COURSE LIST</summary>
                                    <select v-model="StudentCoursesIDToDelete" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[28vw] px-[10px]">
                                        <template v-for="course in Courses" :key="course.objectId">
                                            <option v-if="StudentCoursesIDPointer.indexOf(course.objectId) !== -1" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                        </template>
                                    </select>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input @click="deleteStudentCourses()" required class="bg-red hover:bg-red_hover active:to-red_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                                    </div>
                                </details>

                                <!--add courses-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">ADD COURSE</summary>
                                    <select v-model="StudentCoursesIDToAdd" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[28vw] px-[10px]">
                                        <template v-for="course in Courses" :key="course.objectId">
                                            <option v-if="(course.CourseDegreesIDPointers.indexOf(StudentDegreeIDPointer) !== -1 || course.CourseDegreesIDPointers.length === 0 ) && StudentCoursesIDPointer.indexOf(course.objectId) === -1" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                        </template>
                                    </select>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input @click="addStudentCourses()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="button" value="ADD" />
                                    </div>
                                </details>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <!--giver list-->
            <section class="grid col-span-10 h-[100vh]" v-bind:class="{'hidden': openTab !== 'giver', 'block': openTab === 'giver'}">
                <div class="col-span-1 px-[30px] py-[30px]">
                    <!--search bar-->
                    <form class="mb-[10px] mx-[auto] w-[100%]">
                        <input v-model="GiverSearch" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[400px] px-[10px]" type="text" placeholder="Search giver..." />
                        <span class="mb-[10px] mx-[10px] text-white text-[11px]">Search by:</span>
                        <select v-model="GiverSearchType" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[150px] px-[10px]">
                            <option class="text-black" value="FirstName">First Name</option>
                            <option class="text-black" value="LastName">Last Name</option>
                        </select>
                    </form>
                    <!--giver list-->
                    <table class="mx-[auto] border-gray w-[100%] border-[1px]">
                        <thead class="bg-black/20 border-b-[1px] border-gray text-white flex flex-col">
                            <tr class="py-[5px] px-[10px]">
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">Giver Type</th>
                                <th class="sticky w-[170px] text-[13px] text-center font-normal">Job Title</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">Contact Number</th>
                                <th class="sticky w-[250px] text-[13px] text-center font-normal">Email</th>
                                <th class="sticky w-[75px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-black/30 remove-scroll text-white overflow-y-scroll flex flex-col h-[78vh]">
                            <tr v-for="giver in giverQuery" :key="giver.objectId" v-bind:value="giver.objectId" class="py-[5px] px-[10px]">
                                <td class="w-[320px] text-[12px] text-left">{{giver.FirstName}} {{giver.MiddleName}} {{giver.LastName}}</td>
                                <td class="w-[120px] text-[12px] text-center">{{giver.GiverType}}</td>
                                <td class="w-[170px] text-[12px] text-center">{{giver.JobTitle}}</td>
                                <td class="w-[120px] text-[12px] text-center">{{giver.ContactNumber}}</td>
                                <td class="w-[250px] text-[12px] text-center">{{giver.Email}}</td>
                                <td class="w-[75px] text-[12px] text-center">
                                    <button @click="selectGiver(giver, 'edit')" class="mr-[5px] bg-blue hover:bg-blue_hover active:bg-blue_active w-[30px] h-[30px] text-white" title="Edit this user" v-on:click="activePopUp('editGiver')"><i class="fa-solid fa-user-pen"></i></button>
                                    <button @click="selectGiver(giver, 'delete')" class="ml-[5px] bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <!--pop up menu (edit menu)-->  
                    <div class="flex items-center justify-center absolute inset-[0px] m-[auto] bg-black/20 backdrop-blur-[20px] w-[100vw] h-[100vh]" v-bind:class="{'hidden': popUp === 'closePopUp', 'hidden': popUp !== 'editGiver', 'flex': popUp === 'editGiver'}">
                        <div class="absolute inset-[0px] m-[auto] bg-black/50 text-white border-[1px] border-gray h-[70vh] w-[75vh] remove-scroll overflow-scroll">
                            <!--header-->
                            <header class="flex flex-row gap-2 items-center sticky top-[0px] bg-black border-b-[1px] border-gray px-[10px]">
                                <button class="text-white hover:text-gold my-[auto]" v-on:click="activePopUp('closePopUp')"><i class="fa-solid fa-angle-left"></i></button>
                                <span class="w-[100%] text-[12px]">{{GiverFirstName}} {{GiverMiddleName}} {{GiverLastName}}</span>
                                <div class="float-right flex flex-row">
                                    <button @click="deleteGiver()" class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-red_hover active:text-red_active" title="Delete this user"><i class="fa-solid fa-user-slash"></i>DELETE</button>
                                    <button @click="editGiver()" class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-blue_hover active:text-blue_active" title="Save changes"><i class="fa-solid fa-floppy-disk"></i>SAVE</button>
                                </div>
                            </header>
                            <!--student information-->
                            <section class="flex flex-col gap-3 items-center justify-center py-[20px]">
                                <input v-model="GiverFirstName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="First Name" />
                                <input v-model="GiverMiddleName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Middle Name" />
                                <input v-model="GiverLastName" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Last Name" />
                                <input v-model="GiverContactNum" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="tel" placeholder="Contact Number" />
                                <input v-model="GiverEmail" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Email" />
                                <input v-model="GiverJobTitle" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Job Title" />
                                <select v-model="GiverUnitIDPointer" class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">  
                                    <option hidden value="">Select Units</option>
                                    <option v-for="unit in Units" :key="unit.objectId" v-bind:value="unit.objectId">{{ unit.UnitName }}</option>
                                </select>
                                <!--courses taken by giver-->
                                <details v-if="GiverType === 'Teacher'" class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">COURSE LIST</summary>
                                    <select v-model="GiverCoursesIDToDelete" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[28vw] px-[10px]">
                                        <template v-for="course in Courses" :key="course.objectId">
                                            <option v-if="GiverCoursesIDPointer.indexOf(course.objectId) !== -1" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                        </template>
                                    </select>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input @click="deleteGiverCourses()" required class="bg-red hover:bg-red_hover active:to-red_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="button" value="DELETE" />
                                    </div>
                                </details>
                                <!--add courses-->
                                <details v-if="GiverType === 'Teacher'" class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">ADD COURSE</summary>
                                    <select v-model="GiverCoursesIDToAdd" multiple required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[60px] w-[28vw] px-[10px]">
                                        <template v-for="course in Courses" :key="course.objectId">
                                            <option v-if="GiverCoursesIDPointer.indexOf(course.objectId) === -1" v-bind:value="course.objectId">{{ course.CourseName }}</option>
                                        </template>
                                    </select>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input @click="addGiverCourses()" required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="button" value="ADD" />
                                    </div>
                                </details>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </body>
</template> 

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css';

    export default {
        data(){
            return{
                //Frontend Variables
                openTab: 'student', //modify, student, giver
                openModifyTab: 'units', //units, degrees, courses, trophies, badges, titles, cosmetics, houses
                popUp: '', //editStudent, closePopUp
                openStudent: 0,
                isHidden: true,
                
                //Backend Variables
                //Containers
                Departments: [],
                Units: [],
                Degrees: [],
                Courses: [],
                Badges: [],
                HouseBadges: [],
                StudentBadges: [],
                Trophies: [],
                AscensionTitles: [],
                Cosmetics: [],
                Banners: [],
                Houses: [],
                Students: [],
                Givers: [],

                //Unit Variables
                UnitName: '',
                UnitContactNumber: '',
                UnitType: '', 
                SelectedUnitID: '',

                //Degree Variables
                DegreeName: '',
                DegreeUnitIDPointer: '',
                SelectedDegreeID: '',

                //Course Variables
                CourseName: '',
                CourseCode: '',
                CourseDegreesIDPointers: [],
                SelectedCourseID: '',
                
                //Badge Variables
                BadgeName: '',
                BadgeDescription: '',
                BadgePoints: '',
                BadgeImage: '',
                BadgeImageName: '',
                BadgeType: '',
                BadgeDesignInspiration: '',
                SelectedBadgeID: '',

                //Trophy Variables
                TrophyName: '',
                TrophyDescription: '',
                TrophyPoints: 0,
                TrophyImage: '',
                TrophyImageName: '',
                TrophyType: '',
                TrophyDesignInspiration: '',
                BadgesIDNeeded: [],
                SelectedTrophyID: '',

                //Ascension Title Variables
                AscensionName: '',
                AscensionXpRangeStart: 0,
                AscensionXpRangeCap: 0,
                SelectedAscensionTitleID: '',

                //Cosmetic Variables
                CosmeticName: '',
                CosmeticType: '',
                CosmeticImage: '',
                CosmeticImageName: '',
                SelectedCosmeticID: '',

                //House Variables,
                HouseName: '',
                HouseBannerIDPointer: '',
                SelectedHouseID: '',

                //StudentVariables
                StudentFirstName: '',
                StudentMiddleName: '',
                StudentLastName: '',
                StudentContactNum: '',
                StudentEmail: '',
                StudentDegreeIDPointer: '',
                StudentUnitIDPointer: '',
                StudentUserName: '',
                StudentAddress: '',
                StudentSchoolID: '',
                StudentYearLevel: 1,
                StudentCoursesIDPointer: [],
                StudentCoursesIDToDelete: [],
                StudentCoursesIDToAdd: [],
                StudentEquippedCosmeticsData: [],
                SelectedStudentID: '',
                StudentSearch: '',
                StudentChosenTrophies: [],
                StudentAcquiredBadges: [],
                StudentHouseData: '',
                StudentSearchType: "FirstName",

                //Giver Variables
                GiverFirstName: '',
                GiverMiddleName: '',
                GiverLastName: '',
                GiverEmail: '',
                GiverContactNum: '',
                GiverJobTitle: '',
                GiverUnitIDPointer: '',
                GiverCoursesIDPointer: [],
                GiverCoursesIDToAdd: [],
                GiverCoursesIDToDelete: [],
                GiverType: '',
                SelectedGiverID: '',
                GiverSearch: '',
                GiverSearchType: "FirstName",
            }
        },

        methods: {
            //==================Frontend Functions====================
            activeTab: function (tabType) {
                this.openTab = tabType
            },
            activeModifyTab: function (modifyTabType) {
                this.openModifyTab = modifyTabType
            },
            activePopUp: function (popUpType) {
                this.popUp = popUpType
            },
            viewStudent: function (studentNumber) {
                this.openStudent = studentNumber
            },
            activeSubTab: function (subTabsNumber) {
                this.openSubTab = subTabsNumber
            },
            
            //==================Backend Functions======================
            //Container Functions
            async getDepartments(){ //Combine this with units
                var params = {"UnitType" : "Department"};
                const res = JSON.parse(await Parse.Cloud.run("GetUnits", params));
                this.Departments = res;
            },

            async getUnits(){
                const res = JSON.parse(await Parse.Cloud.run("GetUnits"));
                this.Units = res;
            },

            async getDegrees(){
                const res = JSON.parse(await Parse.Cloud.run("GetDegrees"));
                this.Degrees = res;
            },

            async getCourses(){
                const res = JSON.parse(await Parse.Cloud.run("GetCourses"));
                this.Courses = res;
            },

            async getBadges(){
                const res = JSON.parse(await Parse.Cloud.run("GetBadges"));
                this.Badges = res;

                var params = {"BadgeType" : "Student"};
                this.StudentBadges = JSON.parse(await Parse.Cloud.run("GetBadges", params));
                params["BadgeType"] = "House";
                this.HouseBadges = JSON.parse(await Parse.Cloud.run("GetBadges", params));
            },

            async getTrophies(){
                const res = JSON.parse(await Parse.Cloud.run("GetTrophies"));
                this.Trophies = res;
            },

            async getAscensionTitles(){
                const res = JSON.parse(await Parse.Cloud.run("GetAscensionTitles"));
                this.AscensionTitles = res;
            },

            async getCosmetics(){
                const res = JSON.parse(await Parse.Cloud.run("GetCosmetics"));
                this.Cosmetics = res;
                
                var params = {"CosmeticType" : "Banner"};
                this.Banners = JSON.parse(await Parse.Cloud.run("GetCosmetics", params));

                //Get Data for defaults
                const Global = JSON.parse(await Parse.Cloud.run("GetGlobal"));
                for(var cosmetic of this.Cosmetics){
                    if(cosmetic.objectId === Global.DefaultAvatarID || cosmetic.objectId === Global.DefaultFrameID
                    || cosmetic.objectId === Global.DefaultCoverPhotoID || cosmetic.objectId === Global.DefaultBannerID){
                        cosmetic["CosmeticDefault"] = true;
                    }
                    else{
                        cosmetic["CosmeticDefault"] = false;
                    }
                }
            },

            async getHouses(){
                const res = JSON.parse(await Parse.Cloud.run("GetHouses"));
                this.Houses = res;

                //Add house banner
                for(var house of this.Houses){
                    var params = {"HouseID" : house.objectId};
                    const data = JSON.parse(await Parse.Cloud.run("GetHouseData", params));
                    house["HouseBanner"] = data.HouseBanner;
                }
            },

            async getStudents(){
                this.Students = [];
                var res = JSON.parse(await Parse.Cloud.run("GetStudents"));
                for(var student of res){
                    var param = {"DegreeID" : student.StudentDegreeIDPointer};
                    student["StudentDegree"] = JSON.parse(await Parse.Cloud.run("GetDegreeData", param));
                    param = {"HouseID" : student.StudentHouseIDPointer};
                    student["StudentHouse"] = JSON.parse(await Parse.Cloud.run("GetHouseData", param));

                    var EquippedCosmeticsData = [];
                    for(const cosmeticID of student.EquippedCosmetics){
                        param = {
                            "CosmeticID" : cosmeticID,
                        }
                        EquippedCosmeticsData.push(JSON.parse(await Parse.Cloud.run("GetCosmeticData", param)));
                    }
                    student["EquippedCosmeticsData"] = EquippedCosmeticsData;
                    this.Students.push(student);
                    
                    /*
                        This is replaced since this is loading all data of the student, just do this upon selecting
                        this.Students.push(JSON.parse(await Parse.Cloud.run("GetStudentData", param)));
                    */
                }
            },

            async getGivers(){
                this.Givers = [];
                var teachers = JSON.parse(await Parse.Cloud.run("GetTeachers"));
                for(var teacher of teachers){
                    teacher["GiverType"] = "Teacher";
                }
                var nt_distributors = JSON.parse(await Parse.Cloud.run("GetNT_Distributors"));
                for(var nt_distributor of nt_distributors){
                    nt_distributor["GiverType"] = "NT_Distributor";
                }
                this.Givers = this.Givers.concat(teachers, nt_distributors);
            },
            
            //Other Functions
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            },

            checkIncompleteData(type){
                if(type === "Unit"){
                    return (this.UnitName === "" || this.UnitContactNumber === "" || this.UnitTpe === "");
                }
                else if(type === "Degree"){
                    return (this.DegreeName === "" || this.DegreeUnitIDPointer === "");
                }
                else if(type === "Course"){
                    return (this.CourseName === "" || this.CourseCode === "");
                }
                else if(type === "Badge"){
                    return (this.BadgeName === "" || this.BadgeDescription === "" || this.BadgePoints === "" 
                    || this.BadgeType === "" || this.BadgeDesignInspiration === "");
                }
                else if(type === "Trophy"){
                    return (this.TrophyName === "" || this.TrophyDescription === "" || this.TrophyPoints === "" 
                    || this.TrophyType === "" || this.TrophyDesignInspiration === "");
                }
                else if(type === "AscensionTitle"){
                    return (this.AscensionName === "");
                }
                else if(type === "Cosmetic"){
                    return (this.CosmeticName === "" || this.CosmeticType === "");
                }
                else if(type === "House"){
                    return (this.HouseName === "" || this.HouseBannerIDPointer === "");
                }
                else if(type === "Student"){
                    return (this.SelectedStudentID === "" || this.StudentFirstName === "" || this.StudentMiddleName === ""
                    || this.StudentLastName === "" || this.StudentEmail === "" || this.StudentContactNum === ""
                    || this.StudentUserName === "" || this.StudentSchoolID === "");
                }
                else if(type === "Giver"){
                    return (this.SelectedGiverID === "" || this.GiverFirstName === "" || this.GiverMiddleName === ""
                    || this.GiverLastName === "" || this.GiverEmail === "" || this.GiverContactNum === ""
                    || this.GiverJobTitle === "" || this.GiverUnitIDPointer === "" || this.GiverType === "");
                }
                return false;
            },

            //Unit Functions
            async addUnit(){
                if(this.checkIncompleteData("Unit")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "UnitName": this.UnitName,
                    "UnitContactNumber": this.UnitContactNumber,
                    "UnitType" : this.UnitType,
                };
                await Parse.Cloud.run("AddUnit", params);
                alert("Added Unit!");
                this.resetSelectedUnit();

                //Update Departments and Units
                this.getUnits();
                this.getDepartments();
            },

            selectUnit(unit){
                if(this.SelectedUnitID !== unit.objectId){
                    this.SelectedUnitID = unit.objectId;
                    this.UnitName = unit.UnitName;
                    this.UnitContactNumber = unit.UnitContactNumber;
                    this.UnitType = unit.UnitType;
                }
                else{
                    this.resetSelectedUnit();
                }
            },

            resetSelectedUnit(){
                this.SelectedUnitID = "";
                this.UnitName = "";
                this.UnitContactNumber = "";
                this.UnitType = "";
            },

            async editUnit(){
                if(this.checkIncompleteData("Unit")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "UnitID" : this.SelectedUnitID,
                    "UnitName": this.UnitName,
                    "UnitContactNumber": this.UnitContactNumber,
                    "UnitType" : this.UnitType,
                };
                await Parse.Cloud.run("EditUnit", params);
                alert("Edited Unit!");
                this.resetSelectedUnit();

                //Update Departments and Units
                this.getUnits();
                this.getDepartments();
            },

            async deleteUnit(){
                if(this.SelectedUnitID === ""){
                    alert("Please select a Unit to Delete!");
                    return;
                }
                var params = {
                    "UnitID" : this.SelectedUnitID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteUnit", params);
                    alert("Deleted Unit!");
                    this.resetSelectedUnit();

                    //Update Departments and Units
                    this.getUnits();
                    this.getDepartments();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Degree Functions
            async addDegree(){
                if(this.checkIncompleteData("Degree")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "DegreeName" : this.DegreeName,
                    "DegreeUnitIDPointer" : this.DegreeUnitIDPointer,
                }
                await Parse.Cloud.run("AddDegree", params);
                alert("Added Degree");
                this.resetSelectedDegree();

                //Update degrees
                this.getDegrees();
            },

            selectDegree(degree){
                if(this.SelectedDegreeID !== degree.objectId){
                    this.SelectedDegreeID = degree.objectId;
                    this.DegreeName = degree.DegreeName;
                    this.DegreeUnitIDPointer = degree.DegreeUnitIDPointer;
                }
                else{
                    this.resetSelectedDegree();
                }
            },

            resetSelectedDegree(){
                this.SelectedDegreeID = "";
                this.DegreeName = "";
                this.DegreeUnitIDPointer = "";
            },

            async editDegree(){
                if(this.checkIncompleteData("Degree")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "DegreeID" : this.SelectedDegreeID,
                    "DegreeName": this.DegreeName,
                    "DegreeUnitIDPointer": this.DegreeUnitIDPointer,
                };
                await Parse.Cloud.run("EditDegree", params);
                alert("Edited Degree!");
                this.resetSelectedDegree();

                //Update degrees
                this.getDegrees();
            },

            async deleteDegree(){
                if(this.SelectedDegreeID === ""){
                    alert("Please select a Degree to Delete!");
                    return;
                }
                var params = {
                    "DegreeID" : this.SelectedDegreeID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteDegree", params);
                    alert("Deleted Degree!");
                    this.resetSelectedDegree();

                    //Update degrees
                    this.getDegrees();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Course Functions
            async addCourse(){
                if(this.checkIncompleteData("Course")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "CourseName" : this.CourseName,
                    "CourseCode" : this.CourseCode, 
                    "CourseDegreesIDPointers": this.CourseDegreesIDPointers
                }
                await Parse.Cloud.run("AddCourse", params);
                alert("Added Course");
                this.resetSelectedCourse();

                //Update courses
                this.getCourses();
            },

            selectCourse(course){
                if(this.SelectedCourseID !== course.objectId){
                    this.SelectedCourseID = course.objectId;
                    this.CourseName = course.CourseName;
                    this.CourseCode = course.CourseCode;
                    this.CourseDegreesIDPointers = course.CourseDegreesIDPointers;
                }
                else{
                    this.resetSelectedCourse();
                }
            },

            resetSelectedCourse(){
                this.SelectedCourseID = "";
                this.CourseName = "";
                this.CourseCode = "";
                this.CourseDegreesIDPointers = [];
            },

            async editCourse(){
                if(this.checkIncompleteData("Course")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "CourseID" : this.SelectedCourseID,
                    "CourseName" : this.CourseName,
                    "CourseCode" : this.CourseCode, 
                    "CourseDegreesIDPointers": this.CourseDegreesIDPointers
                };
                await Parse.Cloud.run("EditCourse", params);
                alert("Edited Course!");
                this.resetSelectedCourse();

                //Update courses
                this.getCourses();
            },

            async deleteCourse(){
                if(this.SelectedCourseID === ""){
                    alert("Please select a Course to Delete!");
                    return;
                }
                var params = {
                    "CourseID" : this.SelectedCourseID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteCourse", params);
                    alert("Deleted Course!");
                    this.resetSelectedCourse();

                    //Update courses
                    this.getCourses();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Badges Functions
            async addBadge(){
                if(this.checkIncompleteData("Badge") || this.BadgeImageName === ""){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "BadgeName" : this.BadgeName,
                    "BadgeDescription" : this.BadgeDescription,
                    "BadgePoints" : this.BadgePoints,
                    "BadgeType" : this.BadgeType,
                    "BadgeImage" : this.BadgeImage,
                    "BadgeImageName" : this.BadgeImageName,
                    "BadgeDesignInspiration" : this.BadgeDesignInspiration,
                }
                await Parse.Cloud.run("AddBadge", params);
                alert("Added Badge!");
                this.resetSelectedBadge();

                //Update badges
                this.getBadges();
            },

            async onBadgeImageSelected(e){
                var file = e.target.files[0];
                this.BadgeImageName = file.name;
                this.getBase64(file).then(
                    data => this.BadgeImage = data
                );
            },

            selectBadge(badge){
                if(this.SelectedBadgeID !== badge.objectId){
                    this.SelectedBadgeID = badge.objectId;
                    this.BadgeName = badge.BadgeName;
                    this.BadgeDescription = badge.BadgeDescription;
                    this.BadgePoints = badge.BadgePoints;
                    this.BadgeType = badge.BadgeType;
                    this.BadgeImage = badge.BadgeImage;
                    this.BadgeDesignInspiration = badge.BadgeDesignInspiration;
                }
                else{
                    this.resetSelectedBadge();
                }
            },

            resetSelectedBadge(){
                this.SelectedBadgeID = "";
                this.BadgeName = "";
                this.BadgeDescription = "";
                this.BadgePoints = "";
                this.BadgeType = "";
                this.BadgeImage = "";
                this.BadgeImageName = "";
                this.BadgeDesignInspiration = "";
                this.$refs.BadgeFileUpload.value = null;
            },

            async editBadge(){
                if(this.checkIncompleteData("Badge")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "BadgeID" : this.SelectedBadgeID,
                    "BadgeName" : this.BadgeName,
                    "BadgeDescription" : this.BadgeDescription,
                    "BadgePoints" : this.BadgePoints,
                    "BadgeType" : this.BadgeType,
                    "BadgeDesignInspiration" : this.BadgeDesignInspiration,
                };
                //If image is provided to change
                if(this.BadgeImageName != ""){
                    params["BadgeImage"] = this.BadgeImage;
                    params["BadgeImageName"] = this.BadgeImageName;
                }

                await Parse.Cloud.run("EditBadge", params);
                alert("Edited Badge!");
                this.resetSelectedBadge();

                //Update badges
                this.getBadges();
            },

            async deleteBadge(){
                if(this.SelectedBadgeID === ""){
                    alert("Please select a Badge to Delete!");
                    return;
                }
                var params = {
                    "BadgeID" : this.SelectedBadgeID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteBadge", params);
                    alert("Deleted Badge!");
                    this.resetSelectedBadge();

                    //Update badges
                    this.getBadges();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Trophy Functions
            async addTrophy(){
                if(this.checkIncompleteData("Trophy") || this.TrophyImageName === ""){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "TrophyName": this.TrophyName,
                    "TrophyDescription": this.TrophyDescription,
                    "TrophyPoints": this.TrophyPoints,
                    "TrophyImage": this.TrophyImage,
                    "TrophyType": this.TrophyType,
                    "BadgesIDNeeded": this.BadgesIDNeeded,
                    "TrophyImageName" : this.TrophyImageName,
                    "TrophyDesignInspiration" : this.TrophyDesignInspiration,
                }
                try{
                    await Parse.Cloud.run("AddTrophy", params);
                    alert("Added Trophy!");
                    this.resetSelectedTrophy();

                    //Update trophies
                    this.getTrophies();
                }
                catch(e){
                    alert(e.message)
                }
                
            },

            async onTrophyImageSelected(e){
                var file = e.target.files[0];
                this.TrophyImageName = file.name;
                this.getBase64(file).then(
                    data => this.TrophyImage = data
                );
            },
            
            selectTrophy(trophy){
                if(this.SelectedTrophyID !== trophy.objectId){
                    this.SelectedTrophyID = trophy.objectId;
                    this.TrophyName = trophy.TrophyName;
                    this.TrophyDescription = trophy.TrophyDescription;
                    this.TrophyPoints = trophy.TrophyPoints;
                    this.TrophyType = trophy.TrophyType;
                    this.TrophyImage = trophy.TrophyImage;
                    this.TrophyDesignInspiration = trophy.TrophyDesignInspiration;
                }
                else{
                    this.resetSelectedTrophy();
                }
            },

            resetSelectedTrophy(){
                this.SelectedTrophyID = "";
                this.TrophyName = "";
                this.TrophyDescription = "";
                this.TrophyPoints = "";
                this.TrophyType = "";
                this.TrophyImage = "";
                this.TrophyImageName = "";
                this.TrophyDesignInspiration = "";
                this.$refs.TrophyFileUpload.value = null;
            },

            async editTrophy(){
                if(this.checkIncompleteData("Trophy")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "TrophyID" : this.SelectedTrophyID,
                    "TrophyName": this.TrophyName,
                    "TrophyDescription": this.TrophyDescription,
                    "TrophyPoints": this.TrophyPoints,
                    "TrophyType": this.TrophyType,
                    "BadgesIDNeeded": this.BadgesIDNeeded,
                    "TrophyDesignInspiration" : this.TrophyDesignInspiration,
                };
                //If image is provided to change
                if(this.TrophyImageName != ""){
                    params["TrophyImage"] = this.TrophyImage;
                    params["TrophyImageName"] = this.TrophyImageName;
                }

                await Parse.Cloud.run("EditTrophy", params);
                alert("Edited Trophy!");
                this.resetSelectedTrophy();

                //Update trophies
                this.getTrophies();
            },

            async deleteTrophy(){
                if(this.SelectedTrophyID === ""){
                    alert("Please select a Trophy to Delete!");
                    return;
                }
                var params = {
                    "TrophyID" : this.SelectedTrophyID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteTrophy", params);
                    alert("Deleted Trophy!");
                    this.resetSelectedTrophy();

                    //Update trophies
                    this.getTrophies();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Ascension Title Functions
            async addAscensionTitle(){
                if(!(this.AscensionXpRangeCap > 0 && this.AscensionXpRangeStart > -1 && this.AscensionXpRangeStart < this.AscensionXpRangeCap)){
                    alert("Invalid Range Values!");
                    return;
                }
                else if(this.checkIncompleteData("AscensionTitle")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "AscensionName": this.AscensionName,
                    "AscensionXpRangeStart": this.AscensionXpRangeStart,
                    "AscensionXpRangeCap": this.AscensionXpRangeCap,
                }
                await Parse.Cloud.run("AddAscensionTitle", params);
                alert("Added Ascension Title");
                this.resetSelectedAscensionTitle();
                
                //Update AscensionTitles
                this.getAscensionTitles();
            },

            selectAscensionTitle(title){
                if(this.SelectedAscensionTitleID !== title.objectId){
                    this.SelectedAscensionTitleID = title.objectId;
                    this.AscensionName = title.AscensionName;
                    this.AscensionXpRangeStart = title.AscensionXpRangeStart;
                    this.AscensionXpRangeCap = title.AscensionXpRangeCap;
                }
                else{
                    this.resetSelectedAscensionTitle();
                }
            },

            resetSelectedAscensionTitle(){
                this.SelectedAscensionTitleID = "";
                this.AscensionName = "";
                this.AscensionXpRangeStart = 0;
                this.AscensionXpRangeCap = 0;
            },

            async editAscensionTitle(){
                if(!(this.AscensionXpRangeCap > 0 && this.AscensionXpRangeStart > -1 && this.AscensionXpRangeStart < this.AscensionXpRangeCap)){
                    alert("Invalid Range Values!");
                    return;
                }
                else if(this.checkIncompleteData("AscensionTitle")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "AscensionId" : this.SelectedAscensionTitleID,
                    "AscensionName": this.AscensionName,
                    "AscensionXpRangeStart": this.AscensionXpRangeStart,
                    "AscensionXpRangeCap": this.AscensionXpRangeCap,
                };
                await Parse.Cloud.run("EditAscensionTitle", params);
                alert("Edited Ascension Title!");
                this.resetSelectedAscensionTitle();

                //Update AscensionTitles
                this.getAscensionTitles();
            },

            async deleteAscensionTitle(){
                if(this.SelectedAscensionTitleID === ""){
                    alert("Please select an Ascension Title to Delete!");
                    return;
                }
                var params = {
                    "AscensionId" : this.SelectedAscensionTitleID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteAscensionTitle", params);
                    alert("Deleted Ascension Title!");
                     this.resetSelectedAscensionTitle();

                    //Update AscensionTitles
                    this.getAscensionTitles();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Cosmetic Functions
            async addCosmetic(){
                if(this.checkIncompleteData("Cosmetic") || this.CosmeticImageName === ""){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "CosmeticName" : this.CosmeticName,
                    "CosmeticType" : this.CosmeticType,
                    "CosmeticImage" : this.CosmeticImage,
                    "CosmeticImageName" : this.CosmeticImageName,
                }
                await Parse.Cloud.run("AddCosmetic", params);
                alert("Added " + this.CosmeticType);
                this.resetSelectedCosmetic();

                //Update Cosmetics
                this.getCosmetics();
            },

            selectCosmetic(cosmetic){
                if(this.SelectedCosmeticID !== cosmetic.objectId){
                    this.SelectedCosmeticID = cosmetic.objectId;
                    this.CosmeticName = cosmetic.CosmeticName;
                    this.CosmeticType = cosmetic.CosmeticType;
                    this.CosmeticImage = cosmetic.CosmeticImage;
                }
                else{
                    this.resetSelectedCosmetic();
                }
            },

            resetSelectedCosmetic(){
                this.SelectedCosmeticID = "";
                this.CosmeticName = "";
                this.CosmeticType = "";
                this.CosmeticImage = "";
                this.CosmeticImageName = "";
                this.$refs.CosmeticFileUpload.value = null;
            },

            async onCosmeticImageSelected(e){
                var file = e.target.files[0];
                this.CosmeticImageName = file.name;
                this.getBase64(file).then(
                    data => this.CosmeticImage = data
                );
            },

            async editCosmetic(){
                if(this.checkIncompleteData("Cosmetic")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "CosmeticID" : this.SelectedCosmeticID,
                    "CosmeticName" : this.CosmeticName,
                    "CosmeticType" : this.CosmeticType,
                }
                //If image is provided to change
                if(this.CosmeticImageName != ""){
                    params["CosmeticImage"] = this.CosmeticImage;
                    params["CosmeticImageName"] = this.CosmeticImageName;
                }
                await Parse.Cloud.run("EditCosmetic", params);
                alert("Edited Cosmetic");
                this.resetSelectedCosmetic();

                //Update Cosmetics
                this.getCosmetics();
            },

            async deleteCosmetic(){
                if(this.SelectedCosmeticID === ""){
                    alert("Please select a Cosmetic to Delete!");
                    return;
                }
                var params = {
                    "CosmeticID" : this.SelectedCosmeticID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteCosmetic", params);
                    alert("Deleted Cosmetic!");
                    this.resetSelectedCosmetic();

                    //Update cosmetics
                    this.getCosmetics();
                }
                catch(error){
                    alert(error.message);
                }
            },

            async setDefaultCosmetic(){
                var params = {
                    "CosmeticID" : this.SelectedCosmeticID,
                    "CosmeticType" : this.CosmeticType,
                }
                await Parse.Cloud.run("SetDefaultCosmetic", params);
                alert("Changed " + this.CosmeticType + "Default Cosmetic");

                //Update Cosmetics
                this.getCosmetics();
            },

            //House Functions
            async addHouse(){
                if(this.checkIncompleteData("House")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "HouseName" : this.HouseName,
                    "HouseBannerIDPointer" : this.HouseBannerIDPointer,
                }
                await Parse.Cloud.run("AddHouse", params);
                alert("Added House");
                this.resetSelectedHouse();

                //Update houses
                this.getHouses();
            },

            selectHouse(house){
                if(this.SelectedHouseID !== house.objectId){
                    this.SelectedHouseID = house.objectId;
                    this.HouseName = house.HouseName;
                    this.HouseBannerIDPointer = house.HouseBannerIDPointer;
                }
                else{
                    this.resetSelectedHouse();
                }
            },

            resetSelectedHouse(){
                this.SelectedHouseID = "";
                this.HouseName = "";
                this.HouseBannerIDPointer = "";
            },

            async editHouse(){
                if(this.checkIncompleteData("House")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "HouseID" : this.SelectedHouseID,
                    "HouseName" : this.HouseName,
                    "HouseBannerIDPointer" : this.HouseBannerIDPointer,
                }
                
                await Parse.Cloud.run("EditHouse", params);
                alert("Edited House");
                this.resetSelectedHouse();

                //Update houses
                this.getHouses();
            },

            async deleteHouse(){
                if(this.SelectedHouseID === ""){
                    alert("Please select a House to Delete!");
                    return;
                }
                var params = {
                    "HouseID" : this.SelectedHouseID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteHouse", params);
                    alert("Deleted House!");
                    this.resetSelectedHouse();

                    //Update houses
                    this.getHouses();
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Student functions
            async selectStudent(student, method){
                if(this.SelectedStudentID !== student.objectId){
                    this.SelectedStudentID = student.objectId;
                    this.StudentFirstName = student.FirstName;
                    this.StudentMiddleName = student.MiddleName;
                    this.StudentLastName = student.LastName;
                    this.StudentContactNum = student.ContactNumber;
                    this.StudentEmail = student.Email;
                    this.StudentDegreeIDPointer = student.StudentDegreeIDPointer;
                    this.StudentUnitIDPointer = student.StudentUnitIDPointer;
                    this.StudentUserName = student.UserName;
                    this.StudentAddress = student.Address;
                    this.StudentSchoolID = student.SchoolID;
                    this.StudentYearLevel = student.YearLevel;
                    this.StudentCoursesIDPointer = student.StudentCoursesIDPointer;
                    this.StudentEquippedCosmeticsData = student.EquippedCosmeticsData;
                    this.openStudent = 1;

                    //GetSelected student other data (badges and trophies)
                    var param = {"StudentID" : student.objectId};
                    var studentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
                    this.StudentAcquiredBadges = studentData.BadgesEarned;
                    this.StudentChosenTrophies = studentData.ChosenTrophiesData;
                    this.StudentHouseData = student.StudentHouse;

                    //Fix Chosen Trophies
                    for(let i = 0; i < 3; ++i){
                        if(!this.StudentChosenTrophies[i]){
                            this.StudentChosenTrophies[i] = null;
                        }
                    }

                    //Fix Acquired Badges
                    this.StudentAcquiredBadges.slice(0, 5);
                    for(let i = 0; i < 5; ++i){
                        if(!this.StudentAcquiredBadges[i]){
                            this.StudentAcquiredBadges[i] = null;
                        }
                    }
                    //Sort data by date rewarded(not sure)
                    this.StudentAcquiredBadges.sort(function(first, second) {
                        return first.DateRewarded > second.DateRewarded;
                    });
                }
                else{
                    if(method === "edit"){
                        //Reselect student to clear changes
                        this.SelectedStudentID = "";
                        this.selectStudent(student);
                        return;
                    }
                    this.openStudent = 0;
                    this.resetSelectedStudent();
                }
                if(method === "delete"){
                    this.openStudent = 0;
                    this.deleteStudent();
                }
            },

            resetSelectedStudent(){
                this.SelectedStudentID = "";
                this.StudentFirstName = "";
                this.StudentMiddleName = "";
                this.StudentLastName = "";
                this.StudentContactNum = "";
                this.StudentEmail = "";
                this.StudentDegreeIDPointer = "";
                this.StudentUnitIDPointer = "";
                this.StudentUserName = "";
                this.StudentAddress = "";
                this.StudentSchoolID = "";
                this.StudentYearLevel = 1;
                this.StudentCoursesIDPointer = [];
                this.StudentCoursesIDToAdd = [];
                this.StudentCoursesIDToDelete = [];
                this.StudentEquippedCosmeticsData = [];
            },

            addStudentCourses(){
                this.StudentCoursesIDPointer = this.StudentCoursesIDPointer.concat(this.StudentCoursesIDToAdd);
            },

            deleteStudentCourses(){
                for(const e of this.StudentCoursesIDToDelete){
                    var index = this.StudentCoursesIDPointer.indexOf(e);
                    if (index > -1){
                        this.StudentCoursesIDPointer.splice(index, 1);
                        break;
                    }
                }
            },

            async editStudent(){
                if(this.checkIncompleteData("Student")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var params = {
                    "StudentID" : this.SelectedStudentID,
                    "FirstName" : this.StudentFirstName,
                    "MiddleName" : this.StudentMiddleName,
                    "LastName" : this.StudentLastName,
                    "Email" : this.StudentEmail,
                    "ContactNumber" : this.StudentContactNum,
                    "UserName" : this.StudentUserName,
                    "Address" : this.StudentAddress,
                    "SchoolID" : this.StudentSchoolID,
                    "YearLevel" : this.StudentYearLevel,
                    "StudentUnitIDPointer" : this.StudentUnitIDPointer,
                    "StudentDegreeIDPointer" : this.StudentDegreeIDPointer,
                    "StudentCoursesIDPointer" : this.StudentCoursesIDPointer,
                }
                await Parse.Cloud.run("EditStudent", params);
                alert("Edited Student");
                
                //Update students
                this.getStudents();
            },

            async deleteStudent(){
                if(this.SelectedStudentID === ""){
                    alert("Please select a Student to Delete!");
                    return;
                }
                var params = {
                    "StudentID" : this.SelectedStudentID,
                }

                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run("DeleteStudent", params);
                    alert("Deleted Student!");
                    this.resetSelectedStudent();

                    //Update students
                    this.getStudents();
                    //Close student info
                    this.openStudent = 0;
                    //Close student popup
                    this.activePopUp('closePopUp');
                }
                catch(error){
                    alert(error.message);
                }
            },

            //Giver Functions
            selectGiver(giver, method){
                if(this.SelectedGiverID !== giver.objectId){
                    this.SelectedGiverID = giver.objectId;
                    this.GiverFirstName = giver.FirstName;
                    this.GiverMiddleName = giver.MiddleName;
                    this.GiverLastName = giver.LastName;
                    this.GiverContactNum = giver.ContactNumber;
                    this.GiverEmail = giver.Email;
                    this.GiverJobTitle = giver.JobTitle;
                    this.GiverType = giver.GiverType;
                    if(this.GiverType === "Teacher"){
                        this.GiverUnitIDPointer = giver.TeacherUnitIDPointer;
                        this.GiverCoursesIDPointer = giver.TeacherCoursesIDPointer;
                    }
                    else{
                        this.GiverUnitIDPointer = giver.NT_DistributorUnitIDPointer;
                    }
                }
                if(method === "edit"){
                    //Reselect giver to clear changes
                    this.SelectedGiverID = "";
                    this.selectGiver(giver);
                    return;
                }
                if(method === "delete"){
                    //Close popup
                    this.activePopUp('closePopUp');
                    this.deleteGiver();
                }
            },

            resetSelectedGiver(){
                this.SelectedGiverID = "";
                this.GiverFirstName = "";
                this.GiverMiddleName = "";
                this.GiverLastName = "";
                this.GiverContactNum = "";
                this.GiverEmail = "";
                this.GiverJobTitle = "";
                this.GiverType = "";
                
                this.GiverUnitIDPointer =  "";
                this.GiverCoursesIDPointer = [];
                this.GiverCoursesIDToAdd = [];
                this.GiverCoursesIDToDelete = [];
            },

            addGiverCourses(){
                this.GiverCoursesIDPointer = this.GiverCoursesIDPointer.concat(this.GiverCoursesIDToAdd);
            },

            deleteGiverCourses(){
                for(const e of this.GiverCoursesIDToDelete){
                    var index = this.GiverCoursesIDPointer.indexOf(e);
                    if (index > -1){
                        this.GiverCoursesIDPointer.splice(index, 1);
                        break;
                    }
                }
            },

            async editGiver(){
                if(this.checkIncompleteData("Giver")){
                    alert("Please completely fill out the form!");
                    return;
                }
                var functionName = "";
                var params = {
                    "FirstName" : this.GiverFirstName,
                    "MiddleName" : this.GiverMiddleName,
                    "LastName" : this.GiverLastName,
                    "ContactNumber" : this.GiverContactNum,
                    "Email" : this.GiverEmail,
                    "JobTitle" : this.GiverJobTitle,
                }
                if(this.GiverType === "Teacher"){
                    params["TeacherID"] = this.SelectedGiverID;
                    params["TeacherUnitIDPointer"] = this.GiverUnitIDPointer;
                    params["TeacherCoursesIDPointer"] = this.GiverCoursesIDPointer;
                    functionName = "EditTeacher";
                }
                else{
                    params["NT_DistributorID"] = this.SelectedGiverID;
                    params["NT_DistributorUnitIDPointer"] = this.GiverUnitIDPointer;
                    functionName = "EditNT_Distributor";
                }
                await Parse.Cloud.run(functionName, params);
                alert("Edited Giver");
                
                //Update Givers
                this.getGivers();
            },

            async deleteGiver(){
                if(this.SelectedGiverID === ""){
                    alert("Please select a Giver to Delete!");
                    return;
                }
                var params;
                var functionName;

                if(this.GiverType === "Teacher"){
                    params = {
                        "TeacherID" : this.SelectedGiverID,
                    };
                    functionName = "EditTeacher";
                }
                else{
                    params = {
                        "NT_DistributorID" : this.SelectedGiverID,
                    };
                    functionName = "EditNT_Distributor";
                }
                //Setup try catch for deleting
                try{
                    await Parse.Cloud.run(functionName, params);
                    alert("Deleted Giver!");
                    this.resetSelectedGiver();

                    //Update givers
                    this.getGivers();
                    //Close popup
                    this.activePopUp('closePopUp');
                }
                catch(error){
                    alert(error.message);
                }
            },
        },

        beforeMount(){
            this.getDepartments();
            this.getUnits();
            this.getDegrees();
            this.getCourses();
            this.getBadges();
            this.getTrophies();
            this.getAscensionTitles();
            this.getCosmetics();
            this.getHouses();
            this.getStudents();
            this.getGivers();
        },

        computed: {
            isDisabled() {
                return this.categoryName.length > 0;
            },

            studentQuery(){
                if(this.StudentSearch !== ""){
                    return this.Students.filter((student)=>{
                        var value;
                        switch(this.StudentSearchType) {
                            case "FirstName":
                                value = student.FirstName;
                                break;
                            case "LastName":
                                value = student.LastName;
                                break;
                            case "UserName":
                                value = student.UserName;
                                break;
                            case "SchoolID":
                                value = student.SchoolID;
                                break;
                            default:
                                // code block
                        }
                        return this.StudentSearch.toLowerCase().split(' ').every(v => value.toLowerCase().includes(v))
                    });
                }
                else{
                    return this.Students;
                }
            },

            giverQuery(){
                if(this.GiverSearch !== ""){
                    return this.Givers.filter((giver)=>{
                        var value;
                        switch(this.GiverSearchType) {
                            case "FirstName":
                                value = giver.FirstName;
                                break;
                            case "LastName":
                                value = giver.LastName;
                                break;
                            default:
                                // code block
                        }
                        return this.GiverSearch.toLowerCase().split(' ').every(v => value.toLowerCase().includes(v))
                    });
                }
                else{
                    return this.Givers;
                }
            },

        },
    }
</script>
