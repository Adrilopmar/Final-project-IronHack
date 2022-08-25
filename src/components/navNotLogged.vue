<template>
  <div class="bg-nav flex justify-between">
        <div class="img-logo">
        <img src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426359/todoApp/navbar/p_t-full-logo_km6wi2_wrsv6c.png" alt="">
        </div>
        <!-- <div class="dark-mode-icon">
            <img @click="toggleMode" src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661427223/todoApp/navbar/sun-3-64_jypk1x.png" alt="">
            <img @click="toggleMode" src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661427478/todoApp/navbar/moon-4-64_nfn4yg.png" alt="">
        </div> -->
    </div>
</template>

<script setup>
import {ref} from 'vue'
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