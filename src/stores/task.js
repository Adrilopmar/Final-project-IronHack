import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    async editTask(title,description,id){
      const { data, error } = await supabase
      .from('tasks')
      .update({ 
        title: title,
        description: description
         })
      .match({ id: id })
    },
    async archiveTask(bool,id){
      const { data, error } = await supabase
      .from('tasks')
      .update({ 
        archived: bool
         })
      .match({ id: id })
    },
    async deleteTask(id){
      const { data, error } = await supabase
      .from('tasks')
      .delete()
      .match({ id: id })
    },
    async isDone(done,id){
      const { data, error } = await supabase
      .from('tasks')
      .update({ 
        is_complete: done
         })
      .match({ id: id })
    },
  }
});
