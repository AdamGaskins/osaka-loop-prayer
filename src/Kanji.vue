<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    kanji: string
    class?: string
    rubyClass?: string
    kanjiOnly?: boolean
}>()

const characters = computed(() => {
    const chars: [string, string][] = []
    let currentCharacter: [string, string] = ['', '']
    let ruby = false

    for (let i = 0; i < props.kanji.length; i++) {
        const c = props.kanji[i]

        if (c === ' ' || c === ']' || i === props.kanji.length - 1) {
            if (currentCharacter[0].length > 0) {
                chars.push(currentCharacter)
            }

            currentCharacter = ['', '']
            ruby = false
            continue
        }

        if (c === '[') {
            ruby = true
            continue
        }

        currentCharacter[ruby ? 1 : 0] += c
    }

    return chars
})
</script>

<template>
    <ruby :class="class">
        <template v-for="c of characters">
            {{ c[0] }}<rt v-if="!kanjiOnly" :class="rubyClass">{{ c[1] }}</rt>
        </template>
    </ruby>
</template>
