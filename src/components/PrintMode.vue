<script setup lang="ts">
import { useStationsStore } from '@/stores/stations'
import PrintPage from './PrintMode/PrintPage.vue'
import Kanji from '@/Kanji.vue'
const stationsStore = useStationsStore()
</script>

<template>
    <PrintPage>
        <div class="text-center mt-8">
            <h1 class="leading-14 uppercase text-8xl font-bold mt-12">
                <div class="mr-0">Pray</div>
                <div class="text-osaka-red">Osaka</div>
                <div class="ml-0">Loop</div>
            </h1>
        </div>

        <div class="text-xs absolute bottom-4 left-4">
            Generated {{ new Date().toLocaleDateString() }} ・
            https://loop.adamgaskins.dev/
        </div>
    </PrintPage>
    <PrintPage
        v-for="item of stationsStore.stations"
        :key="item.name"
        class="text-lg leading-6"
    >
        <div class="text-center text-4xl">
            <Kanji :kanji="item.name_kanji" kanjiOnly />
        </div>
        <h1 class="text-4xl text-center">
            {{ item.name }}
        </h1>

        <div class="mt-6">
            {{ item.description }}
        </div>

        <p class="font-bold mt-6">
            {{ item.verses?.[0]?.ref }}
        </p>
        <p>{{ item.verses?.[0]?.text }}</p>

        <p class="font-bold mt-6">Departure Melody</p>
        <p>🎶 {{ item.song }} 🎶</p>

        <p class="font-bold mt-6">Prayer Requests</p>

        <ul class="list-decimal list-outside pl-5">
            <li class="mt-2" v-for="request of item.prayer_points">
                {{ request }}
            </li>
        </ul>
    </PrintPage>
</template>

<style scoped>
@media print {
    @page {
        size: A5 portrait; /* Sets the paper to A4 size in portrait mode */
        margin: 0; /* Sets the print margins */
    }
}
</style>
