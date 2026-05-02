import type { StationDefinition } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const _station_data = import.meta.glob('./../stations/*.yaml', { eager: true })
const _stations = Object.values(_station_data).map(
    (v) => (v as unknown as any).default,
)

export const useStationsStore = defineStore('stations', () => {
    const stations = ref<StationDefinition[]>(_stations)

    const stationIndex = ref(0)
    const visitedStations = ref<number[]>([])

    const normalizedIndex = computed(() => normalizeIndex(stationIndex.value))
    const currentStation = computed(() => getStation(stationIndex.value)!)
    const peekNext = computed(() => getStation(stationIndex.value - 1)!)
    const peekPrev = computed(() => getStation(stationIndex.value + 1)!)

    function markAsVisited() {
        const i = normalizeIndex(stationIndex.value)
        if (visitedStations.value.indexOf(i) !== -1) return

        visitedStations.value.push(i)
    }

    function normalizeIndex(index: number) {
        while (index >= stations.value.length) index -= stations.value.length
        while (index < 0) index += stations.value.length
        return index
    }

    function getStation(index: number) {
        return stations.value[normalizeIndex(index)]
    }

    return {
        stations,
        stationIndex,
        normalizedIndex,
        visitedStations,
        currentStation,
        peekNext,
        peekPrev,
        markAsVisited,
        normalizeIndex,
        getStation,
    }
})
