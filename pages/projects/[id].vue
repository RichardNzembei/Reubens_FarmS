<template>
    <div class="bg-gray-100 min-h-screen p-6">
        <NuxtLink to="/"
            class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform" />
            <span class="text-sm font-medium">Back</span>
        </NuxtLink>
        <div class="flex items-center justify-center">
            <div
                class="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:shadow-2xl animate-fade-in">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>
                <div v-if="project" class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ project.name }}</h3>
                    <p class="text-gray-600">{{ project.description }}</p>
                    <p class="text-gray-600"><strong>Duration:</strong> {{ project.duration }} months</p>
                    <p class="text-gray-600"><strong>Start Date:</strong> {{ project.startDate }}</p>
                    <p class="text-gray-600"><strong>Land Size:</strong> {{ project.landSize }}</p>
                </div>

                <!-- Spraying Table -->
                <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Spraying Records</h3>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="p-3 text-left">Date</th>
                                <th class="p-3 text-left">Chemical Used</th>
                                <th class="p-3 text-left">Quantity</th>
                                <th class="p-3 text-left">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  class="border-b">
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                            </tr>
                            <tr>
                                <td colspan="4" class="p-3 text-center text-gray-500">No spraying records yet.</td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="addSprayingRecord"
                        class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                        Add Spraying Record
                    </button>
                </div>

                <!-- Fertilizer Table -->
                <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Fertilizer Records</h3>
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-gray-200">
                                <th class="p-3 text-left">Date</th>
                                <th class="p-3 text-left">Fertilizer Type</th>
                                <th class="p-3 text-left">Quantity</th>
                                <th class="p-3 text-left">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b">
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                                <td class="p-3"></td>
                            </tr>
                            <tr>
                                <td colspan="4" class="p-3 text-center text-gray-500">No fertilizer records yet.</td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="addFertilizerRecord"
                        class="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all">
                        Add Fertilizer Record
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectId = route.params.id; // Get the project ID from the route

// Example: Fetch project data (replace with actual data fetching logic)
const project = ref({
    id: projectId,
    name: 'Sample Project',
    description: 'This is a sample project.',
    duration: 6,
    startDate: '2023-10-01',
    landSize: '10 Acres',
    sprayingTable: [],
    fertilizerTable: [],
});

const addSprayingRecord = () => {
 
};

const addFertilizerRecord = () => {
  
};
</script>