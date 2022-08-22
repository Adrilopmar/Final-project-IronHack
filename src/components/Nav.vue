<template>
    <div class="bg-nav flex justify-between">
        <div class="img-logo">
        <img src="/src/assets/images/p't-full-logo.png" alt="">
        </div>
        <button @click="signOut">Log out</button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {useUserStore} from '../stores/user'
import { useRouter } from "vue-router";

const redirect = useRouter();
const userStore= useUserStore()
const signOut = (()=>{
    userStore.logOut()
    redirect.push({path: '/auth/login'})
})
const conse = ()=>{
    console.log(user)
    console.log(logged)
}

//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.

</script>

<style scoped>
.bg-nav{
    background: #f8f8f8;
    padding: 1.5rem 3rem;
}
.img-logo{
    width: 310px;
}
img{
    height: 40px;
}
button{
    border-radius: 7px;
    padding: 7px 15px;
    background:#d3d7dc ;
}
button:hover{
    background: #f941448e;
    transition: .5s;
}
</style>
