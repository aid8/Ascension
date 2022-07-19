<style>
    body {
        background-image: url('/src/assets/img/background/bg-2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        margin: 0;}
    html {
        scroll-behavior: smooth;
    }
</style>
<template>
    <head>
        <title>Ascension</title>
    </head>
    <body>
        <!--navigation bar-->
        <nav class="fixed z-[5] w-[100%] bg-black/15 backdrop-blur-[5px] border-b-[1px] border-gray font-Lexend text-center">
            <div class="inline-block w-[1350px] h-[39px] text-white text-center">
                <div class="inline-block mr-[220px] w-[150px] text-center">
                    <a href="#"><img class="inline-block w-[125px]" src="../assets/img/logo/text-logo-default.png" /></a>
                </div>
                <button class="inline-block border-b-[1px] border-b-gold text-gold text-[13px] my-[0px] w-[150px] h-[40px] align-middle">PROFILE</button>
                <button class="inline-block hover:text-gold text-[13px] my-[0px] w-[150px] h-[40px] align-middle">QUEST</button>
                <button class="inline-block hover:text-gold text-[13px] my-[0px] w-[150px] h-[40px] align-middle">LEADERBOARDS</button>
                <button class="inline-block hover:text-gold text-[13px] my-[0px] w-[150px] h-[40px] align-middle">NOTIFICATION</button>
                <div class="inline-block ml-[220px] w-[150px] text-center">
                    <select class="bg-black/0 text-white text-[12px]">
                        <option hidden>Username#123</option>
                        <option class="text-black text-[12px]">Account Settings</option>
                        <option class="text-black text-[12px]">Logout</option>
                    </select>
                </div>
            </div>
        </nav>
        
        <div class="grid md:grid-cols-3">
            <div class="col-span-1 h-full mt-10 backdrop-blur-sm bg-black/40 w-[350px] fixed">
                 <!--sidenavigation bar-->
                <nav class="py-10">
                    <div>
                        <h1 class="font-Lexend font-bold text-white ml-10 text-3xl py-5">Account Settings</h1>
                    </div>
                    <ul class="ml-10 text-white font-Lexend font-medium">
                        <li class="my-3">
                            <a href="#1" class="text-blue"> ACCOUNT SIGN-IN </a>
                        </li>
                        <li class="my-3">
                            <a href="#2"> PERSONAL INFORMATION </a>
                        </li>
                        <li class="my-3">
                            <a href="#3"> USER SUPPORT </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-span-2 overflow-y-hidden right-0 w-[980px] absolute">
                <!--account sign in-->
                <div id="1" class="pt-14 ">
                    <div class="grid md:grid-cols-2 mx-24 my-12 border-[1px] border-white">
                        <div class="col-span-1 bg-white h-[500px]">
                            <div class="font-Lexend text-black mx-7">
                                <h1 class="font-bold mt-7 mb-2">Ascension Account Sign-In</h1>
                                <p class="font-normal"> It is recommended 
                                    for the user to update their password 
                                    periodically to help prevent unauthorized 
                                    access to their account.</p>
                            </div>
                        </div>
                        <div class="col-span-1">
                            <form class="backdrop-blur bg-white/10 h-[500px]">
                                <div class="ml-12 mr-9 pt-9">
                                    <input required class="border-[1px] border-white  bg-white/10 w-full py-3 px-5 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                    placeholder="USERNAME">
                                </div>
                                <h1 class="font-Lexend font-bold text-black ml-12 text-3xl pt-8">Account Settings</h1>
                                <div class="ml-12 mr-9 pt-4">
                                    <input required class="border-[1px] border-white  bg-white/10 w-full py-3 px-5 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                    placeholder="CURRENT PASSWORD
                                    ">
                                </div>
                                <div class="ml-12 mr-9 pt-4">
                                    <input required class="border-[1px] border-white  bg-white/10 w-full py-3 px-5 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                    placeholder="NEW PASSWORD
                                    ">
                                </div>
                                <div class="ml-12 mr-9 pt-4 pb-12">
                                    <input required class="border-[1px] border-white  bg-white/10 w-full py-3 px-5 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                    placeholder="CONFIRM PASSWORD
                                    ">
                                </div>
                                <div class="ml-48 mr-9 text-center focus:shadow-none">
                                    <input class="font-Lexend bg-blue text-white text-[12px] h-[45px] w-[160px]" type="submit" value="SAVE AND VERIFY" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!--personal info -->
                <div class="col-span-2 py-1">
                    <div id="2" class="pt-14">
                        <div class="grid md:grid-cols-2 mx-24 my-12">
                            <div class="col-span-1 bg-white h-[550px]">
                                <div class="font-Lexend text-black mx-7">
                                    <h1 class="font-bold mt-7 mb-2">Personal Information</h1>
                                    <p class="font-normal"> This information is private and will 
                                        not be shared with other students.</p>
                                </div>
                            </div>
                            <div class="col-span-1">
                                <form class="backdrop-blur h-[550px] border-[1px] border-white">
                                    <h3 class="ml-12 mr-9 pt-9 font-Lexend text-white"> USERNAME </h3>
                                    <div class="ml-12 mr-9 pt-2">
                                        <input required class="border-[1px] border-white bg-white/10 w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                        placeholder="MyUsername#123">
                                    </div>
                                    <h3 class="ml-12 mr-9 pt-2 font-Lexend text-white"> EMAIL ADDRESS </h3>
                                    <div class="ml-12 mr-9 pt-2">
                                        <input required class="border-[1px] border-white bg-white/10 w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                        placeholder="mguerrero@gbox.adnu.edu.ph
                                        ">
                                    </div>
                                    <h3 class="ml-12 mr-9 pt-2 font-Lexend text-white"> MOBILE NUMBER </h3>
                                    <div class="ml-12 mr-9 pt-2">
                                        <input required class="border-[1px] border-white bg-white/10 w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                        placeholder="09954668472
                                        ">
                                    </div>
                                    <h3 class="ml-12 mr-9 pt-2 font-Lexend text-white"> SCHOOL </h3>
                                    <div class="ml-12 mr-9 pt-2">
                                        <input required class="border-[1px] border-white bg-white/10 w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                        placeholder="Ateneo de Naga University
                                        ">
                                    </div>
                                    <h3 class="ml-12 mr-9 pt-2 font-Lexend text-white"> DATE OF BIRTH </h3>
                                    <div class="ml-12 mr-9 pt-2 pb-8">
                                        <input required class="border-[1px] border-white bg-white/10 w-full py-3 px-3 text-black leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" 
                                        placeholder="07|02|2001
                                        ">
                                    </div>
                                    <div class="ml-48 mr-9 text-center focus:shadow-none">
                                        <input class="font-Lexend bg-blue text-white text-[12px] h-[45px] w-[160px]" type="submit" value="SAVE AND VERIFY" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!--user support-->
                    <div class="col-span-2 py-1">
                        <div id="3" class="pt-14">
                            <div class="grid md:grid-cols-2 mx-24 my-12 border-[1px] border-white">
                                <div class="col-span-1 bg-white h-[550px]">
                                    <div class="font-Lexend text-black mx-7">
                                        <h1 class="font-bold mt-7 mb-2">User Support</h1>
                                        <p class="font-normal"> Get help from ADNU CCS when 
                                            a user encounter problems with the system.</p>
                                    </div>
                                </div>                                <div class="col-span-1">
                                    <form class="backdrop-blur h-[550px]">
                                        <div class="ml-12 mr-9 pt-10 pb-5">
                                        <textarea class="border-[1px] border-white bg-white/10 text-white/75 w-full h-[200px] py-3 px-3" placeholder="STATE YOUR CONCERN"></textarea>    
                                        </div>
                                        <div class="ml-48 mr-9 text-center focus:shadow-none">
                                            <input class="font-Lexend bg-blue text-white text-[12px] h-[45px] w-[160px]" type="submit" value="SEND" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>            
    </body>
</template>

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css'
    export default{
        data(){
            return{
                userType: '',
            }
        },
        components:{
           
        },
        methods:{
            async signIn(){
                let host = window.location.host
                window.location.href ='http://' + host + '/AccountCreation';
            },

            async admin(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/AdminPage';
            }
        }
    }
</script>