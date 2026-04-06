<script setup lang="ts">
import { computed, ref } from 'vue'
import Map from './Map.vue'
import stations from './stations.json'
import Kanji from './Kanji.vue'
import FullStationDisplay from './components/FullStationDisplay.vue'
import PrevNextTransition from './components/PrevNextTransition.vue'
import Tutorial from './components/Tutorial.vue'
import StationSign from './components/StationSign.vue'

stations.splice(1, stations.length - 1, ...stations.slice(1).reverse())

const stationIndex = ref(0)

const currentStation = computed(() => getStation(stationIndex.value)!)
const peekNext = computed(() => getStation(stationIndex.value + 1)!)
const peekPrev = computed(() => getStation(stationIndex.value - 1)!)

const reverseAnimation = ref(false)
const showTutorial = ref(true)

function closeTutorial(index: number) {
    showTutorial.value = false
    stationIndex.value = index
}

function getStation(index: number) {
    while (index >= stations.length) index -= stations.length
    while (index < 0) index += stations.length
    return stations[index]
}

function goNextStation() {
    stationIndex.value++
    reverseAnimation.value = false
}
function goPrevStation() {
    stationIndex.value--
    reverseAnimation.value = true
}
</script>

<template>
    <div class="h-dvh w-full flex flex-col overflow-y-clip overflow-x-visible">
        <div class="relative">
            <div class="flex my-4">
                <Map class="w-full" :currentStation="stationIndex" :stations="stations" />
            </div>

            <!-- Station Sign -->
            <StationSign
                :currentStation="currentStation"
                :stationIndex="stationIndex"
                :peekNext="peekNext"
                :peekPrev="peekPrev"
                :reverseAnimation="reverseAnimation"
            />

            <div class="absolute left-0 top-0 bottom-0 right-1/2" @click="goPrevStation"></div>
            <div class="absolute left-1/2 top-0 bottom-0 right-0" @click="goNextStation"></div>
        </div>

        <div class="h-full shrink">
            <PrevNextTransition :reverse="reverseAnimation">
                <FullStationDisplay
                    class="transition-slide"
                    :station="currentStation"
                    :key="stationIndex"
                />
            </PrevNextTransition>
        </div>

        <div class="h-2 shrink-0"></div>
    </div>
    <Tutorial v-if="showTutorial" @close="closeTutorial" :stations="stations" />
</template>

<style>
html,
body,
#app {
    overflow-y: clip;
    overflow-x: clip;
    height: 100%;
}
</style>
