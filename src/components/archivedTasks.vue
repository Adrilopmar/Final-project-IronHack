<template>
  <div class="main">
    <h3 class="text-6xl text-center my-12">Archived tasks</h3>
    <p v-if="!tasksDone.length" class="text-center">
      <i>Tasks still being procrastinated...</i>
    </p>
    <div class="flex flex-wrap justify-around">
      <div v-for="task in tasksDone" :key="task.id">
        <taskCards
          @undo="archivedTasks"
          :taskName="task.title"
          :taskId="task.id"
          :taskDescription="task.description"
          :taskDone="task.is_complete"
          :taskArchived="task.archived"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from "../stores/task";
import taskCards from "./taskCards.vue";
import Nav from "./Nav.vue";
import { ref } from "vue";

const taskStore = useTaskStore();
const tasksDone = ref([]);

const archivedTasks = async () => {
  tasksDone.value = await taskStore.fetchTasks();
  tasksDone.value = tasksDone.value.filter((task) => task.archived);
};

archivedTasks();
</script>

<style scoped>
.main {
  height: 100vh;
}
</style>
