<script setup lang="ts">
import Kanji from '@/Kanji.vue'
import type { StationDefinition } from '@/types'
import PrevNextTransition from './PrevNextTransition.vue'

const { stationIndex = 0 } = defineProps<{
    reverseAnimation?: boolean
    currentStation: StationDefinition
    stationIndex?: number
    peekNext: StationDefinition
    peekPrev: StationDefinition
}>()
</script>

<template>
    <PrevNextTransition :reverse="reverseAnimation">
        <div
            :key="stationIndex"
            class="m-2 border border-black shadow-xl rounded-sm overflow-x-clip bg-white text-black"
        >
            <div class="text-center py-2">
                <Kanji
                    kanjiOnly
                    :kanji="currentStation.name_kanji"
                    class="text-2xl font-bold transition-slide"
                    rubyClass="text-lg"
                />
                <div class="font-light text-3xl transition-slide">
                    {{ currentStation.name }}
                </div>
            </div>
            <div class="bg-osaka-red flex text-white py-1 px-3">
                <div class="whitespace-nowrap transition-fade">&#9664; {{ peekPrev.name }}</div>
                <div class="w-full"></div>
                <div class="whitespace-nowrap transition-fade">{{ peekNext.name }} &#9654;</div>
            </div>
        </div>
    </PrevNextTransition>
</template>
