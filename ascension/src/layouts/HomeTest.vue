<template>
    <head>
        <title>Ascension</title>
    </head>

    <h2>Welcome to Ascension</h2>
    <button @click="signIn()">Sign Up </button><br>
    <button @click="logInTeacher()">Log In (Teacher)</button><br>
    <button @click="logInStudent()">Log In (Student)</button><br>
    <button @click="admin()"> Admin</button><br>

    <hr>
    <p>This changes to logout upon signing in / sign in when logged out</p>
    <button v-if="!loggedIn" @click="signInWithGoogle()">Sign in with Google</button><br>
    <button v-if="loggedIn" @click="logOut()">Log out</button><br>

</template>
<script>
    import Parse from 'parse';
    export default{
        data(){
            return{
                userType: '',
                loggedIn: false,
            }
        },
        components:{
           
        },
        beforeMount(){
            var currentUser = Parse.User.current();
            if (currentUser) {
                this.loggedIn = true;
            }
            else{
                this.loggedIn = false;
            }
        },
        methods:{
            async signIn(){
                let host = window.location.host
                window.location.href ='http://' + host + '/AccountCreation';
            },

            async admin(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/AdminPage';
            },
            async logInTeacher(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/TeacherTest';
            },
            async logInStudent(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/StudentTest';
            },
            async signInWithGoogle(){
                window.location.href = await Parse.Cloud.run("GoogleSignIn");
            },
            async logOut(){
                await Parse.User.logOut();
                this.$router.go(0); //refresh the page
            }
        }
    }
</script>