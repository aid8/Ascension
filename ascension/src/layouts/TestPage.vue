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
            <nav class="col-span-2 text-[13px] py-[20px] h-[100%] border-r-[1px] border-gray">
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(1)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 1, 'text-gold cursor-default': openTab === 1}">MODIFY</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(2)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 2, 'text-gold cursor-default': openTab === 2}">STUDENT</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(3)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 3, 'text-gold cursor-default': openTab === 3}">GIVER</button>
                <details>
                    <summary class="py-[10px] w-[100%] px-[20px] text-white cursor-pointer text-right">
                        ADMIN
                    </summary>
                    <button class="block h-[40px] w-[100%] px-[20px] text-right bg-black/20 text-white hover:text-gold">SIGN OUT</button>
                </details>
            </nav>
            <!--add/edit/delete tab-->
            <section class="grid grid-cols-2 col-span-10" v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}">
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
                        <legend class="mb-[10px] text-white text-[13px]">SELECT DEGREES (CTRL TO SELECT MULTIPLE)</legend> <!--TO FIX -->
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
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Badge Name" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Badge Points" />
                        <input required class="text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--trophies-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">TROPHY</legend>
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Trophy Name" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Trophy Points" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Trophy Type" />
                        <input required class="text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--title-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">ASCENSION TITLE</legend>
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Ascension Title" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" min="0" max="940" type="number" placeholder="Starting XP Value" />
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" min="120px" max="1020" type="number" placeholder="Max XP Value" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--cosmetics-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">COSMETICS</legend>
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Cosmetic Name" />
                        <select required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden>Cosmetic Type</option>
                            <option class="text-black">Avatar</option>
                            <option class="text-black">Frames</option>
                            <option class="text-black">Banner</option>
                            <option class="text-black">Background</option>
                        </select>
                        <input required class="text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-4 grid-rows-2 gap-2">
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="SET DEFAULT" title="Set default for user's cosmetic" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer col-span-4" type="submit" value="SET DEFAULT FOR ALL" title="Set default for all user's cosmetic" />
                        </div>
                    </form>
                    <!--house-->
                    <form class="mb-[20px] grid justify-center">
                        <legend class="mb-[10px] text-white text-[13px]">HOUSE</legend>
                        <input required class="block mb-[10px] border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="House Name" />
                        <input required class="text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                </div>
                <!--right section-->
                <div class="col-span-1">
                    <!--sub navigation bar-->
                    <nav class="grid grid-cols-8 col-span-1">
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(1)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 1, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 1}" title="List of Units, Degrees, and Courses">UNITS</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(2)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 2, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 2}" title="List of Units, Degrees, and Courses">DEGREES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(3)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 3, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 3}" title="List of Units, Degrees, and Courses">COURSES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(4)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 4, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 4}" title="List of Badges and Trophies">TROPHIES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(5)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 5, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 5}" title="List of Badges and Trophies">BADGES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(6)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 6, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 6}" title="List of Ascension Titles">TITLES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(7)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 7, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 7}" title="List of Houses">COSMETICS</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(8)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 8, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 8}" title="List of Houses">HOUSE</button>
                    </nav>
                    <!--units tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 1, 'block': openSubTab === 1}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 2, 'block': openSubTab === 2}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 3, 'block': openSubTab === 3}">
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
                    <!--trophies tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 4, 'block': openSubTab === 4}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Trophy" src="../assets/img/trophies/trophy_1.png" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Trophy 1</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]">Trophy Type</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--badges tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 5, 'block': openSubTab === 5}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Badge" src="../assets/img/badges/badge_1.png" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Badge 1</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]">Badge Type</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--ascension title tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 6, 'block': openSubTab === 6}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <!--whole item-->
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default w-[100%]">
                                        <div class="flex justify-center items-center w-[auto]">Ascension Title</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default text-right mr-[10px]">
                                        <span class="w-[auto]">940</span>
                                        <span class="w-[auto] mx-[5px]">-</span>
                                        <span class="w-[auto]">1020</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--cosmetics tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 7, 'block': openSubTab === 7}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="Avatar" src="../assets/img/avatar/avatar.jpg" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Avatar Name</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]">Cosmetic Type</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--house tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openSubTab !== 8, 'block': openSubTab === 8}">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray h-[85vh] w-[500px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[10px] pl-[0px] py-[0px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[10px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[25px] h-[25px] mr-[10px]">
                                            <img class="w-[20px] h-[auto]" loading="lazy" alt="House Logo" src="../assets/img/logo/liberalitas-logo.png" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Liberalitas</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-end items-center col-span-2 cursor-default">
                                        <span class="text-right mr-[10px] w-[auto]"><i class="mr-[5px] fa-solid fa-circle-user"></i>199</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!--student list-->
            <section class="grid col-span-10 h-[100vh]" v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}">
                <!--bottom section-->
                <div class="col-span-1 px-[30px] py-[30px]">
                    <div class="grid grid-cols-11 mb-[10px] mx-[auto] w-[100%]">
                        <div class="col-span-5 flex items-center justify-start">
                            <div class="relative flex items-center justify-center w-[150px] h-[150px] mr-[10px]">
                                <img class="absolute h-[120px] w-[120px] rounded-full" loading="lazy" alt="Avatar" src="../assets/img/avatar/avatar.jpg" />
                                <img class="absolute h-[130px] w-[130px] rounded-full" loading="lazy" alt="Frame" src="../assets/img/frames/frame_sample.png" />
                            </div>
                            <div>
                                <span class="block text-[22px] text-gold">Username#123</span>
                                <span class="block text-[12px] text-white">Rondale Floyd Magtibay Bufete</span>
                                <span class="block text-[12px] text-white">Zone 1 Liboro, Ragay, Camarines Sur</span>
                                <span class="block text-[12px] text-white">09516101009</span>
                                <span class="block text-[12px] text-white">rbufete@gbox.adnu.edu.ph</span>
                            </div>
                        </div>

                        <div class="col-span-1 flex items-center justify-center">
                            <img class="w-[90px] h-[auto]" loading="lazy" title="Liberalitas" alt="House Logo" src="../assets/img/logo/liberalitas-logo.png" />
                        </div>
                        <div class="col-span-1 flex items-center justify-center">
                            <img class="w-[70px] h-[auto]" loading="lazy" title="Duke" alt="Status Logo" src="../assets/img/logo/status-logo.png" />
                        </div>
                        <div class="col-span-1 flex items-center justify-center">
                            <img class="w-[60px] h-[auto]" loading="lazy" title="Liberalitas banner" alt="House Banner" src="../assets/img/banner/liberalitas-banner.png" />
                        </div>
                        <div class="col-span-3 flex flex-col items-center justify-center">
                                <div class="grid grid-cols-3 items-center justify-center gap-3">
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 1" src="../assets/img/trophies/trophy_1.png" />
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 2" src="../assets/img/trophies/trophy_1.png" />
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 3" src="../assets/img/trophies/trophy_1.png" />
                                </div>
                                <span class="block border-gray border-b-[1px] my-[5px] mx-[auto] leading-[0.1px] w-[250px]"></span> <!--separator-->
                                <div class="grid grid-cols-5 items-center justify-center gap-3">
                                    <img class="col-span-1 inline-block w-[35px] h-[auto]" title="Badge Name" loading="lazy" alt="Badge 1" src="../assets/img/badges/badge_1.png" />
                                    <img class="col-span-1 inline-block w-[35px] h-[auto]" title="Badge Name" loading="lazy" alt="Badge 2" src="../assets/img/badges/badge_2.png" />
                                    <img class="col-span-1 inline-block w-[35px] h-[auto]" title="Badge Name" loading="lazy" alt="Badge 3" src="../assets/img/badges/badge_3.png" />
                                    <img class="col-span-1 inline-block w-[35px] h-[auto]" title="Badge Name" loading="lazy" alt="Badge 4" src="../assets/img/badges/badge_4.png" />
                                    <img class="col-span-1 inline-block w-[35px] h-[auto]" title="Badge Name" loading="lazy" alt="Badge 5" src="../assets/img/badges/badge_5.png" />
                                </div>
                        </div>
                    </div>
                    <!--search bar-->
                    <form class="mb-[10px] mx-[auto] w-[100%]">
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[400px] px-[10px]" type="text" placeholder="Search student..." />
                    </form>
                    <!--student list-->
                    <table class="mx-[auto] border-gray w-[100%] border-[1px]">
                        <thead class="bg-black/20 border-b-[1px] border-gray text-white flex flex-col">
                            <tr class="py-[5px] px-[10px]">
                                <th class="sticky w-[60px] text-[13px] text-center font-normal"></th>
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">School ID</th>
                                <th class="sticky w-[350px] text-[13px] text-center font-normal">Degree</th>
                                <th class="sticky w-[60px] text-[13px] text-center font-normal">Year</th>
                                <th class="sticky w-[100px] text-[13px] text-center font-normal">House</th>
                                <th class="sticky w-[45px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-black/30 remove-scroll text-white overflow-y-scroll flex flex-col h-[51vh]">
                            <tr class="py-[5px] px-[10px]">
                                <td class="w-[60px] text-center">
                                    <button class="text-[25px] hover:text-white/50 active:text-white/20"><i class="fa-solid fa-eye"></i></button>
                                </td>
                                <td class="w-[320px] text-[12px] text-left">
                                    <div class="flex items-center justify-start">
                                        <img class="border-[2px] h-[40px] w-[40px] mr-[10px] rounded-full" loading="lazy" alt="Avatar" src="../assets/img/avatar/avatar.jpg" >
                                        <div>
                                            <span class="block my-[-3px] text-[13px]">Username#123</span>
                                            <span class="block my-[-3px] text-[12px]">Rondale Floyd Magtibay Bufete</span>    
                                        </div>
                                    </div>
                                </td>
                                <td class="w-[120px] text-[12px] text-center">CO201911002</td>
                                <td class="w-[350px] text-[12px] text-left">Bachelor of Science in Digital Arts and Illustration</td>
                                <td class="w-[60px] text-[12px] text-center">4</td>
                                <td class="w-[100px] text-[12px] text-center">Liberalitas</td>
                                <td class="w-[45px] text-[12px] text-center">
                                    <button class="bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </section>

            <!--giver list-->
            <section class="grid col-span-10 h-[100vh]" v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}">
                <div class="col-span-1 px-[30px] py-[30px]">
                    <!--search bar-->
                    <form class="mb-[10px] mx-[auto] w-[100%]">
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[400px] px-[10px]" type="text" placeholder="Search giver..." />
                    </form>
                    <!--student list-->
                    <table class="mx-[auto] border-gray w-[100%] border-[1px]">
                        <thead class="bg-black/20 border-b-[1px] border-gray text-white flex flex-col">
                            <tr class="py-[5px] px-[10px]">
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">School ID</th>
                                <th class="sticky w-[200px] text-[13px] text-center font-normal">Job Title</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">Contact Number</th>
                                <th class="sticky w-[250px] text-[13px] text-center font-normal">Email</th>
                                <th class="sticky w-[40px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-black/30 remove-scroll text-white overflow-y-scroll flex flex-col h-[75vh]">
                            <tr class="py-[5px] px-[10px]">
                                <td class="w-[320px] text-[12px] text-left">What The Fritz</td>
                                <td class="w-[120px] text-[12px] text-center">CO201912345</td>
                                <td class="w-[200px] text-[12px] text-left">Professor</td>
                                <td class="w-[120px] text-[12px] text-center">09123456789</td>
                                <td class="w-[250px] text-[12px] text-left">wfritz@gbox.adnu.edu.ph</td>
                                <td class="w-[40px] text-[12px] text-center">
                                    <button class="bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
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
                openTab: 1,
                openSubTab: 1,

                //Containers
                Departments: [],
                Units: [],
                Degrees: [],
                Courses: [],

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
            }
        },

        methods: {
            //Frontend Functions
            activeTab: function (tabsNumber) {
                this.openTab = tabsNumber
            },

            activeSubTab: function (subTabsNumber) {
                this.openSubTab = subTabsNumber
            },

            //Container Functions
            async getDepartments(){
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

            //Unit Functions
            async addUnit(){
                var params = {
                    "UnitName": this.UnitName,
                    "UnitContactNumber": this.UnitContactNumber,
                    "UnitType" : this.UnitType,
                };
                await Parse.Cloud.run("AddUnit", params);
                alert("Added Unit!");

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
                if(this.UnitName === "" || this.UnitContactNumber === "" || this.UnitTpe === ""){
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
                var params = {
                    "DegreeName" : this.DegreeName,
                    "DegreeUnitIDPointer" : this.DegreeUnitIDPointer,
                }
                await Parse.Cloud.run("AddDegree", params);
                alert("Added Degree");

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
                if(this.DegreeName === "" || this.DegreeUnitIDPointer === ""){
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
                var params = {
                    "CourseName" : this.CourseName,
                    "CourseCode" : this.CourseCode, 
                    "CourseDegreesIDPointers": this.CourseDegreesIDPointers
                }
                await Parse.Cloud.run("AddCourse", params);
                alert("Added Course");

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
                if(this.CourseName === "" || this.CourseCode === ""){
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
        },

        beforeMount(){
            this.getDepartments();
            this.getUnits();
            this.getDegrees();
            this.getCourses();
        },

        computed: {
            isDisabled() {
                return this.categoryName.length > 0;
            }
        }

    }
</script>