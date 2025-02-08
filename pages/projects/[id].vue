<template>
    <div class="bg-gray-100 min-h-screen p-6">
        <!-- Back Button -->
        <NuxtLink to="/existingproject"
            class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
            <UIcon name="i-heroicons-arrow-left" class="w-6 h-6 mr-2 hover:-translate-x-1 transition-transform" />
            <span class="text-sm font-medium">Back</span>
        </NuxtLink>

        <div class="flex items-center justify-center">
            <div v-if="loading" class="text-gray-500 text-xl font-semibold">Loading project...</div>

            <div v-else-if="project" class="w-full max-w-4xl bg-white p-6 sm:p-8 animate-fade-in">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>

                <h3 class="text-xl font-semibold text-gray-700 mb-4">{{ project.projectName }}</h3>
                <p class="text-gray-600">{{ project.description }}</p>
                <p class="text-gray-600"><strong>Duration:</strong> {{ project.duration }} months</p>
                <p class="text-gray-600"><strong>Start Date:</strong> {{ project.startDate }}</p>
                <p class="text-gray-600"><strong>Land Size:</strong> {{ project.landSize }}</p>

                <!-- Spraying Records -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Spraying Records</h3>
                    <form @submit.prevent="saveSprayingRecord">
                        <input v-model="newSpraying.date" type="date" required class="border p-2 mr-2" />
                        <input v-model="newSpraying.chemical" placeholder="Chemical Used" required
                            class="border p-2 mr-2" />
                        <input v-model="newSpraying.quantity" placeholder="Quantity" required class="border p-2 mr-2" />
                        <input v-model="newSpraying.notes" placeholder="Notes" class="border p-2" />
                        <button type="submit"
                            class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all ml-2">
                            Save
                        </button>
                    </form>
                    <table class="w-full mt-4 border-collapse">
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
                        </tbody>
                    </table>
                </div>

                <!-- Fertilizer Records -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Fertilizer Records</h3>
                    <form @submit.prevent="saveFertilizerRecord">
                        <input v-model="newFertilizer.date" type="date" required class="border p-2 mr-2" />
                        <input v-model="newFertilizer.type" placeholder="Fertilizer Type" required
                            class="border p-2 mr-2" />
                        <input v-model="newFertilizer.quantity" placeholder="Quantity" required
                            class="border p-2 mr-2" />
                        <input v-model="newFertilizer.notes" placeholder="Notes" class="border p-2" />
                        <button type="submit"
                            class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all ml-2">
                            Save
                        </button>
                    </form>
                    <table class="w-full mt-4 border-collapse">
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
                        </tbody>
                    </table>
                </div>

                <!-- Generate Report Button -->
                <button @click="generateReport"
                    class="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all">
                    Download Report
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProjectStore } from '~/stores/project';
// Import the xlsx library to generate Excel workbooks
import * as XLSX from 'xlsx';

const route = useRoute();
const projectStore = useProjectStore();
const project = ref(null);
const loading = ref(true);
const newSpraying = ref({ date: '', chemical: '', quantity: '', notes: '' });
const newFertilizer = ref({ date: '', type: '', quantity: '', notes: '' });

onMounted(async () => {
    loading.value = true;
    await projectStore.fetchProjects();
    project.value = projectStore.projects.find(p => p.id === route.params.id);
    loading.value = false;
});

const saveSprayingRecord = async () => {
    try {
        await projectStore.addSprayingRecord(project.value.id, newSpraying.value);
        newSpraying.value = { date: '', chemical: '', quantity: '', notes: '' };
    } catch (error) {
        console.error("Error saving spraying record:", error);
    }
};

const saveFertilizerRecord = async () => {
    try {
        await projectStore.addFertilizerRecord(project.value.id, newFertilizer.value);
        newFertilizer.value = { date: '', type: '', quantity: '', notes: '' };
    } catch (error) {
        console.error("Error saving fertilizer record:", error);
    }
};

const generateReport = () => {
    const sprayingSheetData = [
        ["Date", "Chemical Used", "Quantity", "Notes"],
        ...project.value.sprayingTable.map(record => [
            record.date,
            record.chemical,
            record.quantity,
            record.notes
        ])
    ];

    const fertilizerSheetData = [
        ["Date", "Fertilizer Type", "Quantity", "Notes"],
        ...project.value.fertilizerTable.map(record => [
            record.date,
            record.type,
            record.quantity,
            record.notes
        ])
    ];
    const wb = XLSX.utils.book_new();

    const sprayingSheet = XLSX.utils.aoa_to_sheet(sprayingSheetData);
    const fertilizerSheet = XLSX.utils.aoa_to_sheet(fertilizerSheetData);
    XLSX.utils.book_append_sheet(wb, sprayingSheet, "Spraying Records");
    XLSX.utils.book_append_sheet(wb, fertilizerSheet, "Fertilizer Records");
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${project.value.projectName}-report.xlsx`;
    link.click();
};
</script>