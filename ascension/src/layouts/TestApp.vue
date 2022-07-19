<style>
    body {
        background-image: url('/src/assets/bg2.jpg');
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
        <nav class="fixed z-[5] w-[100%] bg-black/15 backdrop-blur-[5px] border-b-[1px] border-gray font-Lexend text-center">
            <div class="inline-block w-[1350px] h-[39px] text-white text-center">
                <div class="inline-block mr-[220px] w-[150px] text-center">
                    <a href="#"><img class="inline-block w-[125px]" src="../assets/logo.png" /></a>
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
        <section class="fixed bottom-[0px] w-[100%] h-[100%] text-center z-[4]"> <!--for profile background-->
            <figure class="static bottom-[0px] inset-x-[0px] mt-[40px] mx-[auto] w-[1366px] h-[100%] text-white text-center border-[1px]"> <!--content container-->

            </figure>
        </section>
    </body>
</template>
<script>
    import Parse from 'parse';
    import '/src/assets/tailwind.css'
    export default{
        data(){
            return{
                userType: '',
            }
        },
        components:{
           
        },
    }
</script>