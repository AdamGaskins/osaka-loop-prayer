<script setup lang="ts">
import InfoBoard from '../components/InfoBoard.vue'
import ArrowSvg from '../assets/arrow-right-solid-full.svg'
import type { StationDefinition } from '@/types'
import { ref } from 'vue'

defineProps<{
    station: StationDefinition
}>()

const viewingFront = ref(true)

const prayerColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500']
</script>

<template>
    <div class="relative h-full">
        <Transition name="slide-side" mode="out-in">
            <div v-if="viewingFront" class="side">
                <div class="h-full overflow-scroll">
                    <!-- Information -->
                    <InfoBoard>
                        <h1>ご案内　<small>Information</small></h1>
                        <p>{{ station.description }}</p>
                    </InfoBoard>

                    <div
                        class="mt-4 mx-4 p-3 bg-white leading-4.5 border border-black shadow-xl rounded-sm"
                    >
                        <p>
                            {{ station.verses?.[0]?.text }}
                            <span class="text-sm">{{ station.verses?.[0]?.ref }}</span>
                        </p>
                    </div>
                </div>

                <div
                    class="flex items-center m-4 px-6 bg-[#FFD700] border border-black shadow-xl rounded-sm shrink-0"
                    @click="viewingFront = false"
                >
                    <div class="text-3xl font-bold w-full text-center">祈る　Pray</div>
                    <img :src="ArrowSvg" class="size-16" />
                </div>
            </div>
            <div v-else class="side">
                <div class="h-full overflow-scroll">
                    <InfoBoard v-for="(prayer, i) in station.prayer_points" class="mb-2">
                        <div class="flex">
                            <div class="text-6xl font-light pl-3 text-center w-16 shrink-0">
                                {{ i }}
                            </div>
                            <div :class="prayerColors[i]" class="shrink-0 w-4 mt-4"></div>
                            <div class="px-4 py-2 leading-5">{{ prayer }}</div>
                        </div>
                    </InfoBoard>
                </div>

                <div
                    class="flex items-center m-4 px-6 bg-[#FFD700] border border-black shadow-xl rounded-sm shrink-0"
                    @click="viewingFront = true"
                >
                    <img :src="ArrowSvg" class="size-16 rotate-180" />
                    <div class="text-3xl font-bold w-full text-center">ご案内　Info</div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style>
.side {
    height: 100%;
    width: 100%;
    position: absolute;
    transform: perspective(900px) rotateY(0);
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
}

.slide-side-enter-active {
    transition:
        transform 0.125s ease-out,
        opacity 0.125s ease-out;
}
.slide-side-leave-active {
    transition:
        transform 0.125s ease-in,
        opacity 0.125s ease-in;
}

.slide-side-enter-from {
    transform: perspective(900px) rotateY(90deg);
}

.slide-side-leave-to {
    transform: perspective(900px) rotateY(-90deg);
}
</style>
