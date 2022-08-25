<template>
<div class="flex flex-wrap justify-around ">
    <div v-for="task in tasks" :key="task.id" >
      <taskCards 
        @edit="$emit('edit')"
         @delete="$emit('delete')" 
        @done="$emit('done')" 
        :taskName="task.title" 
        :taskId="task.id" 
        :taskDescription="task.description" 
        :taskDone="task.is_complete" 
        :taskArchived="task.archived"/>
    </div>
</div>
</template>

<script setup>
import taskCards from './taskCards.vue'

const emit = defineEmits([
  'edit','delete','done'
])
const props = defineProps({
    tasks:Object,
  filteredTasks:Array
    
})
</script>

<style>

</style>