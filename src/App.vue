<script setup lang="ts">
import { computed, ref } from 'vue'
import Map from './Map.vue'
import stations from './stations.json'
import Kanji from './Kanji.vue'
import FullStationDisplay from './components/FullStationDisplay.vue'

stations.splice(1, stations.length - 1, ...stations.slice(1).reverse())

const stationIndex = ref(0)

const currentStation = computed(() => getStation(stationIndex.value)!)
const peekNext = computed(() => getStation(stationIndex.value + 1)!)
const peekPrev = computed(() => getStation(stationIndex.value - 1)!)

function getStation(index: number) {
    while (index >= stations.length) index -= stations.length
    while (index < 0) index += stations.length
    return stations[index]
}

function goNextStation() {
    stationIndex.value++
}
function goPrevStation() {
    stationIndex.value--
}
</script>

<template>
    <div class="h-dvh w-full flex flex-col overflow-y-hidden overflow-x-hidden">
        <div class="relative">
            <div class="h-4"></div>

            <!-- Station Sign -->
            <div class="m-4 border border-black shadow-xl rounded-sm">
                <!-- <button class="text-4xl px-2" @click="prevStation">↪️</button> -->
                <div class="text-center py-2">
                    <Kanji
                        :kanji="currentStation.name_kanji"
                        class="text-4xl font-bold"
                        rubyClass="text-lg"
                    />
                    <div class="font-light text-3xl mt-1">{{ currentStation.name }}</div>
                </div>
                <div class="bg-[#E80000] flex text-white py-1 px-3">
                    <div class="whitespace-nowrap">&#9664; {{ peekPrev.name }}</div>
                    <div class="w-full"></div>
                    <div class="whitespace-nowrap">{{ peekNext.name }} &#9654;</div>
                </div>
                <!-- <button class="text-4xl px-2" @click="nextStation">↩️</button> -->
            </div>

            <div class="flex">
                <Map class="w-full" :currentStation="stationIndex" :stations="stations" />
            </div>

            <div class="absolute left-0 top-0 bottom-0 right-1/2" @click="goPrevStation"></div>
            <div class="absolute left-1/2 top-0 bottom-0 right-0" @click="goNextStation"></div>
        </div>

        <div class="h-full shrink">
            <FullStationDisplay :station="currentStation" :key="stationIndex" />
        </div>

        <div class="h-4 shrink-0"></div>
    </div>
</template>

<style>
html,
body,
#app {
    overflow-y: hidden;
    overflow-x: hidden;
}
</style>
