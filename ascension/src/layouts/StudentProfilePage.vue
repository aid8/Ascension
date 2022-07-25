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
            <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="h-[100vh] w-[100vw]" v-bind:src="StudentData.EquippedCosmeticsData[2].CosmeticImage" />
        </div>
        <main class="min-w-[1000px]">
            <!--pop up tab-->
            <div class="absolute flex items-center justify-center w-[100vw] h-[100vh] min-w-[1000px] min-h-[500px] bg-black/20 backdrop-blur-[20px] z-50" v-bind:class="{'hidden': showPopUpMenu === false, 'flex': showPopUpMenu === true}">
                <div class="relative flex flex-col justify-center items-center h-[500px] w-[1000px] bg-black/20 border-[1px] border-gray">
                    <!--header navigation bar-->
                    <div class="absolute py-[10px] flex flex-row gap-3 top-0 left-[10px] z-20">
                        <button @click="resetChanges()" class="text-white hover:text-gold text-[13px]" v-on:click="activePopUpMenu(false)" href="#"><i class="fa-solid fa-angle-left"></i></button>
                        <span class="text-white text-[13px]">EDIT PROFILE</span>
                    </div>
                    <div class="absolute py-[10px] flex top-0 right-[10px] z-20">
                        <button @click="saveChanges()" class="text-white hover:text-gold text-[13px]"><i class="fa-solid fa-floppy-disk"></i> SAVE</button>
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
                                <div v-for="avatar in StudentData.AvatarsUnlocked" :key="avatar" class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img @click="selectItem('Avatar', avatar)" class="w-auto h-auto" v-bind:src="avatar.CosmeticImage" /></div>
                            </div>
                            <!--frame inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 'frames', 'block': openPopUpTab === 'frames'}">
                                <div v-for="frame in StudentData.FrameUnlocked" :key="frame" class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img @click="selectItem('Frame', frame)" class="w-auto h-auto" v-bind:src="frame.CosmeticImage" /></div>
                            </div>
                            <!--background inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 'backgrounds', 'block': openPopUpTab === 'backgrounds'}">
                                <div v-for="coverPhoto in StudentData.CoverPhotoUnlocked" :key="coverPhoto" class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img @click="selectItem('CoverPhoto', coverPhoto)" class="w-auto h-auto" v-bind:src="coverPhoto.CosmeticImage" /></div>
                            </div>
                            <!--t3trophies inventory-->
                            <div class="text-left w-auto" v-bind:class="{'hidden': openPopUpTab !== 't3trophies', 'block': openPopUpTab === 't3trophies'}">
                                <div v-for="trophy in StudentData.TrophiesUnlocked" :key="trophy" class="inline-flex items-center justify-center h-[70px] w-[70px] m-[10px] border-[1px] border-gray"><img @click="selectItem('Trophy', trophy)" class="w-auto h-auto" v-bind:src="trophy.TrophyImage" /></div>
                            </div>
                        </div>
                        <!--selected-->
                        <div class="flex items-center justify-center h-[80%] w-[25%]">
                            <!--selected avatar-->
                            <div v-if="SelectedAvatarID !== ''" class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'avatars', 'inline-flex': openPopUpTab === 'avatars'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" v-bind:src="SelectedAvatarData.CosmeticImage" />
                                </div>
                                <button v-if="SelectedAvatarID !== EquippedCosmeticChange[0]" @click="changeItem('Avatar')" class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Avatar Name</span>
                                    <p class="text-white text-[12px]">{{SelectedAvatarData.CosmeticName}}</p>
                                </div>
                            </div>
                            <!--selected frames-->
                            <div v-if="SelectedFrameID !== ''" class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'frames', 'inline-flex': openPopUpTab === 'frames'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" v-bind:src="SelectedFrameData.CosmeticImage" />
                                </div>
                                <button v-if="SelectedFrameID !== EquippedCosmeticChange[1]" @click="changeItem('Frame')" class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Frame Name</span>
                                    <p class="text-white text-[12px]">{{SelectedFrameData.CosmeticName}}</p>
                                </div>
                            </div>
                            <!--selected background-->
                            <div v-if="SelectedCoverPhotoID !== ''" class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 'backgrounds', 'inline-flex': openPopUpTab === 'backgrounds'}">
                                <div class="flex items-center justify-center bg-black/20 h-[220px] w-[220px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" v-bind:src="SelectedCoverPhotoData.CosmeticImage" />
                                </div>
                                <button v-if="SelectedCoverPhotoID !== EquippedCosmeticChange[2]" @click="changeItem('CoverPhoto')" class="bg-blue text-white text-[10px] p-[10px] w-[220px]">CHANGE</button>
                                <div class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Background Name</span>
                                    <p class="text-white text-[12px]">{{SelectedCoverPhotoData.CosmeticName}}</p>
                                </div>
                            </div>
                            <!--selected t3trophies-->
                            <div class="flex flex-col gap-5 items-center justify-center h-full w-full"  v-bind:class="{'hidden': openPopUpTab !== 't3trophies', 'inline-flex': openPopUpTab === 't3trophies'}">
                                <div v-if="SelectedTrophyID !== ''"  class="flex items-center justify-center bg-black/20 h-[65px] w-[65px] border-[1px] border-gray">
                                    <img class="h-auto w-auto" v-bind:src="SelectedTrophyData.TrophyImage" />
                                </div>
                                <div v-if="SelectedTrophyID !== ''" class="flex flex-col w-[220px] text-center">
                                    <span class="text-gold text-[13px]">Date Acquisition</span>
                                    <p class="text-white text-[12px]">{{SelectedTrophyData.DateRewarded}}</p>
                                </div>
                                <div class="flex flex-row gap-3 items-center justify-center">
                                    <div class="flex flex-row gap-3 items-center justify-center">
                                        <div v-for="(trophy, i) in ChosenTrophiesDataChange" :key="trophy" class="flex flex-col items-center justify-center gap-2">
                                            <div class="flex items-center justify-center bg-black/20 h-[65px] w-[65px] border-[1px] border-gray">
                                                <button v-if="trophy !== null"><img class="h-auto w-auto" v-bind:src="trophy.TrophyImage" /></button>
                                            </div>
                                            <span class="text-white text-[13px]">T{{i+1}}</span>
                                        </div>

                                    </div>
                                </div>
                                <select v-model="SelectedTrophySlot" class="border-[1px] border-gray bg-black/20 text-white text-[12px] h-[35px] w-[150px] px-[10px]">
                                    <option hidden value=-1>Select Slot</option>
                                    <option class="text-black" value=0>T1</option>
                                    <option class="text-black" value=1>T2</option>
                                    <option class="text-black" value=2>T3</option>
                                </select>
                                <button @click="changeItem('TrophyChange')" class="bg-blue text-white text-[10px] p-[10px] w-[110px]">CHANGE</button>
                                <button @click="changeItem('TrophyRemove')" class="bg-blue text-white text-[10px] p-[10px] w-[110px]">REMOVE</button>
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
                <a @click="resetChanges()" class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('summary')" v-bind:class="{'text-gold': openTab === 'summary'}" href="#">SUMMARY</a>
                <a @click="resetChanges()" class="text-white text-[12px] hover:text-gold" v-on:click="activeTab('collection')" v-bind:class="{'text-gold': openTab === 'collection'}" href="#">COLLECTION</a>
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
                                    <img v-if="StudentData.EquippedCosmeticsData !== undefined" class="absolute inset-0 m-auto border-white w-[125px] h-[auto] rounded-full" v-bind:src="StudentData.EquippedCosmeticsData[1].CosmeticImage" />
                                </div>
                                <div class="flex flex-col items-start justify-center">
                                    <span class="text-gold text-[20px]">{{StudentData.UserName}}</span>
                                    <span class="text-white text-[15px]">{{StudentData.FirstName}} {{StudentData.MiddleName}} {{StudentData.LastName}}</span>
                                    <span class="text-white text-[11px]">{{StudentData.AscensionTitle}} ({{StudentData.XP}}/{{AscensionTitleData.AscensionXpRangeCap}})</span>
                                    <progress class="bg-gray text-gold w-[250px] h-[5px]" v-bind:value="StudentData.XP" v-bind:max="AscensionTitleData.AscensionXpRangeCap"></progress>
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
                                        <template v-for="trophy in this.StudentData.ChosenTrophiesData" :key="trophy">
                                            <img v-if="trophy !== null" class="w-[60px] h-auto" v-bind:title="trophy.TrophyName" loading="lazy"  v-bind:alt="trophy.TrophyName" v-bind:src="trophy.TrophyImage" />
                                        </template>
                                    </div>
                                    <span class="block border-gray border-b-[1px] my-[5px] mx-[auto] leading-[0.1px] w-full"></span> <!--separator-->
                                    <div class="flex flex-row gap-2 items-center justify-center">
                                        <template v-for="(badge, i) in this.StudentData.BadgesEarned" :key="badge">
                                            <img v-if="badge !== null && i < 3" class="w-[50px] h-auto" v-bind:title="badge.BadgeName" loading="lazy" v-bind:alt="badge.BadgeName" v-bind:src="badge.BadgeImage" />
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
                                    <div v-for="avatar in StudentData.AvatarsUnlocked" :key="avatar" class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Avatar', avatar); activeItem('unlockedAvatar')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': avatar.objectId === SelectedAvatarID}">
                                        <img class="h-[auto] w-[auto]" v-bind:src="avatar.CosmeticImage" />
                                    </div>
                                    <div v-for="avatar in StudentData.UnacquiredAvatars" :key="avatar" class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Avatar', avatar); activeItem('lockedAvatar')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': avatar.objectId === SelectedAvatarID}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" v-bind:src="avatar.CosmeticImage" />
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
                                            <img class="w-auto h-auto" v-bind:src="SelectedAvatarData.CosmeticImage" />
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedAvatarData.CosmeticName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">{{SelectedAvatarData.CosmeticType}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedAvatar', 'flex': showItem === 'lockedAvatar'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" v-bind:src="SelectedAvatarData.CosmeticImage" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedAvatarData.CosmeticName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--frames tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'frames', 'flex': openCollectionTab === 'frames'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div v-for="frame in StudentData.FrameUnlocked" :key="frame" class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Frame', frame); activeItem('unlockedFrames')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': frame.objectId === SelectedFrameID}">
                                        <img class="h-[auto] w-[auto]" v-bind:src="frame.CosmeticImage" />
                                    </div>
                                    <div v-for="frame in StudentData.UnacquiredFrames" :key="frame" class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Frame', frame); activeItem('lockedFrames')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': frame.objectId === SelectedFrameID}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" v-bind:src="frame.CosmeticImage" />
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
                                            <img class="w-auto h-auto" v-bind:src="SelectedFrameData.CosmeticImage" />
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedFrameData.CosmeticName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">{{SelectedFrameData.CosmeticType}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedFrames', 'flex': showItem === 'lockedFrames'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" v-bind:src="SelectedFrameData.CosmeticImage" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedFrameData.CosmeticName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--backgrounds tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'backgrounds', 'flex': openCollectionTab === 'backgrounds'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div v-for="coverPhoto in StudentData.CoverPhotoUnlocked" :key="coverPhoto" class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('CoverPhoto', coverPhoto); activeItem('unlockedBackground')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': coverPhoto.objectId === SelectedCoverPhotoID}">
                                        <img class="h-[auto] w-[auto]" v-bind:src="coverPhoto.CosmeticImage" />
                                    </div>
                                    <div v-for="coverPhoto in StudentData.UnacquiredCoverPhotos" :key="coverPhoto" class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('CoverPhoto', coverPhoto); activeItem('lockedBackground')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': coverPhoto.objectId === SelectedCoverPhotoID}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" v-bind:src="coverPhoto.CosmeticImage" />
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
                                            <img class="w-auto h-auto" v-bind:src="SelectedCoverPhotoData.CosmeticImage" />
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedCoverPhotoData.CosmeticName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">{{SelectedCoverPhotoData.CosmeticType}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedBackground', 'flex': showItem === 'lockedBackground'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" v-bind:src="SelectedCoverPhotoData.CosmeticImage" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedCoverPhotoData.CosmeticName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--trophies tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'trophies', 'flex': openCollectionTab === 'trophies'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div v-for="trophy in StudentData.TrophiesUnlocked" :key="trophy" class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Trophy', trophy); activeItem('unlockedTrophy')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': trophy.objectId === SelectedTrophyID}">
                                        <img class="h-[auto] w-[auto]" v-bind:src="trophy.TrophyImage" />
                                    </div>
                                    <div v-for="trophy in StudentData.UnacquiredTrophies" :key="trophy" class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Trophy', trophy); activeItem('lockedTrophy')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': trophy.objectId === SelectedTrophyID}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" v-bind:src="trophy.TrophyImage" />
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
                                            <img class="w-auto h-auto" v-bind:src="SelectedTrophyData.TrophyImage" />
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedTrophyData.TrophyName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">{{SelectedTrophyData.DateRewarded}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">{{SelectedTrophyData.TrophyType}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">{{SelectedTrophyData.TrophyDescription}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Design Inspiration:</span>
                                        <p class="text-white text-[12px]">{{SelectedTrophyData.TrophyDesignInspiration}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedTrophy', 'flex': showItem === 'lockedTrophy'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" v-bind:src="SelectedTrophyData.TrophyImage" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedTrophyData.TrophyName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--badges tab-->
                        <div class="relative flex flex-row gap-5 w-full items-start justify-start px-[20px]" v-bind:class="{'hidden': openCollectionTab !== 'badges', 'flex': openCollectionTab === 'badges'}">
                            <!--item list-->
                            <div class="flex items-center justify-center bg-black/70 border-gray border-[1px] w-[68%] h-full remove-scroll overflow-y-scroll">
                                <div class="block w-full h-full p-[10px]">
                                    <div v-for="badge in StudentData.BadgesEarned" :key="badge" class="inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Badge', badge); activeItem('unlockedBadges')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': badge.objectId === SelectedBadgeID}">
                                        <img class="h-[auto] w-[auto]" v-bind:src="badge.BadgeImage" />
                                    </div>
                                    <div v-for="badge in StudentData.UnacquiredBadges" :key="badge" class="relative inline-flex items-center justify-center bg-black/30 border-[1px] border-gray m-[10px] w-[70px] h-[70px] cursor-pointer" v-on:click="selectItem('Badge', badge); activeItem('lockedBadges')" v-bind:class="{'outline outline-gold outline-4 border-[1px] border-gold/0': badge.objectId === SelectedBadgeID}">
                                        <img class="h-[auto] w-[auto] brightness-[0.30] grayscale" v-bind:src="badge.BadgeImage" />
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
                                            <img class="w-auto h-auto" v-bind:src="SelectedBadgeData.BadgeImage" />
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedBadgeData.BadgeName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <div class="w-full">
                                        <span class="text-gold text-[13px]">Date Acquisition:</span>
                                        <p class="text-white text-[12px]">{{SelectedBadgeData.DateRewarded}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Type:</span>
                                        <p class="text-white text-[12px]">{{SelectedBadgeData.BadgeType}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Description:</span>
                                        <p class="text-white text-[12px]">{{SelectedBadgeData.BadgeDescription}}</p>
                                    </div>
                                    <div class="w-full">
                                        <span class="text-gold text-[13px] h-full">Design Inspiration:</span>
                                        <p class="text-white text-[12px]">{{SelectedBadgeData.BadgeDesignInspiration}}</p>
                                    </div>
                                </div>
                            </div>
                            <!--selected lock item-->
                            <div class="flex items-start justify-center w-[25%] h-full" v-bind:class="{'hidden': showItem !== 'lockedBadges', 'flex': showItem === 'lockedBadges'}">
                                <div class="flex flex-col items-start justify-start gap-3 h-full remove-scroll overflow-y-scroll">
                                    <!--full image of selected item with item name-->
                                    <div class="float-right relative flex flex-col items-center justify-center gap-3 w-full">
                                        <div class="flex items-center justify-center border-black mx-auto w-auto h-auto">
                                            <img class="w-auto h-auto brightness-[0.30] grayscale" v-bind:src="SelectedBadgeData.BadgeImage" />
                                            <span class="absolute text-[70px] text-white"><i class="fa-solid fa-lock"></i></span>
                                        </div>
                                        <span class="text-white text-[18px]">{{SelectedBadgeData.BadgeName}}</span>
                                    </div>
                                    <!--other information of selected item-->
                                    <!--
                                    Request badge tab will be just uploading a proof
                                    <div class="w-full">
                                        <button class="bg-blue text-white text-[13px] w-full py-[10px]">REQUEST THIS BADGE</button>
                                    </div>
                                    -->
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
                AscensionTitleData : {},
                SelectedAvatarID: '',
                SelectedAvatarData: {},
                SelectedFrameID: '',
                SelectedFrameData: {},
                SelectedCoverPhotoID: '',
                SelectedCoverPhotoData: {},
                SelectedTrophyID: '',
                SelectedTrophyData: {},
                SelectedBadgeID: '',
                SelectedBadgeData: {},
                SelectedTrophySlot: -1,
                EquippedCosmeticChange: [],
                ChosenTrophiesDataChange: [],
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

                //Get unacquired cosmetics
                param["CosmeticType"] = "Avatar";
                this.StudentData["UnacquiredAvatars"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));
                param["CosmeticType"] = "Frame";
                this.StudentData["UnacquiredFrames"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));
                param["CosmeticType"] = "CoverPhoto";
                this.StudentData["UnacquiredCoverPhotos"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredCosmetics", param));

                //Get unacquired badges and trophies
                this.StudentData["UnacquiredBadges"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredBadges", param));
                this.StudentData["UnacquiredTrophies"] = JSON.parse(await Parse.Cloud.run("GetUnacquiredTrophies", param));

                //Sort badges by date rewarded(not sure if comparison is correct)
                this.StudentData.BadgesEarned.sort(function(first, second) {
                    if(first == null || second == null) return false;
                    return first.DateRewarded > second.DateRewarded;
                });

                //Set Necessary variables
                param = {"XpInput" : this.StudentData.XP};
                this.AscensionTitleData = JSON.parse(await Parse.Cloud.run("SearchAscensionTitleFromXp", param));
                this.EquippedCosmeticChange = this.StudentData.EquippedCosmetics.slice();
                this.ChosenTrophiesDataChange = this.StudentData.ChosenTrophiesData.slice();

                for(let i = this.ChosenTrophiesDataChange.length; i < 3; ++i){
                    this.ChosenTrophiesDataChange.push(null);
                }
            },

            selectItem(type, item){
                switch(type){
                    case "Avatar":
                        this.SelectedAvatarID = item.objectId;
                        this.SelectedAvatarData = item;
                        break;
                    case "Frame":
                        this.SelectedFrameID = item.objectId;
                        this.SelectedFrameData = item;
                        break;
                    case "CoverPhoto":
                        this.SelectedCoverPhotoID = item.objectId;
                        this.SelectedCoverPhotoData = item;
                        break;
                    case "Trophy":
                        this.SelectedTrophyID = item.objectId;
                        this.SelectedTrophyData = item;
                        break;
                    case "Badge":
                        this.SelectedBadgeID = item.objectId;
                        this.SelectedBadgeData = item;
                        break;
                    default:
                }
            },

            changeItem(type){
                switch(type){
                    case "Avatar":
                        this.EquippedCosmeticChange[0] = this.SelectedAvatarID;
                        break;
                    case "Frame":
                        this.EquippedCosmeticChange[1] = this.SelectedFrameID;
                        break;
                    case "CoverPhoto":
                        this.EquippedCosmeticChange[2] = this.SelectedCoverPhotoID;
                        break;
                    case "TrophyChange":
                        for(const trophy of this.ChosenTrophiesDataChange){
                            if(trophy === null) continue;
                            if(this.SelectedTrophyData.objectId === trophy.objectId){
                                return;
                            }
                        }
                        this.ChosenTrophiesDataChange[this.SelectedTrophySlot] = this.SelectedTrophyData;
                        break;
                    case "TrophyRemove":
                        this.ChosenTrophiesDataChange[this.SelectedTrophySlot] = null;
                        break
                    default:
                }
            },

            resetChanges(){
                this.SelectedAvatarID = "";
                this.SelectedAvatarData = {};
                this.SelectedFrameID = "";
                this.SelectedFrameData = {};
                this.SelectedCoverPhotoID = "";
                this.SelectedCoverPhotoData = {};
                this.SelectedTrophyID = "";
                this.SelectedTrophyData = {};
                this.SelectedBadgeID = "";
                this.SelectedBadgeData = {};
                this.SelectedTrophySlot = -1;
                this.EquippedCosmeticChange = this.StudentData.EquippedCosmetics.slice();
                this.ChosenTrophiesDataChange = this.StudentData.ChosenTrophiesData.slice();
                for(let i = this.ChosenTrophiesDataChange.length; i < 3; ++i){
                    this.ChosenTrophiesDataChange.push(null);
                }
            },

            async saveChanges(){
                //Fixed ChosenTrophies to make it an array of RewardID
                var ChosenTrophiesChange = [];
                for(const trophy of this.ChosenTrophiesDataChange){
                    if(trophy !== null){
                        ChosenTrophiesChange.push(trophy.RewardID);
                    }
                }

                var param = {
                    "StudentID" : Parse.User.current().get("AccountID"),
                    "EquippedCosmetics" : this.EquippedCosmeticChange, 
                    "ChosenTrophies" : ChosenTrophiesChange,
                }
                await Parse.Cloud.run("EditStudent", param);
                alert("Changes saved!");
                //refresh page
                this.$router.go(0); 
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