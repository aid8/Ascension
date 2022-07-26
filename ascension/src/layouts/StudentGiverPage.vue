<template>
    <head>
        <title>Records | Student</title>
    </head>
    
    <body class="bg-default h-full">

    <header class="">
        <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center">
            <img class="absolute left-[10px] w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" />
            <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">STUDENT</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">COMMUNITY</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARD</a></div>
            <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">NOTIFICATION</a></div>
            <details class="absolute top-[10px] right-[10px] w-[170px]">
                <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                    <span class="text-white text-[12px]">Username#123</span>
                    <img class="border-[2px] border-white w-[30px] h-auto rounded-full" src="../assets/img/avatar/avatar.jpg" />
                </summary>
                <div class="bg-black/20 border-[1px] mt-[15px] border-gray">                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">ACCOUNT SETTINGS</a></div>
                    <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                </div>
            </details>
        </nav>
    </header>

        <div class="">
        <div class="flex mx-2">
            <nav class="text-sm flex justify-start">
                <a href="" class="inline-block mx-8 my-2 text-gold">RECORDS</a>
                <a href="/GiverNotifications" class="inline-block mx-8 my-2 text-white hover:text-gold">REQUESTS</a>
            </nav>
        </div>

        <div class="flex justify-center items-center">
            <span>
                <img class="m-10 inline w-36 h-36 rounded-full border-8 border-white" src="../assets/img/avatar/avatar.jpg" alt="user photo">
            </span>

            <span class="flex flex-col my-10">
                <p class="text-white font-bold text-3xl">MyUsername#456</p>
                <p class="text-white text-lg">Real Name</p>
                <div class="columns-2">
                    <p class="text-white">Email:</p>
                    <p class="text-gold">rname@gbox.adnu.edu.ph</p>
                </div>
                <div class="columns-2">
                    <p class="text-white">Student ID:</p>
                    <p class="text-gold">C0201912345</p>
                </div>
                <div class="columns-2">
                    <p class="text-white">Mobile Number:</p>
                    <p class="text-gold">09123456789</p>
                </div>
            </span>

            <span>
                <img class="m-10 inline w-36 h-36" src="../assets/img/logo/fortis-logo-white.png" />
            </span>
        </div>

        <div class="flex mx-10 py-4 items-stretch justify-center">
            <div class="flex bg-black bg-opacity-40 border border-white text-white w-2/5 items-center justify-center">
                <input type="search" placeholder="Search Student..." class="bg-black bg-opacity-0 w-5/6 p-2 px-8">
                <button type="submit" class="flex justify-center items-center w-1/6">
                    <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/search-more.png"/>
                </button>

            </div>
        </div>

        <div class="flex justify-center my-4">
            <table class="table-fixed w-full text-white mx-10">
                <thead class="">
                    <tr>
                        <th class="py-4">Name</th>
                        <th class="py-4">Student ID</th>
                        <th class="py-4">Program</th>
                        <th class="py-4">House</th>
                        <th class="py-4">Active Status</th>
                        <th class="py-4"></th>
                    </tr>
                </thead>
                <tbody class="text-center border border-white bg-black bg-opacity-40">
                    <tr class="hover:bg-darkblue">
                        <td>Username</td>
                        <td>C0201912345</td>
                        <td>BS 'Program'</td>
                        <td>House Name</td>
                        <td class="text-green">Online</td>
                        <td>
                            <button class="border border-white bg-darkblue2 px-6 py-1 my-2 hover:bg-darkblue">
                                Give Badge
                            </button>
                        </td>
                    </tr>
                    <tr class="hover:bg-darkblue3">
                        <td>Username</td>
                        <td>C0201912345</td>
                        <td>BS 'Program'</td>
                        <td>House Name</td>
                        <td class="text-green">Online</td>
                        <td>
                            <button v-on:click="hasClicked(true)" class="border border-white bg-darkblue2  px-6 py-1 my-2 hover:bg-darkblue">
                                Give Badge
                            </button>
                            <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
        </div>

        

    </body>
</template>

<script>
export default{
        data(){
            return{
                userType: '',
                isActive: 'false'
            }
        },
        methods:{
            // Front-end methods
            hasClicked: function (bool, type) {
                this.isClicked = bool
            },
            async Home(){
                let host = window.location.host
                window.location.href ='http://' + host + '/';
            },
            async StudentProfile(){
                let host = window.location.host
                window.location.href ='http://' + host + '/StudentProfile';
            },
            async StudentWeekly() {
                let host = window.location.host
                window.location.href ='http://' + host + '/StudentWeekly';
            },
            async QuestPage(){
                let host = window.location.host
                window.location.href ='http://' + host + '/QuestPage';
            },
            async AccountSettings(){
                let host = window.location.host
                window.location.href ='http://' + host + '/AccountSettings';
            },
           

        }
    }

</script>
