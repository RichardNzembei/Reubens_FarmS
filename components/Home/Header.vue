<template>
    <div
        class="flex justify-between items-center mb-16 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-sm">

        <div class="space-y-1">
            <h1 class="text-2xl font-bold text-green-900 animate-fade-in">Reuben's Farms</h1>
            <p class="text-sm text-red-500 font-medium animate-fade-in delay-100">One Blood, One Piece!</p>
        </div>


        <div class="flex items-center gap-2">

            <UChip :text="count" size="lg"
                class="bg-green-600 text-white hover:bg-green-700 transition-all duration-300 animate-fade-in delay-200">

                <UButton icon="i-heroicons-bell" size="xl" variant="ghost"
                    class="text-white hover:text-green-700 animate-ring" />
            </UChip>
        </div>
    </div>
</template>

<script setup>
const count = 4;
</script>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes ring {
    0% {
        transform: rotate(0);
    }

    25% {
        transform: rotate(15deg);
    }

    50% {
        transform: rotate(-15deg);
    }

    75% {
        transform: rotate(10deg);
    }

    100% {
        transform: rotate(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.animate-ring {
    animation: ring 1.5s ease-in-out infinite;
}
</style>