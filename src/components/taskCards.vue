<template >
  <div 
    class="card-task w-80 border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-around leading-normal flex flex-col mb-9"
  >
  <div class="  ml-auto" :class="taskDone ?  'task-done':'task-not-done' "></div>
  <div>
<div class="mb-8 h-full flex flex-col">
      <h3 id="taskName" v-if="!edit" class="text-gray-900 font-bold text-xl mb-2">
        {{ taskName }}
      </h3>
      <div v-else class="mb-5"> 
        <!-- <label for="task-name">New task name</label> -->
        <input id="inputName"
        v-model="taskName"
        
          type="text"
          name="task-name"
          class="appearance-none border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
      </div>
      <p v-if="!edit" class="text-gray-700 text-base">{{ taskDescription }}</p>
      <div v-else>
        <!-- <label for="task-description">New task description</label> -->
        <textarea
          v-show="edit"
          type="text"
          name="task-description"
          v-model="taskDescription"
          class="appearance-none  border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        ></textarea>
      </div>
    </div>
  </div>
    <div class="flex justify-end align-bottom">
        <button v-wave="{color:'black'}"
        class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          v-show="edit"
          @click="updateTask(taskName, taskDescription, taskId)"
        >
          Confirm
        </button>
        
      </div>
    <div v-if="!edit" class=" flex justify-between align-bottom">
      <button v-if="!taskDone"
        v-wave="{ color: 'black' }"
        class=" bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
        @click="editTask"
      >
        edit
      </button>
      <button v-if="!taskDone" @click="deleteTask(taskId)"
        v-wave="{ color: 'black' }"
        class=" bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
            delete
      </button>
      <button v-if="!taskDone" @click="isTaskDone(!taskDone,taskId)"
        v-wave="{ color: 'black' }"
        class=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
      >
        done!
      </button>
      </div>
      <div v-if="taskDone" class=" flex justify-between ">
        <button  @click="taskIsArchived(true,taskId)" v-if="!taskArchived"
        v-wave="{ color: 'black' }"
        class=" bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded justify-end "
      >
        archive! 
        </button>
        <button  @click="taskStill(false,taskId)"
        v-wave="{ color: 'black' }"
        class=" bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded justify-end "
      >
        still to do </button>
      </div>
  </div>
 
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();
const edit = ref(false);
const editTask = () => {

  edit.value = !edit.value;
};
const updateTask = async (name, description, id) => {
  await taskStore.editTask(name, description, id);
  emit("edit");
  editingTask()
};
const taskStill = async(bool,id)=>{
  await taskStore.archiveTask(bool,id)
  await taskStore.isDone(bool,id)
  emit("edit");
  emit('undo')
}
const editingTask= ()=>{

        // taskDescription=editingDescription.value
    edit.value = !edit.value;

};
const deleteTask = async (id)=>{
    await taskStore.deleteTask(id);
    emit('delete')
};
const isTaskDone = async (isDone,id)=>{
    await  taskStore.isDone(isDone,id)
    emit('done')
}
const taskIsArchived = async (bool,id)=>{
  await taskStore.archiveTask(bool,id)
  emit('edit')
  emit('undo')
}
const props = defineProps({
  taskName: String,
  taskDescription: String,
  taskId: Number,
  taskDone:Boolean,
  taskArchived:Boolean
});
const emit = defineEmits(["edit","delete",'done','undo']);
</script>

<style scoped>
.card-task {
    position: relative;
  min-height: 250px;
  background: #fff740;
  /* box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px; */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
input,textarea {
    background: #ffffff8c;
}
.task-done{
    top: 0;
    right: 0;
    position:absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 60px 60px 0;
    border-color: transparent #0dff00 transparent transparent;
}
.task-not-done{
    top: 0;
    right: 0;   
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 60px 60px 0;
    border-color: transparent #ff4800 transparent transparent;
    
}
</style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
