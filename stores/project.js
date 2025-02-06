import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: []
  }),
  actions: {
    async addProject(project) {
      try {
        const response = await fetch(`http://localhost:3000/api/projects`, {
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
