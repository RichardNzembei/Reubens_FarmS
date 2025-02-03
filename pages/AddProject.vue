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
                        <input v-model="project.name" type="text"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="Enter project name" required />
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
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">Requirements</label>
                        <textarea v-model="project.requirements"
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            rows="4" placeholder="Enter project requirements"></textarea>
                    </div>
                    <button type="submit"
                        class="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all">
                        Save Project
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const project = ref({
    name: '',
    duration: '',
    startDate: '',
    landSize: '',
    requirements: '',
});

const submitProject = () => {
    console.log('Project Data:', project.value);
    alert('Project saved successfully!');
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