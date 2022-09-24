import { defineStore } from "pinia";
import { resolveDirective } from "vue";
import { supabase } from "../supabase";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async getProfile() {
      try {
        const user = await supabase.auth.user();
        const { data: profile } = await supabase
          .from("profiles")
          .select(`username`)
          .eq("id", user.id)
          .single();
        this.profile = profile;
      } catch (error) {
        alert(error.message);
      }
    },
    async createUser(userName, mail) {
      const { data, error } = await supabase.from("profiles").insert([
        {
          id: this.user.id,
          username: userName,
          email: mail,
        },
      ]);
      console.log(error.message);
    },
    async updateProfile(name) {
      try {
        const user = await supabase.auth.user();
        const updates = {
          id: user.id,
          username: name,
          updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates);
        if (error) {
          throw error;
        }
      } catch (error) {
        alert(error.message);
      }
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signIn(email, password) {
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) throw error;
    },
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
