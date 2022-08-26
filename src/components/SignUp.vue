<template>
<navNotLogged class="mb-12"/>
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
      <input v-model="userName" @focus="toogleError('name')"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500" id="inlineUserName" type="text" placeholder="Name">
      <p  v-if="showNameError" class="error text-center text-xs">Name must be 4 characters long</p>
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
      <input v-model="userEmail" @focus="toogleError('email')"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-cyan-500" 
        id="inlineEmail" 
        type="email" 
        placeholder="example@mail.com">
        <p v-if="showEmailError" class="error text-center text-xs">Please enter a valid email</p>
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
      <input v-model="password" @focus="toogleError('pass')"
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
        id="inlinPassword" 
        type="password" 
        placeholder="******************">
        <p v-if="showPassLengthError" class="error text-center text-xs">password must be 6 characters long</p>
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
      <input v-model="confrimPassword" @focus="toogleError('confPass')"
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-confirm-password" type="password" placeholder="******************">
      <p v-if="showPassNotMatchError" class="error text-center text-xs">passwords does not match</p>
    </div>
  </div>
  <!-- button to sing up   -->
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button @click="validateRegister" v-wave
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
      <span class="text-xl"><PersonalRouter :route="route" :buttonText="buttonText" class="auth-link" /></span>
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
const userName =ref('');
const userEmail=ref('');
const password=ref('');
const confrimPassword= ref('');
const error = ref(0)
const mailRegEx = ref(`^[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`)
const showEmailError = ref(false)
const showNameError = ref(false)
const showPassLengthError = ref(false)
const showPassNotMatchError = ref(false)
const user = ref([])

const toogleError = (err)=>{
  switch(err){
    case 'confPass':
      showPassNotMatchError.value= false
      break
    case 'pass':
      showPassLengthError.value =false
      break
    case 'email':
      showEmailError.value = false
      break
    case 'name':
      showNameError.value =false
  }
}
// Input Fields
// Error Message
// Show hide password variable
// Show hide confrimPassword variable
const validateRegister=()=>{
  updateUser()
  error.value = 0
if(!userEmail.value.match(mailRegEx)){
  showEmailError.value = true
  error.value ++
}
if(userName.value.length<4){
  showNameError.value = true
  error.value ++
}
if(password.value.length<6){
  showPassLengthError.value = true
  error.value ++
}
if(confrimPassword.value != password.value){
  showPassNotMatchError.value = true
  error.value ++
}
if(error.value === 0){
  register().then(updateUser())
}
}
const updateUser = async (name) => {
  const user = await userStore.getProfile()
  await userStore.updateProfile(user.username);
  console.log(user.username)
};
// Arrow function to SignUp user to supaBase with a timeOut() method for showing the error
const register= async ()=>{
  try{
    await userStore.signUp(userEmail.value,password.value,userName.value)
    redirect.push({ path: "/auth/login" });
  } catch (error) {
        // displays error message
        errorMsg.value = `Error: ${error.message}`;
        // hides error message
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
      
}
</script>

<style scope>
.sign-up-bg{
  padding: 3rem;
  border-radius: 15px;
  background: #add2ff;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 14px 28px, rgba(0, 0, 0, 0.5) 0px 10px 10px;
}
.error{
  color: red;
}
</style>
