<template>
  <navNotLogged />
  <div class="container h-full flex">
    <div class="form w-96 p-12 m-auto">
      <div class="mt-2 border-b border-teal-500 py-2">
        <label for="userName">Who's the Procrastinan't?</label>
        <input
          v-model="taskName"
          @focus="taskNameError = false"
          id="userName"
          class="appearance-none w-full bg-transparent border-none text-gray-700 mr-3 mt-5 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Name"
          aria-label="Full name"
        />
      </div>
      <div class="flex w-full justify-end">
        <button
          @click="newUser"
          v-wave
          class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded"
          type="button"
        >
          Let's start
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import navNotLogged from "./navNotLogged.vue";
</script>

<style scoped>
.form {
  background: var(--white-bg-color);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 14px 28px, rgba(0, 0, 0, 0.5) 0px 10px 10px;
  border-radius: 15px;
}
</style>
