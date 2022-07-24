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
</style>

<template>
    <head>
        <title>Ascension</title>
    </head>
    <!-- Other home page contents in progress-->
    <header class="mb-3">
        <nav class="fixed top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
            <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a><!-- suggesstion logo to redirect to student home page -->
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="/StudentProfilePage">PROFILE</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">QUEST</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">NOTIFICATION</a></div>
            <details class="absolute top-[10px] right-[10px] w-[170px]">
                <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                    <span class="text-white text-[12px]">{{StudentData.UserName}}</span>
                    <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" alt="Avatar"/>
                </summary>
                <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                    <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">ACCOUNT SETTINGS</a></div>
                    <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><button @click="logOut()" class="text-white text-[12px] hover:text-gold">SIGN OUT</button></div>
                </div>
            </details>
        </nav>
    </header>
    <body class="flex items-center align-middle overflow-y-hidden overflow-x-hidden">    
    <div>
        <div class="overflow-y-hidden">
                <div class="absolute mt-10 font-Lexend text-white w-full">
                    <ul class="flex flex-wrap ml-6">
                        <li class="mr-6 hover:text-gold" v-on:click="activeTab('overview')" v-bind:class="{'text-gold': openTab === 'overview'}">
                            <button @click="currentTab(1)">Overview</button>
                        </li>
                        <li class="mr-6 hover:text-gold" v-on:click="activeTab('dailyquotes')" v-bind:class="{'text-gold': openTab === 'dailyquotes'}">
                            <button @click="currentTab(2)">Daily Quotes</button>
                        </li>
                        <li class="mr-6 hover:text-gold" v-on:click="activeTab('trivia')" v-bind:class="{'text-gold': openTab === 'trivia'}">
                            <button @click="currentTab(3)">Trivia</button>
                        </li>
                        <li class="mr-6 hover:text-gold" v-on:click="activeTab('wordle')" v-bind:class="{'text-gold': openTab === 'wordle'}">
                            <button @click="currentTab(4)">Wordle</button>
                        </li>
                    </ul>
                </div>

                    <div><!-- Tab contents -->

                        <!-- Overview -->
                        <div v-if="tab === 1" class="overflow-y-hidden">
                            <div class="bg-[url('/src/assets/img/background/bg-1.jpg')] static flex bg-cover items-center w-screen h-screen">
                                <div class="font-Lexend text-white">
                                    <div class="flex-wrap w-1/4 mx-auto flex items-center justify-center">
                                        <div class="text-center text-2xl text-gold">
                                            <h1>WELCOME TO</h1>
                                        </div>
                                        <div class="w-full border-b-2 pb-4 border-gold border-solid">
                                        <img src="../assets/img/logo/text-logo-default.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- News and Announcements -->
                            <div>
                                <div class="absolute mt-5 text-white w-full"> <!-- getAnnouncements() -->
                                    <section class="hero container max-w-5xl flex mx-auto justify-center items-center">
                                        <img class="" src="../assets/img/posts/Orsem.jpg"/>
                                    </section>
                                        
                                    <section class="container max-w-6xl px-10 mx-auto text-justify">
                                        <div class="w-16 pt-8 font-default">
                                            <h1 class="text-gold font-bold">Event</h1>
                                        </div>
                                        
                                        <h1 class="text-4xl font-bold">Orsem 2022</h1>
                                        <p class="text-lg pt-2 mt-4 mb-8 text-justify">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </p>
                                    </section>
                                    <section class="container max-w-6xl mx-auto px-10 text-justify"> <!-- Other Announcements here -->
                                        <div class="grid grid-cols-2 gap-2">
                                            <div class="p-4">
                                                <section>
                                                    <img src=""/>
                                                </section>
                                                <section>
                                                    <div class="w-16 font-default">
                                                        <h1 class="text-gold font-bold">Event</h1>
                                                    </div>
                                                    <h2 class="text-4xl font-bold">Penafrancia 2022</h2>
                                                    <p class="text-lg">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                                </section>
                                            </div>
                                            <div class="p-4">
                                                <div class="w-24 font-default">
                                                    <h1 class="text-gold font-bold">Inside CCS</h1>
                                                </div>
                                                <h2 class="text-4xl font-bold">Be Part of ADNU CCS</h2>
                                                <p class="text-lg">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                </div>
                                            <div class="p-4">
                                                <div class="w-16 font-default">
                                                    <h1 class="text-gold font-bold">Event</h1>
                                                </div>
                                                <h2 class="text-4xl font-bold">Hablon Dawani</h2>
                                                    <p class="text-lg">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </p>
                                            </div>
                                            <div class="p-4">
                                                <div class="w-24 font-default">
                                                    <h1 class="text-gold font-bold">Inside CCS</h1>
                                                </div>
                                                <h2 class="text-4xl font-bold">A-WILL 2022</h2>
                                                <p class="text-lg">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                </p>
                                                </div>
                                        </div>
                                    </section>
                                </div>  
                            </div>    
                        </div>
                        <!-- Daily Quotes -->
                        <div v-if="tab === 2">
                            <div class="flex items-center justify-center w-full h-full">
                                <div class="font-Lexend text-white">
                                    <div class="text-center w-screen py-64">
                                        <div class="text-2xl tracking-wider">
                                            The best things
                                        </div>
                                        <div class="font-medium text-5xl tracking-widest">
                                            IN LIFE
                                        </div>
                                        <div class="text-2xl">
                                            are actually really
                                        </div>
                                        <div class="font-bold text-3xl tracking-widest">
                                            EXPENSIVE
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <!-- Trivia -->
                        <div v-if="tab === 3">
                            <div class="justify-center w-full h-full">
                                <div class="font-Lexend text-white">
                                    <div class="py-44 flex items-center justify-center text-center">
                                            <div class="text-3xl px-8 flex-wrap w-2/3">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                            </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <!-- Wordle -->
                        <div v-if="tab === 4">
                            <div class="bg-cover justify-center w-full h-full">
                                <div class="font-Lexend text-white">
                                    <div class="text-white">
                                        <div class="px-40 py-56 flex-wrap">
                                            <h1 class="text-6xl mb-4">Try WORDLE</h1>
                                            <p class=" text-2xl mb-4 w-2/3">Wordle is an online 5-letter word game. Each day a new word is released and players have six attempts to guess what the word of the day is.</p>
                                            <div>
                                                <button class="hover:text-gold text-2xl p-2 underline decoration-gold decoration-2 underline-offset-4">PLAY</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>

                <!-- about tab will be used to other component -->
                <div v-if="tab === 5" class="absolute w-full h-full text-white">
                    <div class="font-default -mt-12">
                        <div class="absolute mt-24 text-center">
                            <div class="mt-10 text-3xl">
                                Ascension
                            </div>
                            <div class="py-64 mx-6 text-2xl">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                            <div>
                                <footer>
                                    <button @click="currentTab(1)">Back to Home</button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>

                        
        </div>
    </div> 
    </body>
    <footer>

    </footer>
</template>
<script>
    import Parse from 'parse';
    /*import Navbar from '../components/StudentNavbar';*/

    export default{
        data(){
            return{
                //FRONTEND VARIABLES
                toggleModal: false,
                tab: 1,
                openTab: 'overview',

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                StudentData: [],
            }
        },
        components:{
            /*Navbar,*/
        },
        methods:{
            //===========FRONTEND FUNCTIONS===============
            currentTab: function (tabNumber) {
                this.tab = tabNumber;
            },

            activeTab: function (tabName) {
                this.openTab = tabName
            },

            //==========BACKEND FUNCTIONS=================
            async logOut(){
                await Parse.User.logOut();
                window.location.href ='http://' + this.host;
                //this.$router.go(0); refresh the page
            },

            async getAccountData(){
                var param = {"StudentID" : this.currentUser.get("AccountID")};
                this.StudentData = JSON.parse(await Parse.Cloud.run("GetStudentData", param));
            },

        },
        beforeMount(){
            if (this.currentUser) {
                //If account is not student, go to homepage
                if(this.currentUser.get("AccountType") !== "Student"){
                    window.location.href ='http://' + this.host;
                    return;
                }
                //If Account is logged in and does not have an account yet, redirect to sign up page
                else if(this.currentUser.get("AccountID") === undefined){
                    window.location.href ='http://' + this.host + '/SignUpPage';
                    return;
                }
                this.getAccountData();
            }
            else{
                window.location.href ='http://' + this.host;
            }
        },
    }
</script>