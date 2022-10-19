<template>
  <div class="bg-nav flex justify-between">
        <div class="img-logo">
            <img class="hidden md:block"
          src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-full-logo_km6wi2_wrsv6c.png"
          alt=""
        />
        <img
            class="md:hidden"
            src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-logo_eybmfq_eiuekm.png"
            alt=""
          />
      
        </div>
        <userTheme/>
  </div>





  

</template>

<script setup>
import {ref} from 'vue'
import userTheme from './userTheme.vue'
const darkMode = ref(false)
const toggleMode = ()=>{
    darkMode.value = !darkMode.value
    emit('darkMode')
    }
    const emit= defineEmits([
        'darkMode'
    ])
</script>

<style scoped>
.bg-nav{
    background:var(--white-bg-color);
    padding: 1.5rem 3rem;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.img-logo{
    width: 310px;
}
img{
    height: 40px;
}

</style>