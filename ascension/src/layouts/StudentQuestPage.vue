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
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
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
            <!--quest tab-->
            <nav class="absolute flex flex-row items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('daily')" v-bind:class="{'text-gold': openTab === 'daily'}" href="#">DAILY</a>
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('weekly')" v-bind:class="{'text-gold': openTab === 'weekly'}" href="#">WEEKLY</a>
            </nav>
            
            <!--daily-->
            <div class="absolute inset-y-0 min-w-[1000px] w-[100%] h-[100%] pt-[100px] pb-[50px]">
                <div class="flex flex-row items-start justify-center gap-[40px] h-full">
                    <!--next reward-->
                    <div class="flex flex-col items-center justify-start gap-3 min-h-[500px] w-[300px] h-full">
                        <!--mission summary-->
                        <div class="w-full justify-center flex flex-row">
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Totaly daily mission completed">
                                <span>10</span>
                                <i class="fa-solid fa-calendar-day"></i>
                            </div>
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Totaly weekly mission completed">
                                <span>10</span>
                                <i class="fa-solid fa-calendar-week"></i>
                            </div>
                            <div class="flex flex-col w-[70px] justify-center items-center gap-1 text-gold text-[13px]" title="Current XP">
                                <span>550</span>
                                <i class="fa-solid fa-fire"></i>
                            </div>
                        </div>
                        <!--next reward text-->
                        <div class="w-full flex items-center justify-start">
                            <span class="text-white text-[15px]">Next Reward:</span>
                        </div>
                        <!--next reward image-->
                        <div class="w-full flex items-center justify-center">
                            <div class="flex items-center justify-center border-[1px] border-gray w-[300px] h-[300px]">
                                <img class="block w-auto h-auto" src="../assets/img/avatar/avatar_reward_2.jpg" />
                            </div>
                        </div>
                        <!--next reward name and its level (what level its placed in)-->
                        <div class="w-full flex flex-col items-center justify-center text-white">
                            <strong class="text-[15px]">Avatar Name</strong>
                            <span class="text-[13px]">Level 10</span>
                        </div>
                    </div>

                    <!--quest progress and list-->
                    <div class="flex flex-col items-center justify-start gap-3 min-h-[500px] w-[70%] h-full">
                        <!--progress and rewards-->
                        <div class="flex w-full h-[20%]" title="Press shift + scroll to scroll horizontally">
                            <div class="block items-center justify-start border-[1px] border-gray bg-black/20 w-full h-full whitespace-nowrap remove-scroll overflow-x-scroll">
                                <!--bg color of number changes-->
                                <!--level container-->
                                <div class="flex w-full mx-[50px] h-full">
                                    <!--level 1-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="100" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">1</span></div>
                                    </div>
                                    <!--level 2-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="100" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">2</span></div>
                                    </div>
                                    <!--level 3-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="100" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">3</span></div>
                                    </div>
                                    <!--level 4-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="100" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">4</span></div>
                                    </div>
                                    <!--level 5 (reward)-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="100" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gold border-[5px] border-gold rotate-45 w-[50px] h-[50px] overflow-hidden">
                                            <img class="flex -rotate-45 scale-[1.5] w-[150px] h-auto cursor-pointer" v-on:click="rewardClaimed(true)" v-bind:class="{'hidden': isRewardClaim === true, 'flex': isRewardClaim === false}" src="../assets/img/avatar/avatar_reward.jpg" />
                                            <div class="relative flex items-center justify-center -rotate-45 scale-[1.5] w-[150px] h-auto" v-bind:class="{'hidden': isRewardClaim === false, 'flex': isRewardClaim === true }">
                                                <img class="w-[150px] h-auto brightness-50 z-10" src="../assets/img/avatar/avatar_reward.jpg" />
                                                <div class="absolute text-gold text-[15px] z-20"><i class="fa-solid fa-check"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--level 6-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="50" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gray rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">6</span></div>
                                    </div>
                                    <!--level 7-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="0" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gray rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">7</span></div>
                                    </div>
                                    <!--level 8-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="0" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gray rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">8</span></div>
                                    </div>
                                    <!--level 9-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="0" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gray rotate-45 w-[20px] h-[20px]"><span class="text-white text-[10px] rotate-[-45deg]">9</span></div>
                                    </div>
                                    <!--level 10 (reward)-->
                                    <div class="flex items-center h-full">
                                        <progress class="bg-gray text-gold w-[70px] h-[5px]" value="0" max="100"></progress>
                                        <div class="inline-flex items-center justify-center bg-gray border-[5px] border-gray rotate-45 w-[50px] h-[50px] overflow-hidden">
                                            <img class="-rotate-45 scale-[1.5] w-[150px] h-auto cursor-default" src="../assets/img/avatar/avatar_reward_2.jpg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--daily quest list-->
                        <div class="flex w-full h-[80%]" v-bind:class="{'hidden': openTab !== 'daily', 'flex': openTab === 'daily'}">
                            <!--quest list container-->
                            <ul class="flex flex-col border-[1px] border-gray w-full h-full bg-black/20 overflow-y-scroll">
                                <!--quest list row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-[60px] w-full border-b-[1px] border-gray">
                                    <!--required number of how many times to do the quest-->
                                    <div class="flex items-center justify-center h-full">
                                        <div class="flex items-center justify-center rounded-full w-[45px] h-[45px] border-[1px] border-gray">
                                            <span class="text-white text-[12px]">0/5</span>
                                        </div>
                                    </div>
                                    <!--quest information-->
                                    <div class="flex flex-col items-start justify-center text-white remove-scroll overflow-x-auto whitespace-nowrap h-full w-full" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-[15px]">Daily Quest Title</strong>
                                        <span class="text-[12px]">Quest description description description descriptiondescription descriptiondescription descriptiondescription descriptiondescription description.</span>
                                    </div>
                                    <!--claim button-->
                                    <div class="flex items-center justify-center h-full">
                                        <button class="flex items-center justify-center bg-blue text-white text-[12px] w-[100px] h-[35px] hover:bg-blue_hover active:bg-blue_active" v-on:click="dailyClaimed(true)" v-bind:class="{'hidden': isDailyClaim === true, 'flex': isDailyClaim === false}">CLAIM</button>
                                        <div class="flex items-center justify-center border-[1px] border-gray text-white text-[12px] w-[100px] h-[35px]" v-bind:class="{'hidden': isDailyClaim === false, 'flex': isDailyClaim === true}">CLAIMED</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <!--weekly quest list-->
                        <div class="flex w-full h-[80%]" v-bind:class="{'hidden': openTab !== 'weekly', 'flex': openTab === 'weekly'}">
                            <!--quest list container-->
                            <ul class="flex flex-col border-[1px] border-gray w-full h-full bg-black/20 overflow-y-scroll">
                                <!--quest list row-->
                                <li class="relative flex flex-row items-center justify-center px-[12px] gap-3 h-[60px] w-full border-b-[1px] border-gray">
                                    <!--required number of how many times to do the quest-->
                                    <div class="flex items-center justify-center h-full">
                                        <div class="flex items-center justify-center rounded-full w-[45px] h-[45px] border-[1px] border-gray">
                                            <span class="text-white text-[12px]">0/5</span>
                                        </div>
                                    </div>
                                    <!--quest information-->
                                    <div class="flex flex-col items-start justify-center text-white remove-scroll overflow-x-auto whitespace-nowrap h-full w-full" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-[15px]">Weekly Quest Title</strong>
                                        <span class="text-[12px]">Quest description description description descriptiondescription descriptiondescription descriptiondescription descriptiondescription description.</span>
                                    </div>
                                    <!--claim button-->
                                    <div class="flex items-center justify-center h-full">
                                        <button class="flex items-center justify-center bg-blue text-white text-[12px] w-[100px] h-[35px] hover:bg-blue_hover active:bg-blue_active" v-on:click="weeklyClaimed(true)" v-bind:class="{'hidden': isWeeklyClaim === true, 'flex': isWeeklyClaim === false}">CLAIM</button>
                                        <div class="flex items-center justify-center border-[1px] border-gray text-white text-[12px] w-[100px] h-[35px]" v-bind:class="{'hidden': isWeeklyClaim === false, 'flex': isWeeklyClaim === true}">CLAIMED</div>
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
                openTab: 'daily', //daily, weekly
                isDailyClaim: false,
                isWeeklyClaim: false, 
                isRewardClaim: false,
            }
        },

        methods: {
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            dailyClaimed: function (yes) {
                this.isDailyClaim = yes
            },
            weeklyClaimed: function (yes) {
                this.isWeeklyClaim = yes
            },
            rewardClaimed: function (yes) {
                this.isRewardClaim = yes
            },
        }

    }
</script>