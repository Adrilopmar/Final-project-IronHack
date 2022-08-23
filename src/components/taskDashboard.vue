<template>
    <div  v-for="task in tasks" :key="task.id" class="justify-around m-auto">
      <taskCards @edit="$emit('edit')" @delete="$emit('delete')" :taskName="task.title" :taskId="task.id" :taskDescription="task.description"/>
    </div>
</template>

<script setup>
import taskCards from './taskCards.vue'

const conse = ()=>{
  console.log(tasks)
}
const emit = defineEmits([
  'edit','delete'
])
const props = defineProps({
    tasks:Object,
})
const editTask = async ()=>{
  console.log('asdas',id)

  
}
</script>

<style>

</style>