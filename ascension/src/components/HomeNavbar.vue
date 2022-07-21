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
        import Navbar from '../components/Navbar';

        export default{
            components: {
                Navbar
            }
        }
    </script>

-->


<template>
    <nav class="flex static fixed justify-center items-center top-0 px-4 bg-black/20 backdrop-blur-sm shadow-lg text-white font-default w-full z-50">
        <div class="w-32 h-16 cursor-pointer flex items-center">
            <a href="/">
                <img src="../assets/img/logo/text-logo-default.png"/>
            </a>
        </div>

        <div class="ml-auto">
            <button class="hover:text-gold hover:decoration-gold underline decoration-white decoration-2 underline-offset-4" @click="SignIn()">Sign In</button>
        </div>

    </nav>
</template>


<script>
import './style.css';

export default {
    name: 'HomeNavbar',
    data () {
        return {
        }
    },
    methods:{
        async SignIn(){
            let host = window.location.host
            window.location.href ='http://' + host + '/SignIn';
        },
        async Home(){
            let host = window.location.host
            window.location.href ='http://' + host + '/';
        },
    }
}

</script>