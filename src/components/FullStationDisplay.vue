<script setup lang="ts">
import InfoBoard from '../components/InfoBoard.vue'
import ArrowSvg from '../assets/arrow-right-solid-full.svg'
import type { StationDefinition } from '@/types'
import { nextTick, ref } from 'vue'
import YellowButton from './YellowButton.vue'

defineProps<{
    station: StationDefinition
}>()

const viewingFront = ref(true)
const flipAnimation = ref(false)

function flipToBack() {
    flipAnimation.value = false
    viewingFront.value = false
}

function flipToFront() {
    flipAnimation.value = true
    viewingFront.value = true
}

const prayerColors = ['bg-blue-500', 'bg-green-500', 'bg-red-500']
</script>

<template>
    <div class="relative h-full mx-2">
        <Transition :name="flipAnimation ? 'slide-side-flipped' : 'slide-side'" mode="out-in">
            <div v-if="viewingFront" class="side">
                <div class="h-full overflow-scroll">
                    <!-- Information -->
                    <InfoBoard>
                        <h1>ご案内　<small>Information</small></h1>
                        <p>{{ station.description }}</p>
                    </InfoBoard>

                    <div class="mt-4 p-3 bg-white border border-black shadow-xl rounded-sm">
                        <p class="text-sm leading-4.5 tracking-wider">
                            {{ station.verses?.[0]?.text }}
                            <span class="font-bold">{{ station.verses?.[0]?.ref }}</span>
                        </p>
                    </div>
                </div>

                <YellowButton @click="flipToBack">
                    <div class="w-full">祈る　Pray</div>
                    <img :src="ArrowSvg" class="size-10" />
                </YellowButton>

                <div class="h-2"></div>
            </div>
            <div v-else class="side">
                <div class="h-full overflow-scroll">
                    <h1 class="font-bold text-xl mb-4 text-center">祈り　Prayer Requests</h1>

                    <InfoBoard v-for="(prayer, i) in station.prayer_points" class="mb-2">
                        <div class="flex">
                            <div class="text-6xl font-extralight pl-3 text-center w-16 shrink-0">
                                {{ i + 1 }}
                            </div>
                            <div :class="prayerColors[i]" class="shrink-0 w-4 my-1"></div>
                            <div class="px-4 py-2 leading-4.5 text-sm">{{ prayer }}</div>
                        </div>
                    </InfoBoard>
                </div>

                <YellowButton @click="flipToFront">
                    <img :src="ArrowSvg" class="size-10 rotate-180" />
                    <div class="w-full">ご案内　Info</div>
                </YellowButton>

                <div class="h-2"></div>
            </div>
        </Transition>
    </div>
</template>

<style>
@reference '../style.css';

.side {
    @apply bg-gray-50 p-2 shadow-xl border-2 rounded-lg border-gray-400;
    height: 100%;
    width: 100%;
    position: absolute;
    transform: perspective(900px) rotateY(0);
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    --duration: 0.125s;
    /* --duration: 0.5s; */
}

.slide-side-enter-active,
.slide-side-flipped-enter-active {
    transition:
        transform var(--duration) ease-out,
        opacity var(--duration) ease-out;
}
.slide-side-leave-active,
.slide-side-flipped-leave-active {
    transition:
        transform var(--duration) ease-in,
        opacity var(--duration) ease-in;
}

.slide-side-enter-from {
    transform: perspective(900px) rotateY(90deg);
}
.slide-side-leave-to {
    transform: perspective(900px) rotateY(-90deg);
}

.slide-side-flipped-enter-from {
    transform: perspective(900px) rotateY(-90deg);
}
.slide-side-flipped-leave-to {
    transform: perspective(900px) rotateY(90deg);
}
</style>
