<style>
    body{
        background-image: theme('backgroundImage.default');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        margin: 0;
        margin-top: auto;
        font-family: theme('fontFamily.default');
        text-decoration-color: white;
    }
    progress::-webkit-progress-value {background: theme('colors.gold');}
    progress::-webkit-progress-bar {background: theme('colors.gray');}
    .inventory::-webkit-scrollbar{
        display: none;
    }
    .inventory {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
    }
    nav {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    nav .menu-item {
        padding: 10px 20px;
        position: relative;
        text-align: center;
        display: flex;
        transition: 0.4s;
        padding-top: 1.5%;
        padding-bottom: 1.5%;
    }
</style>

<template>
    <head>
        <title>Ascension</title>
    </head>


    <header>
        <nav class="flex static items-center justify-between border-b border-gray top-0 bg-black/20 text-white font-default text-[13px] w-screen z-50 px-4 lg:px-0">
            <!-- Acension logo -->
            <div class="md:ml-5 w-32 cursor-pointer">
                <a href="../GiverProfile">
                    <img src="../assets/img/logo/text-logo-default.png"/>
                </a>
            </div>

            <div class="w-full inline-flex flex-grow pr-4 sm:hidden">
                <ul class="w-full inline-flex flex-grow justify-center z-50">
                    <li class="menu-item hover:text-gold"><a href="#">STUDENT</a></li>
                    <li class="menu-item hover:text-gold"><a href="#">HOUSES</a></li>
                    <li class="menu-item hover:text-gold text-gold text-bold"><a href="/GiverLeaderboardPage">LEADERBOARD</a></li>
                    <li class="menu-item hover:text-gold"><a href="#">NOTIFICATION</a></li>
                </ul>
            </div> 

            <!-- Account Settings & Sign Out -->
            <div class="mr-2 ml-auto x-8"> 
                <button class="static cursor-pointer flex justify-end items-center py-3" @click="isOpen = !isOpen">
                    <a class="px-2"> Username </a>
                    <img class="border-[2px] border-white w-[30px] rounded-full" src="../assets/img/avatar/avatar.jpg" />
                </button>

                <div class="absolute bg-black/20 z-50 w-fit border border-gray mt-1 px-2 right-2" v-if="isOpen">
                    <div class="text-white py-1 flex flex-col w-full">
                        <a href="/AccountSettings" class="hover:text-gold py-1 flex justify-end items-center">ACCOUNT SETTINGS</a>
                        <a href="/" class="hover:text-gold py-1 flex justify-end items-center">SIGN OUT</a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div>
        <div class="text-white text-[13px]">
            <ul class="flex m-4">
                <li>
                    <button @click="toggleTabs(1)" v-bind:class="{'text-gold': openTab === 1}" class="mx-2 hover:text-gold">STUDENT</button>
                </li>
                <li>
                    <button @click="toggleTabs(2)" v-bind:class="{'text-gold': openTab === 2}" class="mx-2 hover:text-gold">HOUSE</button>
                </li>
            </ul>

            <div class="flex justify-center">
                <div v-show="openTab === 1" class="w-screen m-2">
                    <div class="flex">
                        <div class="w-2/3 h-full flex justify-center mx-1">
                            <!-- student leaderboard -->
                            <table class="table-auto w-full text-[13px]">
                                <thead>
                                    <tr>
                                        <th class="py-4">RANK</th>
                                        <th>Name</th>
                                        <th>Points</th>
                                        <th>House</th>
                                    </tr>
                                </thead>
                                <!-- click row to view details -->
                                <tbody class="text-center border border-gray bg-black/30">
                                    <tr class="hover:text-gold cursor-pointer justify-center items-center">
                                        <td class="py-4">1</td>
                                        <td class="flex-col py-2">
                                            <p class="text-a_l">Username</p>
                                            <p class="text-a_s">Fullname</p>
                                        </td>
                                        <td>totalPoints</td>
                                        <td>HouseName</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        <!-- display student details -->
                        <div class="w-1/3 flex justify-center border border-white bg-black/20 mx-1 pb-2">
                            <div class="w-fit px-4 my-4">
                                <div class="relative flex items-center justify-center mt-4">
                                    <img class="border-white w-[125px] h-[auto] rounded-full" src="../assets/img/avatar/avatar.jpg" />
                                    <img class="absolute inset-0 m-auto border-white w-[125px] h-[auto] rounded-full" src="../assets/img/frames/frame_sample.png" />
                                </div>
                                <div class="flex flex-col items-center justify-center">
                                    <span class="text-gold text-[20px]">Username</span>
                                    <span class="text-white text-[15px] mb-2">Name</span>
                                    <span class="text-white text-[11px]">Official Knight of the Round Order (900/1020)</span>
                                    <progress class="bg-gray text-gold w-[250px] h-[5px]" value="900" max="1020"></progress>
                                    <div class="flex flex-row gap-5 mt-4">
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Total trophies">
                                            <span class="text-[12px]">10</span>
                                            <i class="fa-solid fa-trophy"></i>
                                        </div>
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Total badges">
                                            <span class="text-[12px]">10</span>
                                            <i class="fa-solid fa-shield-halved"></i>
                                        </div>
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Leaderboard placement">
                                            <span class="text-[12px]">10</span>
                                            <i class="fa-solid fa-chart-simple"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="z-20 h-96 w-auto mb-10 px-2">
                                <img src="../assets/img/banner/fortis-banner.png" class="h-full"/>
                            </div>
                            
                        </div>
                    </div>
                </div>


                <div v-show="openTab === 2" class="my-2 w-3/4">
                    <div class="flex">
                        <!-- house 1st place -->
                        <div @click="toggleTabs(3)" class="w-1/4 mx-2 px-8 py-40 border border-white bg-black/20 flex justify-center items-center cursor-pointer hover:border-gold">
                            <button>
                                <img src="../assets/img/logo/equitas-logo-white.png" />
                            </button>
                        </div>
                        <!-- house 2nd place -->
                        <div @click="toggleTabs(3)" class="w-1/4 mx-2 px-8 py-40 border border-white bg-black/20 flex justify-center items-center cursor-pointer hover:border-gold">
                            <button>
                                <img src="../assets/img/logo/fides-logo-white.png" />
                            </button>
                        </div>
                        <!-- house 3rd place -->
                        <div @click="toggleTabs(3)" class="w-1/4 mx-2 px-8 py-40 border border-white bg-black/20 flex justify-center items-center cursor-pointer hover:border-gold">
                            <button>
                                <img src="../assets/img/logo/fortis-logo-white.png" />
                            </button>
                        </div>
                        <!-- house 4th place -->
                        <div @click="toggleTabs(3)" class="w-1/4 mx-2 px-8 py-40 border border-white bg-black/20 flex justify-center items-center cursor-pointer hover:border-gold">
                            <button>
                                <img src="../assets/img/logo/liberalitas-logo.png" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- this will show the details of each house -->
                <div v-show="openTab === 3" class="w-screen px-4">
                    <div class="flex">
                        <!-- back to House Leaderboard tab -->
                        <button @click="toggleTabs(2)" class="flex justify-center items-center cursor-pointer hover:text-gold">
                            <img src="https://img.icons8.com/material-outlined/24/FFFFFF/back--v1.png"/>
                            HOUSENAME
                        </button>
                    </div>

                    <div class="flex">
                        <div class="w-1/2 h-full flex justify-center mx-1">
                            <!-- house leaderboard -->
                            <table class="table-auto w-full text-[13px]">
                                <thead>
                                    <tr>
                                        <th class="py-4">RANK</th>
                                        <th>Name</th>
                                        <th>Points</th>
                                        <th>Title</th>
                                    </tr>
                                </thead>
                                
                                <tbody class="text-center border border-gray bg-black/30">
                                    <tr class="hover:text-gold cursor-pointer justify-center items-center">
                                        <td>1</td>
                                        <td class="flex-col py-2">
                                            <p class="text-a_l">Username</p>
                                            <p class="text-a_s">Fullname</p>
                                        </td>
                                        <td>totalPoints</td>
                                        <td>TitleName</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        <div class="w-1/2 flex justify-around mx-1 pb-2">
                            <!-- display the house details here -->
                            <div class="flex flex-col justify-center items-center">
                                <img class="m-4 drop-shadow-lg" src="../assets/img/logo/equitas-logo-white.png" />
                                <div class="flex my-6">
                                    <div class="flex flex-col w-fit px-2 mx-4 my-2 justify-center items-center">
                                        <p>31000</p>
                                        <img class="w-6" src="../assets/img/icon/points.png"/>
                                    </div>
                                    <div class="flex flex-col w-fit px-2 mx-4 my-2 justify-center items-center">
                                        <p>5</p>
                                        <img class="w-6" src="../assets/img/icon/members.png"/>
                                    </div>
                                    <div class="flex flex-col w-fit px-2 mx-4 my-2 justify-center items-center">
                                        <p>1</p>
                                        <img class="w-6" src="../assets/img/icon/ranking.png"/>
                                    </div>
                                    <div class="flex flex-col w-fit px-2 mx-4 my-2 justify-center items-center">
                                        <p>120</p>
                                        <img class="w-6" src="../assets/img/icon/missions.png"/>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div>
                                    <!-- highlight (border-4 border-gold) the selected house here -->
                                    <ul>
                                        <li class="flex justify-center items-center my-12">
                                            <div class="bg-black/20 border-4 border-gold rotate-45" my-2>
                                                <img class="w-12 m-2 -rotate-45" src="../assets/img/logo/equitas-logo-white.png" />
                                            </div>
                                            <div class="w-10 mx-8 text-gold text-bold">1st</div>
                                        </li>
                                        <li class="flex justify-center items-center my-12">
                                            <div class="bg-black/10 border-2 border-white rotate-45 my-2">
                                                <img class="w-12 m-2 -rotate-45" src="../assets/img/logo/equitas-logo-white.png" />
                                            </div>
                                            <div class="w-10 mx-8">2nd</div>
                                        </li>
                                        <li class="flex justify-center items-center my-12">
                                            <div class="bg-black/10 border-2 border-white rotate-45 my-2">
                                                <img class="w-12 m-2 -rotate-45" src="../assets/img/logo/equitas-logo-white.png" />
                                            </div>
                                            <div class="w-10 mx-8">3rd</div>
                                        </li>
                                        <li class="flex justify-center items-center my-12">
                                            <div class="bg-black/10 border-2 border-white rotate-45 my-2">
                                                <img class="w-12 m-2 -rotate-45" src="../assets/img/logo/equitas-logo-white.png" />
                                            </div>
                                            <div class="w-10 mx-8">4th</div>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    
</template>

<script>
    import Parse from 'parse';

    export default {
        data() {
            return {
                openTab: 1,
                isOpen: false, 
            };
        },

        components: {
        },

        methods:{
            toggleTabs: function(tabNumber) {
                this.openTab = tabNumber
            }
        }
    }
</script>
