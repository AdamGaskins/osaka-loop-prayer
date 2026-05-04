<script setup lang="ts">
import KanjiRuby from './KanjiRuby.vue'
import PrevNextTransition from './PrevNextTransition.vue'
import { useStationsStore } from '../stores/stations'

const stationsStore = useStationsStore()

defineProps<{
    reverseAnimation?: boolean
}>()
</script>

<template>
    <PrevNextTransition :reverse="reverseAnimation">
        <div
            :key="stationsStore.stationIndex"
            class="m-2 border border-black shadow-lg rounded-sm overflow-x-clip bg-white text-black"
        >
            <div class="text-center py-2">
                <KanjiRuby
                    kanjiOnly
                    :kanji="stationsStore.currentStation.name_kanji"
                    class="text-2xl font-bold transition-slide"
                    rubyClass="text-lg"
                />
                <div class="font-light text-3xl transition-slide">
                    {{ stationsStore.currentStation.name }}
                </div>
            </div>
            <div class="bg-osaka-red flex text-white py-1 px-3">
                <div class="whitespace-nowrap transition-fade">
                    &#9664; {{ stationsStore.peekPrev.name }}
                </div>
                <div class="w-full"></div>
                <div class="whitespace-nowrap transition-fade">
                    {{ stationsStore.peekNext.name }} &#9654;
                </div>
            </div>
        </div>
    </PrevNextTransition>
</template>
