<template>
<navNotLogged/>
  <div class="sign-up-bg m-auto">
  <h3 class="text-4xl font-semibold mb-9">Register</h3>
  <form  class="w-full max-w-sm">
    <!-- Name input -->
    <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inlineUserName">
        Username
      </label>
    </div>
     <div class="md:w-2/3">
      <input v-model="this.userName"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500" id="inlineUserName" type="text" placeholder="Name">
    </div>
  </div>
  <!-- Email input -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-email">
        Email
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="this.userEmail"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500" 
        id="inlineEmail" 
        type="email" 
        placeholder="example@mail.com">
    </div>
  </div>
  <!-- Password input -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-password">
        Password
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="this.password"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        id="inlinPassword" 
        type="password" 
        placeholder="******************">
    </div>
  </div>
  <!-- confirm password input -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-confirm-password">
       Confirm password
      </label>
    </div>
    <div class="md:w-2/3">
      <input v-model="this.confrimPassword"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-confirm-password" type="password" placeholder="******************">
    </div>
  </div>
  <!-- button to sing up   -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button @click="register" v-wave
      class="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
        Register
      </button>
    </div>
  </div>
  <!-- element to inform and redirect if user already has an account -->
  <div class="md:flex md:items-center ">
    <div class="md:w-1/3"></div>
    <label class="md:w-2/3 block text-gray-500 font-bold">
      <span class="text-sm">Alredy registered?</span>
      <br>
      <span class="text-xl"><PersonalRouter :route="route" :buttonText="buttonText" /></span>
    </label>
  </div>
</form>
</div>
</template>

<script setup>
import navNotLogged from './navNotLogged.vue'
import {useUserStore} from '../stores/user'
import PersonalRouter from "./PersonalRouter.vue";
import {ref}from 'vue'

// Route Variables
const route = "/auth/login";
const buttonText = "Sign in";
const userStore = useUserStore();
// taralexy@hotmail.com
const userName =ref('');
const userEmail=ref('');
const password=ref('');
const confrimPassword= ref('')

const conse= ()=>{
  
  console.log(userEmail.value,password.value);
};
// Input Fields

// Error Message

// Show hide password variable

// Show hide confrimPassword variable

// Router to push user once SignedUp to Log In

// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const register= (()=>{
  if(password.value === confrimPassword.value){
    console.log(userName.value, userEmail.value,password.value,confrimPassword.value)
    userStore.signUp(userEmail.value,password.value,userName.value)
  }
})
</script>

<style scope>
.sign-up-bg{
  padding: 3rem;
  border-radius: 25px;
  background: #add2ff;
  
}
</style>
