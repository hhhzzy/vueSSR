<template>
    <div id="app">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-view />
        <p>hello world</p>
        <button @click="sayHello">say hello</button>
  	</div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>
<style>
#app {
    background-color: red;
}
</style>
