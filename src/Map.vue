<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStationsStore } from './stores/stations'
import {
    onMounted,
    onUnmounted,
    reactive,
    ref,
    useTemplateRef,
    watch,
} from 'vue'
import gsap from 'gsap'

const stationsStore = useStationsStore()
const startingStationOffset = 0.35

const svg = useTemplateRef('svg')
const svgCurve = useTemplateRef('svgCurve')

const { stations, visitedStations, stationIndex } = storeToRefs(stationsStore)

const svgW = ref(100)
const svgH = ref(100)
const stationPoints = ref<DOMPoint[]>([])
const tweened = reactive({
    stationIndex: stationIndex.value,
})
const tweenedTrainPoint = ref<DOMPoint>(new DOMPoint())
const tweenedTrainRotation = ref<number>(0)

let tween: GSAPTween | null = null
watch(stationIndex, (i) => {
    if (tween) {
        tween.kill()
    }
    tween = gsap.to(tweened, {
        stationIndex: i,
        duration: 1,
        ease: 'sine.inOut',
    })
})

function updateTrainPoint() {
    tweenedTrainPoint.value = getPosition(
        tweened.stationIndex / stations.value.length,
    )!
    const nextP = getPosition(
        tweened.stationIndex / stations.value.length + 0.01,
    )!
    tweenedTrainRotation.value =
        -Math.atan2(
            tweenedTrainPoint.value.y - nextP.y,
            tweenedTrainPoint.value.x - nextP.x,
        ) +
        Math.PI / 2
}
watch(tweened, () => updateTrainPoint())

function resizeSvg() {
    svgW.value = svg.value!.clientWidth
    svgH.value = svg.value!.clientHeight

    // allow the SVG to recalculate
    setTimeout(() => {
        stationPoints.value = []
        for (let i = 0; i < stations.value.length; i++) {
            stationPoints.value.push(getPosition(i / stations.value.length)!)
        }
        updateTrainPoint()
    }, 0)
}

function getPosition(percent: number) {
    if (svg.value === null || svgCurve.value === null) return

    percent += startingStationOffset

    while (percent >= 1) percent -= 1
    while (percent < 0) percent += 1

    percent = 1 - percent

    const length = svgCurve.value.getTotalLength()

    return svgCurve.value.getPointAtLength(percent * length)
}

onMounted(() => {
    window.addEventListener('resize', resizeSvg)
    resizeSvg()
})

onUnmounted(() => {
    window.removeEventListener('resize', resizeSvg)
})
</script>

<template>
    <div class="p-4">
        <div class="w-full h-8 rounded-[100%] relative">
            <div
                class="absolute -top-[8px] -bottom-[8px] -left-[8px] -right-[8px] border-16 rounded-full border-osaka-red"
            ></div>

            <div class="absolute inset-0">
                <svg
                    ref="svg"
                    class="w-full h-full"
                    :viewBox="'0 0 ' + svgW + ' ' + svgH"
                >
                    <rect
                        ref="svgCurve"
                        x="0"
                        y="0"
                        :width="svgW"
                        :height="svgH"
                        rx="16"
                        ry="16"
                        style="
                            fill: transparent;
                            stroke: transparent;
                            stroke-width: 1;
                            vector-effect: non-scaling-stroke;
                        "
                    />
                </svg>
            </div>

            <div class="w-full h-full">
                <!-- station icons -->
                <div
                    class="size-3 bg-white rounded-full absolute -top-1.5 -left-1.5"
                    :style="{
                        transform: 'translate(' + p.x + 'px, ' + p.y + 'px)',
                    }"
                    v-for="(p, i) of stationPoints"
                >
                    <div
                        v-if="visitedStations.indexOf(i) !== -1"
                        class="size-2 m-0.5 rounded-full bg-osaka-red"
                    ></div>
                </div>

                <!-- train -->
                <div
                    class="absolute -top-8 -left-4.5 size-9 text-4xl"
                    :style="{
                        transform:
                            'translate(' +
                            tweenedTrainPoint.x +
                            'px, ' +
                            tweenedTrainPoint.y +
                            'px)',
                        offsetRotate: 'none',
                    }"
                >
                    <div
                        class="animate-[bumpy_1s_linear_infinite] absolute emoji-shadow"
                    >
                        🚃
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.emoji-shadow {
    --shadow-color: #fff;
    text-shadow:
        -1px 0 var(--shadow-color),
        0 1px var(--shadow-color),
        1px 0 var(--shadow-color),
        0 -1px var(--shadow-color),
        -1px -1px var(--shadow-color),
        1px -1px var(--shadow-color),
        -1px 1px var(--shadow-color),
        1px 1px var(--shadow-color),
        0px 2px 8px rgb(0 0 0 / 0.5);
}

@keyframes bumpy {
    0%,
    45% {
        transform: translateY(0);
    }

    50%,
    95% {
        transform: translateY(-1px);
    }
}
</style>
