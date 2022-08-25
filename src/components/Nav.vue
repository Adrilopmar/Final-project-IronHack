<template>
  <div class="bg-nav flex justify-between hidden md:flex">
    <div class="img-logo">
      <router-link to="/">
        <img
          src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-full-logo_km6wi2_wrsv6c.png"
          alt=""
        />
      </router-link>
    </div>
    <router-link to="/"> Home </router-link>
    <router-link to="/profile"> Profile </router-link>
    <router-link to="/archived"> archived </router-link>
    <button v-wave="{ color: 'red' }" @click="signOut">Log out</button>
  </div>
  <!-- mobile navbar -->
  <div class="bg-nav md:hidden">
    <div class="flex justify-between">
      <div class="img-logo-mobile">
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
    <div class="flex justify-around mt-5">
        <router-link to="/"> Home </router-link>
        <router-link to="/profile"> Profile </router-link>
        <router-link to="/archived"> archived </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const redirect = useRouter();
const userStore = useUserStore();
const signOut = () => {
  userStore.logOut();
  redirect.push({ path: "/auth/login" });
};

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
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
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
  background: #f941448e;
  transition: 0.5s;
}
</style>
