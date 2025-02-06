import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: []
  }),
  actions: {
    async addProject(project) {
      const baseURL = process.env.NODE_ENV === 'production'
        ? 'https://reubens-farm-s.vercel.app'
        : 'http://localhost:3000';

      try {
        const response = await fetch(`${baseURL}/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(project)
        });
      
        const data = await response.json();
        if (response.ok) {
          this.projects.push({ ...project, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || "Unknown error");
        }
      } catch (error) {
        console.error("Error adding project:", error);
        alert("Error adding project: " + error.message); // Alert with the specific error message
        throw error;
      }
    }
  }
});
