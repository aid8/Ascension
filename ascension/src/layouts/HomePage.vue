<template>
    <head>
        <title>Ascension</title>
    </head>

    <h2>Welcome to Ascension</h2>
    <button @click="signIn()">Sign In </button>
    <button @click="logOut()">Log out</button>

    <GoogleLogin :callback="callback" prompt auto-login/>
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
                window.location.href ='http://localhost:8080/AccountCreation';
            },
        }
    }
</script>