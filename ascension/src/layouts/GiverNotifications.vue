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

/*100vh*/
</style>
<template>
    <body>
        <main class="relative justify-center min-w-[1000px] h-[100vh] overflow-y-hidden">
            <!-- Pop up for show proof-->
            <div class="absolute flex items-center justify-center w-[100vw] h-[105vh] min-w-[1000px] min-h-[500px] bg-black/20 backdrop-blur-[15px] z-50" v-bind:class="{'hidden': showPopUpMenu === false, 'flex': showPopUpMenu === true}">
                <div class="relative flex flex-col justify-center items-center h-[400px] w-[700px] bg-black/20 border-[1px] border-gray">
                    <div class="absolute py-[10px] flex flex-row gap-2 top-0 left-[10px] z-20 mt-[5px]">
                        <a class="text-white hover:text-gold text-[13px] ml-[10px]" v-on:click="activePopUpMenu(false)" href="#"><i class="fa-solid fa-angle-left mr-[5px]"></i>Back</a>
                    </div>
                    <div class="flex flex-col gap-4 items-center justify-center h-full w-full">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-[auto] w-auto bg-white" src="../assets/img/file_placeholder.png" />
                                </div>
                                 <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Filename.exe</span>
                                </div>
                                <button class="bg-blue text-white text-[15px] p-[10px] w-[220px]">DOWNLOAD</button>
                               
                    </div>
                </div>
            </div>
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center">
                <img class="absolute left-[10px] w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" />
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">STUDENT</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">COMMUNITY</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARD</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">NOTIFICATION</a></div>                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">Username#123</span>
                        <img class="border-[2px] border-white w-[30px] h-auto rounded-full" src="../assets/img/avatar/avatar.jpg" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">SIGN OUT</a></div>
                    </div>
                </details>
            </nav>
            <section class="flex flex-col items-center justify-center pt-[50px]">
                <div class="w-[1200px]">
                    <div class="flex items-center justify-start w-full pb-[20px]">
                        <input v-model="Search" placeholder="Search student..." class="p-[10px] bg-black/40 border-[1px] border-white w-[500px]"/>
                    </div>
                    <div class="flex items-center justify-center w-full">
                        <table class="border-gray bg-black/30 w-full border-[1px] text-white">
                            <tbody class="flex flex-col remove-scroll overflow-y-scroll h-[500px]">
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-full text-[15px] mx-[150px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">
                                         <a class="hover:text-gold" v-on:click="activePopUpMenu('true')" href="#"><i class="fa-solid fa-eye mr-[5px]"> </i>  Show Proof </a></td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-right">July 7</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>    
            </section>
            
            <footer class="w-full flex items-center justify-center text-white text-[12px] py-[10px]">
                <span>©Ascension from CCS • Ateneo de Naga University</span>
            </footer>
        </main>
    </body>
</template>

<script>
    import Parse from 'parse';
    import '/src/assets/css/tailwind.css';

    export default {
        data(){
            return{
                isClicked: false,
                buttonType: '',
                showPopUpMenu: false,
                showItem: '',
            }
        },

        methods: {
            hasClicked: function (bool, type) {
                this.isClicked = bool,
                this.buttonType = type
            },
            activePopUpTab: function (popUpTabName) {
                this.openPopUpTab = popUpTabName
            },
            activePopUpMenu: function (show) {
                this.showPopUpMenu = show
            },
        }

    }
</script>