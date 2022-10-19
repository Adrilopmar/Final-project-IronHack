<template>

  <div class="max-w-sm w-3/4 m-auto max-w-full flex container-profile">
    <div
      class="h-48 h-auto w-48 flex-none bg-cover rounded-t rounded-t-none rounded-l text-center overflow-hidden user-img"
      
    ></div>
    <div
      class="border-r border-b border-l border-gray-400nborder-l-0 border-t border-gray-400 bg-white rounded-b rounded-b-none rounded-r p-4 flex flex-col justify-between leading-normal w-full"
    >
      <div class="mb-8">
        <div class="text-gray-900 font-bold mb-2 md:flex md:justify-between">
          <div v-if="!editing || !profile.username">
            <h3 v-if="profile.username" class="text-4xl">{{ profile.username }}</h3>
          </div>
          <form  v-if="editing || !profile.username" @submit.prevent="updateUser" class="md:flex md:justify-between w-full">
          <div>
            <input
            class="appearance-none border w-full text-gray-700 bg-grey-50 py-2 leading-tight focus:outline-none"
              type="text"
              placeholder="User Name"
              v-model="userName"
            />
          </div>
          <div class="mt-2 md:mt-0">
            <button class="text-sm bg-green-200 px-3 py-1 m-auto hover:bg-green-400 transition rounded" @click="updateUser">confirm
            </button>

          </div>
            </form>
          <img v-if="!editing" @click="editUser" class="edit-img" src="https://res.cloudinary.com/djqzi4hgo/image/upload/v1661511187/todoApp/profile/edit_q9hmat.png" alt="edit">
        </div>
        <p class="text-gray-700 text-base">
          “If it looks like a duck, quacks like a duck, it's a duck!”
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Nav from "./Nav.vue";
import { useUserStore } from "../stores/user";
import { onMounted, ref } from "vue";
const userStore = useUserStore();
const profile = ref([]);
const userName = ref("");
const editing = ref(false);

const editUser = () => {
  editing.value = !editing.value;
};
const getUser = async () => {
debugger
   profile.value = await userStore.getProfile();
  //userName.value = user.value;
};

const updateUser = async (e) => {
  e.preventDefault()
  if(userName.value){
    await userStore.updateProfile(userName.value);
    await getUser()
    }
    editUser()
};
onMounted( ()=>{
  try{
     getUser()
  }
  catch(error){
    throw error
  }
})

</script>

<style scoped>
.user-handler {
  background: var(--white-bg-color);
}
.user-img {
  background: url(https://res.cloudinary.com/djqzi4hgo/image/upload/v1661502717/todoApp/profile/elegaant-duck_ic1lya.jpg)
    no-repeat center/cover;
}
.container-profile {
  min-height: 250px;
  box-shadow: var(--box-shadow-back) 0px 14px 28px, var(--box-shadow-back) 0px 10px 10px;
}
.edit-img{
    height: 25px;
    padding: 2px;
    cursor: pointer;
}
.edit-img:hover{
    background: var(--main-bg-color);
}

</style>
