<template>
<div class="">
  <div class="container">
    <p v-if="toDoTasks.length < 1" class="text-center mt-12">
      <i
        >Not tasks to do... yet. Are you procrastinating even writing the tasks
        down?</i
      >
    </p>
  </div>
  <div class="mt-6 mx-auto mt-12 flex">
    <button v-wave @click="modalActive = true">Create new task</button>
  </div>
  <div class="separating"></div>
  <modal @close="close" :modalActive="modalActive" />
  <div class="flex gap-5 flex-wrap" >
  <!-- <div v-for="task in userTasks" :key="task.id"> -->
    <taskDashboard @edit="fetchedTasks" @delete="fetchedTasks" @done="fetchedTasks" :tasks="toDoTasks" />
  </div>
  </div>
</template>

<script setup>
import searchBar from'../components/searchBar.vue'
import { useTaskStore } from "../stores/task";
import modal from "../components/newTaskModal.vue";
import { computed, onMounted, ref } from "vue";
import taskDashboard from "../components/taskDashboard.vue";
import {useUserStore} from '../stores/user.js'

const taskStore = useTaskStore();
const userStore = useUserStore()
let modalActive = ref(false);
const toDoTasks = ref([])
const userTasks = ref([]);

const fetchedTasks = async () => {
  userTasks.value = await taskStore.fetchTasks();
  toDoTasks.value = userTasks.value.filter(task =>!task.archived)
};

const close = () => {
  modalActive.value = !modalActive.value;
  fetchedTasks();
};

const emit = defineEmits(["closeModal", false]);
const prop = defineProps({
  modal: Boolean,
  tasks: Object,
  filteredTasks:Array
});

onMounted(
  userStore.fetchUser()
)
computed(fetchedTasks());
</script>

<style scoped>

.container {
  color: var(--main-txt-color);
}

button {
  color: white;
  text-align: center;
  margin: 10px auto;
  border-radius: 7px;
  padding: 7px 15px;
  background: var(--button-primary);
}
button:hover {
  color: var(--main-text-color);
  transition: 0.5s;
  background: var(--button-primary-hover);
}
.separating {
  margin: 25px auto;
  width: 60%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.521);
}
</style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
