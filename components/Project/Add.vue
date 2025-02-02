<template>
    <div class="flex justify-center gap-8 p-8">
        <NuxtLink to="/addproject">
            <div class="w-40 h-40 bg-green-500 text-white border-4 border-green-700 rounded-2xl shadow-lg 
               flex flex-col justify-center items-center cursor-pointer hover:bg-green-600 
               transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in">
                <span class="text-4xl font-bold animate-bounce">+</span>
                <h1 class="mt-2 text-lg font-semibold">New Project</h1>
            </div>

        </NuxtLink>

        <NuxtLink to="/existingproject">
            <div class="w-40 h-40 bg-gradient-to-br from-green-200 to-green-400 text-green-900 border-2 border-green-400 rounded-2xl shadow-xl 
         flex flex-col justify-center items-center cursor-pointer hover:bg-gradient-to-br hover:from-green-300 hover:to-green-500 
         transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in relative overflow-hidden">

                <div class="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>


                <svg class="w-12 h-12 mb-2 text-green-700 animate-float" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                    </path>
                </svg>


                <span class="text-lg font-semibold z-10">Existing Projects</span>
            </div>
        </NuxtLink>

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

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
}


@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 1.5s infinite;
}

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

.animate-fade-in {
    animation: fadeIn 0.5s ease-out;
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

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>