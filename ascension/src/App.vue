<template>
 <!--
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/AccountCreation">Crete Account</router-link>
  </nav>
  -->
  <router-view/>
</template>

<script>
  import Parse from 'parse';
  import './assets/tailwind.css';
  Parse.serverURL = "http://localhost:1337/api";
  Parse.initialize("myAppId", "jspass");

  export default{
    components: {
      
    },
  };
</script>
