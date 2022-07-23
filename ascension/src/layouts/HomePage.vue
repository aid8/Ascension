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
    
    <header class="mb-2">
        <nav class="fixed top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
            <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png"/></a>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-gold text-[13px] hover:text-gold" href="/StudentProfile"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#"></a></div>
            <div class="flex items-center justify-end py-[5px] px-[10px] absolute top-[10px] right-[10px] w-[170px]"><a class="text-white text-[12px] hover:text-gold" href="/StudentHomePage">SIGN IN</a></div>
        </nav>
    </header>
    <body class="flex items-center align-middle overflow-y-hidden overflow-x-hidden">    
    <div>
        <div class="overflow-y-hidden">
                <div class="absolute mt-12 font-Lexend text-white w-full">
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
                        <div v-if="tab === 1" class="overflow-y-hidden">
                            <div class="bg-[url('/src/assets/img/background/bg-2.jpg')] static flex bg-cover items-center w-screen h-screen">
                                <div class="font-Lexend text-white">
                                    <div class="mx-44 flex-wrap w-2/3">
                                        <h1 class="text-6xl mb-4">The best way to motivate students.</h1>
                                        <p class=" text-2xl mb-4">Ascension is a gamified academic program that<br />encourages students to perform better in school.</p>
                                        <div class="float-left my-2">
                                            <button class="hover:text-gold text-2xl mr-2 underline decoration-gold decoration-2 underline-offset-4" @click="logInStudent()">Join the Ascension</button>
                                        </div>
                                        <div>
                                            <button class="hover:text-gold text-2xl m-2 underline decoration-gold decoration-2 underline-offset-4" @click="currentTab(5)">Learn More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    /*import Navbar from '../components/HomeNavbar';*/

    export default{
        data(){
            return{
                userType: '',
                loggedIn: false,
                toggleModal: false,
                tab: 1,
                openTab: 'overview',
            }
        },
        components:{
           /* Navbar,*/
        },
        beforeMount(){
            var currentUser = Parse.User.current();
            if (currentUser) {
                this.loggedIn = true;
            }
            else{
                this.loggedIn = false;
            }
        },
        methods:{
            async signIn(){
                let host = window.location.host
                window.location.href ='http://' + host + '/AccountCreation';
            },

            async admin(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/AdminPage';
            },
            async logInTeacher(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/TeacherTest';
            },
            async logInStudent(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/StudentTest';
            },
            async signInWithGoogle(){
                window.location.href = await Parse.Cloud.run("GoogleSignIn");
            },
            async logOut(){
                await Parse.User.logOut();
                this.$router.go(0); //refresh the page
            },
            currentTab: function (tabNumber) {
            this.tab = tabNumber;
            },
            activeTab: function (tabName) {
                this.openTab = tabName;
            },
        }
    }
</script>