<template>
<label for="search"></label>
    <input v-model="search" @keyup="searching" type="text" name="search">
    <p></p>
</template>

<script setup>
import {ref} from 'vue'
const search = ref('')

const searching = ()=>{
    if(search.value==''){
        
    }
    else{
        for(let i = 0;i< props.tasks.length;i++){
            if(props.tasks[i].title.toLowerCase().includes(search.value)){
                console.log(props.tasks[i].title)
                emit('search',props.tasks[i])
            }
        }
    }
}
const props = defineProps({
    tasks:Object
})
const emit = defineEmits([
    'search'
])
</script>

<style>

</style>