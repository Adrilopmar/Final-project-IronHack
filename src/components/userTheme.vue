<template>
  <div class="toggler flex">
    <div class="m-auto">
      <div class="flex" >
        <label @click="darkMode"
          class="flex items-center relative w-max cursor-pointer select-none"
          >
          <input id="theme"
            type="checkbox"
            class="appearance-none transition-colors cursor-pointer w-10 h-5 rounded-full focus:outline-none bg-green-500"/>
          <span
          @click="darkMode"
            class="w-6 h-6 right-5 absolute rounded-full transform transition-transform bg-gray-200 "/>
        </label>
        <span class="text-lg font-bold ml-3">
           <label for="theme"   @click="darkMode"><img  
           class=""
           v-if="!toggleTheme"
           @click="darkMode"
            src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661427223/todoApp/navbar/sun-3-64_jypk1x.png"
            alt=""/>
            <img 
            class=""
            v-else
           @click="darkMode"
            src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661427478/todoApp/navbar/moon-4-64_nfn4yg.png" alt="">
            </label>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";

let toggleTheme = ref(true);

const emits = defineEmits(['theme'])

const darkMode = () => {
    toggleTheme.value = !toggleTheme.value;
    emits('theme')
  if (!toggleTheme.value) document.documentElement.className = "dark-mode";
  else document.documentElement.classList.remove("dark-mode") ;
};
</script>

<style scoped>
img{
  cursor: pointer;
  min-width: 30px;
  max-width: 30px;
}
input:checked {
  background-color: #2289c5; /* bg-green-500 */
}

input:checked ~ span:last-child {
  --tw-translate-x: 1.75rem; /* translate-x-7 */
}
</style>
