<style>
    body {
        background-image: theme('backgroundImage.default');
        background-size: cover;
        background-repeat: no-repeat;
        font-family: theme('fontFamily.default');
    }
    ul::-webkit-scrollbar {
        display: none;
    }
    .remove-scroll::-webkit-scrollbar{
        display: none;
    }
</style>


<template>
    <head>
        <title>Admin</title>
    </head>

    <body>
        <nav class="block bg-black/30 mx-[auto] w-[100%] backdrop-blur-[20px] border-b-[1px] border-gray">
            <a class="text-[13px] text-white hover:text-gold" href="#">Admin <i class="fa-solid fa-caret-down"></i></a>
        </nav>
        <main class="inset-x-[0px] mx-[auto] grid grid-cols-12 grid-rows-1 h-[100%] min-w-[1000px] max-w-[1366px]">
            
            <nav class="col-span-2 text-[13px] py-[20px] h-[100%] border-r-[1px] border-gray"> <!--left navigation bar-->
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(1)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 1, 'text-gold cursor-default': openTab === 1}">ADD/EDIT/DELETE</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(2)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 2, 'text-gold cursor-default': openTab === 2}">STUDENT</button>
                <button class="block h-[40px] w-[100%] px-[20px] text-right" v-on:click="activeTab(3)" v-bind:class="{'text-white hover:text-gold cursor-pointer': openTab !== 3, 'text-gold cursor-default': openTab === 3}">GIVER</button>
            </nav>

            <section class="grid grid-cols-1 col-span-5" v-bind:class="{'hidden': openTab !== 1, 'block': openTab === 1}"> <!--add/edit/delete tab-->
                <!--middle section-->
                <div class="remove-scroll mx-[auto] py-[30px] h-[100%]">
                    <!--units-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">UNIT</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Unit Name" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="tel" placeholder="Contact Number" />
                        <div class="border-[1px]">
                            <input class="align-middle mr-[5px]" type="radio" id="department" value="Department" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="department">Department</label>
                            <input class="align-middle mr-[5px]" type="radio" id="office" value="Office" />
                            <label class="text-white text-[12px] align-middle mr-[20px]" for="office">Office</label>
                        </div>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--degrees-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">DEGREE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Degree Name" />
                        <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden>Select Department/Office</option>
                            <option class="text-black">Department Name</option>
                        </select>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--courses-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">COURSE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Course Name" />
                        <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden>Select Course</option>
                            <option class="text-black">Degree Name</option>
                        </select>
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--badges-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">BADGE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Badge Name" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Badge Points" />
                        <input class="my-[5px] text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--trophies-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">TROPHY</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Trophy Name" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="textarea" placeholder="Description" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Trophy Points" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Trophy Type" />
                        <input class="my-[5px] text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--title-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">ASCENSION TITLE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Ascension Title" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Starting XP Value" />
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="number" placeholder="Max XP Value" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--house-->
                    <form>
                        <legend class="text-white text-[15px]">HOUSE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="House Name" />
                        <input class="my-[5px] text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-3 gap-2">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                        </div>
                    </form>
                    <!--cosmetics-->
                    <form class="mb-[20px]">
                        <legend class="text-white text-[15px]">BADGE</legend>
                        <input class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]" type="text" placeholder="Cosmetic Name" />
                        <select class="block border-[1px] border-gray bg-black/20 text-white text-[12px] h-[40px] w-[400px] px-[10px]">
                            <option hidden>Cosmetic Type</option>
                            <option class="text-black">Avatar</option>
                            <option class="text-black">Frames</option>
                            <option class="text-black">Banner</option>
                            <option class="text-black">Background</option>
                        </select>
                        <input class="my-[5px] text-[12px] h-[40px] w-[400px]" type="file" />
                        <div class="w-[400px] grid grid-cols-4 grid-rows-2 gap-2 border-[1px]">
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="DELETE" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="SET DEFAULT" title="Set default for user's cosmetic" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="EDIT" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer" type="submit" value="ADD" />
                            <input class="bg-blue hover:bg-blue_hover active:to-blue_active text-white text-[10px] w-[100%] h-[30px] cursor-pointer col-span-4" type="submit" value="SET DEFAULT FOR ALL" title="Set default for all user's cosmetic" />
                        </div>
                    </form>
                </div>
                <!--DONE-->
                <!--right section-->
            </section>
            <section v-bind:class="{'hidden': openTab !== 2, 'block': openTab === 2}"></section>
            <section v-bind:class="{'hidden': openTab !== 3, 'block': openTab === 3}"></section>

            <div class="block col-span-5">
                <!--sub navigation bar-->
                <nav class="grid grid-cols-5 col-span-1">
                    <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(1)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 1, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 1}" title="List of Units, Degrees, and Courses">UDC</button>
                    <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(2)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 2, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 2}" title="List of Badges and Trophies">BADGES/TROPHIES</button>
                    <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(3)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 3, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 3}" title="List of Ascension Titles">TITLES</button>
                    <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(4)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 4, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 4}" title="List of Houses">COSMETICS</button>
                    <button class="text-white text-[10px] py-[10px]" v-on:click="activeSubTab(5)" v-bind:class="{'text-white border-b-[1px] border-gray hover:text-gold cursor-pointer': openSubTab !== 5, 'text-gold border-b-[1px] border-gold cursor-default': openSubTab === 5}" title="List of Houses">HOUSE</button>
                </nav>
                <!--department/office-->
                <div class="block" v-bind:class="{'hidden': openSubTab !== 1, 'block': openSubTab === 1}">
                    <div class="flex justify-center py-[30px] w-[100%]">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray w-[500px] h-[525px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <!--whole item-->
                                <details>
                                    <summary class="grid grid-cols-10 items-center text-white text-[13px] pl-[10px] py-[5px]">
                                        <!--button-->
                                        <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                            <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                        <!--text-->
                                        <div class="flex col-span-8 hover:text-gold cursor-pointer">
                                            <div class="flex justify-center items-center w-[auto]">Unit Name</div>
                                        </div>
                                    </summary>
                                    <details> <!--department/office-->
                                        <summary class="bg-black/20 grid grid-cols-10 items-center text-white text-[13px] pl-[40px] py-[5px]">
                                            <!--button-->
                                            <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                                <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                            </div>
                                            <!--text-->
                                            <div class="flex col-span-9 hover:text-gold cursor-pointer">
                                                <div class="flex justify-center items-center w-[auto]">Degree Name</div>
                                            </div>
                                        </summary>
                                        <summary class="bg-black/30 grid grid-cols-10 items-center text-white text-[13px] pl-[60px] py-[5px]">
                                            <!--button-->
                                            <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                                <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                            </div>
                                            <!--text-->
                                            <div class="flex col-span-9 cursor-default">
                                                <div class="flex justify-center items-center w-[auto]">Course Name</div>
                                            </div>
                                        </summary>
                                    </details>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <!--trophies and badges-->
                <div class="block" v-bind:class="{'hidden': openSubTab !== 3, 'block': openSubTab === 3}">
                    <div class="flex justify-center py-[30px] w-[100%]">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray w-[500px] h-[525px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <!--whole item-->
                                <details>
                                    <summary class="grid grid-cols-10 items-center text-white text-[13px] pl-[10px] py-[5px]">
                                        <!--button-->
                                        <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                            <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                        </div>
                                        <!--image and text-->
                                        <div class="flex col-span-7 hover:text-gold cursor-pointer">
                                            <div class="flex justify-center items-center bg-black/20 border-[1px] w-[40px] h-[40px] mr-[10px]">
                                                <img class="w-[30px] h-[auto]" src="../assets/img/trophies/trophy_1.png" />
                                            </div>
                                            <div class="flex justify-center items-center w-[auto]">Trophy 1</div>
                                        </div>
                                        <!--number of badges contained-->
                                        <div class="flex justify-center items-center col-span-2 cursor-default">
                                            <span class="flex justify-center items-center w-[auto]" title="total badges contain"><i class="mr-[5px] fa-solid fa-shield"></i>199</span>
                                        </div>
                                    </summary>
                                    <div> <!--department/office-->
                                        <summary class="bg-black/20 grid grid-cols-10 items-center text-white text-[13px] pl-[40px] py-[5px]">
                                            <!--button-->
                                            <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                                <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                            </div>
                                            <!--image and text-->
                                            <div class="flex col-span-9 cursor-default">
                                                <div class="flex justify-center items-center bg-black/20 border-[1px] w-[40px] h-[40px] mr-[10px]">
                                                    <img class="w-[30px] h-[auto]" src="../assets/img/badges/badge_1.png" />
                                                </div>
                                                <div class="flex justify-center items-center w-[auto]">Badge 1</div>
                                            </div>
                                        </summary>
                                    </div>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--ascension title-->
                <div class="block" v-bind:class="{'hidden': openSubTab !== 2, 'block': openSubTab === 2}">
                    <div class="flex justify-center py-[30px] w-[100%]">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray w-[500px] h-[525px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <!--whole item-->
                                <div class="grid grid-cols-10 items-center text-white text-[13px] pl-[10px] py-[5px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default w-[100%]">
                                        <div class="flex justify-center items-center w-[auto]">Ascension Title</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-center items-center col-span-2 cursor-default">
                                        <i class="mr-[5px] fa-solid fa-fire"></i>
                                        <span class="inline-block w-[auto] text-[12px]" title="Starting XP">900</span>
                                        <span class="inline-block w-[auto] text-[12px] mx-[5px]">-</span>
                                        <span class="inline-block w-[auto] text-[12px]" title="Max XP">1020</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--cosmetics-->
                <div class="block" v-bind:class="{'hidden': openSubTab !== 4, 'block': openSubTab === 4}">
                    <div class="flex justify-center py-[30px] w-[100%]">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray w-[500px] h-[525px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[13px] pl-[10px] py-[5px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[40px] h-[40px] mr-[10px]">
                                            <img class="w-[30px] h-[auto]" src="../assets/img/avatar/avatar.jpg" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Avatar Name</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-center items-center col-span-2 cursor-default">
                                        <span class="flex justify-center items-center w-[auto]" title="total member">Avatar</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--house-->
                <div class="block" v-bind:class="{'hidden': openSubTab !== 5, 'block': openSubTab === 5}">
                    <div class="flex justify-center py-[30px] w-[100%]">
                        <ul class="bg-black/20 backdrop-blur-[5px] border-[1px] border-gray w-[500px] h-[525px] overflow-y-scroll">
                            <!--list container-->
                            <li>
                                <div class="grid grid-cols-10 items-center text-white text-[13px] pl-[10px] py-[5px]">
                                    <!--button-->
                                    <div class="flex items-center justify-center col-span-1 pr-[10px]">
                                        <button class="my-[5px] bg-blue hover:bg-blue_hover active:bg-blue_hover text-white text-[13px] w-[25px] h-[25px] cursor-pointer"><i class="fa-solid fa-check"></i></button>
                                    </div>
                                    <!--image and text-->
                                    <div class="flex col-span-7 cursor-default">
                                        <div class="flex justify-center items-center bg-black/20 border-[1px] w-[40px] h-[40px] mr-[10px]">
                                            <img class="w-[30px] h-[auto]" src="../assets/img/logo/liberalitas-logo.png" />
                                        </div>
                                        <div class="flex justify-center items-center w-[auto]">Liberalitas</div>
                                    </div>
                                    <!--number of badges contained-->
                                    <div class="flex justify-center items-center col-span-2 cursor-default">
                                        <span class="flex justify-center items-center w-[auto]" title="total member"><i class="mr-[5px] fa-solid fa-circle-user"></i>199</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
            
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
                openSubTab: 1
            }
        },

        methods: {
            activeTab: function (tabsNumber) {
                this.openTab = tabsNumber
            },
            activeSubTab: function (subTabsNumber) {
                this.openSubTab = subTabsNumber
            }
        },
        computed: {
            isDisabled() {
                return this.categoryName.length > 0;
            }
        }

    }
</script>