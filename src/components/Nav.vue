<template>
  <div class="bg-nav hidden md:block w-full">
    <div class="flex w-full justify-between">
      <div class="img-logo ">
      <router-link to="/">
        <img
        v-if="mainLogo"
          src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-full-logo_km6wi2_wrsv6c.png"
          alt=""
        />
        <img v-else
        src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1664192001/todoApp/navbar/procrastinan_t-full-logo-white_cr9fyp.png" alt="">
      </router-link>
    </div>
    <div class="links-nav flex jusify-around w-3/5 mx-auto">
  <div class="flex w-2/3 justify-around mr-20">
      <router-link class="text-center m-auto py-1 px-5 link-nav different" to="/"> Home </router-link>
      <router-link class="text-center m-auto py-1 px-5 link-nav hover:transition" to="/profile"> Profile </router-link>
      <router-link class="text-center m-auto py-1 px-5 link-nav hover:transition" to="/archived"> archived </router-link>
  </div>
      <userTheme @theme="changeTheme"/>
    </div>
      <button v-wave="{ color: 'red' }" @click="signOut">Log out</button>
    </div>
  </div>
  <!-- mobile navbar -->
  <div class="bg-nav md:hidden">
    <div class="flex justify-between">
      <div class="img-logo-mobile ">
        <router-link to="/">
          <img
            src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-logo_eybmfq_eiuekm.png"
            alt=""
          />
        </router-link>
      </div>
     
      <div>
        <button v-wave="{ color: 'red' }" @click="signOut">Log out</button>
      </div>
      </div>
     <div class="flex w-full justify-between mt-5">
        <router-link class="text-center link-nav" to="/"> Home </router-link>
        <router-link class="text-center link-nav" to="/profile"> Profile </router-link>
        <router-link class="text-center link-nav" to="/archived"> archived </router-link>
        <userTheme @theme="changeTheme"/>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";
import userTheme from './userTheme.vue'

const redirect = useRouter();
const userStore = useUserStore();
const mainLogo = ref(true)
const signOut = () => {
  userStore.logOut();
  redirect.push({ path: "/auth/login" });
  userStore.fetchUser()
};
const changeTheme =()=> mainLogo.value= !mainLogo.value

//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style scoped>
.bg-nav {
  background: var(--white-bg-color);
  padding: 1.5rem 3rem;
  box-shadow: var(--box-shadow-back) 0px 25px 20px -20px;
}
.img-logo {
  min-width: 310px;
}
.img-logo-mobile {
  width: 83px;
}
img {
  height: 40px;
}
button {
  border-radius: 7px;
  padding: 7px 15px;
  background: var(--button-secondary);
}
button:hover {
  background: var(  --button-secondary-hover);
  transition: 0.5s;
  
}
.link-nav{
  border-bottom: 1px solid transparent;
  color: var(--main-txt-color);
}
.link-nav:hover{
  border-bottom: 1px solid var(--main-txt-color) ;
 
}
</style>
