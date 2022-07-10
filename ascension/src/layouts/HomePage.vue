<template>
    <head>
        <title>Ascension</title>
    </head>

    <h2>Welcome to Ascension</h2>
    <button @click="signIn()">Sign Up </button><br>
    <button @click="logInTeacher()">Log In (Teacher)</button><br>
    <button @click="logInStudent()">Log In (Student)</button><br>
    <button @click="logOut()">Log out</button><br>
    <button @click="admin()"> Admin</button><br>

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
            },
            async logInTeacher(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/TeacherTest';
            },
            async logInStudent(){
                let host = window.location.host;
                window.location.href ='http://' + host + '/StudentTest';
            }
        }
    }
</script>