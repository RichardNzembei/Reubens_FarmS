<template>
    <div class="bg-gray-100 min-h-screen p-6">
        <!-- Back Button -->
        <NuxtLink to="/existingproject" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform" />
            <span class="text-sm font-medium">Back</span>
        </NuxtLink>

        <div class="flex items-center justify-center">
            <div v-if="loading" class="text-gray-500 text-xl font-semibold">Loading project...</div>

            <div v-else-if="project" class="w-full max-w-4xl bg-white p-6 sm:p-8  animate-fade-in">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>

                <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ project.projectName }}</h3>
                <p class="text-gray-600">{{ project.description }}</p>
                <p class="text-gray-600"><strong>Duration:</strong> {{ project.duration }} months</p>
                <p class="text-gray-600"><strong>Start Date:</strong> {{ project.startDate }}</p>
                <p class="text-gray-600"><strong>Land Size:</strong> {{ project.landSize }}</p>

                <!-- Spraying Records -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Spraying Records</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-max border-collapse">
                            <thead>
                                <tr class="bg-gray-200">
                                    <th class="p-3 text-left">Date</th>
                                    <th class="p-3 text-left">Chemical Used</th>
                                    <th class="p-3 text-left">Quantity</th>
                                    <th class="p-3 text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.sprayingTable" :key="record.id" class="border-b">
                                    <td class="p-3">{{ record.date }}</td>
                                    <td class="p-3">{{ record.chemical }}</td>
                                    <td class="p-3">{{ record.quantity }}</td>
                                    <td class="p-3">{{ record.notes }}</td>
                                </tr>
                                <tr v-if="project.sprayingTable.length === 0">
                                    <td colspan="4" class="p-3 text-center text-gray-500">No spraying records yet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button @click="addSprayingRecord"
                        class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                        Add Spraying Record
                    </button>
                </div>

                <!-- Fertilizer Records -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Fertilizer Records</h3>
                    <div class="overflow-x-auto">
                        <table class="w-full min-w-max border-collapse">
                            <thead>
                                <tr class="bg-gray-200">
                                    <th class="p-3 text-left">Date</th>
                                    <th class="p-3 text-left">Fertilizer Type</th>
                                    <th class="p-3 text-left">Quantity</th>
                                    <th class="p-3 text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.fertilizerTable" :key="record.id" class="border-b">
                                    <td class="p-3">{{ record.date }}</td>
                                    <td class="p-3">{{ record.type }}</td>
                                    <td class="p-3">{{ record.quantity }}</td>
                                    <td class="p-3">{{ record.notes }}</td>
                                </tr>
                                <tr v-if="project.fertilizerTable.length === 0">
                                    <td colspan="4" class="p-3 text-center text-gray-500">No fertilizer records yet.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button @click="addFertilizerRecord"
                        class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                        Add Fertilizer Record
                    </button>
                </div>
            </div>

            <div v-else class="text-center text-gray-500 text-xl font-semibold">
                Project not found.
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '~/stores/project';

const route = useRoute();
const projectId = route.params.id;
const projectStore = useProjectStore();
const project = ref(null);
const loading = ref(true);

onMounted(async () => {
    loading.value = true;
    if (!projectStore.projects.length) {
        await projectStore.fetchProjects(); // Ensure projects are loaded
    }
    
    const foundProject = projectStore.projects.find(p => p.id === projectId);
    if (foundProject) {
        project.value = {
            ...foundProject,
            sprayingTable: foundProject.sprayingTable || [],
            fertilizerTable: foundProject.fertilizerTable || []
        };
    }
    
    loading.value = false;
});

const addSprayingRecord = () => {
    if (project.value) {
        project.value.sprayingTable.push({
            id: Date.now(),
            date: new Date().toISOString().split("T")[0], // Current date
            chemical: "New Chemical",
            quantity: "1L",
            notes: "Sample Note"
        });
    }
};

const addFertilizerRecord = () => {
    if (project.value) {
        project.value.fertilizerTable.push({
            id: Date.now(),
            date: new Date().toISOString().split("T")[0], // Current date
            type: "New Fertilizer",
            quantity: "5kg",
            notes: "Sample Note"
        });
    }
};
</script>
