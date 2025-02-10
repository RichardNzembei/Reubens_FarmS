<template>
    <div class="bg-gray-100 min-h-screen p-6">
        <!-- Back Button -->
        <NuxtLink to="/existingproject" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-300">
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
                <p class="text-gray-600"><strong>Land Size:</strong> {{ project.landSize }} Acres</p>

                <!-- Spraying Records -->
                <div class="mt-8">
                    <h3 class="text-xl font-semibold text-gray-700 mb-4">Spraying Records</h3>
                    <form @submit.prevent="saveSprayingRecord" class="bg-white p-4 rounded-lg shadow">
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <input v-model="newSpraying.date" type="date" required class="border p-2 w-full" />
                            <input v-model="newSpraying.serialNo" placeholder="Serial No" required class="border p-2 w-full" />
                            <input v-model="newSpraying.tradeName" placeholder="Trade Name" required class="border p-2 w-full" />
                            <input v-model="newSpraying.regNo" placeholder="Registration No" class="border p-2 w-full" />
                            <input v-model="newSpraying.activeIngredients" placeholder="Active Ingredients" required class="border p-2 w-full" />
                            <input v-model="newSpraying.manufacturer" placeholder="Manufacturer" required class="border p-2 w-full" />
                            <input v-model="newSpraying.agent" placeholder="Agent" required class="border p-2 w-full" />
                            <input v-model="newSpraying.uses" placeholder="Uses" required class="border p-2 w-full" />
                        </div>
                        <button type="submit" class="bg-green-500 text-white py-2 px-4 mt-4 rounded-lg hover:bg-green-600 transition-all w-full sm:w-auto">
                            Save
                        </button>
                    </form>
                    <div class="overflow-x-auto mt-4">
                        <table class="min-w-full border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100 border border-gray-300">
                                    <th class="p-3 text-left">Serial No</th>
                                    <th class="p-3 text-left">Trade Name</th>
                                    <th class="p-3 text-left">Reg No</th>
                                    <th class="p-3 text-left">Active Ingredients</th>
                                    <th class="p-3 text-left">Manufacturer</th>
                                    <th class="p-3 text-left">Agent</th>
                                    <th class="p-3 text-left">Uses</th>
                                    <th class="p-3 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in project.sprayingTable" :key="record.id" class="border border-gray-300 hover:bg-gray-50">
                                    <td class="p-3 border">{{ record.serialNo }}</td>
                                    <td class="p-3 border">{{ record.tradeName }}</td>
                                    <td class="p-3 border">{{ record.regNo }}</td>
                                    <td class="p-3 border">{{ record.activeIngredients }}</td>
                                    <td class="p-3 border">{{ record.manufacturer }}</td>
                                    <td class="p-3 border">{{ record.agent }}</td>
                                    <td class="p-3 border">{{ record.uses }}</td>
                                    <td class="p-3 border">{{ record.date }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Generate Report Button -->
                <button @click="generateReport" class="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all w-full sm:w-auto">
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
import * as XLSX from 'xlsx';

const route = useRoute();
const projectStore = useProjectStore();
const project = ref(null);
const loading = ref(true);
const newSpraying = ref({ serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '', date: '' });
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
        newSpraying.value = { serialNo: '', tradeName: '', regNo: '', activeIngredients: '', manufacturer: '', agent: '', uses: '', date: '' };
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
            record.serialNo,
            record.tradeName,
            record.regNo,
            record.activeIngredients,
            record.manufacturer,
            record.agent,
            record.uses,
            record.date


        ])
    ];

    const fertilizerSheetData = [
        ["Serial No", "Trade Name", "Registration No", "Active Ingredients", "Manufacturer", "Agent", "Date"],
        ...project.value.fertilizerTable.map(record => [
            record.date,
            record.chemical,
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