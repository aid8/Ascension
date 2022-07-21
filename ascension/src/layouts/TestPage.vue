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
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab('modify')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'modify', 'text-gold cursor-default': openTab === 'modify'}">MODIFY</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab('student')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'student', 'text-gold cursor-default': openTab === 'student'}">STUDENT</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab('giver')" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 'giver', 'text-gold cursor-default': openTab === 'giver'}">GIVER</button>
                <details>
                    <summary class="py-[10px] w-[100%] px-[20px] text-white cursor-pointer text-right">
                        ADMIN
                    </summary>
                    <button class="block h-[40px] w-[100%] px-[20px] text-right bg-black/20 text-white hover:text-gold">SIGN OUT</button>
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
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('units')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'units', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'units'}" title="List of Units, Degrees, and Courses">UNITS</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('degrees')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'degrees', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'degrees'}" title="List of Units, Degrees, and Courses">DEGREES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('courses')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'courses', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'courses'}" title="List of Units, Degrees, and Courses">COURSES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('trophies')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'trophies', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'trophies'}" title="List of Badges and Trophies">TROPHIES</button>
                        <button class="text-white text-[10px] py-[10px]" v-on:click="activeModifyTab('badges')" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openModifyTab !== 'houses', 'text-gold border-b-[1px] border-gold cursor-default': openModifyTab === 'houses'}" title="List of Badges and Trophies">BADGES</button>
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
                    <!--trophies tab-->
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'trophies', 'block': openModifyTab === 'trophies'}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'badges', 'block': openModifyTab === 'badges'}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'titles', 'block': openModifyTab === 'titles'}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'cosmetics', 'block': openModifyTab === 'cosmetics'}">
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
                    <div class="grid justify-center py-[30px]" v-bind:class="{'hidden': openModifyTab !== 'houses', 'block': openModifyTab === 'houses'}">
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
            <section class="grid col-span-10 h-[100vh]" v-bind:class="{'hidden': openTab !== 'student', 'block': openTab === 'student'}">
                <div class="col-span-1 px-[30px] py-[30px]">
                    <!--selected user-->
                    <div class="grid grid-cols-11 mb-[10px] mx-[auto] h-[25vh] w-[100%]">
                        <!--user image-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-5 flex items-center justify-start">
                            <div class="relative flex items-center justify-center w-[150px] h-[150px] mr-[5px]">
                                <img class="border-[5px] border-white absolute h-[120px] w-[120px] rounded-full" loading="lazy" alt="Avatar" src="../assets/img/avatar/avatar.jpg" />
                            </div>
                            <div>
                                <span class="block text-[22px] text-gold">Username#123</span>
                                <span class="block text-[12px] text-white">Rondale Floyd Magtibay Bufete</span>
                                <span class="block text-[12px] text-white">Zone 1 Liboro, Ragay, Camarines Sur</span>
                                <span class="block text-[12px] text-white">09516101009</span>
                                <span class="block text-[12px] text-white">rbufete@gbox.adnu.edu.ph</span>
                            </div>
                        </div>
                        <!--house logo-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-1 flex items-center justify-center">
                            <img class="w-[90px] h-[auto]" loading="lazy" title="Liberalitas" alt="House Logo" src="../assets/img/logo/liberalitas-logo.png" />
                        </div>
                        <!--status logo-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-1 flex items-center justify-center">
                            <img class="w-[70px] h-[auto]" loading="lazy" title="Duke" alt="Status Logo" src="../assets/img/logo/status-logo.png" />
                        </div>
                        <!--house banner-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-1 flex items-center justify-center">
                            <img class="w-[60px] h-[auto]" loading="lazy" title="Liberalitas banner" alt="House Banner" src="../assets/img/banner/liberalitas-banner.png" />
                        </div>
                        <!--top three badges and recently obtained badges-->
                        <div  v-bind:class="{'hidden': openStudent !== 1, 'block': openStudent === 1}" class="col-span-3 flex flex-col items-center justify-center">
                                <!--trophies-->
                                <div class="grid grid-cols-3 items-center justify-center gap-3">
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 1" src="../assets/img/trophies/trophy_1.png" />
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 2" src="../assets/img/trophies/trophy_1.png" />
                                    <img class="col-span-1 inline-block w-[50px] h-[auto]" title="Trophy Name" loading="lazy" alt="Trophy 3" src="../assets/img/trophies/trophy_1.png" />
                                </div>
                                <!--badges-->
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
                                <th class="sticky w-[40px] text-[13px] text-center font-normal"></th>
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">School ID</th>
                                <th class="sticky w-[350px] text-[13px] text-center font-normal">Degree</th>
                                <th class="sticky w-[50px] text-[13px] text-center font-normal">Year</th>
                                <th class="sticky w-[100px] text-[13px] text-center font-normal">House</th>
                                <th class="sticky w-[75px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-black/30 remove-scroll text-white overflow-y-scroll flex flex-col h-[51vh]">
                            <tr class="py-[5px] px-[10px]">
                                <td class="w-[40px] text-center">
                                    <button class="text-[25px] hover:text-white/50 active:text-white/20" v-on:click="viewStudent(1)"><i class="fa-solid fa-eye"></i></button>
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
                                <td class="w-[50px] text-[12px] text-center">4</td>
                                <td class="w-[100px] text-[12px] text-center">Liberalitas</td>
                                <td class="w-[75px] text-[12px] text-center">
                                    <button class="mr-[5px] bg-blue hover:bg-blue_hover active:bg-blue_active w-[30px] h-[30px] text-white" title="Edit this user" v-on:click="activePopUp('editStudent')"><i class="fa-solid fa-user-pen"></i></button>
                                    <button class="ml-[5px] bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
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
                                <span class="w-[100%] text-[12px]">Rondale Floyd Magtibay Bufete</span>
                                <div class="float-right flex flex-row">
                                    <button class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-red_hover active:text-red_active" title="Delete this user"><i class="fa-solid fa-user-slash"></i>DELETE</button>
                                    <button class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-blue_hover active:text-blue_active" title="Save changes"><i class="fa-solid fa-floppy-disk"></i>SAVE</button>
                                </div>
                            </header>
                            <!--student information-->
                            <section class="flex flex-col gap-3 items-center justify-center py-[20px]">
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="First Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Middle Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Last Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Current Address" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="tel" placeholder="Contact Number" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Email" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="School ID" />
                                <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">
                                    <option class="text-black">Current Degree</option>
                                    <option class="text-black">Degree Name</option>
                                </select>
                                <!--year level-->
                                <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">
                                    <option class="text-black">1</option>
                                    <option class="text-black">2</option>
                                    <option class="text-black">3</option>
                                    <option class="text-black">4</option>
                                </select>
                                <!--courses taken by student-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">COURSE LIST</summary>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input required class="bg-red hover:bg-red_hover active:to-red_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                                    </div>
                                </details>
                                <!--add courses-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">ADD COURSE</summary>
                                    <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">
                                        <option hidden>Choose Degree</option>
                                        <option class="text-black">Degree Name</option>
                                    </select>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="submit" value="ADD" />
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
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[400px] px-[10px]" type="text" placeholder="Search giver..." />
                    </form>
                    <!--giver list-->
                    <table class="mx-[auto] border-gray w-[100%] border-[1px]">
                        <thead class="bg-black/20 border-b-[1px] border-gray text-white flex flex-col">
                            <tr class="py-[5px] px-[10px]">
                                <th class="sticky w-[320px] text-[13px] text-center font-normal">Name</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">School ID</th>
                                <th class="sticky w-[170px] text-[13px] text-center font-normal">Job Title</th>
                                <th class="sticky w-[120px] text-[13px] text-center font-normal">Contact Number</th>
                                <th class="sticky w-[250px] text-[13px] text-center font-normal">Email</th>
                                <th class="sticky w-[75px] text-[13px] text-center font-normal">Action</th>
                            </tr>
                        </thead>
                        <tbody class=" bg-black/30 remove-scroll text-white overflow-y-scroll flex flex-col h-[78vh]">
                            <tr class="py-[5px] px-[10px]">
                                <td class="w-[320px] text-[12px] text-left">What The Fritz</td>
                                <td class="w-[120px] text-[12px] text-center">CO201912345</td>
                                <td class="w-[170px] text-[12px] text-left">Professor</td>
                                <td class="w-[120px] text-[12px] text-center">09123456789</td>
                                <td class="w-[250px] text-[12px] text-left">wfritz@gbox.adnu.edu.ph</td>
                                <td class="w-[75px] text-[12px] text-center">
                                    <button class="mr-[5px] bg-blue hover:bg-blue_hover active:bg-blue_active w-[30px] h-[30px] text-white" title="Edit this user" v-on:click="activePopUp('editGiver')"><i class="fa-solid fa-user-pen"></i></button>
                                    <button class="ml-[5px] bg-red hover:bg-red_hover active:bg-red_active w-[30px] h-[30px] text-white" title="Delete this user"><i class="fa-solid fa-user-slash"></i></button>
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
                                <span class="w-[100%] text-[12px]">What The Fritz</span>
                                <div class="float-right flex flex-row">
                                    <button class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-red_hover active:text-red_active" title="Delete this user"><i class="fa-solid fa-user-slash"></i>DELETE</button>
                                    <button class="flex flex-row gap-2 items-center justify-center text-white text-[10px] w-[auto] px-[5px] cursor-pointer hover:text-blue_hover active:text-blue_active" title="Save changes"><i class="fa-solid fa-floppy-disk"></i>SAVE</button>
                                </div>
                            </header>
                            <!--student information-->
                            <section class="flex flex-col gap-3 items-center justify-center py-[20px]">
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="First Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Middle Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="text" placeholder="Last Name" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="tel" placeholder="Contact Number" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Email" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="School ID" />
                                <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]" type="email" placeholder="Job Title" />
                                <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[28vw] px-[10px]">  
                                    <option class="text-black">Current Unit</option>
                                    <option class="text-black">Unit Name</option>
                                </select>
                                <!--courses taken by student-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">COURSE LIST</summary>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input required class="bg-red hover:bg-red_hover active:to-red_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                                    </div>
                                </details>
                                <!--add courses-->
                                <details class="w-[28vw] cursor-pointer flex flex-col">
                                    <summary class="py-[5px] text-[12px]">ADD COURSE</summary>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="w-[100%]"><input class="mr-[10px] align-middle" type="checkbox" /><label class="text-[12px] align-middle">Course Name</label></div>
                                    <div class="pt-[10px] border-t-[1px] border-gray flex flex-row gap-3 items-center justify-end">
                                        <input required class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[30%] h-[30px] cursor-pointer" type="submit" value="ADD" />
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
                openStudent: 1,
                isHidden: true
                
                //Backend Variables
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
            }

            activeSubTab: function (subTabsNumber) {
                this.openSubTab = subTabsNumber
            },
            
            //Backend Functions
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
        },
    }
</script>