<script setup lang="ts">
import type { StationDefinition } from './types'

defineProps<{
    stations: StationDefinition[]
    currentStation: number
}>()
</script>

<template>
    <div class="p-4">
        <div class="w-full h-10 rounded-[100%] relative">
            <div
                class="absolute -top-[10px] -bottom-[10px] -left-[11px] -right-[13px] border-20 rounded-full border-red-500"
            ></div>
            <div class="w-full h-full">
                <!-- station icons -->
                <div
                    class="map-icon size-3.5 rounded-full bg-white"
                    v-for="(station, i) of stations"
                    :style="{ '--p': i / stations.length }"
                ></div>

                <!-- train -->
                <div
                    class="map-icon size-9 transition-[offset-distance] duration-[1500ms]"
                    :style="{ '--p': currentStation / stations.length }"
                >
                    <span class="text-4xl absolute -top-2.5"> 🚃 </span>
                </div>

                <!-- <div -->
                <!--     class="map-icon size-9 transition-[offset-distance] duration-[1500ms]" -->
                <!--     :style="{ '--p': currentStation / stations.length, 'offset-rotate': 'auto' }" -->
                <!-- > -->
                <!--     <div class="train-parent size-9"> -->
                <!--         <div class="train-model"> -->
                <!--             <div></div> -->
                <!--         </div> -->
                <!--     </div> -->
                <!-- </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.train-parent {
    transform-style: preserve-3d;
    perspective: 1000px;
    perspective-origin: center center;
    offset-rotate: auto !important;
}

.train-model,
.train-model::before,
.train-model::after,
.train-model div,
.train-model div::before,
.train-model div::after {
    background-color: grey;
    width: 100%;
    height: 100%;
}

.train-model {
    transform-origin: center center;
}
.train-model::before {
    transform-origin: top center;
    rotate: x 90deg;
}
.train-model::after {
    transform-origin: center left;
    rotate: y -90deg;
}
.train-model::after {
    transform-origin: center left;
    rotate: y -90deg;
}
.train-model div::before {
    transform-origin: bottom center;
    rotate: x 90deg;
}
.train-model div::after {
    transform-origin: left center;
    rotate: y 90deg;
}

.map-icon {
    display: inline-block;
    offset-path: rect(0% 100% 100% 0% round 11%);
    offset-distance: calc(100% * var(--p) + 35%);
    offset-rotate: 0deg;
    offset-anchor: center;
}
</style>
