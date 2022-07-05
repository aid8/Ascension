<template>
    <head>
        <title>Ascension</title>
    </head>

    <h2>Welcome to Ascension</h2>
    <button @click="signIn()">Sign In </button>
    <button @click="logOut()">Log out</button>
    <button @click="admin()"> Admin</button>
</template>

<script>
    import Parse from 'parse';
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