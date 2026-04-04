<script setup lang="ts">
import type { StationDefinition } from './types'

defineProps<{
    stations: StationDefinition[]
    currentStation: number
}>()
</script>

<template>
    <div class="p-4">
        <div class="w-full h-20 outline-20 -outline-offset-10 outline-[#E80000] rounded-[50%]">
            <div class="w-full h-full">
                <!-- station icons -->
                <div
                    class="map-icon size-3.5 rounded-full bg-white"
                    v-for="(station, i) of stations"
                    :style="{ '--p': i / stations.length }"
                ></div>

                <!-- train -->
                <div
                    class="map-icon size-9 transition-[offset-distance]"
                    :style="{ '--p': currentStation / stations.length }"
                >
                    <span class="text-4xl absolute -top-2.5"> 🚃 </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.map-icon {
    display: inline-block;
    offset-path: rect(0% 100% 100% 0 round 50%);
    offset-distance: calc(100% * var(--p) + 10%);
    offset-rotate: 0deg;
    offset-anchor: center;
}
</style>
