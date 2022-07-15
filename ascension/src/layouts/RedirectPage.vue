<script>
    import Parse from 'parse';
    export default{
        async beforeMount(){
            var url = window.location;
            var code = new URLSearchParams(url.search).get('code');
            var params = {"code" : code};
            const authData = await Parse.Cloud.run("GoogleToken", params);
            const user = new Parse.User();
            user.set("username", authData.name);
            user.set("email", authData.email);
            var names = authData.name.split(' ');
            user.set("firstname", names[0]);
            user.set("lastname", names[names.length - 1]);
            await user.linkWith("google", { authData }).then(async (_obj)=>{
                await Parse.User.logInWith('google', { authData });
                let host = window.location.host;
                window.location.href ='http://' + host + '/AccountCreation';
            });   
        }
    }
</script>