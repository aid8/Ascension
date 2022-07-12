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
            user.set("password", "123456"); //Change this lolz
            await user.linkWith("google", { authData }).then(async (obj)=>{
                console.log(obj);
                alert("Check console!");
                await Parse.User.logIn(authData.name, "123456") //lol
            });
            let host = window.location.host;
            window.location.href ='http://' + host + '/AccountCreation';
        }
    }
</script>