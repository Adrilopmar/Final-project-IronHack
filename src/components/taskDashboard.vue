<template>
  <p>{{task.title}}- {{task.description}}</p>
</template>

<script setup>

const props = defineProps({
    task:Object
})
</script>

<style>

</style>