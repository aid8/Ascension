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
        <title>Profile Page</title>
    </head>
    <body>
        <div class="absolute h-[100vh] w-[100vw]">
            <div class="absolute shadow-profile h-[100vh] w-[100vw]">
            </div>
            <img class="h-[100vh] w-[100vw]" src="../assets/img/background/bg-profile-2.jpg" />
        </div>
        <main class="min-w-[1000px]">
            <!--pop up tab-->
            <div class="absolute flex items-center justify-center w-[100vw] h-[100vh] min-w-[1000px] min-h-[500px] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'hidden': showPopUpMenu === false, 'flex': showPopUpMenu === true}">
                <div class="relative flex flex-col justify-center items-center h-[500px] w-[1000px] bg-black/20 border-[1px] border-gray">
                    <!--header navigation bar-->
                    <div class="absolute py-[10px] flex flex-row gap-3 top-0 left-[10px] z-20">
                        <a class="text-white hover:text-gold text-[13px]" v-on:click="activePopUpMenu(false)" href="#"><i class="fa-solid fa-angle-left"></i></a>
                        <span class="text-white text-[13px]">EDIT PROFILE</span>
                    </div>
                    <div class="absolute py-[10px] flex top-0 right-[10px] z-20">
                        <a class="text-white hover:text-gold text-[13px]" href="#"><i class="fa-solid fa-floppy-disk"></i> SAVE</a>
                    </div>

                    <div class="relative flex flex-row gap-5 justify-center items-center h-full w-full z-10">
                        <!--side navigation bar-->
                        <nav class="flex flex-col items-start justify-start border-r-[1px] border-gray w-[15%] h-[80%]">
                            <div class="text-right text-[13px] w-full text-white p-[10px] hover:text-gold" v-on:click="activePopUpTab('avatars')" v-bind:class="{'border-r-[3px] border-gold/0': openPopUpTab !== 'avatars', 'border-r-[3px] border-gold text-gold': openPopUpTab === 'avatars'}"><a href="#">AVATARS</a></div>
                            <div class="text-right text-[13px] w-full text-white p-[10px] hover:text-gold" v-on:click="activePopUpTab('frames')" v-bind:class="{'border-r-[3px] border-gold/0': openPopUpTab !== 'frames', 'border-r-[3px] border-gold text-gold': openPopUpTab === 'frames'}"><a href="#">FRAMES</a></div>
                            <div class="text-right text-[13px] w-full text-white p-[10px] hover:text-gold" v-on:click="activePopUpTab('backgrounds')" v-bind:class="{'border-r-[3px] border-gold/0': openPopUpTab !== 'backgrounds', 'border-r-[3px] border-gold text-gold': openPopUpTab === 'backgrounds'}"><a href="#">BACKGROUNDS</a></div>
                            <div class="text-right text-[13px] w-full text-white p-[10px] hover:text-gold" v-on:click="activePopUpTab('t3trophies')" v-bind:class="{'border-r-[3px] border-gold/0': openPopUpTab !== 't3trophies', 'border-r-[3px] border-gold text-gold': openPopUpTab === 't3trophies'}"><a href="#">TOP 3 TROPHIES</a></div>
                        </nav>
                        <!--inventory-->
                        <div class="block h-[80%] w-[48%] border-[1px] border-gray bg-black/20 text-center p-[10px] remove-scroll overflow-y-scroll">
                            <!--avatar inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 'avatars', 'block': openPopUpTab === 'avatars'}">
                                <div class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img class="w-auto h-auto" src="../assets/img/avatar/avatar.jpg" /></div>
                            </div>
                            <!--frame inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 'frames', 'block': openPopUpTab === 'frames'}">
                                <div class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img class="w-auto h-auto" src="../assets/img/frames/frame_sample.png" /></div>
                            </div>
                            <!--background inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 'backgrounds', 'block': openPopUpTab === 'backgrounds'}">
                                <div class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img class="w-auto h-auto" src="../assets/img/background/bg-profile.jpg" /></div>
                            </div>
                            <!--t3trophies inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 't3trophies', 'block': openPopUpTab === 't3trophies'}">
                                <div class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img class="w-auto h-auto" src="../assets/img/trophies/trophy_1.png" /></div>
                            </div>
                        </div>
                        <!--selected-->
                        <div class="flex items-center justify-center h-[80%] w-[25%]">
                            <!--selected avatar-->
                            <div class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'avatars', 'inline-flex': openPopUpTab === 'avatars'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" src="../assets/img/avatar/avatar.jpg" />
                                </div>
                                <button class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Date Acquision</span>
                                    <p class="text-white text-[12px]">July 22, 2022</p>
                                </div>
                            </div>
                            <!--selected frames-->
                            <div class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'frames', 'inline-flex': openPopUpTab === 'frames'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" src="../assets/img/frames/frame_sample.png" />
                                </div>
                                <button class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Date Acquision</span>
                                    <p class="text-white text-[12px]">July 22, 2022</p>
                                </div>
                            </div>
                            <!--selected background-->
                            <div class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'backgrounds', 'inline-flex': openPopUpTab === 'backgrounds'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" src="../assets/img/background/bg-profile.jpg" />
                                </div>
                                <button class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Date Acquision</span>
                                    <p class="text-white text-[12px]">July 22, 2022</p>
                                </div>
                            </div>
                            <!--selected t3trophies-->
                            <div class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 't3trophies', 'inline-flex': openPopUpTab === 't3trophies'}">
                                <div class="flex flex-row gap-3 items-center justify-center">
                                    <div class="flex flex-row gap-3 items-center justify-center">
                                        <div class="flex flex-col items-center justify-center gap-2">
                                            <div class="flex items-center justify-center bg-black/20 h-[65px] w-[65px] border-[1px] border-gray">
                                                <a href="#"><img class="h-auto w-auto" src="../assets/img/trophies/trophy_1.png" /></a>
                                            </div>
                                            <span class="text-white text-[13px]">T1</span>
                                        </div>
                                        <div class="flex flex-col items-center justify-center gap-2">
                                            <div class="flex items-center justify-center bg-black/20 h-[65px] w-[65px] border-[1px] border-gray">
                                                <a href="#"><img class="h-auto w-auto" src="../assets/img/trophies/trophy_1.png" /></a>
                                            </div>
                                            <span class="text-white text-[13px]">T2</span>
                                        </div>
                                        <div class="flex flex-col items-center justify-center gap-2">
                                            <div class="flex items-center justify-center bg-black/20 h-[65px] w-[65px] border-[1px] border-gray">
                                                <a href="#"><img class="h-auto w-auto" src="../assets/img/trophies/trophy_1.png" /></a>
                                            </div>
                                            <span class="text-white text-[13px]">T3</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Date Acquision</span>
                                    <p class="text-white text-[12px]">July 22, 2022</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--header navigation bar-->
            <nav class="sticky top-0 w-full border-b-[1px] border-b-gray bg-black/20 flex flex-row items-center justify-center z-10">
                <a class="absolute left-[10px]" href="/StudentHomePage"><img class="w-[150px] h-auto" src="../assets/img/logo/text-logo-default.png" /></a>
                <div class="flex items-center justify-center w-[150px] h-[50px] border-b-[1px] border-gold"><a class="text-gold text-[13px] hover:text-gold" href="#">PROFILE</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">QUEST</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">LEADERBOARDS</a></div>
                <div class="flex items-center justify-center w-[150px] h-[50px]"><a class="text-white text-[13px] hover:text-gold" href="#">NOTIFICATION</a></div>
                <details class="absolute top-[10px] right-[10px] w-[170px]">
                    <summary class="flex items-center gap-[10px] justify-end cursor-pointer">
                        <span class="text-white text-[12px]">{{StudentData.UserName}}</span>
                        <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-[2px] border-white w-[30px] h-auto rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" alt="Avatar" />
                    </summary>
                    <div class="bg-black/20 border-[1px] mt-[15px] border-gray">
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><a class="text-white text-[12px] hover:text-gold" href="">ACCOUNT SETTINGS</a></div>
                        <div class="flex items-center justify-end w-full py-[5px] px-[10px]"><button @click="logOut()" class="text-white text-[12px] hover:text-gold">SIGN OUT</button></div>
                    </div>
                </details>
            </nav>
            <!--profile tab-->
            <nav class="absolute flex flex-row items-center justify-start text-[12px] left-0 gap-5 py-[10px] px-[20px] z-10">
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('summary')" v-bind:class="{'text-gold': openTab === 'summary'}" href="#">SUMMARY</a>
                <a class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('collection')" v-bind:class="{'text-gold': openTab === 'collection'}" href="#">COLLECTION</a>
            </nav>
            <!--summary-->
            <div class="absolute top-0 min-w-[1000px] w-[100%] h-[100%] z-0" v-bind:class="{'hidden': openTab !== 'summary', 'flex': openTab === 'summary'}">
                <div class="relative flex flex-col items-start justify-start gap-3 mx-[auto] w-[1366px] pt-[50px] px-[50px]">
                    <div class="flex flex-row min-w-[700px] min-h-[100px] w-full h-[90vh]">
                        
                        <div class="flex flex-row items-start gap-10 w-full pb-[25px] pt-[50px]">
                            <!--profile info-->
                            <div class="flex flex-row items-end gap-5 h-full overflow-y-scroll remove-scroll">
                                <div class="relative flex items-center justify-center">
                                    <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="border-white w-[125px] h-[auto] rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[0].CosmeticImage" alt="Avatar" />
                                    <img class="absolute inset-0 m-auto border-white w-[125px] h-[auto] rounded-full" src="../assets/img/frames/frame_sample.png" />
                                </div>
                                <div class="flex flex-col items-start justify-center">
                                    <span class="text-gold text-[20px]">{{StudentData.UserName}}</span>
                                    <span class="text-white text-[15px]">{{StudentData.FirstName}} {{StudentData.MiddleName}} {{StudentData.LastName}}</span>
                                    <span class="text-white text-[11px]">Official Knight of the Round Order (900/1020)</span>
                                    <progress class="bg-gray text-gold w-[250px] h-[5px]" value="900" max="1020"></progress>
                                    <div class="flex flex-row gap-5 mt-[10px]">
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Total trophies">
                                            <span v-if="StudentData.TrophiesIDUnlocked !== undefined" class="text-[12px]">{{StudentData.TrophiesIDUnlocked.length}}</span>
                                            <i class="fa-solid fa-trophy"></i>
                                        </div>
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Total badges">
                                            <span v-if="StudentData.BadgesIDEarned !== undefined" class="text-[12px]">{{StudentData.BadgesIDEarned.length}}</span>
                                            <i class="fa-solid fa-shield-halved"></i>
                                        </div>
                                        <div class="text-gold flex flex-col items-center justify-center gap-1 cursor-default" title="Leaderboard placement">
                                            <span class="text-[12px]">10</span>
                                            <i class="fa-solid fa-chart-simple"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--other profile info-->
                            <div class="flex flex-row gap-5 items-end justify-center min-w-[500px] w-auto h-full overflow-hidden">
                                <div class="flex flex-col items-center justify-center">
                                    <div class="flex flex-row gap-3 items-center justify-center">
                                        <template v-for="trophy in this.StudentData.StudentChosenTrophies" :key="trophy">
                                            <img v-if="trophy !== null" class="w-[60px] h-auto" v-bind:title="trophy.TrophyName" loading="lazy"  v-bind:alt="trophy.TrophyName" v-bind:src="trophy.TrophyImage" />
                                        </template>
                                    </div>
                                    <span class="block border-gray border-b-[1px] my-[5px] mx-[auto] leading-[0.1px] w-full"></span> <!--separator-->
                                    <div class="flex flex-row gap-2 items-center justify-center">
                                        <template v-for="badge in this.StudentData.StudentAcquiredBadges" :key="badge">
                                            <img v-if="badge !== null" class="w-[50px] h-auto" v-bind:title="badge.BadgeName" loading="lazy" v-bind:alt="badge.BadgeName" v-bind:src="badge.BadgeImage" />
                                        </template>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <!--banner-->
                        <div class="w-[27%] h-full overflow-hidden flex items-start justify-center">
                            <img v-if="StudentData.StudentHouse !== undefined" class="w-auto h-auto" v-bind:src="StudentData.StudentHouse.HouseBanner" alt="House Banner" />
                        </div>

                        <div class="absolute flex flex-row items-center justify-start text-[12px] right-[23%] gap-5 py-[10px] px-[20px]">
                            <a class="text-white hover:text-gold" v-on:click="activePopUpMenu('true')" href="#"><i class="fa-solid fa-pen-to-square"></i> EDIT PROFILE</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--collection (DONE)-->
            <div class="absolute top-0 min-w-[1000px] w-[100%] h-[100%] z-0" v-bind:class="{'hidden': openTab !== 'collection', 'flex': openTab === 'collection'}">
                <div class="relative flex flex-col items-start justify-start gap-3 mx-[auto] w-[1366px]">
                    <div class="flex flex-row pt-[120px] pb-[80px] w-full h-[100%]">
                        <nav class="flex flex-col items-end justify-start w-[250px] border-r-[1px] border-gray">
                            <div class="py-[15px] px-[20px] text-[13px]" v-bind:class="{'border-r-[3px] border-gold text-gold': openCollectionTab === 'avatars', 'border-r-[3px] border-black/0 text-white': openCollectionTab !== 'avatars'}"><a href="#" v-on:click="activeCollectionTab('avatars')">AVATARS</a></div>
                            <div class="py-[15px] px-[20px] text-[13px]" v-bind:class="{'border-r-[3px] border-gold text-gold': openCollectionTab === 'frames', 'border-r-[3px] border-black/0 text-white': openCollectionTab !== 'frames'}"><a href="#" v-on:click="activeCollectionTab('frames')">FRAMES</a></div>
                            <div class="py-[15px] px-[20px] text-[13px]" v-bind:class="{'border-r-[3px] border-gold text-gold': openCollectionTab === 'backgrounds', 'border-r-[3px] border-black/0 text-white': openCollectionTab !== 'backgrounds'}"><a href="#" v-on:click="activeCollectionTab('backgrounds')">BACKGROUND</a></div>
                            <div class="py-[15px] px-[20px] text-[13px]" v-bind:class="{'border-r-[3px] border-gold text-gold': openCollectionTab === 'trophies', 'border-r-[3px] border-black/0 text-white': openCollectionTab !== 'trophies'}"><a href="#" v-on:click="activeCollectionTab('trophies')">TROPHIES</a></div>
                            <div class="py-[15px] px-[20px] text-[13px]" v-bind:class="{'border-r-[3px] border-gold text-gold': openCollectionTab === 'badges', 'border-r-[3px] border-black/0 text-white': openCollectionTab !== 'badges'}"><a href="#" v-on:click="activeCollectionTab('badges')">BADGES</a></div>
                        </nav>

                        
                        <!--avatars tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'avatars', 'flex': openCollectionTab === 'avatars'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('unlockedAvatar')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'unlockedAvatar'}">
                                        <img class="h-[auto] w-[auto]" src="../assets/img/avatar/avatar.jpg" />
                                    </div>
                                    <div class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('lockedAvatar')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'lockedAvatar'}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" src="../assets/img/avatar/avatar.jpg" />
                                        <span class="absolute text-[30px] text-white"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                            <!--selected item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'unlockedAvatar', 'flex': showItem === 'unlockedAvatar'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto" src="../assets/img/avatar/avatar.jpg" />
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">July 22, 2022</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">Badge Type Name</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">Description description  description  description description description description</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedAvatar', 'flex': showItem === 'lockedAvatar'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" src="../assets/img/avatar/avatar.jpg" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--frames tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'frames', 'flex': openCollectionTab === 'frames'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('unlockedFrames')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'unlockedFrames'}">
                                        <img class="h-[auto] w-[auto]" src="../assets/img/frames/frame_sample.png" />
                                    </div>
                                    <div class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('lockedFrames')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'lockedFrames'}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" src="../assets/img/frames/frame_sample.png" />
                                        <span class="absolute text-[30px] text-white"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                            <!--selected item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'unlockedFrames', 'flex': showItem === 'unlockedFrames'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto" src="../assets/img/frames/frame_sample.png" />
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">July 22, 2022</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">Badge Type Name</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">Description description  description  description description description description</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedFrames', 'flex': showItem === 'lockedFrames'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" src="../assets/img/frames/frame_sample.png" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--backgrounds tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'backgrounds', 'flex': openCollectionTab === 'backgrounds'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('unlockedBackground')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'unlockedBackground'}">
                                        <img class="h-[auto] w-[auto]" src="../assets/img/background/bg-profile.jpg" />
                                    </div>
                                    <div class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('lockedBackground')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'lockedBackground'}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" src="../assets/img/background/bg-profile.jpg" />
                                        <span class="absolute text-[30px] text-white"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                            <!--selected item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'unlockedBackground', 'flex': showItem === 'unlockedBackground'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto" src="../assets/img/background/bg-profile.jpg" />
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">July 22, 2022</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">Badge Type Name</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">Description description  description  description description description description</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedBackground', 'flex': showItem === 'lockedBackground'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" src="../assets/img/background/bg-profile.jpg" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--trophies tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'trophies', 'flex': openCollectionTab === 'trophies'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('unlockedTrophy')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'unlockedTrophy'}">
                                        <img class="h-[auto] w-[auto]" src="../assets/img/trophies/trophy_1.png" />
                                    </div>
                                    <div class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('lockedTrophy')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'lockedTrophy'}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" src="../assets/img/trophies/trophy_1.png" />
                                        <span class="absolute text-[30px] text-white"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                            <!--selected item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'unlockedTrophy', 'flex': showItem === 'unlockedTrophy'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto" src="../assets/img/trophies/trophy_1.png" />
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">July 22, 2022</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">Badge Type Name</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">Description description  description  description description description description</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedTrophy', 'flex': showItem === 'lockedTrophy'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" src="../assets/img/trophies/trophy_1.png" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--badges tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'badges', 'flex': openCollectionTab === 'badges'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('unlockedBadges')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'unlockedBadges'}">
                                        <img class="h-[auto] w-[auto]" src="../assets/img/badges/badge_1.png" />
                                    </div>
                                    <div class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="activeItem('lockedBadges')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': showItem === 'lockedBadges'}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" src="../assets/img/badges/badge_2.png" />
                                        <span class="absolute text-[30px] text-white"><i class="fa-solid fa-lock"></i></span>
                                    </div>
                                </div>
                            </div>
                            <!--selected item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'unlockedBadges', 'flex': showItem === 'unlockedBadges'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto" src="../assets/img/badges/badge_1.png" />
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">July 22, 2022</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">Badge Type Name</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">Description description  description  description description description description</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedBadges', 'flex': showItem === 'lockedBadges'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" src="../assets/img/badges/badge_2.png" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">Item Name</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <button class="bg-blue text-white text-[13px] w-full py-[10px]">REQUEST THIS BADGE</button>
                                    </div>
                                </div>
                            </div>
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
                //FRONTEND VARIABLES
                openTab: 'summary', //summary, collection
                openCollectionTab: 'avatars', //avatars, backgrounds, trophies, badges
                openPopUpTab: 'avatars', //avatars, frames, backgrounds, t3trophies
                showPopUpMenu: false,
                showItem: '',

                //BACKEND VARIABLES
                currentUser: Parse.User.current(),
                host:  window.location.host,

                StudentData: [],
            }
        },

        methods: {
            //===========FRONTEND FUNCTIONS===============
            activeTab: function (tabName) {
                this.openTab = tabName
            },
            activeCollectionTab: function (collectionTabName) {
                this.openCollectionTab = collectionTabName
            },
            activePopUpTab: function (popUpTabName) {
                this.openPopUpTab = popUpTabName
            },
            activePopUpMenu: function (show) {
                this.showPopUpMenu = show
            },
            activeItem: function (item) {
                this.showItem = item
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

                //Copied this since it will be edited
                this.StudentData["StudentChosenTrophies"] = this.StudentData.ChosenTrophiesData;
                this.StudentData["StudentAcquiredBadges"] = this.StudentData.BadgesEarned;

                //Fix Chosen Trophies
                for(let i = 0; i < 3; ++i){
                    if(!this.StudentData.StudentChosenTrophies[i]){
                        this.StudentData.StudentChosenTrophies[i] = null;
                    }
                }

                //Fix Acquired Badges
                this.StudentData.StudentAcquiredBadges.slice(0, 5);
                for(let i = 0; i < 5; ++i){
                    if(!this.StudentData.StudentAcquiredBadges[i]){
                        this.StudentData.StudentAcquiredBadges[i] = null;
                    }
                }

                //Sort data by date rewarded(not sure if comparison is correct)
                this.StudentData.StudentAcquiredBadges.sort(function(first, second) {
                    if(first == null || second == null) return false;
                    return first.DateRewarded > second.DateRewarded;
                });
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