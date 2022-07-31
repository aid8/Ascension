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
    
    <header class="mb-2 background-default">
        <nav class="fixed top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
            <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png"/></a>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-gold text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-end py-[5px] px-[10px] absolute top-[10px] right-[10px] w-[170px]"><button @click="logInUser()" class="text-white text-[12px] hover:text-gold">SIGN IN</button></div>
        </nav>
    </header>
    <body class="flex items-center align-middle overflow-y-hidden overflow-x-hidden">    
    <div>
        <div class="overflow-y-hidden">
                    <div><!-- Tab contents -->
                        <div class="w-full absolute flex items-center justify-center text-4xl text-white my-[375px] z-[5]"> <!-- Carousel ngaya -->
                            <div class="w-1/2">
                                <button class="ml-[40px]" v-bind:class="{'hidden' : tab === 1}" @click="prevPage()">&lt;</button>
                            </div>
                            <div class="w-1/2">
                                <button class="float-right mr-[40px]" v-bind:class="{'hidden' : tab === 4}" @click="nextPage()">&gt;</button>
                            </div>
                        </div>
                        <div class="absolute flex items-center justify-center text-2xl mt-[750px] gap-3 w-full text-white"> <!-- Radio buttons -->
                            <button class="hover:text-gold" v-bind:class="{'text-gold': tab === 1}" @click="currentTab(1)">&#11201;</button>
                            <button class="hover:text-gold" v-bind:class="{'text-gold': tab === 2}" @click="currentTab(2)">&#11201;</button>
                            <button class="hover:text-gold" v-bind:class="{'text-gold': tab === 3}" @click="currentTab(3)">&#11201;</button>
                            <button class="hover:text-gold" v-bind:class="{'text-gold': tab === 4}" @click="currentTab(4)">&#11201;</button>
                        </div>
                        <div v-if="tab === 1" class="overflow-y-hidden">
                            <div class="bg-[url('/src/assets/img/background/bg-2.jpg')] static flex bg-cover items-center w-screen h-screen">
                                <div class="font-Lexend text-white">
                                    <div class="mx-44 flex-wrap w-2/3">
                                        <h1 class="text-6xl mb-4">The best way to motivate students.</h1>
                                        <p class=" text-2xl mb-4">Ascension is a gamified academic program that<br />encourages students to perform better in school.</p>
                                        <div class="float-left my-2">
                                            <button class="hover:text-gold text-2xl mr-2 underline decoration-gold decoration-2 underline-offset-4" @click="logInUser()">Join the Ascension</button>
                                        </div>
                                        <div>
                                            <button class="hover:text-gold text-2xl m-2 underline decoration-gold decoration-2 underline-offset-4" @click="currentTab(5)">Learn More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="absolute bg-white mt-5 text-black/70 w-full"> <!-- getAnnouncements() -->
                                    <section class="hero container max-w-5xl my-5 flex mx-auto justify-center items-center">
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
                                    <div class="absolute flex flex-col items-center justify-center my-64 w-screen">
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
            
                <div v-if="tab === 5" class="w-full h-full text-white">
                    <div class="font-default">
                        <div class="absolute m-[230px] text-center">
                            <div class="mb-10 text-3xl">
                                Ascension
                            </div>
                            <div class="text-2xl mb-10">
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
    /*import Navbar from '../components/HomeNavbar';*/

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
            }
        },
        components:{
           /* Navbar,*/
        },
        methods:{
            //===========FRONTEND FUNCTIONS===============
            currentTab: function (tabNumber) {
                this.tab = tabNumber;
            },

            activeTab: function (tabName) {
                this.openTab = tabName;
            },
            nextPage(){
                    this.tab++;
                },
            prevPage(){
                this.tab--;
            },
            //==========BACKEND FUNCTIONS=================
            async admin(){
                window.location.href ='http://' + this.host + '/AdminPage';
            },
            async logInUser(){
                window.location.href = await Parse.Cloud.run("GoogleSignIn");
            },
        },
        beforeMount(){
            if (this.currentUser) {
                //Redirect to StudentHomePage if logged in and has data
                if(this.currentUser.get("AccountType") === "Student"){
                    window.location.href ='http://' + this.host + '/StudentHomePage';
                }
                //If Account is logged in and does not have an account yet, redirect to sign up page
                else if(this.currentUser.get("AccountID") === undefined){
                    window.location.href ='http://' + this.host + '/SignUpPage';
                }
            }
        }, 
    }
</script>