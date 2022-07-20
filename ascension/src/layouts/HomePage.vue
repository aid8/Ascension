<template>
    <head>
        <title>Ascension</title>
    </head>

    <header class="fixed z-[5] w-[100%] bg-black/15 backdrop-blur-[5px] border-b-[1px] border-gray font-Lexend text-center text-white">
        <div class="w-5/6">
            <img src="../assets/img/logo/text-logo-default.png" class="ml-5 mt-2 -mb-4 w-32"/>
        </div>
        <div class="w-1/6 float-right flex justify-end">
            <button class="hover:text-gold underline decoration-gold decoration-2 underline-offset-4 mr-5 mb-2 -mt-2" @click="logInStudent()">Sign In</button>
        </div>
    </header>
    
    <!-- Other home page contents in progress-->

    <body class="flex items-center align-middle overflow-y-hidden pb-4 mb-12 row-2">
        <div>
            <div class="bg-[url('/src/assets/img/background/bg-2.jpg')] bg-cover bg-fixed justify-center  w-screen h-screen">
                <div>
                    <div class="font-Lexend text-white mb-4">
                        <div class="mx-44 py-64">
                            <h1 class="text-6xl mb-4">The best way to<br />motivate students.</h1>
                            <p class=" text-2xl mb-4">Ascension is a gamified academic program that<br />encourages students to perform better in school.</p>
                            <div class="float-left my-2">
                                <button class="hover:text-gold text-2xl mr-2 underline decoration-gold decoration-2 underline-offset-4" @click="logInStudent()">Join the Ascension</button>
                            </div>
                            <div>
                                <button class="hover:text-gold text-2xl m-2 underline decoration-gold decoration-2 underline-offset-4">Learn More</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>

        <div class="bg-default bg-cover bg-fixed text-white">
            <div>
                <div class=""> <!-- getAnnouncements() -->
                    <section class="hero container max-w-7xl mx-auto px-10 flex">
                        <img class="mt-28" src="../assets/img/posts/Orsem.jpg"/>
                    </section>
                        
                    <section class="container max-w-7xl px-10 mx-auto">
                        <div class="w-16 pt-8 font-default">
                            <h1 class="text-gold font-bold">Event</h1>
                        </div>
                        <h1 class="text-4xl font-bold">Orsem 2022</h1>
                        <p class="text-lg pt-2 mt-4 mb-8 text-justify">
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </section>
                    <section class="border container max-w-7xl mx-auto px-10 p-2 text-justify"> <!-- Other Announcements here -->
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
    </div> 
    </body>
    <footer>

    </footer>
</template>
<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                userType: '',
                loggedIn: false,
            }
        },
        components:{
           
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
            }
        }
    }
</script>