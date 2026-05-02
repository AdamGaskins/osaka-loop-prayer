<script setup lang="ts">
import { ref } from 'vue'
import Map from './Map.vue'
import FullStationDisplay from './components/FullStationDisplay.vue'
import PrevNextTransition from './components/PrevNextTransition.vue'
import PrintMode from './components/PrintMode.vue'
import Tutorial from './components/Tutorial.vue'
import StationSign from './components/StationSign.vue'
import { useStationsStore } from './stores/stations'
import { storeToRefs } from 'pinia'

const stationsStore = useStationsStore()
const { stationIndex, stations } = storeToRefs(stationsStore)

const reverseAnimation = ref(false)
const showTutorial = ref(true)

function closeTutorial() {
    showTutorial.value = false
}

function goNextStation() {
    stationIndex.value--
    reverseAnimation.value = false
}
function goPrevStation() {
    stationIndex.value++
    reverseAnimation.value = true
}
</script>

<template>
    <div id="print-parent" class="print:hidden">
        <div
            class="h-dvh w-full flex flex-col overflow-y-clip overflow-x-visible"
        >
            <div class="relative">
                <div class="flex my-4 safe-top">
                    <Map class="w-full" />
                </div>

                <!-- Station Sign -->
                <StationSign :reverseAnimation="reverseAnimation" />

                <div
                    class="absolute left-0 top-0 bottom-0 right-1/2"
                    @click="goPrevStation"
                ></div>
                <div
                    class="absolute left-1/2 top-0 bottom-0 right-0"
                    @click="goNextStation"
                ></div>
            </div>

            <div class="h-full shrink">
                <PrevNextTransition :reverse="reverseAnimation">
                    <FullStationDisplay
                        class="transition-slide"
                        :key="stationIndex"
                    />
                </PrevNextTransition>
            </div>

            <div class="h-4 shrink-0"></div>
        </div>
        <Tutorial
            v-if="showTutorial"
            @close="closeTutorial"
            :stations="stations"
        />
    </div>
    <PrintMode class="not-print:hidden" />
</template>

<style>
@reference './style.css';

.safe-padding-top {
    padding-top: env(safe-area-inset-top);
}
.safe-padding-bottom {
    padding-top: env(safe-area-inset-bottom);
}
.safe-padding-left {
    padding-top: env(safe-area-inset-left);
}
.safe-padding-right {
    padding-top: env(safe-area-inset-right);
}

html {
    @apply not-print:bg-gray-200;
}

@media not print {
    html,
    body,
    #app,
    #print-parent {
        overflow-y: clip;
        overflow-x: clip;
        height: 100%;
    }
}
</style>
