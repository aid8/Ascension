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

    <body>
        <main class="min-w-[1000px]">
            <!--pop up menu for giving badges-->
            <div class="absolute top-0 flex items-center justify-center min-w-[1000px] min-h-[600px] w-full h-[100vh] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'hidden': activePopUpTab === true, 'hidden': activePopUpTab === false}">
                <div class="flex items-center justify-center w-full h-full">
                    <div class="relative flex flex-row items-center justify-center gap-3 bg-black/20 border-[1px] border-gray px-[12px] w-[700px] h-[450px]">
                        <!--go back button-->
                        <nav class="absolute top-0 flex flex-row items-center w-full h-auto px-[10px] py-[5px]">
                            <a class="text-[15px] text-white hover:text-gold_hover active:text-gold_active" v-on:click="viewPopUpTab(false)" href="#"><i class="fa-solid fa-angle-left"></i></a>
                        </nav>
                        <!--item inventory/list-->
                        <div class="inline-flex flex-col items-center justify-center gap-2 w-[70%] h-[370px]">
                            <!--search bar with sorter-->
                            <div class="flex flex-row items-center justify-start gap-3 w-full">
                                <input class="bg-black/20 border-[1px] border-gray text-[12px] text-white px-[10px] py-[5px] w-[60%]" type="text" placeholder="Search badge..." />
                                <span class="inline-flex h-full items-center justify-end text-[12px] text-white w-[15%]">Search by:</span>
                                <select class="bg-black/20 border-[1px] border-gray text-[12px] text-white px-[10px] py-[5px] w-[25%]">
                                    <option class="text-black">Name</option>
                                    <option class="text-black">Type</option>
                                </select>
                            </div>
                            <!--inventory-->
                            <div class="inline-flex items-start justify-start border-gray border-[1px] bg-black/20 p-[5px] w-full h-[95%] remove-scroll overflow-y-scroll">
                                <div> <!--container-->
                                    <!--item (badge)-->
                                    <div class="inline-flex items-center justify-center border-[1px] border-gray bg-black/20 m-[5px] p-[5px] w-[64.5px] h-[64.5px] cursor-pointer" v-on:click="viewItem(true)" v-bind:class="{'outline outline-gold outline-[3px] border-gold': selectedItem === true, 'border-gray': selectedItem === false}">
                                        <img class="w-auto h-auto" src="../assets/img/badges/badge_3.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--selected badge-->
                        <div class="inline-flex items-center justify-center w-[30%] h-[370px]">
                            <div class="inline-flex flex-col items-center justify-center gap-3 w-full h-full" v-bind:class="{'hidden': selectedItem === false, 'flex': selectedItem === true}">
                                <!--image-->
                                <div class="inline-flex items-center justify-center border-[1px] border-gray w-full h-[55%]">
                                    <img class="w-[170px] h-[170px]" src="../assets/img/badges/badge_3.png" />
                                </div>
                                <!--item information-->
                                <div class="flex flex-col w-full h-[35%] remove-scroll overflow-y-scroll ">
                                    <span class="text-[15px] text-white w-full">Badge Name</span>
                                    <span class="text-[12px] text-gold w-full">Badge Type</span>
                                    <p class="text-[12px] text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </div>
                                <!--give button-->
                                <button class="bg-blue text-white text-[12px] w-full h-[10%] hover:bg-blue_hover active:bg-blue_active">GIVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--header navigation bar-->
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray flex flex-row items-center justify-center z-[7]">
                <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
                <a class="absolute left-[10px] z-[9]" href="/"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>

                <!--student page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverStudentPage">STUDENT</a></div>
                <!--house page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gold z-[9]"><a class="text-gold text-[13px]" href="GiverHousePage">HOUSE</a></div>
                <!--leaderboard page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverLeaderboardPage">LEADERBOARDS</a></div>
                <!--request page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverRequestPage">REQUEST</a></div>

                <details class="absolute top-[15px] right-[10px] w-[170px] z-[9]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">Giver's First Name</span>
                    </summary>
                    <div class="relative bg-black/20 border-[1px] mt-[22px] border-gray z-[9]">
                        <div class="absolute bg-black/20 backdrop-blur-[20px] h-full w-full z-[8]"></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold z-[9]" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--main content-->
            <div class="absolute top-0 min-w-[1000px] min-h-[600px] w-full h-[100vh] py-[80px]">
                <!--house section-->
                <div class="flex flex-col items-center justify-start gap-3 w-full h-full">
                    <form class="flex flex-row items-center justify-start gap-5 w-[80%] h-[8%]">
                        <!--search bar-->
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[200px] px-[10px]" type="search" placeholder="Search house..." />
                        <div class="flex flex-row items-center w-auto h-full gap-5">
                            <span class="text-[12px] text-white">Search By:</span>
                            <select class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[200px] px-[10px]">
                                <option class="text-black">Name</option>
                                <option class="text-black">Points</option>
                                <option class="text-black">Members</option>
                            </select>
                        </div>
                    </form>
                    <!--house list-->
                    <div class="flex flex-row items-center justify-center gap-3 w-[80%] h-[92%]">
                        <!--house list-->
                        <div class="flex flex-col w-full h-full">
                            <!--house list head container-->
                            <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full h-[5%] bg-black/50">
                                <!--house leaderboard head row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                    <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                    <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">POINTS</div>
                                    <div class="flex items-center justify-center w-[20%] h-full text-white text-[12px]">MEMBERS</div>
                                    <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">ACTION</div>
                                </li>
                            </ul>
                            <!--house list body-->
                            <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                <!--house leaderboard list row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full border-b-[1px] border-gray">
                                    <!--house name and banner-->
                                    <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                        <!--image-->
                                        <div class="relative w-[40px] h-full flex items-center justify-center">
                                            <img class="w-[35px] h-auto" src="../assets/img/banner/liberalitas-banner.png" />
                                        </div>
                                        <!--text-->
                                        <strong class="text-white text-[15px]">Liberalitas</strong>
                                    </div>
                                    <!--house points-->
                                    <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                    <!--house members-->
                                    <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">999</span></div>
                                    <!--give badge to house button-->
                                    <div class="flex items-center justify-center w-[15%] h-full">
                                        <button class="bg-blue text-white text-[12px] hover:bg-blue_hover w-[100px] py-[8px] active:bg-blue_active" v-on:click="viewPopUpTab(true)">GIVE BADGE</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
                activePopUpTab: true,
                selectedItem: false,
            }
        },
        methods: {
            viewItem: function (itemName) {
                this.selectedItem = itemName
            },
            viewPopUpTab: function (bool) {
                this.activePopUpTab = bool
            },
        }
    }
</script>