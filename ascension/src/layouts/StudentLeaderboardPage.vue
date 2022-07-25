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


</style>
<template>
    <head>
        <title>Quest Page</title>
    </head>
    <body>
        <main class="min-w-[1000px]">
            <!--header navigation bar-->
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
                <a class="absolute left-[10px]" href="#"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">NOTIFICATION</a></div>
                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">Username#123</span>
                        <img class="border-[2px] border-white w-[30px] h-auto rounded-full" src="../assets/img/avatar/avatar.jpg" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <!--leaderboard tab-->
            <nav class="absolute flex flex-row items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('student')" v-bind:class="{'text-gold': openTab === 'student', 'text-white': openTab !== 'student'}" href="#">STUDENT</a>
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('house')" v-bind:class="{'text-gold': openTab === 'house', 'text-white': openTab !== 'house'}" href="#">HOUSE</a>
            </nav>
            <!--leaderboard content-->
            <div class="absolute inset-y-0 inset-x-0 mx-auto min-w-[1000px] w-[100%] h-[100%]">
                <!--student-->
                <div class="absolute inset-y-0 min-w-[00px] w-full h-full pt-[100px] pb-[50px]">
                    <div class="flex flex-row items-start justify-center gap-5 h-full">
                        <!--student leaderboard section-->
                        <div class="flex flex-col items-center justify-start gap-3 w-[1200px] min-h-[150px] h-full" v-bind:class="{'hidden': openTab !== 'student', 'flex': openTab === 'student'}">
                            <div class="flex flex-col w-full h-full">
                                <!--student leaderboard head container-->
                                <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                    <!--student leaderboard head row-->
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                        <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">RANK</div>
                                        <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                        <div class="flex items-center justify-center w-[30%] h-full text-white text-[12px]">TITLE</div>
                                        <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">POINTS</div>
                                        <div class="flex items-center justify-center w-[10%] h-full text-white text-[12px]">HOUSE</div>
                                    </li>
                                </ul>
                                <!--student leaderboard list body-->
                                <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[85%] bg-black/20 overflow-y-scroll">
                                    <!--student leaderboard list row-->
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <div class="block w-[30px] h-[30px] border-[3px] border-gold -rotate-45"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">1</span></div>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">Username#123</strong>
                                                <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">Fides</span></div>
                                    </li>
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <div class="block w-[30px] h-[30px] border-[3px] border-gold -rotate-45"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">2</span></div>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">Username#123</strong>
                                                <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">Fortis</span></div>
                                    </li>
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <div class="block w-[30px] h-[30px] border-[3px] border-gold -rotate-45"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">3</span></div>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">Username#123</strong>
                                                <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">Equitas</span></div>
                                    </li>
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">4</span>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">Username#123</strong>
                                                <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">Liberalitas</span></div>
                                    </li>
                                </ul>
                                <!--current user-->
                                <ul class="flex flex-row border-x-[1px] border-gray w-full max-h-full min-h-[50px] h-[10%] bg-black/50">
                                    <!--student leaderboard list row-->
                                    <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                        <div class="flex items-center justify-center w-[5%] h-full">
                                            <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">4</span>
                                        </div>
                                        <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                            <!--image-->
                                            <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                            </div>
                                            <!--text-->
                                            <div class="inline-flex flex-col">
                                                <strong class="text-white text-[15px]">Username#123</strong>
                                                <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center justify-center w-[30%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                        <div class="flex items-center justify-center w-[5%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">Liberalitas</span></div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!--house leaderboard section-->
                        <div class="flex flex-col items-center justify-start gap-10 w-full min-h-[900px] h-full" v-bind:class="{'hidden': openTab !== 'house', 'flex': openTab === 'house'}">
                            <!--house Banner-->
                            <div class="flex items-center jusitfy-center bg-black/20 border-[1px] border-gray w-[80%] h-[60%]">
                                <div class="block items-center justify-start w-full h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                    <!--bg color of number changes-->
                                    <!--level container-->
                                    <div class="flex w-full h-full">
                                        <div class="flex items-start justify-start w-full h-full">
                                            <!--the banners will be in order list from left to right depending on the rank-->
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/fides-banner.png" /></div>
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/fortis-banner.png" /></div>
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/liberalitas-banner.png" /></div>
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/equitas-banner.png" /></div>
                                            <!--containter is scrollable. the banners below are added to demo that the container is can be scrolled horizontally-->
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/equitas-banner.png" /></div>
                                            <div class="flex items-start justify-center min-w-[272px] max-h-[500px] h-full"><img class="w-auto h-full" src="../assets/img/banner/equitas-banner.png" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!--leaderboards-->
                            <div class="flex flex-row items-center justify-start gap-3 w-[80%] max-h-[300px] h-[40%]">
                                <!--house leaderboard-->
                                <div class="flex flex-col w-[35%] h-full">
                                    <!--house leaderboard head container-->
                                    <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                        <!--house leaderboard head row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                            <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">RANK</div>
                                            <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                            <div class="flex items-center justify-center w-[15%] h-full text-white text-[12px]">POINTS</div>
                                            <div class="flex items-center justify-center w-[20%] h-full text-white text-[12px]">MEMBERS</div>
                                        </li>
                                    </ul>
                                    <!--house leaderboard list body-->
                                    <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                        <!--house leaderboard list row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="viewHouse('liberalitas')" v-bind:class="{'flex bg-black/20': selectedHouse === 'liberalitas'}">
                                            <div class="flex items-center justify-center w-[15%] h-full">
                                                <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">1</span>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-full flex items-center justify-center">
                                                    <img class="w-[35px] h-auto" src="../assets/img/banner/liberalitas-banner.png" />
                                                </div>
                                                <!--text-->
                                                <strong class="text-white text-[15px]">Liberalitas</strong>
                                            </div>
                                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                            <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">999</span></div>
                                        </li>
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="viewHouse('fides')" v-bind:class="{'flex bg-black/20': selectedHouse === 'fides'}">
                                            <div class="flex items-center justify-center w-[15%] h-full">
                                                <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">2</span>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-full flex items-center justify-center">
                                                    <img class="w-[35px] h-auto" src="../assets/img/banner/fides-banner.png" />
                                                </div>
                                                <!--text-->
                                                <strong class="text-white text-[15px]">Fides</strong>
                                            </div>
                                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                            <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">999</span></div>
                                        </li>
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="viewHouse('fortis')" v-bind:class="{'flex bg-black/20': selectedHouse === 'fortis'}">
                                            <div class="flex items-center justify-center w-[15%] h-full">
                                                <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">3</span>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-full flex items-center justify-center">
                                                    <img class="w-[35px] h-auto" src="../assets/img/banner/fortis-banner.png" />
                                                </div>
                                                <!--text-->
                                                <strong class="text-white text-[15px]">Fortis</strong>
                                            </div>
                                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                            <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">999</span></div>
                                        </li>
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 w-full cursor-pointer border-b-[1px] border-gray" v-on:click="viewHouse('equitas')" v-bind:class="{'flex bg-black/20': selectedHouse === 'equitas'}">
                                            <div class="flex items-center justify-center w-[15%] h-full">
                                                <span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px]">4</span>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-full flex items-center justify-center">
                                                    <img class="w-[35px] h-auto" src="../assets/img/banner/equitas-banner.png" />
                                                </div>
                                                <!--text-->
                                                <strong class="text-white text-[15px]">Equitas</strong>
                                            </div>
                                            <div class="flex items-center justify-center w-[15%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                            <div class="flex items-center justify-center w-[20%] h-full"><span class="text-white text-[13px]">999</span></div>
                                        </li>
                                    </ul>
                                </div>
                                
                                <!--student in selected house leaderboard-->
                                <div class="flex flex-col w-[65%] h-full">
                                    <!--student in selected house leaderboard list head-->
                                    <ul class="flex flex-row border-x-[1px] border-t-[1px] border-gray w-full max-h-full min-h-[25px] h-[5%] bg-black/50">
                                        <!--student leaderboard head row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-full w-full">
                                            <div class="flex items-center justify-center w-[5%] h-full text-white text-[12px]">RANK</div>
                                            <div class="flex items-center justify-center w-[45%] h-full text-white text-[12px]">NAME</div>
                                            <div class="flex items-center justify-center w-[35%] h-full text-white text-[12px]">TITLE</div>
                                            <div class="flex items-center justify-center w-[10%] h-full text-white text-[12px]">POINTS</div>
                                        </li>
                                    </ul>
                                    <!--student in selected house leaderboard list body-->
                                    <ul class="flex flex-col border-[1px] border-gray w-full max-h-full h-[95%] bg-black/20 overflow-y-scroll">
                                        <!--student leaderboard list row-->
                                        <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 py-[3px] w-full border-b-[1px] border-gray">
                                            <div class="flex items-center justify-center w-[5%] h-full">
                                                <div class="block w-[30px] h-[30px] border-[3px] border-gold -rotate-45"><span class="flex items-center justify-center h-full w-full text-white font-bold text-[15px] rotate-45">1</span></div>
                                            </div>
                                            <div class="flex items-center justify-start gap-3 w-[45%] h-full">
                                                <!--image-->
                                                <div class="relative w-[40px] h-[40px] flex items-center justify-center">
                                                    <img class="w-[35px] rounded-full h-auto" src="../assets/img/avatar/avatar.jpg" />
                                                    <img class="absolute inset-0 m-auto w-[40px] h-auto" src="../assets/img/frames/frame_sample.png" />
                                                </div>
                                                <!--text-->
                                                <div class="inline-flex flex-col">
                                                    <strong class="text-white text-[15px]">Username#123</strong>
                                                    <span class="text-white text-[13px]">Rondale Floyd Magtibay Bufete</span>
                                                </div>
                                            </div>
                                            <div class="flex items-center justify-center w-[35%] h-full"><span class="text-white text-[13px]">Official Knight of the Round Order</span></div>
                                            <div class="flex items-center justify-center w-[10%] h-full"><span class="text-white text-[13px]">999999</span></div>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
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
                openTab: 'student', //student, house
                selectedHouse: 'liberalitas', //fides, fortis, liberalitas, equitas
            }
        },
        methods: {
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            viewHouse: function (houseName) {
                this.selectedHouse = houseName
            },
        }
    }
</script>