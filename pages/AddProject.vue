<template>
    <div class="bg-gray-100 min-h-screen p-6">
        <NuxtLink to="/"
            class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform" />
            <span class="text-sm font-medium">Back</span>
        </NuxtLink>
        <div class="flex items-center justify-center">
            <div
                class="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl animate-fade-in">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Add New Project</h2>
                <form @submit.prevent="submitProject">
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Project Name</label>
                        <input v-model="project.projectName" type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter project name" required />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Description</label>
                        <textarea v-model="project.description"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            rows="4" placeholder="Enter project description" required></textarea>
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Estimated Duration (Months)</label>
                        <input v-model="project.duration" type="number"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter duration" required />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Start Date</label>
                        <input v-model="project.startDate" type="date"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            required />
                    </div>
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Land Size (Acres)</label>
                        <input v-model="project.landSize" type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter land size" required />
                    </div>
                    <button type="submit" :disabled="loading"
                        class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                        <span v-if="loading">Saving...</span>
                        <span v-else>Save Project</span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useProjectStore } from "~/stores/project";

const router = useRouter();
const projectStore = useProjectStore();

// Reactive project object for two-way binding with the form
const project = reactive({
    projectName: "",
    description: "",
    duration: "",
    startDate: "",
    landSize: ""
});

// Loading state to avoid double submission
const loading = ref(false);

const submitProject = async () => {
    if (loading.value) return; // Prevent double submission
    loading.value = true;
    try {
        console.log("Submitting project:", project); // Log the project data
        // Assuming addProject returns a promise
        await projectStore.addProject(project);

        // Clear form after successful submission
        project.projectName = "";
        project.description = "";
        project.duration = "";
        project.startDate = "";
        project.landSize = "";

        // Optionally, navigate to another route or show a success message here.
    } catch (error) {
        alert("Failed to save project");
    } finally {
        loading.value = false;
    }
};
</script>

<style>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out;
}

.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>