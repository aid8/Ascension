<!-- TO APPLY: 
<template>
    <head>
        <title>Ascension</title>
    </head>

    <header class="mt-16">
        <Navbar/>
    </header>

    <body></body>
</template>

    <script>
        import Navbar from '../components/StudentNavbar';

        export default{
            components: {
                Navbar
            }
        }
    </script>

-->


<template>
    <nav class="flex flex-wrap static items-center justify-between top-0 fixed px-4 bg-black/20 backdrop-blur-sm shadow-lg text-white font-default w-screen z-50 py-4 lg:py-0">
        <div class="md:ml-5 w-32 cursor-pointer">
            <a href="../StudentProfile">
                <img src="../assets/img/logo/text-logo-default.png"/>
            </a>
        </div>

        <div class="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto py-4 pr-4 lg:py-0" id="navigation">
            <ul class="lg:inline-flex lg:flex-grow lg:justify-center z-50">
                <li class="menu-item"><a href="/StudentProfile">PROFILE</a></li>
                <li class="menu-item"><a href="/StudentQuestDaily">QUEST</a></li>
                <li class="menu-item"><a href="/StudentLeaderboard">LEADERBOARD</a></li>
                <li class="menu-item"><a href="#">NOTIFICATION</a></li>
            </ul>
        </div>

        <div class="lg:mr-4 ml-auto">
            <Dropdown class="mr-16 z-50 bg-blue" title="Username" :items="services"/>
        </div>

        <button class="text-3xl cursor-pointer mx-2 lg:hidden block hover:bg-black/50 px-2 py-1 rounded nav-toggler" data-target="#navigation">
            <i class="material-icons">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </i>
        </button>

    </nav>
</template>

<script>
import Dropdown from './Dropdown';
import './style.css';

export default {
    name: 'StudentNavbar',
    components: {
        Dropdown
    },
    data () {
        return {
            services: [
                {
                    title: 'Account Settings',
                    link: '/StudentAccountSettings'
                },
                {
                    title: 'Sign Out',
                    link: '/'
                },
            ]
        }
    },
    methods:{
        async StudentAccountSettings(){
            let host = window.location.host
            window.location.href ='http://' + host + '/AccountSettings';
        },
        async Home(){
            let host = window.location.host
            window.location.href ='http://' + host + '/';
        },
    }
}

</script>