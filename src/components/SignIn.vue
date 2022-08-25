<template>
<navNotLogged @darkMode="$emit('darkMode')" class="mb-12"/>

<div class="sign-in-bg m-auto">
  <h3 class="text-4xl font-semibold mb-9">Sign In</h3>
  <p v-if="showError" class="text-xs text-center my-3 text-red-700">{{emailPassError}}</p>
  <form class="w-full max-w-sm">
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
        Email
      </label>
    </div>
    <div class="md:w-2/3"> 
      <input v-model="email" @focus="hideError"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500" id="inline-full-name" type="text" placeholder="example@mail.com">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="password" @focus="hideError"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-password" type="password" placeholder="******************">
    </div>
  </div>
  <!-- button to sign in the app -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button @click="signIn" v-wave
      class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Sign in
      </button>
    </div>
  </div>
  <!-- element to register an account -->
  <div class="md:flex md:items-center ">
    <div class="md:w-1/3"></div>
    <label class="md:w-2/3 block text-gray-500 font-bold">
      <span class="text-sm">Not having an account yet?</span>
      <br>
      <span  class="text-xl"><PersonalRouter :route="route" :buttonText="buttonText" /></span>
    </label>
  </div>
</form>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import navNotLogged from './navNotLogged.vue'

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Register!";

// Input Fields
const email = ref("");
const password = ref("");
const emailPassError = ref("");
const showError = ref(false);

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  if(email.value.length && password.value){
    try {
        // calls the user store and send the users info to backend to logIn
        await useUserStore().signIn(email.value, password.value);
        // redirects user to the homeView
        redirect.push({ path: "/" });
      } catch (error) {
        // displays error message
        errorMsg.value = `Error: ${error.message}`;
        // hides error message
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
  }
  else if(!email.value || !password.value){
    showError.value = true
    emailPassError.value = 'Please insert an email and password'
  }
  
};
const hideError =()=>{
  showError.value = false
}
const emit = defineEmits([
  'darkMode'
])
</script>

<style scoped>
.sign-in-bg{
  padding: 3rem;
  border-radius: 25px;
  background: #add2ff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
