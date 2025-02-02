<template>
    <div class="p-8 overflow-x-auto scroll-smooth">

        <div class="flex gap-8 w-max">

            <div
                class="w-40 h-40 bg-gradient-to-br from-green-700 to-green-900 text-white border-2 border-green-800 rounded-2xl shadow-xl 
                 flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-800 hover:to-green-950 
                 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">

                <div class="absolute inset-0 bg-[url('/images/leaf-pattern.svg')] opacity-10"></div>
                <span class="text-4xl font-bold animate-float">🌱</span>
                <h1 class="mt-2 text-lg font-semibold">Okra</h1>
                <p class="text-sm text-green-300">Ongoing</p>
            </div>


            <div
                class="w-40 h-40 bg-gradient-to-br from-green-700 to-green-900 text-white border-2 border-green-800 rounded-2xl shadow-xl 
                 flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-800 hover:to-green-950 
                 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('/images/leaf-pattern.svg')] opacity-10"></div>
                <span class="text-4xl font-bold animate-float">🥭</span>
                <h1 class="mt-2 text-lg font-semibold">Mangoes</h1>
                <p class="text-sm text-green-300">Ongoing</p>
            </div>


            <div
                class="w-40 h-40 bg-gradient-to-br from-green-700 to-green-900 text-white border-2 border-green-800 rounded-2xl shadow-xl 
                 flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-800 hover:to-green-950 
                 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('/images/leaf-pattern.svg')] opacity-10"></div>
                <span class="text-4xl font-bold animate-float">🌶️</span>
                <h1 class="mt-2 text-lg font-semibold">Chillies</h1>
                <p class="text-sm text-green-300">Closed</p>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

/* Scrollbar styling */
::-webkit-scrollbar {
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>