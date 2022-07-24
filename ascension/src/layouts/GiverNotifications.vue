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

        <main class="relative justify-center min-w-[1000px] h-[100vh]">
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
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                                <tr class="flex flex-row py-[10px] border-b-[1px] border-gray">
                                    <td class="flex flex-row gap-3 px-[10px] items-center justify-center w-auto text-[15px] text-center">
                                        <button v-on:click="hasClicked(true,'approve')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}" class="bg-blue text-white py-[8px] w-[100px]">APPROVE</button>
                                        <button v-on:click="hasClicked(true,'deny')" v-bind:class="{'hidden':isClicked === true, 'block':isClicked === false}"  class="bg-blue text-white py-[8px] w-[100px]">DENY</button>    
                                        <span v-bind:class="{'hidden':buttonType !== 'approve', 'block' :  buttonType === 'approve'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">APPROVED</span>
                                        <span v-bind:class="{'hidden':buttonType !== 'deny', 'block' : buttonType === 'deny'}" class="w-[212px] text-[20px] py-[4px] align-middle text-white/20">DENIED</span>
                                    </td>
                                    <td class="flex flex-row items-center px-[10px] w-[350px] text-[15px] text-left">MyUsername#1234</td>
                                    <td class="flex flex-row items-center px-[10px] w-full  text-[15px] text-center">Requesting for Olympic Challenger Badge</td>
                                    <td class="flex flex-row items-center px-[10px] w-[100px]  text-[15px] text-right">July 7</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>    
            </section> 
            <footer class="w-full flex items-center justify-center text-white text-[12px] py-[20px]">
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
            }
        },

        methods: {
            hasClicked: function (bool, type) {
                this.isClicked = bool,
                this.buttonType = type
            },
        }

    }
</script>