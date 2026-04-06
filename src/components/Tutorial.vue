<script setup lang="ts">
import type { StationDefinition } from '@/types'
import StationSign from './StationSign.vue'
import ArrowSvg from '../assets/arrow-right-solid-full.svg'
import { ref } from 'vue'
import { useStationsStore } from '@/stores/stations'

const stationsStore = useStationsStore()

defineProps<{ stations: StationDefinition[] }>()

const chosenStation = ref(false)
const specialStations = ['Kyōbashi', 'Ōsaka', 'Tennōji']

const emit = defineEmits<{
    (e: 'close'): void
}>()

function chooseStation(i: number) {
    stationsStore.stationIndex = i
    chosenStation.value = true
}

function close() {
    if (!chosenStation.value) return

    emit('close')
}
</script>

<template>
    <div class="absolute inset-0 bg-gray-100 backdrop-blur-[2px] text-center" @click="close">
        <template v-if="!chosenStation">
            <h1 class="leading-12 uppercase text-6xl font-bold mt-12">
                <div class="mr-0">Pray</div>
                <div class="text-osaka-red">Osaka</div>
                <div class="ml-0">Loop</div>
            </h1>

            <div class="mt-16 mb-2">Tap your starting station</div>

            <div class="grid grid-cols-3 ring-red-600 gap-x-2 gap-y-2 p-2">
                <button
                    v-for="(station, i) of stations"
                    @click.stop.prevent="chooseStation(i)"
                    class="bg-white border border-gray-100 text-sm rounded-lg py-2 shadow-lg"
                    :class="{
                        'border-black! font-bold': specialStations.includes(station.name),
                    }"
                >
                    {{ station.name }}
                </button>
            </div>
        </template>
        <template v-else>
            <div class="h-22"></div>
            <StationSign />

            <div class="absolute left-0 right-0 top-35 flex">
                <div class="w-full text-center px-4">
                    <div
                        class="size-20 border-4 border-black mx-auto rounded-full animate-(--flash)"
                    ></div>
                    <img :src="ArrowSvg" class="-rotate-90 size-16 mx-auto" />
                    <div class="text-black font-bold">Previous Station</div>
                </div>

                <div class="w-full text-center px-4">
                    <div
                        class="size-20 border-4 border-black mx-auto rounded-full animate-(--flash)"
                    ></div>
                    <img :src="ArrowSvg" class="-rotate-90 size-16 mx-auto" />
                    <div class="text-black font-bold">Next Station</div>
                </div>
            </div>

            <div class="h-64"></div>
        </template>
    </div>
</template>

<style>
:root {
    --flash: flash 0.75s ease-in-out infinite;
}

@keyframes flash {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
