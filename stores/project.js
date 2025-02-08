import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
  }),
  actions: {
    async fetchProjects() {
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "https://reubens-farm-s.vercel.app"
          : typeof window !== "undefined" &&
            window.location.hostname === "10.1.45.223"
          ? "http://10.1.45.223:3000"
          : "http://localhost:3000";

      try {
        const response = await fetch(`${baseURL}/api/projects`);
        const data = await response.json();

        if (response.ok) {
          this.projects = data.map((project) => ({
            ...project,
            sprayingTable: project.sprayingTable || [],
            fertilizerTable: project.fertilizerTable || [],
          }));
        } else {
          throw new Error(data.statusMessage || "failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Error fetching projects: " + error.message);
      }
    },

    async addProject(project) {
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "https://reubens-farm-s.vercel.app"
          : typeof window !== "undefined" &&
            window.location.hostname === "10.1.45.223"
          ? "http://10.1.45.223:3000"
          : "http://localhost:3000";

      try {
        const response = await fetch(`${baseURL}/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...project,
            sprayingTable: [],
            fertilizerTable: [],
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.projects.push({
            ...project,
            id: data.id,
            sprayingTable: [],
            fertilizerTable: [],
          });
          return data.id;
        } else {
          throw new Error(data.statusMessage || "Unknown error");
        }
      } catch (error) {
        console.error("Error adding project:", error);
        alert("Error adding project: " + error.message);
        throw error;
      }
    },

    async addSprayingRecord(projectId, record) {
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "https://reubens-farm-s.vercel.app"
          : typeof window !== "undefined" &&
            window.location.hostname === "10.1.45.223"
          ? "http://10.1.45.223:3000"
          : "http://localhost:3000";

      try {
        const response = await fetch(`${baseURL}/api/sprayingRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.sprayingTable = project.sprayingTable || [];
            project.sprayingTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(
            data.statusMessage || "Failed to add spraying record"
          );
        }
      } catch (error) {
        console.error("Error adding spraying record:", error);
        alert("Error adding spraying record: " + error.message);
        throw error;
      }
    },

    async addFertilizerRecord(projectId, record) {
      const baseURL =
        process.env.NODE_ENV === "production"
          ? "https://reubens-farm-s.vercel.app"
          : typeof window !== "undefined" &&
            window.location.hostname === "10.1.45.223"
          ? "http://10.1.45.223:3000"
          : "http://localhost:3000";

      try {
        const response = await fetch(`${baseURL}/api/fertilizerRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.fertilizerTable = project.fertilizerTable || [];
            project.fertilizerTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(
            data.statusMessage || "Failed to add fertilizer record"
          );
        }
      } catch (error) {
        console.error("Error adding fertilizer record:", error);
        alert("Error adding fertilizer record: " + error.message);
        throw error;
      }
    },
  },
});
