import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: []
  }),
  actions: {
    async fetchProjects(){
      const baseURL =
      process.env.NODE_ENV === "production"
        ? "https://reubens-farm-s.vercel.app"
        : typeof window !== "undefined" && window.location.hostname === "10.1.45.223"
        ? "http://10.1.45.223:3000"
        : "http://localhost:3000";
    
      try{
        const response=await fetch(`${baseURL}/api/projects`);
        const data=await response.json();

        if(response.ok){
          this.projects=data;
        }
        else{
          throw new Error(data.statusMessage || "failed to fetch projects")
        }
        }
        catch(error){
          console.error("error fetching projects:", error);
          alert("error fetching projects:" + error.message);
      }
    },
    
    async addProject(project) {
      const baseURL =
      process.env.NODE_ENV === "production"
        ? "https://reubens-farm-s.vercel.app"
        : typeof window !== "undefined" && window.location.hostname === "10.1.45.223"
        ? "http://10.1.45.223:3000"
        : "http://localhost:3000";
    
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
