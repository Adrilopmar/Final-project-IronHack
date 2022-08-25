<template>
<div v-show="filteredTasks">
</div>
<button @click="conse">conse</button>
    <div  v-for="task in tasks" :key="task.id" class="justify-around m-auto">
      <taskCards @edit="$emit('edit')" @delete="$emit('delete')" 
      @done="$emit('done')" :taskName="task.title" :taskId="task.id" :taskDescription="task.description" :taskDone="task.is_complete"/>
    </div>

</template>

<script setup>
import taskCards from './taskCards.vue'

const conse = ()=>{
  console.log(props.search)
}
const emit = defineEmits([
  'edit','delete','done'
])
const props = defineProps({
    tasks:Object,
  filteredTasks:Array
    
})
const editTask = async ()=>{
  console.log('asdas',id)

  
}
</script>

<style>

</style>