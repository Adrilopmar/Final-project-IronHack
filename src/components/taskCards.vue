<template>
  <div
    class="card-task w-96 border border-gray-400 lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 justify-around leading-normal flex flex-col"
  >
  <div class="w-full"> </div>
    <div class="mb-8">
      <h3 v-if="!edit" class="text-gray-900 font-bold text-xl mb-2">
        {{ taskName }}
      </h3>
      <div v-else class="mb-5 mt-5"> 
        <!-- <label for="task-name">New task name</label> -->
        <input
          v-model="taskName"
          type="text"
          name="task-name"
          :placeholder="taskName"
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
      <div>
        <button
          v-show="edit"
          @click="updateTask(taskName, taskDescription, taskId)"
        >
          Ok
        </button>
      </div>
    </div>
    <div v-if="!edit" class="buttons flex justify-around align-bottom">
      <button
        v-wave="{ color: 'black' }"
        class="button bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
        @click="editTask(taskId)"
      >
        edit
      </button>
      <button @click="deleteTask(taskId)"
        v-wave="{ color: 'black' }"
        class="button bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded">
            delete
      </button>
      <button
        v-wave="{ color: 'black' }"
        class="button bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
      >
        done!
      </button>
    </div>
  </div>
  <div></div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();
const edit = ref(false);
const editTask = (id) => {
  console.log(id);
  edit.value = !edit.value;
};
const updateTask = async (name, description, id) => {
  await taskStore.editTask(name, description, id);
  emit("edit");
  edit.value = !edit.value;
};
const deleteTask = async (id)=>{
    await taskStore.deleteTask(id);
    emit('delete')
}

const props = defineProps({
  taskName: String,
  taskDescription: String,
  taskId: Number,
});
const emit = defineEmits(["edit","delete"]);
</script>

<style scoped>
.card-task {
  min-height: 250px;
  background: #fff740;
}
input,textarea {
    background: #ffffff8c;
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
