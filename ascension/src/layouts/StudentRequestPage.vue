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
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">REQUEST</a></div>
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
            
            <div class="absolute inset-y-0 inset-x-0 mx-auto min-w-[1000px] w-full h-[100%]">
                <div class="absolute inset-y-0 min-w-[100px] w-full h-full pt-[50px] pb-[50px]">
                    <div class="flex flex-row items-start justify-center gap-3 pt-[20px] min-h-[500px] w-full h-full">
                        <!--send request form-->
                        <div class="flex flex-col items-center justify-start w-[20%] min-h-[150px] h-full">
                            <form class="flex flex-col gap-5 w-full">
                                <legend class="text-white w-full">SEND REQUEST</legend>
                                <div class="h-auto w-full">
                                    <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] cursor-pointer p-[10px] w-full" type="file" />
                                    <label class="text-[12px] text-white">Upload a proof of completion for your eligibility in obtaining a badge.</label>
                                </div>
                                <div class="h-auto w-full">
                                    <input class="border-[1px] border-gray bg-black/20 text-white text-[12px] p-[10px] w-full" type="text" name="city" list="giver" placeholder="Choose giver...">
                                    <datalist id="giver">
                                        <option value="Giver's Name">Giver Unit</option>
                                    </datalist>
                                    <label class="text-[12px] text-white">Select a giver you want to send your request to.</label>
                                </div>
                                <input class="text-white bg-blue hover:bg-blue_hover active:bg-blue_active text-[10px] h-[30px] w-full cursor-pointer" type="submit" value="SUBMIT" />
                            </form>
                        </div>

                        <!--requests inbox-->
                        <div class="flex flex-col items-center justify-start w-[70%] min-h-[150px] h-full">
                            <nav class="flex flex-row gap-5 h-auto px-[20px] w-full">
                                <div class="h-full w-auto"><a class="text-white text-[13px] hover:text-gold" v-on:click="activeTab('checked')" v-bind:class="{'text-gold':openTab === 'checked'}" href="#">CHECKED</a></div>
                                <div class="h-full w-auto"><a class="text-white text-[13px] hover:text-gold" v-on:click="activeTab('submitted')" v-bind:class="{'text-gold':openTab === 'submitted'}" href="#">SUBMITTED</a></div>
                            </nav>

                            <!--checked requests-->
                            <ul class="flex flex-col bg-black/20 border-[1px] border-gray h-full w-full remove-scroll overflow-y-scroll" v-bind:class="{'flex': openTab === 'checked', 'hidden': openTab !== 'checked'}">
                                <li class="flex flex-row px-[10px] py-[3px] border-b-[1px] border-gray w-full">
                                    <div class="flex flex-col items-start justify-center w-[30%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-white text-[13px]">Giver's Name</strong>
                                        <span class="text-white text-[12px]">College of Computer Studies</span>
                                    </div>
                                    <div class="flex flex-row items-center justify-start gap-2 w-[60%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <span class="text-white text-[12px]">Your request has been approved. You received </span>
                                        <img class="w-[40px] h-auto" src="../assets/img/badges/badge_5.png" />
                                        <span class="text-white text-[12px]">"Badge Name" badge.</span>
                                        <span class="text-white text-[12px]">You can now find this badge in your collection.</span>
                                    </div>
                                    <div class="flex flex-col items-end justify-center w-[10%] h-full"><span class="text-white text-[12px]">July 25</span></div>
                                </li>
                                <li class="flex flex-row px-[10px] py-[3px] border-b-[1px] border-gray w-full">
                                    <div class="flex flex-col items-start justify-center w-[30%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <strong class="text-white text-[13px]">Giver's Name</strong>
                                        <span class="text-white text-[12px]">College of Computer Studies</span>
                                    </div>
                                    <div class="flex flex-row items-center justify-start gap-2 w-[60%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <span class="text-white text-[12px]">Your request has been denied. <a class="text-gold" href="#">See more</a> information on why your request got denied.</span>
                                    </div>
                                    <div class="flex flex-col items-end justify-center w-[10%] h-full"><span class="text-white text-[12px]">July 25</span></div>
                                </li>
                            </ul>

                            <!--submitted requests-->
                            <ul class="flex flex-col bg-black/20 border-[1px] border-gray h-full w-full remove-scroll overflow-y-scroll" v-bind:class="{'flex': openTab === 'submitted', 'hidden': openTab !== 'submitted'}">
                                <li class="flex flex-row px-[10px] py-[10px] border-b-[1px] border-gray w-full">
                                    <div class="flex flex-row items-center justify-start gap-2 w-[75%] h-full whitespace-nowrap remove-scroll overflow-x-scroll" title="Press shift + scroll to scroll horizontally">
                                        <span class="text-white text-[12px]"><i class="fa-solid fa-paper-plane"></i> Request submitted to: <b>Giver's Name (Giver's Unit)</b></span>
                                    </div>
                                    <div class="flex flex-row items-center justify-center gap-2 w-[15%] h-full">
                                        <a class="text-gold text-[12px]" href="#">Proof of eligibility</a>
                                    </div>
                                    <div class="flex flex-col items-end justify-center w-[10%] h-full"><span class="text-white text-[12px]">July 25</span></div>
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
                openTab: 'checked', //checked, submitted
            }
        },
        methods: {
            activeTab: function (tabName) {
                this.openTab = tabName
            },
        }
    }
</script>