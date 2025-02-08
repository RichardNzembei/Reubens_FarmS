<script setup>
import { useProjectStore } from "~/stores/project";
import { onMounted, ref } from "vue";

const projectStore = useProjectStore();
const loading = ref(true);

onMounted(async () => {
  await projectStore.fetchProjects();
  loading.value = false;
});
</script>

<template>
  <div class="p-6">
    <!-- Back Button -->
    <NuxtLink to="/"
      class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
      <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform" />
      <span class="text-sm font-medium">Back</span>
    </NuxtLink>

    <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Projects</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div class="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
    </div>

    <!-- No Projects Available -->
    <div v-else-if="projectStore.projects.length === 0" class="text-gray-500 text-center">
      No projects available.
    </div>

    <!-- Project Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projectStore.projects" :key="project.id"
        class="bg-white shadow-lg rounded-xl p-5 border transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <h2 class="text-xl font-semibold text-gray-900">{{ project.projectName }}</h2>
        <p class="text-gray-600 mt-2">{{ project.description }}</p>

        <div class="mt-4 text-sm text-gray-500">
          <span>⏳ Duration: {{ project.duration }}</span> |
          <span>📅 Start Date: {{ project.startDate }}</span>
        </div>

        <div class="mt-2">
          <span class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-lg">
            🌿 Land Size: {{ project.landSize }}
          </span>
        </div>

        <!-- View Project Button -->
        <NuxtLink :to="`/projects/${project.id}`"
          class="mt-4 inline-block px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300">
          View
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
