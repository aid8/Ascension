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
            <!--pop up menu for showing proof-->
            <div class="absolute top-0 flex items-center justify-center min-w-[1000px] min-h-[600px] w-full h-[100vh] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'flex': activePopUpTab === true, 'hidden': activePopUpTab === false, 'flex': typePopUp === 'proof', 'hidden': typePopUp !== 'proof'}">
                <div class="flex items-center justify-center w-full h-full">
                    <div class="relative flex flex-row items-center justify-center gap-3 bg-black/20 border-[1px] border-gray px-[12px] w-[500px] h-[550px]">
                        <!--go back button-->
                        <nav class="absolute top-0 flex flex-row items-center gap-3 w-full h-auto px-[10px] py-[5px]">
                            <a class="text-[15px] text-white hover:text-gold_hover active:text-gold_active" v-on:click="viewPopUpTab(false, '')" href="#"><i class="fa-solid fa-angle-left"></i></a>
                            <span class="text-[15px] text-white">Proof</span>
                        </nav>
                        <!--item inventory/list-->
                        <div class="inline-flex flex-col items-center justify-center gap-5 w-[90%] h-[85%]">
                            <div class="items-start justify-start border-[1px] border-gray w-full h-[90%] overflow-x-scroll">
                                <div class="w-[800px] h-auto">
                                    <img class="w-full h-full" src="../assets/img/proof.png" />
                                </div>
                            </div>
                            <button class="py-[10px] w-full h-[10%] bg-blue text-[12px] text-white hover:bg-blue_hover active:bg-blue_active">DOWNLOAD</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--pop up menu for giving badges-->
            <div class="absolute top-0 flex items-center justify-center min-w-[1000px] min-h-[600px] w-full h-[100vh] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'hidden': activePopUpTab === true, 'hidden': activePopUpTab === false, 'flex': typePopUp === 'givebadge', 'hidden': typePopUp !== 'givebadge'}">
                <div class="flex items-center justify-center w-full h-full">
                    <div class="relative flex flex-row items-center justify-center gap-3 bg-black/20 border-[1px] border-gray px-[12px] w-[700px] h-[450px]">
                        <!--go back button-->
                        <nav class="absolute top-0 flex flex-row items-center gap-3 w-full h-auto px-[10px] py-[5px]">
                            <a class="text-[15px] text-white hover:text-gold_hover active:text-gold_active" v-on:click="viewPopUpTab(false, '')" href="#"><i class="fa-solid fa-angle-left"></i></a>
                            <span class="text-[15px] text-white">Username</span>
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
                                <button class="bg-blue text-white text-[12px] w-full h-[10%] hover:bg-blue_hover active:bg-blue_active" v-on:click="viewClicked(true, 'given'), viewPopUpTab(false, '')">GIVE</button>
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
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverHousePage">HOUSE</a></div>
                <!--leaderboard page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gray/0 z-[9]"><a class="text-white text-[13px]" href="GiverLeaderboardPage">LEADERBOARDS</a></div>
                <!--request page-->
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[3px] border-gold z-[9]"><a class="text-gold text-[13px]" href="GiverRequestPage">REQUEST</a></div>

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
            <div class="absolute top-0 min-w-[1000px] min-h-[600px] w-full h-[100vh] pt-[80px] pb-[35px]">
                <!--student section-->
                <div class="flex flex-col items-center justify-start gap-3 min-h-[500px] w-full h-full">
                    <!--search bar and sorter-->
                    <form class="flex flex-row items-center justify-start gap-5 max-h-[35px] w-[80%] h-[7%]">
                        <!--search bar-->
                        <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[200px] px-[10px]" type="search" placeholder="Search request..." />
                        <div class="flex flex-row items-center w-auto h-full gap-5">
                            <span class="text-[12px] text-white">Search By:</span>
                            <select class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-full w-[150px] px-[10px]">
                                <option class="text-black">Name</option>
                                <option class="text-black">Given</option>
                                <option class="text-black">Denied</option>
                                <option class="text-black">Date</option>
                            </select>
                        </div>
                    </form>

                    <div class="flex flex-row items-center justify-center gap-3 min-w-[1000px] w-[80%] h-[93%]">
                        <!--student list-->
                        <div class="flex flex-col w-full h-full">
                            <!--student leaderboard head container-->
                            <ul class="flex flex-col border-[1px] border-gray w-full h-[95%] bg-black/20 overflow-y-scroll">
                                <!--student leaderboard list row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full h-[55px] border-b-[1px] border-gray">
                                    <div class="flex items-center gap-3 justify-center w-[23%] h-full">
                                        <button class="inline-flex items-center justify-center bg-blue text-white text-[12px] hover:bg-blue_hover w-full py-[8px] active:bg-blue_active" v-bind:class="{'hidden': isClicked === true}" v-on:click="viewPopUpTab(true, 'givebadge')">GIVE</button>
                                        <button class="inline-flex items-center justify-center bg-blue text-white text-[12px] hover:bg-blue_hover w-full py-[8px] active:bg-blue_active" v-bind:class="{'hidden': isClicked === true}" v-on:click="viewClicked(true, 'denied')">DENY</button>
                                        <div class="inline-flex items-center justify-center w-auto h-auto" v-bind:class="{'hidden': isClicked === false, 'inline-flex': isClicked === true, 'hidden': typeClicked !== 'given', 'inline-flex': typeClicked === 'given'}"><span class="text-[25px] text-white/30">GIVEN</span></div>
                                        <div class="inline-flex items-center justify-center w-auto h-auto" v-bind:class="{'hidden': isClicked === false, 'inline-flex': isClicked === true, 'hidden': typeClicked !== 'denied', 'inline-flex': typeClicked === 'denied'}"><span class="text-[25px] text-white/30">DENIED</span></div>
                                    </div>
                                    <div class="flex items-center justify-start gap-2 w-auto h-full">
                                        <!--image-->
                                        <div class="relative w-[50px] h-[50px] flex items-center justify-center">
                                            <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                            <img class="absolute inset-0 m-auto w-full h-full" src="../assets/img/frames/gear_frame.png" />
                                        </div>
                                    </div>
                                    <div class="flex items-center justify-start w-full h-full remove-scroll overflow-x-scroll"><span class="text-white text-[13px] whitespace-nowrap">Rondale Floyd Bufete sent you a <a class="text-gold text-[13px]" v-on:click="viewPopUpTab(true, 'proof')" href="#">proof</a> for badge request.</span></div>
                                    <div class="flex items-center justify-end w-auto h-full whitespace-nowrap"><span class="text-white text-[13px]">July 28</span></div>
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
                activePopUpTab: false,
                typePopUp: '',
                selectedItem: false,
                isClicked: false,
                typeClicked: 'none',
            }
        },
        methods: {
            viewItem: function (itemName) {
                this.selectedItem = itemName
            },
            viewPopUpTab: function (bool, typePopUp) {
                this.activePopUpTab = bool,
                this.typePopUp = typePopUp
            },
            viewClicked: function (bool, type) {
                this.isClicked = bool,
                this.typeClicked = type
            },
        }
    }
</script>