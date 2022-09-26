<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <TransitionRoot as="template" :show="modalActive">
    <Dialog as="div" class="relative z-10" @close="taskAlredyCreated">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
              <div class="try px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div v-if="!taskCreated" class="sm:flex sm:items-start">
                  <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                   <img class="w-3/4" src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661426390/todoApp/modal%20new%20task/pen-notebook_fzbezp_itulll.png" alt="pen">
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-11/12">
                    <DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-900"> New task to do </DialogTitle>
                    <div class="mt-2 border-b border-teal-500 py-2 w-full">
                        <input v-model="taskName" @focus="taskNameError=false"
                        id="taskName"
                        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Task Name" aria-label="Full name">
                    </div>
                    <p v-if="taskNameError"  class="text-red-600">Task name must be at least 4 letters... lazy even for this? </p>
                    <div class="mt-2 border-b border-teal-500 py-2 w-full">
                        <textarea v-model="taskDescription" @focus="taskDescriptionError=false"
                        id="taskDescription" 
                        class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none resize-y w-full" 
                        type="textarea" placeholder="What do you should not procrastinate?" aria-label="Full name"></textarea>
                    </div>
                        <p v-if="taskDescriptionError"  class="text-red-600">Task description must be at least 14 letters... lazy even for writing? </p>
                  </div>
                </div>
                <!-- Confirmation message of task created properly  -->
                <div v-if="taskCreated" class="sm:flex sm:items-start flex-col text-center"> 
                  <h3 class="m-auto text-6xl mb-5">Task created sucessfully!</h3>
                  <p>now it is time to get things done!. I'll do my best to remember you the task.</p>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" v-wave id="createTask" v-if="!taskCreated"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:ml-3 sm:w-auto sm:text-sm" @click="newTask">create</button>
                <button type="button" v-wave 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="taskAlredyCreated" ref="cancelButtonRef">Cancel</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '../../node_modules/@headlessui/vue'
import {useTaskStore} from '../stores/task'

const taskStore = useTaskStore()



const taskName =ref('')
const taskNameError =ref(false)
const taskDescription =ref('')
const taskDescriptionError =ref(false)
const taskCreated= ref(false)



const newTask= (()=>{
    const create = document.getElementById('createTask')
    if(taskName.value.length>4 && taskDescription.value.length>14){
      create.innerHTML="Loading"
      create.classList.add('animate-spin')
      setTimeout(()=>{create.classList.remove('animate-spin'), create.innerHTML="create",taskCreated.value=true},1000)
      taskStore.addTask(taskName.value,taskDescription.value)
    }
    else{
        if(taskName.value.length<4){
            taskNameError.value=true
        }
        if(taskDescription.value.length<14){
            taskDescriptionError.value=true
        }
    }
})
const taskAlredyCreated = ()=>{
  emit('close'),
  setTimeout(()=>{
    taskCreated.value=false;
    taskName.value='';
    taskDescription.value='';
  },1000)
  }



const prop = defineProps({
    modalActive:Boolean
})
const emit = defineEmits([
    'close',false,
])

</script>
<style scoped>
.try{
  background: var(--modal-bg);
}
</style>