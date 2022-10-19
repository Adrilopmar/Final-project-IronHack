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
        const user = supabase.auth.user();
        let {
          data: profile,
          error,
          status,
        } = await supabase
          .from("profiles")
          .select(`*`)
          .eq("id", user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        this.profile = profile;
        return this.profile;
      } catch (error) {
        if (error) throw error;
      }
    },
    async createUser(userName, mail, id) {
      const { data, error } = await supabase.from("profiles").insert([
        {
          id: id,
          username: userName,
          email: mail,
        },
      ]);
      console.log(error.message);
    },
    async updateProfile(name) {
      try {
        const user = supabase.auth.user();
        const updates = {
          id: this.user.id,
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
        // console.log(this.user.id);
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
